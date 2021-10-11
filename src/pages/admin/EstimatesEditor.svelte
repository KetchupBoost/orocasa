<svelte:head>
  <title>Admin - Editor de Orçamento</title>
</svelte:head>

<script>
  import { getContext, onMount } from 'svelte';
  import { navigateTo } from 'svelte-router-spa';
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import { Doc } from 'sveltefire';

  import InputMask from '@/components/InputMask.svelte';
  import ProductOrderEditor from '@/components/ProductOrderEditor.svelte';

  export let params = {};

  const newOrderInfo = getContext('newOrderInfo');
  const newOrderReady = getContext('newOrderReady');
  const orderEditReady = getContext('orderEditReady');
  const orderEditIndex = getContext('orderEditIndex');

  let isCreating = params.id === undefined;
  let values = {
    createdAt: null,
    clientName: '',
    clientAddressStreet: '',
    clientAddressNumber: '',
    clientAddressComplement: '',
    clientAddressNeighborhood: '',
    clientAddressCity: '',
    clientAddressState: '',
    clientAddressZipCode: '',
    clientAddressReference: '',
    clientAmbient: '',
    orders: [],
    totalPrice: 0
  };

  // Input masks
  const clientNameOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/
  };
  const clientAddressStreetOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ\-\/\(\)\,\.0-9\s]+$/
  };
  const clientAddressNumberOptions = {
    mask: /^[0-9]+$/
  };
  const clientAddressComplementOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ\-\/\(\)\,\.0-9\s]+$/
  };
  const clientAddressNeighborhoodOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/
  };
  const clientAddressCityOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ\-\s]+$/
  };
  const clientAddressStateOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ\-\s]+$/
  };
  const clientAddressZipCodeOptions = {
    mask: '00000-000',
    lazy: false
  };
  const clientAddressReferenceOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ\-\/\(\)\,\.0-9\s]+$/
  };
  const totalPriceOptions = {
    mask: Number,
    scale: 2,
    signed: false,
    thousandsSeparator: '.',
    radix: ',',
    mapToRadix: ['.'],
    padFractionalZeros: true,
    normalizeZeros: true,
    min: 0.0,
    max: 9999999.99,
  };

  $: {
    // Update every non-empty key of `values` on localStorage
    Object.keys(values).forEach(key => {
      const value = values[key];
      if (value !== ''
          && !!value
          && (Array.isArray(value) && value.length > 0)
      ) {
        window.localStorage.setItem(key, JSON.stringify(values[key]));
      }
    });
  }

  $: if ($newOrderReady) {
    // Add a new product order to the list when it's ready
    values.orders.push({ ...$newOrderInfo });
    values = { ...values };

    $newOrderInfo = {
      id: null,
      count: 0,
      ambient: '',
      features: {}
    };
    $newOrderReady = false;

    handleOrderChange();
  }

  $: if ($orderEditReady) {
    // Update the product order when it's ready
    values.orders[$orderEditIndex] = { ...$newOrderInfo };
    values = { ...values };

    console.log($orderEditIndex, $newOrderInfo);

    $newOrderInfo = {
      id: null,
      count: 0,
      ambient: '',
      features: {}
    };
    $orderEditReady = false;
    $orderEditIndex = null;

    handleOrderChange();
  }

  onMount(() => {
    // If we're creating a new estimate, try to fetch the values from
    // localStorage
    if (isCreating && window.localStorage.length > 0) {

      if (confirm('Dados de um orçamento em rascunho foram encontrados.\r\nDeseja continuar de onde parou?\r\n\r\n(Selecionar "cancelar" irá deletar o rascunho).')) {
        Object.keys(values).forEach(key => {
          const value = window.localStorage.getItem(key);

          if (!!value) {
            values[key] = JSON.parse(value);
          }
        });

        handleOrderChange();
      } else {
        // Clear localStorage
        Object.keys(values).forEach(key => {
          window.localStorage.removeItem(key);
        });
      }
    }
  });

  // Helpers
  const { open } = getContext('simple-modal');

  const showProductOrderEditor = (index, item, name, image) => {
    $orderEditIndex = index;
    $newOrderInfo = { ...item };

    open(ProductOrderEditor, {
      selectedProduct: {
        id: item.id,
        name,
        image
      }
    });
  };

  const createNewProductOrder = () => {
    open(ProductOrderEditor);
  };

  const formatPrice = price => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    return formatter.format(price);
  };

  const handleOrderChange = async () => {
    // Calculate the total price for the order
    let newTotalPrice = 0;

    for (let order of values.orders) {
      // Fetch the price for the product from firebase
      const db = firebase.firestore();
      const doc = await db
        .collection('products')
        .doc(order.id)
        .get();

      const product = doc.data();
      newTotalPrice += product.price * order.count;
    }

    // Update the total price
    values.totalPrice = newTotalPrice;
  };

  const deleteProductOrder = index => {
    if (!confirm('Tem certeza?'))
      return;

    values.orders.splice(index, 1);
    values = { ...values };

    handleOrderChange();
  };

  const handleSubmit = () => {
    const db = firebase.firestore();

    if (values.clientName === '') {
      alert('Preencha o nome do cliente!');
      return;
    }

    if (values.clientAddressStreet === '') {
      alert('Preencha o logradouro!');
      return;
    }

    if (values.clientAddressNeighborhood === '') {
      alert('Preencha o bairro ou município!');
      return;
    }

    if (values.clientAddressCity === '') {
      alert('Preencha a cidade!');
      return;
    }

    if (values.clientAddressState === '') {
      alert('Preencha o estado!');
      return;
    }

    if (values.clientAddressZipCode === '') {
      alert('Preencha o CEP!');
      return;
    }

    if (values.orders.length === 0) {
      alert('Adicione pelo menos um produto!');
      return;
    }

    if (isCreating) {
      // Create an estimate document on firestore
      const estimateRef = db
        .collection('estimates')
        .doc();

        estimateRef
        .set({
          status: 'pending',
          client: {
            name: values.clientName,
            address: {
              street: values.clientAddressStreet,
              neighborhood: values.clientAddressNeighborhood,
              city: values.clientAddressCity,
              state: values.clientAddressState,
              zipCode: values.clientAddressZipCode
            }
          },
          products: values.orders,
          created_in: firebase.firestore.FieldValue.serverTimestamp(),
          updated_in: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          // Clear localStorage
          Object.keys(values).forEach(key => {
            window.localStorage.removeItem(key);
          });

          navigateTo('/admin/estimates');
        })
        .catch(err => {
          alert(`Erro ao criar orçamento: ${err}`);
        });
    } else {
      // Update the estimate document on firestore
      db
        .collection('estimates')
        .doc(id)
        .update({
          client: {
            name: values.clientName,
            address: {
              street: values.clientAddressStreet,
              neighborhood: values.clientAddressNeighborhood,
              city: values.clientAddressCity,
              state: values.clientAddressState,
              zipCode: values.clientAddressZipCode
            }
          },
          products: values.orders,
          updated_in: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          // Clear localStorage
          Object.keys(values).forEach(key => {
            window.localStorage.removeItem(key);
          });

          navigateTo('/admin/estimates');
        })
        .catch(err => {
          alert(`Erro ao atualizar orçamento: ${err}`);
        });
    }
  };
</script>

<div class="flex flex-col w-screen min-h-screen p-4 pt-8 overflow-y-scroll text-gray-800 bg-gray-100 md:p-8">
  <!-- Header -->
  <h1 class="text-3xl">{isCreating ? 'Novo' : 'Editar'} Orçamento</h1>

  <!-- Client Info -->
  <div class="grid w-full grid-cols-6 gap-4 p-3 py-5 mt-6 bg-white rounded-lg shadow-md md:p-6">
    <h2 class="text-xl col-span-full">Cliente</h2>

    <!-- Name -->
    <div class="col-span-full">
      <label for="name" class="label">Nome Completo</label>
      <InputMask
        type="text"
        name="clientName"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={clientNameOptions}
        bind:value={values.clientName}
      />
    </div>

    <h2 class="mt-3 text-xl col-span-full">Endereço</h2>

    <!-- Client Address Zipcode-->
    <div class="col-span-full md:col-span-2 lg:col-span-1">
      <label for="clientAddressZipCode" class="label">CEP</label>
      <InputMask
        type="text"
        name="clientAddressZipCode"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask={true}
        imask={clientAddressZipCodeOptions}
        bind:value={values.clientAddressZipCode}
      />
    </div>

    <!-- Client Address Street-->
    <div class="col-span-full md:col-span-4 lg:col-span-5">
      <label for="clientAddressStreet" class="label">Logradouro</label>
      <InputMask
        type="text"
        name="clientAddressStreet"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={clientAddressStreetOptions}
        bind:value={values.clientAddressStreet}
      />
    </div>

    <!-- Client Address Number -->
    <div class="col-span-full md:col-span-3 lg:col-span-1">
      <label for="clientAddressNumber" class="label">Número</label>
      <InputMask
        type="text"
        name="clientAddressStreet"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={clientAddressNumberOptions}
        bind:value={values.clientAddressNumber}
      />
    </div>

    <!-- Client Address Complement-->
    <div class="col-span-full md:col-span-3 lg:col-span-2">
      <label for="clientAddressComplement" class="label">Complemento</label>
      <InputMask
        type="text"
        name="clientAddressComplement"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={clientAddressComplementOptions}
        bind:value={values.clientAddressComplement}
      />
    </div>

    <!-- Client Address Neighborhood -->
    <div class="col-span-full md:col-span-3 lg:col-span-3">
      <label for="clientAddressNeighborhood" class="label">
        Bairro / Município
      </label>
      <InputMask
        type="text"
        name="clientAddressNeighborhood"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={clientAddressNeighborhoodOptions}
        bind:value={values.clientAddressNeighborhood}
      />
    </div>

    <!-- Client Address City -->
    <div class="col-span-full md:col-span-3 lg:col-span-3">
      <label for="clientAddressCity" class="label">Cidade</label>
      <InputMask
        type="text"
        name="clientAddressCity"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={clientAddressCityOptions}
        bind:value={values.clientAddressCity}
      />
    </div>

    <!-- Client Address State -->
    <div class="col-span-full lg:col-span-3">
      <label for="clientAddressState" class="label">Estado</label>
      <InputMask
        type="text"
        name="clientAddressState"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={clientAddressStateOptions}
        bind:value={values.clientAddressState}
      />
    </div>

    <!-- Client Address Reference -->
    <div class="col-span-full">
      <label for="clientAddressReference" class="label">
        Ponto de Referência
      </label>
      <InputMask
        type="text"
        name="clientAddressReference"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={clientAddressReferenceOptions}
        bind:value={values.clientAddressReference}
      />
    </div>
  </div>

  <!-- Product Orders -->
  <div class="flex flex-col w-auto gap-4 p-3 py-5 mt-5 bg-white rounded-lg shadow-md md:p-6">
    <div class="flex items-center justify-between w-full">
      <h2 class="text-xl">Produtos</h2>

      <!-- Add Product Order -->
      <button
        class="relative ml-auto text-sm lg:w-auto focus:outline-none sm:mt-0"
        on:click={() => createNewProductOrder()}
      >
        <div class="flex items-center justify-center w-10 h-10 px-3 text-gray-100 rounded-full bg-main-500 md:justify-start md:rounded lg:justify-between md:w-40 hover:bg-main-600 active:bg-main-400 whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          <span class="hidden w-full font-medium text-center md:block">
            Adicionar
          </span>
        </div>
      </button>
    </div>

    <!-- Product List -->
    <div class="grid w-full grid-cols-1 gap-6 mt-3 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 lg:gap-y-8">
      {#if values.orders.length === 0}
        <div class="flex flex-col items-center justify-center w-full h-full space-y-3 text-gray-500 col-span-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-semibold text-md">Nenhum produto adicionado.</span>
        </div>
      {/if}

      {#each values.orders as item, i (i)}
        <Doc path={`products/${item.id}`} let:data={product}>
          <div class="product">
            <div
              class="relative block h-64 overflow-hidden bg-white rounded-lg shadow-md cursor-pointer"
              on:click={() => showProductOrderEditor(i, item, product.name, product.image)}
            >
              <button
                class="absolute z-10 flex items-center justify-center bg-red-500 rounded w-7 h-7 top-2 right-2 text-red-50 hover:bg-red-600 active:bg-red-400"
                title="Excluir"
                on:click|stopPropagation={() => deleteProductOrder(i)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <div
                class="w-full h-full bg-center bg-no-repeat bg-contain product-image"
                style="background-image: url({product.image});"
              />
            </div>
            <div class="flex items-center justify-between mt-3">
              <div class="flex flex-col">
                <span class="font-medium">{product.name}</span>
                <span class="text-xs font-medium text-main-500">
                  {item.ambient}
                </span>
              </div>
              <span class="flex items-center h-8 px-2 ml-1 text-sm rounded text-main-600 bg-main-200 whitespace-nowrap">
                {item.count} x {formatPrice(product.price)}
              </span>
            </div>
          </div>
        </Doc>
      {/each}
    </div>
  </div>

  <!-- Total Price -->
  <div class="flex flex-col w-auto gap-4 p-3 py-5 mt-5 bg-white rounded-lg shadow-md md:p-6">
    <div class="flex flex-col w-full md:items-center md:justify-between md:flex-row">
      <h2 class="text-xl">Valor Final:</h2>
      <div class="border-box flex mt-3 md:mt-0 items-center h-10 gap-2 px-4 py-6 overflow-hidden text-xl border-2 rounded focus-within:border-black focus-within:border-2 focus-within:px-[16px]">
        <span class="select-none">R$</span>
        <InputMask
          type="text"
          name="totalPrice"
          class="w-full py-6 focus:outline-none"
          unmask="typed"
          imask={totalPriceOptions}
          bind:value={values.totalPrice}
        />
      </div>
    </div>
  </div>

  <div class="h-auto mt-6">
    <button
      class="flex items-center justify-center flex-shrink-0 w-full h-10 text-sm font-medium text-white rounded bg-main-500 disabled:bg-main-200 hover:bg-main-600 active:bg-main-400"
      on:click={() => handleSubmit()}
    >
      {isCreating ? 'Criar Orçamento' : 'Salvar Alterações'}
    </button>
  </div>
</div>

<style scoped>
  .label {
    @apply text-xs font-semibold select-none;
  }

  .product-image {
    transform: scale(0.9);
    transition: transform 0.2s ease-out;
  }

  .product-image:hover {
    transform: scale(1);
  }
</style>

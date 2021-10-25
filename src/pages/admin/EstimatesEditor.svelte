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
  import PaymentConditionsEditor from '@/components/PaymentConditionsEditor.svelte';

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const newOrderInfo = getContext('newOrderInfo');
  const newOrderReady = getContext('newOrderReady');
  const orderEditReady = getContext('orderEditReady');
  const orderEditIndex = getContext('orderEditIndex');

  const newPaymentConditionInfo = getContext('newPaymentConditionInfo');
  const newPaymentConditionReady = getContext('newPaymentConditionReady');
  const paymentConditionEditReady = getContext('paymentConditionEditReady');
  const paymentConditionEditIndex = getContext('paymentConditionEditIndex');

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
    professional: '',
    orders: [],
    totalPrice: 0,
    paymentConditions: [],
    observations: []
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
  const professionalNameOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/
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
  const observationOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\(\)\-\+\,\.\[\]\!\*\%\=\/\$\;\:\s]+$/
  };

  if (!isCreating) {
    // Load data from firebase
    const db = firebase.firestore();

    db
      .collection('estimates')
      .doc(params.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          const {
            client,
            products,
            professional,
            priceTotal,
            paymentConditions,
            observations
          } = doc.data();

          values = {
            clientName: client.name,
            clientAddressStreet: client.address.street,
            clientAddressNumber: client.address.number,
            clientAddressComplement: client.address.complement,
            clientAddressNeighborhood: client.address.neighborhood,
            clientAddressCity: client.address.city,
            clientAddressState: client.address.state,
            clientAddressZipCode: client.address.zipCode,
            clientAddressReference: client.address.reference,
            orders: products,
            totalPrice: priceTotal,
            paymentConditions,
            professional,
            observations
          };
        } else {
          navigateTo('/admin/estimates');
        }
      });
  }

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

  $: if ($newPaymentConditionReady) {
    // Add a new payment condition to the list when it's ready
    values.paymentConditions.push({ ...$newPaymentConditionInfo });
    values = { ...values };

    $newPaymentConditionInfo = {
      first: '',
      second: '',
      third: ''
    };
    $newPaymentConditionReady = false;
  }

  $: if ($paymentConditionEditReady) {
    // Update the payment condition when it's ready
    values.paymentConditions[$paymentConditionEditIndex] = { ...$newPaymentConditionInfo };
    values = { ...values };

    $newPaymentConditionInfo = {
      first: '',
      second: '',
      third: ''
    };
    $paymentConditionEditReady = false;
    $paymentConditionEditIndex = null;
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

  const showPaymentConditionsEditor = (index, item) => {
    $paymentConditionEditIndex = index;
    $newPaymentConditionInfo = { ...item };

    open(PaymentConditionsEditor, {
      selectedPaymentCondition: {
        first: item.first,
        second: item.second,
        third: item.third
      }
    });
  };

  const createNewProductOrder = () => {
    open(ProductOrderEditor, { isNew: true });
  };

  const createNewPaymentCondition = () => {
    open(PaymentConditionsEditor, { isNew: true });
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

  const deletePaymentConditionsLine = i => {
    if (!confirm('Tem certeza?'))
      return;

    values.paymentConditions.splice(i, 1);
    values = { ...values };
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

    if (values.paymentConditions.length === 0) {
      alert('Adicione pelo menos uma condição de pagamento!');
      return;
    }

    if (values.observations.length > 0) {
      if (values.observations.some(o => o.value === '')) {
        alert('Preencha todas as observações!');
        return;
      }
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
              number: values.clientAddressNumber,
              complement: values.clientAddressComplement,
              neighborhood: values.clientAddressNeighborhood,
              city: values.clientAddressCity,
              state: values.clientAddressState,
              zipCode: values.clientAddressZipCode,
              reference: values.clientAddressReference
            }
          },
          products: values.orders,
          professional: values.professional,
          priceTotal: values.totalPrice,
          paymentConditions: values.paymentConditions,
          observations: values.observations,
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
        .doc(params.id)
        .update({
          client: {
            name: values.clientName,
            address: {
              street: values.clientAddressStreet,
              number: values.clientAddressNumber,
              complement: values.clientAddressComplement,
              neighborhood: values.clientAddressNeighborhood,
              city: values.clientAddressCity,
              state: values.clientAddressState,
              zipCode: values.clientAddressZipCode,
              reference: values.clientAddressReference
            }
          },
          products: values.orders,
          professional: values.professional,
          priceTotal: values.totalPrice,
          paymentConditions: values.paymentConditions,
          observations: values.observations,
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
      <label for="clientName" class="label">Nome Completo</label>
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

  <!-- Professional Info -->
  <div class="grid w-full grid-cols-6 gap-4 p-3 py-5 mt-5 bg-white rounded-lg shadow-md md:p-6">
    <h2 class="text-xl col-span-full">Profissional</h2>

    <!-- Name -->
    <div class="col-span-full">
      <label for="professionalName" class="label">Nome Completo</label>
      <InputMask
        type="text"
        name="professionalName"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={professionalNameOptions}
        bind:value={values.professional}
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

  <!-- Payment Conditions -->
  <div class="flex flex-col w-full gap-4 p-3 py-5 mt-5 bg-white rounded-lg shadow-md md:p-6">
    <div class="flex items-center justify-between w-full">
      <h2 class="text-xl">Condições de Pagamento</h2>

      <!-- Add Payment Condition -->
      <button
        class="relative ml-auto text-sm lg:w-auto focus:outline-none sm:mt-0"
        on:click={() => createNewPaymentCondition()}
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

    <div class="flex flex-col w-full space-y-1">
      {#if values.paymentConditions.length === 0}
        <div class="flex flex-col items-center justify-center w-full h-full space-y-3 text-gray-500 col-span-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-semibold text-md">
            Nenhuma condição de pagamento.
          </span>
        </div>
      {/if}

      {#each values.paymentConditions as item, i (i)}
        <div class="flex items-center w-full px-2 odd:bg-gray-100">
          <span class="text-sm">Linha {i + 1}</span>
          <div class="flex ml-auto">
            <button
              title="Editar"
              class="flex items-center justify-center p-2 text-blue-500 rounded hover:bg-blue-200 active:bg-blue-100"
              on:click={() => showPaymentConditionsEditor(i, item)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              title="Excluir"
              class="flex items-center justify-center p-2 text-red-500 rounded hover:bg-red-200 active:bg-red-100"
              on:click={() => deletePaymentConditionsLine(i)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Observations -->
  <div class="flex flex-col w-full gap-4 p-3 py-5 mt-5 bg-white rounded-lg shadow-md md:p-6">
    <div class="flex items-center justify-between w-full">
      <h2 class="text-xl">Observações</h2>

      <!-- Add Observation-->
      <button
        class="relative ml-auto text-sm lg:w-auto focus:outline-none sm:mt-0"
        on:click={() => {
          values.observations.push({
            value: ''
          });
          values.observations = [ ...values.observations ];
        }}
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

    <div class="flex flex-col space-y-1 col-span-full">
      {#if values.observations.length === 0}
        <div class="flex flex-col items-center justify-center w-full h-full space-y-3 text-gray-500 col-span-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-semibold text-md">
            Nenhuma observação.
          </span>
        </div>
      {/if}

      {#each values.observations as item, i (i)}
        <div class="flex items-center w-full">
          <InputMask
            type="text"
            name="title"
            class="flex items-center w-full h-10 px-4 mr-2 text-sm border-2 rounded"
            placeholder="Digite uma observação..."
            unmask="typed"
            imask={observationOptions}
            bind:value={item.value}
          />
          <div class="flex ml-auto">
            <button
              title="Excluir"
              class="flex items-center justify-center p-2 text-red-500 rounded hover:bg-red-200 active:bg-red-100"
              on:click={() => {
                values.observations.splice(i, 1);
                values.observations = [ ...values.observations ];
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="h-auto mt-6 mb-32">
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

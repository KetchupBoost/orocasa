<script>
  import { getContext } from 'svelte';
  import { Doc } from 'sveltefire';
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/storage';

  import InputMask from '@/components/InputMask.svelte';
  import ProductSelect from '@/components/ProductSelect.svelte';

  export let selectedProduct = null;

  const newOrderInfo = getContext('newOrderInfo');
  const newOrderReady = getContext('newOrderReady');
  const orderEditReady = getContext('orderEditReady');
  const orderEditIndex = getContext('orderEditIndex');

  let values = {
    id: null,
    count: 0,
    ambient: '',
    features: {}
  };

  // Input masks
  const ambientOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\(\)\-\s]+$/
  };
  const featureValueOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\(\)\-\,\.\[\]\!\*\%\=\/\s]+$/
  };

  const isCreating = $orderEditIndex === null;

  const db = firebase.firestore();

  // If we're editing an existing product order, get the data from the store
  if (!isCreating) {
    values = { ...$newOrderInfo };
  }

  $: if (selectedProduct !== null
         && Object.keys(values.features).length === 0) {
    // Fetch features for the selected product
    db
      .collection('products')
      .doc(selectedProduct.id)
      .get()
      .then(async doc => {
        const product = doc.data();
        const features = product.features;

        for (let feature of features) {
          // Fetch the feature name from firebase
          const featureDoc = await db
            .collection('fields')
            .doc(feature)
            .get();

          values.features[feature] = {
            name: featureDoc.data().name,
            value: ''
          };
        }

        values = { ...values };
      });

    console.log('Updated features:', values.features);
  }

  // Helpers
  const { close } = getContext('simple-modal');

  const deselectProduct = () => {
    selectedProduct = null;

    values.features = {};
    values = { ...values };
  };

  const decreaseCount = () => {
    values.count--;
  };

  const increaseCount = () => {
    if (values.count > 99998)
      return;

    values.count++;
  };

  const handleCountChange = () => {
    if (values.count === null || values.count < 0)
      values.count = 0;
    else if (values.count > 99999)
      values.count = 99999;
  };

  const handleSubmit = () => {
    if (selectedProduct === null) {
      alert('Selecione um produto!');
      return;
    }

    if (values.ambient === '') {
      alert('Descreva o ambiente para instalação!');
      return;
    }

    if (values.count === 0) {
      alert('Informe a quantidade!');
      return;
    }

    for (let feature of Object.values(values.features)) {
      if (feature.value === '') {
        alert(`Informe o valor do atributo "${feature.name}"!`);
        return;
      }
    }

    values.id = selectedProduct.id;

    $newOrderInfo = { ...values };

    if (!isCreating) {
      $orderEditReady = true;
    } else {
      $newOrderReady = true;
    }

    close();
  };
</script>

<div class="flex items-center w-full pt-8">
  <div class="grid w-full grid-cols-4 gap-4 px-4 pb-4">
    {#if selectedProduct === null}
      <!-- Product Select -->
      <div class="col-span-full">
        <label for="product" class="label">Produto</label>
        <ProductSelect bind:selected={selectedProduct} />
      </div>
    {:else}
      <!-- Product -->
      <div class="col-span-full">
        <label for="product" class="label">Produto</label>
        <div class="flex items-center w-full h-40 mt-1">
          <div class="w-40 h-40 rounded">
            <div
              class="w-full h-full bg-center bg-no-repeat bg-contain"
              style="background-image:url({selectedProduct.image})"
            />
          </div>
          <div class="flex flex-col items-center justify-center w-full">
            <span class="text-xl font-semibold">
              {selectedProduct.name}
            </span>
            <button
              class="px-3 py-2 mt-4 font-medium bg-main-500 button hover:bg-main-600 active:bg-main-400"
              on:click={deselectProduct}
            >
              Alterar Produto
            </button>
          </div>
        </div>
      </div>

      <!-- Ambient -->
      <div class="col-span-full">
        <label for="ambient" class="label">Ambiente</label>
        <InputMask
          type="text"
          name="ambient"
          class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
          unmask="typed"
          imask={ambientOptions}
          bind:value={values.ambient}
        />
      </div>

      <!-- Count -->
      <div class="col-span-full">
        <label for="count" class="label">Quantidade</label>
        <div class="flex items-center justify-between w-full h-10 gap-2 mt-1">
          <button
            class="w-10 bg-main-500 button hover:bg-main-600 active:bg-main-400"
            title="Diminuir"
            on:click={decreaseCount}
            disabled={values.count === 0 || values.count === null}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
          <input
            type="number"
            name="count"
            class="flex items-center w-full h-10 px-4 text-sm text-center border-2 rounded"
            bind:value={values.count}
            on:change={handleCountChange}
          />
          <button
            class="w-10 bg-main-500 button hover:bg-main-600 active:bg-main-400"
            title="Aumentar"
            on:click={increaseCount}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Features -->
      {#if Object.keys(values.features).length === 0}
        <div class="col-span-full">
          <div class="w-full text-sm font-semibold">
            Carregando atributos...
          </div>
        </div>
      {:else}
        {#each Object.entries(values.features) as [key, feature] (key)}
          <div class="col-span-full">
            <label for="feature-{key}" class="label">{feature.name}</label>

            <Doc path={`fields/${key}`} let:data>
              {#if data.is_open}
                <InputMask
                  type="text"
                  name="feature-{key}"
                  class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
                  unmask="typed"
                  imask={featureValueOptions}
                  bind:value={values.features[key].value}
                />
              {:else}
                <button class="relative w-full mt-1 text-sm focus:outline-none group">
                  <div class="flex items-center justify-between h-10 px-3 border-2 border-gray-200 rounded hover:bg-gray-200">
                    <span class="font-medium">
                      {values.features[key].value}
                    </span>
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="absolute z-10 flex-col items-start hidden w-full pb-1 bg-white rounded shadow-lg group-focus:flex">
                    {#each data.values as item, i (i)}
                      <button
                        class="w-full px-4 py-2 text-left hover:bg-gray-200"
                        on:click={() => {
                          values.features[key].value = item.value
                        }}
                      >
                        {item.value}
                      </button>
                    {/each}
                  </div>
                </button>
              {/if}
            </Doc>
          </div>
        {/each}

        <div class="h-10 col-span-4 mt-3">
          <button
            class="w-full font-medium bg-main-500 button hover:bg-main-600 active:bg-main-400"
            on:click={handleSubmit}
          >
            {isCreating ? 'Criar Ordem de Produto' : 'Salvar Alterações'}
          </button>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style scoped>
  .group:focus .group-focus\:flex,
  .group-focus\:flex:active {
    display: flex;
  }

  .label {
    @apply text-xs font-semibold select-none;
  }

  .button {
    @apply flex items-center justify-center flex-shrink-0 h-full text-sm text-white rounded;
  }

  .button:disabled {
    @apply bg-main-300;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
</style>

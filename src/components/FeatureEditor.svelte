<script>
  import { getContext, onMount } from 'svelte';
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/storage';
  import slugify from 'slugify';

  import InputMask from '@/components/InputMask.svelte';

  export let isCreating = false;
  export let slug;

  let isBusy = false;
  let values = {
    name: '',
    is_open: true,
    values: []
  };

  const featureNameOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/
  };

  const { close } = getContext('simple-modal');

  onMount(() => {
    const db = firebase.firestore();

    // If we're editing an existing category, fetch its data
    if (!isCreating && slug) {
      isBusy = true;

      db.collection('fields')
        .doc(slug)
        .get()
        .then(doc => {
          const { name, is_open, values: opts } = doc.data();
          values = {
            name,
            is_open,
            values: opts || []
          };

          isBusy = false;
        });
    };
  });

  // Helpers
  const addItem = () => {
    values.values.push({
      value: ''
    });
    values.values = [ ...values.values ];
  };

  const deleteItem = i => {
    values.values.splice(i, 1);
    values.values = [ ...values.values ];
  };

  const handleSubmit = () => {
    const db = firebase.firestore();

    if (values.name === '')
      return alert('Preencha o nome do atributo!');

    if (!values.is_open) {
      if (values.values.length === 0)
        return alert('Adicione pelo menos uma opção ao atributo!');

      if (values.values.some(opt => opt.value === ''))
        return alert('Preencha o valor de todas as opções!');
    }

    isBusy = true;

    if (isCreating) {
      const slug = slugify(values.name, {
        lower: true
      });

      // Create a new feature document on firestore
      db.collection('fields')
        .doc(slug)
        .set({
          name: values.name,
          is_open: values.is_open,
          values: values.values,
          created_at: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          close();
        })
        .catch(err => {
          alert(`Erro ao criar atributo: ${err}`);
          isBusy = false;
        });
    } else {
      // Update the product document on firestore
      db
        .collection('fields')
        .doc(slug)
        .update({
          name: values.name,
          is_open: values.is_open,
          values: values.values
        })
        .then(() => {
          close();
        })
        .catch(err => {
          alert(`Erro ao atualizar atributo: ${err}`);
          isBusy = false;
        });
    }
  };
</script>

<div class="flex items-center w-full pt-8">
  <div class="grid w-full grid-cols-4 gap-4 px-4 pb-4">
    <!-- Title -->
    <div class="col-span-full">
      <label for="title" class="text-xs font-semibold select-none">
        Nome
      </label>
      <InputMask
        type="text"
        name="title"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={featureNameOptions}
        bind:value={values.name}
      />
    </div>

    <!-- Is Open -->
    <div class="flex items-center col-span-full">
      <label for="isOpen" class="mr-2 text-xs font-semibold select-none">
        Campo em aberto?
      </label>
      <input
        type="checkbox"
        id="isOpenToggle"
        class="hidden"
        bind:checked={values.is_open}
      />
      <label for="isOpenToggle" class="flex items-center justify-start w-10 h-6 px-[2px] py-1 border-2 border-gray-300 rounded-full cursor-pointer">
        <span class="w-4 h-4 bg-blue-500 rounded-full" />
      </label>
    </div>

    <!-- Options -->
    {#if !values.is_open}
      <div class="flex col-span-full">
        <h2 class="w-full text-xl">Opções</h2>
        <button
          class="relative w-full ml-auto text-sm lg:w-auto focus:outline-none sm:mt-0"
          on:click={() => addItem()}
        >
          <div class="flex items-center justify-center w-10 h-10 ml-auto text-gray-100 rounded-full md:justify-start md:px-3 md:rounded bg-main-500 lg:justify-between lg:w-40 hover:bg-main-600 active:bg-main-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span class="hidden w-full font-medium text-center md:block">
              Nova Opção
            </span>
          </div>
        </button>
      </div>

      <div class="flex flex-col space-y-1 col-span-full">
        {#if values.values.length === 0}
          <span class="font-semibold text-center text-md">Lista vazia!</span>
        {/if}

        {#each values.values as item, i (i)}
          <div class="flex items-center w-full">
            <InputMask
              type="text"
              name="title"
              class="flex items-center w-full h-10 px-4 text-sm border-2 rounded"
              placeholder="Digite um valor..."
              unmask="typed"
              imask={featureNameOptions}
              bind:value={item.value}
            />
            <div class="flex ml-auto">
              <button
                title="Excluir"
                class="flex items-center justify-center p-2 text-red-500 rounded hover:bg-red-200 active:bg-red-100"
                on:click={() => deleteItem(i)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}

    <!-- Submit -->
    <div class="h-10 col-span-4 mt-3">
      <button
        class="flex items-center justify-center flex-shrink-0 w-full h-full text-sm font-medium text-white rounded bg-main-500 disabled:bg-main-300 hover:bg-main-600 active:bg-main-400"
        on:click={handleSubmit}
        disabled={isBusy}
      >
        {isCreating ? 'Criar Atributo' : 'Salvar Alterações'}
      </button>
    </div>
  </div>
</div>

<style scoped>
  input[type="checkbox"]:checked + label {
    @apply justify-end border-blue-500 bg-blue-500;
  }

  input[type="checkbox"]:checked + label span {
    @apply bg-white;
  }
</style>

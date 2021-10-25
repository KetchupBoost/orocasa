<svelte:head>
  <title>Admin - Configurações</title>
</svelte:head>

<script>
  import { getContext } from 'svelte';
  import firebase from 'firebase/app';
  import 'firebase/firestore';

  import InputMask from '@/components/InputMask.svelte';
  import TextareaMask from '@/components/TextareaMask.svelte';
  import ListImageEditor from '@/components/ListImageEditor.svelte';
  import ListItemEditor from '@/components/ListItemEditor.svelte';

  const db = firebase.firestore();

  const { open } = getContext('simple-modal');

  let values = {
    'landing-data': {
      about_header: '',
      about_text: '',
      hero_header: '',
      hero_sub: '',
      hero_text: '',
      hero_images: [],
      project_slide_items: [],
      slide_items: []
    }
  };

  // Input masks
  const textValueOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ\-\/\(\)\,\.\!\&\%\$\#\@\"\'\*0-9\s]+$/
  };

  // Helpers
  const fetchValuesFromDB = () => {
    db
      .collection('settings')
      .doc('landing-data')
      .get()
      .then(doc => {
        const data = doc.data();

        values['landing-data'] = data;
        values['landing-data'].about_header = toTextarea(data.about_header);
        values['landing-data'].about_text = toTextarea(data.about_text);
        values['landing-data'].hero_text = toTextarea(data.hero_text);

        values = { ...values };
      });
  };

  const toTextarea = text => text
    .replaceAll('<b>', '*')
    .replaceAll('</b>', '*')
    .replaceAll('<br>', '\r\n');

  const fromTextarea = text => text
    .replace(/(?:\*)([A-Za-zÀ-ÖØ-öø-ÿ.,!?&0-9\s]+)(?:\*)/gm, '<b>$1</b>')
    .replace(/(?:\_)([A-Za-zÀ-ÖØ-öø-ÿ.,!?&0-9\s]+)(?:\_)/gm, '<i>$1</i>')
    .replaceAll('\n', '<br>');

  const showListImageEditor = (list, index) => {
    open(ListImageEditor, {
      list,
      index,
      onClosed: () => {
        fetchValuesFromDB();
      }
    });
  };

  const showListItemEditor = (list, index) => {
    open(ListItemEditor, {
      list,
      index,
      onClosed: () => {
        fetchValuesFromDB();
      }
    });
  };

  const addListImage = list => {
    values['landing-data'][list].push({
      url: ''
    });
    values['landing-data'][list] = [ ...values['landing-data'][list] ];

    // Update firebase
    db
      .collection('settings')
      .doc('landing-data')
      .update({
        [list]: values['landing-data'][list]
      });
  };

  const addListItem = list => {
    values['landing-data'][list].push({
      image: '',
      name: 'Sem Título',
      text: ''
    });
    values['landing-data'][list] = [ ...values['landing-data'][list] ];

    // Update firebase
    db
      .collection('settings')
      .doc('landing-data')
      .update({
        [list]: values['landing-data'][list]
      });
  };

  const deleteListItem = (list, index) => {
    if (values['landing-data'][list].length > 1) {
      values['landing-data'][list].splice(index, 1);
      values['landing-data'][list] = [ ...values['landing-data'][list] ];

      // Update firebase
      db
        .collection('settings')
        .doc('landing-data')
        .update({
          [list]: values['landing-data'][list]
        });
    }
  };

  // Load values from firebase
  fetchValuesFromDB();
</script>

<main class="flex flex-col w-screen min-h-screen p-4 pt-8 overflow-y-auto text-gray-800 bg-gray-50 md:p-8">
  <!-- Header -->
  <h1 class="text-3xl">Configurações</h1>

  <!-- Hero -->
  <div class="grid w-full grid-cols-6 gap-4 p-3 py-5 mt-6 bg-white rounded-lg shadow-md md:p-6">
    <h2 class="text-xl col-span-full">Herói</h2>

    <!-- Header -->
    <div class="col-span-full">
      <label for="heroHeader" class="label">Título</label>
      <InputMask
        type="text"
        name="heroHeader"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={textValueOptions}
        bind:value={values['landing-data'].hero_header}
      />
    </div>

    <!-- Subheader -->
    <div class="col-span-full">
      <label for="heroSub" class="label">Subtítulo</label>
      <InputMask
        type="text"
        name="heroSub"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={textValueOptions}
        bind:value={values['landing-data'].hero_sub}
      />
    </div>

    <!-- Text -->
    <div class="col-span-full">
      <label for="heroText" class="label">Texto</label>
      <TextareaMask
        name="heroText"
        class="flex items-center w-full p-4 mt-1 text-sm border-2 rounded h-36"
        unmask="typed"
        imask={textValueOptions}
        bind:value={values['landing-data'].hero_text}
      />
    </div>

    <!-- Submit -->
    <div class="col-span-full">
      <button
        class="w-full h-10 px-4 mt-1 text-sm font-semibold bg-blue-500 rounded hover:bg-blue-600 active:bg-blue-400 text-blue-50"
        on:click={() => {
          db
            .collection('settings')
            .doc('landing-data')
            .update({
              hero_header: fromTextarea(values['landing-data'].hero_header),
              hero_sub: fromTextarea(values['landing-data'].hero_sub),
              hero_text: fromTextarea(values['landing-data'].hero_text)
            });
        }}
      >
        Salvar Alterações
      </button>
    </div>
  </div>

  <!-- Hero Images -->
  <div class="flex flex-col w-full gap-4 p-3 py-5 mt-6 bg-white rounded-lg shadow-md md:p-6">
    <div class="flex w-full">
      <h2 class="flex-shrink-0 text-xl col-span-full">Carrossel de Imagens</h2>
      <button
        class="relative w-full ml-auto text-sm lg:w-auto focus:outline-none sm:mt-0"
        on:click={() => addListImage('hero_images')}
      >
        <div class="flex items-center justify-center w-10 h-10 ml-auto text-gray-100 rounded-full md:justify-start md:px-3 md:rounded bg-main-500 lg:justify-between lg:w-40 hover:bg-main-600 active:bg-main-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          <span class="hidden w-full font-medium text-center md:block">
            Novo Item
          </span>
        </div>
      </button>
    </div>

    <div class="flex flex-col w-full space-y-1">
      {#if values['landing-data'].hero_images.length === 0}
        <span class="font-semibold text-md">Lista vazia.</span>
      {/if}

      {#each values['landing-data'].hero_images as _, i (i)}
        <div class="flex items-center w-full px-2 odd:bg-gray-100">
          <span class="text-sm">Imagem {i + 1}</span>
          <div class="flex ml-auto">
            <button
              title="Editar"
              class="flex items-center justify-center p-2 text-blue-500 rounded hover:bg-blue-200 active:bg-blue-100"
              on:click={() => showListImageEditor('hero_images', i)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              title="Excluir"
              class="flex items-center justify-center p-2 text-red-500 rounded hover:bg-red-200 active:bg-red-100"
              on:click={() => deleteListItem('hero_images', i)}
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

  <!-- About -->
  <div class="grid w-full grid-cols-6 gap-4 p-3 py-5 mt-6 bg-white rounded-lg shadow-md md:p-6">
    <h2 class="text-xl col-span-full">Sobre</h2>

    <!-- Header -->
    <div class="col-span-full">
      <label for="aboutHeader" class="label">Título</label>
      <br>
      <label for="aboutHeader" class="label">
        <i>Obs: É possível escrever em *negrito* e _itálico_.</i>
      </label>
      <TextareaMask
        name="aboutHeader"
        class="flex items-center w-full p-4 mt-1 text-sm border-2 rounded h-36"
        unmask="typed"
        imask={textValueOptions}
        bind:value={values['landing-data'].about_header}
      />
    </div>

    <!-- Text -->
    <div class="col-span-full">
      <label for="aboutText" class="label">Texto</label>
      <TextareaMask
        name="aboutText"
        class="flex items-center w-full p-4 mt-1 text-sm border-2 rounded h-36"
        unmask="typed"
        imask={textValueOptions}
        bind:value={values['landing-data'].about_text}
      />
    </div>

    <!-- Submit -->
    <div class="col-span-full">
      <button
        class="w-full h-10 px-4 mt-1 text-sm font-semibold bg-blue-500 rounded hover:bg-blue-600 active:bg-blue-400 text-blue-50"
        on:click={() => {
          db
            .collection('settings')
            .doc('landing-data')
            .update({
              about_header: fromTextarea(values['landing-data'].about_header),
              about_text: fromTextarea(values['landing-data'].about_text)
            });
        }}
      >
        Salvar Alterações
      </button>
    </div>
  </div>

  <!-- Products -->
  <div class="flex flex-col w-full gap-4 p-3 py-5 mt-6 bg-white rounded-lg shadow-md md:p-6">
    <div class="flex w-full">
      <h2 class="text-xl col-span-full">Produtos</h2>
      <button
        class="relative w-full ml-auto text-sm lg:w-auto focus:outline-none sm:mt-0"
        on:click={() => addListItem('slide_items')}
      >
        <div class="flex items-center justify-center w-10 h-10 ml-auto text-gray-100 rounded-full md:justify-start md:px-3 md:rounded bg-main-500 lg:justify-between lg:w-40 hover:bg-main-600 active:bg-main-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          <span class="hidden w-full font-medium text-center md:block">
            Novo Item
          </span>
        </div>
      </button>
    </div>

    <div class="flex flex-col w-full space-y-1">
      {#if values['landing-data'].slide_items.length === 0}
        <span class="font-semibold text-md">Lista vazia.</span>
      {/if}

      {#each values['landing-data'].slide_items as item, i (i)}
        <div class="flex items-center w-full px-2 odd:bg-gray-100">
          <span class="text-sm">{item.name}</span>
          <div class="flex ml-auto">
            <button
              title="Editar"
              class="flex items-center justify-center p-2 text-blue-500 rounded hover:bg-blue-200 active:bg-blue-100"
              on:click={() => showListItemEditor('slide_items', i)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              title="Excluir"
              class="flex items-center justify-center p-2 text-red-500 rounded hover:bg-red-200 active:bg-red-100"
              on:click={() => deleteListItem('slide_items', i)}
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

  <!-- Portfólio -->
  <div class="flex flex-col w-full gap-4 p-3 py-5 mt-6 mb-5 bg-white rounded-lg shadow-md md:p-6">
    <div class="flex w-full">
      <h2 class="text-xl col-span-full">Portfólio</h2>
      <button
        class="relative w-full ml-auto text-sm lg:w-auto focus:outline-none sm:mt-0"
        on:click={() => addListItem('project_slide_items')}
      >
        <div class="flex items-center justify-center w-10 h-10 ml-auto text-gray-100 rounded-full md:justify-start md:px-3 md:rounded bg-main-500 lg:justify-between lg:w-40 hover:bg-main-600 active:bg-main-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          <span class="hidden w-full font-medium text-center md:block">
            Novo Item
          </span>
        </div>
      </button>
    </div>

    <div class="flex flex-col w-full space-y-1">
      {#if values['landing-data'].project_slide_items.length === 0}
        <span class="font-semibold text-md">Lista vazia.</span>
      {/if}

      {#each values['landing-data'].project_slide_items as item, i (i)}
        <div class="flex items-center w-full px-2 odd:bg-gray-100">
          <span class="text-sm">{item.name}</span>
          <div class="flex ml-auto">
            <button
              title="Editar"
              class="flex items-center justify-center p-2 text-blue-500 rounded hover:bg-blue-200 active:bg-blue-100"
              on:click={() => showListItemEditor('project_slide_items', i)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              title="Excluir"
              class="flex items-center justify-center p-2 text-red-500 rounded hover:bg-red-200 active:bg-red-100"
              on:click={() => deleteListItem('project_slide_items', i)}
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
</main>

<style scoped>
  .label {
    @apply text-xs font-semibold select-none;
  }
</style>

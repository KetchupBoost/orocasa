<svelte:head>
  <title>Admin - Categorias</title>
</svelte:head>

<script>
  import { getContext } from 'svelte';
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import { Collection } from 'sveltefire';

  import CategoryEditor from '@/components/CategoryEditor.svelte';

  const { open } = getContext('simple-modal');

  let currentSearchTerm = '';

  // Helpers
  const getItemCount = async id => {
    const db = firebase.firestore();

    // Search for products where category is the same as the id
    const products = db
      .collection('products')
      .where('category', '==', id)
      .get();

    // Count the number of products
    const count = await products.then(snapshot => snapshot.size);
    return count;
  };

  const showCategoryEditor = (isCreating, id) => {
    console.log(id);
    open(CategoryEditor, { isCreating, id });
  };

  const deleteCategory = async (id, title) => {
    if (!confirm(`Tem certeza que deseja excluir a categoria "${title}"?\r\nIsto também resultará na EXCLUSÃO de TODOS OS PRODUTOS da mesma.`))
      return;

    const db = firebase.firestore();

    // Delete the products of the category
    const products = await db
      .collection('products')
      .where('category', '==', parseInt(id))
      .get();

    products.forEach(async product => {
      // First delete their image
      await firebase
        .storage()
        .refFromURL(product.data().image)
        .delete();

      // Then delete the product
      db
        .collection('products')
        .doc(product.id)
        .delete();
    });

    // Then delete the category
    db
      .collection('categories')
      .doc(id)
      .delete();

    alert(`A categoria "${title}" foi excluída com sucesso.`);
  };
</script>

<main class="flex flex-col w-screen min-h-screen p-8 overflow-y-auto text-gray-800 bg-gray-100">
  <!-- Header -->
  <h1 class="text-3xl">Categorias</h1>

  <!-- Table Options -->
  <div class="flex flex-col mt-6 sm:flex-row sm:items-end sm:justify-between">
    <!-- New Product -->
    <button
      class="relative mt-4 text-sm focus:outline-none sm:mt-0"
      on:click={() => showCategoryEditor(true)}
    >
      <div class="flex items-center justify-between w-40 h-10 px-3 text-gray-100 bg-blue-500 rounded hover:bg-blue-600 active:bg-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span class="font-medium">Nova Categoria</span>
      </div>
    </button>

    <!-- Search -->
    <div class="relative mt-4 ml-auto mr-6 text-sm sm:mt-0">
      <div class="flex items-center justify-between h-10 border-2 border-gray-300 rounded w-50 focus-within:border-2 focus-within:border-black">
        <input
          class="flex items-center w-full h-full px-4 bg-gray-100 rounded focus:outline-none"
          type="text"
          placeholder="Pesquisar"
          bind:value={currentSearchTerm}
        />
        {#if currentSearchTerm === ''}
          <div class="flex items-center justify-center px-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        {:else}
          <button
            class="flex items-center justify-center px-2"
            on:click={() => currentSearchTerm = ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        {/if}
      </div>
    </div>
  </div>

  <!-- Table -->
  <div class="flex flex-col w-full mt-6">
    <table class="flex flex-col space-y-3 text-sm text-gray-700">
      <thead class="sticky text-gray-700 bg-white rounded-lg shadow-lg top-[-15px]">
        <tr class="flex justify-between">
          <th class="w-full col-span-3 p-3 ml-3 text-left">Nome</th>
          <th class="flex-shrink-0 w-20 p-3 ml-auto text-left">Itens</th>
          <th class="flex-shrink-0 w-20 col-span-2 p-3 text-left md:text-center md:w-40">Ações</th>
        </tr>
      </thead>
      <tbody class="flex flex-col space-y-3 flex-rol">
        <Collection path={'categories'} let:data={categories}>
          {#each categories as category, i (i)}
            <tr class="flex w-full bg-white rounded-lg shadow-md space-between">
              <td class="flex items-center flex-shrink-0 w-20 col-span-3 p-3 md:w-full">
                <span class="ml-3">{category.title}</span>
              </td>
              <td class="flex items-center justify-center w-20 p-3 ml-auto md:justify-start">
                {#await getItemCount(i)}
                  ...
                {:then count}
                  {count}
                {:catch}
                  ???
                {/await}
              </td>
              <td class="flex items-center justify-center w-40 p-3 space-x-3">
                <button
                  title="Editar"
                  class="flex items-center justify-center p-2 bg-blue-500 rounded text-blue-50 hover:bg-blue-600 active:bg-blue-600"
                  on:click={() => showCategoryEditor(false, category.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  title="Excluir"
                  class="flex items-center justify-center p-2 bg-red-500 rounded text-red-50 hover:bg-red-600 active:bg-red-600"
                  on:click={() => deleteCategory(category.id, category.title)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                </button>
              </td>
            </tr>
          {/each}
        </Collection>
      </tbody>
    </table>
  </div>
</main>

<style scoped>
  table {
    border-spacing: 0 15px;
  }

  table:after {
    content: '';
    display: block;
    height: 35px;
    width: 100%;
  }

  tr td:first-child,
	tr th:first-child {
    @apply rounded-l-lg;
	}

  tr td:last-child,
	tr th:last-child {
    @apply rounded-r-lg;
	}
</style>

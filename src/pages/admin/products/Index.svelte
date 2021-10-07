<svelte:head>
  <title>Admin - Produtos</title>
</svelte:head>

<script>
  import { getContext } from 'svelte';
  import 'firebase/firestore';
  import { Collection, Doc } from 'sveltefire';

  import ProductEditor from '@/components/ProductEditor.svelte';

  const { open } = getContext('simple-modal');

  const sortingModes = [
    {
      title: 'Ordem Alfabética',
      field: 'name',
      order: 'asc'
    },
    {
      title: 'Mais Novos',
      field: 'created_in',
      order: 'desc'
    },
    {
      title: 'Mais Antigos',
      field: 'created_in',
      order: 'asc'
    },
    {
      title: 'Maior Preço',
      field: 'price',
      order: 'desc'
    },
    {
      title: 'Menor Preço',
      field: 'price',
      order: 'asc'
    }
  ];

  let currentCategory = '';
  let currentCategoryTitle = 'Todas as Categorias';
  let selectedSortingMode = 0;

  let productQ = ref => ref
      .orderBy('name', 'asc');

  // Helpers
  const formatPrice = price => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    return formatter.format(price);
  }

  const updateQuery = async () => {
    const mode = sortingModes[selectedSortingMode];

    if (currentCategory === '') {
      productQ = ref => ref
        .orderBy(mode.field, mode.order);
    } else {
      productQ = ref => ref
        .orderBy(mode.field, mode.order)
        .where('category', '==', currentCategory);
    }
  };

  const changeSortingMode = newIndex => {
    selectedSortingMode = newIndex;

    updateQuery();
  };

  const setCategory = (id, title) => {
    currentCategory = id;
    currentCategoryTitle = title;

    updateQuery();
  };

  const doSearch = term => {
    const mode = sortingModes[selectedSortingMode];
  };

  const showProductEditor = (isCreating, id) => {
    open(ProductEditor, { isCreating, id });
  };
</script>

<main class="flex flex-col w-screen min-h-screen p-8 overflow-y-scroll text-gray-800 bg-gray-100">
  <!-- Header -->
  <h1 class="text-3xl">Produtos</h1>

  <!-- Grid Options -->
  <div class="flex flex-col mt-6 grid-options sm:flex-row sm:items-end sm:justify-between">
    <!-- New Product -->
    <button
      class="relative mt-4 text-sm focus:outline-none sm:mt-0"
      on:click={() => showProductEditor(true)}
    >
      <div class="flex items-center justify-between h-10 px-3 text-gray-100 bg-blue-500 rounded w-36 hover:bg-blue-600 active:bg-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span class="font-medium">Novo Produto</span>
      </div>
    </button>

    <!-- Search -->
    <div class="relative mt-4 ml-auto mr-6 text-sm focus:outline-none sm:mt-0">
      <div class="flex items-center justify-between h-10 border-2 border-gray-300 rounded w-50 hover:bg-gray-300">
        <input
          class="flex items-center w-full h-full px-4 bg-gray-100 rounded focus:outline-none"
          type="text"
          placeholder="Pesquisar"
        />
        <button class="flex items-center justify-center px-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Category Select -->
    <button class="relative w-48 mt-4 mr-3 text-sm focus:outline-none group sm:mt-0">
      <div class="flex items-center justify-between h-10 px-3 border-2 border-gray-300 rounded hover:bg-gray-300">
        <span class="font-medium">
          {currentCategoryTitle}
        </span>
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="absolute z-10 flex-col items-start hidden w-full pb-1 bg-white rounded shadow-lg group-focus:flex">
        <button
          class="w-full px-4 py-2 text-left hover:bg-gray-200"
          on:click={() => setCategory('', 'Todas as Categorias')}
        >
          Todas as Categorias
        </button>
        <Collection path={'categories'} let:data={categories}>
          {#each categories as category, i (i)}
            <button
              class="w-full px-4 py-2 text-left hover:bg-gray-200"
              on:click={() => setCategory(i, category.title)}
            >
              {category.title}
            </button>
          {/each}
        </Collection>
      </div>
    </button>

    <!-- Order Select -->
    <button class="relative w-48 mt-4 text-sm focus:outline-none group sm:mt-0">
      <div class="flex items-center justify-between h-10 px-3 border-2 border-gray-300 rounded hover:bg-gray-300">
        <span class="font-medium">
          {sortingModes[selectedSortingMode].title}
        </span>
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
				</svg>
      </div>
      <div class="absolute z-10 flex-col items-start hidden w-full pb-1 bg-white rounded shadow-lg group-focus:flex">
        {#each sortingModes as mode, i (i)}
          <button
            class="w-full px-4 py-2 text-left hover:bg-gray-200"
            on:click={() => changeSortingMode(i)}
          >
            {mode.title}
          </button>
        {/each}
			</div>
    </button>
  </div>

  <!-- Grid -->
  <!-- <Collection
    path={'products'}
    query={productQ}
    let:data={products}
    let:last
  > -->
  <Collection path={'products'} query={productQ} let:data={products}>
    <div slot="loading">
      <div class="flex items-center justify-center w-full h-80">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      </div>
    </div>

    <div slot="fallback">
      <h1>Erro ao carregar dados.</h1>
    </div>

    <div class="grid w-full grid-cols-1 mt-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-12">
      {#each products as product, i (i)}
        <div class="product">
          <div
            class="block h-64 overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer"
            on:click={() => showProductEditor(false, product._id)}
          >
            <div
              class="w-full h-full product-image"
              style="background-image: url({product.image});"
            />
          </div>
          <div class="flex items-center justify-between mt-3">
            <div class="flex flex-col">
              <span class="font-medium">{product.name}</span>
              <div class="flex flex-col items-start">
                <Doc
                  path={`categories/${product.category}`}
                  let:data={category}
                >
                  <button
                    class="text-xs font-medium text-blue-500 select-none"
                    on:click={setCategory(product.category, category.title)}
                  >
                    {category.title}
                  </button>
                </Doc>
                <span class="text-xs font-medium select-none">
                  {#if product.stock > 0}
                    {product.stock} no estoque
                  {:else}
                    Indisponível
                  {/if}
                </span>
              </div>
            </div>
            <span class="flex items-center h-8 px-2 text-sm text-blue-600 bg-blue-200 rounded">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      {/each}
    </div>

    <!-- Grid Pagination -->
    <!-- <div class="flex items-center justify-center mt-6 space-x-6 md:mt-auto grid-pagination">
      <button
        class="flex items-center justify-center h-8 px-2 text-sm font-medium text-gray-100 bg-indigo-400 rounded hover:bg-indigo-500"
        on:click={() => previousPage(last)}
      >
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      <button
        class="flex items-center justify-center h-8 px-2 text-sm font-medium text-gray-100 bg-indigo-400 rounded hover:bg-indigo-500"
        on:click={() => nextPage(last)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </div> -->
  </Collection>
</main>

<style scoped>
  .group:focus .group-focus\:flex,
  .group-focus\:flex:active {
    display: flex;
  }

  .product-image {
    background-size: 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    transition: all 0.2s ease-out;
  }

  .product-image:hover {
    background-size: 110%;
  }
</style>

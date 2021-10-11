<script>
  import 'firebase/firestore';
  import { Collection, Doc } from 'sveltefire';

  export let selected = null;

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
  let currentSearchTerm = '';

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

  const filterSearch = (items, term) => {
    if (term === '')
      return items;

    return items.filter(item => {
      const name = item.name.toLowerCase();
      const searchTerm = term.toLowerCase();

      return name.includes(searchTerm);
    });
  };

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

  const selectProduct = (id, name, image) => {
    selected = { id, name, image };
  };
</script>

<div class="flex flex-col w-full min-h-full overflow-y-auto text-gray-800">
  <!-- Grid Options -->
  <div class="flex flex-col mt-1 lg:flex-row lg:items-end lg:justify-between">
    <!-- Search -->
    <div class="relative w-full text-sm lg:w-auto md:mr-3">
      <div class="flex items-center justify-between w-full h-10 border-2 border-gray-300 rounded lg:w-50 focus-within:border-2 focus-within:border-black">
        <input
          class="flex items-center w-full h-full px-4 rounded bg-gray-50 focus:outline-none"
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

    <!-- Category Select -->
    <button class="relative flex-shrink-0 w-full mt-2 mr-3 text-sm lg:w-48 focus:outline-none group lg:mt-0">
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
        <Collection
          path={'categories'}
          query={ref => ref.orderBy('title')}
          let:data={categories}
        >
          {#each categories as category, i (i)}
            <button
              class="w-full px-4 py-2 text-left hover:bg-gray-200"
              on:click={() => setCategory(parseInt(category.id), category.title)}
            >
              {category.title}
            </button>
          {/each}
        </Collection>
      </div>
    </button>

    <!-- Order Select -->
    <button class="relative flex-shrink-0 w-full mt-2 text-sm lg:w-48 focus:outline-none group lg:mt-0">
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
  <Collection path={'products'} query={productQ} let:data={products}>
    <div slot="loading" class="flex items-center justify-center w-full h-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    </div>

    <div slot="fallback" class="flex flex-col items-center justify-center w-full h-full space-y-3 text-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span class="font-semibold text-md">Erro ao carregar dados!</span>
    </div>

    {#if filterSearch(products, currentSearchTerm).length === 0}
      <div class="flex flex-col items-center justify-center w-full h-full space-y-3 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="font-semibold text-md">Nenhum produto encontrado.</span>
      </div>
    {/if}

    <div class="grid w-full grid-cols-1 gap-4 p-2 mt-6 2xl:grid-cols-4 md:grid-cols-2 lg:gap-y-8">
      {#each filterSearch(products, currentSearchTerm) as product, i (i)}
        <div class="product">
          <div
            class="block h-64 overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer"
            on:click={() => selectProduct(product.id, product.name, product.image)}
          >
            <div
              class="w-full h-full bg-center bg-no-repeat bg-contain product-image"
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
                    class="text-xs font-medium select-none text-main-500"
                    on:click={setCategory(product.category, category.title)}
                  >
                    {category.title}
                  </button>
                </Doc>
                <span class="text-xs font-medium select-none">
                  {#if product.stock > 0}
                    {product.stock} em estoque
                  {:else}
                    Indisponível
                  {/if}
                </span>
              </div>
            </div>
            <span class="flex items-center h-8 px-2 text-sm rounded text-main-600 bg-main-200 whitespace-nowrap">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      {/each}
    </div>
  </Collection>
</div>

<style scoped>
  .grid:after {
    content: '';
    display: block;
    height: 35px;
    width: 100%;
  }

  .group:focus .group-focus\:flex,
  .group-focus\:flex:active {
    display: flex;
  }

  .product-image {
    transform: scale(0.9);
    transition: transform 0.2s ease-out;
  }

  .product-image:hover {
    transform: scale(1);
  }
</style>

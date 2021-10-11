<script>
  import { getContext } from 'svelte';
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import { navigateTo } from 'svelte-router-spa';

  export let currentRoute;

  const { needsAuthCheck } = getContext('app');

  // Log out from the current firebase session
  const logout = () => {
    firebase.auth().signOut().then(() => {
      $needsAuthCheck = true;
      navigateTo('/login');
    });
  };
</script>

<div class="flex flex-col items-center flex-shrink-0 w-16 h-full overflow-hidden overflow-y-auto text-gray-200 bg-gray-900 lg:w-48">
  <div class="flex items-center justify-between w-full pl-4 pr-3 mt-3 lg:justify-start">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 fill-current" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
    <span class="hidden w-full text-sm font-bold text-center select-none lg:block">
      Oro Casa
    </span>
  </div>
  <div class="flex flex-col items-center w-full px-2">
    <!-- <div class="w-4/5 h-[1px] bg-gray-700 mt-6"/> -->

    <div class="flex flex-col items-center w-full mt-6">
      <!-- Create new Estimate -->
      <button
        class="flex items-center w-full h-12 px-3 rounded text-gray-50 bg-main-500 hover:bg-main-600 active:bg-main-400 disabled:bg-main-300"
        on:click={() => navigateTo('/admin/editor')}
        disabled={currentRoute.path == '/admin/editor'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span class="hidden ml-3 text-sm font-medium lg:block">Novo Orçamento</span>
      </button>
    </div>

    <div class="flex flex-col items-center w-full">
      <!-- Estimates -->
      <a
        href="/admin/estimates"
        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-50 hover:text-gray-600"
        class:active={currentRoute.path == '/admin/estimates'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <span class="hidden ml-3 text-sm font-medium lg:block">Orçamentos</span>
      </a>

      <div class="w-4/5 h-[1px] bg-gray-700 mt-3 mb-1"/>

      <!-- Products -->
      <a
        href="/admin/products"
        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-50 hover:text-gray-600"
        class:active={currentRoute.path == '/admin/products'}
      >
        <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span class="hidden ml-3 text-sm font-medium lg:block">Produtos</span>
      </a>

      <!-- Categories -->
      <a
        href="/admin/categories"
        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-50 hover:text-gray-600"
        class:active={currentRoute.path == '/admin/categories'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span class="hidden ml-3 text-sm font-medium lg:block">Categorias</span>
      </a>

      <!-- Features -->
      <a
        href="/admin/features"
        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-50 hover:text-gray-600"
        class:active={currentRoute.path == '/admin/features'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8" />
        </svg>
        <span class="hidden ml-3 text-sm font-medium lg:block">
          Atributos
        </span>
      </a>
    </div>

    <div class="w-4/5 h-[1px] bg-gray-700 mt-3 mb-1"/>

    <div class="flex flex-col items-center w-full">
      <!-- Messages -->
      <a
        href="/admin/messages"
        class="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-50 hover:text-gray-600"
        class:active={currentRoute.path == '/admin/messages'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span class="hidden ml-3 text-sm font-medium lg:block">Mensagens</span>
        <span class="items-center justify-center hidden ml-auto text-sm font-semibold text-white bg-red-500 rounded-full lg:flex w-7 h-7">
          7
        </span>
        <span class="absolute top-0 right-0 w-2 h-2 mt-2 mr-2 bg-red-500 rounded-full lg:hidden" />
      </a>
    </div>
  </div>

  <button
    class="flex items-center justify-center flex-shrink-0 w-full h-16 mt-6 bg-gray-700 md:mt-auto hover:bg-gray-800 active:bg-gray-600"
    on:click={logout}
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
    <span class="hidden ml-2 text-sm font-medium lg:block">Sair</span>
  </button>
</div>

<style scoped>
  .active {
    @apply bg-gray-50 text-gray-600;
  }
</style>

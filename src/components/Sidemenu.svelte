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

<div class="flex flex-col items-center flex-shrink-0 w-16 h-full overflow-hidden text-gray-400 bg-gray-900 md:w-48">
  <div class="flex items-center justify-center w-full pl-4 pr-3 mt-3 md:justify-start">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 fill-current" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
    <span class="hidden ml-2 text-sm font-bold md:block">Oro Casa</span>
  </div>
  <div class="w-full px-2">
    <div class="flex flex-col items-center w-full mt-3 border-t border-gray-700">
      <!-- Estimates -->
      <a
        href="/admin/estimates"
        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
        class:active={currentRoute.path == '/admin/estimates'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <span class="hidden ml-3 text-sm font-medium md:block">Orçamentos</span>
      </a>

      <!-- Products -->
      <a
        href="/admin/products"
        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
        class:active={currentRoute.path == '/admin/products'}
      >
        <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span class="hidden ml-3 text-sm font-medium md:block">Produtos</span>
      </a>

      <!-- Categories -->
      <a
        href="/admin/categories"
        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
        class:active={currentRoute.path == '/admin/categories'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span class="hidden ml-3 text-sm font-medium md:block">Categorias</span>
      </a>
    </div>

    <div class="flex flex-col items-center w-full mt-3 border-t border-gray-700">
      <!-- Messages -->
      <a
        href="/admin/messages"
        class="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
        class:active={currentRoute.path == '/admin/messages'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span class="hidden ml-3 text-sm font-medium md:block">Mensagens</span>
        <span class="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-blue-500 rounded-full"/>
      </a>
    </div>
  </div>
  <button
    class="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
    on:click={logout}
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
    <span class="hidden ml-2 text-sm font-medium md:block">Sair</span>
  </button>
</div>

<style scoped>
  .active {
    @apply bg-gray-700 text-gray-200;
  }
</style>

<script>
  import { Route } from 'svelte-router-spa';

  import Modal from 'svelte-simple-modal';
  import Sidemenu from '@/components/Sidemenu.svelte';

  export let currentRoute;
</script>

<Modal>
  <main class="flex w-screen h-screen overflow-y-scroll">
    <!-- Sidemenu -->
    <Sidemenu {currentRoute} />

    <!-- Content -->
    <Route {currentRoute} />
  </main>
</Modal>

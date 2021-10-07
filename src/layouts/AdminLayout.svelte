<script>
  import { getContext } from 'svelte';
  import { Route, navigateTo } from 'svelte-router-spa';
  import firebase from 'firebase/app';
  import 'firebase/auth';

  import Modal from 'svelte-simple-modal';
  import Sidemenu from '@/components/Sidemenu.svelte';

  export let currentRoute;

  let isWaitingForAuth = true;

  const { needsAuthCheck } = getContext('app');
  const auth = firebase.auth();

  // Auth guard
  auth.onAuthStateChanged(user => {
    if (!$needsAuthCheck) {
      isWaitingForAuth = false;
    }

    if (!user) {
      navigateTo('/login');
    } else {
      isWaitingForAuth = false;
      $needsAuthCheck = false;
    }
  });
</script>

{#if isWaitingForAuth}
  <div />
{:else}
  <Modal>
    <main class="flex w-screen h-screen overflow-y-hidden">
      <!-- Sidemenu -->
      <Sidemenu {currentRoute} />

      <!-- Content -->
      <Route {currentRoute} />
    </main>
  </Modal>
{/if}

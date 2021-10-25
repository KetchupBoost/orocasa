<script>
  import { getContext } from 'svelte';
  import { Route, navigateTo } from 'svelte-router-spa';
  import firebase from 'firebase/app';
  import 'firebase/auth';

  import Modal from 'svelte-simple-modal';
  import Sidemenu from '@/components/Sidemenu.svelte';

  export let currentRoute;
  export let params = {};

  let isWaitingForAuth = $needsAuthCheck;

  const { needsAuthCheck } = getContext('app');
  const auth = firebase.auth();

  // Auth guard
  auth.onAuthStateChanged(user => {
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
    <div class="flex w-screen h-screen overflow-y-hidden">
      <!-- Sidemenu -->
      <Sidemenu {currentRoute} />

      <!-- Content -->
      <Route {currentRoute} {params} />
    </div>
  </Modal>
{/if}

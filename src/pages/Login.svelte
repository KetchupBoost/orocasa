<svelte:head>
  <title>Entrar</title>
</svelte:head>

<script>
  import { navigateTo } from 'svelte-router-spa';
  import firebase from 'firebase/app';
  import 'firebase/auth';

  let emailField = '';
  let passwordField = '';
  let errorMessage = '';

  const auth = firebase.auth();

  auth.onAuthStateChanged(user => {
    if (!!user)
      navigateTo('/admin');
  });

  // Helpers
  const getCurrentYear = () => new Date().getFullYear();

  const onSubmit = () => {
    auth.signInWithEmailAndPassword(emailField, passwordField)
      .catch(error => {
        console.warn(`Erro ao autenticar (${error.code}): ${error.message}`);

        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'E-mail inválido.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'Usuário não encontrado.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Senha incorreta.';
            break;
          default:
            errorMessage = 'Erro ao autenticar.';
        };
      });
  };
</script>

<main class="flex flex-col items-center justify-center w-screen h-screen text-gray-700 bg-main-50">
  <!-- Form -->
  <form
    class="flex flex-col p-10 mt-12 bg-white rounded-lg shadow-lg"
    on:submit|preventDefault={onSubmit}
  >
    <!-- Username Field -->
    <label for="email" class="text-xs font-semibold">
      E-mail
    </label>
    <input
      type="text"
      name="email"
      class="flex items-center w-64 h-12 px-4 mt-2 bg-gray-200 rounded focus:outline-none focus:ring-2 ring-main-400"
      autofocus
      bind:value={emailField}
    />

    <!-- Password Field -->
    <label for="password" class="mt-3 text-xs font-semibold">
      Senha
    </label>
    <input
      type="password"
      name="password"
      class="flex items-center w-64 h-12 px-4 mt-2 bg-gray-200 rounded focus:outline-none focus:ring-2 ring-main-400"
      bind:value={passwordField}
    />

    <!-- Error Message -->
    {#if errorMessage !== ''}
      <span class="w-full mt-2 text-xs font-semibold text-center text-red-600">
        {errorMessage}
      </span>
    {/if}

    <!-- Submit Button -->
    <input
      type="submit"
      value="Entrar"
      class="flex items-center justify-center w-64 h-12 px-6 text-sm font-semibold text-white bg-main-500 rounded cursor-pointer hover:bg-main-600 active:bg-main-400 {errorMessage === '' ? 'mt-8' : 'mt-2'}"
    />

    <!-- Alternative Options -->
    <div class="flex justify-center mt-6 text-xs">
      <!-- <button class="text-main-400 hover:text-main-500 active:text-main-300">
        Esqueci a Senha
      </button> -->
      <!-- <span class="mx-2 text-gray-300">/</span> -->
      <a href="/" class="text-main-400 hover:text-main-500 active:text-main-300">
        Voltar
      </a>
    </div>
  </form>

  <div class="absolute bottom-0 flex items-end justify-between w-full h-12 px-8 py-8 md:px-24">
    <span class="small opacity-60">Copyright © {getCurrentYear()}</span>
    <a href="https://saikoosistemas.com.br" target="blank">
      <div
        style="background-image:url(/images/brand_saikoo.png);"
        class="w-[100px] bg-cover h-7"
      />
    </a>
  </div>
</main>

<style scoped>
  .small {
    font-size: 110%;
    line-height: 1.2;
  }

  @media (max-width: 768px) {
    .small {
      font-size: 4vw;
    }
  }
</style>

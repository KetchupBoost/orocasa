<svelte:head>
  <title>Entrar</title>
</svelte:head>

<script>
  import { navigateTo } from 'svelte-router-spa';
  import firebase from 'firebase/app';
  import 'firebase/auth';

  let emailField = '';
  let passwordField = '';

  const auth = firebase.auth();

  auth.onAuthStateChanged(auth, user => {
    if (user) {
      navigateTo('/admin');
    }
  });

  const onSubmit = () => {
    console.log('Tentando autenticar...');

    auth.signInWithEmailAndPassword(auth, emailField, passwordField)
      .catch(error => {
        console.log(`Erro ao autenticar (${error.code}): ${error.message}`);
      });
  };
</script>

<main class="flex flex-col items-center justify-center w-screen h-screen text-gray-700 bg-gray-200">
  <!-- Form -->
  <form
    class="flex flex-col p-10 mt-12 bg-white rounded shadow-lg"
    on:submit|preventDefault={onSubmit}
  >
    <!-- Username Field -->
    <label for="email" class="text-xs font-semibold">
      E-mail
    </label>
    <input
      type="text"
      name="email"
      class="flex items-center w-64 h-12 px-4 mt-2 bg-gray-200 rounded focus:outline-none focus:ring-2"
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
      class="flex items-center w-64 h-12 px-4 mt-2 bg-gray-200 rounded focus:outline-none focus:ring-2"
      bind:value={passwordField}
    />

    <!-- Submit Button -->
    <input
      type="submit"
      value="Entrar"
      class="flex items-center justify-center w-64 h-12 px-6 mt-8 text-sm font-semibold text-white bg-blue-600 rounded cursor-pointer hover:bg-blue-700"
    />

    <!-- Alternative Options -->
    <div class="flex justify-center mt-6 text-xs">
      <a href="#" class="text-blue-400 hover:text-blue-500">
        Esqueci a Senha
      </a>
      <span class="mx-2 text-gray-300">/</span>
      <a href="/" class="text-blue-400 hover:text-blue-500">
        Voltar
      </a>
    </div>
  </form>
</main>

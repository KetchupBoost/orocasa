<script>
  import { getContext, onMount } from 'svelte';
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/storage';
  import slugify from 'slugify';

  import InputMask from '@/components/InputMask.svelte';

  export let isCreating = false;
  export let slug;

  let isBusy = false;
  let values = {
    name: ''
  };

  const featureNameOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/
  };

  const { close } = getContext('simple-modal');

  onMount(() => {
    const db = firebase.firestore();

    // If we're editing an existing category, fetch its data
    if (!isCreating && slug) {
      isBusy = true;

      db.collection('fields')
        .doc(slug)
        .get()
        .then(doc => {
          const { name } = doc.data();
          values.name = name;

          isBusy = false;
        });
    };
  });

  // Helpers
  const handleSubmit = () => {
    const db = firebase.firestore();

    if (values.name === '') {
      alert('Preencha o nome do atributo!');
      return;
    }

    isBusy = true;

    if (isCreating) {
      const slug = slugify(values.name, {
        lower: true
      });

      // Create a new feature document on firestore
      db.collection('fields')
        .doc(slug)
        .set({
          name: values.name,
          created_at: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          close();
        })
        .catch(err => {
          alert(`Erro ao criar atributo: ${err}`);
          isBusy = false;
        });
    } else {
      // Update the product document on firestore
      db
        .collection('fields')
        .doc(slugify)
        .update({
          name: values.name
        })
        .then(() => {
          close();
        })
        .catch(err => {
          alert(`Erro ao atualizar atributo: ${err}`);
          isBusy = false;
        });
    }
  };
</script>

<div class="flex items-center w-full pt-8">
  <div class="grid w-full grid-cols-4 gap-4 px-4 pb-4">
    <!-- Title -->
    <div class="col-span-full">
      <label for="title" class="text-xs font-semibold select-none">
        Nome
      </label>
      <InputMask
        type="text"
        name="title"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={featureNameOptions}
        bind:value={values.name}
      />
    </div>

    <!-- Submit -->
    <div class="h-10 col-span-4 mt-3">
      <button
        class="flex items-center justify-center flex-shrink-0 w-full h-full text-sm font-medium text-white rounded bg-main-500 disabled:bg-main-300 hover:bg-main-600 active:bg-main-400"
        on:click={handleSubmit}
        disabled={isBusy}
      >
        {isCreating ? 'Criar Atributo' : 'Salvar Alterações'}
      </button>
    </div>
  </div>
</div>

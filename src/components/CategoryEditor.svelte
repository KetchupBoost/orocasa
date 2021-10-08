<script>
  import { getContext, onMount } from 'svelte';
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/storage';

  import InputMask from '@/components/InputMask.svelte';

  export let isCreating = false;
  export let id;

  let isBusy = false;
  let values = {
    title: ''
  };

  const categoryNameOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ\-\(\)\[\]\s]+$/
  };

  const { close } = getContext('simple-modal');

  onMount(() => {
    const db = firebase.firestore();

    // If we're editing an existing category, fetch its data
    if (!isCreating && id) {
      isBusy = true;

      db.collection('categories')
        .doc(id)
        .get()
        .then(doc => {
          const { title } = doc.data();
          values.title = title;

          isBusy = false;
        });
    };
  });

  // Helpers
  const handleSubmit = () => {
    const db = firebase.firestore();

    // TODO: Show error messages
    if (values.title === '') {
      alert('Preencha o título da categoria!');
      return;
    }

    isBusy = true;

    if (isCreating) {
      // Get the id of the last created category
      db
        .collection('categories')
        .orderBy('created_at', 'desc')
        .limit(1)
        .get()
        .then(snapshot => {
          const lastCategory = snapshot.docs[0];
          const lastCategoryId = lastCategory.id;
          const newCategoryId = parseInt(lastCategoryId) + 1;

          // Create a new category document on firestore
          db.collection('categories')
            .doc(newCategoryId.toString())
            .set({
              title: values.title,
              created_at: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
              close();
            })
            .catch(err => {
              alert(`Erro ao criar categoria: ${err}`);
              isBusy = false;
            });
        });
    } else {
      // Update the product document on firestore
      db
        .collection('categories')
        .doc(id)
        .update({
          title: values.title
        })
        .then(() => {
          close();
        })
        .catch(err => {
          alert(`Erro ao atualizar categoria: ${err}`);
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
        Título
      </label>
      <InputMask
        type="text"
        name="title"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={categoryNameOptions}
        bind:value={values.title}
      />
    </div>

    <!-- Submit -->
    <div class="h-10 col-span-4 mt-3">
      <button
        class="flex items-center justify-center flex-shrink-0 w-full h-full text-sm font-medium text-white rounded bg-main-500 disabled:bg-main-300 hover:bg-main-600 active:bg-main-400"
        on:click={handleSubmit}
        disabled={isBusy}
      >
        {isCreating ? 'Criar Categoria' : 'Salvar Alterações'}
      </button>
    </div>
  </div>
</div>

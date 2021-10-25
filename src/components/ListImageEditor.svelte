<script>
  import { getContext, onMount } from 'svelte';
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/storage';

  export let list;
  export let index;
  export let onClosed = () => {};

  let values = {
    url: ''
  };
  let fullList = [];
  let imageIsUploading = false;
  let imageFile;

  const db = firebase.firestore();

  // Fetch the data from firebase
  db.collection('settings')
    .doc('landing-data')
    .get()
    .then(doc => {
      fullList = doc.data()[list];
      values = { ...fullList[index] };
    });

  onMount(() => {
    // Handle image uploading
    imageFile.addEventListener('change', () => {
      if (imageFile.files.length === 0)
        return;

      doImageUpload();
    });
  });

  // Helpers
  const { close } = getContext('simple-modal');

  const handleImageClick = () => {
    if (imageIsUploading)
      return;

    imageFile.click();
  };

  const doImageUpload = () => {
    if (imageFile.files.length === 0)
      return;

    const storage = firebase.storage();

    if (values.url !== '') {
      // Delete the old image from the storage first
      storage
        .refFromURL(values.url)
        .delete();

      values.url = '';
    }

    // Upload image to firebase storage
    imageIsUploading = true;

    const file = imageFile.files[0];
    const productImagesRef = storage
      .ref()
      .child(`images/lists/${list}/${file.name}`);

    productImagesRef
      .put(file)
      .then(async snapshot => {
        values.url = await snapshot.ref.getDownloadURL();
        imageIsUploading = false;
      });
  }

  // FIXME: Delete the image from storage if the user doesn't submit the form

  const handleSubmit = () => {
    const db = firebase.firestore();

    if (values.url === '') {
      alert('Envie uma imagem!');
      return;
    }

    // Update the full list
    fullList[index] = values;

    // Update the document on firestore
    db
      .collection('settings')
      .doc('landing-data')
      .update({
        [list]: fullList
      })
      .then(() => {
        onClosed();
        close();
      })
      .catch(err => {
        alert(`Erro ao atualizar item: ${err}`);
      });
  };
</script>

<div class="flex items-center w-full pt-8">
  <div class="grid w-full grid-cols-4 gap-4 px-4 pb-4">
    <!-- Image -->
    <div class="col-span-full">
      <label for="image" class="label">Imagem</label>
      <input
        type="file"
        name="image"
        id="image_file"
        accept="image/png,image/jpeg,image/webp"
        bind:this={imageFile}
        hidden
      />
      {#if values.url === ''}
        <div
          class="flex flex-col w-full mt-1 border-4 border-dashed group {imageIsUploading ? 'cursor-wait' : 'cursor-pointer hover:bg-gray-100 hover:border-gray-300'}"
          on:click={handleImageClick}
        >
          <div class="flex flex-col items-center justify-center py-6">
            {#if imageIsUploading}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span class="pt-1 text-sm font-semibold tracking-wider text-gray-400 select-none">
                Enviando...
              </span>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span class="pt-1 text-sm font-semibold tracking-wider text-gray-400 select-none group-hover:text-gray-600">
                Enviar uma imagem
              </span>
            {/if}
          </div>
        </div>
      {:else}
        <div class="flex items-center justify-center w-full h-60">
          <div
            class="relative h-full bg-center bg-no-repeat bg-contain group w-60"
            style="background-image: url({values.url});"
            on:click={handleImageClick}
          >
            <div class="absolute flex flex-col items-center justify-center w-full h-full border-4 border-dashed cursor-pointer t-0 l-0 hover:bg-gray-100 hover:border-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="invisible w-12 h-12 text-gray-400 group-hover:text-gray-600 group-hover:visible" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span class="invisible pt-1 text-sm font-semibold tracking-wider text-gray-400 select-none group-hover:text-gray-600 group-hover:visible">
                Alterar imagem
              </span>
            </div>
          </div>
        </div>
      {/if}
    </div>
    <div class="h-10 col-span-4 mt-3">
      <button
        class="w-full font-medium bg-main-500 button hover:bg-main-600 active:bg-main-400"
        on:click={handleSubmit}
      >
        Salvar Alterações
      </button>
    </div>
  </div>
</div>

<style scoped>
  .label {
    @apply text-xs font-semibold select-none;
  }

  .button {
    @apply flex items-center justify-center flex-shrink-0 h-full text-sm text-white rounded;
  }

  .button:disabled {
    @apply bg-main-300;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>

<script>
  import firebase from 'firebase/app';
  import 'firebase/storage';
  import { imask } from '@imask/svelte';

  export let isCreating = false;
  export let id;

  let values = {
    name: '',
    price: 0.0,
    image: '',
    stock: 0,
    category: ''
  };

  let imageIsUploading = false;
  let imageFile;

  // Input masks
  const productNameOptions = {
    mask: /^[a-zA-Z0-9\s]+$/
  };
  const productPriceOptions = {
    mask: Number,
    scale: 2,
    signed: false,
    thousandsSeparator: '.',
    radix: ',',
    mapToRadix: ['.'],
    padFractionalZeros: true,
    normalizeZeros: true,
    min: 0.0,
    max: 9999999.99,
  };

  // Helpers
  const accept = fieldName => ({ detail: maskRef }) => {
    values[fieldName] = maskRef.value;
  };

  const decreaseStock = () => {
    values.stock--;
  };

  const increaseStock = () => {
    if (values.stock > 99998)
      return;

    values.stock++;
  };

  const handleStockChange = () => {
    if (values.stock === null || values.stock < 0)
      values.stock = 0;
    else if (values.stock > 99999)
      values.stock = 99999;
  };

  const handleImageClick = () => {
    if (imageIsUploading)
      return;

    imageFile.click();
  };

  const handleImageChange = () => {
    if (imageFile.files.length === 0)
      return;

    if (values.image !== '') {
      // Delete the old image from the storage first
      firebase.storage().refFromURL(values.image).delete();
      values.image = '';
    }

    // Upload image to firebase storage
    imageIsUploading = true;

    const file = imageFile.files[0];

    const storageRef = firebase.storage().ref();
    const productImagesRef = storageRef
      .child(`images/products/${file.name}`);

    productImagesRef
      .put(file)
      .then(async snapshot => {
        values.image = await snapshot.ref.getDownloadURL();
        imageIsUploading = false;
      });
  }

  const handleSubmit = () => {
    console.log(`Name: ${values.name}`);
    console.log(`Price: ${values.price}`);
    console.log(`Image: ${values.image}`);
    console.log(`Stock: ${values.stock}`);
    console.log(`Category: ${values.category}`);
  };
</script>

<div class="flex items-center w-full pt-8">
  <div class="grid w-full grid-cols-4 gap-4 px-4 pb-4">
    <!-- Name -->
    <div class="col-span-full">
      <label for="name" class="label">Nome</label>
      <input
        type="text"
        name="name"
        autofocus={isCreating}
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border rounded"
        use:imask={productNameOptions}
        on:accept={accept('name')}
      />
    </div>

    <!-- Price -->
    <div class="col-span-full md:col-span-2">
      <label for="price" class="label">Preço</label>
      <div class="box-border flex items-center w-full h-10 gap-2 px-4 mt-1 overflow-hidden text-sm border rounded focus-within:border-black focus-within:border-2 focus-within:px-[15px]">
        <span class="leading-4 select-none">R$</span>
        <input
          type="text"
          name="price"
          class="w-full py-3 leading-4 focus:outline-none"
          use:imask={productPriceOptions}
          on:accept={accept('price')}
        />
      </div>
    </div>

    <!-- Stock -->
    <div class="col-span-full md:col-span-2">
      <label for="stock" class="label">Estoque</label>
      <div class="flex items-center justify-between w-full h-10 gap-2 mt-1">
        <button
          class="w-10 button hover:bg-blue-600 active:bg-blue-400"
          title="Diminuir"
          on:click={decreaseStock}
          disabled={values.stock === 0 || values.stock === null}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
        <input
          type="number"
          name="stock"
          class="flex items-center w-full h-10 px-4 text-sm text-center border rounded"
          bind:value={values.stock}
          on:change={handleStockChange}
        />
        <button
          class="w-10 button hover:bg-blue-600 active:bg-blue-400"
          title="Aumentar"
          on:click={increaseStock}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Image -->
    <div class="col-span-full">
      <label for="image" class="label">Imagem</label>
      <input
        type="file"
        name="image"
        id="image_file"
        accept="image/png,image/jpeg,image/webp"
        bind:this={imageFile}
        on:change={handleImageChange}
        hidden
      />
      {#if values.image === ''}
        <div
          class="flex flex-col w-full mt-1 border-4 border-dashed cursor-pointer group {!imageIsUploading && 'hover:bg-gray-100 hover:border-gray-300'}"
          on:click={handleImageClick}
        >
          <div class="flex flex-col items-center justify-center py-6">
            {#if imageIsUploading}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span class="pt-1 text-sm font-semibold tracking-wider text-gray-400 select-none">Enviando...</span>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span class="pt-1 text-sm font-semibold tracking-wider text-gray-400 select-none group-hover:text-gray-600">Enviar uma imagem</span>
            {/if}
          </div>
        </div>
      {:else}
        <div class="flex items-center justify-center w-full h-60">
          <div
            class="relative h-full bg-center bg-cover group w-60"
            style="background-image: url({values.image});"
            on:click={handleImageClick}
          >
            <div class="absolute flex flex-col items-center justify-center w-full h-full border-4 border-dashed cursor-pointer t-0 l-0 hover:bg-gray-100 hover:border-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="invisible w-12 h-12 text-gray-400 group-hover:text-gray-600 group-hover:visible" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span class="invisible pt-1 text-sm font-semibold tracking-wider text-gray-400 select-none group-hover:text-gray-600 group-hover:visible">Alterar imagem</span>
            </div>
          </div>
        </div>
      {/if}
    </div>
    <div class="h-10 col-span-4 mt-3">
      <button
        class="w-full font-medium button hover:bg-blue-600 active:bg-blue-400"
        on:click={handleSubmit}
      >
        {isCreating ? 'Criar Produto' : 'Salvar Alterações'}
      </button>
    </div>
  </div>
</div>

<style scoped>
  .label {
    @apply text-xs font-semibold select-none;
  }

  .button {
    @apply flex items-center justify-center flex-shrink-0 h-full text-sm text-white bg-blue-500 rounded;
  }

  .button:disabled {
    @apply bg-blue-300;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
</style>

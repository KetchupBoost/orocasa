<script>
  import { getContext, onMount } from 'svelte';
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/storage';
  import { Collection } from 'sveltefire';

  import InputMask from '@/components/InputMask.svelte';

  export let isCreating = false;
  export let id;

  let values = {
    name: '',
    price: '0',
    image: '',
    stock: 0,
    category: null
  };
  let categoryTitle = 'Selecione uma categoria';
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

  const { close } = getContext('simple-modal');

  onMount(() => {
    const db = firebase.firestore();

    // If we're editing an existing product, fetch its data
    if (!isCreating && id) {
      db.collection('products')
        .doc(id)
        .get()
        .then(doc => {
          values = doc.data();

          // Fetch category title
          db
            .collection('categories')
            .doc(values.category.toString())
            .get()
            .then(doc => {
              categoryTitle = doc.data().title;
            })
            .catch(err => {
              console.error(err);
            });
        });
    };

    // Handle image uploading
    imageFile.addEventListener('change', () => {
      if (imageFile.files.length === 0)
        return;

      doImageUpload();
    });
  });

  // Helpers
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

  const setCategory = (id, title) => {
    values.category = id;
    categoryTitle = title;
  };

  const handleImageClick = () => {
    if (imageIsUploading)
      return;

    imageFile.click();
  };

  const doImageUpload = () => {
    if (imageFile.files.length === 0)
      return;

    const storage = firebase.storage();

    if (values.image !== '') {
      // Delete the old image from the storage first
      storage
        .refFromURL(values.image)
        .delete();

      values.image = '';
    }

    // Upload image to firebase storage
    imageIsUploading = true;

    const file = imageFile.files[0];
    const productImagesRef = storage
      .ref()
      .child(`images/products/${file.name}`);

    productImagesRef
      .put(file)
      .then(async snapshot => {
        values.image = await snapshot.ref.getDownloadURL();
        imageIsUploading = false;
      });
  }

  const handleSubmit = () => {
    const db = firebase.firestore();

    if (isCreating) {
      // Create a product document on firestore
      const productRef = db
        .collection('products')
        .doc();

      productRef
        .set({
          name: values.name,
          price: values.price,
          image: values.image,
          stock: values.stock,
          category: values.category
        })
        .then(() => {
          close();
        })
        .catch(err => {
          alert(`Erro ao criar produto: ${err}`);
        });
    } else {
      // Update the product document on firestore
      db
        .collection('products')
        .doc(id)
        .update({
          name: values.name,
          price: values.price,
          image: values.image,
          stock: values.stock,
          category: values.category,
          created_in: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          close();
        })
        .catch(err => {
          alert(`Erro ao atualizar produto: ${err}`);
        });
    }
  };

  const handleDelete = () => {
    if (!confirm('Tem certeza que deseja excluir este produto?'))
      return;

    // Delete the product document from firestore
    firebase.firestore()
      .collection('products')
      .doc(id)
      .delete()
      .then(() => {
        close();
      });
  };

</script>

<div class="flex items-center w-full pt-8 {!isCreating && 'pb-12'}">
  <div class="grid w-full grid-cols-4 gap-4 px-4 pb-4">
    <!-- Name -->
    <div class="col-span-full">
      <label for="name" class="label">Nome</label>
      <InputMask
        type="text"
        name="name"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={productNameOptions}
        bind:value={values.name}
      />
    </div>

    <!-- Price -->
    <div class="col-span-full md:col-span-2">
      <label for="price" class="label">Preço</label>
      <div class="flex items-center w-full h-10 gap-2 px-4 mt-1 overflow-hidden text-sm border-2 rounded focus-within:border-black focus-within:border-2 focus-within:px-[15px]">
        <span class="leading-4 select-none">R$</span>
        <InputMask
          type="text"
          name="price"
          class="w-full py-3 leading-4 focus:outline-none"
          unmask="typed"
          imask={productPriceOptions}
          bind:value={values.price}
        />
      </div>
    </div>

    <!-- Stock -->
    <div class="col-span-full md:col-span-2">
      <label for="stock" class="label">Estoque</label>
      <div class="flex items-center justify-between w-full h-10 gap-2 mt-1">
        <button
          class="w-10 bg-blue-500 button hover:bg-blue-600 active:bg-blue-400"
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
          class="flex items-center w-full h-10 px-4 text-sm text-center border-2 rounded"
          bind:value={values.stock}
          on:change={handleStockChange}
        />
        <button
          class="w-10 bg-blue-500 button hover:bg-blue-600 active:bg-blue-400"
          title="Aumentar"
          on:click={increaseStock}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Category -->
    <div class="col-span-full">
      <label for="category" class="label">Categoria</label>
      <div class="flex items-center justify-between w-full h-10 gap-2 mt-1">
        <button class="relative w-full text-sm focus:outline-none group sm:mt-0">
          <div class="flex items-center justify-between h-10 px-3 text-gray-700 border-2 rounded hover:bg-gray-200">
            <span class="text-sm">{categoryTitle}</span>
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="absolute z-10 flex-col items-start hidden w-full pb-1 bg-white rounded shadow-lg group-focus:flex">
            <Collection path={'categories'} let:data={categories}>
              {#each categories as category, i (i)}
                <button
                  class="w-full px-4 py-2 text-left hover:bg-gray-200"
                  on:click={() => setCategory(i, category.title)}
                >
                  {category.title}
                </button>
              {/each}
            </Collection>
          </div>
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
        class="w-full font-medium bg-blue-500 button hover:bg-blue-600 active:bg-blue-400"
        on:click={handleSubmit}
      >
        {isCreating ? 'Criar Produto' : 'Salvar Alterações'}
      </button>
      {#if !isCreating}
        <button
          class="w-full mt-2 font-medium bg-red-500 button hover:bg-red-600 active:bg-red-400"
          on:click={handleDelete}
        >
          Excluir Produto
        </button>
      {/if}
    </div>
  </div>
</div>

<style scoped>
  .group:focus .group-focus\:flex,
  .group-focus\:flex:active {
    display: flex;
  }

  .label {
    @apply text-xs font-semibold select-none;
  }

  .button {
    @apply flex items-center justify-center flex-shrink-0 h-full text-sm text-white rounded;
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

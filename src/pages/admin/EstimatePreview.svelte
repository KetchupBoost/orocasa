<script>
  import { onMount } from 'svelte';
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/storage';
  import 'paper-css/paper.min.css';

  let data = {
    client: {
      address: {
        city: '',
        neighborhood: '',
        state: '',
        street: '',
        zipCode: '',
        reference: ''
      },
      name: ''
    },
    created_in: null,
    products: [],
    professional: '',
    priceTotal: 0,
    paymentConditions: [],
    observations: []
  };
  // let imageURLs = {};

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  // Load data from firebase
  const db = firebase.firestore();

  db
    .collection('estimates')
    .doc(params.id)
    .get()
    .then(doc => {
      const {
        client,
        created_in,
        products,
        professional,
        priceTotal,
        paymentConditions,
        observations
      } = doc.data();

      data.client = client;
      data.professional = professional;
      data.created_in = created_in.seconds;
      data.priceTotal = priceTotal;
      data.paymentConditions = paymentConditions;
      data.observations = observations;

      for (let product of products) {
        // Fetch product data from firebase
        db
          .collection('products')
          .doc(product.id)
          .get()
          .then(async doc => {
            const { name, price, image } = doc.data();

            // // Store the image as a base64 string
            // fetch(image)
            //   .then(res => res.blob())
            //   .then(blob => {
            //     const reader = new FileReader();

            //     reader.onloadend = () => {
            //       imageURLs[image] = reader.result;
            //       imageURLs = { ...imageURLs };
            //     };

            //     reader.readAsDataURL(blob);
            //   });

            // Add product to data
            data.products.push({
              id: product.id,
              name,
              price,
              priceTotal: price * product.count,
              image,
              count: product.count,
              ambient: product.ambient,
              features: product.features
            });

            data = { ...data };
          });
      }
    });

  onMount(() => {
    document.body.classList.add('A4');
  });

  // Helpers
  const handlePrint = () => {
    window.print();
  };

  const formatDate = timestamp => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('pt-BR');
  };

  const formatPrice = price => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };
</script>

<!-- Options -->
<div class="flex flex-col px-6 mt-6 no-print lg:space-x-3 lg:flex-row lg:items-end lg:justify-center">
  <!-- Print -->
  <button
    class="relative w-full text-sm lg:w-auto focus:outline-none"
    on:click={() => handlePrint()}
  >
    <div class="flex items-center justify-start w-full h-10 px-3 text-gray-100 rounded bg-main-500 lg:justify-between lg:w-40 hover:bg-main-600 active:bg-main-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      <span class="w-full font-medium text-center">Imprimir</span>
    </div>
  </button>

  <!-- Send to E-mail -->
  <!-- <button
    class="relative w-full mt-2 text-sm lg:w-auto focus:outline-none lg:mt-0"
    on:click={() => handleMail()}
  >
    <div class="flex items-center justify-start w-full h-10 px-3 text-gray-100 rounded bg-main-500 lg:justify-between hover:bg-main-600 active:bg-main-400 lg:w-52">
      <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <span class="w-full font-medium text-center">
        Enviar para e-mail
      </span>
    </div>
  </button> -->
</div>

<section class="sheet padding-10mm">
  <!-- Page Header -->
  <div class="header w-full h-[85px] flex items-center justify-between">
    <img
      src="/images/oro_casa_logo_small.png"
      alt="Oro Casa"
      class="w-auto h-full"
    />
    <div class="flex flex-col items-center">
      <span class="text-normal">CNPJ: 40.887.491/0001-59</span>
      <span class="text-normal">
        Av. Oito de Abril, 224, Jardim Cuiabá, Cuiabá,
      </span>
      <span class="text-normal">Mato Grosso. CEP: 78043 – 228</span>
      <span class="text-bold">comercial@orocasa.com.br</span>
    </div>
  </div>

  <!-- Estimate Info -->
  <div class="grid grid-cols-4 mt-2 border border-gray-200 estimate-info">
    <div class="col-span-1 text-center bg-gray text-bold">
      Cliente
    </div>
    <div class="col-span-1 text-center border-l border-l-white bg-gray text-bold">
      Data
    </div>
    <div class="col-span-1 text-center border-l border-l-white bg-gray text-bold">
      Cidade
    </div>
    <div class="col-span-1 text-center border-l border-l-white bg-gray text-bold">
      Profissional
    </div>
    <div class="flex items-center justify-center col-span-1 py-[2px] text-normal">
      {data.client.name}
    </div>
    <div class="flex items-center justify-center col-span-1 border-l text-normal">
      {formatDate(data.created_in)}
    </div>
    <div class="flex items-center justify-center col-span-1 border-l text-normal">
      {data.client.address.city} - {data.client.address.state}
    </div>
    <div class="flex items-center justify-center col-span-1 border-l text-normal">
      {data.professional}
    </div>
  </div>

  <!-- Item List Header -->
  <div class="w-full mt-3 flex items-center border-t border-l border-r justify-center h-[45px] bg-gray text-bold">
    ORÇAMENTO
  </div>

  {#each data.products as product, i (i)}
    <!-- Item List -->
    <div class="grid w-full grid-cols-12 border-b product-list">
      <!-- Item -->
      <div class="col-span-3 flex items-center justify-center bg-lightgray text-bold h-[20px]">
        {product.ambient}
      </div>
      <div class="col-span-4 flex items-center justify-center bg-lightgray text-bold h-[20px]">
        Descrição
      </div>
      <div class="col-span-1 flex items-center justify-center bg-lightgray text-bold h-[20px]">
        Qtd.
      </div>
      <div class="col-span-2 flex items-center justify-center bg-lightgray text-bold h-[20px]">
        Valor Un.
      </div>
      <div class="col-span-2 flex items-center justify-center bg-lightgray text-bold h-[20px]">
        Valor Total
      </div>
      <div class="col-span-3 h-[240px] border-l">
        <div
          class="w-full h-full bg-center bg-no-repeat bg-contain image"
          style="background-image: url({product.image})"
        />
      </div>
      <div class="flex flex-col items-center col-span-4 py-3 border-l">
        <span class="text-bold">{product.name}</span>
        <div class="w-full max-w-[160px]">
          <ul class="flex flex-col w-full mt-2 list-disc">
            {#each Object.values(product.features) as { name, value }, i (i)}
              <li>
                <span class="text-light">{name}:</span>
                <span class="text-bold">{value}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
      <div class="col-span-1 pt-3 text-center border-l">
        <span class="text-bold">{product.count}</span>
      </div>
      <div class="col-span-2 pt-3 text-center border-l">
        <span class="text-light">{formatPrice(product.price)}</span>
      </div>
      <div class="col-span-2 pt-3 text-center border-l border-r">
        <span class="text-light">{formatPrice(product.priceTotal)}</span>
      </div>

      {#if i === data.products.length - 1}
        <div class="col-span-3 text-center border-b border-l bg-gray text-bold">
          Valor Total
        </div>
        <div class="col-span-7 border-b border-l border-l-white bg-gray"/>
        <div class="col-span-2 text-center border-b border-l border-r border-l-white bg-gray text-bold">
          {formatPrice(data.priceTotal)}
        </div>
      {/if}
    </div>
  {/each}

  <!-- Payment Info -->
  <div class="mt-12 payment-info">
    <div class="w-full mt-3 flex items-center border-t border-l border-r justify-center h-[35px] bg-gray text-bold">
      Condições de Pagamento
    </div>
    <div class="grid w-full grid-cols-3 border-b border-l border-r">
      {#each data.paymentConditions as line, i (i)}
        <div class="col-span-1 text-center border-t text-light">
          {line.first}
        </div>
        <div class="col-span-1 text-center border-t border-l text-light">
          {line.second}
        </div>
        <div class="col-span-1 text-center border-t border-l text-light">
          {line.third}
        </div>
      {/each}
      <div class="col-span-3 bg-gray h-[15px]"/>
    </div>
  </div>

  <!-- Observations -->
  {#if data.observations.length > 0}
    <div class="w-full mt-5 text-bold">
      <span class="ml-2">Observações:</span>
      <ul class="flex flex-col w-full pl-16 mt-3 list-disc">
        {#each data.observations as item, i (i)}
          <li class="text-normal">{item.value}</li>
        {/each}
      </ul>
    </div>
  {/if}

  <!-- Signatures -->
  <div class="flex justify-between w-full mt-24">
    <div class="border-t border-black w-[288px] text-center text-sm pt-1">
      CLIENTE
    </div>
    <div class="border-t border-black w-[288px] text-center text-sm pt-1">
      CONSULTOR(A) DE VENDAS
    </div>
  </div>
</section>

<style>
  @page {
    size: A4;
  }

  @media screen {
    section {
      overflow-y: visible;
      padding-bottom: 1000px;
    }
  }

  @media print {
    body,
    html {
      width: 100%;
      height: 100%;
    }

    .sheet {
      overflow: visible;
      height: auto !important;
    }

    section {
      /* z-index: 999999;
      position: fixed;
      overflow: auto;
      width: 100%;
      height: 100%; */
      height: auto;
      -webkit-print-color-adjust: exact;
    }

    .header {
      position: fixed;
      width: calc(100% - 20mm);
    }

    .estimate-info {
      margin-top: 25mm;
    }

    .product-list {
      page-break-inside: avoid;
      /* page-break-after: auto; */
    }

    .product-list:nth-child(3n+3),
    .product-list:last-of-type {
      page-break-after: always;
    }

    .product-list:nth-child(3n+3) + .product-list {
      margin-top: 35mm;
    }

    .payment-info {
      page-break-before: always;
      margin-top: 35mm;
    }

    .no-print,
    .no-print * {
      display: none !important;
    }
  }

  .product-list {
    height: 260px;
  }

  ul > li {
    line-height: 5px;
  }

  ul > li span {
    width: 100%;
    height: auto;
    white-space: normal;
    word-wrap: break-word;
  }

  .text-light {
    font-size: 9pt;
    font-weight: 400;
    line-height: 12pt;
  }

  .text-normal {
    font-size: 9pt;
    font-weight: 500;
    line-height: 12pt;
  }

  .text-bold {
    font-size: 9pt;
    font-weight: 700;
    line-height: 12pt;
  }

  .bg-gray {
    background-color: #D9D9D9;
  }

  .bg-lightgray {
    background-color: #F2F2F2;
  }

  .image {
    transform: scale(0.9);
  }
</style>

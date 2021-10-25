<script>
  import { getContext } from 'svelte';

  import InputMask from '@/components/InputMask.svelte';

  export let isNew = false;

  const newPaymentConditionInfo = getContext('newPaymentConditionInfo');
  const newPaymentConditionReady = getContext('newPaymentConditionReady');
  const paymentConditionEditReady = getContext('paymentConditionEditReady');
  const paymentConditionEditIndex = getContext('paymentConditionEditIndex');

  let values = {
    first: '',
    second: '',
    third: ''
  };

  // Input masks
  const valueOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\(\)\-\+\,\.\[\]\!\*\%\=\/\$\;\:\s]+$/
  };

  const isCreating = $paymentConditionEditIndex === null || isNew;

  // If we're editing an existing product order, get the data from the store
  if (!isCreating) {
    values = { ...$newPaymentConditionInfo };
  }

  // Helpers
  const { close } = getContext('simple-modal');

  const handleSubmit = () => {
    if (values.first === '') {
      alert('Preencha a primeira coluna!');
      return;
    }

    if (values.second === '') {
      alert('Preencha a segunda coluna!');
      return;
    }

    if (values.third === '') {
      alert('Preencha a terceira coluna!');
      return;
    }

    $newPaymentConditionInfo = { ...values };

    if (!isCreating) {
      $paymentConditionEditReady = true;
    } else {
      $newPaymentConditionReady = true;
    }

    close();
  };
</script>

<div class="flex items-center w-full pt-8">
  <div class="grid w-full grid-cols-4 gap-4 px-4 pb-4">
    <!-- First Column -->
    <div class="col-span-full">
      <label for="first" class="label">Primeira Coluna</label>
      <InputMask
        type="text"
        name="first"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={valueOptions}
        bind:value={values.first}
      />
    </div>

    <!-- Second Column -->
    <div class="col-span-full">
      <label for="second" class="label">Segunda Coluna</label>
      <InputMask
        type="text"
        name="second"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={valueOptions}
        bind:value={values.second}
      />
    </div>

    <!-- Third Column -->
    <div class="col-span-full">
      <label for="third" class="label">Terceira Coluna</label>
      <InputMask
        type="text"
        name="third"
        class="flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded"
        unmask="typed"
        imask={valueOptions}
        bind:value={values.third}
      />
    </div>

    <div class="h-10 mt-3 col-span-full">
      <button
        class="w-full font-medium bg-main-500 button hover:bg-main-600 active:bg-main-400"
        on:click={handleSubmit}
      >
        {isCreating ? 'Criar Condição de Pagamento' : 'Salvar Alterações'}
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
</style>

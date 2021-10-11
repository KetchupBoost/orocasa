<script>
  import { createEventDispatcher } from 'svelte';

  export let title;
  export let items = {};
  export let selected = [];

  // Helpers
  const dispatch = createEventDispatcher();

  const selectItem = name => {
    selected.push(name);
    selected = [ ...selected ];

    dispatch('change');
  };

  const removeItem = name => {
    selected = selected.filter(item => item !== name);
    selected = [ ...selected ];

    dispatch('change');
  };
</script>

<button class="relative w-full mt-1 mr-3 text-sm focus:outline-none group">
  <div class="flex items-center justify-between min-h-[2.5rem] px-3 border-2 border-gray-200 rounded hover:bg-gray-200 {selected.length === 0 && 'py-2'}">
    {#if selected.length === 0}
      <span class="flex items-center h-6 text-sm">
        {title}
      </span>
      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    {:else}
      <div class="flex flex-wrap w-full h-min-[2.5rem] gap-2 py-2">
        {#each selected as item, i (i)}
          <button
            class="flex items-center h-6 p-1 px-3 text-sm bg-blue-200 border border-blue-300 rounded hover:bg-blue-300 hover:border-blue-400"
            on:click|stopPropagation={() => removeItem(item)}
          >
            <span class="text-sm">{items[item]}</span>
            <span class="flex items-center justify-center h-4 mt-[1px] ml-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[10px] h-[10px]" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
          </button>
        {/each}
      </div>
      {#if selected.length < Object.keys(items).length}
        <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd" />
        </svg>
      {/if}
    {/if}
  </div>
  <div class="absolute z-10 flex-col items-start hidden w-full pb-1 bg-white rounded shadow-lg group-focus:flex">
    {#each Object.entries(items) as [ item, name ], i (i)}
      {#if !selected.includes(item)}
        <button
          class="w-full px-4 py-2 text-left hover:bg-gray-200"
          on:click={() => selectItem(item)}
        >
          {name}
        </button>
      {/if}
    {/each}
  </div>
</button>

<style scoped>
  .group:focus .group-focus\:flex,
  .group-focus\:flex:active {
    display: flex;
  }
</style>

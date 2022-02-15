// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".group-focus\\:flex.svelte-4ngngh.svelte-4ngngh:active,.group.svelte-4ngngh:focus .group-focus\\:flex.svelte-4ngngh{display:flex}.label.svelte-4ngngh.svelte-4ngngh{font-size:.75rem;font-weight:600;line-height:1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.button.svelte-4ngngh.svelte-4ngngh{--tw-text-opacity:1;align-items:center;border-radius:.25rem;color:rgba(255,255,255,var(--tw-text-opacity));display:flex;flex-shrink:0;font-size:.875rem;height:100%;justify-content:center;line-height:1.25rem}.button.svelte-4ngngh.svelte-4ngngh:disabled{--tw-bg-opacity:1;background-color:rgba(147,197,253,var(--tw-bg-opacity))}input.svelte-4ngngh.svelte-4ngngh::-webkit-inner-spin-button,input.svelte-4ngngh.svelte-4ngngh::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=number].svelte-4ngngh.svelte-4ngngh{-moz-appearance:textfield}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
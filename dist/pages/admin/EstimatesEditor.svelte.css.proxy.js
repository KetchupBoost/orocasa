// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".label.svelte-ayohyr{font-size:.75rem;font-weight:600;line-height:1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.product-image.svelte-ayohyr{transform:scale(.9);transition:transform .2s ease-out}.product-image.svelte-ayohyr:hover{transform:scale(1)}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
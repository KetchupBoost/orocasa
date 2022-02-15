// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".grid.svelte-11m2pfp.svelte-11m2pfp:after{content:\"\";display:block;height:35px;width:100%}.group-focus\\:flex.svelte-11m2pfp.svelte-11m2pfp:active,.group.svelte-11m2pfp:focus .group-focus\\:flex.svelte-11m2pfp{display:flex}.product-image.svelte-11m2pfp.svelte-11m2pfp{transform:scale(.9);transition:transform .2s ease-out}.product-image.svelte-11m2pfp.svelte-11m2pfp:hover{transform:scale(1)}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
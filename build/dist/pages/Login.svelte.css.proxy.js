// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".small.svelte-1j1qzho{font-size:110%;line-height:1.2}@media(max-width:768px){.small.svelte-1j1qzho{font-size:4vw}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
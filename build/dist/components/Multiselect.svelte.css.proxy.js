// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".group-focus\\:flex.svelte-15ifxk4.svelte-15ifxk4:active,.group.svelte-15ifxk4:focus .group-focus\\:flex.svelte-15ifxk4{display:flex}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
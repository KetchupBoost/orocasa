// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".label.svelte-1hpph2n{font-size:.75rem;font-weight:600;line-height:1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
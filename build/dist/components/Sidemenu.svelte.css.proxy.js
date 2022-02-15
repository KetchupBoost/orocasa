// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".active.svelte-1jx5asp{--tw-bg-opacity:1;--tw-text-opacity:1;background-color:rgba(249,250,251,var(--tw-bg-opacity));color:rgba(75,85,99,var(--tw-text-opacity))}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
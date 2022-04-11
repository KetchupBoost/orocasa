// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "table.svelte-1ebx01t.svelte-1ebx01t{border-spacing:0 15px}table.svelte-1ebx01t.svelte-1ebx01t:after{content:\"\";display:block;height:35px;width:100%}tr.svelte-1ebx01t td.svelte-1ebx01t:first-child,tr.svelte-1ebx01t th.svelte-1ebx01t:first-child{border-bottom-left-radius:.5rem;border-top-left-radius:.5rem}tr.svelte-1ebx01t td.svelte-1ebx01t:last-child,tr.svelte-1ebx01t th.svelte-1ebx01t:last-child{border-bottom-right-radius:.5rem;border-top-right-radius:.5rem}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "input[type=checkbox]+label.svelte-qberbe span.svelte-qberbe,input[type=checkbox].svelte-qberbe+label.svelte-qberbe{transition:all .2s ease}input[type=checkbox].svelte-qberbe:checked+label.svelte-qberbe{--tw-border-opacity:1;--tw-bg-opacity:1;background-color:rgba(59,130,246,var(--tw-bg-opacity));border-color:rgba(59,130,246,var(--tw-border-opacity))}input[type=checkbox]:checked+label.svelte-qberbe span.svelte-qberbe{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity));margin-left:calc(100% - 1rem)}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
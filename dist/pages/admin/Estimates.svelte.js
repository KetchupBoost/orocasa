import './Estimates.svelte.css.proxy.js';
/* src\pages\admin\Estimates.svelte generated by Svelte v3.43.1 */
import {
	SvelteComponent,
	append,
	attr,
	create_component,
	destroy_block,
	destroy_component,
	detach,
	element,
	empty,
	init,
	insert,
	listen,
	mount_component,
	noop,
	run_all,
	safe_not_equal,
	set_data,
	set_input_value,
	space,
	text,
	transition_in,
	transition_out,
	update_keyed_each
} from "../../../_snowpack/pkg/svelte/internal.js";

import { navigateTo } from '../../../_snowpack/pkg/svelte-router-spa.js';
import firebase from '../../../_snowpack/pkg/firebase/app.js';
import '../../../_snowpack/pkg/firebase/firestore.js';
import { Collection } from '../../../_snowpack/pkg/sveltefire.js';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[12] = list[i];
	child_ctx[14] = i;
	return child_ctx;
}

// (77:8) {:else}
function create_else_block(ctx) {
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
			attr(button, "class", "flex items-center justify-center px-2");
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler*/ ctx[7]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

// (71:8) {#if currentSearchTerm === ''}
function create_if_block_1(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`;
			attr(div, "class", "flex items-center justify-center px-2");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (126:10) {#if filterSearch(estimates, currentSearchTerm).length === 0}
function create_if_block(ctx) {
	let div;

	return {
		c() {
			div = element("div");

			div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 
              <span class="font-semibold text-md">Nenhum orçamento encontrado.</span>`;

			attr(div, "class", "flex flex-col items-center justify-center w-full h-full mt-10 space-y-3 text-gray-500");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (137:10) {#each filterSearch(estimates, currentSearchTerm) as estimate, i (i)}
function create_each_block(key_1, ctx) {
	let tr;
	let td0;
	let span0;
	let t0_value = /*estimate*/ ctx[12].client.name + "";
	let t0;
	let t1;
	let td1;
	let span1;
	let t2_value = /*formatDate*/ ctx[1](/*estimate*/ ctx[12].created_in) + "";
	let t2;
	let t3;
	let td2;
	let button0;
	let t4;
	let button1;
	let t5;
	let button2;
	let t6;
	let mounted;
	let dispose;

	function click_handler_1() {
		return /*click_handler_1*/ ctx[8](/*estimate*/ ctx[12]);
	}

	function click_handler_2() {
		return /*click_handler_2*/ ctx[9](/*estimate*/ ctx[12]);
	}

	function click_handler_3() {
		return /*click_handler_3*/ ctx[10](/*estimate*/ ctx[12]);
	}

	return {
		key: key_1,
		first: null,
		c() {
			tr = element("tr");
			td0 = element("td");
			span0 = element("span");
			t0 = text(t0_value);
			t1 = space();
			td1 = element("td");
			span1 = element("span");
			t2 = text(t2_value);
			t3 = space();
			td2 = element("td");
			button0 = element("button");
			button0.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`;
			t4 = space();
			button1 = element("button");
			button1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`;
			t5 = space();
			button2 = element("button");
			button2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
			t6 = space();
			attr(span0, "class", "ml-3 text-sm font-semibold");
			attr(td0, "class", "flex items-center flex-shrink-0 w-20 col-span-3 p-3 md:flex-shrink md:w-full svelte-1ebx01t");
			attr(span1, "class", "ml-3 text-sm font-semibold");
			attr(td1, "class", "flex items-center flex-shrink-0 w-20 col-span-3 p-3 md:flex-shrink md:w-full svelte-1ebx01t");
			attr(button0, "title", "Visualizar");
			attr(button0, "class", "flex items-center justify-center p-2 text-blue-500 rounded hover:bg-blue-200 active:bg-blue-100");
			attr(button1, "title", "Editar");
			attr(button1, "class", "flex items-center justify-center p-2 text-blue-500 rounded hover:bg-blue-200 active:bg-blue-100");
			attr(button2, "title", "Excluir");
			attr(button2, "class", "flex items-center justify-center p-2 text-red-500 rounded hover:bg-red-200 active:bg-red-100");
			attr(td2, "class", "flex items-center justify-center w-20 p-3 ml-auto md:space-x-3 md:flex-shrink-0 md:w-40 svelte-1ebx01t");
			attr(tr, "class", "flex w-full bg-white rounded-lg shadow-md space-between svelte-1ebx01t");
			this.first = tr;
		},
		m(target, anchor) {
			insert(target, tr, anchor);
			append(tr, td0);
			append(td0, span0);
			append(span0, t0);
			append(tr, t1);
			append(tr, td1);
			append(td1, span1);
			append(span1, t2);
			append(tr, t3);
			append(tr, td2);
			append(td2, button0);
			append(td2, t4);
			append(td2, button1);
			append(td2, t5);
			append(td2, button2);
			append(tr, t6);

			if (!mounted) {
				dispose = [
					listen(button0, "click", click_handler_1),
					listen(button1, "click", click_handler_2),
					listen(button2, "click", click_handler_3)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*estimates, currentSearchTerm*/ 2049 && t0_value !== (t0_value = /*estimate*/ ctx[12].client.name + "")) set_data(t0, t0_value);
			if (dirty & /*estimates, currentSearchTerm*/ 2049 && t2_value !== (t2_value = /*formatDate*/ ctx[1](/*estimate*/ ctx[12].created_in) + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) detach(tr);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (108:8) <Collection            path={'estimates'}            query={ref => ref.orderBy('updated_in', 'desc')}            let:data={estimates}          >
function create_default_slot(ctx) {
	let show_if = /*filterSearch*/ ctx[2](/*estimates*/ ctx[11], /*currentSearchTerm*/ ctx[0]).length === 0;
	let t;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let if_block = show_if && create_if_block(ctx);
	let each_value = /*filterSearch*/ ctx[2](/*estimates*/ ctx[11], /*currentSearchTerm*/ ctx[0]);
	const get_key = ctx => /*i*/ ctx[14];

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	return {
		c() {
			if (if_block) if_block.c();
			t = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, t, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*estimates, currentSearchTerm*/ 2049) show_if = /*filterSearch*/ ctx[2](/*estimates*/ ctx[11], /*currentSearchTerm*/ ctx[0]).length === 0;

			if (show_if) {
				if (if_block) {
					
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(t.parentNode, t);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*deleteEstimate, filterSearch, estimates, currentSearchTerm, openEstimateEditor, openEstimatePreview, formatDate*/ 2111) {
				each_value = /*filterSearch*/ ctx[2](/*estimates*/ ctx[11], /*currentSearchTerm*/ ctx[0]);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, destroy_block, create_each_block, each_1_anchor, get_each_context);
			}
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(t);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d(detaching);
			}

			if (detaching) detach(each_1_anchor);
		}
	};
}

// (113:10) 
function create_loading_slot(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path></svg>`;
			attr(div, "slot", "loading");
			attr(div, "class", "flex items-center justify-center w-full h-full mt-10");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (119:10) 
function create_fallback_slot(ctx) {
	let div;

	return {
		c() {
			div = element("div");

			div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 
            <span class="font-semibold text-md">Erro ao carregar dados!</span>`;

			attr(div, "slot", "fallback");
			attr(div, "class", "flex flex-col items-center justify-center w-full h-full mt-10 space-y-3 text-gray-500");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function create_fragment(ctx) {
	let t0;
	let main;
	let h1;
	let t2;
	let div2;
	let div1;
	let div0;
	let input;
	let t3;
	let t4;
	let div3;
	let table;
	let thead;
	let t10;
	let tbody;
	let collection;
	let current;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*currentSearchTerm*/ ctx[0] === '') return create_if_block_1;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);

	collection = new Collection({
			props: {
				path: 'estimates',
				query: func,
				$$slots: {
					fallback: [
						create_fallback_slot,
						({ data: estimates }) => ({ 11: estimates }),
						({ data: estimates }) => estimates ? 2048 : 0
					],
					loading: [
						create_loading_slot,
						({ data: estimates }) => ({ 11: estimates }),
						({ data: estimates }) => estimates ? 2048 : 0
					],
					default: [
						create_default_slot,
						({ data: estimates }) => ({ 11: estimates }),
						({ data: estimates }) => estimates ? 2048 : 0
					]
				},
				$$scope: { ctx }
			}
		});

	return {
		c() {
			t0 = space();
			main = element("main");
			h1 = element("h1");
			h1.textContent = "Orçamentos";
			t2 = space();
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			input = element("input");
			t3 = space();
			if_block.c();
			t4 = space();
			div3 = element("div");
			table = element("table");
			thead = element("thead");

			thead.innerHTML = `<tr class="flex justify-between svelte-1ebx01t"><th class="w-20 p-3 ml-3 text-left md:w-full svelte-1ebx01t">Nome do Cliente</th> 
          <th class="w-20 p-3 ml-3 text-left md:w-full svelte-1ebx01t">Data</th> 
          <th class="flex-shrink-0 w-20 py-3 text-left md:ml-auto md:p-3 md:text-center md:w-40 svelte-1ebx01t">Ações</th></tr>`;

			t10 = space();
			tbody = element("tbody");
			create_component(collection.$$.fragment);
			document.title = "Admin - Orçamentos";
			attr(h1, "class", "text-3xl");
			attr(input, "class", "flex items-center w-full h-full px-4 bg-gray-100 rounded focus:outline-none");
			attr(input, "type", "text");
			attr(input, "placeholder", "Pesquisar por Cliente");
			attr(div0, "class", "flex items-center justify-between w-full h-10 border-2 border-gray-300 rounded lg:w-50 focus-within:border-2 focus-within:border-black");
			attr(div1, "class", "relative w-full mt-4 text-sm lg:w-auto lg:mt-0");
			attr(div2, "class", "flex flex-col mt-6 lg:flex-row lg:items-end lg:justify-between");
			attr(thead, "class", "sticky text-gray-700 bg-white rounded-lg shadow-lg top-[-15px] uppercase");
			attr(tbody, "class", "flex flex-col space-y-3 flex-rol");
			attr(table, "class", "flex flex-col space-y-3 text-sm text-gray-700 svelte-1ebx01t");
			attr(div3, "class", "flex flex-col w-full mt-6");
			attr(main, "class", "flex flex-col w-screen min-h-screen p-4 pt-8 overflow-y-auto text-gray-800 bg-gray-50 md:p-8");
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			insert(target, main, anchor);
			append(main, h1);
			append(main, t2);
			append(main, div2);
			append(div2, div1);
			append(div1, div0);
			append(div0, input);
			set_input_value(input, /*currentSearchTerm*/ ctx[0]);
			append(div0, t3);
			if_block.m(div0, null);
			append(main, t4);
			append(main, div3);
			append(div3, table);
			append(table, thead);
			append(table, t10);
			append(table, tbody);
			mount_component(collection, tbody, null);
			current = true;

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler*/ ctx[6]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*currentSearchTerm*/ 1 && input.value !== /*currentSearchTerm*/ ctx[0]) {
				set_input_value(input, /*currentSearchTerm*/ ctx[0]);
			}

			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div0, null);
				}
			}

			const collection_changes = {};

			if (dirty & /*$$scope, estimates, currentSearchTerm*/ 34817) {
				collection_changes.$$scope = { dirty, ctx };
			}

			collection.$set(collection_changes);
		},
		i(local) {
			if (current) return;
			transition_in(collection.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(collection.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(t0);
			if (detaching) detach(main);
			if_block.d();
			destroy_component(collection);
			mounted = false;
			dispose();
		}
	};
}

const func = ref => ref.orderBy('updated_in', 'desc');

function instance($$self, $$props, $$invalidate) {
	let currentSearchTerm = '';

	// Helpers
	const formatDate = timestamp => {
		const date = new Date(timestamp.seconds * 1000);
		return date.toLocaleDateString('pt-BR');
	};

	const filterSearch = (items, term) => {
		if (term === '') return items;

		return items.filter(item => {
			const title = item.title.toLowerCase();
			const searchTerm = term.toLowerCase();
			return title.includes(searchTerm);
		});
	};

	const openEstimateEditor = id => {
		navigateTo(`/admin/editor?id=${id}`);
	};

	const openEstimatePreview = id => {
		window.open(`/estimate-preview?id=${id}`, '_blank').focus();
	};

	const deleteEstimate = id => {
		if (!confirm(`Tem certeza que deseja excluir o orçamento?`)) return;
		const db = firebase.firestore();

		db.collection('estimates').doc(id).delete().catch(error => {
			alert(`Erro ao excluir o orçamento: ${error.message}`);
		});
	};

	function input_input_handler() {
		currentSearchTerm = this.value;
		$$invalidate(0, currentSearchTerm);
	}

	const click_handler = () => $$invalidate(0, currentSearchTerm = '');
	const click_handler_1 = estimate => openEstimatePreview(estimate.id);
	const click_handler_2 = estimate => openEstimateEditor(estimate.id);
	const click_handler_3 = estimate => deleteEstimate(estimate.id);

	return [
		currentSearchTerm,
		formatDate,
		filterSearch,
		openEstimateEditor,
		openEstimatePreview,
		deleteEstimate,
		input_input_handler,
		click_handler,
		click_handler_1,
		click_handler_2,
		click_handler_3
	];
}

class Estimates extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Estimates;
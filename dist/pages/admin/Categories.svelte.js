import './Categories.svelte.css.proxy.js';
/* src\pages\admin\Categories.svelte generated by Svelte v3.43.1 */
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
	handle_promise,
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
	update_await_block_branch,
	update_keyed_each
} from "../../../_snowpack/pkg/svelte/internal.js";

import { getContext } from '../../../_snowpack/pkg/svelte.js';
import firebase from '../../../_snowpack/pkg/firebase/app.js';
import '../../../_snowpack/pkg/firebase/firestore.js';
import { Collection } from '../../../_snowpack/pkg/sveltefire.js';
import CategoryEditor from '../../components/CategoryEditor.svelte.js';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[12] = list[i];
	child_ctx[14] = i;
	return child_ctx;
}

// (127:8) {:else}
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
				dispose = listen(button, "click", /*click_handler_1*/ ctx[7]);
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

// (121:8) {#if currentSearchTerm === ''}
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

// (170:10) {#if filterSearch(categories, currentSearchTerm).length === 0}
function create_if_block(ctx) {
	let div;

	return {
		c() {
			div = element("div");

			div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 
              <span class="font-semibold text-md">Nenhuma categoria encontrada.</span>`;

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

// (189:16) {:catch}
function create_catch_block(ctx) {
	let t;

	return {
		c() {
			t = text("???");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (187:16) {:then count}
function create_then_block(ctx) {
	let t_value = /*count*/ ctx[15] + "";
	let t;

	return {
		c() {
			t = text(t_value);
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*categories, currentSearchTerm*/ 2049 && t_value !== (t_value = /*count*/ ctx[15] + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (185:60)                     ...                  {:then count}
function create_pending_block(ctx) {
	let t;

	return {
		c() {
			t = text("...");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (179:10) {#each filterSearch(categories, currentSearchTerm) as category, i (i)}
function create_each_block(key_1, ctx) {
	let tr;
	let td0;
	let span;
	let t0_value = /*category*/ ctx[12].title + "";
	let t0;
	let t1;
	let td1;
	let promise;
	let t2;
	let td2;
	let button0;
	let t3;
	let button1;
	let t4;
	let mounted;
	let dispose;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: true,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 15
	};

	handle_promise(promise = /*getItemCount*/ ctx[2](parseInt(/*category*/ ctx[12].id)), info);

	function click_handler_2() {
		return /*click_handler_2*/ ctx[8](/*category*/ ctx[12]);
	}

	function click_handler_3() {
		return /*click_handler_3*/ ctx[9](/*category*/ ctx[12]);
	}

	return {
		key: key_1,
		first: null,
		c() {
			tr = element("tr");
			td0 = element("td");
			span = element("span");
			t0 = text(t0_value);
			t1 = space();
			td1 = element("td");
			info.block.c();
			t2 = space();
			td2 = element("td");
			button0 = element("button");
			button0.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`;
			t3 = space();
			button1 = element("button");
			button1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
			t4 = space();
			attr(span, "class", "ml-3 text-sm font-semibold");
			attr(td0, "class", "flex items-center flex-shrink-0 w-20 col-span-3 p-3 md:flex-shrink md:w-full svelte-1ebx01t");
			attr(td1, "class", "flex items-center justify-center w-20 p-3 ml-auto text-sm font-semibold md:flex-shrink-0 md:justify-start svelte-1ebx01t");
			attr(button0, "title", "Editar");
			attr(button0, "class", "flex items-center justify-center p-2 text-blue-500 rounded hover:bg-blue-200 active:bg-blue-100");
			attr(button1, "title", "Excluir");
			attr(button1, "class", "flex items-center justify-center p-2 text-red-500 rounded hover:bg-red-200 active:bg-red-100");
			attr(td2, "class", "flex items-center justify-center w-40 p-3 space-x-3 md:flex-shrink-0 svelte-1ebx01t");
			attr(tr, "class", "flex w-full bg-white rounded-lg shadow-md space-between svelte-1ebx01t");
			this.first = tr;
		},
		m(target, anchor) {
			insert(target, tr, anchor);
			append(tr, td0);
			append(td0, span);
			append(span, t0);
			append(tr, t1);
			append(tr, td1);
			info.block.m(td1, info.anchor = null);
			info.mount = () => td1;
			info.anchor = null;
			append(tr, t2);
			append(tr, td2);
			append(td2, button0);
			append(td2, t3);
			append(td2, button1);
			append(tr, t4);

			if (!mounted) {
				dispose = [
					listen(button0, "click", click_handler_2),
					listen(button1, "click", click_handler_3)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*categories, currentSearchTerm*/ 2049 && t0_value !== (t0_value = /*category*/ ctx[12].title + "")) set_data(t0, t0_value);
			info.ctx = ctx;

			if (dirty & /*categories, currentSearchTerm*/ 2049 && promise !== (promise = /*getItemCount*/ ctx[2](parseInt(/*category*/ ctx[12].id))) && handle_promise(promise, info)) {
				
			} else {
				update_await_block_branch(info, ctx, dirty);
			}
		},
		d(detaching) {
			if (detaching) detach(tr);
			info.block.d();
			info.token = null;
			info = null;
			mounted = false;
			run_all(dispose);
		}
	};
}

// (152:8) <Collection            path={'categories'}            query={ref => ref.orderBy('title', 'asc')}            let:data={categories}          >
function create_default_slot(ctx) {
	let show_if = /*filterSearch*/ ctx[1](/*categories*/ ctx[11], /*currentSearchTerm*/ ctx[0]).length === 0;
	let t;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let if_block = show_if && create_if_block(ctx);
	let each_value = /*filterSearch*/ ctx[1](/*categories*/ ctx[11], /*currentSearchTerm*/ ctx[0]);
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
			if (dirty & /*categories, currentSearchTerm*/ 2049) show_if = /*filterSearch*/ ctx[1](/*categories*/ ctx[11], /*currentSearchTerm*/ ctx[0]).length === 0;

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

			if (dirty & /*deleteCategory, filterSearch, categories, currentSearchTerm, showCategoryEditor, getItemCount, parseInt*/ 2079) {
				each_value = /*filterSearch*/ ctx[1](/*categories*/ ctx[11], /*currentSearchTerm*/ ctx[0]);
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

// (157:10) 
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

// (163:10) 
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
	let div3;
	let button;
	let t5;
	let div2;
	let div1;
	let input;
	let t6;
	let t7;
	let div4;
	let table;
	let thead;
	let t13;
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
				path: 'categories',
				query: func,
				$$slots: {
					fallback: [
						create_fallback_slot,
						({ data: categories }) => ({ 11: categories }),
						({ data: categories }) => categories ? 2048 : 0
					],
					loading: [
						create_loading_slot,
						({ data: categories }) => ({ 11: categories }),
						({ data: categories }) => categories ? 2048 : 0
					],
					default: [
						create_default_slot,
						({ data: categories }) => ({ 11: categories }),
						({ data: categories }) => categories ? 2048 : 0
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
			h1.textContent = "Categorias";
			t2 = space();
			div3 = element("div");
			button = element("button");

			button.innerHTML = `<div class="flex items-center justify-start w-full h-10 px-3 text-gray-100 rounded bg-main-500 lg:justify-between lg:w-40 hover:bg-main-600 active:bg-main-400"><svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> 
        <span class="w-full font-medium text-center">Nova Categoria</span></div>`;

			t5 = space();
			div2 = element("div");
			div1 = element("div");
			input = element("input");
			t6 = space();
			if_block.c();
			t7 = space();
			div4 = element("div");
			table = element("table");
			thead = element("thead");

			thead.innerHTML = `<tr class="flex justify-between svelte-1ebx01t"><th class="w-20 col-span-3 p-3 ml-3 text-left md:w-full svelte-1ebx01t">Nome</th> 
          <th class="flex-shrink-0 w-20 py-3 text-left md:p-3 md:ml-auto svelte-1ebx01t">Itens</th> 
          <th class="flex-shrink-0 w-20 col-span-2 py-3 text-left md:p-3 md:text-center md:w-40 svelte-1ebx01t">Ações</th></tr>`;

			t13 = space();
			tbody = element("tbody");
			create_component(collection.$$.fragment);
			document.title = "Admin - Categorias";
			attr(h1, "class", "text-3xl");
			attr(button, "class", "relative w-full mt-4 text-sm lg:w-auto focus:outline-none sm:mt-0");
			attr(input, "class", "flex items-center w-full h-full px-4 bg-gray-100 rounded focus:outline-none");
			attr(input, "type", "text");
			attr(input, "placeholder", "Pesquisar por Nome");
			attr(div1, "class", "flex items-center justify-between w-full h-10 border-2 border-gray-300 rounded lg:w-50 focus-within:border-2 focus-within:border-black");
			attr(div2, "class", "relative w-full mt-4 ml-auto text-sm lg:pl-6 lg:w-auto lg:mt-0");
			attr(div3, "class", "flex flex-col mt-6 lg:flex-row lg:items-end lg:justify-between");
			attr(thead, "class", "sticky text-gray-700 bg-white rounded-lg shadow-lg top-[-15px] uppercase");
			attr(tbody, "class", "flex flex-col space-y-3 flex-rol");
			attr(table, "class", "flex flex-col space-y-3 text-sm text-gray-700 svelte-1ebx01t");
			attr(div4, "class", "flex flex-col w-full mt-6");
			attr(main, "class", "flex flex-col w-screen min-h-screen p-4 pt-8 overflow-y-auto text-gray-800 bg-gray-50 md:p-8");
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			insert(target, main, anchor);
			append(main, h1);
			append(main, t2);
			append(main, div3);
			append(div3, button);
			append(div3, t5);
			append(div3, div2);
			append(div2, div1);
			append(div1, input);
			set_input_value(input, /*currentSearchTerm*/ ctx[0]);
			append(div1, t6);
			if_block.m(div1, null);
			append(main, t7);
			append(main, div4);
			append(div4, table);
			append(table, thead);
			append(table, t13);
			append(table, tbody);
			mount_component(collection, tbody, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(button, "click", /*click_handler*/ ctx[5]),
					listen(input, "input", /*input_input_handler*/ ctx[6])
				];

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
					if_block.m(div1, null);
				}
			}

			const collection_changes = {};

			if (dirty & /*$$scope, categories, currentSearchTerm*/ 67585) {
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
			run_all(dispose);
		}
	};
}

const func = ref => ref.orderBy('title', 'asc');

function instance($$self, $$props, $$invalidate) {
	const { open } = getContext('simple-modal');
	let currentSearchTerm = '';

	// Helpers
	const filterSearch = (items, term) => {
		if (term === '') return items;

		return items.filter(item => {
			const title = item.title.toLowerCase();
			const searchTerm = term.toLowerCase();
			return title.includes(searchTerm);
		});
	};

	const getItemCount = async id => {
		const db = firebase.firestore();

		// Search for products where category is the same as the id
		const products = db.collection('products').where('category', '==', id).get();

		// Count the number of products
		const count = await products.then(snapshot => snapshot.size);

		return count;
	};

	const showCategoryEditor = (isCreating, id) => {
		open(CategoryEditor, { isCreating, id });
	};

	const deleteCategory = (id, title) => {
		if (!confirm(`Tem certeza que deseja excluir a categoria "${title}"?\r\nIsto também resultará na EXCLUSÃO de TODOS OS PRODUTOS da mesma.`)) return;
		const db = firebase.firestore();

		// Delete the products of the category
		db.collection('products').where('category', '==', parseInt(id)).get().then(snapshot => {
			snapshot.forEach(product => {
				// First delete their image
				firebase.storage().refFromURL(product.data().image).delete().then(() => {
					// Then delete the product
					db.collection('products').doc(product.id).delete().catch(error => {
						alert(`Erro ao excluir o produto "${product.data().title}": ${error.message}`);
					});
				}).catch(error => {
					alert(`Erro ao excluir a imagem do produto "${product.data().title}": ${error.message}`);
				});
			});

			// Then delete the category
			db.collection('categories').doc(id).delete().catch(error => {
				alert(`Erro ao excluir a categoria: ${error.message}`);
			});
		});
	};

	const click_handler = () => showCategoryEditor(true);

	function input_input_handler() {
		currentSearchTerm = this.value;
		$$invalidate(0, currentSearchTerm);
	}

	const click_handler_1 = () => $$invalidate(0, currentSearchTerm = '');
	const click_handler_2 = category => showCategoryEditor(false, category.id);
	const click_handler_3 = category => deleteCategory(category.id, category.title);

	return [
		currentSearchTerm,
		filterSearch,
		getItemCount,
		showCategoryEditor,
		deleteCategory,
		click_handler,
		input_input_handler,
		click_handler_1,
		click_handler_2,
		click_handler_3
	];
}

class Categories extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Categories;
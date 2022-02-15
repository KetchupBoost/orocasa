import './EstimatePreview.svelte.css.proxy.js';
/* src\pages\admin\EstimatePreview.svelte generated by Svelte v3.43.1 */
import {
	SvelteComponent,
	append,
	attr,
	destroy_block,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	safe_not_equal,
	set_data,
	set_style,
	space,
	text,
	update_keyed_each
} from "../../../_snowpack/pkg/svelte/internal.js";

import { onMount } from '../../../_snowpack/pkg/svelte.js';
import firebase from '../../../_snowpack/pkg/firebase/app.js';
import '../../../_snowpack/pkg/firebase/firestore.js';
import '../../../_snowpack/pkg/firebase/storage.js';
import '../../../_snowpack/pkg/paper-css/paper.min.css.proxy.js';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	child_ctx[10] = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i];
	child_ctx[10] = i;
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[13] = list[i];
	child_ctx[10] = i;
	return child_ctx;
}

function get_each_context_3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[15] = list[i].name;
	child_ctx[16] = list[i].value;
	child_ctx[10] = i;
	return child_ctx;
}

// (230:12) {#each Object.values(product.features) as { name, value }
function create_each_block_3(key_1, ctx) {
	let li;
	let span0;
	let t0_value = /*name*/ ctx[15] + "";
	let t0;
	let t1;
	let t2;
	let span1;
	let t3_value = /*value*/ ctx[16] + "";
	let t3;
	let t4;

	return {
		key: key_1,
		first: null,
		c() {
			li = element("li");
			span0 = element("span");
			t0 = text(t0_value);
			t1 = text(":");
			t2 = space();
			span1 = element("span");
			t3 = text(t3_value);
			t4 = space();
			attr(span0, "class", "text-light svelte-9fows");
			attr(span1, "class", "text-bold svelte-9fows");
			attr(li, "class", "svelte-9fows");
			this.first = li;
		},
		m(target, anchor) {
			insert(target, li, anchor);
			append(li, span0);
			append(span0, t0);
			append(span0, t1);
			append(li, t2);
			append(li, span1);
			append(span1, t3);
			append(li, t4);
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*data*/ 1 && t0_value !== (t0_value = /*name*/ ctx[15] + "")) set_data(t0, t0_value);
			if (dirty & /*data*/ 1 && t3_value !== (t3_value = /*value*/ ctx[16] + "")) set_data(t3, t3_value);
		},
		d(detaching) {
			if (detaching) detach(li);
		}
	};
}

// (249:6) {#if i === data.products.length - 1}
function create_if_block_1(ctx) {
	let div0;
	let t1;
	let div1;
	let t2;
	let div2;
	let t3_value = /*formatPrice*/ ctx[3](/*data*/ ctx[0].priceTotal) + "";
	let t3;

	return {
		c() {
			div0 = element("div");
			div0.textContent = "Valor Total";
			t1 = space();
			div1 = element("div");
			t2 = space();
			div2 = element("div");
			t3 = text(t3_value);
			attr(div0, "class", "col-span-3 text-center border-b border-l bg-gray text-bold svelte-9fows");
			attr(div1, "class", "col-span-7 border-b border-l border-l-white bg-gray svelte-9fows");
			attr(div2, "class", "col-span-2 text-center border-b border-l border-r border-l-white bg-gray text-bold svelte-9fows");
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			insert(target, t1, anchor);
			insert(target, div1, anchor);
			insert(target, t2, anchor);
			insert(target, div2, anchor);
			append(div2, t3);
		},
		p(ctx, dirty) {
			if (dirty & /*data*/ 1 && t3_value !== (t3_value = /*formatPrice*/ ctx[3](/*data*/ ctx[0].priceTotal) + "")) set_data(t3, t3_value);
		},
		d(detaching) {
			if (detaching) detach(div0);
			if (detaching) detach(t1);
			if (detaching) detach(div1);
			if (detaching) detach(t2);
			if (detaching) detach(div2);
		}
	};
}

// (201:2) {#each data.products as product, i (i)}
function create_each_block_2(key_1, ctx) {
	let div12;
	let div0;
	let t0_value = /*product*/ ctx[13].ambient + "";
	let t0;
	let t1;
	let div1;
	let t3;
	let div2;
	let t5;
	let div3;
	let t7;
	let div4;
	let t9;
	let div6;
	let div5;
	let t10;
	let div8;
	let span0;
	let t11_value = /*product*/ ctx[13].name + "";
	let t11;
	let t12;
	let div7;
	let ul;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let t13;
	let div9;
	let span1;
	let t14_value = /*product*/ ctx[13].count + "";
	let t14;
	let t15;
	let div10;
	let span2;
	let t16_value = /*formatPrice*/ ctx[3](/*product*/ ctx[13].price) + "";
	let t16;
	let t17;
	let div11;
	let span3;
	let t18_value = /*formatPrice*/ ctx[3](/*product*/ ctx[13].priceTotal) + "";
	let t18;
	let t19;
	let t20;
	let each_value_3 = Object.values(/*product*/ ctx[13].features);
	const get_key = ctx => /*i*/ ctx[10];

	for (let i = 0; i < each_value_3.length; i += 1) {
		let child_ctx = get_each_context_3(ctx, each_value_3, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block_3(key, child_ctx));
	}

	let if_block = /*i*/ ctx[10] === /*data*/ ctx[0].products.length - 1 && create_if_block_1(ctx);

	return {
		key: key_1,
		first: null,
		c() {
			div12 = element("div");
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();
			div1 = element("div");
			div1.textContent = "Descrição";
			t3 = space();
			div2 = element("div");
			div2.textContent = "Qtd.";
			t5 = space();
			div3 = element("div");
			div3.textContent = "Valor Un.";
			t7 = space();
			div4 = element("div");
			div4.textContent = "Valor Total";
			t9 = space();
			div6 = element("div");
			div5 = element("div");
			t10 = space();
			div8 = element("div");
			span0 = element("span");
			t11 = text(t11_value);
			t12 = space();
			div7 = element("div");
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t13 = space();
			div9 = element("div");
			span1 = element("span");
			t14 = text(t14_value);
			t15 = space();
			div10 = element("div");
			span2 = element("span");
			t16 = text(t16_value);
			t17 = space();
			div11 = element("div");
			span3 = element("span");
			t18 = text(t18_value);
			t19 = space();
			if (if_block) if_block.c();
			t20 = space();
			attr(div0, "class", "col-span-3 flex items-center justify-center bg-lightgray text-bold h-[20px] svelte-9fows");
			attr(div1, "class", "col-span-4 flex items-center justify-center bg-lightgray text-bold h-[20px] svelte-9fows");
			attr(div2, "class", "col-span-1 flex items-center justify-center bg-lightgray text-bold h-[20px] svelte-9fows");
			attr(div3, "class", "col-span-2 flex items-center justify-center bg-lightgray text-bold h-[20px] svelte-9fows");
			attr(div4, "class", "col-span-2 flex items-center justify-center bg-lightgray text-bold h-[20px] svelte-9fows");
			attr(div5, "class", "w-full h-full bg-center bg-no-repeat bg-contain image svelte-9fows");
			set_style(div5, "background-image", "url(" + /*product*/ ctx[13].image + ")");
			attr(div6, "class", "col-span-3 h-[240px] border-l");
			attr(span0, "class", "text-bold svelte-9fows");
			attr(ul, "class", "flex flex-col w-full mt-2 list-disc svelte-9fows");
			attr(div7, "class", "w-full max-w-[160px]");
			attr(div8, "class", "flex flex-col items-center col-span-4 py-3 border-l");
			attr(span1, "class", "text-bold svelte-9fows");
			attr(div9, "class", "col-span-1 pt-3 text-center border-l");
			attr(span2, "class", "text-light svelte-9fows");
			attr(div10, "class", "col-span-2 pt-3 text-center border-l");
			attr(span3, "class", "text-light svelte-9fows");
			attr(div11, "class", "col-span-2 pt-3 text-center border-l border-r");
			attr(div12, "class", "grid w-full grid-cols-12 border-b product-list svelte-9fows");
			this.first = div12;
		},
		m(target, anchor) {
			insert(target, div12, anchor);
			append(div12, div0);
			append(div0, t0);
			append(div12, t1);
			append(div12, div1);
			append(div12, t3);
			append(div12, div2);
			append(div12, t5);
			append(div12, div3);
			append(div12, t7);
			append(div12, div4);
			append(div12, t9);
			append(div12, div6);
			append(div6, div5);
			append(div12, t10);
			append(div12, div8);
			append(div8, span0);
			append(span0, t11);
			append(div8, t12);
			append(div8, div7);
			append(div7, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			append(div12, t13);
			append(div12, div9);
			append(div9, span1);
			append(span1, t14);
			append(div12, t15);
			append(div12, div10);
			append(div10, span2);
			append(span2, t16);
			append(div12, t17);
			append(div12, div11);
			append(div11, span3);
			append(span3, t18);
			append(div12, t19);
			if (if_block) if_block.m(div12, null);
			append(div12, t20);
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*data*/ 1 && t0_value !== (t0_value = /*product*/ ctx[13].ambient + "")) set_data(t0, t0_value);

			if (dirty & /*data*/ 1) {
				set_style(div5, "background-image", "url(" + /*product*/ ctx[13].image + ")");
			}

			if (dirty & /*data*/ 1 && t11_value !== (t11_value = /*product*/ ctx[13].name + "")) set_data(t11, t11_value);

			if (dirty & /*Object, data*/ 1) {
				each_value_3 = Object.values(/*product*/ ctx[13].features);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_3, each_1_lookup, ul, destroy_block, create_each_block_3, null, get_each_context_3);
			}

			if (dirty & /*data*/ 1 && t14_value !== (t14_value = /*product*/ ctx[13].count + "")) set_data(t14, t14_value);
			if (dirty & /*data*/ 1 && t16_value !== (t16_value = /*formatPrice*/ ctx[3](/*product*/ ctx[13].price) + "")) set_data(t16, t16_value);
			if (dirty & /*data*/ 1 && t18_value !== (t18_value = /*formatPrice*/ ctx[3](/*product*/ ctx[13].priceTotal) + "")) set_data(t18, t18_value);

			if (/*i*/ ctx[10] === /*data*/ ctx[0].products.length - 1) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					if_block.m(div12, t20);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) detach(div12);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			if (if_block) if_block.d();
		}
	};
}

// (267:6) {#each data.paymentConditions as line, i (i)}
function create_each_block_1(key_1, ctx) {
	let div0;
	let t0_value = /*line*/ ctx[11].first + "";
	let t0;
	let t1;
	let div1;
	let t2_value = /*line*/ ctx[11].second + "";
	let t2;
	let t3;
	let div2;
	let t4_value = /*line*/ ctx[11].third + "";
	let t4;

	return {
		key: key_1,
		first: null,
		c() {
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();
			div1 = element("div");
			t2 = text(t2_value);
			t3 = space();
			div2 = element("div");
			t4 = text(t4_value);
			attr(div0, "class", "col-span-1 text-center border-t text-light svelte-9fows");
			attr(div1, "class", "col-span-1 text-center border-t border-l text-light svelte-9fows");
			attr(div2, "class", "col-span-1 text-center border-t border-l text-light svelte-9fows");
			this.first = div0;
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			append(div0, t0);
			insert(target, t1, anchor);
			insert(target, div1, anchor);
			append(div1, t2);
			insert(target, t3, anchor);
			insert(target, div2, anchor);
			append(div2, t4);
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*data*/ 1 && t0_value !== (t0_value = /*line*/ ctx[11].first + "")) set_data(t0, t0_value);
			if (dirty & /*data*/ 1 && t2_value !== (t2_value = /*line*/ ctx[11].second + "")) set_data(t2, t2_value);
			if (dirty & /*data*/ 1 && t4_value !== (t4_value = /*line*/ ctx[11].third + "")) set_data(t4, t4_value);
		},
		d(detaching) {
			if (detaching) detach(div0);
			if (detaching) detach(t1);
			if (detaching) detach(div1);
			if (detaching) detach(t3);
			if (detaching) detach(div2);
		}
	};
}

// (283:2) {#if data.observations.length > 0}
function create_if_block(ctx) {
	let div;
	let span;
	let t1;
	let ul;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_value = /*data*/ ctx[0].observations;
	const get_key = ctx => /*i*/ ctx[10];

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	return {
		c() {
			div = element("div");
			span = element("span");
			span.textContent = "Observações:";
			t1 = space();
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(span, "class", "ml-2");
			attr(ul, "class", "flex flex-col w-full pl-16 mt-3 list-disc svelte-9fows");
			attr(div, "class", "w-full mt-5 text-bold svelte-9fows");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, span);
			append(div, t1);
			append(div, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}
		},
		p(ctx, dirty) {
			if (dirty & /*data*/ 1) {
				each_value = /*data*/ ctx[0].observations;
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, ul, destroy_block, create_each_block, null, get_each_context);
			}
		},
		d(detaching) {
			if (detaching) detach(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};
}

// (287:8) {#each data.observations as item, i (i)}
function create_each_block(key_1, ctx) {
	let li;
	let t_value = /*item*/ ctx[8].value + "";
	let t;

	return {
		key: key_1,
		first: null,
		c() {
			li = element("li");
			t = text(t_value);
			attr(li, "class", "text-normal svelte-9fows");
			this.first = li;
		},
		m(target, anchor) {
			insert(target, li, anchor);
			append(li, t);
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*data*/ 1 && t_value !== (t_value = /*item*/ ctx[8].value + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(li);
		}
	};
}

function create_fragment(ctx) {
	let div1;
	let button;
	let t2;
	let section;
	let div3;
	let t11;
	let div12;
	let div4;
	let t13;
	let div5;
	let t15;
	let div6;
	let t17;
	let div7;
	let t19;
	let div8;
	let t20_value = /*data*/ ctx[0].client.name + "";
	let t20;
	let t21;
	let div9;
	let t22_value = /*formatDate*/ ctx[2](/*data*/ ctx[0].created_in) + "";
	let t22;
	let t23;
	let div10;
	let t24_value = /*data*/ ctx[0].client.address.city + "";
	let t24;
	let t25;
	let t26_value = /*data*/ ctx[0].client.address.state + "";
	let t26;
	let t27;
	let div11;
	let t28_value = /*data*/ ctx[0].professional + "";
	let t28;
	let t29;
	let div13;
	let t31;
	let each_blocks_1 = [];
	let each0_lookup = new Map();
	let t32;
	let div17;
	let div14;
	let t34;
	let div16;
	let each_blocks = [];
	let each1_lookup = new Map();
	let t35;
	let div15;
	let t36;
	let t37;
	let div20;
	let mounted;
	let dispose;
	let each_value_2 = /*data*/ ctx[0].products;
	const get_key = ctx => /*i*/ ctx[10];

	for (let i = 0; i < each_value_2.length; i += 1) {
		let child_ctx = get_each_context_2(ctx, each_value_2, i);
		let key = get_key(child_ctx);
		each0_lookup.set(key, each_blocks_1[i] = create_each_block_2(key, child_ctx));
	}

	let each_value_1 = /*data*/ ctx[0].paymentConditions;
	const get_key_1 = ctx => /*i*/ ctx[10];

	for (let i = 0; i < each_value_1.length; i += 1) {
		let child_ctx = get_each_context_1(ctx, each_value_1, i);
		let key = get_key_1(child_ctx);
		each1_lookup.set(key, each_blocks[i] = create_each_block_1(key, child_ctx));
	}

	let if_block = /*data*/ ctx[0].observations.length > 0 && create_if_block(ctx);

	return {
		c() {
			div1 = element("div");
			button = element("button");

			button.innerHTML = `<div class="flex items-center justify-start w-full h-10 px-3 text-gray-100 rounded bg-main-500 lg:justify-between lg:w-40 hover:bg-main-600 active:bg-main-400 svelte-9fows"><svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-6 h-6 svelte-9fows" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" class="svelte-9fows"></path></svg> 
      <span class="w-full font-medium text-center svelte-9fows">Imprimir</span></div>`;

			t2 = space();
			section = element("section");
			div3 = element("div");

			div3.innerHTML = `<img src="/images/oro_casa_logo_small.png" alt="Oro Casa" class="w-auto h-full"/> 
    <div class="flex flex-col items-center"><span class="text-normal svelte-9fows">CNPJ: 40.887.491/0001-59</span> 
      <span class="text-normal svelte-9fows">Av. Oito de Abril, 224, Jardim Cuiabá, Cuiabá,</span> 
      <span class="text-normal svelte-9fows">Mato Grosso. CEP: 78043 – 228</span> 
      <span class="text-bold svelte-9fows">comercial@orocasa.com.br</span></div>`;

			t11 = space();
			div12 = element("div");
			div4 = element("div");
			div4.textContent = "Cliente";
			t13 = space();
			div5 = element("div");
			div5.textContent = "Data";
			t15 = space();
			div6 = element("div");
			div6.textContent = "Cidade";
			t17 = space();
			div7 = element("div");
			div7.textContent = "Profissional";
			t19 = space();
			div8 = element("div");
			t20 = text(t20_value);
			t21 = space();
			div9 = element("div");
			t22 = text(t22_value);
			t23 = space();
			div10 = element("div");
			t24 = text(t24_value);
			t25 = text(" - ");
			t26 = text(t26_value);
			t27 = space();
			div11 = element("div");
			t28 = text(t28_value);
			t29 = space();
			div13 = element("div");
			div13.textContent = "ORÇAMENTO";
			t31 = space();

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t32 = space();
			div17 = element("div");
			div14 = element("div");
			div14.textContent = "Condições de Pagamento";
			t34 = space();
			div16 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t35 = space();
			div15 = element("div");
			t36 = space();
			if (if_block) if_block.c();
			t37 = space();
			div20 = element("div");

			div20.innerHTML = `<div class="border-t border-black w-[288px] text-center text-sm pt-1">CLIENTE</div> 
    <div class="border-t border-black w-[288px] text-center text-sm pt-1">CONSULTOR(A) DE VENDAS</div>`;

			attr(button, "class", "relative w-full text-sm lg:w-auto focus:outline-none svelte-9fows");
			attr(div1, "class", "flex flex-col px-6 mt-6 no-print lg:space-x-3 lg:flex-row lg:items-end lg:justify-center svelte-9fows");
			attr(div3, "class", "header w-full h-[85px] flex items-center justify-between svelte-9fows");
			attr(div4, "class", "col-span-1 text-center bg-gray text-bold svelte-9fows");
			attr(div5, "class", "col-span-1 text-center border-l border-l-white bg-gray text-bold svelte-9fows");
			attr(div6, "class", "col-span-1 text-center border-l border-l-white bg-gray text-bold svelte-9fows");
			attr(div7, "class", "col-span-1 text-center border-l border-l-white bg-gray text-bold svelte-9fows");
			attr(div8, "class", "flex items-center justify-center col-span-1 py-[2px] text-normal svelte-9fows");
			attr(div9, "class", "flex items-center justify-center col-span-1 border-l text-normal svelte-9fows");
			attr(div10, "class", "flex items-center justify-center col-span-1 border-l text-normal svelte-9fows");
			attr(div11, "class", "flex items-center justify-center col-span-1 border-l text-normal svelte-9fows");
			attr(div12, "class", "grid grid-cols-4 mt-2 border border-gray-200 estimate-info svelte-9fows");
			attr(div13, "class", "w-full mt-3 flex items-center border-t border-l border-r justify-center h-[45px] bg-gray text-bold svelte-9fows");
			attr(div14, "class", "w-full mt-3 flex items-center border-t border-l border-r justify-center h-[35px] bg-gray text-bold svelte-9fows");
			attr(div15, "class", "col-span-3 bg-gray h-[15px] svelte-9fows");
			attr(div16, "class", "grid w-full grid-cols-3 border-b border-l border-r");
			attr(div17, "class", "mt-12 payment-info svelte-9fows");
			attr(div20, "class", "flex justify-between w-full mt-24");
			attr(section, "class", "sheet padding-10mm svelte-9fows");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, button);
			insert(target, t2, anchor);
			insert(target, section, anchor);
			append(section, div3);
			append(section, t11);
			append(section, div12);
			append(div12, div4);
			append(div12, t13);
			append(div12, div5);
			append(div12, t15);
			append(div12, div6);
			append(div12, t17);
			append(div12, div7);
			append(div12, t19);
			append(div12, div8);
			append(div8, t20);
			append(div12, t21);
			append(div12, div9);
			append(div9, t22);
			append(div12, t23);
			append(div12, div10);
			append(div10, t24);
			append(div10, t25);
			append(div10, t26);
			append(div12, t27);
			append(div12, div11);
			append(div11, t28);
			append(section, t29);
			append(section, div13);
			append(section, t31);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(section, null);
			}

			append(section, t32);
			append(section, div17);
			append(div17, div14);
			append(div17, t34);
			append(div17, div16);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div16, null);
			}

			append(div16, t35);
			append(div16, div15);
			append(section, t36);
			if (if_block) if_block.m(section, null);
			append(section, t37);
			append(section, div20);

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler*/ ctx[4]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*data*/ 1 && t20_value !== (t20_value = /*data*/ ctx[0].client.name + "")) set_data(t20, t20_value);
			if (dirty & /*data*/ 1 && t22_value !== (t22_value = /*formatDate*/ ctx[2](/*data*/ ctx[0].created_in) + "")) set_data(t22, t22_value);
			if (dirty & /*data*/ 1 && t24_value !== (t24_value = /*data*/ ctx[0].client.address.city + "")) set_data(t24, t24_value);
			if (dirty & /*data*/ 1 && t26_value !== (t26_value = /*data*/ ctx[0].client.address.state + "")) set_data(t26, t26_value);
			if (dirty & /*data*/ 1 && t28_value !== (t28_value = /*data*/ ctx[0].professional + "")) set_data(t28, t28_value);

			if (dirty & /*formatPrice, data, Object*/ 9) {
				each_value_2 = /*data*/ ctx[0].products;
				each_blocks_1 = update_keyed_each(each_blocks_1, dirty, get_key, 1, ctx, each_value_2, each0_lookup, section, destroy_block, create_each_block_2, t32, get_each_context_2);
			}

			if (dirty & /*data*/ 1) {
				each_value_1 = /*data*/ ctx[0].paymentConditions;
				each_blocks = update_keyed_each(each_blocks, dirty, get_key_1, 1, ctx, each_value_1, each1_lookup, div16, destroy_block, create_each_block_1, t35, get_each_context_1);
			}

			if (/*data*/ ctx[0].observations.length > 0) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(section, t37);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
			if (detaching) detach(t2);
			if (detaching) detach(section);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].d();
			}

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let data = {
		client: {
			address: {
				city: '',
				neighborhood: '',
				state: '',
				street: '',
				zipCode: '',
				reference: ''
			},
			name: ''
		},
		created_in: null,
		products: [],
		professional: '',
		priceTotal: 0,
		paymentConditions: [],
		observations: []
	};

	// let imageURLs = {};
	const urlSearchParams = new URLSearchParams(window.location.search);

	const params = Object.fromEntries(urlSearchParams.entries());

	// Load data from firebase
	const db = firebase.firestore();

	db.collection('estimates').doc(params.id).get().then(doc => {
		const { client, created_in, products, professional, priceTotal, paymentConditions, observations } = doc.data();
		$$invalidate(0, data.client = client, data);
		$$invalidate(0, data.professional = professional, data);
		$$invalidate(0, data.created_in = created_in.seconds, data);
		$$invalidate(0, data.priceTotal = priceTotal, data);
		$$invalidate(0, data.paymentConditions = paymentConditions, data);
		$$invalidate(0, data.observations = observations, data);

		for (let product of products) {
			// Fetch product data from firebase
			db.collection('products').doc(product.id).get().then(async doc => {
				const { name, price, image } = doc.data();

				// // Store the image as a base64 string
				// fetch(image)
				//   .then(res => res.blob())
				//   .then(blob => {
				//     const reader = new FileReader();
				//     reader.onloadend = () => {
				//       imageURLs[image] = reader.result;
				//       imageURLs = { ...imageURLs };
				//     };
				//     reader.readAsDataURL(blob);
				//   });
				// Add product to data
				data.products.push({
					id: product.id,
					name,
					price,
					priceTotal: price * product.count,
					image,
					count: product.count,
					ambient: product.ambient,
					features: product.features
				});

				$$invalidate(0, data = { ...data });
			});
		}
	});

	onMount(() => {
		document.body.classList.add('A4');
	});

	// Helpers
	const handlePrint = () => {
		window.print();
	};

	const formatDate = timestamp => {
		const date = new Date(timestamp * 1000);
		return date.toLocaleDateString('pt-BR');
	};

	const formatPrice = price => {
		return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
	};

	const click_handler = () => handlePrint();
	return [data, handlePrint, formatDate, formatPrice, click_handler];
}

class EstimatePreview extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default EstimatePreview;
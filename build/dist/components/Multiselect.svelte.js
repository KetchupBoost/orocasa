import './Multiselect.svelte.css.proxy.js';
/* src\components\Multiselect.svelte generated by Svelte v3.46.3 */
import {
	SvelteComponent,
	append,
	attr,
	destroy_block,
	detach,
	element,
	empty,
	init,
	insert,
	listen,
	noop,
	safe_not_equal,
	set_data,
	space,
	stop_propagation,
	svg_element,
	text,
	update_keyed_each
} from "../../_snowpack/pkg/svelte/internal.js";

import { createEventDispatcher } from '../../_snowpack/pkg/svelte.js';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i][0];
	child_ctx[9] = list[i][1];
	child_ctx[11] = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	child_ctx[11] = i;
	return child_ctx;
}

// (35:4) {:else}
function create_else_block(ctx) {
	let div;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let t;
	let show_if;
	let if_block_anchor;
	let each_value_1 = /*selected*/ ctx[0];
	const get_key = ctx => /*i*/ ctx[11];

	for (let i = 0; i < each_value_1.length; i += 1) {
		let child_ctx = get_each_context_1(ctx, each_value_1, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block_1(key, child_ctx));
	}

	function select_block_type_1(ctx, dirty) {
		if (dirty & /*selected, items*/ 5) show_if = null;
		if (show_if == null) show_if = !!(/*selected*/ ctx[0].length < Object.keys(/*items*/ ctx[2]).length);
		if (show_if) return create_if_block_2;
		return create_else_block_1;
	}

	let current_block_type = select_block_type_1(ctx, -1);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			if_block.c();
			if_block_anchor = empty();
			attr(div, "class", "flex flex-wrap w-full h-min-[2.5rem] gap-2 py-2");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			insert(target, t, anchor);
			if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*removeItem, selected, items*/ 21) {
				each_value_1 = /*selected*/ ctx[0];
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_1, each_1_lookup, div, destroy_block, create_each_block_1, null, get_each_context_1);
			}

			if (current_block_type !== (current_block_type = select_block_type_1(ctx, dirty))) {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d(detaching) {
			if (detaching) detach(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			if (detaching) detach(t);
			if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (28:4) {#if selected.length === 0}
function create_if_block_1(ctx) {
	let span;
	let t0;
	let t1;
	let svg;
	let path;

	return {
		c() {
			span = element("span");
			t0 = text(/*title*/ ctx[1]);
			t1 = space();
			svg = svg_element("svg");
			path = svg_element("path");
			attr(span, "class", "flex items-center h-6 text-sm");
			attr(path, "fill-rule", "evenodd");
			attr(path, "d", "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z");
			attr(path, "clip-rule", "evenodd");
			attr(svg, "class", "w-4 h-4");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "viewBox", "0 0 20 20");
			attr(svg, "fill", "currentColor");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t0);
			insert(target, t1, anchor);
			insert(target, svg, anchor);
			append(svg, path);
		},
		p(ctx, dirty) {
			if (dirty & /*title*/ 2) set_data(t0, /*title*/ ctx[1]);
		},
		d(detaching) {
			if (detaching) detach(span);
			if (detaching) detach(t1);
			if (detaching) detach(svg);
		}
	};
}

// (37:8) {#each selected as item, i (i)}
function create_each_block_1(key_1, ctx) {
	let button;
	let span0;
	let t0_value = /*items*/ ctx[2][/*item*/ ctx[8]] + "";
	let t0;
	let t1;
	let span1;
	let t2;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[5](/*item*/ ctx[8]);
	}

	return {
		key: key_1,
		first: null,
		c() {
			button = element("button");
			span0 = element("span");
			t0 = text(t0_value);
			t1 = space();
			span1 = element("span");
			span1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-[10px] h-[10px]" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
			t2 = space();
			attr(span0, "class", "text-sm");
			attr(span1, "class", "flex items-center justify-center h-4 mt-[1px] ml-1");
			attr(button, "class", "flex items-center h-6 p-1 px-3 text-sm bg-blue-200 border border-blue-300 rounded hover:bg-blue-300 hover:border-blue-400");
			this.first = button;
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, span0);
			append(span0, t0);
			append(button, t1);
			append(button, span1);
			append(button, t2);

			if (!mounted) {
				dispose = listen(button, "click", stop_propagation(click_handler));
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*items, selected*/ 5 && t0_value !== (t0_value = /*items*/ ctx[2][/*item*/ ctx[8]] + "")) set_data(t0, t0_value);
		},
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

// (55:6) {:else}
function create_else_block_1(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "fill-rule", "evenodd");
			attr(path, "d", "M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z");
			attr(path, "clip-rule", "evenodd");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", "w-4 h-4 text-gray-400");
			attr(svg, "viewBox", "0 0 20 20");
			attr(svg, "fill", "currentColor");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (51:6) {#if selected.length < Object.keys(items).length}
function create_if_block_2(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "fill-rule", "evenodd");
			attr(path, "d", "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z");
			attr(path, "clip-rule", "evenodd");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", "flex-shrink-0 w-4 h-4 ml-2");
			attr(svg, "viewBox", "0 0 20 20");
			attr(svg, "fill", "currentColor");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (64:6) {#if !selected.includes(item)}
function create_if_block(ctx) {
	let button;
	let t0_value = /*name*/ ctx[9] + "";
	let t0;
	let t1;
	let mounted;
	let dispose;

	function click_handler_1() {
		return /*click_handler_1*/ ctx[6](/*item*/ ctx[8]);
	}

	return {
		c() {
			button = element("button");
			t0 = text(t0_value);
			t1 = space();
			attr(button, "class", "w-full px-4 py-2 text-left hover:bg-gray-200");
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, t0);
			append(button, t1);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_1);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*items*/ 4 && t0_value !== (t0_value = /*name*/ ctx[9] + "")) set_data(t0, t0_value);
		},
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

// (63:4) {#each Object.entries(items) as [ item, name ], i (i)}
function create_each_block(key_1, ctx) {
	let first;
	let show_if = !/*selected*/ ctx[0].includes(/*item*/ ctx[8]);
	let if_block_anchor;
	let if_block = show_if && create_if_block(ctx);

	return {
		key: key_1,
		first: null,
		c() {
			first = empty();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			this.first = first;
		},
		m(target, anchor) {
			insert(target, first, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*selected, items*/ 5) show_if = !/*selected*/ ctx[0].includes(/*item*/ ctx[8]);

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) detach(first);
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment(ctx) {
	let button;
	let div0;
	let div0_class_value;
	let t;
	let div1;
	let each_blocks = [];
	let each_1_lookup = new Map();

	function select_block_type(ctx, dirty) {
		if (/*selected*/ ctx[0].length === 0) return create_if_block_1;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);
	let each_value = Object.entries(/*items*/ ctx[2]);
	const get_key = ctx => /*i*/ ctx[11];

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	return {
		c() {
			button = element("button");
			div0 = element("div");
			if_block.c();
			t = space();
			div1 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div0, "class", div0_class_value = "flex items-center justify-between min-h-[2.5rem] px-3 border-2 border-gray-200 rounded hover:bg-gray-200 " + (/*selected*/ ctx[0].length === 0 && 'py-2') + " svelte-15ifxk4");
			attr(div1, "class", "absolute z-10 flex-col items-start hidden w-full pb-1 bg-white rounded shadow-lg group-focus:flex svelte-15ifxk4");
			attr(button, "class", "relative w-full mt-1 mr-3 text-sm focus:outline-none group svelte-15ifxk4");
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, div0);
			if_block.m(div0, null);
			append(button, t);
			append(button, div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}
		},
		p(ctx, [dirty]) {
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

			if (dirty & /*selected*/ 1 && div0_class_value !== (div0_class_value = "flex items-center justify-between min-h-[2.5rem] px-3 border-2 border-gray-200 rounded hover:bg-gray-200 " + (/*selected*/ ctx[0].length === 0 && 'py-2') + " svelte-15ifxk4")) {
				attr(div0, "class", div0_class_value);
			}

			if (dirty & /*selectItem, Object, items, selected*/ 13) {
				each_value = Object.entries(/*items*/ ctx[2]);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div1, destroy_block, create_each_block, null, get_each_context);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(button);
			if_block.d();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { title } = $$props;
	let { items = {} } = $$props;
	let { selected = [] } = $$props;

	// Helpers
	const dispatch = createEventDispatcher();

	const selectItem = name => {
		selected.push(name);
		$$invalidate(0, selected = [...selected]);
		dispatch('change');
	};

	const removeItem = name => {
		$$invalidate(0, selected = selected.filter(item => item !== name));
		$$invalidate(0, selected = [...selected]);
		dispatch('change');
	};

	const click_handler = item => removeItem(item);
	const click_handler_1 = item => selectItem(item);

	$$self.$$set = $$props => {
		if ('title' in $$props) $$invalidate(1, title = $$props.title);
		if ('items' in $$props) $$invalidate(2, items = $$props.items);
		if ('selected' in $$props) $$invalidate(0, selected = $$props.selected);
	};

	return [selected, title, items, selectItem, removeItem, click_handler, click_handler_1];
}

class Multiselect extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { title: 1, items: 2, selected: 0 });
	}
}

export default Multiselect;
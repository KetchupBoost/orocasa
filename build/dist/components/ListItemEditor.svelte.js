import './ListItemEditor.svelte.css.proxy.js';
/* src\components\ListItemEditor.svelte generated by Svelte v3.46.3 */
import {
	SvelteComponent,
	add_flush_callback,
	append,
	attr,
	bind,
	binding_callbacks,
	create_component,
	destroy_component,
	detach,
	element,
	init,
	insert,
	listen,
	mount_component,
	safe_not_equal,
	set_style,
	space,
	svg_element,
	transition_in,
	transition_out
} from "../../_snowpack/pkg/svelte/internal.js";

import { getContext, onMount } from '../../_snowpack/pkg/svelte.js';
import firebase from '../../_snowpack/pkg/firebase/app.js';
import '../../_snowpack/pkg/firebase/firestore.js';
import '../../_snowpack/pkg/firebase/storage.js';
import InputMask from './InputMask.svelte.js';
import TextareaMask from './TextareaMask.svelte.js';

function create_else_block_1(ctx) {
	let div2;
	let div1;
	let div0;
	let mounted;
	let dispose;

	return {
		c() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");

			div0.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="invisible w-12 h-12 text-gray-400 group-hover:text-gray-600 group-hover:visible" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg> 
              <span class="invisible pt-1 text-sm font-semibold tracking-wider text-gray-400 select-none group-hover:text-gray-600 group-hover:visible">Alterar imagem</span>`;

			attr(div0, "class", "absolute flex flex-col items-center justify-center w-full h-full border-4 border-dashed cursor-pointer t-0 l-0 hover:bg-gray-100 hover:border-gray-300");
			attr(div1, "class", "relative h-full bg-center bg-no-repeat bg-contain group w-60");
			set_style(div1, "background-image", "url(" + /*values*/ ctx[0].image + ")");
			attr(div2, "class", "flex items-center justify-center w-full h-60");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div1);
			append(div1, div0);

			if (!mounted) {
				dispose = listen(div1, "click", /*handleImageClick*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*values*/ 1) {
				set_style(div1, "background-image", "url(" + /*values*/ ctx[0].image + ")");
			}
		},
		d(detaching) {
			if (detaching) detach(div2);
			mounted = false;
			dispose();
		}
	};
}

// (171:6) {#if values.image === ''}
function create_if_block(ctx) {
	let div1;
	let div0;
	let div1_class_value;
	let mounted;
	let dispose;

	function select_block_type_1(ctx, dirty) {
		if (/*imageIsUploading*/ ctx[1]) return create_if_block_1;
		return create_else_block;
	}

	let current_block_type = select_block_type_1(ctx, -1);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			if_block.c();
			attr(div0, "class", "flex flex-col items-center justify-center py-6");

			attr(div1, "class", div1_class_value = "flex flex-col w-full mt-1 border-4 border-dashed group " + (/*imageIsUploading*/ ctx[1]
			? 'cursor-wait'
			: 'cursor-pointer hover:bg-gray-100 hover:border-gray-300'));
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			if_block.m(div0, null);

			if (!mounted) {
				dispose = listen(div1, "click", /*handleImageClick*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (current_block_type !== (current_block_type = select_block_type_1(ctx, dirty))) {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div0, null);
				}
			}

			if (dirty & /*imageIsUploading*/ 2 && div1_class_value !== (div1_class_value = "flex flex-col w-full mt-1 border-4 border-dashed group " + (/*imageIsUploading*/ ctx[1]
			? 'cursor-wait'
			: 'cursor-pointer hover:bg-gray-100 hover:border-gray-300'))) {
				attr(div1, "class", div1_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div1);
			if_block.d();
			mounted = false;
			dispose();
		}
	};
}

// (184:12) {:else}
function create_else_block(ctx) {
	let svg;
	let path;
	let t0;
	let span;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			t0 = space();
			span = element("span");
			span.textContent = "Enviar uma imagem";
			attr(path, "stroke-linecap", "round");
			attr(path, "stroke-linejoin", "round");
			attr(path, "stroke-width", "2");
			attr(path, "d", "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", "w-12 h-12 text-gray-400 group-hover:text-gray-600");
			attr(svg, "fill", "none");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "stroke", "currentColor");
			attr(span, "class", "pt-1 text-sm font-semibold tracking-wider text-gray-400 select-none group-hover:text-gray-600");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
			insert(target, t0, anchor);
			insert(target, span, anchor);
		},
		d(detaching) {
			if (detaching) detach(svg);
			if (detaching) detach(t0);
			if (detaching) detach(span);
		}
	};
}

// (177:12) {#if imageIsUploading}
function create_if_block_1(ctx) {
	let svg;
	let path;
	let t0;
	let span;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			t0 = space();
			span = element("span");
			span.textContent = "Enviando...";
			attr(path, "stroke-linecap", "round");
			attr(path, "stroke-linejoin", "round");
			attr(path, "stroke-width", "2");
			attr(path, "d", "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", "w-12 h-12 text-gray-400 animate-bounce");
			attr(svg, "fill", "none");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "stroke", "currentColor");
			attr(span, "class", "pt-1 text-sm font-semibold tracking-wider text-gray-400 select-none");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
			insert(target, t0, anchor);
			insert(target, span, anchor);
		},
		d(detaching) {
			if (detaching) detach(svg);
			if (detaching) detach(t0);
			if (detaching) detach(span);
		}
	};
}

function create_fragment(ctx) {
	let div5;
	let div4;
	let div0;
	let label0;
	let t1;
	let inputmask;
	let updating_value;
	let t2;
	let div1;
	let label1;
	let t4;
	let textareamask;
	let updating_value_1;
	let t5;
	let div2;
	let label2;
	let t7;
	let input;
	let t8;
	let t9;
	let div3;
	let button;
	let current;
	let mounted;
	let dispose;

	function inputmask_value_binding(value) {
		/*inputmask_value_binding*/ ctx[10](value);
	}

	let inputmask_props = {
		type: "text",
		name: "name",
		class: "flex items-center w-full h-10 px-4 mt-1 text-sm border-2 rounded",
		unmask: "typed",
		imask: /*nameOptions*/ ctx[3]
	};

	if (/*values*/ ctx[0].name !== void 0) {
		inputmask_props.value = /*values*/ ctx[0].name;
	}

	inputmask = new InputMask({ props: inputmask_props });
	binding_callbacks.push(() => bind(inputmask, 'value', inputmask_value_binding));

	function textareamask_value_binding(value) {
		/*textareamask_value_binding*/ ctx[11](value);
	}

	let textareamask_props = {
		name: "text",
		class: "flex items-center w-full h-32 p-4 mt-1 text-sm border-2 rounded",
		unmask: "typed",
		imask: /*textOptions*/ ctx[4]
	};

	if (/*values*/ ctx[0].text !== void 0) {
		textareamask_props.value = /*values*/ ctx[0].text;
	}

	textareamask = new TextareaMask({ props: textareamask_props });
	binding_callbacks.push(() => bind(textareamask, 'value', textareamask_value_binding));

	function select_block_type(ctx, dirty) {
		if (/*values*/ ctx[0].image === '') return create_if_block;
		return create_else_block_1;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div5 = element("div");
			div4 = element("div");
			div0 = element("div");
			label0 = element("label");
			label0.textContent = "Nome";
			t1 = space();
			create_component(inputmask.$$.fragment);
			t2 = space();
			div1 = element("div");
			label1 = element("label");
			label1.textContent = "Texto";
			t4 = space();
			create_component(textareamask.$$.fragment);
			t5 = space();
			div2 = element("div");
			label2 = element("label");
			label2.textContent = "Imagem";
			t7 = space();
			input = element("input");
			t8 = space();
			if_block.c();
			t9 = space();
			div3 = element("div");
			button = element("button");
			button.textContent = "Salvar Alterações";
			attr(label0, "for", "name");
			attr(label0, "class", "label svelte-1veono");
			attr(div0, "class", "col-span-full");
			attr(label1, "for", "text");
			attr(label1, "class", "label svelte-1veono");
			attr(div1, "class", "col-span-full");
			attr(label2, "for", "image");
			attr(label2, "class", "label svelte-1veono");
			attr(input, "type", "file");
			attr(input, "name", "image");
			attr(input, "id", "image_file");
			attr(input, "accept", "image/png,image/jpeg,image/webp");
			input.hidden = true;
			attr(input, "class", "svelte-1veono");
			attr(div2, "class", "col-span-full");
			attr(button, "class", "w-full font-medium bg-main-500 button hover:bg-main-600 active:bg-main-400 svelte-1veono");
			attr(div3, "class", "h-10 col-span-4 mt-3");
			attr(div4, "class", "grid w-full grid-cols-4 gap-4 px-4 pb-4");
			attr(div5, "class", "flex items-center w-full pt-8");
		},
		m(target, anchor) {
			insert(target, div5, anchor);
			append(div5, div4);
			append(div4, div0);
			append(div0, label0);
			append(div0, t1);
			mount_component(inputmask, div0, null);
			append(div4, t2);
			append(div4, div1);
			append(div1, label1);
			append(div1, t4);
			mount_component(textareamask, div1, null);
			append(div4, t5);
			append(div4, div2);
			append(div2, label2);
			append(div2, t7);
			append(div2, input);
			/*input_binding*/ ctx[12](input);
			append(div2, t8);
			if_block.m(div2, null);
			append(div4, t9);
			append(div4, div3);
			append(div3, button);
			current = true;

			if (!mounted) {
				dispose = listen(button, "click", /*handleSubmit*/ ctx[6]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const inputmask_changes = {};

			if (!updating_value && dirty & /*values*/ 1) {
				updating_value = true;
				inputmask_changes.value = /*values*/ ctx[0].name;
				add_flush_callback(() => updating_value = false);
			}

			inputmask.$set(inputmask_changes);
			const textareamask_changes = {};

			if (!updating_value_1 && dirty & /*values*/ 1) {
				updating_value_1 = true;
				textareamask_changes.value = /*values*/ ctx[0].text;
				add_flush_callback(() => updating_value_1 = false);
			}

			textareamask.$set(textareamask_changes);

			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div2, null);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(inputmask.$$.fragment, local);
			transition_in(textareamask.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(inputmask.$$.fragment, local);
			transition_out(textareamask.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div5);
			destroy_component(inputmask);
			destroy_component(textareamask);
			/*input_binding*/ ctx[12](null);
			if_block.d();
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { list } = $$props;
	let { index } = $$props;

	let { onClosed = () => {
		
	} } = $$props;

	let values = { image: '', name: '', text: '' };
	let fullList = [];
	let imageIsUploading = false;
	let imageFile;

	// Input masks
	const nameOptions = { mask: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/ };

	const textOptions = {
		mask: /^[A-Za-zÀ-ÖØ-öø-ÿ\-\/\(\)\,\.\!\&\%\$\#\@\"\'\*0-9\s]+$/
	};

	const db = firebase.firestore();

	// Fetch the data from firebase
	db.collection('settings').doc('landing-data').get().then(doc => {
		fullList = doc.data()[list];
		$$invalidate(0, values = { ...fullList[index] });
	});

	onMount(() => {
		// Handle image uploading
		imageFile.addEventListener('change', () => {
			if (imageFile.files.length === 0) return;
			doImageUpload();
		});
	});

	// Helpers
	const { close } = getContext('simple-modal');

	const handleImageClick = () => {
		if (imageIsUploading) return;
		imageFile.click();
	};

	const doImageUpload = () => {
		if (imageFile.files.length === 0) return;
		const storage = firebase.storage();

		if (values.image !== '') {
			// Delete the old image from the storage first
			storage.refFromURL(values.image).delete();

			$$invalidate(0, values.image = '', values);
		}

		// Upload image to firebase storage
		$$invalidate(1, imageIsUploading = true);

		const file = imageFile.files[0];
		const productImagesRef = storage.ref().child(`images/lists/${list}/${file.name}`);

		productImagesRef.put(file).then(async snapshot => {
			$$invalidate(0, values.image = await snapshot.ref.getDownloadURL(), values);
			$$invalidate(1, imageIsUploading = false);
		});
	};

	// FIXME: Delete the image from storage if the user doesn't submit the form
	const handleSubmit = () => {
		const db = firebase.firestore();

		if (values.name === '') {
			alert('Preencha o nome do item!');
			return;
		}

		if (values.text === null) {
			alert('Preencha o texto do item!');
			return;
		}

		if (values.image === '') {
			alert('Envie uma imagem!');
			return;
		}

		// Update the full list
		fullList[index] = values;

		// Update the document on firestore
		db.collection('settings').doc('landing-data').update({ [list]: fullList }).then(() => {
			onClosed();
			close();
		}).catch(err => {
			alert(`Erro ao atualizar item: ${err}`);
		});
	};

	function inputmask_value_binding(value) {
		if ($$self.$$.not_equal(values.name, value)) {
			values.name = value;
			$$invalidate(0, values);
		}
	}

	function textareamask_value_binding(value) {
		if ($$self.$$.not_equal(values.text, value)) {
			values.text = value;
			$$invalidate(0, values);
		}
	}

	function input_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			imageFile = $$value;
			$$invalidate(2, imageFile);
		});
	}

	$$self.$$set = $$props => {
		if ('list' in $$props) $$invalidate(7, list = $$props.list);
		if ('index' in $$props) $$invalidate(8, index = $$props.index);
		if ('onClosed' in $$props) $$invalidate(9, onClosed = $$props.onClosed);
	};

	return [
		values,
		imageIsUploading,
		imageFile,
		nameOptions,
		textOptions,
		handleImageClick,
		handleSubmit,
		list,
		index,
		onClosed,
		inputmask_value_binding,
		textareamask_value_binding,
		input_binding
	];
}

class ListItemEditor extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { list: 7, index: 8, onClosed: 9 });
	}
}

export default ListItemEditor;
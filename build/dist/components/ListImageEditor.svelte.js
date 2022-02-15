import './ListImageEditor.svelte.css.proxy.js';
/* src\components\ListImageEditor.svelte generated by Svelte v3.46.3 */
import {
	SvelteComponent,
	append,
	attr,
	binding_callbacks,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	safe_not_equal,
	set_style,
	space,
	svg_element
} from "../../_snowpack/pkg/svelte/internal.js";

import { getContext, onMount } from '../../_snowpack/pkg/svelte.js';
import firebase from '../../_snowpack/pkg/firebase/app.js';
import '../../_snowpack/pkg/firebase/firestore.js';
import '../../_snowpack/pkg/firebase/storage.js';

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
			set_style(div1, "background-image", "url(" + /*values*/ ctx[0].url + ")");
			attr(div2, "class", "flex items-center justify-center w-full h-60");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div1);
			append(div1, div0);

			if (!mounted) {
				dispose = listen(div1, "click", /*handleImageClick*/ ctx[3]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*values*/ 1) {
				set_style(div1, "background-image", "url(" + /*values*/ ctx[0].url + ")");
			}
		},
		d(detaching) {
			if (detaching) detach(div2);
			mounted = false;
			dispose();
		}
	};
}

// (123:6) {#if values.url === ''}
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
				dispose = listen(div1, "click", /*handleImageClick*/ ctx[3]);
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

// (136:12) {:else}
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

// (129:12) {#if imageIsUploading}
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
	let div3;
	let div2;
	let div0;
	let label;
	let t1;
	let input;
	let t2;
	let t3;
	let div1;
	let button;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*values*/ ctx[0].url === '') return create_if_block;
		return create_else_block_1;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div3 = element("div");
			div2 = element("div");
			div0 = element("div");
			label = element("label");
			label.textContent = "Imagem";
			t1 = space();
			input = element("input");
			t2 = space();
			if_block.c();
			t3 = space();
			div1 = element("div");
			button = element("button");
			button.textContent = "Salvar Alterações";
			attr(label, "for", "image");
			attr(label, "class", "label svelte-1veono");
			attr(input, "type", "file");
			attr(input, "name", "image");
			attr(input, "id", "image_file");
			attr(input, "accept", "image/png,image/jpeg,image/webp");
			input.hidden = true;
			attr(input, "class", "svelte-1veono");
			attr(div0, "class", "col-span-full");
			attr(button, "class", "w-full font-medium bg-main-500 button hover:bg-main-600 active:bg-main-400 svelte-1veono");
			attr(div1, "class", "h-10 col-span-4 mt-3");
			attr(div2, "class", "grid w-full grid-cols-4 gap-4 px-4 pb-4");
			attr(div3, "class", "flex items-center w-full pt-8");
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div2);
			append(div2, div0);
			append(div0, label);
			append(div0, t1);
			append(div0, input);
			/*input_binding*/ ctx[8](input);
			append(div0, t2);
			if_block.m(div0, null);
			append(div2, t3);
			append(div2, div1);
			append(div1, button);

			if (!mounted) {
				dispose = listen(button, "click", /*handleSubmit*/ ctx[4]);
				mounted = true;
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
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div3);
			/*input_binding*/ ctx[8](null);
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

	let values = { url: '' };
	let fullList = [];
	let imageIsUploading = false;
	let imageFile;
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

		if (values.url !== '') {
			// Delete the old image from the storage first
			storage.refFromURL(values.url).delete();

			$$invalidate(0, values.url = '', values);
		}

		// Upload image to firebase storage
		$$invalidate(1, imageIsUploading = true);

		const file = imageFile.files[0];
		const productImagesRef = storage.ref().child(`images/lists/${list}/${file.name}`);

		productImagesRef.put(file).then(async snapshot => {
			$$invalidate(0, values.url = await snapshot.ref.getDownloadURL(), values);
			$$invalidate(1, imageIsUploading = false);
		});
	};

	// FIXME: Delete the image from storage if the user doesn't submit the form
	const handleSubmit = () => {
		const db = firebase.firestore();

		if (values.url === '') {
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

	function input_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			imageFile = $$value;
			$$invalidate(2, imageFile);
		});
	}

	$$self.$$set = $$props => {
		if ('list' in $$props) $$invalidate(5, list = $$props.list);
		if ('index' in $$props) $$invalidate(6, index = $$props.index);
		if ('onClosed' in $$props) $$invalidate(7, onClosed = $$props.onClosed);
	};

	return [
		values,
		imageIsUploading,
		imageFile,
		handleImageClick,
		handleSubmit,
		list,
		index,
		onClosed,
		input_binding
	];
}

class ListImageEditor extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { list: 5, index: 6, onClosed: 7 });
	}
}

export default ListImageEditor;
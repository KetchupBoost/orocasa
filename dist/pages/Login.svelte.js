import './Login.svelte.css.proxy.js';
/* src\pages\Login.svelte generated by Svelte v3.43.1 */
import {
	SvelteComponent,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	prevent_default,
	run_all,
	safe_not_equal,
	set_data,
	set_input_value,
	space,
	text
} from "../../_snowpack/pkg/svelte/internal.js";

import { navigateTo } from '../../_snowpack/pkg/svelte-router-spa.js';
import firebase from '../../_snowpack/pkg/firebase/app.js';
import '../../_snowpack/pkg/firebase/auth.js';

function create_if_block(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*errorMessage*/ ctx[2]);
			attr(span, "class", "w-full mt-2 text-xs font-semibold text-center text-red-600");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty & /*errorMessage*/ 4) set_data(t, /*errorMessage*/ ctx[2]);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

function create_fragment(ctx) {
	let t0;
	let main;
	let form;
	let label0;
	let t2;
	let input0;
	let t3;
	let label1;
	let t5;
	let input1;
	let t6;
	let t7;
	let input2;
	let input2_class_value;
	let t8;
	let div0;
	let t10;
	let div2;
	let span;
	let t13;
	let a1;
	let mounted;
	let dispose;
	let if_block = /*errorMessage*/ ctx[2] !== '' && create_if_block(ctx);

	return {
		c() {
			t0 = space();
			main = element("main");
			form = element("form");
			label0 = element("label");
			label0.textContent = "E-mail";
			t2 = space();
			input0 = element("input");
			t3 = space();
			label1 = element("label");
			label1.textContent = "Senha";
			t5 = space();
			input1 = element("input");
			t6 = space();
			if (if_block) if_block.c();
			t7 = space();
			input2 = element("input");
			t8 = space();
			div0 = element("div");
			div0.innerHTML = `<a href="/" class="text-main-400 hover:text-main-500 active:text-main-300">Voltar</a>`;
			t10 = space();
			div2 = element("div");
			span = element("span");
			span.textContent = `Copyright © ${/*getCurrentYear*/ ctx[3]()}`;
			t13 = space();
			a1 = element("a");
			a1.innerHTML = `<div style="background-image:url(/images/brand_saikoo.png);" class="w-[100px] bg-cover h-7"></div>`;
			document.title = "Entrar";
			attr(label0, "for", "email");
			attr(label0, "class", "text-xs font-semibold");
			attr(input0, "type", "text");
			attr(input0, "name", "email");
			attr(input0, "class", "flex items-center w-64 h-12 px-4 mt-2 bg-gray-200 rounded focus:outline-none focus:ring-2 ring-main-400");
			input0.autofocus = true;
			attr(label1, "for", "password");
			attr(label1, "class", "mt-3 text-xs font-semibold");
			attr(input1, "type", "password");
			attr(input1, "name", "password");
			attr(input1, "class", "flex items-center w-64 h-12 px-4 mt-2 bg-gray-200 rounded focus:outline-none focus:ring-2 ring-main-400");
			attr(input2, "type", "submit");
			input2.value = "Entrar";
			attr(input2, "class", input2_class_value = "flex items-center justify-center w-64 h-12 px-6 text-sm font-semibold text-white bg-main-500 rounded cursor-pointer hover:bg-main-600 active:bg-main-400 " + (/*errorMessage*/ ctx[2] === '' ? 'mt-8' : 'mt-2'));
			attr(div0, "class", "flex justify-center mt-6 text-xs");
			attr(form, "class", "flex flex-col p-10 mt-12 bg-white rounded-lg shadow-lg");
			attr(span, "class", "small opacity-60 svelte-1j1qzho");
			attr(a1, "href", "https://saikoosistemas.com.br");
			attr(a1, "target", "blank");
			attr(div2, "class", "absolute bottom-0 flex items-end justify-between w-full h-12 px-8 py-8 md:px-24");
			attr(main, "class", "flex flex-col items-center justify-center w-screen h-screen text-gray-700 bg-main-50");
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			insert(target, main, anchor);
			append(main, form);
			append(form, label0);
			append(form, t2);
			append(form, input0);
			set_input_value(input0, /*emailField*/ ctx[0]);
			append(form, t3);
			append(form, label1);
			append(form, t5);
			append(form, input1);
			set_input_value(input1, /*passwordField*/ ctx[1]);
			append(form, t6);
			if (if_block) if_block.m(form, null);
			append(form, t7);
			append(form, input2);
			append(form, t8);
			append(form, div0);
			append(main, t10);
			append(main, div2);
			append(div2, span);
			append(div2, t13);
			append(div2, a1);
			input0.focus();

			if (!mounted) {
				dispose = [
					listen(input0, "input", /*input0_input_handler*/ ctx[5]),
					listen(input1, "input", /*input1_input_handler*/ ctx[6]),
					listen(form, "submit", prevent_default(/*onSubmit*/ ctx[4]))
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*emailField*/ 1 && input0.value !== /*emailField*/ ctx[0]) {
				set_input_value(input0, /*emailField*/ ctx[0]);
			}

			if (dirty & /*passwordField*/ 2 && input1.value !== /*passwordField*/ ctx[1]) {
				set_input_value(input1, /*passwordField*/ ctx[1]);
			}

			if (/*errorMessage*/ ctx[2] !== '') {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(form, t7);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*errorMessage*/ 4 && input2_class_value !== (input2_class_value = "flex items-center justify-center w-64 h-12 px-6 text-sm font-semibold text-white bg-main-500 rounded cursor-pointer hover:bg-main-600 active:bg-main-400 " + (/*errorMessage*/ ctx[2] === '' ? 'mt-8' : 'mt-2'))) {
				attr(input2, "class", input2_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(t0);
			if (detaching) detach(main);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let emailField = '';
	let passwordField = '';
	let errorMessage = '';
	const auth = firebase.auth();

	auth.onAuthStateChanged(user => {
		if (!!user) navigateTo('/admin');
	});

	// Helpers
	const getCurrentYear = () => new Date().getFullYear();

	const onSubmit = () => {
		auth.signInWithEmailAndPassword(emailField, passwordField).catch(error => {
			console.warn(`Erro ao autenticar (${error.code}): ${error.message}`);

			switch (error.code) {
				case 'auth/invalid-email':
					$$invalidate(2, errorMessage = 'E-mail inválido.');
					break;
				case 'auth/user-not-found':
					$$invalidate(2, errorMessage = 'Usuário não encontrado.');
					break;
				case 'auth/wrong-password':
					$$invalidate(2, errorMessage = 'Senha incorreta.');
					break;
				default:
					$$invalidate(2, errorMessage = 'Erro ao autenticar.');
			}

			
		});
	};

	function input0_input_handler() {
		emailField = this.value;
		$$invalidate(0, emailField);
	}

	function input1_input_handler() {
		passwordField = this.value;
		$$invalidate(1, passwordField);
	}

	return [
		emailField,
		passwordField,
		errorMessage,
		getCurrentYear,
		onSubmit,
		input0_input_handler,
		input1_input_handler
	];
}

class Login extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Login;
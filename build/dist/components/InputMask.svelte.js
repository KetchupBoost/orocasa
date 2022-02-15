/* src\components\InputMask.svelte generated by Svelte v3.46.3 */
import {
	SvelteComponent,
	action_destroyer,
	assign,
	binding_callbacks,
	bubble,
	detach,
	element,
	exclude_internal_props,
	get_spread_update,
	init,
	insert,
	is_function,
	listen,
	noop,
	run_all,
	safe_not_equal,
	set_attributes
} from "../../_snowpack/pkg/svelte/internal.js";

import { onMount, onDestroy, tick } from '../../_snowpack/pkg/svelte.js';
import IMaskSvelte from '../../_snowpack/pkg/@imask/svelte.js';
import IMask from '../../_snowpack/pkg/imask.js';

function create_fragment(ctx) {
	let input_1;
	let action_action;
	let mounted;
	let dispose;
	let input_1_levels = [{ type: "text" }, /*attrs*/ ctx[2]];
	let input_1_data = {};

	for (let i = 0; i < input_1_levels.length; i += 1) {
		input_1_data = assign(input_1_data, input_1_levels[i]);
	}

	return {
		c() {
			input_1 = element("input");
			set_attributes(input_1, input_1_data);
		},
		m(target, anchor) {
			insert(target, input_1, anchor);
			if (input_1.autofocus) input_1.focus();
			/*input_1_binding*/ ctx[8](input_1);

			if (!mounted) {
				dispose = [
					action_destroyer(action_action = /*action*/ ctx[3].call(null, input_1, /*maskRef*/ ctx[0])),
					listen(input_1, "accept", /*accept*/ ctx[4]),
					listen(input_1, "accept", /*accept_handler*/ ctx[6]),
					listen(input_1, "complete", /*complete_handler*/ ctx[7])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			set_attributes(input_1, input_1_data = get_spread_update(input_1_levels, [{ type: "text" }, dirty & /*attrs*/ 4 && /*attrs*/ ctx[2]]));
			if (action_action && is_function(action_action.update) && dirty & /*maskRef*/ 1) action_action.update.call(null, /*maskRef*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(input_1);
			/*input_1_binding*/ ctx[8](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { value } = $$props;
	const action = IMaskSvelte.imask;
	let input;
	let maskRef, imask, unmask, attrs;

	function getValue() {
		if (unmask === 'typed') return maskRef.typedValue;
		if (unmask) return maskRef.unmaskedValue;
		return maskRef.value;
	}

	function setValue(v) {
		v = v == null ? '' : v;
		if (unmask === 'typed') $$invalidate(0, maskRef.typedValue = v, maskRef); else if (unmask) $$invalidate(0, maskRef.unmaskedValue = v, maskRef); else $$invalidate(0, maskRef.value = v, maskRef);
	}

	function writeValue(v) {
		if (getValue() !== v || // handle cases like Number('') === 0,
		// for details see https://github.com/uNmAnNeR/imaskjs/issues/134
		typeof v !== 'string' && value === '' && !maskRef.el.isActive) {
			setValue(v);
		}
	}

	onMount(() => {
		$$invalidate(0, maskRef = IMask(input, imask));
		setValue(value);
	});

	onDestroy(() => {
		if (maskRef) maskRef.destroy();
		$$invalidate(0, maskRef = undefined);
	});

	function accept({ detail: mask }) {
		$$invalidate(5, value = getValue());
	}

	function accept_handler(event) {
		bubble.call(this, $$self, event);
	}

	function complete_handler(event) {
		bubble.call(this, $$self, event);
	}

	function input_1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			input = $$value;
			$$invalidate(1, input);
		});
	}

	$$self.$$set = $$new_props => {
		$$invalidate(14, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
		if ('value' in $$new_props) $$invalidate(5, value = $$new_props.value);
	};

	$$self.$$.update = () => {
		$: {
			$$invalidate(2, { imask, unmask, ...attrs } = $$props, attrs);

			if (maskRef) {
				writeValue(value);
				$$invalidate(2, attrs.value = maskRef.value, attrs);
				tick().then(() => $$invalidate(5, value = getValue()));
			}
		}
	};

	$$props = exclude_internal_props($$props);

	return [
		maskRef,
		input,
		attrs,
		action,
		accept,
		value,
		accept_handler,
		complete_handler,
		input_1_binding
	];
}

class InputMask extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { value: 5 });
	}
}

export default InputMask;
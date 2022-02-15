import { u as identity, S as SvelteComponent, i as init, b as safe_not_equal, v as append_styles, w as element, x as space, y as attr, d as insert, z as append, A as listen, B as is_function, k as transition_in, e as empty, f as group_outros, h as transition_out, j as check_outros, l as detach, p as destroy_component, m as create_component, n as mount_component, C as create_bidirectional_transition, D as run_all, E as create_slot, F as update_slot_base, G as get_all_dirty_from_scope, H as get_slot_changes, c as createEventDispatcher, a as onDestroy, o as onMount, I as globals, J as add_render_callback, r as noop, K as binding_callbacks, s as setContext } from './common/index-7aad7fd7.js';

function fade(node, {delay = 0, duration = 400, easing = identity} = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}

/* node_modules\svelte-simple-modal\src\Modal.svelte generated by Svelte v3.43.1 */

const { window: window_1 } = globals;

function add_css(target) {
	append_styles(target, "svelte-2wx9ab", ".svelte-2wx9ab{box-sizing:border-box}.bg.svelte-2wx9ab{position:fixed;z-index:1000;top:0;left:0;display:flex;flex-direction:column;justify-content:center;width:100vw;height:100vh;background:rgba(0, 0, 0, 0.66)}.window-wrap.svelte-2wx9ab{position:relative;margin:2rem;max-height:100%}.window.svelte-2wx9ab{position:relative;width:40rem;max-width:100%;max-height:100%;margin:2rem auto;color:black;border-radius:0.5rem;background:white}.content.svelte-2wx9ab{position:relative;padding:1rem;max-height:calc(100vh - 4rem);overflow:auto}.close.svelte-2wx9ab{display:block;box-sizing:border-box;position:absolute;z-index:1000;top:1rem;right:1rem;margin:0;padding:0;width:1.5rem;height:1.5rem;border:0;color:black;border-radius:1.5rem;background:white;box-shadow:0 0 0 1px black;transition:transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1),\n                background 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);-webkit-appearance:none}.close.svelte-2wx9ab:before,.close.svelte-2wx9ab:after{content:'';display:block;box-sizing:border-box;position:absolute;top:50%;width:1rem;height:1px;background:black;transform-origin:center;transition:height 0.2s cubic-bezier(0.25, 0.1, 0.25, 1),\n                background 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)}.close.svelte-2wx9ab:before{-webkit-transform:translate(0, -50%) rotate(45deg);-moz-transform:translate(0, -50%) rotate(45deg);transform:translate(0, -50%) rotate(45deg);left:0.25rem}.close.svelte-2wx9ab:after{-webkit-transform:translate(0, -50%) rotate(-45deg);-moz-transform:translate(0, -50%) rotate(-45deg);transform:translate(0, -50%) rotate(-45deg);left:0.25rem}.close.svelte-2wx9ab:hover{background:black}.close.svelte-2wx9ab:hover:before,.close.svelte-2wx9ab:hover:after{height:2px;background:white}.close.svelte-2wx9ab:focus{border-color:#3399ff;box-shadow:0 0 0 2px #3399ff}.close.svelte-2wx9ab:active{transform:scale(0.9)}.close.svelte-2wx9ab:hover,.close.svelte-2wx9ab:focus,.close.svelte-2wx9ab:active{outline:none}");
}

// (338:0) {#if Component}
function create_if_block(ctx) {
	let div3;
	let div2;
	let div1;
	let t;
	let div0;
	let switch_instance;
	let div1_transition;
	let div3_transition;
	let current;
	let mounted;
	let dispose;
	let if_block = /*state*/ ctx[0].closeButton && create_if_block_1(ctx);
	var switch_value = /*Component*/ ctx[1];

	function switch_props(ctx) {
		return {};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	return {
		c() {
			div3 = element("div");
			div2 = element("div");
			div1 = element("div");
			if (if_block) if_block.c();
			t = space();
			div0 = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			attr(div0, "class", "content svelte-2wx9ab");
			attr(div0, "style", /*cssContent*/ ctx[8]);
			attr(div1, "class", "window svelte-2wx9ab");
			attr(div1, "role", "dialog");
			attr(div1, "aria-modal", "true");
			attr(div1, "style", /*cssWindow*/ ctx[7]);
			attr(div2, "class", "window-wrap svelte-2wx9ab");
			attr(div2, "style", /*cssWindowWrap*/ ctx[6]);
			attr(div3, "class", "bg svelte-2wx9ab");
			attr(div3, "style", /*cssBg*/ ctx[5]);
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div2);
			append(div2, div1);
			if (if_block) if_block.m(div1, null);
			append(div1, t);
			append(div1, div0);

			if (switch_instance) {
				mount_component(switch_instance, div0, null);
			}

			/*div1_binding*/ ctx[39](div1);
			/*div2_binding*/ ctx[40](div2);
			/*div3_binding*/ ctx[41](div3);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div1, "introstart", function () {
						if (is_function(/*onOpen*/ ctx[12])) /*onOpen*/ ctx[12].apply(this, arguments);
					}),
					listen(div1, "outrostart", function () {
						if (is_function(/*onClose*/ ctx[13])) /*onClose*/ ctx[13].apply(this, arguments);
					}),
					listen(div1, "introend", function () {
						if (is_function(/*onOpened*/ ctx[14])) /*onOpened*/ ctx[14].apply(this, arguments);
					}),
					listen(div1, "outroend", function () {
						if (is_function(/*onClosed*/ ctx[15])) /*onClosed*/ ctx[15].apply(this, arguments);
					}),
					listen(div3, "mousedown", /*handleOuterMousedown*/ ctx[19]),
					listen(div3, "mouseup", /*handleOuterMouseup*/ ctx[20])
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (/*state*/ ctx[0].closeButton) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty[0] & /*state*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div1, t);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (switch_value !== (switch_value = /*Component*/ ctx[1])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div0, null);
				} else {
					switch_instance = null;
				}
			}

			if (!current || dirty[0] & /*cssContent*/ 256) {
				attr(div0, "style", /*cssContent*/ ctx[8]);
			}

			if (!current || dirty[0] & /*cssWindow*/ 128) {
				attr(div1, "style", /*cssWindow*/ ctx[7]);
			}

			if (!current || dirty[0] & /*cssWindowWrap*/ 64) {
				attr(div2, "style", /*cssWindowWrap*/ ctx[6]);
			}

			if (!current || dirty[0] & /*cssBg*/ 32) {
				attr(div3, "style", /*cssBg*/ ctx[5]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);

			add_render_callback(() => {
				if (!div1_transition) div1_transition = create_bidirectional_transition(div1, /*currentTransitionWindow*/ ctx[11], /*state*/ ctx[0].transitionWindowProps, true);
				div1_transition.run(1);
			});

			add_render_callback(() => {
				if (!div3_transition) div3_transition = create_bidirectional_transition(div3, /*currentTransitionBg*/ ctx[10], /*state*/ ctx[0].transitionBgProps, true);
				div3_transition.run(1);
			});

			current = true;
		},
		o(local) {
			transition_out(if_block);
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			if (!div1_transition) div1_transition = create_bidirectional_transition(div1, /*currentTransitionWindow*/ ctx[11], /*state*/ ctx[0].transitionWindowProps, false);
			div1_transition.run(0);
			if (!div3_transition) div3_transition = create_bidirectional_transition(div3, /*currentTransitionBg*/ ctx[10], /*state*/ ctx[0].transitionBgProps, false);
			div3_transition.run(0);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div3);
			if (if_block) if_block.d();
			if (switch_instance) destroy_component(switch_instance);
			/*div1_binding*/ ctx[39](null);
			if (detaching && div1_transition) div1_transition.end();
			/*div2_binding*/ ctx[40](null);
			/*div3_binding*/ ctx[41](null);
			if (detaching && div3_transition) div3_transition.end();
			mounted = false;
			run_all(dispose);
		}
	};
}

// (360:8) {#if state.closeButton}
function create_if_block_1(ctx) {
	let show_if;
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_2, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (show_if == null || dirty[0] & /*state*/ 1) show_if = !!/*isFunction*/ ctx[16](/*state*/ ctx[0].closeButton);
		if (show_if) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, [-1, -1]);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (363:10) {:else}
function create_else_block(ctx) {
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			attr(button, "class", "close svelte-2wx9ab");
			attr(button, "style", /*cssCloseButton*/ ctx[9]);
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", /*close*/ ctx[17]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*cssCloseButton*/ 512) {
				attr(button, "style", /*cssCloseButton*/ ctx[9]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

// (361:10) {#if isFunction(state.closeButton)}
function create_if_block_2(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*state*/ ctx[0].closeButton;

	function switch_props(ctx) {
		return { props: { onClose: /*close*/ ctx[17] } };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (switch_value !== (switch_value = /*state*/ ctx[0].closeButton)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

function create_fragment(ctx) {
	let t;
	let current;
	let mounted;
	let dispose;
	let if_block = /*Component*/ ctx[1] && create_if_block(ctx);
	const default_slot_template = /*#slots*/ ctx[38].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[37], null);

	return {
		c() {
			if (if_block) if_block.c();
			t = space();
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, t, anchor);

			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;

			if (!mounted) {
				dispose = listen(window_1, "keydown", /*handleKeydown*/ ctx[18]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (/*Component*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty[0] & /*Component*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(t.parentNode, t);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 64)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[37],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[37])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[37], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(t);
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			dispose();
		}
	};
}

function bind(Component, props = {}) {
	return function ModalComponent(options) {
		return new Component({
				...options,
				props: { ...props, ...options.props }
			});
	};
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	const dispatch = createEventDispatcher();
	const baseSetContext = setContext;
	let { show = null } = $$props;
	let { key = 'simple-modal' } = $$props;
	let { closeButton = true } = $$props;
	let { closeOnEsc = true } = $$props;
	let { closeOnOuterClick = true } = $$props;
	let { styleBg = {} } = $$props;
	let { styleWindowWrap = {} } = $$props;
	let { styleWindow = {} } = $$props;
	let { styleContent = {} } = $$props;
	let { styleCloseButton = {} } = $$props;
	let { setContext: setContext$1 = baseSetContext } = $$props;
	let { transitionBg = fade } = $$props;
	let { transitionBgProps = { duration: 250 } } = $$props;
	let { transitionWindow = transitionBg } = $$props;
	let { transitionWindowProps = transitionBgProps } = $$props;

	const defaultState = {
		closeButton,
		closeOnEsc,
		closeOnOuterClick,
		styleBg,
		styleWindowWrap,
		styleWindow,
		styleContent,
		styleCloseButton,
		transitionBg,
		transitionBgProps,
		transitionWindow,
		transitionWindowProps
	};

	let state = { ...defaultState };
	let Component = null;
	let background;
	let wrap;
	let modalWindow;
	let scrollY;
	let cssBg;
	let cssWindowWrap;
	let cssWindow;
	let cssContent;
	let cssCloseButton;
	let currentTransitionBg;
	let currentTransitionWindow;
	let prevBodyPosition;
	let prevBodyOverflow;
	let prevBodyWidth;
	let outerClickTarget;
	const camelCaseToDash = str => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

	const toCssString = props => props
	? Object.keys(props).reduce((str, key) => `${str}; ${camelCaseToDash(key)}: ${props[key]}`, '')
	: '';

	const isFunction = f => !!(f && f.constructor && f.call && f.apply);

	const updateStyleTransition = () => {
		$$invalidate(5, cssBg = toCssString(Object.assign(
			{},
			{
				width: window.innerWidth,
				height: window.innerHeight
			},
			state.styleBg
		)));

		$$invalidate(6, cssWindowWrap = toCssString(state.styleWindowWrap));
		$$invalidate(7, cssWindow = toCssString(state.styleWindow));
		$$invalidate(8, cssContent = toCssString(state.styleContent));
		$$invalidate(9, cssCloseButton = toCssString(state.styleCloseButton));
		$$invalidate(10, currentTransitionBg = state.transitionBg);
		$$invalidate(11, currentTransitionWindow = state.transitionWindow);
	};

	const toVoid = () => {
		
	};

	let onOpen = toVoid;
	let onClose = toVoid;
	let onOpened = toVoid;
	let onClosed = toVoid;

	const open = (NewComponent, newProps = {}, options = {}, callback = {}) => {
		$$invalidate(1, Component = bind(NewComponent, newProps));
		$$invalidate(0, state = { ...defaultState, ...options });
		updateStyleTransition();
		disableScroll();

		($$invalidate(12, onOpen = event => {
			if (callback.onOpen) callback.onOpen(event);
			dispatch('open');
			dispatch('opening'); // Deprecated. Do not use!
		}), $$invalidate(13, onClose = event => {
			if (callback.onClose) callback.onClose(event);
			dispatch('close');
			dispatch('closing'); // Deprecated. Do not use!
		}), $$invalidate(14, onOpened = event => {
			if (callback.onOpened) callback.onOpened(event);
			dispatch('opened');
		}));

		$$invalidate(15, onClosed = event => {
			if (callback.onClosed) callback.onClosed(event);
			dispatch('closed');
		});
	};

	const close = (callback = {}) => {
		$$invalidate(13, onClose = callback.onClose || onClose);
		$$invalidate(15, onClosed = callback.onClosed || onClosed);
		$$invalidate(1, Component = null);
		enableScroll();
	};

	const handleKeydown = event => {
		if (state.closeOnEsc && Component && event.key === 'Escape') {
			event.preventDefault();
			close();
		}

		if (Component && event.key === 'Tab') {
			// trap focus
			const nodes = modalWindow.querySelectorAll('*');

			const tabbable = Array.from(nodes).filter(node => node.tabIndex >= 0);
			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && event.shiftKey) index = 0;
			index += tabbable.length + (event.shiftKey ? -1 : 1);
			index %= tabbable.length;
			tabbable[index].focus();
			event.preventDefault();
		}
	};

	const handleOuterMousedown = event => {
		if (state.closeOnOuterClick && (event.target === background || event.target === wrap)) outerClickTarget = event.target;
	};

	const handleOuterMouseup = event => {
		if (state.closeOnOuterClick && event.target === outerClickTarget) {
			event.preventDefault();
			close();
		}
	};

	const disableScroll = () => {
		scrollY = window.scrollY;
		prevBodyPosition = document.body.style.position;
		prevBodyOverflow = document.body.style.overflow;
		prevBodyWidth = document.body.style.width;
		document.body.style.position = 'fixed';
		document.body.style.top = `-${scrollY}px`;
		document.body.style.overflow = 'hidden';
		document.body.style.width = '100%';
	};

	const enableScroll = () => {
		document.body.style.position = prevBodyPosition || '';
		document.body.style.top = '';
		document.body.style.overflow = prevBodyOverflow || '';
		document.body.style.width = prevBodyWidth || '';
		window.scrollTo(0, scrollY);
	};

	setContext$1(key, { open, close });
	let isMounted = false;

	onDestroy(() => {
		if (isMounted) close();
	});

	onMount(() => {
		$$invalidate(36, isMounted = true);
	});

	function div1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			modalWindow = $$value;
			$$invalidate(4, modalWindow);
		});
	}

	function div2_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			wrap = $$value;
			$$invalidate(3, wrap);
		});
	}

	function div3_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			background = $$value;
			$$invalidate(2, background);
		});
	}

	$$self.$$set = $$props => {
		if ('show' in $$props) $$invalidate(21, show = $$props.show);
		if ('key' in $$props) $$invalidate(22, key = $$props.key);
		if ('closeButton' in $$props) $$invalidate(23, closeButton = $$props.closeButton);
		if ('closeOnEsc' in $$props) $$invalidate(24, closeOnEsc = $$props.closeOnEsc);
		if ('closeOnOuterClick' in $$props) $$invalidate(25, closeOnOuterClick = $$props.closeOnOuterClick);
		if ('styleBg' in $$props) $$invalidate(26, styleBg = $$props.styleBg);
		if ('styleWindowWrap' in $$props) $$invalidate(27, styleWindowWrap = $$props.styleWindowWrap);
		if ('styleWindow' in $$props) $$invalidate(28, styleWindow = $$props.styleWindow);
		if ('styleContent' in $$props) $$invalidate(29, styleContent = $$props.styleContent);
		if ('styleCloseButton' in $$props) $$invalidate(30, styleCloseButton = $$props.styleCloseButton);
		if ('setContext' in $$props) $$invalidate(31, setContext$1 = $$props.setContext);
		if ('transitionBg' in $$props) $$invalidate(32, transitionBg = $$props.transitionBg);
		if ('transitionBgProps' in $$props) $$invalidate(33, transitionBgProps = $$props.transitionBgProps);
		if ('transitionWindow' in $$props) $$invalidate(34, transitionWindow = $$props.transitionWindow);
		if ('transitionWindowProps' in $$props) $$invalidate(35, transitionWindowProps = $$props.transitionWindowProps);
		if ('$$scope' in $$props) $$invalidate(37, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*show*/ 2097152 | $$self.$$.dirty[1] & /*isMounted*/ 32) {
			 {
				if (isMounted) {
					if (isFunction(show)) {
						open(show);
					} else {
						close();
					}
				}
			}
		}
	};

	return [
		state,
		Component,
		background,
		wrap,
		modalWindow,
		cssBg,
		cssWindowWrap,
		cssWindow,
		cssContent,
		cssCloseButton,
		currentTransitionBg,
		currentTransitionWindow,
		onOpen,
		onClose,
		onOpened,
		onClosed,
		isFunction,
		close,
		handleKeydown,
		handleOuterMousedown,
		handleOuterMouseup,
		show,
		key,
		closeButton,
		closeOnEsc,
		closeOnOuterClick,
		styleBg,
		styleWindowWrap,
		styleWindow,
		styleContent,
		styleCloseButton,
		setContext$1,
		transitionBg,
		transitionBgProps,
		transitionWindow,
		transitionWindowProps,
		isMounted,
		$$scope,
		slots,
		div1_binding,
		div2_binding,
		div3_binding
	];
}

class Modal extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				show: 21,
				key: 22,
				closeButton: 23,
				closeOnEsc: 24,
				closeOnOuterClick: 25,
				styleBg: 26,
				styleWindowWrap: 27,
				styleWindow: 28,
				styleContent: 29,
				styleCloseButton: 30,
				setContext: 31,
				transitionBg: 32,
				transitionBgProps: 33,
				transitionWindow: 34,
				transitionWindowProps: 35
			},
			add_css,
			[-1, -1]
		);
	}
}

export default Modal;
export { bind };

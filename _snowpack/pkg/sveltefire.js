import { S as SvelteComponent, i as init, b as safe_not_equal, F as update_slot_base, G as get_all_dirty_from_scope, H as get_slot_changes, k as transition_in, h as transition_out, e as empty, d as insert, f as group_outros, j as check_outros, l as detach, c as createEventDispatcher, s as setContext, o as onMount, E as create_slot, g as getContext, x as space, a7 as subscribe, a as onDestroy, r as noop } from './common/index-7aad7fd7.js';
import { w as writable } from './common/index-df943e3a.js';

/* node_modules\sveltefire\src\FirebaseApp.svelte generated by Svelte v3.43.1 */

function create_if_block(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[5].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[4],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function create_fragment(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*ready*/ ctx[0] && create_if_block(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*ready*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*ready*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
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
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { firebase } = $$props;
	let { perf = false } = $$props;
	let { analytics = false } = $$props;

	// Ready required to use the app event,
	// prevents child components from running before init
	let ready = false;

	// Emit firebase
	const dispatch = createEventDispatcher();

	// Must be a function to ensure changes after initialization are caught
	setContext("firebase", { getFirebase: () => firebase });

	onMount(() => {
		// Set firebase context from window if needed
		$$invalidate(1, firebase = firebase || window && window.firebase);

		if (!firebase) {
			throw Error("No firebase app was provided. You must provide an initialized Firebase app or make it available globally.");
		} else {
			// Init perf and analytics
			perf && firebase.performance();

			analytics && firebase.analytics();

			// Optional event to set additional config
			dispatch("initializeApp", { firebase });

			$$invalidate(0, ready = true);
		}
	});

	$$self.$$set = $$props => {
		if ('firebase' in $$props) $$invalidate(1, firebase = $$props.firebase);
		if ('perf' in $$props) $$invalidate(2, perf = $$props.perf);
		if ('analytics' in $$props) $$invalidate(3, analytics = $$props.analytics);
		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
	};

	return [ready, firebase, perf, analytics, $$scope, slots];
}

class FirebaseApp extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { firebase: 1, perf: 2, analytics: 3 });
	}
}

function getFirebaseContext() {
  const { getFirebase } = getContext('firebase');
  return getFirebase();
}

// Validates end-user has setup context and imported proper modules into the Svelte app
function assertApp(pkg) {

    const app = getFirebaseContext();

    if (!app) {
      throw new Error(`Missing Firebase app in context. Are you inside a 'FirebaseApp' component?`)
    }

    if (pkg) {
        const pkgFn = app[pkg]; 
        if (!pkgFn || !pkgFn()) {
          throw new Error(`Firebase ${pkg} not found. You may be missing "import 'firebase/${pkg}'" `)
        } else {
          return pkgFn();
        }
    } else {
      return app;
    }
}

function startTrace(name) {
    const perf = assertApp('performance');
    const trace = perf.trace(name);
    trace.start();
    return trace;
  }
  
  async function stopTrace(trace) {
    if (trace.state === 2) {
      trace.stop();
    }
  
    return null;
  }

// Svelte Store for Firestore Document
function docStore(path, opts) {
  const firestore = assertApp('firestore');

  const { startWith, log, traceId, maxWait, once } = { maxWait: 10000, ...opts };

  // Create the Firestore Reference
  const ref = typeof path === 'string' ? firestore.doc(path) : path;

  // Performance trace
  const trace = traceId && startTrace(traceId);

  // Internal state
  let _loading = typeof startWith !== undefined;
  let _firstValue = true;
  let _error = null;
  let _teardown;
  let _waitForIt;


  // State should never change without emitting a new value
  // Clears loading state on first call
  const next = (val, err) => {
    _loading = false; 
    _firstValue = false;
    _waitForIt && clearTimeout(_waitForIt);
    _error = err || null;
    set(val);
    trace && stopTrace(trace);
  };

  // Timout
  // Runs of first subscription
  const start = () => {

    // Timout for fallback slot
    _waitForIt = maxWait && setTimeout(() => _loading && next(null, new Error(`Timeout at ${maxWait}. Using fallback slot.`) ), maxWait);

    // Realtime firebase subscription
    _teardown = ref.onSnapshot(
      snapshot => {
        const data = snapshot.data() || (_firstValue && startWith) || null;

        // Optional logging
        if (log) {
          console.groupCollapsed(`Doc ${snapshot.id}`);
          console.log(`Path: ${ref.path}`);
          console.log('Snapshot:', snapshot);
          console.groupEnd();
        }

        // Emit next value
        next(data);

        // Teardown after first emitted value if once
        once && _teardown();
      },

      // Handle firebase thrown errors
      error => {
        console.error(error);
        next(null, error);
      }
    );

    // Removes firebase listener when store completes
    return () => _teardown();
  };

  // Svelte store
  const store = writable(startWith, start);
  const { subscribe, set } = store;

  return {
    subscribe,
    firestore,
    ref,
    get loading() {
      return _loading;
    },
    get error() {
      return _error;
    }
  };
}

// Svelte Store for Firestore Collection
function collectionStore(path, queryFn, opts) {
  const firestore = assertApp('firestore');

  const { startWith, log, traceId, maxWait, once, idField, refField } = {
    idField: 'id',
    refField: 'ref',
    maxWait: 10000,
    ...opts
  };

  const ref = typeof path === 'string' ? firestore.collection(path) : path;
  const query = queryFn && queryFn(ref);
  const trace = traceId && startTrace(traceId);

  let _loading = typeof startWith !== undefined;
  let _error = null;
  let _meta = {};
  let _teardown;
  let _waitForIt;

  // Metadata for result
  const calcMeta = (val) => {
    return val && val.length ? 
      { first: val[0], last: val[val.length - 1] } : {}
  };

  const next = (val, err) => {
    _loading = false; 
    _waitForIt && clearTimeout(_waitForIt);
    _error = err || null;
    _meta = calcMeta(val);
    set(val);
    trace && stopTrace(trace);
  };

  const start = () => {
    _waitForIt = maxWait && setTimeout(() => _loading && next(null, new Error(`Timeout at ${maxWait}. Using fallback slot.`) ), maxWait);

    _teardown = (query || ref).onSnapshot(
      snapshot => {

        // Will always return an array
        const data = snapshot.docs.map(docSnap => ({
          ...docSnap.data(),
          // Allow end user override fields mapped for ID and Ref
          ...(idField ? { [idField]: docSnap.id } : null),
          ...(refField ? { [refField]: docSnap.ref } : null)
        }));

        if (log) {
          const type = _loading ? 'New Query' : 'Updated Query';
          console.groupCollapsed(`${type} ${ref.id} | ${data.length} hits`);
          console.log(`${ref.path}`);
          console.log(`Snapshot: `, snapshot);
          console.groupEnd();
        }
        next(data);
        once && _teardown();
      },

      error => {
        console.error(error);
        next(null, error);
      }
    );

    return () => _teardown();
  };

  const store = writable(startWith, start);
  const { subscribe, set } = store;

  return {
    subscribe,
    firestore,
    ref,
    get loading() {
      return _loading;
    },
    get error() {
      return _error;
    },
    get meta() {
      return _meta;
    }
  };
}

/* node_modules\sveltefire\src\Doc.svelte generated by Svelte v3.43.1 */

const get_after_slot_changes = dirty => ({
	data: dirty & /*$store*/ 2,
	ref: dirty & /*store*/ 1,
	error: dirty & /*store*/ 1
});

const get_after_slot_context = ctx => ({
	data: /*$store*/ ctx[1],
	ref: /*store*/ ctx[0].ref,
	error: /*store*/ ctx[0].error
});

const get_fallback_slot_changes = dirty => ({
	data: dirty & /*$store*/ 2,
	ref: dirty & /*store*/ 1,
	error: dirty & /*store*/ 1
});

const get_fallback_slot_context = ctx => ({
	data: /*$store*/ ctx[1],
	ref: /*store*/ ctx[0].ref,
	error: /*store*/ ctx[0].error
});

const get_loading_slot_changes = dirty => ({
	data: dirty & /*$store*/ 2,
	ref: dirty & /*store*/ 1,
	error: dirty & /*store*/ 1
});

const get_loading_slot_context = ctx => ({
	data: /*$store*/ ctx[1],
	ref: /*store*/ ctx[0].ref,
	error: /*store*/ ctx[0].error
});

const get_default_slot_changes = dirty => ({
	data: dirty & /*$store*/ 2,
	ref: dirty & /*store*/ 1,
	error: dirty & /*store*/ 1
});

const get_default_slot_context = ctx => ({
	data: /*$store*/ ctx[1],
	ref: /*store*/ ctx[0].ref,
	error: /*store*/ ctx[0].error
});

const get_before_slot_changes = dirty => ({
	data: dirty & /*$store*/ 2,
	ref: dirty & /*store*/ 1,
	error: dirty & /*store*/ 1
});

const get_before_slot_context = ctx => ({
	data: /*$store*/ ctx[1],
	ref: /*store*/ ctx[0].ref,
	error: /*store*/ ctx[0].error
});

// (52:0) {:else}
function create_else_block(ctx) {
	let current;
	const fallback_slot_template = /*#slots*/ ctx[10].fallback;
	const fallback_slot = create_slot(fallback_slot_template, ctx, /*$$scope*/ ctx[9], get_fallback_slot_context);

	return {
		c() {
			if (fallback_slot) fallback_slot.c();
		},
		m(target, anchor) {
			if (fallback_slot) {
				fallback_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (fallback_slot) {
				if (fallback_slot.p && (!current || dirty & /*$$scope, $store, store*/ 515)) {
					update_slot_base(
						fallback_slot,
						fallback_slot_template,
						ctx,
						/*$$scope*/ ctx[9],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
						: get_slot_changes(fallback_slot_template, /*$$scope*/ ctx[9], dirty, get_fallback_slot_changes),
						get_fallback_slot_context
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(fallback_slot, local);
			current = true;
		},
		o(local) {
			transition_out(fallback_slot, local);
			current = false;
		},
		d(detaching) {
			if (fallback_slot) fallback_slot.d(detaching);
		}
	};
}

// (50:24) 
function create_if_block_1(ctx) {
	let current;
	const loading_slot_template = /*#slots*/ ctx[10].loading;
	const loading_slot = create_slot(loading_slot_template, ctx, /*$$scope*/ ctx[9], get_loading_slot_context);

	return {
		c() {
			if (loading_slot) loading_slot.c();
		},
		m(target, anchor) {
			if (loading_slot) {
				loading_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (loading_slot) {
				if (loading_slot.p && (!current || dirty & /*$$scope, $store, store*/ 515)) {
					update_slot_base(
						loading_slot,
						loading_slot_template,
						ctx,
						/*$$scope*/ ctx[9],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
						: get_slot_changes(loading_slot_template, /*$$scope*/ ctx[9], dirty, get_loading_slot_changes),
						get_loading_slot_context
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(loading_slot, local);
			current = true;
		},
		o(local) {
			transition_out(loading_slot, local);
			current = false;
		},
		d(detaching) {
			if (loading_slot) loading_slot.d(detaching);
		}
	};
}

// (48:0) {#if $store}
function create_if_block$1(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[10].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, $store, store*/ 515)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[9],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, get_default_slot_changes),
						get_default_slot_context
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function create_fragment$1(ctx) {
	let t0;
	let current_block_type_index;
	let if_block;
	let t1;
	let current;
	const before_slot_template = /*#slots*/ ctx[10].before;
	const before_slot = create_slot(before_slot_template, ctx, /*$$scope*/ ctx[9], get_before_slot_context);
	const if_block_creators = [create_if_block$1, create_if_block_1, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$store*/ ctx[1]) return 0;
		if (/*store*/ ctx[0].loading) return 1;
		return 2;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	const after_slot_template = /*#slots*/ ctx[10].after;
	const after_slot = create_slot(after_slot_template, ctx, /*$$scope*/ ctx[9], get_after_slot_context);

	return {
		c() {
			if (before_slot) before_slot.c();
			t0 = space();
			if_block.c();
			t1 = space();
			if (after_slot) after_slot.c();
		},
		m(target, anchor) {
			if (before_slot) {
				before_slot.m(target, anchor);
			}

			insert(target, t0, anchor);
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, t1, anchor);

			if (after_slot) {
				after_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (before_slot) {
				if (before_slot.p && (!current || dirty & /*$$scope, $store, store*/ 515)) {
					update_slot_base(
						before_slot,
						before_slot_template,
						ctx,
						/*$$scope*/ ctx[9],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
						: get_slot_changes(before_slot_template, /*$$scope*/ ctx[9], dirty, get_before_slot_changes),
						get_before_slot_context
					);
				}
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

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
				if_block.m(t1.parentNode, t1);
			}

			if (after_slot) {
				if (after_slot.p && (!current || dirty & /*$$scope, $store, store*/ 515)) {
					update_slot_base(
						after_slot,
						after_slot_template,
						ctx,
						/*$$scope*/ ctx[9],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
						: get_slot_changes(after_slot_template, /*$$scope*/ ctx[9], dirty, get_after_slot_changes),
						get_after_slot_context
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(before_slot, local);
			transition_in(if_block);
			transition_in(after_slot, local);
			current = true;
		},
		o(local) {
			transition_out(before_slot, local);
			transition_out(if_block);
			transition_out(after_slot, local);
			current = false;
		},
		d(detaching) {
			if (before_slot) before_slot.d(detaching);
			if (detaching) detach(t0);
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(t1);
			if (after_slot) after_slot.d(detaching);
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let $store,
		$$unsubscribe_store = noop,
		$$subscribe_store = () => ($$unsubscribe_store(), $$unsubscribe_store = subscribe(store, $$value => $$invalidate(1, $store = $$value)), store);

	$$self.$$.on_destroy.push(() => $$unsubscribe_store());
	let { $$slots: slots = {}, $$scope } = $$props;
	let { path } = $$props;
	let { log = false } = $$props;
	let { traceId = "" } = $$props;
	let { startWith = undefined } = $$props;
	let { maxWait = 10000 } = $$props;
	let { once = false } = $$props;
	const opts = { startWith, traceId, log, maxWait, once };
	let store = docStore(path, opts);
	$$subscribe_store();
	const dispatch = createEventDispatcher();
	let unsub;
	onMount(() => dispatch("ref", { ref: store.ref }));
	onDestroy(() => unsub());

	$$self.$$set = $$props => {
		if ('path' in $$props) $$invalidate(2, path = $$props.path);
		if ('log' in $$props) $$invalidate(3, log = $$props.log);
		if ('traceId' in $$props) $$invalidate(4, traceId = $$props.traceId);
		if ('startWith' in $$props) $$invalidate(5, startWith = $$props.startWith);
		if ('maxWait' in $$props) $$invalidate(6, maxWait = $$props.maxWait);
		if ('once' in $$props) $$invalidate(7, once = $$props.once);
		if ('$$scope' in $$props) $$invalidate(9, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*unsub, path, store*/ 261) {
			// Props changed
			 {
				if (unsub) {
					// Unsub and create new store
					unsub();

					$$subscribe_store($$invalidate(0, store = docStore(path, opts)));
					dispatch("ref", { ref: store.ref });
				}

				$$invalidate(8, unsub = store.subscribe(data => {
					dispatch("data", { data });
				}));
			}
		}
	};

	return [
		store,
		$store,
		path,
		log,
		traceId,
		startWith,
		maxWait,
		once,
		unsub,
		$$scope,
		slots
	];
}

class Doc extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
			path: 2,
			log: 3,
			traceId: 4,
			startWith: 5,
			maxWait: 6,
			once: 7
		});
	}
}

/* node_modules\sveltefire\src\Collection.svelte generated by Svelte v3.43.1 */

const get_after_slot_changes$1 = dirty => ({
	data: dirty & /*$store*/ 2,
	ref: dirty & /*store*/ 1,
	error: dirty & /*store*/ 1,
	first: dirty & /*store*/ 1,
	last: dirty & /*store*/ 1
});

const get_after_slot_context$1 = ctx => ({
	data: /*$store*/ ctx[1],
	ref: /*store*/ ctx[0].ref,
	error: /*store*/ ctx[0].error,
	first: /*store*/ ctx[0].meta.first,
	last: /*store*/ ctx[0].meta.last
});

const get_fallback_slot_changes$1 = dirty => ({
	data: dirty & /*$store*/ 2,
	ref: dirty & /*store*/ 1,
	error: dirty & /*store*/ 1,
	first: dirty & /*store*/ 1,
	last: dirty & /*store*/ 1
});

const get_fallback_slot_context$1 = ctx => ({
	data: /*$store*/ ctx[1],
	ref: /*store*/ ctx[0].ref,
	error: /*store*/ ctx[0].error,
	first: /*store*/ ctx[0].meta.first,
	last: /*store*/ ctx[0].meta.last
});

const get_loading_slot_changes$1 = dirty => ({
	data: dirty & /*$store*/ 2,
	ref: dirty & /*store*/ 1,
	error: dirty & /*store*/ 1,
	first: dirty & /*store*/ 1,
	last: dirty & /*store*/ 1
});

const get_loading_slot_context$1 = ctx => ({
	data: /*$store*/ ctx[1],
	ref: /*store*/ ctx[0].ref,
	error: /*store*/ ctx[0].error,
	first: /*store*/ ctx[0].meta.first,
	last: /*store*/ ctx[0].meta.last
});

const get_default_slot_changes$1 = dirty => ({
	data: dirty & /*$store*/ 2,
	ref: dirty & /*store*/ 1,
	error: dirty & /*store*/ 1,
	first: dirty & /*store*/ 1,
	last: dirty & /*store*/ 1
});

const get_default_slot_context$1 = ctx => ({
	data: /*$store*/ ctx[1],
	ref: /*store*/ ctx[0].ref,
	error: /*store*/ ctx[0].error,
	first: /*store*/ ctx[0].meta.first,
	last: /*store*/ ctx[0].meta.last
});

const get_before_slot_changes$1 = dirty => ({
	data: dirty & /*$store*/ 2,
	ref: dirty & /*store*/ 1,
	error: dirty & /*store*/ 1,
	first: dirty & /*store*/ 1,
	last: dirty & /*store*/ 1
});

const get_before_slot_context$1 = ctx => ({
	data: /*$store*/ ctx[1],
	ref: /*store*/ ctx[0].ref,
	error: /*store*/ ctx[0].error,
	first: /*store*/ ctx[0].meta.first,
	last: /*store*/ ctx[0].meta.last
});

// (52:0) {:else}
function create_else_block$1(ctx) {
	let current;
	const fallback_slot_template = /*#slots*/ ctx[11].fallback;
	const fallback_slot = create_slot(fallback_slot_template, ctx, /*$$scope*/ ctx[10], get_fallback_slot_context$1);

	return {
		c() {
			if (fallback_slot) fallback_slot.c();
		},
		m(target, anchor) {
			if (fallback_slot) {
				fallback_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (fallback_slot) {
				if (fallback_slot.p && (!current || dirty & /*$$scope, $store, store*/ 1027)) {
					update_slot_base(
						fallback_slot,
						fallback_slot_template,
						ctx,
						/*$$scope*/ ctx[10],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
						: get_slot_changes(fallback_slot_template, /*$$scope*/ ctx[10], dirty, get_fallback_slot_changes$1),
						get_fallback_slot_context$1
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(fallback_slot, local);
			current = true;
		},
		o(local) {
			transition_out(fallback_slot, local);
			current = false;
		},
		d(detaching) {
			if (fallback_slot) fallback_slot.d(detaching);
		}
	};
}

// (50:24) 
function create_if_block_1$1(ctx) {
	let current;
	const loading_slot_template = /*#slots*/ ctx[11].loading;
	const loading_slot = create_slot(loading_slot_template, ctx, /*$$scope*/ ctx[10], get_loading_slot_context$1);

	return {
		c() {
			if (loading_slot) loading_slot.c();
		},
		m(target, anchor) {
			if (loading_slot) {
				loading_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (loading_slot) {
				if (loading_slot.p && (!current || dirty & /*$$scope, $store, store*/ 1027)) {
					update_slot_base(
						loading_slot,
						loading_slot_template,
						ctx,
						/*$$scope*/ ctx[10],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
						: get_slot_changes(loading_slot_template, /*$$scope*/ ctx[10], dirty, get_loading_slot_changes$1),
						get_loading_slot_context$1
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(loading_slot, local);
			current = true;
		},
		o(local) {
			transition_out(loading_slot, local);
			current = false;
		},
		d(detaching) {
			if (loading_slot) loading_slot.d(detaching);
		}
	};
}

// (48:0) {#if $store}
function create_if_block$2(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[11].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], get_default_slot_context$1);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, $store, store*/ 1027)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[10],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[10], dirty, get_default_slot_changes$1),
						get_default_slot_context$1
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function create_fragment$2(ctx) {
	let t0;
	let current_block_type_index;
	let if_block;
	let t1;
	let current;
	const before_slot_template = /*#slots*/ ctx[11].before;
	const before_slot = create_slot(before_slot_template, ctx, /*$$scope*/ ctx[10], get_before_slot_context$1);
	const if_block_creators = [create_if_block$2, create_if_block_1$1, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$store*/ ctx[1]) return 0;
		if (/*store*/ ctx[0].loading) return 1;
		return 2;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	const after_slot_template = /*#slots*/ ctx[11].after;
	const after_slot = create_slot(after_slot_template, ctx, /*$$scope*/ ctx[10], get_after_slot_context$1);

	return {
		c() {
			if (before_slot) before_slot.c();
			t0 = space();
			if_block.c();
			t1 = space();
			if (after_slot) after_slot.c();
		},
		m(target, anchor) {
			if (before_slot) {
				before_slot.m(target, anchor);
			}

			insert(target, t0, anchor);
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, t1, anchor);

			if (after_slot) {
				after_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (before_slot) {
				if (before_slot.p && (!current || dirty & /*$$scope, $store, store*/ 1027)) {
					update_slot_base(
						before_slot,
						before_slot_template,
						ctx,
						/*$$scope*/ ctx[10],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
						: get_slot_changes(before_slot_template, /*$$scope*/ ctx[10], dirty, get_before_slot_changes$1),
						get_before_slot_context$1
					);
				}
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

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
				if_block.m(t1.parentNode, t1);
			}

			if (after_slot) {
				if (after_slot.p && (!current || dirty & /*$$scope, $store, store*/ 1027)) {
					update_slot_base(
						after_slot,
						after_slot_template,
						ctx,
						/*$$scope*/ ctx[10],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
						: get_slot_changes(after_slot_template, /*$$scope*/ ctx[10], dirty, get_after_slot_changes$1),
						get_after_slot_context$1
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(before_slot, local);
			transition_in(if_block);
			transition_in(after_slot, local);
			current = true;
		},
		o(local) {
			transition_out(before_slot, local);
			transition_out(if_block);
			transition_out(after_slot, local);
			current = false;
		},
		d(detaching) {
			if (before_slot) before_slot.d(detaching);
			if (detaching) detach(t0);
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(t1);
			if (after_slot) after_slot.d(detaching);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let $store,
		$$unsubscribe_store = noop,
		$$subscribe_store = () => ($$unsubscribe_store(), $$unsubscribe_store = subscribe(store, $$value => $$invalidate(1, $store = $$value)), store);

	$$self.$$.on_destroy.push(() => $$unsubscribe_store());
	let { $$slots: slots = {}, $$scope } = $$props;
	let { path } = $$props;
	let { query = null } = $$props;
	let { traceId = "" } = $$props;
	let { log = false } = $$props;
	let { startWith = undefined } = $$props;
	let { maxWait = 10000 } = $$props;
	let { once = false } = $$props;
	const opts = { startWith, traceId, log, maxWait, once };
	let store = collectionStore(path, query, opts);
	$$subscribe_store();
	const dispatch = createEventDispatcher();
	let unsub;
	onMount(() => dispatch("ref", { ref: store.ref }));
	onDestroy(() => unsub());

	$$self.$$set = $$props => {
		if ('path' in $$props) $$invalidate(2, path = $$props.path);
		if ('query' in $$props) $$invalidate(3, query = $$props.query);
		if ('traceId' in $$props) $$invalidate(4, traceId = $$props.traceId);
		if ('log' in $$props) $$invalidate(5, log = $$props.log);
		if ('startWith' in $$props) $$invalidate(6, startWith = $$props.startWith);
		if ('maxWait' in $$props) $$invalidate(7, maxWait = $$props.maxWait);
		if ('once' in $$props) $$invalidate(8, once = $$props.once);
		if ('$$scope' in $$props) $$invalidate(10, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*unsub, path, query, store*/ 525) {
			// Props changed
			 {
				if (unsub) {
					unsub();
					$$subscribe_store($$invalidate(0, store = collectionStore(path, query, opts)));
					dispatch("ref", { ref: store.ref });
				}

				$$invalidate(9, unsub = store.subscribe(data => {
					dispatch("data", { data });
				}));
			}
		}
	};

	return [
		store,
		$store,
		path,
		query,
		traceId,
		log,
		startWith,
		maxWait,
		once,
		unsub,
		$$scope,
		slots
	];
}

class Collection extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
			path: 2,
			query: 3,
			traceId: 4,
			log: 5,
			startWith: 6,
			maxWait: 7,
			once: 8
		});
	}
}

export { Collection, Doc, FirebaseApp };

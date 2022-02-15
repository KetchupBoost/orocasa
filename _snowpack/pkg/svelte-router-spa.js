import { w as writable } from './common/index-df943e3a.js';
import { S as SvelteComponent, i as init, b as safe_not_equal, e as empty, d as insert, f as group_outros, h as transition_out, j as check_outros, k as transition_in, l as detach, m as create_component, n as mount_component, p as destroy_component, q as component_subscribe, o as onMount } from './common/index-7aad7fd7.js';

const { set, subscribe } = writable({});

const remove = () => {
  set({});
};

const activeRoute = {
  subscribe,
  set,
  remove,
};

const UrlParser = (urlString, namedUrl = '') => {
  const urlBase = new URL(urlString);

  /**
   * Wrapper for URL.hash
   *
   **/
  function hash() {
    return urlBase.hash;
  }

  /**
   * Wrapper for URL.host
   *
   **/
  function host() {
    return urlBase.host;
  }

  /**
   * Wrapper for URL.hostname
   *
   **/
  function hostname() {
    return urlBase.hostname;
  }

  /**
   * Returns an object with all the named params and their values
   *
   **/
  function namedParams() {
    const allPathName = pathNames();
    const allNamedParamsKeys = namedParamsWithIndex();

    return allNamedParamsKeys.reduce((values, paramKey) => {
      values[paramKey.value] = allPathName[paramKey.index];
      return values;
    }, {});
  }

  /**
   * Returns an array with all the named param keys
   *
   **/
  function namedParamsKeys() {
    const allNamedParamsKeys = namedParamsWithIndex();

    return allNamedParamsKeys.reduce((values, paramKey) => {
      values.push(paramKey.value);
      return values;
    }, []);
  }

  /**
   * Returns an array with all the named param values
   *
   **/
  function namedParamsValues() {
    const allPathName = pathNames();
    const allNamedParamsKeys = namedParamsWithIndex();

    return allNamedParamsKeys.reduce((values, paramKey) => {
      values.push(allPathName[paramKey.index]);
      return values;
    }, []);
  }

  /**
   * Returns an array with all named param ids and their position in the path
   * Private
   **/
  function namedParamsWithIndex() {
    const namedUrlParams = getPathNames(namedUrl);

    return namedUrlParams.reduce((validParams, param, index) => {
      if (param[0] === ':') {
        validParams.push({ value: param.slice(1), index });
      }
      return validParams;
    }, []);
  }

  /**
   * Wrapper for URL.port
   *
   **/
  function port() {
    return urlBase.port;
  }

  /**
   * Wrapper for URL.pathname
   *
   **/
  function pathname() {
    return urlBase.pathname;
  }

  /**
   * Wrapper for URL.protocol
   *
   **/
  function protocol() {
    return urlBase.protocol;
  }

  /**
   * Wrapper for URL.search
   *
   **/
  function search() {
    return urlBase.search;
  }

  /**
   * Returns an object with all query params and their values
   *
   **/
  function queryParams() {
    const params = {};
    urlBase.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  }

  /**
   * Returns an array with all the query param keys
   *
   **/
  function queryParamsKeys() {
    const params = [];
    urlBase.searchParams.forEach((_value, key) => {
      params.push(key);
    });

    return params;
  }

  /**
   * Returns an array with all the query param values
   *
   **/
  function queryParamsValues() {
    const params = [];
    urlBase.searchParams.forEach((value) => {
      params.push(value);
    });

    return params;
  }

  /**
   * Returns an array with all the elements of a pathname
   *
   **/
  function pathNames() {
    return getPathNames(urlBase.pathname);
  }

  /**
   * Returns an array with all the parts of a pathname
   * Private method
   **/
  function getPathNames(pathName) {
    if (pathName === '/' || pathName.trim().length === 0) return [pathName];
    if (pathName.slice(-1) === '/') {
      pathName = pathName.slice(0, -1);
    }
    if (pathName[0] === '/') {
      pathName = pathName.slice(1);
    }

    return pathName.split('/');
  }

  return Object.freeze({
    hash: hash(),
    host: host(),
    hostname: hostname(),
    namedParams: namedParams(),
    namedParamsKeys: namedParamsKeys(),
    namedParamsValues: namedParamsValues(),
    pathNames: pathNames(),
    port: port(),
    pathname: pathname(),
    protocol: protocol(),
    search: search(),
    queryParams: queryParams(),
    queryParamsKeys: queryParamsKeys(),
    queryParamsValues: queryParamsValues(),
  });
};

/**
 * Returns true if object has any nested routes empty
 * @param routeObject
 **/
const anyEmptyNestedRoutes = (routeObject) => {
  let result = false;
  if (Object.keys(routeObject).length === 0) {
    return true;
  }

  if (routeObject.childRoute && Object.keys(routeObject.childRoute).length === 0) {
    result = true;
  } else if (routeObject.childRoute) {
    result = anyEmptyNestedRoutes(routeObject.childRoute);
  }

  return result;
};

/**
 * Compare two routes ignoring named params
 * @param pathName string
 * @param routeName string
 **/

const compareRoutes = (pathName, routeName) => {
  routeName = removeSlash(routeName);

  if (routeName.includes(':')) {
    return routeName.includes(pathName);
  } else {
    return routeName.startsWith(pathName);
  }
};

/**
 * Returns a boolean indicating if the name of path exists in the route based on the language parameter
 * @param pathName string
 * @param route object
 * @param language string
 **/

const findLocalisedRoute = (pathName, route, language) => {
  let exists = false;

  if (language) {
    return { exists: route.lang && route.lang[language] && route.lang[language].includes(pathName), language };
  }

  exists = compareRoutes(pathName, route.name);

  if (!exists && route.lang && typeof route.lang === 'object') {
    for (const [key, value] of Object.entries(route.lang)) {
      if (compareRoutes(pathName, value)) {
        exists = true;
        language = key;
      }
    }
  }

  return { exists, language };
};

/**
 * Return all the consecutive named param (placeholders) of a pathname
 * @param pathname
 **/
const getNamedParams = (pathName = '') => {
  if (pathName.trim().length === 0) return [];
  const namedUrlParams = getPathNames(pathName);
  return namedUrlParams.reduce((validParams, param) => {
    if (param[0] === ':') {
      validParams.push(param.slice(1));
    }

    return validParams;
  }, []);
};

/**
 * Split a pathname based on /
 * @param pathName
 * Private method
 **/
const getPathNames = (pathName) => {
  if (pathName === '/' || pathName.trim().length === 0) return [pathName];

  pathName = removeSlash(pathName, 'both');

  return pathName.split('/');
};

/**
 * Return the first part of a pathname until the first named param is found
 * @param name
 **/
const nameToPath = (name = '') => {
  let routeName;
  if (name === '/' || name.trim().length === 0) return name;
  name = removeSlash(name, 'lead');
  routeName = name.split(':')[0];
  routeName = removeSlash(routeName, 'trail');

  return routeName.toLowerCase();
};

/**
 * Return the path name excluding query params
 * @param name
 **/
const pathWithoutQueryParams = (currentRoute) => {
  const path = currentRoute.path.split('?');
  return path[0];
};

/**
 * Return the path name including query params
 * @param name
 **/
const pathWithQueryParams = (currentRoute) => {
  let queryParams = [];
  if (currentRoute.queryParams) {
    for (let [key, value] of Object.entries(currentRoute.queryParams)) {
      queryParams.push(`${key}=${value}`);
    }
  }

  const hash = currentRoute.hash ? currentRoute.hash : '';

  if (queryParams.length > 0) {
    return `${currentRoute.path}?${queryParams.join('&')}${hash}`;
  } else {
    return currentRoute.path + hash;
  }
};

/**
 * Returns a string with trailing or leading slash character removed
 * @param pathName string
 * @param position string - lead, trail, both
 **/
const removeExtraPaths = (pathNames, basePathNames) => {
  const names = basePathNames.split('/');
  if (names.length > 1) {
    names.forEach(function (name, index) {
      if (name.length > 0 && index > 0) {
        pathNames.shift();
      }
    });
  }

  return pathNames;
};

/**
 * Returns a string with trailing or leading slash character removed
 * @param pathName string
 * @param position string - lead, trail, both
 **/

const removeSlash = (pathName, position = 'lead') => {
  if (position === 'trail' || position === 'both') {
    pathName = pathName.replace(/\/$/, '');
  }

  if (position === 'lead' || position === 'both') {
    pathName = pathName.replace(/^\//, '');
  }

  return pathName;
};

/**
 * Returns the name of the route based on the language parameter
 * @param route object
 * @param language string
 **/

const routeNameLocalised = (route, language = null) => {
  if (!language || !route.lang || !route.lang[language]) {
    return route.name;
  } else {
    return route.lang[language];
  }
};

/**
 * Return the path name excluding query params
 * @param name
 **/
const startsWithNamedParam = (currentRoute) => {
  const routeName = removeSlash(currentRoute);

  return routeName.startsWith(':');
};

/**
 * Updates the base route path.
 * Route objects can have nested routes (childRoutes) or just a long name like "admin/employees/show/:id"
 *
 * @param basePath string
 * @param pathNames array
 * @param route object
 * @param language string
 **/

const updateRoutePath = (basePath, pathNames, route, language, convert = false) => {
  if (basePath === '/' || basePath.trim().length === 0) return { result: basePath, language: null };

  let basePathResult = basePath;
  let routeName = route.name;
  let currentLanguage = language;

  if (convert) {
    currentLanguage = '';
  }

  routeName = removeSlash(routeName);
  basePathResult = removeSlash(basePathResult);

  if (!route.childRoute) {
    let localisedRoute = findLocalisedRoute(basePathResult, route, currentLanguage);

    if (localisedRoute.exists && convert) {
      basePathResult = routeNameLocalised(route, language);
    }

    let routeNames = routeName.split(':')[0];
    routeNames = removeSlash(routeNames, 'trail');
    routeNames = routeNames.split('/');
    routeNames.shift();
    routeNames.forEach(() => {
      const currentPathName = pathNames[0];
      localisedRoute = findLocalisedRoute(`${basePathResult}/${currentPathName}`, route, currentLanguage);

      if (currentPathName && localisedRoute.exists) {
        if (convert) {
          basePathResult = routeNameLocalised(route, language);
        } else {
          basePathResult = `${basePathResult}/${currentPathName}`;
        }
        pathNames.shift();
      } else {
        return { result: basePathResult, language: localisedRoute.language };
      }
    });
    return { result: basePathResult, language: localisedRoute.language };
  } else {
    return { result: basePath, language: currentLanguage };
  }
};

const RouterCurrent = (trackPage) => {
  const trackPageview = trackPage || false;
  let activeRoute = '';

  const setActive = (newRoute, updateBrowserHistory) => {
    activeRoute = newRoute.path;
    pushActiveRoute(newRoute, updateBrowserHistory);
  };

  const active = () => {
    return activeRoute;
  };

  /**
   * Returns true if pathName is current active route
   * @param pathName String The path name to check against the current route.
   * @param includePath Boolean if true checks that pathName is included in current route. If false should match it.
   **/
  const isActive = (queryPath, includePath = false) => {
    if (queryPath[0] !== '/') {
      queryPath = '/' + queryPath;
    }

    // remove query params for comparison
    let pathName = UrlParser(`http://fake.com${queryPath}`).pathname;
    let activeRoutePath = UrlParser(`http://fake.com${activeRoute}`).pathname;

    pathName = removeSlash(pathName, 'trail');

    activeRoutePath = removeSlash(activeRoutePath, 'trail');

    if (includePath) {
      return activeRoutePath.includes(pathName);
    } else {
      return activeRoutePath === pathName;
    }
  };

  const pushActiveRoute = (newRoute, updateBrowserHistory) => {
    if (typeof window !== 'undefined') {
      const pathAndSearch = pathWithQueryParams(newRoute);

      if (updateBrowserHistory) {
        window.history.pushState({ page: pathAndSearch }, '', pathAndSearch);
      }
      // Moving back in history does not update browser history but does update tracking.
      if (trackPageview) {
        gaTracking(pathAndSearch);
      }
    }
  };

  const gaTracking = (newPage) => {
    if (typeof ga !== 'undefined') {
      ga('set', 'page', newPage);
      ga('send', 'pageview');
    }
  };

  return Object.freeze({ active, isActive, setActive });
};

const RouterGuard = (onlyIf) => {
  const guardInfo = onlyIf;

  const valid = () => {
    return guardInfo && guardInfo.guard && typeof guardInfo.guard === 'function';
  };

  const redirect = () => {
    return !guardInfo.guard();
  };

  const redirectPath = () => {
    let destinationUrl = '/';
    if (guardInfo.redirect && guardInfo.redirect.length > 0) {
      destinationUrl = guardInfo.redirect;
    }

    return destinationUrl;
  };

  return Object.freeze({ valid, redirect, redirectPath });
};

const RouterRedirect = (route, currentPath) => {
  const guard = RouterGuard(route.onlyIf);

  const path = () => {
    let redirectTo = currentPath;
    if (route.redirectTo && route.redirectTo.length > 0) {
      redirectTo = route.redirectTo;
    }

    if (guard.valid() && guard.redirect()) {
      redirectTo = guard.redirectPath();
    }

    return redirectTo;
  };

  return Object.freeze({ path });
};

function RouterRoute({ routeInfo, path, routeNamedParams, urlParser, namedPath, language }) {
  const namedParams = () => {
    const parsedParams = UrlParser(`https://fake.com${urlParser.pathname}`, namedPath).namedParams;

    return { ...routeNamedParams, ...parsedParams };
  };

  const get = () => {
    return {
      name: path,
      component: routeInfo.component,
      hash: urlParser.hash,
      layout: routeInfo.layout,
      queryParams: urlParser.queryParams,
      namedParams: namedParams(),
      path,
      language,
    };
  };

  return Object.freeze({ get, namedParams });
}

function RouterPath({ basePath, basePathName, pathNames, convert, currentLanguage }) {
  let updatedPathRoute;
  let route;
  let routePathLanguage = currentLanguage;

  function updatedPath(currentRoute) {
    route = currentRoute;
    updatedPathRoute = updateRoutePath(basePathName, pathNames, route, routePathLanguage, convert);
    routePathLanguage = convert ? currentLanguage : updatedPathRoute.language;

    return updatedPathRoute;
  }

  function localisedPathName() {
    return routeNameLocalised(route, routePathLanguage);
  }

  function localisedRouteWithoutNamedParams() {
    return nameToPath(localisedPathName());
  }

  function basePathNameWithoutNamedParams() {
    return nameToPath(updatedPathRoute.result);
  }

  function namedPath() {
    const localisedPath = localisedPathName();

    return basePath ? `${basePath}/${localisedPath}` : localisedPath;
  }

  function routePath() {
    let routePathValue = `${basePath}/${basePathNameWithoutNamedParams()}`;
    if (routePathValue === '//') {
      routePathValue = '/';
    }

    if (routePathLanguage) {
      pathNames = removeExtraPaths(pathNames, localisedRouteWithoutNamedParams());
    }

    const namedParams = getNamedParams(localisedPathName());
    if (namedParams && namedParams.length > 0) {
      namedParams.forEach(function () {
        if (pathNames.length > 0) {
          routePathValue += `/${pathNames.shift()}`;
        }
      });
    }

    return routePathValue;
  }

  function routeLanguage() {
    return routePathLanguage;
  }

  function basePathSameAsLocalised() {
    return basePathNameWithoutNamedParams() === localisedRouteWithoutNamedParams();
  }

  return Object.freeze({
    basePathSameAsLocalised,
    updatedPath,
    basePathNameWithoutNamedParams,
    localisedPathName,
    localisedRouteWithoutNamedParams,
    namedPath,
    pathNames,
    routeLanguage,
    routePath,
  });
}

const NotFoundPage = '/404.html';

function RouterFinder({ routes, currentUrl, routerOptions, convert }) {
  const defaultLanguage = routerOptions.defaultLanguage;
  const sitePrefix = routerOptions.prefix ? routerOptions.prefix.toLowerCase() : '';
  const urlParser = parseCurrentUrl(currentUrl, sitePrefix);
  let redirectTo = '';
  let routeNamedParams = {};
  let staticParamMatch = false;

  function findActiveRoute() {
    let searchActiveRoute = searchActiveRoutes(routes, '', urlParser.pathNames, routerOptions.lang, convert);

    if (!searchActiveRoute || !Object.keys(searchActiveRoute).length || anyEmptyNestedRoutes(searchActiveRoute)) {
      if (typeof window !== 'undefined') {
        searchActiveRoute = routeNotFound(routerOptions.lang);
      }
    } else {
      searchActiveRoute.path = pathWithoutQueryParams(searchActiveRoute);
      if (sitePrefix) {
        searchActiveRoute.path = `/${sitePrefix}${searchActiveRoute.path}`;
      }
    }

    return searchActiveRoute;
  }

  /**
   * Gets an array of routes and the browser pathname and return the active route
   * @param routes
   * @param basePath
   * @param pathNames
   **/
  function searchActiveRoutes(routes, basePath, pathNames, currentLanguage, convert) {
    let currentRoute = {};
    let basePathName = pathNames.shift().toLowerCase();
    const routerPath = RouterPath({ basePath, basePathName, pathNames, convert, currentLanguage });
    staticParamMatch = false;

    routes.forEach(function (route) {
      routerPath.updatedPath(route);
      if (route.name !== '/') {
        route.name = removeSlash(route.name);
      }
      if (matchRoute(routerPath, route.name)) {
        let routePath = routerPath.routePath();
        redirectTo = RouterRedirect(route, redirectTo).path();

        if (currentRoute.name !== routePath) {
          currentRoute = setCurrentRoute({
            route,
            routePath,
            routeLanguage: routerPath.routeLanguage(),
            urlParser,
            namedPath: routerPath.namedPath(),
          });
        }

        if (route.nestedRoutes && route.nestedRoutes.length > 0 && routerPath.pathNames.length > 0) {
          currentRoute.childRoute = searchActiveRoutes(
            route.nestedRoutes,
            routePath,
            routerPath.pathNames,
            routerPath.routeLanguage(),
            convert
          );
          currentRoute.path = currentRoute.childRoute.path;
          currentRoute.language = currentRoute.childRoute.language;
        } else if (nestedRoutesAndNoPath(route, routerPath.pathNames)) {
          const indexRoute = searchActiveRoutes(
            route.nestedRoutes,
            routePath,
            ['index'],
            routerPath.routeLanguage(),
            convert
          );
          if (indexRoute && Object.keys(indexRoute).length > 0) {
            currentRoute.childRoute = indexRoute;
            currentRoute.language = currentRoute.childRoute.language;
          }
        }
      }
    });

    if (redirectTo) {
      currentRoute.redirectTo = redirectTo;
    }

    return currentRoute;
  }

  function matchRoute(routerPath, routeName) {
    const basePathSameAsLocalised = routerPath.basePathSameAsLocalised();
    if (basePathSameAsLocalised) {
      staticParamMatch = true;
    }

    return basePathSameAsLocalised || (!staticParamMatch && startsWithNamedParam(routeName));
  }

  function nestedRoutesAndNoPath(route, pathNames) {
    return route.nestedRoutes && route.nestedRoutes.length > 0 && pathNames.length === 0;
  }

  function parseCurrentUrl(currentUrl, sitePrefix) {
    if (sitePrefix && sitePrefix.trim().length > 0) {
      const noPrefixUrl = currentUrl.replace(sitePrefix + '/', '');
      return UrlParser(noPrefixUrl);
    } else {
      return UrlParser(currentUrl);
    }
  }

  function setCurrentRoute({ route, routePath, routeLanguage, urlParser, namedPath }) {
    const routerRoute = RouterRoute({
      routeInfo: route,
      urlParser,
      path: routePath,
      routeNamedParams,
      namedPath,
      language: routeLanguage || defaultLanguage,
    });
    routeNamedParams = routerRoute.namedParams();

    return routerRoute.get();
  }

  const routeNotFound = (customLanguage) => {
    const custom404Page = routes.find((route) => route.name == '404');
    const language = customLanguage || defaultLanguage || '';
    if (custom404Page) {
      return { ...custom404Page, language, path: '404' };
    } else {
      return { name: '404', component: '', path: '404', redirectTo: NotFoundPage };
    }
  };

  return Object.freeze({ findActiveRoute });
}

const NotFoundPage$1 = '/404.html';

let userDefinedRoutes = [];
let routerOptions = {};
let routerCurrent;

/**
 * Object exposes one single property: activeRoute
 * @param routes  Array of routes
 * @param currentUrl current url
 * @param options configuration options
 **/
const SpaRouter = (routes, currentUrl, options = {}) => {
  routerOptions = { ...options };
  if (typeof currentUrl === 'undefined' || currentUrl === '') {
    currentUrl = document.location.href;
  }

  routerCurrent = RouterCurrent(routerOptions.gaPageviews);

  currentUrl = removeSlash(currentUrl, 'trail');
  userDefinedRoutes = routes;

  const findActiveRoute = () => {
    let convert = false;

    if (routerOptions.langConvertTo) {
      routerOptions.lang = routerOptions.langConvertTo;
      convert = true;
    }

    return RouterFinder({ routes, currentUrl, routerOptions, convert }).findActiveRoute();
  };

  /**
   * Redirect current route to another
   * @param destinationUrl
   **/
  const navigateNow = (destinationUrl, updateBrowserHistory) => {
    if (typeof window !== 'undefined') {
      if (destinationUrl === NotFoundPage$1) {
        routerCurrent.setActive({ path: NotFoundPage$1 }, updateBrowserHistory);
      } else {
        navigateTo(destinationUrl);
      }
    }

    return destinationUrl;
  };

  const setActiveRoute = (updateBrowserHistory = true) => {
    const currentRoute = findActiveRoute();
    if (currentRoute.redirectTo) {
      return navigateNow(currentRoute.redirectTo, updateBrowserHistory);
    }

    routerCurrent.setActive(currentRoute, updateBrowserHistory);
    activeRoute.set(currentRoute);

    return currentRoute;
  };

  return Object.freeze({
    setActiveRoute,
    findActiveRoute,
  });
};

/**
 * Updates the current active route and updates the browser pathname
 * @param pathName String
 * @param language String
 * @param updateBrowserHistory Boolean
 **/
const navigateTo = (pathName, language = null, updateBrowserHistory = true) => {
  pathName = removeSlash(pathName, 'lead');

  if (language) {
    routerOptions.langConvertTo = language;
  }

  return SpaRouter(userDefinedRoutes, 'http://fake.com/' + pathName, routerOptions).setActiveRoute(
    updateBrowserHistory
  );
};

if (typeof window !== 'undefined') {
  // Avoid full page reload on local routes
  window.addEventListener('click', (event) => {
    if (event.target.localName.toLowerCase() !== 'a') return;
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;

    const sitePrefix = routerOptions.prefix ? `/${routerOptions.prefix.toLowerCase()}` : '';
    const targetHostNameInternal = event.target.pathname && event.target.host === window.location.host;
    const prefixMatchPath = sitePrefix.length > 1 ? event.target.pathname.startsWith(sitePrefix) : true;

    if (targetHostNameInternal && prefixMatchPath) {
      event.preventDefault();
      let navigatePathname = event.target.pathname + event.target.search;

      const destinationUrl = navigatePathname + event.target.search + event.target.hash;
      if (event.target.target === '_blank') {
        window.open(destinationUrl, 'newTab');
      } else {
        navigateTo(destinationUrl);
      }
    }
  });

  window.onpopstate = function (_event) {
    let navigatePathname = window.location.pathname + window.location.search + window.location.hash;

    navigateTo(navigatePathname, null, false);
  };
}

/* node_modules\svelte-router-spa\src\components\route.svelte generated by Svelte v3.43.1 */

function create_if_block_2(ctx) {
	let route;
	let current;

	route = new Route({
			props: {
				currentRoute: /*currentRoute*/ ctx[0].childRoute,
				params: /*params*/ ctx[1]
			}
		});

	return {
		c() {
			create_component(route.$$.fragment);
		},
		m(target, anchor) {
			mount_component(route, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const route_changes = {};
			if (dirty & /*currentRoute*/ 1) route_changes.currentRoute = /*currentRoute*/ ctx[0].childRoute;
			if (dirty & /*params*/ 2) route_changes.params = /*params*/ ctx[1];
			route.$set(route_changes);
		},
		i(local) {
			if (current) return;
			transition_in(route.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(route.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(route, detaching);
		}
	};
}

// (8:33) 
function create_if_block_1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*currentRoute*/ ctx[0].component;

	function switch_props(ctx) {
		return {
			props: {
				currentRoute: {
					.../*currentRoute*/ ctx[0],
					component: ''
				},
				params: /*params*/ ctx[1]
			}
		};
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
			const switch_instance_changes = {};

			if (dirty & /*currentRoute*/ 1) switch_instance_changes.currentRoute = {
				.../*currentRoute*/ ctx[0],
				component: ''
			};

			if (dirty & /*params*/ 2) switch_instance_changes.params = /*params*/ ctx[1];

			if (switch_value !== (switch_value = /*currentRoute*/ ctx[0].component)) {
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
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
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

// (6:0) {#if currentRoute.layout}
function create_if_block(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*currentRoute*/ ctx[0].layout;

	function switch_props(ctx) {
		return {
			props: {
				currentRoute: { .../*currentRoute*/ ctx[0], layout: '' },
				params: /*params*/ ctx[1]
			}
		};
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
			const switch_instance_changes = {};
			if (dirty & /*currentRoute*/ 1) switch_instance_changes.currentRoute = { .../*currentRoute*/ ctx[0], layout: '' };
			if (dirty & /*params*/ 2) switch_instance_changes.params = /*params*/ ctx[1];

			if (switch_value !== (switch_value = /*currentRoute*/ ctx[0].layout)) {
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
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
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
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_if_block_1, create_if_block_2];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*currentRoute*/ ctx[0].layout) return 0;
		if (/*currentRoute*/ ctx[0].component) return 1;
		if (/*currentRoute*/ ctx[0].childRoute) return 2;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(target, anchor);
			}

			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					} else {
						if_block.p(ctx, dirty);
					}

					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				} else {
					if_block = null;
				}
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
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d(detaching);
			}

			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { currentRoute = {} } = $$props;
	let { params = {} } = $$props;

	$$self.$$set = $$props => {
		if ('currentRoute' in $$props) $$invalidate(0, currentRoute = $$props.currentRoute);
		if ('params' in $$props) $$invalidate(1, params = $$props.params);
	};

	return [currentRoute, params];
}

class Route extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { currentRoute: 0, params: 1 });
	}
}

/* node_modules\svelte-router-spa\src\components\router.svelte generated by Svelte v3.43.1 */

function create_fragment$1(ctx) {
	let route;
	let current;

	route = new Route({
			props: { currentRoute: /*$activeRoute*/ ctx[0] }
		});

	return {
		c() {
			create_component(route.$$.fragment);
		},
		m(target, anchor) {
			mount_component(route, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const route_changes = {};
			if (dirty & /*$activeRoute*/ 1) route_changes.currentRoute = /*$activeRoute*/ ctx[0];
			route.$set(route_changes);
		},
		i(local) {
			if (current) return;
			transition_in(route.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(route.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(route, detaching);
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let $activeRoute;
	component_subscribe($$self, activeRoute, $$value => $$invalidate(0, $activeRoute = $$value));
	let { routes = [] } = $$props;
	let { options = {} } = $$props;

	onMount(() => {
		SpaRouter(routes, document.location.href, options).setActiveRoute();
	});

	$$self.$$set = $$props => {
		if ('routes' in $$props) $$invalidate(1, routes = $$props.routes);
		if ('options' in $$props) $$invalidate(2, options = $$props.options);
	};

	return [$activeRoute, routes, options];
}

class Router extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { routes: 1, options: 2 });
	}
}

export { Route, Router, navigateTo };

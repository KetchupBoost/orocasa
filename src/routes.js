import firebase from 'firebase/app';
import 'firebase/auth';

import RootLayout from '@/layouts/RootLayout.svelte';
import AdminLayout from '@/layouts/AdminLayout.svelte';
import Home from '@/pages/Home.svelte';
import Login from '@/pages/Login.svelte';
import ProductsIndex from '@/pages/admin/products/Index.svelte';

const getCurrentUser = auth =>
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });

const isLoggedIn = async () => {
  const auth = firebase.auth();
  return !!await getCurrentUser(auth);
};

export const routes = [
  {
    name: '/',
    component: Home,
    layout: RootLayout,
  },
  {
    name: 'login',
    component: Login,
    layout: RootLayout
  },
  {
    name: 'admin',
    component: AdminLayout,
    onlyIf: {
      guard: isLoggedIn,
      redirect: '/login'
    },
    nestedRoutes: [
      {
        name: 'index',
        redirectTo: '/admin/products'
      },
      {
        name: 'products',
        nestedRoutes: [
          {
            name: 'index',
            component: ProductsIndex
          }
        ]
      }
    ]
  }
];

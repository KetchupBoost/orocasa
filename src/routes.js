import firebase from 'firebase/app';
import 'firebase/auth';

import RootLayout from '@/layouts/RootLayout.svelte';
import AdminLayout from '@/layouts/AdminLayout.svelte';
import Home from '@/pages/Home.svelte';
import Login from '@/pages/Login.svelte';
import ProductsIndex from '@/pages/admin/products/Index.svelte';

function isLoggedIn() {
  const auth = firebase.auth();
  const user = auth.currentUser;

  return !!user;
}

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

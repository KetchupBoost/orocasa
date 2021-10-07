import RootLayout from '@/layouts/RootLayout.svelte';
import AdminLayout from '@/layouts/AdminLayout.svelte';
import Home from '@/pages/Home.svelte';
import Login from '@/pages/Login.svelte';
import AdminEstimates from '@/pages/admin/Estimates.svelte';
import AdminProducts from '@/pages/admin/Products.svelte';
import AdminCategories from '@/pages/admin/Categories.svelte';

export const routes = [
  {
    name: '/',
    component: Home,
    layout: RootLayout,
  },
  {
    name: '/login',
    component: Login,
    layout: RootLayout
  },
  {
    name: '/admin',
    component: AdminLayout,
    nestedRoutes: [
      {
        name: 'index',
        redirectTo: '/admin/estimates'
      },
      {
        name: 'estimates',
        component: AdminEstimates
      },
      {
        name: 'products',
        component: AdminProducts
      },
      {
        name: 'categories',
        component: AdminCategories
      }
    ]
  }
];

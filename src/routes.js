import RootLayout from '@/layouts/RootLayout.svelte';
import AdminLayout from '@/layouts/AdminLayout.svelte';
import Home from '@/pages/Home.svelte';
import Login from '@/pages/Login.svelte';
import EstimatePreview from '@/pages/admin/EstimatePreview.svelte';
import AdminEstimates from '@/pages/admin/Estimates.svelte';
import AdminEstimatesEditor from '@/pages/admin/EstimatesEditor.svelte';
import AdminProducts from '@/pages/admin/Products.svelte';
import AdminCategories from '@/pages/admin/Categories.svelte';
import AdminFeatures from '@/pages/admin/Features.svelte';
import AdminConfig from '@/pages/admin/Config.svelte';

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
    name: '/estimate-preview/:id',
    component: EstimatePreview
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
        component: AdminEstimates,
      },
      {
        name: 'editor',
        component: AdminEstimatesEditor
      },
      {
        name: 'products',
        component: AdminProducts
      },
      {
        name: 'categories',
        component: AdminCategories
      },
      {
        name: 'features',
        component: AdminFeatures
      },
      {
        name: 'config',
        component: AdminConfig
      }
    ]
  }
];

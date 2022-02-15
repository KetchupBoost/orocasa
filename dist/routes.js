import RootLayout from './layouts/RootLayout.svelte.js';
import AdminLayout from './layouts/AdminLayout.svelte.js';
import Home from './pages/Home.svelte.js';
import Login from './pages/Login.svelte.js';
import EstimatePreview from './pages/admin/EstimatePreview.svelte.js';
import AdminEstimates from './pages/admin/Estimates.svelte.js';
import AdminEstimatesEditor from './pages/admin/EstimatesEditor.svelte.js';
import AdminProducts from './pages/admin/Products.svelte.js';
import AdminCategories from './pages/admin/Categories.svelte.js';
import AdminFeatures from './pages/admin/Features.svelte.js';
import AdminConfig from './pages/admin/Config.svelte.js';

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

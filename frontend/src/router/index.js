import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import BrowseView from '../views/BrowseView.vue'
import LoginView from '../views/LoginView.vue'
import BookDetails from '../views/BookDetails.vue'
import ShoppingCart from '../views/ShoppingCartView.vue'
import FormOrder from '../views/FormOrderView.vue'
import UserOrdersView from '../views/UserOrdersView.vue'
import ManageOrdersView from '../manager_views/ManageOrders.vue'
import OrdersStats from '../manager_views/OrdersStats.vue' 
import {getAccessToken} from '../services/getAccessToken'
import SuccessfullOrder from '../views/SuccessfullOrder.vue'
import AdminPage from '../admin_views/AdminPage.vue'
import BookTable from '../admin_views/BookTable.vue'
import StorageTable from '../admin_views/StorageTable.vue'
const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingView,
  }, 
  {
    path: '/browse',
    name: 'browse',
    component: BrowseView,
  }, 
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/details/:isbn',
    name: 'bookDetails',
    component: BookDetails,
    meta: { requiresAuth: true }
  }, 
  {
    path: '/shopping-cart',
    name: 'shoppingCart',
    component: ShoppingCart,
    meta: { requiresAuth: true }
  }, 
  {
    path: '/form-order',
    name: 'formOrder',
    component: FormOrder,
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: UserOrdersView,
    meta: { requiresAuth: true }
  },
  {
    path: '/manage-orders',
    name: 'ManageOrders',
    component: ManageOrdersView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/orders-stats',
    name: 'OrderStats',
    component: OrdersStats,
    meta: { requiresAuth: true } 
  }, 
  {
    path: '/success',
    name: 'SuccessfullOrder',
    component: SuccessfullOrder
  }, 
  {
    path: '/admin',
    mane: 'AdminPage',
    component: AdminPage,
    children: [
      {
        path: '',
        redirect: '/books',
      },
      {
        path: '/books',
        name: 'BooksTable',
        component: BookTable,
      },
      {
        path: '/storage',
        name: 'StorageTable',
        component: StorageTable,
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = getAccessToken();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  if (to.name !== 'login' && from.name === 'login') {
    window.location.reload();
  }
});

export default router;

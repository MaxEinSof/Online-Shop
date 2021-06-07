import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'Shop',
      component: () => import('@/views/Shop.vue'),
      meta: {
        layout: 'main'
      }
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: () => import('@/views/Product.vue'),
      meta: {
        layout: 'main'
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/Cart.vue'),
      meta: {
        layout: 'main'
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: {
        name: 'AdminProducts'
      },
      component: () => import('@/views/admin/Admin.vue'),
      meta: {
        layout: 'admin',
        isAuthRequired: true
      },
      children: [
        {
          path: 'products',
          name: 'AdminProducts',
          component: () => import('@/views/admin/Products.vue')
        },
        {
          path: 'categories',
          name: 'AdminCategories',
          component: () => import('@/views/admin/Categories.vue')
        },
        {
          path: 'product/:id',
          name: 'AdminProduct',
          component: () => import('@/views/admin/Product.vue')
        }
      ]
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/Auth.vue'),
      meta: {
        layout: 'auth'
      }
    }
  ],
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.meta.isAuthRequired && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth')
  } else {
    next()
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'Shop',
      component: () => import('@/views/Shop.vue'),
      meta: {
        title: 'Магазин',
        layout: 'main'
      }
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: () => import('@/views/Product.vue'),
      meta: {
        title: 'Товар',
        layout: 'main'
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/Cart.vue'),
      meta: {
        title: 'Корзина',
        layout: 'main'
      }
    },
    {
      path: '/thanks',
      name: 'Thanks',
      component: () => import('@/views/Thanks.vue'),
      meta: {
        title: 'Спасибо за покупку',
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
        isAuthRequired: true,
        isAdminAccessRequired: true
      },
      children: [
        {
          path: 'products',
          name: 'AdminProducts',
          component: () => import('@/views/admin/Products.vue'),
          meta: {
            title: 'Инвентарь'
          }
        },
        {
          path: 'categories',
          name: 'AdminCategories',
          component: () => import('@/views/admin/Categories.vue'),
          meta: {
            title: 'Категории'
          }
        },
        {
          path: 'product/:id',
          name: 'AdminProduct',
          component: () => import('@/views/admin/Product.vue'),
          meta: {
            title: 'Товар'
          }
        }
      ]
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/Auth.vue'),
      meta: {
        title: 'Войти в систему',
        layout: 'auth'
      }
    }
  ],
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.meta.isAdminAccessRequired) {
    if (store.getters['auth/isAdmin']) {
      return next()
    } else if (store.getters['auth/isUser']) {
      return next('/auth?message=admin')
    } else {
      return next('/auth')
    }
  }

  if (to.meta.isAuthRequired) {
    if (store.getters['auth/isAuthenticated']) {
      return next()
    } else {
      return next('/auth?message=auth')
    }
  }

  next()
})

router.afterEach(to => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | Online Shop`
  } else {
    document.title = 'Online Shop'
  }
})

export default router

import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import message from '@/store/modules/message'
import products from '@/store/modules/products'
import categories from '@/store/modules/categories'
import cart from '@/store/modules/cart'
import orders from '@/store/modules/orders'

export default createStore({
  modules: { auth, message, products, categories, cart, orders }
})

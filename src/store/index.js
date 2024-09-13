import { createStore } from 'vuex'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import router from '@/router'
import { applyToken } from '@/service/AuthenticatedUser.js'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()
const apiURL = 'https://blackjack-76rw.onrender.com/'

applyToken(cookies.get('LegitUser')?.token)

export default createStore({
  state: {
    users: [],
    products: [],
    user: [],
    product: null,
    error: null,
    isLoading: false,
    token: null,
    isAuthenticated:  false,

  },
  getters: {
    allProducts: (state) => state.products,
    allUsers: (state) =>  state.users,
    singleProduct: (state) =>  state.product,


  },
  mutations: {
    setUsers(state, value) {
      state.users = value
    },
    setUser(state, user) {
      state.user = user;
    },
    setProducts(state, value) {
      state.products = value
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setProduct(state, product) {
      state.product = product
    }
  },
  actions: {
    async deleteUser(context, UserID) {
      try {
        console.log('here'+ UserID);
        
        const {msg, failedMsg} = await (await axios.delete(`${apiURL}users/delete/${UserID}`)).data;
        if (msg) {
          console.log(msg);
          toast.success('User deleted successfully');
        }
        console.log(failedMsg);
        
      } catch (error) {
        toast.error(`Failed to delete user: ${error.message}`);
      }
    },
    //Add New Product
    async addProduct({ commit }, productData) {
      try {
        const response = await axios.post(`${apiURL}products/addProduct`, productData);
        commit('addProduct', response.data);
        toast.success('Product added successfully');
      } catch (error) {
        toast.error(`Failed to add product: ${error.message}`);
      }
      finally {
        location.reload()
      }
    },
    async deleteProduct({ dispatch }, id) {
      try {
        await axios.delete(`${apiURL}products/delete/${id}`);
        toast.success('Product deleted successfully');
        dispatch('fetchProducts');
      } catch (error) {
        toast.error(`Failed to delete product: ${error.message}`);
      }
      location.reload();
    },
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get(`${apiURL}products`);
        commit('setProducts', response.data);
      } catch (error) {
        toast.error(`Failed to fetch products: ${error.message}`);
      }
    },
    async updateProduct({ dispatch }, product) {
      try {
        await axios.patch(`${apiURL}products/update/${product.prodID}`, product);
        toast.success('Product updated successfully');
        dispatch('fetchProducts');
      } catch (error) {
        toast.error(`Failed to update product: ${error.message}`);
      }
      finally{
        location.reload()
      }
    },
  
    // Update User
    async updateUser({ dispatch }, user) {
      try {
        const { data } = await axios.patch(`${apiURL}users/update/${user.UserID}`, user);
        if (data) {
          toast.success('User updated successfully');
          dispatch('fetchUsers');
        }
      } catch (error) {
        toast.error(`Failed to update user: ${error.message}`);
      }
      finally{
        location.reload()
      }
    }
    ,
    // Add User
    async addUser(context, userData) {
      try {
        const { data } = await axios.post(`${apiURL}users/register`, userData);
        toast.success('User registered successfully');
        console.log(data);
      } catch (error) {
        if (error.response) {
          toast.error(`Failed to add user: ${error.response.data.message}`);
        } else {
          toast.error(`Failed to add user: ${error.message}`);
        }
      } finally {
        location.reload();
      }
    },
    //Fetch single product by id
    async fetchProduct({ commit }, id) {
      try {
        const { data } = await axios.get(`${apiURL}products/${id}`);
        commit('setProduct', data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
    , 
    // Fetch Users from the database
    async fetchUsers(context) {
      try {
        const { data } = await axios.get(`${apiURL}users`)
        if (data) {
          context.commit('setUsers', data)
        } else {
          router.push({ name: 'login' })
        }
        console.log(data);
        
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    },
    async login({ commit }, loginData) {
      try {
        const response = await axios.post(`${apiURL}login`, loginData);
        console.log(apiURL);
        const { token, user } = response.data;
        commit('setToken', token);
        commit('setUser', user);
        commit('setAuthenticated', true);
        toast.success('Login successful');
      } catch (error) {
        toast.error(`Failed to login: ${error.message}`);
      }
    },

  
  },
  modules: {
    
  }
})
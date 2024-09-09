<template>
  <div class="container">
    <h2 class="display-4">Products Management</h2>
    <button @click="openModalAdd()" class="btn1">Add Products</button>
    <table
      class="table-primary table-bordered"
      id="table"
      :style="{
        backgroundColor: '#4A4A4A',
        width: '1200px',
        borderColor: '#000000',
        borderWidth: '40px',
        borderStyle: 'solid',
      }"
    >
      <thead>
        <tr>
          <th>Profile</th>
          <th>Name</th>
          <th>Category</th>
          <th>Description</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td><img :src="product.prodURL" alt="" width="80px" /></td>
          <td>{{ product.prodName }}</td>
          <td>{{ product.Category }}</td>
          <td>{{ product.prodDescription }}</td>
          <td>R{{ product.Amount }}</td>
          <td>
            <button
              @click="editProduct(product)"
              class="btn"
              :style="{ backgroundColor: '#000000', color: '#ffffff' }"
            >
              Edit
            </button>
            <button
              @click="deleteProduct(product.prodID)"
              class="btn"
              :style="{ backgroundColor: '#000000', color: '#ffffff' }"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Product Modal -->
    <div
      v-if="showModalEdit"
      class="modal fade show"
      style="display: block"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Product</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateProduct">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  v-model="currentProduct.prodName"
                  class="form-control"
                  id="name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Profile link</label>
                <input
                  type="text"
                  v-model="currentProduct.prodURL"
                  class="form-control"
                  id="price"
                  required
                  placeholder="https:"
                />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Category</label>
                <input
                  type="text"
                  v-model="currentProduct.Category"
                  class="form-control"
                  id="price"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="Amount" class="form-label">Quantity</label>
                <input
                  type="number"
                  v-model="currentProduct.Quantity"
                  class="form-control"
                  id="price"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Description </label>
                <textarea
                  type="number"
                  v-model="currentProduct.prodDescription"
                  class="form-control des"
                  id="price"
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Products -->
    <div
      v-if="showModal"
      class="modal fade show"
      style="display: block"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Product</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModalAdd"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addProducts">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  v-model="currentProduct.prodName"
                  class="form-control"
                  id="name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Profile link</label>
                <input
                  type="text"
                  v-model="currentProduct.prodUrl"
                  class="form-control"
                  id="price"
                  required
                  placeholder="https:"
                />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Category</label>
                <input
                  type="text"
                  v-model="currentProduct.Category"
                  class="form-control"
                  id="price"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="Amount" class="form-label">Quantity</label>
                <input
                  type="number"
                  v-model="currentProduct.quantity"
                  class="form-control"
                  id="price"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Description </label>
                <textarea
                  type="number"
                  v-model="currentProduct.prodDescription"
                  class="form-control des"
                  id="price"
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const products = ref([]);
const showModalEdit = ref(false);
const showModalAdd = ref(false);
const currentProduct = ref({});

// Fetch products from the API
onMounted(() => {
  store.dispatch('fetchProducts').then(() => {
    products.value = store.state.products;
  });
});

// Open the edit modal and populate the form with the selected product's data
const editProduct = (product) => {
  currentProduct.value = { ...product };
  showModalEdit.value = true;
};

// Close the edit modal
const closeModal = () => {
  showModalEdit.value = false;
};

const openModalAdd = () => {
  currentProduct.value = {};
  showModalAdd.value = true;
};

const closeModalAdd = () => {
  showModalAdd.value = false;
};

// Update the product via API call
const updateProduct = () => {
  store.dispatch('updateProduct', currentProduct.value).then(() => {
    closeModal();
    store.dispatch('fetchProducts').then(() => {
      products.value = store.state.products;
    });
  });
};

// Delete a product via API call
const deleteProduct = (prodID) => {
  if (confirm('Are you sure you want to delete this product?')) {
    store.dispatch('deleteProduct', prodID).then(() => {
      store.dispatch('fetchProducts').then(() => {
        products.value = store.state.products;
      });
    });
  }
};

// Add Product
const addProducts = async () => {
  try {
    const productData = {
      prodName: currentProduct.value.prodName,
      Amount: currentProduct.value.Amount,
      Category: currentProduct.value.Category,
      prodURL: currentProduct.value.prodURL,
      prodDescription: currentProduct.value.prodDescription,
      Quantity: currentProduct.value.Quantity,
    };
    await store.dispatch('addProduct', productData);
    await store.dispatch('fetchProducts');
    products.value = store.state.products;
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

</script>

<style scoped>
tbody {
  background-color: #4A4A4A;
  color: white;
}
#btn1 {
  padding-left: 20px;
  margin-right: 5px;
}
h2{
  color: #000000;
  margin: 30px;
}
.modal {
  background-color: #000000;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 500px;
  margin: 40px auto;
}
.des {
  height: 250px;
}
.modal-header {
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.modal-body {
  padding: 20px;
  background-color: #333;
}

.modal-footer {
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-top: 1px solid #ccc;
}
tbody {
  background-color: #4A4A4A;
  color: white;
}
.btn {
  margin: 5px;
}
button {
  border-radius: 10px;
  width: 120px;
  color: rgb(255, 255, 255);
  background-color: #4A4A4A;
  margin-right: 5px;
  margin-bottom: 10px;
}
/* #modal{
  border: 10px;
  border-style: dashed;
  border-color:black ;
} */
</style>

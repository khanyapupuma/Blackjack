<template>
  <div class="container">
    <div class="row">
      <h2 class="display-2">Products</h2>
    </div>

    <div class="row mb-3">
      <div class="col-md-4">
        <input 
          type="text" 
          v-model="searchQuery" 
          class="form-control"
          placeholder="Search"
        />
      </div>

      <div class="col-md-2">
        <button class="btn btn-primary" @click="sortByName">Sort by Name</button>
      </div>
      <div class="col-md-2">
        <button class="btn btn-primary" @click="sortByPrice">Sort by Price</button>
      </div>
    </div>

    <div class="row">
      <div v-if="filteredProducts.length" class="row">
        <div class="col-md-4" v-for="product in filteredProducts" :key="product.prodID">
          <Card class="card">
            <template #cardHeader>
              <img
                :src="product.prodURL"
                loading="lazy"
                class="img-fluid card-img"
                :alt="product.prodName"
              />
            </template>
            <template #cardBody>
              <h5 class="card-title fw-bold">{{ product.prodName }}</h5>
              <p class="lead">
                 R{{ product.Amount }}
              </p>
              <button class="card-btn">
                <router-link class="router" :to="{ name: 'ProductDetails', params: { id: product.prodID } }">
                  View more
                </router-link>
              </button>
              <button>Add to Cart</button>
            </template>
          </Card>
        </div>
      </div>

      <div v-else>
        <Spinner />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Card from "@/components/Card.vue";
import Spinner from "@/components/Spinner.vue";

const store = useStore();

const searchQuery = ref("");
const sortBy = ref(null);

const products = computed(() => store.state.products);

const filteredProducts = computed(() => {
  let filtered = products.value.filter((product) => {
    const name = product.prodName ? product.prodName.toLowerCase() : "";
    const category = product.category ? product.category.toLowerCase() : "";
    const query = searchQuery.value.toLowerCase();

    return name.includes(query) || category.includes(query);
  });

  if (sortBy.value === "name") {
    filtered.sort((a, b) => a.prodName.localeCompare(b.prodName));
  } else if (sortBy.value === "price") {
    filtered.sort((a, b) => a.Amount - b.Amount);
  }

  return filtered;
});


const sortByName = () => {
  sortBy.value = "name";
};

const sortByPrice = () => {
  sortBy.value = "price";
};

onMounted(() => {
  store.dispatch("fetchProducts");
});
</script>

<style scoped>
.card {
  background-color: transparent;
  border: solid #b79613b5 2px;
  height: 450px;
  margin: 50px;
}
input{
  border: solid 2px;
}
.card-img {
  width: 200px;
  height: 260px;
  object-fit: cover;
  border-radius: 6px;
  border: solid #DEBD37 4px;
}
.card-btn {
  text-decoration: none;
}
h5 {
  color: #000000;
}
h2{
  color: #000000;
  margin-block: 60px;
}
button {
  width: 95px;
  height: 30px;
  margin: 10px;
  border-radius: 6px;
  background-color: #000000;
  text-decoration: none;
  color: rgb(255, 255, 255);
}
button:hover {
  background-color: #151414;
  color: rgb(177, 171, 171);
}
.router{
  text-decoration: none;
}

@media only screen and (max-width: 768px) {
    .container {
      width: 90%;
      margin: 20px auto;
    }
    .row {
      flex-direction: column;
    }
    .col-md-4 {
      width: 100%; 
    }
    .form-control {
      width: 100%; 
    }
    button {
      width: 100%; 
      margin-bottom: 10px; 
    }
    .card {
      height: 450px; 
      margin: 20px; 
      
    }
    .card-img {
      width: 150px; 
      height: 200px; 
    }
  }
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    .container {
      width: 80%; 
      margin: 30px auto; 
    }
    .row {
      flex-direction: row; 
    }
    .col-md-4 {
      width: 50%;
    }
    .form-control {
      width: 100%; 
    }
    button {
      width: 100%; 
      margin-bottom: 15px; 
    }
    .card {
      height: 500px; 
      margin: 30px; 
    }
    .card-img {
      width: 180px; 
      height: 240px;
    }
  }
</style>

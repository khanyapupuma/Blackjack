<template>
  <div class="container">
    <div class="row">
      <h2 class="display-2">Product Details</h2>
    </div>
    <div class="row justify-content-center" v-if="product">
      <Card class="card">
        <template #cardHeader>
          <img :src="product.prodURL" loading="lazy" class="img-fluid card-img" :alt="product.prodName">
        </template>
        <template #cardBody>
          <h5 class="card-title fw-bold name">{{ product.prodName }}</h5>
          <p class="lead">{{ product.prodDescription }}</p>
          <p class="lead"> <bold class="genre"> Genre:</bold> {{ product.Category }}</p>
          <p class="lead"> <b class="genre">In stock:</b> {{ product.Quantity }}</p>
          <p class="lead">R{{ product.Amount }}</p>
          
          <button>Add to Cart</button>
        </template>
      </Card>
    </div>
    <div v-else>
      <spinner/>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Card from '@/components/Card.vue';
import Spinner from '@/components/Spinner.vue';

const store = useStore();
const route = useRoute();

const product = computed(() => store.getters.singleProduct);

onMounted(() => {
  store.dispatch('fetchProduct', route.params.id);
});
</script>

<style scoped>
  .card {
    margin: 40px;
    background-color: transparent;
    border: solid #b79613b5 2px;
    width: 500px;
  }
  .card-img {
    width: 260px;
    height: 320px;
    border-radius: 6px;
    border: solid #DEBD37 4px;
  }
  h5 {
    color: #DEBD37;
  }
  button {
    width: 95px;
    height: 30px;
    margin: 10px;
    border-radius: 6px;
    background-color: #000000;
    color: rgb(255, 255, 255);
  }
  button:hover {
    background-color: #151414;
    color: rgb(177, 171, 171);
  }
  .genre{
    color: #917403;
    font-weight: bold;
  }
  h2{
    color: black;
  }
    @media only screen and (max-width: 768px) {
    .container {
      width: 90%;
      margin: 20px auto; 
    }
    .row {
      flex-direction: column; 
    }
    .card {
      margin: 20px;
      width: 90%;
    }
    .card-img {
      width: 150px; 
      height: 200px; 
    }
    h2 {
      font-size: 18px;
    }
    h5 {
      font-size: 16px; 
    }
    button {
      width: 100%; 
      margin-bottom: 10px;
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
    .card {
      margin: 30px; 
      width: 80%; 
    }
    .card-img {
      width: 180px; 
      height: 240px; 
    }
    h2 {
      font-size: 20px; 
    }
    h5 {
      font-size: 18px; 
    }
    button {
      width: 100%;
      margin-bottom: 15px;
    }
  }
</style>

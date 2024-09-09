<template>
  <div class="body">
    <div class="h1">
      <h1 class="display-2">Welcome to Blackjack</h1>
    </div>
    
    <div class="para">
      <p>
        Welcome to <b>Blackjack</b> , your go-to e-commerce platform for all things movies and series! Explore our vast collection of blockbuster hits, timeless classics, and the latest binge-worthy TV shows. Whether you're a casual viewer or a film enthusiast, we've got something for everyone. Dive into our curated selections, grab your favorites, and enjoy the ultimate entertainment experience—all in one place! <br>
        Find out more <a href="./AboutMeView.vue">About Us</a>
        <br>
        <br>
        At <b>Blackjack</b>, we pride ourselves on offering high-quality content at unbeatable prices. Discover exclusive deals, new releases, and hard-to-find gems that cater to every genre preference. Our user-friendly platform ensures a seamless shopping experience, whether you're purchasing digital downloads or collecting physical copies. Join our community of movie lovers and start building your perfect watchlist today!
      </p>
    </div>
    <h2>Our Movies & Series</h2>
    <div class="product-cards">
      <div v-for="(product, ) in displayedProducts" :key="product.prodID" class="product-card">
        <img :src="product.prodURL" :alt="product.prodName" class="product-img"/>
        <h5>{{ product.prodName }}</h5>
        <p>R{{ product.Amount }}</p>
      </div>
    </div>
    <div class="para">
      <p>
        We pride ourselves in being able to provide you with vintage,classics  and the latest movies and series. <br>
        Our strength lies in the diversity and  the quality of our products, this ranges from  <b>Horror</b>, <b>Comedy</b>, <b>Action</b>, <b>Romence</b>, <b>Drama</b>,  <b>Thriller</b> and many more. <br>
        Interested yet? Please help yourself to <a href="./ProductsView.vue">Store</a>


      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      currentIndex: 0,
      displayedProducts: [],
      intervalId: null
    };
  },
  computed: {
    ...mapGetters(["allProducts"]),
  },
  methods: {
    updateDisplayedProducts() {
      const startIndex = this.currentIndex;
      this.displayedProducts = this.allProducts.slice(startIndex, startIndex + 3);
      this.currentIndex = (startIndex + 3) % this.allProducts.length;
    }
  },
  mounted() {
    this.$store.dispatch("fetchProducts").then(() => {
      if (this.allProducts.length > 0) {
        this.updateDisplayedProducts();
        this.intervalId = setInterval(this.updateDisplayedProducts, 5000);
      }
    });
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  }
};
</script>

<style scoped>
a{
  text-decoration: none;
}
.para{
  width: 990px;
  font-size: 20px;
  margin-top: 120px;
  margin-bottom: 100px;
  margin-left: 310px;
  border-left: solid 2px  rgb(131, 128, 128);
  /* border-right: solid 2px rgb(131, 128, 128); */
}
b{
  color: rgb(159, 138, 14);
}
.body {
  color: black;
  text-align: center;
}
h1 {
  margin-top: 40px;
}
/* .h1{
  background-image: url('https://khanyapupuma.github.io/all-images/all-images/Images/bach2.jpg');
} */
.product-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
.product-card {
  width: 200px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.product-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}
</style>

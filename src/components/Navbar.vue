<template>
   <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img
          src="https://khanyapupuma.github.io/all-images/all-images/Images/blkjack.png"
          alt="logo"
          class="img-fluid"
          loading="lazy"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Store</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/checkout">Checkout</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link dropdown" to="/admin"> Admin</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link dropdown" to="/profile"> Profile</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/reach-us">Reach Me</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name:  "NavbarComp",
}
</script>

<style scoped>
li a:hover {
  color: #DEBD37;
  background-color: #0d0a0a;
  text-shadow:  2px 2px 4px rgb(230, 233, 15);
}
.navbar{
  box-shadow: 2px 6px 4px rgb(46, 44, 44);
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #DEBD37;
}
nav {
  background-color: #4A4A4A;
}
</style>
<template>
    <footer class="container-fluid">
      <div class="row">
          <p class="lead">Blackjack &copy;
            <span> {{cYear}}</span>
          </p>
     </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "FooterComp",
  data(){
  return{
      cYear: new Date().getUTCFullYear()
  }
  }
  }
  </script>
  <style scoped>
 footer{
  color: #DEBD37;
  background-color: #282626;
  font-family: 'Open Sans', Arial, sans-serif;
  font-weight: 700;
  font-style: italic;
  text-shadow:  2px 2px 4px rgb(230, 233, 15);
}
  </style>
<template>
    <footer class="container-fluid">
      <div class="row">
          <p class="lead">Light Novels &copy;
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
 
  </style>
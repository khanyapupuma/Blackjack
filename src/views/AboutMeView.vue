<template>
  <div class="body">
    <div class="h1">
       <h1>About Blackjack</h1>
    </div>
   
    <div class="para">
      Welcome to <b>Blackjack</b> , your premier destination for movies and series. Our platform was born from a passion for cinema and a mission to bring high-quality entertainment to audiences everywhere. Whether you're a fan of classic films, the latest blockbusters, or binge-worthy TV series, Blackjack has something for every taste. We carefully curate our selection to ensure that you'll always find something new and exciting to watch. <br><br>

At <b>Blackjack</b>, we believe that the magic of storytelling should be accessible to everyone. That’s why we offer competitive prices and special deals, making it easier for you to build your personal movie collection. Our team is constantly working to update our catalog with the latest releases and timeless classics, so you’ll never run out of options. From action-packed thrillers to heartwarming dramas, our diverse collection is designed to meet the unique preferences of our customers. <br><br>

Customer satisfaction is our top priority. We are committed to providing a seamless and enjoyable shopping experience. Our user-friendly interface makes browsing and purchasing easy, and our customer support team is always ready to assist you with any inquiries. Whether you're a casual viewer or a hardcore cinephile, <b>Blackjack</b> <b> is here </b> to cater to your entertainment needs.

Join us at <b>Blackjack</b> today and immerse yourself in the world of movies and series. We look forward to becoming your go-to source for all things entertainment.
    </div>
  </div>
</template>

<script>
export default {
 name: 'AboutMe',
}
</script>

<style scoped>
.body{
  color: black;
}
h1{
  margin-top: 40px;
}

.para{
  text-align: center;
  width: 1200px;
  font-size: 20px;
  margin-top: 120px;
  margin-bottom: 100px;
  margin-left: 160px;
  border-left: solid 2px  rgb(131, 128, 128);
  border-right: solid 2px rgb(131, 128, 128);
}
b{
  color: rgb(159, 138, 14);
}
@media only screen and (max-width: 768px) {
  .para {
    width: 90%; 
    margin-top: 60px; 
    margin-bottom: 60px; 
    margin-left: 20px;
    font-size: 16px;
  }
  b {
    font-size: 14px;
  }
}

@media only screen and (min-width: 769px) and (max-width: 1024px) {
  .para {
    width: 80%; 
    margin-top: 80px; 
    margin-bottom: 80px;
    margin-left: 40px; 
    font-size: 18px; 
  }
  b {
    font-size: 16px;
  }
}
</style>
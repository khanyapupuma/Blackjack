<template>
  <div class="body">
    <h1>Admin Profiles</h1>
    <div class="profiles">
      <div class="profile">
        <h2>User Admin</h2>
        <img src="https://khanyapupuma.github.io/all-images/all-images/Images/users.png" alt="">
        <br>
        <button @click="$router.push({ name: 'UserAdmin' })">Go to User Admin</button>
      </div>
      <div class="profile">
        <h2>Products Admin</h2>
        <img src="https://khanyapupuma.github.io/all-images/all-images/Images/videoprof.jpg" alt="" width="230px">
        <br>
        <button @click="$router.push({ name: 'ProductsAdmin' })">Go to Products Admin</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.profiles {
  display: flex;
  justify-content: space-around;
  text-shadow: 2px 2px 4px white;
  margin-top: 20px;
}

.profile {
  background-color: #4A4A4A;
  border: 2px solid #DEBD37;
  padding: 20px;
  width: 40%;
  text-align: center;
  margin-top: 20px;
}
.profile:hover{
  border: 3px solid #DEBD37;
  box-shadow: 6px 6px 9px #fffb00;
}

img{
  border: solid 8px #DEBD37;
  border-radius: 150px;
  margin-top: 20px;
}
img:hover{
  transform: scale(1.2);
  border-color:#ffd426;
}
button {
  margin-top: 40px;
  height: 40px;
  width: 200px;
  padding: 10x 20px;
  background-color: rgb(2, 2, 2);
  color:#DEBD37;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover{
  color:#ffd015 ;
}
h1{
  color: black;
  margin-top: 40px;
}
</style>
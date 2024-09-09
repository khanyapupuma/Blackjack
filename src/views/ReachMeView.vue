<template>
  <div class="body">
    <div class="container">
      <h2>Contact Us:</h2>
      <form @submit.prevent="sendEmail">
        <div>
          <input type="text" id="name" v-model="form.name" placeholder="Name:"/>
        </div>
        <div>
          <input type="text" id="surname" v-model="form.surname" placeholder="Surname:"/>
        </div>
        <div>
          <input type="email" id="email" v-model="form.email" placeholder="Email Address:"/>
        </div>
        <div>
          <textarea id="message" v-model="form.message" placeholder="Write to us:" ></textarea>
        </div>
        <div>
          <button type="submit">Send</button>
          <button type="button" @click="clearForm">Clear</button>
        </div>
        <div v-if="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
// import emailjs from 'emailjs-com';

// export default {
//   data() {
//     return {
//       form: {
//         name: '',
//         surname: '',
//         email: '',
//         message: ''
//       },
//       error: ''
//     }
//   },
//   methods: {
//     sendEmail() {
//       if (!this.validateForm()) {
//         return;
//       }

//       emailjs.init('YOUR_USER_ID');
//       emailjs.send('service_ajp7c9c', 'template_ezevsqn', this.form, 'nr84-uEp_HOD_rvlC')
//         .then((response) => {
//           console.log('SUCCESS!', response.status, response.text);
//         }, (err) => {
//           this.error = 'Failed to send email. Please try again later.';
//           console.log('FAILED...', err);
//         });
//     },
//     clearForm() {
//       this.form.name = '';
//       this.form.surname = '';
//       this.form.email = '';
//       this.form.message = '';
//     },
//     validateForm() {
//       if (!this.form.name || !this.form.surname || !this.form.email || !this.form.message) {
//         this.error = 'Please fill in all fields.';
//         return false;
//       }

//       if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.form.email)) {
//         this.error = 'Invalid email address.';
//         return false;
//       }

//       return true;
//     }
//   }
// }
</script>

<style scoped>
  .container{
    width: 700px;
    margin-top: 100px;
    margin-bottom: 100px;
    background-color: rgba(164, 27, 110, 0.542);
    text-shadow: 2px 2px 4px white;
    padding: 20px;
  }
input{
  height: 40px;
  width: 70%;
  margin-bottom: 10px;
  border-radius: 4px;
}
textarea{
  height: 150px;
  width: 70%;
  border-radius: 4px;
}
button{
  width: 90px;
  height: 30px;
  margin: 10px;
  border-radius: 6px;
  background-color: black;
  color: blueviolet;
}
button:hover{
  background-color: blueviolet;
  color: black;
}
</style>
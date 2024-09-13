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
import emailjs from 'emailjs-com';

export default {
  data() {
    return {
      form: {
        name: '',
        surname: '',
        email: '',
        message: ''
      },
      error: ''
    }
  },
  methods: {
    sendEmail() {
      if (!this.validateForm()) {
        return;
      }

      emailjs.init('YOUR_USER_ID');
      emailjs.send('service_ajp7c9c', 'template_ezevsqn', this.form, 'nr84-uEp_HOD_rvlC')
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
        }, (err) => {
          this.error = 'Failed to send email. Please try again later.';
          console.log('FAILED...', err);
        });
    },
    clearForm() {
      this.form.name = '';
      this.form.surname = '';
      this.form.email = '';
      this.form.message = '';
    },
    validateForm() {
      if (!this.form.name || !this.form.surname || !this.form.email || !this.form.message) {
        this.error = 'Please fill in all fields.';
        return false;
      }

      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.form.email)) {
        this.error = 'Invalid email address.';
        return false;
      }

      return true;
    }
  }
}
</script>

<style scoped>
h2{
  color: #DEBD37;
  text-shadow: 2px 2px 4px rgb(218, 189, 20);
}
  .container{
    width: 700px;
    margin-top: 100px;
    margin-bottom: 100px;
    background-color:rgb(208, 197, 197);
    /* background-color: #4A4A4A */
    padding: 20px;
    border: solid;
  }
input{
  height: 60px;
  width: 90%;
  margin-bottom: 10px;
  border-radius: 4px;
}
textarea{
  height: 150px;
  width: 90%;
  border-radius: 8px;
}
button{
  width: 90px;
  height: 30px;
  margin: 10px;
  border-radius: 6px;
  background-color: rgb(255, 255, 255);
  color: #DEBD37;
}
button:hover{
  background-color: #302703;
  color: #ffffff;
}
@media only screen and (max-width: 768px) {
  .container {
    width: 90%; 
    margin-top: 50px; 
    margin-bottom: 50px; 
  }
  input {
    height: 40px; 
    font-size: 16px; 
  }
  textarea{
    height: 100px;
    font-size: 16px;
  }
  button {
    width: 70px; 
    height: 25px; 
  }
}
</style>
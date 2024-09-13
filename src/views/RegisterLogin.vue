<template>
  <div class="body">
    <h1>Welcome to Blackjack</h1>
    <p>
        Welcome viewer, we are pleased that you have been interested in our website however before you continue in order for <br>
        the protection of the website  and its users we require you to register. Please fill in the form below to register.
        Click here to register <br>
          <button  @click="addUserModal">
            Register
          </button>
          <br>
          If you are already registered as a user please click here to login
          <br>
          <button @click="loginModal">
            Login
          </button>

    </p>
    <!-- Add User Modal -->
    <div
      v-if="showModalAdd"
      class="modal fade show"
      style="display: block"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" id="modal" role="document">
        <div
          class="modal-content"
          :style="{ backgroundColor: '#ffffff', color: '#6226A' }"
        >
          <div class="modal-header">
            <h5 class="modal-title">Register</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModalAdd"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addUser">
              <div class="mb-3">
                <label for="name" class="form-label">First Name</label>
                <input
                  type="text"
                  v-model="currentUser.firstName"
                  class="form-control"
                  id="name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input
                  type="text"
                  v-model="currentUser.lastName"
                  class="form-control"
                  id="lastName"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="age" class="form-label">Age</label>
                <input
                  type="number"
                  v-model="currentUser.userAge"
                  class="form-control"
                  id="age"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="gender" class="form-label">Gender</label>
                <input
                  type="text"
                  v-model="currentUser.Gender"
                  class="form-control"
                  id="gender"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="userRole" class="form-label">User Role</label>
                <input
                  type="text"
                  v-model="currentUser.userRole"
                  class="form-control"
                  id="userRole"
                  required
                  placeholder=""
                />
              </div>
              <div class="mb-3">
                <label for="emailAdd" class="form-label">Email</label>
                <input
                  type="email"
                  v-model="currentUser.emailAdd"
                  class="form-control"
                  id="emailAdd"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Enter Password</label>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="currentUser.userPass"
                  class="form-control"
                  id="password"
                  required
                  placeholder="Password"
                />
                <button
                  class="btn btn-secondary"
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? "Hide" : "Show" }}
                </button>
              </div>
              <div class="mb-3">
                <label for="userProfile" class="form-label">User Profile</label>
                <input
                  type="text"
                  v-model="currentUser.userProfile"
                  class="form-control"
                  id="userProfile"
                  required
                  placeholder="https://address"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Add User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- User Login Modal -->
    <div
      v-if="showModalLogin"
      class="modal fade show"
      style="display: block"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" id="modal" role="document">
        <div
          class="modal-content"
          :style="{ backgroundColor: '#ffffff', color: '#6226A' }"
        >
          <div class="modal-header">
            <h5 class="modal-title">User Login</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModalLogin"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="loginUser">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  v-model="currentUser.emailAdd"
                  class="form-control"
                  id="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Enter Password</label>
                <input
                  type="password"
                  v-model="currentUser.userPass"
                  class="form-control"
                  id="password"
                  required
                  placeholder="Password"
                />
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const users = ref([]);
const showModalAdd = ref(false);
const showModalLogin = ref(false);
const currentUser = ref({});

// Add User Modals
// Open add user modal
const addUserModal = () => {
  showModalAdd.value = true;
  currentUser.value = {};
};
// Close add user modal
const closeModalAdd = () => {
  showModalAdd.value = false;
  currentUser.value = {};
};
// Add a new user
const addUser = async () => {
  try {
    await store.dispatch("addUser", currentUser.value);
    showModalAdd.value = false;
    currentUser.value = {};
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

// Login  Modals
// Open login modal
const loginModal = () => {
  showModalLogin.value = true;
};

// Close login modal
const closeModalLogin = () => {
  showModalLogin.value = false;
  currentUser.value = {};
};

// Login user
const loginUser = () => {
  store.dispatch("loginUser", currentUser.value).then(() => {
    showModalLogin.value = false;
    currentUser.value = {};
  });
};
// For password
const showPassword = ref(false);

</script>

<style>
.btn {
  background-color: #000000;
  color: #ffffff;
  margin-top: 5px;
}

.modal {
  background-color: #000000;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 500px;
  margin: 40px auto;
  margin-left: 450px;
}
.des {
  height: 250px;
}
.modal-header {
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.modal-body {
  padding: 20px;
  background-color: #333;
}

.modal-footer {
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-top: 1px solid #ccc;
}
.form-label {
  font-weight: bold;
}

.btn-close {
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
h2 {
  color: #000000;
  margin: 30px;
}
button {
  border-radius: 10px;
  width: 120px;
  color: rgb(255, 255, 255);
  background-color: #4a4a4a;
  margin-right: 5px;
  margin-bottom: 10px;
}
</style>
<template>
  <div class="container">
    <h2 class="display-4">Users Management</h2>
    <button @click="addUserModal">Register</button>
    <button @click="loginModal">Log In</button>

    <table
      class="table-primary table-bordered"
      id="table"
      :style="{
        backgroundColor: '#4A4A4A',
        width: '1200px',
        borderColor: '#000000',
        borderWidth: '40px',
        borderStyle: 'solid',
        color: '#ffffff',
      }"
    >
      <thead class="thead-lg">
        <tr>
          <th>Profile</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Role</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.userID">
          <td><img :src="user.userProfile" alt="" width="80px" /></td>
          <td>{{ user.firstName }} {{ user.lastName }}</td>
          <td>{{ user.emailAdd }}</td>
          <td>{{ user.Gender }}</td>
          <td>{{ user.userRole }}</td>
          <td>{{ user.userAge }}</td>
          <td>
            <button
              @click="editUser(user)"
              class="btn"
              :style="{ backgroundColor: '#000000', color: '#ffffff' }"
            >
              Edit
            </button>
            <button
              @click.prevent="deleteUser(user.UserID)"
              class="btn"
              :style="{ backgroundColor: '#000000', color: '#ffffff' }"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit User Modal -->
    <div
      v-if="showModalEdit"
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
            <h5 class="modal-title">Edit User</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModalEdit"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateUser">
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
                <label for="gender" class="form-label">User Authority</label>
                <input
                  type="text"
                  v-model="currentUser.userRole"
                  class="form-control"
                  id="gender"
                  required
                />
              </div>
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
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

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
            <h5 class="modal-title">Add User</h5>
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
import { useRouter } from 'vue-router';

const store = useStore();
const users = ref([]);
const showModalEdit = ref(false);
const showModalAdd = ref(false);
const showModalLogin = ref(false);
const router = useRouter();
const currentUser = ref({});
const showPassword = ref(false);

// Fetch users on mount
onMounted(() => {
  store.dispatch("fetchUsers").then(() => {
    users.value = store.state.users;
  });
});

// Open edit modal and set current user
const editUser = (user) => {
  currentUser.value = { ...user };
  showModalEdit.value = true;
};

// Close edit modal
const closeModalEdit = () => {
  showModalEdit.value = false;
  currentUser.value = {};
};

// Update user
const updateUser = () => {
  store.dispatch("updateUser", currentUser.value).then(() => {
    showModalEdit.value = false;
    currentUser.value = {};
  });
};

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
  store.dispatch("login", { email: currentUser.value.emailAdd, password: currentUser.value.userPass })
    .then((response) => {
      if (response) {
        // Login successful, update the state
        console.log("Login successful");
        // You can also redirect the user to a protected route here
        router.push({ name: 'protected-route' });
      } else {
        // Login failed, handle the error
        console.log("Login failed");
      }
    })
    .catch((error) => {
      // Handle the error
      console.log("Error logging in:", error);
    });
};


// Delete user
const deleteUser = async (UserID) => {
  if (confirm("Are you sure you want to delete this user?")) {
    await store.dispatch("deleteUser", UserID);
    // console.log(userID);
    await store.dispatch("fetchUsers");
    users.value = [...store.state.users];
  }
};
</script>

<style>
.container {
  max-width: 100%;
  padding: 2rem;
}

.table-primary {
  background-color: #4a4a4a;
}

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

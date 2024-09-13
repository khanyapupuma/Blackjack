<template>
  <div class="body">
    <h1> View your profile</h1>
    <p>
        Welcome here you can edit your  profile information and also log  out from your account.
        to edit your account click here <button  @click="editUser(user)" class="btn" :style="{ backgroundColor: '#000000', color: '#ffffff' }">Edit Account</button>  or to log out click here <button class="btn" :style="{ backgroundColor: '#000000', color: '#ffffff' }">Log Out</button>

    </p>
    <!-- Edit Profile -->
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const users = ref([]);
const currentUser = ref({});
const showModalEdit = ref(false);

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
<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ isSignup ? 'Sign Up' : 'Login' }}</h2>
        <button @click="closeModal" class="close-button">&times;</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="isSignup ? signup() : login()">
          <div v-if="isSignup" class="name-inputs">
            <input v-model="first_name" placeholder="First Name" required />
            <input v-model="last_name" placeholder="Last Name" required />
          </div>
          <input v-model="email" placeholder="Email" required />
          <input v-model="password" type="password" placeholder="Password" required />
          <button type="submit">{{ isSignup ? 'Sign Up' : 'Login' }}</button>
        </form>
        <p class="message">{{ message }}</p>
        <p class="toggle-auth-mode" @click="toggleAuthMode">
          {{ isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up' }}
        </p>
        <button @click="demo" class="demo-button">Demo</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  isVisible: Boolean,
  isSignup: Boolean
});

const emit = defineEmits(['update:isVisible', 'update:isSignup']);

const first_name = ref('');
const last_name = ref('');
const email = ref('');
const password = ref('');
const message = ref('');
const errorOccurred = ref(false);

const closeModal = () => {
  emit('update:isVisible', false);
};

const toggleAuthMode = () => {
  emit('update:isSignup', !props.isSignup);
  errorOccurred.value = false;
};

const signup = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/signup', {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value
    });
    message.value = response.data.message;
    errorOccurred.value = false;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      message.value = error.response.data.message;
      errorOccurred.value = true;
    } else {
      message.value = 'An error occurred. Please try again.';
      errorOccurred.value = true;
    }
  }
};

const login = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', {
      email: email.value,
      password: password.value
    });
    message.value = response.data.message;
    errorOccurred.value = false;
    router.push('/portal'); // Redirect to Portal view on successful login
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      message.value = error.response.data.message;
      errorOccurred.value = true;
    } else {
      message.value = 'An error occurred. Please try again.';
      errorOccurred.value = true;
    }
  }
};

const demo = () => {
  router.push('/portal'); // Redirect to Portal view for demo
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: gray;
  transition: color 0.3s;
}

.close-button:hover {
  color: black;
}

.modal-body {
  margin-top: 10px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.name-inputs {
  display: flex;
  gap: 1rem;
}

input {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #000428;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: white;
  color: #000428;
}

.message {
  margin-top: 1rem;
  color: red;
}

.toggle-auth-mode {
  margin-top: 1rem;
  cursor: pointer;
  color: #000428;
  text-decoration: underline;
}

.demo-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #004e92;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  display: block; /* Ensure the button is a block element */
  margin-left: auto;
  margin-right: auto; /* Center the button */
}

.demo-button:hover {
  background-color: white;
  color: #004e92;
}
</style>

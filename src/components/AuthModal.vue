<template>
    <div class="modal-overlay" v-if="isVisible">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ isSignup ? 'Sign Up' : 'Login' }}</h2>
          <button @click="closeModal" class="close-button">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="isSignup ? signup() : login()">
            <div v-if="isSignup">
              <input v-model="first_name" placeholder="First Name" required />
              <input v-model="last_name" placeholder="Last Name" required />
            </div>
            <input v-model="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">{{ isSignup ? 'Sign Up' : 'Login' }}</button>
          </form>
          <p>{{ message }}</p>
          <p @click="toggleAuthMode">{{ isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up' }}</p>
          <button v-if="errorOccurred" @click="backToAuthMode" class="back-button">Back</button>
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
  
  const backToAuthMode = () => {
    errorOccurred.value = false;
    message.value = '';
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
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .modal-body {
    margin-top: 10px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
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
  
  p {
    margin-top: 1rem;
    cursor: pointer;
    color: #000428;
  }
  
  .back-button, .demo-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #004e92;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .back-button:hover, .demo-button:hover {
    background-color: white;
    color: #004e92;
  }
  </style>
  
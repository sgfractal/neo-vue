<template>
  <div class="auth">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const message = ref('');

    const login = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/login', {
          email: email.value,
          password: password.value
        });
        message.value = response.data.message;
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          message.value = error.response.data.message;
        } else {
          message.value = 'An error occurred. Please try again.';
        }
      }
    };

    return {
      email,
      password,
      message,
      login
    };
  }
});
</script>

<style scoped>
.auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #000428 0%, #004e92 100%);
  color: white;
  font-family: 'Arial', sans-serif;
}

h2 {
  margin-bottom: 1rem;
  font-family: 'Orbitron', sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  width: 200px;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: white;
  color: #000428;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: #000428;
  color: white;
}
</style>

<template>
  <div class="home">
    <div class="hero">
      <h1>Neo Combat Lab</h1>
      <h2>Elevate your Training</h2>
      <div class="buttons">
        <button @click="openModal(false)" class="button">Login</button>
        <button @click="openModal(true)" class="button">Sign Up</button>
      </div>
    </div>
    <AuthModal :isVisible="showModal" :isSignup="isSignup" @update:isVisible="showModal = $event" @update:isSignup="isSignup = $event" />
  </div>
</template>

#### Script

```typescript
<script setup lang="ts">
import { ref } from 'vue';
import AuthModal from '../components/AuthModal.vue';

const showModal = ref(false);
const isSignup = ref(false);

const openModal = (signup: boolean) => {
  isSignup.value = signup;
  showModal.value = true;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0; /* Ensure no margin */
  padding: 0; /* Ensure no padding */
  overflow: hidden;
}

body {
  font-family: 'Roboto', sans-serif; /* Updated to Roboto font */
}

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #000428 0%, #004e92 100%);
  color: white;
}

.hero {
  text-align: center;
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 0.5rem;
  font-family: 'Roboto', sans-serif; /* Updated to Roboto font */
  font-weight: 500; /* Make the h1 slightly bolder */
}

.hero h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-family: 'Roboto', sans-serif; /* Updated to Roboto font */
}

.buttons {
  display: flex;
  justify-content: center; /* Center align buttons horizontally */
  gap: 2rem; /* Add space between buttons */
}

.buttons .button {
  padding: 1rem 2rem;
  border: 2px solid white;
  color: white;
  background-color: transparent;
  font-size: 1rem;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  font-family: 'Roboto', sans-serif; /* Updated to Roboto font */
}

.buttons .button:hover {
  background-color: white;
  color: #000428;
  cursor: pointer;
}
</style>

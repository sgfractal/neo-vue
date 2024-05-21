<template>
  <div class="home">
    <div class="hero">
      <h1>Neo Combat Lab</h1>
      <h2>Elevate your Training</h2>
      <div class="buttons">
        <button @click="showModal = true; isSignup = false" class="button">Login</button>
        <button @click="showModal = true; isSignup = true" class="button">Sign Up</button>
        <button @click="showModal = true; isSignup = false" class="button">Demo</button>
      </div>
    </div>
    <AuthModal :isVisible="showModal" :isSignup="isSignup" @update:isVisible="showModal = $event" @update:isSignup="isSignup = $event" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AuthModal from '../components/AuthModal.vue';

const showModal = ref(true);
const isSignup = ref(false);
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #000428 0%, #004e92 100%);
  color: white;
  font-family: 'Arial', sans-serif;
}

.hero {
  text-align: center;
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', sans-serif;
}

.hero h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.buttons .button {
  display: inline-block;
  padding: 1rem 2rem;
  margin: 0 1rem;
  border: 2px solid white;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
  background-color: transparent;
}

.buttons .button:hover {
  background-color: white;
  color: #000428;
  cursor: pointer;
}
</style>

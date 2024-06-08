<template>
  <div class="portal">
    <Sidebar />
    <div class="subscription-content">
      <div class="subscription-header">
        <h1>Enroll in Neo Combat Lab</h1>
        <p>Join us to access your personalized training footage.</p>
      </div>
      <div class="subscription-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" placeholder="Enter your email" />
        </div>
        <div class="form-group">
          <label for="card-number">Card Number</label>
          <input type="text" id="card-number" placeholder="1234 1234 1234 1234" />
        </div>
        <div class="form-group">
          <label for="expiry-date">Expiry Date</label>
          <input type="text" id="expiry-date" placeholder="MM/YY" />
        </div>
        <div class="form-group">
          <label for="cvc">CVC</label>
          <input type="text" id="cvc" placeholder="CVC" />
        </div>
        <button @click="handleEnroll">Enroll</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import StripeCheckout from '../components/StripeCheckout.vue';

const email = ref<string>('');

const handleEnroll = () => {
  // Implement enrollment logic here
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

.portal {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #000428 0%, #004e92 100%);
  font-family: 'Roboto', sans-serif;
}

.subscription-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  max-width: 800px;
  margin: 2rem auto;
  color: #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.subscription-header {
  text-align: center;
  margin-bottom: 2rem;
}

.subscription-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.subscription-header p {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.subscription-form {
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.form-group input {
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  color: #000;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  background-color: #004e92;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
  font-family: 'Roboto', sans-serif;
  display: block;
  width: 100%;
}

button:hover {
  background-color: #003366;
  color: #ffcc00;
}
</style>

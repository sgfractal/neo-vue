<template>
    <div>
      <input v-model="email" type="email" placeholder="Enter your email" />
      <button @click="subscribe">Enroll</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { loadStripe } from '@stripe/stripe-js';
  import { ref } from 'vue';
  import axios from 'axios';
  
  const stripePromise = loadStripe('your_stripe_public_key');
  const email = ref<string>('');
  
  const subscribe = async () => {
    const stripe = await stripePromise;
  
    // Create a new customer
    const { data: customer } = await axios.post('/api/stripe/create-customer', { email: email.value });
  
    // Create a subscription
    const { data: subscription } = await axios.post('/api/stripe/create-subscription', {
      customerId: customer.customerId,
      priceId: 'your_price_id',
    });
  
    const { client_secret, status } = subscription.latest_invoice.payment_intent;
  
    if (status === 'requires_action') {
      const { error } = await stripe!.confirmCardPayment(client_secret);
  
      if (error) {
        console.error(error);
      } else {
        console.log('Subscription successful!');
      }
    } else {
      console.log('Subscription successful!');
    }
  };
  </script>
  
  <style scoped>
  button {
    background-color: #6772e5;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #5469d4;
  }
  </style>
  
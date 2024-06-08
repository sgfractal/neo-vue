<template>
  <div :class="['sidebar', { collapsed: !isExpanded }]">
    <button class="toggle-button" @click="toggleSidebar">
      &#9776; <!-- Unicode character for hamburger icon -->
    </button>
    <h2 v-if="isExpanded">Dashboard</h2>
    <ul>
      <li v-for="item in filteredMenuItems" :key="item.text">
        <router-link :to="item.route">
          <span class="icon">{{ item.icon }}</span>
          <span v-if="isExpanded">{{ item.text }}</span>
        </router-link>
        <hr v-if="isExpanded" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface MenuItem {
  text: string;
  route: string;
  icon: string; // Added icon as required field
  roles?: string[]; // Added roles as optional field
}

// Mock user role
const userRole = ref<'student' | 'coach' | 'owner'>('student');

// Mock icons (You can replace these with actual icons or SVGs)
const menuItems = ref<MenuItem[]>([
  { text: 'Home', route: '/', icon: '🏠' },
  { text: 'Profile', route: '/profile', icon: '👤' },
  { text: 'Settings', route: '/settings', icon: '⚙️' },
  { text: 'Subscription', route: '/subscription', icon: '💳' },
  { text: 'Logout', route: '/logout', icon: '🚪' },
  { text: 'Training Footage', route: '/training-footage', icon: '🎥', roles: ['student'] },
  { text: 'Manage Students', route: '/manage-students', icon: '🧑‍🏫', roles: ['coach'] },
  { text: 'Manage Gym', route: '/manage-gym', icon: '🏋️', roles: ['owner'] }
]);

const filteredMenuItems = computed(() =>
  menuItems.value.filter(
    item => !item.roles || item.roles.includes(userRole.value)
  )
);

const isExpanded = ref(true);

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

.sidebar {
  width: 200px;
  background-color: #1e2a38;
  padding: 1rem;
  color: white;
  font-family: 'Roboto', sans-serif;
  transition: width 0.3s;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar .toggle-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.sidebar h2 {
  margin-bottom: 1rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 1rem;
}

.sidebar a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-weight: 500; /* Make text slightly bolder */
}

.sidebar a:hover {
  text-decoration: underline;
}

.sidebar .icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  text-align: center;
  margin-right: 1rem;
  font-size: 1.5rem;
  color: #000; /* Black color for icons */
  filter: grayscale(100%); /* Make icons black and white */
}

hr {
  border: 0;
  height: 1px;
  background: #444; /* Use a slightly lighter gray for dividers */
  margin: 1rem 0; /* Space out the divider lines */
}
</style>

<template>
  <div class="day-view">
    <button class="back-button" @click="goBack">Back</button>
    <h2>Select a Time Block</h2>
    <div class="day-view-grid">
      <div class="column">
        <div class="column-header">AM</div>
        <div v-for="hour in amHours" :key="hour.time" class="hour-block" :class="{ 'selected-hour': hour.time === selectedHour }" @click="selectHour(hour.time)">
          <div :class="{ 'has-footage': hour.hasFootage }" class="hour-label">
            {{ hour.time }}
          </div>
        </div>
      </div>
      <div class="column">
        <div class="column-header">PM</div>
        <div v-for="hour in pmHours" :key="hour.time" class="hour-block" :class="{ 'selected-hour': hour.time === selectedHour }" @click="selectHour(hour.time)">
          <div :class="{ 'has-footage': hour.hasFootage }" class="hour-label">
            {{ hour.time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue';

const emit = defineEmits(['hourSelected', 'back']);
const hours = ref<Array<{ time: string, hasFootage: boolean }>>([]);
const selectedHour = ref<string | null>(null);

const initializeHours = (date: Date) => {
  // Hardcoded footage available at 9 AM
  const footageHours = ['09:00 AM'];
  hours.value = Array.from({ length: 16 }, (_, i) => {
    const time = new Date(0, 0, 0, i + 6).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    return { time, hasFootage: footageHours.includes(time) };
  });
};

const selectHour = (time: string) => {
  selectedHour.value = time;
  emit('hourSelected', time);
};

const goBack = () => {
  emit('back');
};

const amHours = computed(() => hours.value.filter(hour => hour.time.includes('AM')));
const pmHours = computed(() => hours.value.filter(hour => hour.time.includes('PM')));

initializeHours(new Date());
</script>

<style scoped>
.day-view {
  width: 100%;
  max-width: 400px;
  margin: auto;
  text-align: center;
  color: white;
  font-size: 12px;
}

.back-button {
  background: none;
  border: 2px solid white;
  color: white;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
  margin-bottom: 1rem;
}

.back-button:hover {
  background-color: white;
  color: #000428;
}

.day-view h2 {
  margin-bottom: 1rem;
}

.day-view-grid {
  display: flex;
  justify-content: center; /* Center the columns */
}

.column {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin: 0 0.5rem; /* Adjust margin to bring columns closer */
}

.column-header {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.hour-block {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem;
  border: 1px solid #004e92;
  cursor: pointer;
  transition: background-color 0.3s;
}

.hour-block:hover {
  background-color: #003366;
}

.hour-block.selected-hour {
  background-color: rgba(144, 238, 144, 0.3); /* Highlight selected hour */
}

.hour-label {
  width: 100%;
  text-align: center;
  padding: 0.3rem;
}

.has-footage {
  background-color: rgba(144, 238, 144, 0.3); /* Very light green */
}

@media (max-width: 400px) {
  .day-view {
    font-size: 10px;
  }

  .day-view-grid {
    flex-direction: column;
  }

  .column {
    align-items: center;
  }
}
</style>

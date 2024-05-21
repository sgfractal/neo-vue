<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="prevMonth">&lt;</button>
      <h2>{{ monthYear }}</h2>
      <button @click="nextMonth">&gt;</button>
    </div>
    <div class="calendar-grid">
      <div
        v-for="day in days"
        :key="day.date.toISOString()"
        class="calendar-day"
        :class="{ 'current-day': isToday(day.date), 'selected-day': isSelectedDay(day.date), 'has-footage': day.hasFootage }"
        @click="selectDay(day.date)"
      >
        {{ day.date.getDate() }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, watch } from 'vue';
import axios from 'axios';

const emit = defineEmits(['update:date']);

const today = new Date();
const selectedDate = ref(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

const footageDates = ref<Date[]>([]);

const days = computed(() => {
  const endOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);
  const daysInMonth = endOfMonth.getDate();
  const calendarDays = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    const hasFootage = footageDates.value.some(footageDate => footageDate.toISOString().split('T')[0] === date.toISOString().split('T')[0]);
    calendarDays.push({ date, hasFootage });
  }

  return calendarDays;
});

const monthYear = computed(() => {
  return new Date(currentYear.value, currentMonth.value).toLocaleString('default', { month: 'long', year: 'numeric' });
});

const selectDay = (date: Date) => {
  selectedDate.value = date;
  emit('update:date', date);
};

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  fetchFootageForMonth();
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  fetchFootageForMonth();
};

const isToday = (date: Date) => {
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
};

const isSelectedDay = (date: Date) => {
  return date.getDate() === selectedDate.value.getDate() &&
         date.getMonth() === selectedDate.value.getMonth() &&
         date.getFullYear() === selectedDate.value.getFullYear();
};

// Fetch footage for the current month
const fetchFootageForMonth = async () => {
  try {
    const startDate = new Date(currentYear.value, currentMonth.value, 1).toISOString();
    const endDate = new Date(currentYear.value, currentMonth.value + 1, 0).toISOString();
    const response = await axios.get(`https://neostream.nyc3.digitaloceanspaces.com/footage?start_date=${startDate}&end_date=${endDate}`, {
      headers: {
        'Authorization': `AWS DO00R2MDX9Z6CGKLW6Q7:reKDR/BsrYO/1au6u0gYoXxs00Vrv4+hznLCrM/LAJ8`
      }
    });
    // Assuming the response contains an array of dates with footage
    footageDates.value = response.data.map((dateString: string) => new Date(dateString));
  } catch (error) {
    console.error('Error fetching footage:', error);
  }
};

// Watch for changes in the current month or year and fetch footage accordingly
watch([currentMonth, currentYear], fetchFootageForMonth);

// Initial fetch of footage when the component is mounted
fetchFootageForMonth();
</script>

<style scoped>
.calendar {
  width: 100%;
  max-width: 600px;
  margin: auto;
  text-align: center;
  color: white;
  font-size: 14px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.calendar-header button {
  background: none;
  border: 2px solid white;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s, color 0.3s;
}

.calendar-header button:hover {
  background-color: white;
  color: #000428;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  background-color: #004e92;
  padding: 1rem;
  border-radius: 5px;
}

.calendar-day {
  padding: 1rem;
  background-color: #004e92;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.calendar-day:hover {
  background-color: #003366;
}

.current-day {
  background-color: #ffcc00;
  color: #000428;
}

.selected-day {
  border: 2px solid #00ff00;
}

.has-footage {
  border: 2px solid green;
}

@media (max-width: 600px) {
  .calendar {
    font-size: 12px;
  }

  .calendar-header button {
    font-size: 1rem;
  }
}
</style>

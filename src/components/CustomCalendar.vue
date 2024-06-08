<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="prevMonth">&lt;</button>
      <h2>{{ monthYear }}</h2>
      <button @click="nextMonth">&gt;</button>
    </div>
    <div class="calendar-grid">
      <div
        v-for="label in dayLabels"
        :key="label"
        class="calendar-day-label"
      >
        {{ label }}
      </div>
      <div
        v-for="empty in emptyDays"
        :key="'empty' + empty"
        class="calendar-day empty"
      ></div>
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

const emit = defineEmits(['update:date']);

const today = new Date();
const selectedDate = ref(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

const footageDates = ref<Date[]>([
  new Date('2024-06-07') // Hardcoded for demo purposes
]);

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

const emptyDays = computed(() => {
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1).getDay();
  return Array.from({ length: firstDayOfMonth }, (_, i) => i);
});

const monthYear = computed(() => {
  return new Date(currentYear.value, currentMonth.value).toLocaleString('default', { month: 'long', year: 'numeric' });
});

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

// Placeholder for fetching footage for the current month
const fetchFootageForMonth = async () => {
  // Placeholder logic for fetching footage
  // For demo purposes, this function is empty
};

// Watch for changes in the current month or year and fetch footage accordingly
watch([currentMonth, currentYear], fetchFootageForMonth);

// Initial fetch of footage when the component is mounted
fetchFootageForMonth();
</script>

<style scoped>
.calendar {
  width: 100%;
  max-width: 400px;
  margin: auto;
  text-align: center;
  color: white;
  font-size: 12px;
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
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
}

.calendar-header button:hover {
  background-color: white;
  color: #000428;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.3rem;
  background-color: #004e92;
  padding: 0.5rem;
  border-radius: 5px;
}

.calendar-day-label {
  padding: 0.3rem;
  background-color: #004e92;
  border-radius: 5px;
  font-weight: bold;
}

.calendar-day {
  padding: 0.6rem;
  background-color: #004e92;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px; /* Ensure consistent height */
}

.calendar-day.empty {
  background-color: transparent;
  cursor: default;
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
  background-color: rgba(144, 238, 144, 0.3); /* Very light green */
}

@media (max-width: 400px) {
  .calendar {
    font-size: 10px;
  }

  .calendar-header button {
    font-size: 0.8rem;
  }
}
</style>

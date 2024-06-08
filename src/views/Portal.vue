<template>
  <div class="portal">
    <div class="content">
      <div class="header">
        <h1>Welcome to the Neo Combat Lab Demo</h1>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
      <div class="role-switcher">
        <button @click="setUserRole('student')" :class="{ active: userRole === 'student' }">Student</button>
        <button @click="setUserRole('coach')" :class="{ active: userRole === 'coach' }">Coach</button>
        <button @click="setUserRole('owner')" :class="{ active: userRole === 'owner' }">Owner</button>
      </div>
      <div v-if="userRole === 'student'">
        <h2>Your Training Footage</h2>
        <div v-if="!showDayView">
          <CustomCalendar :selectedDate="selectedDate" @update:date="selectDay" />
          <div v-if="dayWithFootage && !hourSelected" class="select-hour-message">
            Select an hourly block to see your training footage
          </div>
          <div v-else-if="!dayWithFootage">
            No Footage for this Day
          </div>
        </div>
        <DayView v-else @hourSelected="handleHourSelected" @back="goBackToCalendar" />
        <div class="videos" v-if="showDayView && hourSelected === '09:00 AM' && studentVideos.length">
          <div class="video-section" v-for="(video, index) in studentVideos" :key="index">
            <h3>Student {{ video.tag }}</h3>
            <video controls>
              <source :src="video.url" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div v-else-if="showDayView && hourSelected && hourSelected !== '09:00 AM'">
          No footage for this time block
        </div>
      </div>
      <div v-else-if="userRole === 'coach'">
        <h2>Coach Dashboard</h2>
        <div v-if="!showDayView">
          <CustomCalendar :selectedDate="selectedDate" @update:date="selectDay" />
          <div v-if="dayWithFootage && !hourSelected" class="select-hour-message">
            Select an hourly block to see your training footage
          </div>
          <div v-else-if="!dayWithFootage">
            No Footage for this Day
          </div>
        </div>
        <DayView v-else @hourSelected="handleHourSelected" @back="goBackToCalendar" />
        <div class="videos" v-if="showDayView && hourSelected === '09:00 AM' && coachVideoUrl">
          <div class="video-section">
            <h3>Full Mat</h3>
            <video controls>
              <source :src="coachVideoUrl" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div v-else-if="showDayView && hourSelected && hourSelected !== '09:00 AM'">
          No footage for this time block
        </div>
      </div>
      <div v-else-if="userRole === 'owner'">
        <h2>Owner Dashboard</h2>
        <p>Under Construction</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import CustomCalendar from '../components/CustomCalendar.vue';
import DayView from '../components/DayView.vue';

const router = useRouter();
const userRole = ref<'student' | 'coach' | 'owner'>('student'); // Mock role switching
const studentVideos = ref<{ tag: string, url: string }[]>([]);
const coachVideoUrl = ref<string | null>(null);
const selectedDate = ref<Date>(new Date());
const hourSelected = ref<string | null>(null); // Track the selected hour block
const showDayView = ref<boolean>(false); // Track if the day view is shown

const dayWithFootage = ref<boolean>(false);

const selectDay = (date: Date) => {
  selectedDate.value = date;
  const selectedDateString = date.toISOString().split('T')[0];
  dayWithFootage.value = selectedDateString === '2024-06-07';
  hourSelected.value = null; // Reset hour selected state
  if (selectedDateString === '2024-06-07') {
    studentVideos.value = [
      { tag: 'A', url: 'https://neostream.nyc3.cdn.digitaloceanspaces.com/RenzoNashville/students/initial_batch/demo/A.mp4' },
      { tag: 'B', url: 'https://neostream.nyc3.cdn.digitaloceanspaces.com/RenzoNashville/students/initial_batch/demo/B.mp4' },
      { tag: 'C', url: 'https://neostream.nyc3.cdn.digitaloceanspaces.com/RenzoNashville/students/initial_batch/demo/C.mp4' },
      { tag: 'D', url: 'https://neostream.nyc3.cdn.digitaloceanspaces.com/RenzoNashville/students/initial_batch/demo/D.mp4' }
    ];
    coachVideoUrl.value = 'https://neostream.nyc3.cdn.digitaloceanspaces.com/RenzoNashville/students/initial_batch/demo/FullMat_Demo.mp4';
    showDayView.value = true; // Show day view when June 7th is selected
  } else {
    studentVideos.value = [];
    coachVideoUrl.value = null;
    showDayView.value = false; // Hide day view for other dates
  }
};

const handleHourSelected = (time: string) => {
  hourSelected.value = time;
};

const goBackToCalendar = () => {
  showDayView.value = false;
  selectDay(selectedDate.value); // Re-select the date to refresh the state
};

watch(userRole, () => {
  // Reset to today's date when switching roles
  selectDay(new Date());
});

const logout = () => {
  router.push('/');
};

const setUserRole = (role: 'student' | 'coach' | 'owner') => {
  userRole.value = role;
};
</script>

<style scoped>
.portal {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  padding: 2rem;
  background: linear-gradient(135deg, #000428 0%, #004e92 100%);
  color: white;
  font-family: 'Arial', sans-serif;
  overflow-y: auto;
  margin: 0; /* Ensure there is no margin around the content */
  box-sizing: border-box; /* Ensure padding is included in the element's total width and height */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-family: 'Orbitron', sans-serif;
}

.logout-button {
  background: none;
  border: 2px solid white;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
}

.logout-button:hover {
  background-color: white;
  color: #000428;
}

h2 {
  font-family: 'Orbitron', sans-serif;
  margin-bottom: 2rem;
}

.videos {
  width: 100%;
  max-width: 1200px;
}

.video-section {
  margin-bottom: 2rem;
}

.video-section h3 {
  margin-bottom: 1rem;
}

video {
  width: 100%;
  max-width: 600px;
  border: 2px solid white;
  border-radius: 10px;
}

.role-switcher {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap; /* Ensure buttons wrap on smaller screens */
}

.role-switcher button {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  background-color: #6772e5;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.role-switcher button.active {
  background-color: #ffcc00;
  color: #000428;
}

.select-hour-message {
  font-size: 16px;
  color: #ffcc00;
  text-align: center;
  margin: 2rem 0;
}

@media (max-width: 600px) {
  .content {
    padding: 1rem;
  }

  .logout-button {
    padding: 0.5rem;
    font-size: 0.8rem;
  }

  video {
    max-width: 100%;
  }

  .header h1 {
    font-size: 1.2rem; /* Adjust font size for smaller screens */
  }

  .role-switcher button {
    padding: 0.3rem 0.5rem; /* Adjust button padding for smaller screens */
    font-size: 0.8rem;
  }
}
</style>

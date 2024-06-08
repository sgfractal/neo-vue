<template>
  <div class="portal">
    <Sidebar />
    <div class="content">
      <div class="header">
        <h1>Welcome, Evan</h1>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
      <div class="role-switcher">
        <button @click="setUserRole('student')" :class="{ active: userRole === 'student' }">Student</button>
        <button @click="setUserRole('coach')" :class="{ active: userRole === 'coach' }">Coach</button>
        <button @click="setUserRole('owner')" :class="{ active: userRole === 'owner' }">Owner</button>
      </div>
      <div v-if="userRole === 'student'">
        <h2>Your Training Footage</h2>
        <CustomCalendar @update:date="selectDay" />
        <div class="videos" v-if="videoUrls.length">
          <div class="video-section" v-for="(url, index) in videoUrls" :key="index">
            <h3>{{ angles[index] }}</h3>
            <video controls>
              <source :src="url" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div v-else>
          No Footage for this Day
        </div>
      </div>
      <div v-else-if="userRole === 'coach'">
        <h2>Coach Dashboard</h2>
        <p>Manage your students and review their progress.</p>
      </div>
      <div v-else-if="userRole === 'owner'">
        <h2>Owner Dashboard</h2>
        <p>Manage your gym and overall operations.</p>
        <button @click="addStudent">Add Student</button>
        <button @click="addCoach">Add Coach</button>
        <div class="management-section">
          <h3>Students</h3>
          <ul>
            <li v-for="student in students" :key="student">{{ student }}</li>
          </ul>
          <h3>Coaches</h3>
          <ul>
            <li v-for="coach in coaches" :key="coach">{{ coach }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';
import CustomCalendar from '../components/CustomCalendar.vue';

const router = useRouter();
const userRole = ref<'student' | 'coach' | 'owner'>('student'); // Mock role switching
const angles = ['Angle A', 'Angle B', 'Angle C', 'Angle D'];
const videoUrls = ref<string[]>([]);
const datesWithFootage = ref<Date[]>([]);
const selectedDate = ref<Date | null>(null);

const students = ref<string[]>(['Evan McClure', 'Student B']);
const coaches = ref<string[]>(['Mac McCabe', 'Coach Y']);

const fetchVideos = async () => {
  const response = await fetch('/api/videos');
  const videos: string[] = await response.json();
  const dates = videos.map((video: string) => {
    const date = video.split('_')[1];
    return new Date(date.replace(/-/g, '/'));
  });
  datesWithFootage.value = [...new Set(dates)];
};

const selectDay = async (date: Date) => {
  selectedDate.value = date;
  videoUrls.value = []; // Clear existing video URLs before fetching new ones
  try {
    const response = await fetch(`/api/videos?date=${date.toISOString().split('T')[0]}`);
    const videos: string[] = await response.json();
    if (videos.length) {
      videoUrls.value = angles.map(angle => {
        const video = videos.find((video: string) => video.includes(angle));
        return video ? `https://neostream.nyc3.digitaloceanspaces.com/neostream/RenzoNashville/students/initial_batch/evan_mcclure/${video}` : '';
      });
    } else {
      videoUrls.value = []; // No videos found for this date
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    videoUrls.value = []; // Clear video URLs on error
  }
};

const logout = () => {
  router.push('/');
};

const setUserRole = (role: 'student' | 'coach' | 'owner') => {
  userRole.value = role;
};

const addStudent = () => {
  students.value.push(`Student ${students.value.length + 1}`);
};

const addCoach = () => {
  coaches.value.push(`Coach ${coaches.value.length + 1}`);
};

onMounted(fetchVideos);
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
}

.role-switcher button {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  background-color: #6772e5;
  color: white;
  border-radius: 5px;
}

.role-switcher button.active {
  background-color: #5469d4;
}

.management-section {
  margin-top: 2rem;
}

.management-section h3 {
  margin-top: 1rem;
}

.management-section ul {
  list-style-type: none;
  padding: 0;
}

.management-section li {
  background: #fff;
  color: #000;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 5px;
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
}
</style>

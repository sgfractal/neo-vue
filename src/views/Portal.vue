<template>
  <div class="portal">
    <div class="portal-header">
      <h1>Welcome, Evan</h1>
      <button @click="logout" class="logout-button">Logout</button>
    </div>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CustomCalendar from '../components/CustomCalendar.vue';

const router = useRouter();
const angles = ['Angle A', 'Angle B', 'Angle C', 'Angle D'];
const videoUrls = ref<string[]>([]);
const datesWithFootage = ref<Date[]>([]);
const selectedDate = ref<Date | null>(null);

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
  if (date.toISOString().split('T')[0] === '2024-05-20') {
    videoUrls.value = [
      'https://neostream.nyc3.cdn.digitaloceanspaces.com/RenzoNashville/students/initial_batch/evan_mcclure/evan_mcclure-05-20-2024_A.mp4'
    ];
  } else {
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
  }
};

const logout = () => {
  router.push('/');
};

onMounted(fetchVideos);
</script>


<style scoped>
.portal {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #000428 0%, #004e92 100%);
  color: white;
  font-family: 'Arial', sans-serif;
}

.portal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2rem;
}

.portal-header h1 {
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

@media (max-width: 600px) {
  .portal {
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

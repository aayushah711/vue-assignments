<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as Coach</router-link>
    </div>
    <ul v-if="hasCoaches">
      LIST OF COACHES
      <coach-item
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :id="coach.id"
        :firstName="coach.firstName"
        :lastName="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas"
      ></coach-item>
    </ul>
    <h3 v-else>No coaches found.</h3>
  </section>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CoachItem from '../../components/coaches/CoachItem.vue';

export default {
  components: { CoachItem },
  setup() {
    const store = useStore();
    const filteredCoaches = computed(() => {
      return store.getters['coaches/coaches'];
    });
    const hasCoaches = computed(() => {
      return store.getters['coaches/hasCoaches'];
    });

    return { filteredCoaches, hasCoaches };
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>

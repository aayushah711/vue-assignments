<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button v-if="!isCoach" to="/register" link
          >Register as Coach</base-button
        >
      </div>
      <ul v-if="hasCoaches">
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
    </base-card>
  </section>
</template>

<script>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: { CoachItem, CoachFilter },
  setup() {
    const store = useStore();
    const activeFilters = reactive({
      frontend: true,
      backend: true,
      career: true
    });

    const setFilters = updatedFilters => {
      activeFilters.frontend = updatedFilters.frontend;
      activeFilters.backend = updatedFilters.backend;
      activeFilters.career = updatedFilters.career;
    };

    const filteredCoaches = computed(() => {
      const coaches = store.getters['coaches/coaches'];
      return coaches.filter(coach => {
        if (activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    });

    const hasCoaches = computed(() => {
      return store.getters['coaches/hasCoaches'];
    });

    const isCoach = computed(() => {
      return store.getters['coaches/isCoach'];
    });

    return { filteredCoaches, hasCoaches, setFilters, isCoach };
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

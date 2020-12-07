<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for="area in areas"
        :key="area.value"
        :type="area"
        :title="area"
      >
      </base-badge>
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  props: ['id'],
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const selectedCoach = store.getters['coaches/coaches'].find(
      coach => coach.id === props.id
    );

    const { areas, hourlyRate, description } = selectedCoach;
    console.log(areas);

    const fullName = computed(
      () => selectedCoach.firstName + ' ' + selectedCoach.lastName
    );
    const contactLink = computed(() => `/${route.path}/${props.id}/contact`);
    return {
      selectedCoach,
      fullName,
      contactLink,
      areas,
      rate: hourlyRate,
      description
    };
  }
};
</script>

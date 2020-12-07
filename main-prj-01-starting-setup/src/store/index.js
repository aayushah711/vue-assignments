import { createStore } from 'vuex';
import coachesModule from './modules/coaches/index.js';
const store = createStore({
  modules: {
    coaches: coachesModule
  },
  state() {}
  //   mutations,
  //   getters,
  //   actions
});

export default store;

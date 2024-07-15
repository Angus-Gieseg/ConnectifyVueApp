<template>
    <div>
      <h2>My Calendly Events</h2>
      <ul v-if="events.length">
        <li v-for="event in events" :key="event.uri">
          <strong>{{ event.name }}</strong> on {{ new Date(event.start_time).toLocaleString() }}
        </li>
      </ul>
      <p v-else>No events available or unable to fetch events.</p>
    </div>
  </template>
  
  <script>
  import calendlyService from '../composables/calendlyService';
  
  export default {
    name: 'CalendlyEvents',
    props: {
      calendlyAPI: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        events: []
      };
    },
    async created() {
      try {
        this.events = await calendlyService.getCalendlyEvents(this.calendlyAPI);
      } catch (error) {
        console.error('Error loading Calendly events:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  
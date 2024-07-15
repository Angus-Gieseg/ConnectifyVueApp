import axios from 'axios';

const API_URL = 'https://api.calendly.com';

const getCalendlyEvents = async (apiKey) => {
  try {
    const response = await axios.get(`${API_URL}/scheduled_events`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data.collection;
  } catch (error) {
    console.error('Error fetching Calendly events:', error.response ? error.response.data : error.message);
    return [];
  }
};

export default {
  getCalendlyEvents
};

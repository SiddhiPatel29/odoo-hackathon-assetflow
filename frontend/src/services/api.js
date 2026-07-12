import axios from 'axios';

// Ensure this matches the port Dev 1 is using
const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// Fetches the full inventory list
export const fetchAssets = async () => {
  const response = await api.get('/assets');
  return response.data;
};

// Handles allocation with the required "Transfer Request" conflict logic
export const allocateAsset = async (assetId, userId) => {
  try {
    return await api.post('/allocations', { assetId, userId });
  } catch (error) {
    // If the server returns a 400, we pass the message to the UI
    if (error.response?.status === 400) {
      throw error.response.data; 
    }
    throw error;
  }
};

export default api;
import axios from 'axios'

const BACK_PORT = 4000;

export const fetchMessage = async () => {
  try {
    const response = await axios.get(`${BACK_PORT}/messages`);
    return response.data;
  } catch (error) { 
    console.error('Error fetching messages', error);
    throw error;
   }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BACK_PORT}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users', error);
    throw error;
  }
};
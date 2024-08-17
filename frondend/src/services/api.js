import axios from 'axios';

const api = {
  getSaltedPassword: () => axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/salted-password`),
  verifyPassword: (email, crackedPassword, saltedPassword) => {
    console.log(email)
    console.log(crackedPassword)
    return axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/verify-password`, { email, crackedPassword, saltedPassword });
  }
    
};


export default api;

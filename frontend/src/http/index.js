/*eslint-disable*/
import axios from 'axios';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/`,
});

export const getRequest = async (url) => {
  try {
    const { data } = await client.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postRequest = async (url, payload = {}) => {
  try {
    const { data } = await client.post(url, payload);
    return data;
  } catch (error) {
    console.log(error);
  }
};

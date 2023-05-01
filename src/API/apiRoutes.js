import axios from "axios";
const server = "https://api.themoviedb.org/3";
const apiKey = "0d063d7aed88ac0312c521da1b31e63f";

export const getAPI = async (routeName, config) => {
  const addConfig = config ?? "";
  return axios
    .get(`${server}${routeName}?api_key=${apiKey}${addConfig}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

import create from "zustand";
import { getAPI } from "../API/apiRoutes";

const upcomingMoviesObj = {
  upcomingMovies: [],
};

const getAllupcomingMovies = async (set) => {
  await getAPI(`/movie/upcoming`, "&language=en-US").then(({ data }) => {
    // console.log("getAllupcomingMovies", res);
    return set({
      upcomingMovies: data.results,
    });
  });
};

const upcomingMoviesObject = (set, get) => ({
  ...upcomingMoviesObj,
  storeupcomingMovies: () => getAllupcomingMovies(set),
});

export const upcomingMoviesStore = create(upcomingMoviesObject);

import create from "zustand";
import { getAPI } from "../API/apiRoutes";

const trendingMoviesObj = {
  trendingMovies: [],
};

const getAllTrendingMovies = async (set) => {
  await getAPI("/trending/all/week", "&language=en-US&page=1").then(
    ({ data }) => {
      return set({
        trendingMovies: data.results,
      });
      // console.log("getAllTrendingMovies", res);
    }
  );
};

const trendMoviesObject = (set, get) => ({
  ...trendingMoviesObj,
  storeTrendingMovies: () => getAllTrendingMovies(set),
});

export const trendingMoviesStore = create(trendMoviesObject);

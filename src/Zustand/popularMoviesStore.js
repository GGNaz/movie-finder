import create from "zustand";
import { getAPI } from "../API/apiRoutes";

const popularMoviesObj = {
  popularMovies: [],
  movies: [],
};

const getAllPopularMovies = async (set) => {
  let storeMovies = [];
  await getAPI("/movie/popular", "&append_to_response=videos").then(
    ({ data }) => {
      console.log("data", data);

      const copyMovies = data.results.splice(0, 7);
      console.log("copyMovies", copyMovies);
      copyMovies?.map(async (response) => {
        await getAPI(`/movie/${response?.id}/credits`, "&language=en-US").then(
          (castres) => {
            const params = {
              ...response,
              cast: { ...castres.data.cast },
            };
            storeMovies.push(params);
          }
        );
      });
      console.log("storeMovies", storeMovies);
      return set({
        popularMovies: data.results,
        movies: storeMovies,
      });
      // console.log("getAllPopularMovies", res);
    }
  );
  // await getAPI(`/movie/640146//credits`, "&language=en-US").then((res) => {
  //   console.log("external_ids", res);
  // });
};

const popMoviesObject = (set, get) => ({
  ...popularMoviesObj,
  storePopularMovies: () => getAllPopularMovies(set),
});

export const popularMoviesStore = create(popMoviesObject);

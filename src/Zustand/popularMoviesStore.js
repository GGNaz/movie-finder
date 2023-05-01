import create from "zustand";
import { getAPI } from "../API/apiRoutes";

const popularMoviesObj = {
  popularMovies: [],
  movies: [],
};

const getAllPopularMovies = async (set) => {
  let store3Movies = [];
  await getAPI("/movie/popular", "&append_to_response=videos").then(
    ({ data }) => {
      console.log("data", data);

      const copy3Movies = data.results.splice(0, 3);
      console.log("copy3Movies", copy3Movies);
      copy3Movies?.map(async (response) => {
        await getAPI(`/movie/${response?.id}/credits`, "&language=en-US").then(
          (castres) => {
            const params = {
              ...response,
              cast: { ...castres.data.cast },
            };
            store3Movies.push(params);
          }
        );
      });
      console.log("store3Movies", store3Movies);
      return set({
        popularMovies: data.results,
        movies: store3Movies,
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

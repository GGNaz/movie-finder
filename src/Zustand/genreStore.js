import create from "zustand";
import { getAPI } from "../API/apiRoutes";

const genreObj = {
  genre: [],
};

const getAllgenre = async (set) => {
  await getAPI(`/genre/movie/list`, "&language=en-US").then(({ data }) => {
    console.log("getAllgenre", data);
    return set({
      genre: data.genres,
    });
  });
};

const genreObject = (set, get) => ({
  ...genreObj,
  storeGenre: () => getAllgenre(set),
});

export const genreStore = create(genreObject);

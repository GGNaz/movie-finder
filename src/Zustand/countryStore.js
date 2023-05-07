import create from "zustand";
import { getAPI } from "../API/apiRoutes";
import axios from "axios";

const countryObj = {
  country: [],
};

const getAllcountry = async (set) => {
  // await axios
  //   .get(
  //     "https://pkgstore.datahub.io/core/language-codes/language-codes_json/data/97607046542b532c395cf83df5185246/language-codes_json.json"
  //   )
  //   .then((res) => {
  //     console.log("getAllcountry", res);
  //     // return set({
  //     //   country: data.countrys,
  //     // });
  //   });
};

const countryObject = (set, get) => ({
  ...countryObj,
  storecountry: () => getAllcountry(set),
});

export const countryStore = create(countryObject);

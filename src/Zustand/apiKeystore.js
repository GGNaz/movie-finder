import create from "zustand";

const apiKeyStoreObj = {
  apiKey: "0d063d7aed88ac0312c521da1b31e63f",
};

const apikeyObj = (set, get) => ({
  ...apiKeyStoreObj,
});

export const apiKeyStore = create(apikeyObj);

import axios from "axios";

const api = axios.create({
  baseURL: "https://ecoleta-4nzhshqzha-uc.a.run.app/",
});

export { api };

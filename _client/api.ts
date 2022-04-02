import axios from "axios";
import config from "@client/config";

export default axios.create({
  baseURL: config.BASE_URL,
})

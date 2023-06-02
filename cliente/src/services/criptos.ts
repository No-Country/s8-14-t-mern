import axios from "./config";

export function getCriptoInfo() {
  return axios.get(`/cripto/info`);
}

export default { getCriptoInfo };

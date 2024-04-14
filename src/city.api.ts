import axios from "axios";
import { CityModel } from "./city.model";

export const getCityList = () => {
  return axios.get<CityModel[]>("https://62814119ed9edf7bd8724aef.mockapi.io/city");
};

export const deleteCityById = (id: string) => {
  return axios.delete("https://62814119ed9edf7bd8724aef.mockapi.io/city/" + id);
};

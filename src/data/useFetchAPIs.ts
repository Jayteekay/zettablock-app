import { useQuery } from "react-query";
import { API } from "../types/data/API";

const fetchAPIs = async (): Promise<API[]> => {
  const response = await fetch(process.env.REACT_APP_BASE_URL + "/apis");
  if (!response.ok) {
    throw new Error("An error occured while fetching APIs!");
  }
  return response.json();
};

const useFetchAPIs = () => {
  return useQuery(["APIs"], fetchAPIs);
};

export default useFetchAPIs;

import axios from "axios";

//TODO: Define the type of the data parameter
export const getMentors = async (): Promise<unknown> => {
  return await axios.get("http://localhost:8000/");
};

export const mentisTable = async (): Promise<unknown> => {
  return await axios.get("http://localhost:8000/");
};

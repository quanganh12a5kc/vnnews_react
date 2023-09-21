import axios from "axios";
const apiUrl = "http://127.0.0.1:8000/api/";

export const getSourceNames = async () => {
  let response = await axios.get(apiUrl + "getSourceNames");
  return response.data;
};

export const getData = async (page) => {
  let response = await axios.post(apiUrl + "loadData", {
    page: page,
    read_news_ids: localStorage.getItem("read_news_ids") || "[]",
  });
  return response.data;
};

export const getPost = async (id) => {
  let response = await axios.get(apiUrl + "getNewsById/" + id);
  return response.data;
};

export const search = async (input, take) => {
  let response = await axios.get(apiUrl + "search/" + input + "/" + take);
  return response.data;
};

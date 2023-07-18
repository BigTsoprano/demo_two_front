import axios from "axios";

const BASE_URL = "http://18.211.167.41/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWRhNTY0NTYwZDcyMTMwYjVmYzFhOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4Nzc0NzUwOSwiZXhwIjoxNjg4MDA2NzA5fQ.QpTW5OjBNxg0m1hfKm0jS0VW4cD-3fGtGOz3TYrl1Yw";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

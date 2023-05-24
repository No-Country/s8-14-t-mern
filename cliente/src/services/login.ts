import axios from "axios";

export async function login(values: { email: string, password: string }) {
  try {
    const response = await axios.post(
      "http://localhost:9000/api/v1/pigmeo/users/login",
      values
    );
    localStorage.setItem("user", JSON.stringify(response.data));
    return true
  } catch (err) {
    console.error("Error", err);
    return false
  }
}
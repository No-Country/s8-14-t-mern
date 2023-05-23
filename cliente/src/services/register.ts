import axios from "axios";
type Props = {
  firstName: string,
  lastname: string,
  email: string,
  password: string,
  repeatPassword: string,
}
export async function register(values: Props) {
  try {
    const response = await axios.post("http://localhost:9000/api/v1/pigmeo/users/register", values)
    console.log('response', response.data);
    localStorage.setItem("user", JSON.stringify(response.data))
    return true
  } catch (err) {
    console.error('Error', err)
    return false
  }
}
import axios from "./config";
import { IUser } from "@/types";

export function loginUser(payload: { email: string; password: string }) {
  return axios.post(`/users/login`, payload);
}
type RegisterUserPayload = {
  firstName: string;
  lastname: string;
  email: string;
  password: string;
  repeatPassword: string;
};
export function registerUser(payload: RegisterUserPayload) {
  return axios.post(`/users/register`, payload);
}
/* export function updateUser(payload: IUser) {
  return axios.put(`/users/edit`, payload);
} */

interface EditUser {
  userId: string;
  payload: Partial<IUser>;
}
export function editUser({ userId, payload }: EditUser) {
  return axios.patch(`/users/${userId}`, payload);
}
interface UpdateUserImage {
  userId: string;
  img: File;
}
export function updateUserImage({ userId, img }: UpdateUserImage) {
  const formData = new FormData();
  formData.append("avatar", img);
  return axios.put(`/users/${userId}/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function activateUserAccount(token: string) {
  return axios.get(`/users/confirm/${token}`);
}

export function requestPasswordReset(email: string) {
  return axios.post(`/users/forgot-password`, { email });
}

interface ChangePassword {
  password: string;
  token: string;
}
export function checkNewPasswordToken(token: string) {
  return axios.get(`/users/reset-password/${token}`);
}
export function changePassword({ password, token }: ChangePassword) {
  return axios.post(`/users/reset-password/${token}`, { password });
}

export function getUsers() {
  return axios.get(`/users`);
}
export function getUser(userId: string) {
  return axios.get(`/users/${userId}`);
}

export default {
  loginUser,
  registerUser,
  editUser,
  updateUserImage,
  activateUserAccount,
  requestPasswordReset,
  checkNewPasswordToken,
  changePassword,
  getUsers,
  getUser,
};

// import axios from "axios";
import API from "./api";

export default {
  async login(payload) {
    const res = await API.get(
      `/users?email=${payload.email}&password=${payload.password}`
    );

    const user = res.data[0];
    if (!user) throw new Error("Invalid credentials");

    await API.patch(`/users/${user.id}`, { isLoggedIn: true });

    localStorage.setItem("user", JSON.stringify(user));
    return user;
  },

  async logout(userId) {
    await API.patch(`/users/${userId}`, { isLoggedIn: false });
    localStorage.removeItem("user");
  }
};
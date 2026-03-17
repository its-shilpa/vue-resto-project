import axios from "axios";

const API = "//users";

export default {
  async login(payload) {
    const res = await axios.get(
      `${API}?email=${payload.email}&password=${payload.password}`
    );

    const user = res.data[0];
    if (!user) throw new Error("Invalid credentials");

    await axios.patch(`${API}/${user.id}`, { isLoggedIn: true });

    localStorage.setItem("user", JSON.stringify(user));
    return user;
  },

  async logout(userId) {
    await axios.patch(`${API}/${userId}`, { isLoggedIn: false });
    localStorage.removeItem("user");
  }
};
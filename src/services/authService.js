// import axios from "axios";
import API from "./api";

export default {
  async login(payload) {
    const res = await API.get(
      `/users?email=${payload.email}&password=${payload.password}`,
    );

    const user = res.data[0];
    if (!user) throw new Error("Invalid credentials");

    // ✅ Update backend
    await API.patch(`/users/${user.id}`, { isLoggedIn: true });

    // ✅ IMPORTANT: Update local user also
    user.isLoggedIn = true;

    // ✅ Save in localStorage (THIS WAS MISSING)
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  },

  async logout(userId) {
    try {
      await API.patch(`/users/${userId}`, { isLoggedIn: false });
    } catch (e) {
      console.warn("User not found in backend");
    }

    localStorage.removeItem("user"); // ALWAYS clear
  },
};

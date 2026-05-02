import axios from "axios";

// 🔥 Create axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // 🍪 important for cookies
});

// 🔐 Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

// 🧹 sanitize input (basic frontend protection)
const cleanInput = (text) => {
  return text?.replace(/<[^>]*>?/gm, "") || "";
};

// 🤖 SEND MESSAGE
export const sendMessageToAI = async (messages, chatId) => {
  try {
    // sanitize all messages
    const safeMessages = messages.map((msg) => ({
      ...msg,
      text: cleanInput(msg.text)
    }));

    const res = await API.post("/api/chat", {
      messages: safeMessages,
      chatId
    });

    return res.data;

  } catch (error) {
    console.error("Send Message Error:", error);

    throw error.response?.data || { error: "Failed to send message" };
  }
};


// 📜 GET CHATS
export const getChats = async () => {
  try {
    const res = await API.get("/api/chats");
    return res.data;

  } catch (error) {
    console.error("Get Chats Error:", error);

    throw error.response?.data || { error: "Failed to fetch chats" };
  }
};


// ❌ DELETE CHAT
export const deleteChatApi = async (id) => {
  try {
    const res = await API.delete(`/api/chat/${id}`);
    return res.data;

  } catch (error) {
    console.error("Delete Chat Error:", error);

    throw error.response?.data || { error: "Failed to delete chat" };
  }
};


// 🆕 SIGNUP
export const signupUser = async (userData) => {
  try {
    const cleanData = {
      name: cleanInput(userData.name),
      email: cleanInput(userData.email),
      password: cleanInput(userData.password)
    };

    const res = await API.post("/api/auth/signup", cleanData);
    return res.data;

  } catch (error) {
    console.error("Signup Error:", error);

    throw error.response?.data || { error: "Signup failed" };
  }
};


// 🔐 LOGIN
export const loginUser = async (userData) => {
  try {
    const cleanData = {
      email: cleanInput(userData.email),
      password: cleanInput(userData.password)
    };

    const res = await API.post("/api/auth/login", cleanData);
    return res.data;

  } catch (error) {
    console.error("Login Error:", error);

    throw error.response?.data || { error: "Login failed" };
  }
};
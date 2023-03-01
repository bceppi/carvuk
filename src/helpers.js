import { createClient } from "@supabase/supabase-js";

export const isLogged = () => localStorage.getItem("jwt") != null;

export const sbHost = "https://eckxfbfsahsawvvywczg.supabase.co";
export const sbPublicToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVja3hmYmZzYWhzYXd2dnl3Y3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2NzY1MTEsImV4cCI6MTk5MzI1MjUxMX0.wryMXbl0a7d8--NMx-lkwpPNainkgLtxyZNmmE_QFoo";

export const handleLogin = async (email, password) => {
  try {
    // Create a single supabase client for interacting with your database
    const supabase = createClient(sbHost, sbPublicToken);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data);
    console.log(error);
    if (!error) {
      loginUser(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleSignup = async (email, password) => {
  try {
    // Create a single supabase client for interacting with your database
    const supabase = createClient(sbHost, sbPublicToken);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log(data);
    console.log(error);
    if (!error) {
      loginUser(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  window.location = "/";
};

export const loginUser = (data) => {
  setJWT(data.session.access_token);
  setUserId(data.user.id);
  setEmail(data.user.email);
  window.location.href = "/";
};

const setJWT = (token) => {
  if (!token) return;
  localStorage.setItem("jwt", token);
};

const setUserId = (userId) => {
  if (!userId) return;
  localStorage.setItem("userId", userId);
};

export const setEmail = (email) => {
  if (!email) return;
  localStorage.setItem("email", email);
};

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useState } from "react";

export const useSignin = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate(); // Import useNavigate hook

  const [error, setError] = useState("");
  const url = "http://localhost:8080/api/v1/auth/login";

  const signin = async (email, password) => {
    try {
      const response = await axios.post(url, {
        email: email,
        password: password,
      });

      // console.log(response.data)
      if (response.data.user && response.data.token) {
        const { password, ...user } = response.data.user;
        const token = response.data.token;

        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", JSON.stringify(token));
          dispatch({ type: "LOGIN", payload: { user, token } });
          if (user.roles !== "admin") {
            navigate("/");
          } else {
            navigate("/dashboard");
          }
        }
      } else {
        console.error("Response data is undefined");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return { signin, error };
};

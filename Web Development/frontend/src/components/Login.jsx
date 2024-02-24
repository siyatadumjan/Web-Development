import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.scss";
import { useSignin } from "../context/UseSignin";

const Login = () => {
  const { signin, error } = useSignin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signin(email, password);
    } catch (err) {
      console.error("Error during signin:", err);
      // setErrMsg("An error occurred during signin");
    }
  };

  return (
    <div className="mt-28 max-w-screen-2xl container mx-auto xl:px-28 px-4">
      <section className="h-screen flex justify-center items-center form-section m-0">
        <form className="flex flex-col gap-5 bg-[#F8F7F2] registration-form">
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-[32px]">Sign in</h2>
            <p className="text-[#7f7f7f] text-sm font-semibold">
              Start your journey with us.
            </p>
          </div>
          <p className={error ? "my-0 errmsg" : "offscreen"}>{error}</p>

          <input
            placeholder="email"
            required
            type="text"
            id="username"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className="rounded"
          />

          <input
            type="password"
            required
            placeholder="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded"
          />

          <Link to="/forgotpass">
            {" "}
            <button style={{ color: "#7f7f7f" }} className="text-xs">
              Forgot password?
            </button>
          </Link>

          <button
            className="form-btn rounded bg-black text-white py-1"
            onClick={handleSubmit}
          >
            Sign in
          </button>
          <p className="my-0">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-black underline">
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;

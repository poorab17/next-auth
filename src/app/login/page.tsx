"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast/headless";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data);
      toast.success("login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onForgotPassword = async () => {
    try {
      //const response = await axios.post("/api/users/forgotpassword", user);
      router.push("/forgotpassword");
      console.log("forgot password");
    } catch (error: any) {
      console.log(" forgot password not reached", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-black text-white">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "processing" : "login"}</h1>
        <hr />

        <label htmlFor="email">email</label>
        <input
          className="p-2 bordergray-300 rounded-lg mb-4
      focus:outline-none focus:order-gray-600 text-black"
          id="email"
          type="email"
          value={user.email}
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        ></input>

        <label htmlFor="password">password</label>
        <input
          className="p-2 bordergray-300 rounded-lg mb-4
      focus:outline-none focus:order-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        ></input>

        <button
          onClick={onLogin}
          className="p-2 border border-gray-300 rounded-lg
        mb-4 focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled ? "No Login" : "Login"}
        </button>

        <button
          onClick={onForgotPassword}
          className="p-2 border border-gray-300 rounded-lg
        mb-4 focus:outline-none focus:border-gray-600"
        >
          Forgot password
        </button>
        <Link href="/signup">Visit SignUp Page</Link>
      </div>
    </div>
  );
}

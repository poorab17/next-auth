"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed", error.message);
      toast.error(error.message);
    } finally {
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="bg-black text-white">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "SignUp"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
          className="p-2 border-gray-300 rounded-lg mb-4
      focus:outline-none focus:border-gray-600 text-black"
          id="username"
          type="text"
          value={user.username}
          placeholder="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        ></input>

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
          onClick={onSignup}
          className="p-2 border border-gray-300 rounded-lg
        mb-4 focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled ? "No signUp" : " signUp"}
        </button>
        <Link href="/login">Visit Login Page</Link>
      </div>
    </div>
  );
}

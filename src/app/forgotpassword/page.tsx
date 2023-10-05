"use client";

// pages/forgot-password.js

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailSubmit = async (error: any) => {
    error.preventDefault();

    try {
      const response = await axios.post("/api/users/forgotpassword", {
        email,
      });
      setMessage(response.data.message);
      console.log("user verified", response.data);
      router.push("/resetpassword");
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleEmailSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

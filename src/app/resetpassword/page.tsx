// // pages/reset-password.js
// "use client";
// import axios from "axios";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// export default function ResetPassword() {
//   const [token, setToken] = useState("");

//   const [password, setPassword] = useState("");
//   const [verified, setVerified] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handlePasswordSubmit = async (e: any) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("/api/users/resetpassword", {
//         token,
//         newPassword: password,
//       });
//       if (response.data.success) {
//         setVerified(true);
//         setMessage(response.data.message);
//       } else {
//         setError(response.data.error);
//       }
//     } catch (error: any) {
//       setError(error.response.data.error);
//     }
//   };

//   useEffect(() => {
//     const urlToken = window.location.search.split("=")[1];
//     setToken(urlToken || "");
//   }, []);

//   useEffect(() => {
//     if (token) {
//       (error);
//     }
//   }, [token]);

//   return (
//     <div>
//       <h1>Reset Password</h1>
//       <form onSubmit={handlePasswordSubmit}>
//         <label>
//           New Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Submit</button>
//       </form>

//       <h1 className="text-4xl">Verify Email For Reset</h1>
//       <h2 className="p-2 bg-orange-500 text-black">
//         {token ? `${token}` : "no token"}
//       </h2>
//       {verified && (
//         <div>
//           <h2 className="text-2xl">Email Verified</h2>
//           <Link href="/login">Login</Link>
//         </div>
//       )}

//       {message && <p>{message}</p>}
//       {error && <p>{error}</p>}
//     </div>
//   );
// }

// pages/reset-password.js
"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyPasswordReset = async () => {
    try {
      await axios.post("/api/users/resetpassword", {
        token,
        newPassword: password,
      });
      setVerified(true);
    } catch (error) {
      setError(true);
    }
  };

  const handlePasswordSubmit = async (e: any) => {
    e.preventDefault();
    verifyPasswordReset();
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token) {
      verifyPasswordReset();
    }
  }, [token]);

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handlePasswordSubmit}>
        <label>
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <h1 className="text-4xl">Verify Password Reset</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Password Reset Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}

"use client";
import { useAuth } from "../context/authprovider";
export default function SignIn() {
  const { signIn } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:8000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      console.log("Server Response:", result);

      signIn(result.token, result.user);

      alert("Sign In Successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Sign In Failed!");
    }
  };

  return (
    <div className="text-center">
      <h1>Sign In</h1>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email" // Add name attribute for FormData to work
            placeholder="Enter your email"
            required // Make it a required field
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password" // Add name attribute for FormData to work
            placeholder="Enter your password"
            required // Make it a required field
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
}

"use client";

import { useAuth } from "./context/authprovider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  if (!user) return <p>Loading...</p>;
  return (
    <div className="text-center">
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of your application.</p>
    </div>
  );
}

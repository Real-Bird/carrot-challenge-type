import { NextPage } from "next";
import React, { useEffect } from "react";
import useSWR from "swr";
import { User } from "@prisma/client";
import useUser from "../lib/client/useUser";
import { useRouter } from "next/router";

interface LoginResponse {
  ok: boolean;
  profile: User;
}

const Home: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<LoginResponse>("/api/user");
  const { data: logout } = useSWR("/api/logout");
  const onLogout = () => logout;
  const router = useRouter();
  useEffect(() => {
    if (!logout) {
      router.replace("/login");
    }
  }, [logout, router]);
  return (
    <div>
      <h1>Welcome {data?.profile?.name}!!</h1>
      <h2>Your email is: {data?.profile?.email}</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Home;

import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useMutation from "../lib/client/useMutation";
import useUser from "../lib/client/useUser";

interface FormResponse {
  email: string;
}

const Login: NextPage = () => {
  const { user } = useUser();
  const { register, handleSubmit } = useForm<FormResponse>();
  const [login, { data, loading }] = useMutation("/api/login");
  const onValid = (form: FormResponse) => {
    if (loading) return;
    login(form);
  };
  const router = useRouter();
  useEffect(() => {
    if (data && data.ok) {
      router.replace("/");
    } else if (data && !data.ok) {
      if (confirm("I'm not find your email. Plz Create Account!")) {
        router.replace("/enter");
      }
    }
  }, [data, router]);
  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="email">Email: </label>
          <input {...register("email")} type="email" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

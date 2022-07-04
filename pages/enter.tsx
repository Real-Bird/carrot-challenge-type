import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../lib/client/useMutation";
import useUser from "../lib/client/useUser";

interface FormResponse {
  name: string;
  email: string;
}

const Enter: NextPage = () => {
  const { user } = useUser();
  const { register, handleSubmit } = useForm<FormResponse>();
  const [enter, { data, loading }] = useMutation("/api/enter");
  const onValid = (form: FormResponse) => {
    if (loading) return;
    enter(form);
  };
  const router = useRouter();
  useEffect(() => {
    if (data && data.ok) {
      if (confirm("Account created! Please log in!")) {
        router.replace("/login");
      }
    } else if (data && !data.ok) {
      confirm(`${data.error}`);
    }
  }, [data, router]);
  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input {...register("name")} type="text" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input {...register("email")} type="email" />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Enter;

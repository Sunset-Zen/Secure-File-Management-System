"use client";

import React from "react";
import { useForm } from "react-hook-form";
import "../globals.css";

// Declare variable types
type TFormValues = {
  username: string;
  password: string;
};

function Form() {
  // Attributes | Hook(s)
  const { register, handleSubmit } = useForm<TFormValues>();

  //   Functions
  function onHandleFormSubmit(data: any) {
    console.log({ data });
  }

  // TSX
  return (
    <form
      id="input_form"
      className="mt-10"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      <label htmlFor="username">Username : </label>
      <input
        id="username"
        type="text"
        placeholder="username"
        className="border rounded-md"
        {...register("username")}
      />
      <label htmlFor="username">Password : </label>
      <input
        id="password"
        type="password"
        placeholder="password"
        className="border rounded-md"
        {...register("password")}
      />
      <button className="border rounded-md text-white bg-black px-6">
        Submit
      </button>
    </form>
  );
}

export default Form;

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "./FormContext";

import "../globals.css";

// Declare variable types
type TFormValues = {
  username: string;
  password: string;
};

function Form() {
  // Attributes | Hook(s)
  const { toNextPage } = useFormState();
  const { register, handleSubmit } = useForm<TFormValues>();

  //   Functions
  function onHandleFormSubmit(data: TFormValues) {
    console.log({ data });
    toNextPage();
    // onHandleNext();
  }

  // TSX
  return (
    <form
      id="input_form"
      className="mt-10 rounded-md"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      {/* Username */}
      <label htmlFor="username">Username : </label>
      <input
        id="username"
        type="text"
        placeholder="Username"
        className="border rounded-md"
        {...register("username")}
      />
      {/* Password */}
      <label htmlFor="password">Password : </label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        className="border rounded-md"
        {...register("password")}
      />
      {/* Submit Button */}
      <div>
        <button className="border rounded-md text-white bg-black px-6">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Form;

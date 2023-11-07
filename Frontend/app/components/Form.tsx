"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "./FormContext";

import "../globals.css";

// Declare variable types
type TFormValues = {
  username: string;
  password: string;
};

export default function Form() {
  // Attributes | Hook(s)
  const { toNextPage, changeUsername, changePassword } = useFormState(); // Pull function(s) from FormContext
  const { register, handleSubmit } = useForm<TFormValues>();
  const [user, setUser] = useState(""); //  Username
  const [pass, setPass] = useState(""); //  Password

  // Functions
  function onHandleFormSubmit(data: TFormValues) {
    console.log({ data });
    console.log(`Username: ${user} \t Password: ${pass}`);
    changeUsername(user);
    changePassword(pass);
    toNextPage();
  }

  // TSX
  return (
    <form
      id="input_form"
      className="mt-10 rounded-md ml-10"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      {/* Username */}
      <div className="grid h-10">
        <label htmlFor="username">Username : </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="border rounded-md cred"
          {...register("username", { required: true })}
          onChange={(event) => {
            setUser(event.target.value);
          }}
        />
      </div>

      {/* Password */}
      <div className="grid h-10 mt-5">
        <label className="mt-3" htmlFor="password">
          Password :
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="border rounded-md cred"
          {...register("password", { required: true })}
          onChange={(event) => {
            setPass(event.target.value);
          }}
        />
      </div>

      {/* Submit Button */}
      <div className="mt-10">
        <button className="border rounded-md text-white bg-black px-6">
          Submit
        </button>
      </div>
    </form>
  );
}

import React, { useState } from "react";
import "../globals.css";
import { useForm } from "react-hook-form";
import { useSystemState } from "./SystemContext";
import axios from "axios";

// Declare variable types
type TFormValues = {
  username: string;
  password: string;
};

function LoginForm(props: any) {
  // Attributes
  const { toNextPage, changeUsername, changePassword } = useSystemState();
  const { register, handleSubmit } = useForm<TFormValues>();
  const [user, setUser] = useState(""); //  Username
  const [pass, setPass] = useState(""); //  Password

  // Functions
  function onHandleFormSubmit(data: TFormValues) {
    changeUsername(user);
    changePassword(pass);
    recordLogin(); // Log / Audit Login
    toNextPage(); // Continue to Next Page

    // ( Run Credentials Through LDAP )
  }
  const recordLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:5500/login/${user}`, {
        message: user,
      });
      // Handle the response from the server
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // TSX
  return (
    <form
      id="login_form"
      className="border rounded-md mt-10 ml-10"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      {/* Title */}
      <div>
        <h1 className="text-lg font-semibold text-gray-400">Login</h1>
      </div>

      {/* Username */}
      <div className="grid">
        <label className="text-md font-semibold">{props.label1}</label>
        <input
          type="text"
          placeholder="Username"
          className="border rounded-md"
          {...register("username", { required: true })}
          onChange={(event) => {
            setUser(event.target.value);
          }}
        />
      </div>

      {/* Password */}
      <div className="grid">
        <label className="text-md font-semibold">{props.label2}</label>
        <input
          type="password"
          placeholder="Password"
          className="border rounded-md"
          {...register("password", { required: true })}
          onChange={(event) => {
            setPass(event.target.value);
          }}
        />
      </div>

      {/* Submit Button */}
      <div>
        <button id="submit_button" className="rounded-md bg-black text-white">
          <h1>Submit</h1>
        </button>
      </div>
    </form>
  );
}

export default LoginForm;

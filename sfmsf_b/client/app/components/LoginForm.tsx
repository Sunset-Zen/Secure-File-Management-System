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
    console.log(`Username: ${user} \t Password: ${pass}`);
    changeUsername(user);
    changePassword(pass);
    
    axios
       .post("https://localhost:5500/login", {
        username:user,
        password:pass
       })
       .then((res) => {
        //console.log(res);
        if(res.status == 200){
          toNextPage();
        }
        else if(res.status == 403){
          console.log("Invalid login credentials");
        }
       })
       .catch((er) => console.log(er));

    // ( Run Credentials Through LDAP )
    // ( Log / Audit Action )
    //toNextPage();
    let str = `User Verified Login:\t${user}\t${pass}`;
    
  }

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

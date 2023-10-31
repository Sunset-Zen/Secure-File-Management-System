"use client";
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import { Context } from "./components/Context";
import { FormProvider } from "./components/FormContext";
import { FormStep } from "./components/FormStep";

function page() {
  // Attributes | Hook(s)
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("Loading...");
  const [names, setNames] = useState(["Loading..."]);

  // ( Fetch Backend ) -> enables commuication between Backend and Frontend
  useEffect(() => {
    fetch("http://localhost:8080/api/home")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTitle(data.message);
        setNames(data.people);
      });
  }, []);

  // TSX
  return (
    <div>
      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold">
          Secure File Management System : Team B
        </h1>
      </div>

      {/* User Input Form */}
      <FormProvider>
        <FormStep />
      </FormProvider>

      {/* List of Files */}
      {/* <ul className="mt-10 border ">
        {names &&
          names.map((name, index) => (
            <li key={index}>
              <div>{name}</div>
            </li>
          ))}
      </ul> */}
    </div>
  );
}

export default page;

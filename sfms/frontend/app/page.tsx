"use client";
import React, { useState, useEffect } from "react";
import Form from "./components/Form";

function page() {
  // Attributes | Hook(s)
  const [page, setPage] = useState();

  // TSX
  return (
    <div>
      {/* Title */}
      <div>
        <h1 className="text-xl">Secure File Management System : Team B</h1>
      </div>
      {/* User Input Form */}
      <Form />
    </div>
  );
}

export default page;

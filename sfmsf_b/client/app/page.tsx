"use client";
import React, { useEffect, useState } from "react";

import { SystemContextProvider } from "./components/SystemContext";
import { SystemStep } from "./components/SystemStep";

function Home() {
  // Attributes || Hook(s)
  const [title, setTitle] = useState("Secure File Management System : Team B");

  // Check Credential Function -> LDAP

  // TSX
  return (
    <div
      className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 text-white-500"
      style={{ height: "800px", width: "1440px", overflowX: "scroll" }}
    >
      <h1 className="text-xl font-semibold text-white">{title}</h1>

      {/* File System Application */}
      <SystemContextProvider>
        <SystemStep />
      </SystemContextProvider>
    </div>
  );
}

export default Home;

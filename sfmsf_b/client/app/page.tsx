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
    <div>
      <h1 className="text-xl font-semibold">{title}</h1>

      {/* File System Application */}
      <SystemContextProvider>
        <SystemStep />
      </SystemContextProvider>
    </div>
  );
}

export default Home;

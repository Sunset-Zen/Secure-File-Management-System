import LoginForm from "./LoginForm";
import FileMenu from "./FileMenu";
import React, { useState } from "react";

import { useSystemState } from "./SystemContext";

export function SystemStep() {
  // Attributes || Hook(s)
  const { page } = useSystemState();

  // Functions || Logic
  switch (page) {
    case 1:
      return <LoginForm label1="Username:" label2="Password:" />;
    case 2:
      return <FileMenu />;
  }
}

import React, { useState, useEffect } from "react";

function page() {
  // Attributes | Hook(s)

  // TSX
  return (
    <div>
      <div>
        <h1>Secure File Management System : Team B</h1>
      </div>

      <form id="input_form">
        <label title="username">Username : </label>
        <input type="text" className="input" />
        <label title="password">Password : </label>
        <input type="password" className="input" />

        <button id="submit_button">Submit</button>
      </form>
    </div>
  );
}

export default page;

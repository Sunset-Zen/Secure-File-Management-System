import React, { useEffect, useState } from "react";

function File(props: any) {
  // Attributes | Hook(s)
  const [name, setName] = useState<string>(props.filename);

  // TSX
  return (
    <div className="flex border rounded-md">
      {/* File_Name */}
      <div
        className="grid place-items-center rounded-md border-slate-600 text-center text-slate-700 bg-grey-300"
        style={{ height: "100px", width: "60%" }}
      >
        {name ? <h1>{name}</h1> : <h1>Loading...</h1>}
      </div>

      {/* File Permissions */}
      <div
        className="grid rounded-md"
        style={{ height: "100px", margin: "1px" }}
      >
        {/* Read */}
        <button
          className="border rounded-md px-5"
          style={{ width: "80px", height: "30px" }}
        >
          <h1>Read</h1>
        </button>
        {/* Edit / Update */}
        <button
          className="border rounded-md px-5"
          style={{ width: "80px", height: "30px" }}
        >
          <h1>Edit</h1>
        </button>
        {/* Delete */}
        <button
          className="border rounded-md px-5"
          style={{ width: "80px", height: "30px" }}
        >
          <h1>Delete</h1>
        </button>
      </div>
    </div>
  );
}

export default File;

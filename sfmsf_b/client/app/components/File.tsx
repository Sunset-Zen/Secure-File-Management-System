import React, { useEffect, useState } from "react";
import axios from "axios";

function File(props: any) {
  // Attributes | Hook(s)
  const [name, setName] = useState<string>(props.filename);
  const [id, setID] = useState<number>(props.uid);
  const [active, setActive] = useState<string>(props.active);

  // Functions
  const handleChange = (target: any) => {
    setActive("deltd");
    console.log(`ID Deleted:\t${id}`);
    alert(`You deleted ${name} with ID : ${id}`);
    props.rmvfile(id); // works ( better )
  };

  // TSX
  return (
    <div className="flex border rounded-md">
      {/* File_Name */}
      <div
        className="grid place-items-center rounded-md border-slate-600 text-center text-white bg-grey-300"
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
          className="border rounded-md"
          style={{ width: "40px", height: "30px" }}
        >
          <h1>R</h1>
        </button>
        {/* Delete */}
        <button
          className="border rounded-md"
          style={{ width: "40px", height: "30px" }}
          onClick={() => handleChange(id)}
        >
          <h1>D</h1>
        </button>
      </div>
    </div>
  );
}

export default File;

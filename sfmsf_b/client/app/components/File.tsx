import React, { useEffect, useState } from "react";

function File(props: any) {
  // Attributes | Hook(s)
  const [name, setName] = useState<string>(props.filename);
  const [id, setID] = useState<number>(props.uid);
  const [active, setActive] = useState<boolean>(props.active);

  // Functions
  const handleChange = (target: any) => {
    setActive(false);
    console.log(`ID Deleted:\t${id}`);
    alert(`You deleted ${name} with ID : ${id}`);
    props.rmvfile(id); // works ( better ) (ID) -> under progress....
    // props.rmvfile(name); // ( fileName )
  };

  // TSX
  return (
    <div className="flex border rounded-md gap-3" style={{ height: "110px" }}>
      {/* File_Name */}
      <div
        className="grid place-items-center rounded-md border-slate-600 text-center text-white bg-grey-300"
        style={{ height: "100px", width: "60%" }}
      >
        <div>{id}</div>
        {name ? <h1 className="text-sm">{name}</h1> : <h1>Loading...</h1>}
      </div>

      {/* File Permissions */}
      <div
        className="grid rounded-md"
        style={{ height: "100px", margin: "1px" }}
      >
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

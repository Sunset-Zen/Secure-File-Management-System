import React, { useEffect, useState } from "react";
import File from "./File";

function FileList(props: any) {
  // Attributes | Hook(s)
  const [files, setFiles] = useState<string[]>([]);

  // Permissions ( RED )
  const [red, isRED] = useState(false);
  const [re, isRE] = useState(false);
  const [r, isR] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4444")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // console.log("Data Pulled : ", data.userA_files[0].title);
        // for (let i = 0; i < data.userA_files.length; i++) {
        //   setFiles((files) => [...files, data.userA_files[i].title]);
        // }
      });
  }, []);

  // Functions

  // TSX
  return (
    <section className="flex">
      <ul
        className="border-4 rounded-md border-grey-800 px-10 relative"
        style={{
          height: "200px",
          width: "300px",
          overflowY: "scroll",
          display: "grid",
          gap: "10px",
        }}
      >
        {files.map((item: string, index) => (
          <div key={index} className="bg-grey-200 rounded-md">
            <File filename={item} />
          </div>
        ))}
      </ul>

      {/* Upload / Create File Button */}
      <div className="flex ml-5" style={{ height: "30px" }}>
        <button
          className="border-grey-700 border-2 rounded-md text-white bg-black px-6"
          onClick={() => {
            alert("You uploaded a file");
          }}
        >
          <h1>Upload File</h1>
        </button>
      </div>
    </section>
  );
}

export default FileList;

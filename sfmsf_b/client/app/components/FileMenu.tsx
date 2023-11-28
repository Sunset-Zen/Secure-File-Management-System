import React, { useState } from "react";
import { useSystemState } from "./SystemContext";
import FileList from "./FileList";

function FileMenu() {
  // Attributes || Hook(s)
  const { toLastPage, username } = useSystemState();
  const [user, setUser] = useState(username);

  // TSX
  return (
    <div className="pl-10 mt-10">
      {/* Sub Title */}
      <div className="text-white">
        <div className="flex gap-10" style={{ height: "30px" }}>
          <h2 className="text-lg font-semibold" style={{ height: "30px" }}>
            File Menu Page ( <i className="text-blue-200">{user}</i> )
          </h2>
          {/* Logout Button */}
          <button
            className="border rounded-md text-white px-6 bg-red-700"
            style={{ marginLeft: "550px" }}
            onClick={toLastPage}
          >
            <h2>Logout</h2>
          </button>
        </div>
        <p>
          <b>Key</b>: D - Download | U - Upload | D - Delete
        </p>
      </div>

      {/* Display Available Files  */}
      <section className="flex-col gap-10">
        {/* Avaialable Files */}
        <div className="mt-10">
          {/* Title */}
          <div className="">
            <h1 className="text-lg font-semibold text-white">
              {username} Files (D.U.D)
            </h1>
          </div>
          {/* File List */}
          <div className="mt-2">
            <FileList fullAccess={true} />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Read & Edit Files */}
          <div className="mt-10">
            {/* Title */}
            <div>
              <h1 className="text-lg font-semibold  text-white">
                Download & Upload Files (D.U)
              </h1>
            </div>
            {/* File List */}
            <div className="mt-2">
              <FileList fullAccess={false} />
            </div>
          </div>

          {/* Read Only Files */}
          <div className="mt-10">
            {/* Title */}
            <div>
              <h1 className="text-lg font-semibold  text-white">
                Download Only Files (D)
              </h1>
            </div>
            {/* File List */}
            <div className="mt-2">
              <FileList fullAccess={false} />
            </div>
          </div>

          {/* Unavailable Files */}
          <div className="mt-10">
            {/* Title */}
            <div>
              <h1 className="text-lg font-semibold  text-white">
                Unavailable Files ( No Access )
              </h1>
            </div>
            {/* File List */}
            <div className="mt-2">
              <FileList fullAccess={false} />
            </div>
          </div>
        </div>
      </section>

      {/* Logout Button */}
      {/* <button
        className="border rounded-md text-white px-6 bg-red-700 mt-10"
        onClick={toLastPage}
      >
        <h2>Logout</h2>
      </button> */}
    </div>
  );
}

export default FileMenu;
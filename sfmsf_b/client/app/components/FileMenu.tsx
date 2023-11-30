import React, { useState } from "react";
import { useSystemState } from "./SystemContext";
import axios from "axios";
import FileList from "./FileList";

function FileMenu() {
  // Attributes || Hook(s)
  const { toLastPage, username } = useSystemState();
  const [user, setUser] = useState(username);

  const recordLogout = async () => {
    try {
      const response = await axios.post(
        `https://localhost:5500/logout/${user}`,
        {
          message: user,
        }
      );
      // Handle the response from the server
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

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
            onClick={() => {
              recordLogout();
              toLastPage();
            }}
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
              {/* Access Control : Render */}
              {username == "ojacks7" ? (
                <h1 className="text-white text-lg font-semibold">
                  tgeor13 Files (D.U)
                </h1>
              ) : username == "tgeor13" ? (
                <h1 className="text-white text-lg  font-semibold">
                  jdoe Files (D.U)
                </h1>
              ) : username == "jdoe" ? (
                <h1 className="text-white text-lg font-semibold">
                  ojacks7 Files (D.U)
                </h1>
              ) : (
                <h1 className="text-white font-semibold">Files (D.U)</h1>
              )}
            </div>
            {/* File List */}
            <div className="mt-2">
              <FileList fullAccess={false} limitedDU={true} />
            </div>
          </div>

          {/* Download Only Files */}
          <div className="mt-10">
            {/* Title */}
            <div>
              {/* Access Control : Render */}
              {username == "ojacks7" ? (
                <h1 className="text-white text-lg font-semibold">
                  tgeor13 Files (D)
                </h1>
              ) : username == "tgeor13" ? (
                <h1 className="text-white text-lg  font-semibold">
                  jdoe Files (D)
                </h1>
              ) : username == "jdoe" ? (
                <h1 className="text-white text-lg font-semibold">
                  ojacks7 Files (D)
                </h1>
              ) : (
                <h1 className="text-white font-semibold">Files (D.U)</h1>
              )}
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
              {/* Access Control : Render */}
              {username == "ojacks7" ? (
                <h1 className="text-white text-lg font-semibold">
                  jdoe Files (No Access)
                </h1>
              ) : username == "tgeor13" ? (
                <h1 className="text-white text-lg  font-semibold">
                  ojacks7 Files (No Access)
                </h1>
              ) : username == "jdoe" ? (
                <h1 className="text-white text-lg font-semibold">
                  tgeor13 Files (No Access)
                </h1>
              ) : (
                <h1 className="text-white font-semibold">Files (No Access)</h1>
              )}
            </div>
            {/* File List */}
            <div className="mt-2">
              <FileList fullAccess={false} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FileMenu;

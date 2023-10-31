import React from "react";

export function FileMenu() {
  // Attributes | Hook(s)
  // Functions
  // TSX
  return (
    <div>
      {/* Sub Title */}
      <div>
        <h2 className="text-lg font-semibold">File Menu Page </h2>
      </div>

      {/* Display Available Files  */}
      <div>
        <h1 className="text-lg font-semibold text-green-700">
          Available Files
        </h1>
      </div>
      <div>{/* List of Files */}</div>

      {/* Available Options */}
      <ul>
        {/* Upload / Create File Button */}
        <li>
          <button className="border rounded-md text-white bg-black px-6">
            <h1>Upload File</h1>
          </button>
        </li>
        {/* Delete File Button */}
        <li>
          <button className="border rounded-md text-white bg-black px-6">
            <h1>Delete File</h1>
          </button>
        </li>
        {/* Edit File Button */}
        <li>
          <button className="border rounded-md text-white bg-black px-6">
            <h1>Edit File</h1>
          </button>
        </li>
      </ul>

      {/* Logout */}
      <button className="border rounded-md text-white px-6 bg-red-700 mt-10">
        <h2>Logout</h2>
      </button>
    </div>
  );
}

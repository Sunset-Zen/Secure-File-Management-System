import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSystemState } from "./SystemContext";
import File from "./File";
// import UploadForm from "./UploadForm";

function FileList(props: any) {
  // Attributes | Hook(s)
  const [files, setFiles] = useState<string[]>([]);
  const { handleSubmit, control } = useForm();
  const { username } = useSystemState();
  // const [file, setFile] = useState<File | null>(null);

  // Permissions ( RED )
  const [red, isRED] = useState(false);
  const [re, isRE] = useState(false);
  const [r, isR] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000")
      .then((response) => response.json())
      .then((data) => {
        console.log(`server data`, data);
        // console.log("Data Pulled : ", data.userA_files[0].title);
        // for (let i = 0; i < data.userA_files.length; i++) {
        //   setFiles((files) => [...files, data.userA_files[i].title]);
        // }
      });
  }, []);

  // Functions
  const onSubmit = async (data: any) => {
    console.log(data);
    console.log(data.file[0]);
    console.log(data.file[0].name);

    const x = [...files, data.file[0].name];
    setFiles(x);

    // console.log(data.files);
    const formData = new FormData();

    formData.append("file", data.file[0]);

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    // Alert
    alert(`${username} Uploaded A ( ${data.file[0].type} ) File`);
  };

  // Functions
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFiles(e.target.files);
  // //   }
  // // }; /* Input Function */

  // const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();

  //   if (files) {
  //     console.log("Uploading file...");

  //     const formData = new FormData();
  //     // [...files].forEach((file) => {
  //     //   formData.append("files", file);
  //     // });
  //     // formData.append("file", file);

  //     try {
  //       const result = await fetch("http://localhost:4000/upload", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       const data = await result.json();

  //       console.log(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }; /* Form Function */

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
        {files?.map((item: string, index) => (
          <div key={index} className="bg-grey-200 rounded-md">
            <File filename={item} />
          </div>
        ))}
      </ul>

      {/* Upload / Create File Button */}
      <div className="flex ml-5" style={{ height: "30px" }}>
        {/* <button
          className="border-grey-700 border-2 rounded-md text-white bg-black px-6"
          onClick={() => {
            alert("You uploaded a file");
          }}
        >
          <h1>Upload File</h1>
        </button> */}
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <button className="border-grey-700 border-2 rounded-md text-white bg-black px-6 mr-5">
            Upload
          </button>
          {/* <input type="file" name="file" onChange={handleFileChange} /> */}
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                onChange={(e) => field.onChange(e.target.files)}
              />
            )}
          />
        </form>
      </div>
    </section>
  );
}

export default FileList;

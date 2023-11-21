import React, { useEffect, useState } from "react";
import { useSystemState } from "./SystemContext";
import File from "./File";
import axios from "axios";

function FileList(props: any) {
  // Attributes | Hook(s)
  const [counter, setCounter] = useState<number>(0);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);
  const { username } = useSystemState();

  const [selectedFiles, setSelectedFiles] = useState<FileList>(); // sent to backend

  // Permissions ( RED )
  const [red, setRED] = useState(props.fullAccess);
  const [re, setRE] = useState(false);
  const [r, setR] = useState(false);

  useEffect(() => {
    // Filter out FileNames with Active: False
    // setCounter((prev) => (prev = fileList.length));
    // console.log("File List", fileList);
    // console.log("File List Length", counter);
  });

  // Functions
  const upload = () => {
    if (!selectedFiles) {
      alert(`( ${username} ) had No file selected`);
      return;
    }
    console.log(selectedFiles);

    // (Frontend) : Renders File Names 1
    let newItems: any[] = [];
    let objectList: any[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      newItems.push(selectedFiles[i].name);
      let tempObj = {
        file: selectedFiles[i],
      };
      objectList.push(tempObj);
    }
    const x = [...fileNames, ...newItems];
    console.log(newItems);
    console.log(objectList);
    setFileNames([...fileNames, ...x]);
    setFileList([...fileList, ...objectList]);

    // (Backend) : Begin Backend POST
    const formData = new FormData();
    Object.keys(selectedFiles).forEach((key: any) => {
      if (selectedFiles) {
        formData.append("files", selectedFiles[key]);
      }
    });
    axios
      .post("http://localhost:5500/upload", formData)
      .then((res) => {})
      .catch((er) => console.log(er));

    // ( Alert )
    selectedFiles.length > 1
      ? alert(`( ${username} ) Uploaded Multiple Files`)
      : alert(`( ${username} ) Uploaded A ( ${selectedFiles[0].type} ) File`);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };
  const deleteFile = async (target: any) => {
    // ( Front End Logic )
    let ilist: any[] = [];
    let temp: any;
    for (let i = 0; i < fileNames.length; i++) {
      if (i !== target - 1) {
        ilist.push(fileNames[i]);
      } else {
        temp = fileNames[i];
      }
    }
    setFileNames(ilist);

    // ( Backend Logic )
    try {
      const response = await axios.delete(
        `http://localhost:5500/delete/${target}_${temp}`
      );
      console.log("File deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

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
        {fileNames?.map((item: string, index) => (
          <div key={index} className="bg-grey-200 rounded-md">
            <File
              filename={item}
              uid={index + 1}
              active={"true"}
              rmvfile={deleteFile}
            />
          </div>
        ))}
      </ul>

      {/* Full Access */}
      {red && (
        <div
          className="flex ml-5"
          style={{
            height: "200px",
            display: "relative",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              upload();
            }}
          >
            <input
              type="file"
              name="files"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <button
              type="submit"
              style={{
                position: "relative",
                right: "333px",
                top: "150px",
              }}
              className="border-grey-700 border-2 rounded-md text-white bg-black px-6"
            >
              Upload
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default FileList;

{
  /* <form action="" onSubmit={handleSubmit(handleFileUpload)}> */
}
{
  /* <form action="" onSubmit={handleSubmit(onSubmit)}> */
}
{
  /* <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                multiple
                onChange={(e) => field.onChange(e.target.files)}
              />
            )}
          /> */
}
// Functions
// const onSubmit = async (data: any) => {
//   if (!files) {
//     alert(`( ${username} ) had No file selected`);
//     return;
//   }

//   console.log(data);
//   console.log(`File 1`, data.file[0]);
//   console.log(`File 2`, data.file[1]);
//   // console.log(data.file.length);
//   // console.log(data.file[0].name);

//   let newItems: any[] = [];
//   for (let i = 0; i < data.file.length; i++) {
//     newItems.push(data.file[i].name);
//   }
//   console.log(newItems);

//   const x = [...files, ...newItems];
//   setFiles(x);

//   // console.log(data.files);

//   const formData = new FormData();
//   for (let i = 0; i < files.length; i++) {
//     formData.append(`file${i + 1}`, data.file[i]);
//   }

//   fetch("http://localhost:4000/api", {
//     method: "POST",
//     body: formData,
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data));

//   // if (data.file) {
//   //   // for (let i = 0; i < data.file.length; i++) {
//   //   //   // newItems.push(data.file[i].name);
//   //   //   Object.keys(data.file[i].array.forEach(element => {
//   //   //   });)
//   //   // }
//   //   // Object.keys(data.file).forEach((key) => {
//   //   //   formData.append(data.file.item(key).name, data.file.item(key));
//   //   // });
//   // } else {
//   //   console.log(`data null`);
//   // }

//   // try {
//   //   const response = await fetch("http://localhost:4000/upload", {
//   //     method: "POST",
//   //     body: formData,
//   //   });
//   //   if (response.ok) {
//   //     // Get JSON from the response
//   //     console.log("File uploaded successfully");
//   //     console.log(formData.values());
//   //     const json = await response.json();
//   //     json
//   //       ? console.log(`File JSON : ${json.toString()}`)
//   //       : console.log(`No JSON`);
//   //   } else {
//   //     console.error("Failed to upload file");
//   //   }
//   // } catch (error) {
//   //   console.error("Error uploading file:", error);
//   // }

//   // ( Alert )
//   data.file.length > 1
//     ? alert(`( ${username} ) Uploaded Multiple Files`)
//     : alert(`( ${username} ) Uploaded A ( ${data.file[0].type} ) File`);
// };

// File Upload Form Function(s)
// const handleUpload = async (data: { files: FileList }) => {
//   const formData = new FormData();
//   for (let i = 0; i < data.files.length; i++) {
//     formData.append(`file${i + 1}`, data.files[i]);
//   }

//   try {
//     const response = await fetch("http://localhost:4000/upload", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {
//       console.log("Files uploaded successfully");
//     } else {
//       console.error("Failed to upload files");
//     }
//   } catch (error) {
//     console.error("Error uploading files:", error);
//   }
// };

{
  // Send to Backend (1)
  // fetch("http://localhost:5500/upload", {
  //   method: "POST",
  //   body: formData,
  // })
  //   .then((res) => {
  //     console.log("file(s) uploaded");
  //   })
  //   .then((data) => console.log(formData));
  // if (data.file) {
  //   // for (let i = 0; i < data.file.length; i++) {
  //   //   // newItems.push(data.file[i].name);
  //   //   Object.keys(data.file[i].array.forEach(element => {
  //   //   });)
  //   // }
  //   // Object.keys(data.file).forEach((key) => {
  //   //   formData.append(data.file.item(key).name, data.file.item(key));
  //   // });
  // } else {
  //   console.log(`data null`);
  // }
  // try {
  //   const response = await fetch("http://localhost:4000/upload", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   if (response.ok) {
  //     // Get JSON from the response
  //     console.log("File uploaded successfully");
  //     console.log(formData.values());
  //     const json = await response.json();
  //     json
  //       ? console.log(`File JSON : ${json.toString()}`)
  //       : console.log(`No JSON`);
  //   } else {
  //     console.error("Failed to upload file");
  //   }
  // } catch (error) {
  //   console.error("Error uploading file:", error);
  // }
}

{
  /* handleSubmit(onSubmit) */
}
{
  /* <Controller
            name="file"
            control={control}
            render={() => (
              <input
                type="file"
                name="file"
                id="files"
                multiple
                onChange={handleFileChange}
              />
            )}
          /> */
}

/*
  // Prev Functions
  const onSubmit = async () => {
    if (!selectedFiles) {
      alert(`( ${username} ) had No file selected`);
      return;
    }
    console.log(selectedFiles);

    // (Frontend) : Renders File Names
    let newItems: any[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      newItems.push(selectedFiles[i].name);
    }
    console.log(newItems);
    const x = [...fileNames, ...newItems];
    setFileNames(x);

    // (Backend) : Begin Backend POST
    const formData = new FormData();
    // Bind / Append File Data to Form
    // selectedFiles.forEach()
    Object.keys(selectedFiles).forEach((key: any) => {
      if (selectedFiles) {
        formData.append("files", selectedFiles[key]);
      }
    });
    // for (let i = 0; i < fileNames.length; i++) {
    //   formData.append(`files`, selectedFiles[i]);
    // }

    // (Send to Backend) : (Axios)
    const response = await axios.post(
      "http://localhost:5500/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("File uploaded successfully:", response.data);
    console.log(`formData: ${formData}`);

    // ( Alert )
    selectedFiles.length > 1
      ? alert(`( ${username} ) Uploaded Multiple Files`)
      : alert(`( ${username} ) Uploaded A ( ${selectedFiles[0].type} ) File`);
  };
 */

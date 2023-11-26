import React, { useEffect, useState } from "react";
import { useSystemState } from "./SystemContext";
import File from "./File";
import axios from "axios";

function FileList(props: any) {
  // Attributes | Hook(s)
  const [fileNames, setFileNames] = useState<string[]>([]); // change ???
  const [fileList, setFileList] = useState<any[]>([]);
  const [referenceList, setReference] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const { username } = useSystemState();

  const [selectedFiles, setSelectedFiles] = useState<FileList>(); // Send to the backend
  let counter: number | undefined = count;

  const [displayFiles, setDisplayFiles] = useState<any[]>([]); // Display on the frontend
  const [fileItem, setFileItem] = useState<any>({
    id: counter + 1,
    name: "",
    active: true,
  });

  // Permissions ( D.U.D )
  const [red, setRED] = useState(props.fullAccess); // Full Access ( Download, Upload, Delete )
  const [re, setRE] = useState(false); // Limited Access ( Download, Upload )
  const [r, setR] = useState(false); // Limited Access ( Download )
  const [n, setN] = useState(false); // No Access ( * Restricted * )

  // Update Render Function
  useEffect(() => {
    // ( Debug Attributes )
    // console.log("File List", fileList);
    // console.log("File List Length", fileList.length);
    // console.log("Reference List", referenceList);
    // console.log("Reference List Length", referenceList.length);
    // console.log("File Names List :", fileNames);
    console.log("File Item :", fileItem);
    console.log("Display Files :", displayFiles);
    console.log("Global Counter :", counter);
    console.log("Selected Files Length: ", selectedFiles?.length);
  }, [selectedFiles, referenceList, fileList, fileNames, fileItem]);

  // Functions : ( Application Functionality )
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  }; // ( setSelectedFiles == to input )
  const uploadFiles = () => {
    if (!selectedFiles) {
      alert(`( ${username} ) had No file selected`);
      return;
    }
    console.log(selectedFiles);

    // ( Frontend ) : Renders File Names 1
    let newItems: any[] = []; // fileNames buffer
    let objectList: any[] = []; // fileList buffer
    let tempreferenceList: any[] = [];

    // Iterate through Selected Files
    for (let i = 0; i < selectedFiles.length; i++) {
      // Update Count
      // counter++;
      // Create a temporary object buffer -> populate with file
      let tempObj = {
        file: selectedFiles[i],
      };
      // Push Temp File Object to array buffer
      objectList.push(tempObj);
      // Trial 1 : (Display File)
      let tempFile = {
        id: counter,
        name: selectedFiles[i].name,
        active: true,
      };
      tempreferenceList.push(tempFile);
      console.log("Temp Reference List :", tempreferenceList); // Trial 1 : (Display File)
    }

    setReference((prev) => [...prev, ...tempreferenceList]); // Trial 1 : (Display File)
    setFileList([...fileList, ...objectList]);
    // const x = [...fileNames, ...newItems];
    // console.log(newItems);
    // console.log(objectList);
    // setFileNames([...fileNames, ...x]);

    newItems = tempreferenceList.map((item) => item.name);
    setFileNames((prev) => [...prev, ...newItems]);
    // setCount((prev) => (prev = counter));

    // console.log("Reference List :", referenceList); // Trial 1 : (Display File)
    // console.log("File Names List :", fileNames);

    // Iterate through referenceList to Update File Names that will be rendered
    // for (let i = 0; i < referenceList.length; i++) {
    //   // if active -> push
    //   newItems.push(referenceList[i].name);
    // }
    // setFileNames([...fileNames, ...newItems]);

    // ( Backend ) : Begin Backend POST
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
  }; // ( Upload A File )
  const deleteFile = async (target: any) => {
    // ( Front End Logic )
    let ilist: any[] = [];
    let tflist: any[] = [];
    let temp: any;
    setCount((prev) => prev - 1);

    // BY Name ->
    // ilist = fileNames.filter((name) => name !== target);
    // setFileNames(ilist);

    // By ID -> under progress...
    for (let i = 0; i < referenceList.length; i++) {
      if (i !== target - 1) {
        ilist.push(referenceList[i]);
        tflist.push(fileList[i]);
      } else {
        temp = referenceList[i].name;
      }
    }
    setReference(ilist);
    setFileList(tflist);

    // ( Backend Logic )
    try {
      const response = await axios.delete(
        `http://localhost:5500/delete/${target}_${temp}`
      );
      console.log("File deleted successfully:", response.data);
      console.log("File List ", fileList);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }; // ( Delete A File )

  const uploadFile = (list: any) => {
    // ( Frontend ) : Render Logic (Multiple File Upload)
    if (list.length > 1) {
      let templist: any[] = [];
      for (let x = 0; x < list.length; x++) {
        setCount((prev) => prev + 1);
        let temp = {
          id: x + 1,
          name: list[x].name,
          active: true,
        };
        templist.push(temp);
        setFileItem((prev: any) => (prev = temp));
      }
      setDisplayFiles([...displayFiles, ...templist]);
    } else {
      // ( Frontend ) : Render Logic (Single File Upload)
      setCount((prev) => prev + 1);
      let temp = {
        id: counter + 1,
        name: list[0].name,
        active: true,
      };
      setFileItem((prev: any) => (prev = temp));
      let templist: any[] = [];
      templist.push(temp);
      setDisplayFiles([...displayFiles, ...templist]);
    }

    // ( Backend ) : Begin Backend POST
    const formData = new FormData();
    Object.keys(list).forEach((key: any) => {
      if (list) {
        formData.append("files", list[key]);
      }
    });
    axios
      .post("http://localhost:5500/upload", formData)
      .then((res) => {})
      .catch((er) => console.log(er));

    // ( Alert )
    list.length > 1
      ? alert(`( ${username} ) Uploaded Multiple Files`)
      : alert(`( ${username} ) Uploaded A ( ${list[0].type} ) File`);
  };
  const removeFile = async (target: number) => {
    // ( Frontend ): Render Logic
    let tempA: string = "";
    if (displayFiles.length > 1) {
      for (let i = 0; i < displayFiles.length; i++) {
        if (i + 1 === target) {
          tempA = displayFiles[i].name;
        }
      }
    } else {
      tempA = displayFiles[0].name; // unsure
    }

    console.log(`Target Object : ${tempA}`);
    setCount((prev) => prev - 1);
    setDisplayFiles((prev) => {
      return prev.filter((file) => file.id !== target);
    });

    // ( Backend ): Begin Backend DELETE Logic
    try {
      const response = await axios.delete(
        `http://localhost:5500/delete/${target}_${tempA}`
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
        {/* ( New Render ) : Iterate through reference list and render : Object Based */}
        {displayFiles.map((file: any, index) => (
          <div key={file.id}>
            <File
              filename={file.name}
              uid={file.id}
              active={file.active}
              rmvfile={removeFile}
            />
          </div>
        ))}

        {/* {referenceList?.map(
          (item: any, index) =>
            // If item is active -> render
            item.active && (
              <div key={index}>
                <File
                  filename={item.name}
                  uid={item.id}
                  active={item.active}
                  rmvfile={deleteFile}
                />
              </div>
            )
        )} */}
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
              // uploadFiles();
              uploadFile(selectedFiles);
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
{
  /* ( Old Render ) */
}
{
  /* {fileNames?.map((item: string, index) => (
          <div key={index}>
            <File
              filename={item}
              uid={index + 1}
              active={"true"}
              rmvfile={deleteFile}
            />
          </div>
        ))} */
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

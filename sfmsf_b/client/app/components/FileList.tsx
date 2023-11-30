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
    username: username,
  });
  let prevNum = counter + 1;

  // Permissions ( D.U.D )
  const [dud, setDUD] = useState(props.fullAccess); // Full Access ( Download, Upload, Delete )
  const [du, setDU] = useState(props.limitedDU); // Limited Access ( Download, Upload )
  const [d, setD] = useState(props.limitedD); // Limited Access ( Download )
  const [n, setN] = useState(false); // No Access ( * Restricted * )

  // Update / Debug Render Function
  useEffect(() => {
    // ( Debug Attributes )
    // console.log("File Item :", fileItem);
    // console.log("Display Files :", displayFiles);
    // console.log("Global Counter :", counter);
    // console.log("Selected Files Length: ", selectedFiles?.length);
  }, [selectedFiles, referenceList, fileList, fileNames, fileItem]);

  // Functions : ( Application Functionality )
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  }; // ( setSelectedFiles == to input )

  const uploadFile = (list: any) => {
    // Send Username to Back End
    // sendUsername();

    // ( Frontend ) : Render Logic (Multiple File Upload)
    if (list.length > 1) {
      let templist: any[] = [];
      for (let x = 0; x < list.length; x++) {
        setCount((prev) => prev + 1);
        let backendname = `${username[0]}${list[x].name}`;
        let temp = {
          id: prevNum + x,
          name: list[x].name,
          user: username,
          active: true,
        };
        templist.push(temp);
        setFileItem((prev: any) => (prev = temp));
      }
      setDisplayFiles([...displayFiles, ...templist]);
      let filelist = "Multiple_Files";

      // ( Backend ) : Begin Backend POST
      const formData = new FormData();
      Object.keys(list).forEach((key: any) => {
        if (list) {
          formData.append("files", list[key]);
        }
      });
      axios
        .post(`http://localhost:5500/upload/${username}/${filelist}`, formData)
        .then((res) => {})
        .catch((er) => console.log(er));
    } else {
      // ( Frontend ) : Render Logic (Single File Upload)
      setCount((prev) => prev + 1);
      let backendname = `${username[0]}${list[0].name}`;
      let temp = {
        id: counter + 1,
        name: list[0].name,
        active: true,
        user: username,
      };
      setFileItem((prev: any) => (prev = temp));
      let templist: any[] = [];
      templist.push(temp);
      setDisplayFiles([...displayFiles, ...templist]);

      // ( Backend ) : Begin Backend POST
      const formData = new FormData();
      Object.keys(list).forEach((key: any) => {
        if (list) {
          formData.append("files", list[key]);
        }
      });
      axios
        .post(
          `https://localhost:5500/upload/${username}/${list[0].name}`,
          formData
        )
        .then((res) => {})
        .catch((er) => console.log(er));
    }


    // ( Alert )
    list.length > 1
      ? alert(`( ${username} ) Uploaded Multiple Files`)
      : alert(`( ${username} ) Uploaded A ( ${list[0].type} ) File`);
  }; // ( Function ) : Upload File
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
        `https://localhost:5500/delete/${username}/${target}_${tempA}`
      );
      console.log("File deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }; // ( Function ) : Delete File
  const downloadFile = async (index: any) => {
    // ( Frontend ): Render Logic
    let tempA: string = "";
    if (displayFiles.length > 1) {
      for (let i = 0; i < displayFiles.length; i++) {
        if (i + 1 === index) {
          tempA = displayFiles[i].name;
        }
      }
    } else {
      tempA = displayFiles[0].name; // unsure
    }
    alert(`${username} downloaded ${tempA} with ID : ${index}`);

    // ( Backend ): Begin Backend DOWNLOAD Logic
    try {
      const response = await axios({
        url: `http://localhost:5500/download/${username}/${index}_${tempA}`,
        method: "GET",
        responseType: "blob",
      });

      // Create a link element and trigger a click to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${index}_${tempA}`); // Replace with the desired filename
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
    // try {
    //   const response = await axios
    //     .get(`http://localhost:5500/download/${index}_${tempA}`, {
    //       responseType: "blob",
    //     })
    //     .then((obj) => {
    //       // Create View URL
    //       const url = URL.createObjectURL(obj.data);
    //       const a = document.createElement("a");
    //       a.href = url;
    //       a.download = `random-image.jpg`;
    //       document.body.appendChild(a);
    //     });
    //   console.log("File downloaded successfully:", response);
    // } catch (error) {
    //   console.error("Error downloading file:", error);
    // }
  }; // ( Function ) : Download File

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
        {displayFiles.map((file: any, index) =>
          dud ? (
            <div key={file.id}>
              <File
                filename={file.name}
                uid={file.id}
                active={file.active}
                rmvfile={removeFile}
                dwldfile={downloadFile}
                dud={true}
              />
            </div>
          ) : du ? (
            <div key={file.id}>
              <File
                filename={file.name}
                uid={file.id}
                active={file.active}
                rmvfile={removeFile}
                dwldfile={downloadFile}
                du={true}
              />
            </div>
          ) : d ? (
            <div key={file.id}>
              <File
                filename={file.name}
                uid={file.id}
                active={file.active}
                rmvfile={removeFile}
                dwldfile={downloadFile}
                d={true}
              />
            </div>
          ) : (
            n && (
              <div key={file.id}>
                <File
                  filename={file.name}
                  uid={file.id}
                  active={file.active}
                  rmvfile={removeFile}
                  dud={true}
                />
              </div>
            )
          )
        )}
      </ul>
      {/* Full Access */}
      {dud && (
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
                right: "340px",
                top: "50px",
              }}
              className="border-grey-700 border-2 rounded-md text-white bg-black px-6"
            >
              Upload
            </button>
          </form>
        </div>
      )}
      {/* Limited Access */}
      {du && (
        <div
          className=" ml-5"
          style={{
            height: "200px",
            display: "relative",
            // border: "1px solid green",
            width: "240px",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // uploadFiles();
              uploadFile(selectedFiles);
            }}
            style={{
              // border: "1px solid blue",
              height: "80px",
              width: "100%",
              // display: "flex",
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
                // right: "333px",
                top: "20px",
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

"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// Chakra UI Imports
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";

function UploadForm() {
  // Attributes || Hook(s)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File>();

  // Function(s)
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("https://localhost:4000/upload", {
        method: "POST",
        body: data,
      });

      // Handle Error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle Errors Here
      console.error(e);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file.name);
    // Object.keys(file).forEach((key) => {
    //   formData.append(file.name, file);
    // });
    // console.log(Object.keys(file));

    try {
      const response = await fetch("https://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });
      // Get JSON from the response

      if (response.ok) {
        console.log("File uploaded successfully");
        console.log(formData.entries());
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    // Close modal
    onClose();
  };

  // TSX
  return (
    <div className="border-grey-700 border-2 rounded-md text-white bg-black px-6">
      <Button colorScheme="teal" onClick={onOpen}>
        Upload File
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          style={{
            marginLeft: "500px",
            marginTop: "100px",
            backgroundColor: "black",
            color: "white",
            width: "300px",
            height: "200px",
            borderRadius: "1vw",
            padding: "20px",
          }}
        >
          <ModalHeader>File Upload Form</ModalHeader>
          <ModalBody
            style={{
              marginBottom: "15px",
              marginTop: "15px",
              height: "200px",
            }}
          >
            <main>
              <form action="" onSubmit={handleUpload}>
                <input
                  type="file"
                  name="file"
                  onChange={(e) => setFile(e.target.files?.[0])}
                />
                <button>Submit</button>
              </form>
            </main>
          </ModalBody>

          <ModalFooter style={{ display: "flex" }}>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              style={{
                color: "red",
                border: "1px solid red",
                padding: "0 5px",
                borderRadius: "10%",
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default UploadForm;

{
  /* <form action="/single" method="POST" encType="multipart/form-data">
              <input
                type="file"
                name="file"
                id="myFiles"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              <button
                onClick={onSubmit}
                className="mt-5 border rounded-md px-2"
              >
                Submit
              </button>
            </form> */
}
// async function handleSubmit(e: { preventDefault: () => void }) {
//   e.preventDefault();

//   // Handle File Data Send File(s)
//   const data = new FormData();
//   data.append("image", fileData);

//   // Response
//   fetch("http://localhost:4000/upload", {
//     method: "POST",
//     body: data,
//   })
//     .then((result) => {
//       console.log(result);
//       console.log("File Sent Successful");
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });

//   // Get JSON from the response
//   // const json = (await response).json();

//   // Console.log data
//   // console.log(json);

//   // .then((result) => {
//   //   console.log("File Sent Successful");
//   // })
//   // .catch((error) => {
//   //   console.log(error.message);
//   // });

//   alert("You uploaded a file");
// }
// const onSubmit = async (e: { preventDefault: () => void }) => {
//   e.preventDefault();
//   if (!file) return;
//   try {
//     const data = new FormData();
//     data.set("file", file);

//     const res = await fetch("http://localhost:4000/upload", {
//       method: "POST",
//       body: data,
//     });

//     if (!res.ok) throw new Error(await res.text());
//   } catch (error: any) {
//     console.error(error);
//   }

//   alert("You uploaded a file");
// };

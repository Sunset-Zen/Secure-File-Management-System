// Import Modules
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { logger, logEvents } = require("./middleware/logEvents");
const corsConfig = require("./config/corsConfig");
const path = require("path");
const fs = require("fs");
const ldap = require("ldapjs");
const https = require('https');

// ( Attributes )
const app = express();
const PORT = 5500;
const filesDirectory = path.join(__dirname, "files");
//app.use(cors(corsConfig));
app.use(cors({
  origin: 'https://localhost:3000',
}));
// app.use(function (req, res, next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
// })
app.use(express.json());

// ( Custom Middleware )
app.use(logger);

let unique_ID = 0;

// ( Set Storage )
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./files");
  },
  filename: function (req, file, cb) {
    unique_ID++;
    // return cb(null, `${file.originalname}`); // ( By Name )
    return cb(null, `${unique_ID}_${file.originalname}`); // ( By ID )
  },
});
const upload = multer({ storage });

// ( Upload : POST Route )
app.post("/upload", upload.array("files"), (req, res) => {
  // As I iterate through uploaded files add a unique ID Key
  for (let i = 0; i < req.files.length; i++) {
    req.files[i].uid = i + 1;
  }
  console.log(req.files);
  console.log(req.body.uid);
});

// ( Delete : DELETE Route )
app.delete("/delete/:fileName", (req, res) => {
  unique_ID--;
  const fname = req.params.fileName;
  console.log(`Filename : ${fname}`);
  const filePath = path.join(filesDirectory, fname);

  try {
    fs.unlinkSync(filePath);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

var httpsOptions = {
  key: fs.readFileSync('PKI/client-key.pem'),
  cert: fs.readFileSync('PKI/client-cert.pem')
};
https.createServer(httpsOptions, app).listen(PORT, () => console.log(`Server running on port ${PORT}`));
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // Import Modules
// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");

// // ( Attributes )
// const PORT = process.env.PORT || 5500;
// const corsConfig = require("./config/corsConfig");

// const app = express();

// // ( Cross Origin Resource Sharing ) :  Allows you to fetch request from an external website domain
// app.use(cors(corsConfig));

// // ( Built-In Middleware ) : for JSON submitted data
// app.use(express.json());

// // ( Set saved storage options )
// const storage = multer.diskStorage({
//   // Set Destination for Uploaded Files
//   destination: function (req, file, callback) {
//     callback(null, "./files");
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

// app.use("/", (req, res) => {
//   // res.sendFile(__dirname, "../client/app/components/FileList.tsx");
//   // res.sendFile("../client/app/components/FileList.tsx");
//   res.sendFile(
//     path.join(__dirname, "..", "client", "app", "components", "FileList.tsx")
//   );
// });
// app.post("/upload", upload.array("files"), async (req, res) => {
//   // Write files to our server
//   console.log("Request received");
//   console.log(req.body); //        Logs form body values
//   console.log(`Sent Files : ${req.files}`);
//   res.json({ message: "File(s) uploaded successfully" });
//   // console.log(req.body); //        Logs form body values
//   // console.log(`Sent Files : ${req.files}`);
//   // res.json({ message: "File(s) uploaded successfully" });

//   // ( express-fileupload )
//   // Object.keys(files).forEach((key) => {
//   //   const filepath = path.join(__dirname, "files", files[key].name);
//   //   files[key].mv(filepath, (error) => {
//   //     if (error)
//   //       return res.status(500).json({ status: "error", message: error });
//   //   });
//   // });
//   // return res.json({
//   //   status: "success",
//   //   message: Object.keys(files).toString(),
//   // });

//   // ( Multer )
//   // upload.array("files")
//   // console.log(req.body); //        Logs form body values
//   // console.log(`Sent Files : ${req.files}`);
//   // res.json({ message: "File(s) uploaded successfully" });
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
/* Multer : Requires the user to hit the upload button twice  */
/* fileUpload : ??? */
const client = ldap.createClient({
  url:['ldap://127.0.0.1:389']})

app.post("/login", (req, res) => {
  //from form
  var username = req.body.username;
  var password = req.body.password;

  client.bind('cn=root','secret',(err)=>{
    //bind server to ldap server
    //assert.ifError(err);
    //console.log("bind error");
  })
  const opts = {
    //search options: search entire tree for matches where cn=username and return cn, salt, and password
    filter: '(&(cn='+username+'))',
    scope: 'base',
    attributes:['cn', 'salt', 'password'] 
  }
  client.search('o=myhost', opts, (err,ldapRes)=>{
    //assert.ifError(err);
    ldapRes.on('searchRequest', (searchRequest)=>{
      //console.log("ldap result: " + searchRequest);
    })
    
    ldapRes.on('searchEntry', (entry) =>{
      var cn, salt, passwd;
      entry.attributes.forEach(attribute => {
        //parse the results - ldap gives attributes in inconsistent order
        var type = attribute.type;
        switch(type){
          case "cn":
            cn = attribute.values[0];
            break;
          case "salt":
            salt = attribute.values[0];
            break;
          case "password":
            passwd = attribute.values[0];
            break;
          default:
            console.log("unknown type \"" + type + "\"");
        }
      });
      console.log("Attempt: " + cn + " " + password);
      password = salt + password;
      hashText(password).then((result)=>{
        // console.log(result);
        // console.log(passwd);
        if(cn === username && result === passwd){
          console.log("Valid login information provided");
          res.status(200).json({ message: "Valid credentials" });
          //res.send();
        }
        else{
          console.log("Invalid credentials");
          res.status(403).json({ error: "Invalid credentials" });
          //res.send();
        }
      });
      
    })
  })
  
  
})

async function hashText(text){
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2,"0"))
    .join("");
  return hashHex;
}

import express, { query } from 'express';
  const app = express();

  const PORT = 8000;

  import path from 'path';
  import fs from "fs";

  const __dirname = path.resolve();
  const fn = __dirname + "/userList.csv";



  //middleware

  app.use(express.urlencoded()); 




  //routers

  //Get method for Refistration feature

  app.get ("/register", (req, res)=>{
   console.log(req.query);
   res.sendFile(__dirname + "/src/regForm.html");
  });

  //Post method for Registration feature

  app.post ("/register", (req, res)=>{
   const {username, email, password} = req.body;
   const str = `${username}, ${email}, ${password}\n`;
   fs.appendFile(fn, str,(error)=>{
    error ? console.log(error.message) : console.log("added to the file");
   });
   res.sendFile(__dirname + "/src/regForm.html");
  });

  //root router or login page

  //get method for login feature

  app.get ("/login", (req, res)=>{
   //console.log(req.query);
   res.sendFile(__dirname + "/src/loginForm.html");
  });

//Post metrhod for login feature

 /* app.post ("./login", (req,res)=>{
    const {username, email, password} = req.body;
    const str = `${username},${email}, ${password}\n`;
    fs.appendFile(fn, str,(error)=>{
      error ? console.log(error.message) : console.log("added to the file");
     });
     res.sendFile(__dirname + "/src/loginForm.html");
    });*/

    

 




app.post ("/login", (req, res)=>{
    const {username, password} = req.body;
    const str = `${username}, ${password}\n`;

    //read file
   fs.readFile(fn, (error, data)=>{
  error && console.log(error.message);

  const userStr = data.toString();
  const userArg = userStr.split
  ("\n");

  if (userArg.includes(str)) {
    res.send("<h1 style='color:green'>You are Logged in Successfully</h1>");
  } else{
    res.send("<h1 style='color:red>Invalid Login</h1>");
  }
    });
    fs.appendFile(fn, str,(error)=>{
      error ? console.log(error.message) : console.log("added to the file");
     });
  });
  //res.sendFile(__dirname + "/src/loginForm.html");
 









// root router to home page
  app.get ("/home", (req, res)=>{
   //console.log("received request to home router");

    res.sendFile( __dirname + "/src/homePage.html");
  });

  app.post ("/home", (req, res)=>{
    //const {username, password} = req.body;
    //const str = `${username}, ${password}\n`;
   fs.openFile(fn, str,(error)=>{
  error ? console.log(error.message) : console.log("successfully added to the file");
    });
  res.sendFile(__dirname + "/src/homePage.html");
  });


  //make our server available to http request

  app.listen(PORT,error => {
    error ? console.log(error.message) 
    :console.log('server running at http://localhost:${PORT}');
  });
  





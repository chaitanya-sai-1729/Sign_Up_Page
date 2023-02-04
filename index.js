const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static(__dirname+ "/public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members:[
      {
      email_address:email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/4d818ddfee";
  const options={
    method: "POST",
    auth: "chaitu:e1849168d3ab34736ae661a3c9faa26f-us21"
  }

  const request=https.request(url,options,function(response){

    if(response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
request.write(jsonData);
request.end();

  });


  app.post("/failure",function(req,res){
    res.redirect("/");
  })


app.listen(process.env.PORT || 3000,function(){
  console.log("server started");
})


// Api Key
// e1849168d3ab34736ae661a3c9faa26f-us21

// List ID
//4d818ddfee

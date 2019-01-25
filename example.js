var express = require("express");
var app = express();
var request = require("request");
var playlistMaker = require('./index');

app.use(express.urlencoded({extended: true}));


//engine
app.set("view engine", "ejs");

//serve static files
app.use(express.static("public"));

//routes
app.get("/", function(req,res){
 res.render("home",{error: ""});   

});

app.post("/generateURL", function(req,res){
 if (req.body.urlList != undefined)    
 playlistMaker.getPlaylist(req.body.urlList,function(result){
     if (result!=undefined && result != null)
     res.redirect(result);
     else res.render("home", {error: "One or more URLs are invalid"})
 });
 else res.send("Error 1");
    
    
});



  

//listener
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server has started");
});

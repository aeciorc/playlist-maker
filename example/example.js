var express = require("express");
var app = express();
var request = require("request");
var playlistMaker = require('../index');

app.use(express.urlencoded({extended: true}));

var videos = ['https://www.youtube.com/watch?v=KbRtA_brCQ0',
'https://www.youtube.com/watch?v=k05i8bT_Pkg',
'https://www.youtube.com/watch?v=b5X7ZiAOkMU',
'https://www.youtube.com/watch?v=kHLHSlExFis',
'https://www.youtube.com/watch?v=8-mloCL49vs',
'https://www.youtube.com/watch?v=d6U_t524N0Q',
'https://www.youtube.com/watch?v=1BYr1br2Ee4',
'https://www.youtube.com/watch?v=w_ejwSACf_U'];


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
var express = require("express");
var app = express();
var request = require("request");
app.use(express.urlencoded({extended: true}));
var videos = ['https://www.youtube.com/watch?v=KbRtA_brCQ0',
'https://www.youtube.com/watch?v=k05i8bT_Pkg',
'https://www.youtube.com/watch?v=b5X7ZiAOkMU',
'https://www.youtube.com/watch?v=kHLHSlExFis',
'https://www.youtube.com/watch?v=8-mloCL49vs',
'https://www.youtube.com/watch?v=d6U_t524N0Q',
'https://www.youtube.com/watch?v=1BYr1br2Ee4',
'https://www.youtube.com/watch?v=w_ejwSACf_U'];



app.get("/", function(req,res){
getPlaylist(videos,res);

    
    
});

function generateURL(videos){
    
let urlRequest = "http://www.youtube.com/watch_videos?video_ids=";

videos.forEach(function(video){
    let key;
    if (video.match('v='))
     key = video.split('v=')[1];
    else if (video.match('be/'))
    key = video.split('be/')[1];
    
   urlRequest += ','+ key;
})
 return urlRequest;
}
    
function getPlaylist(videos,reso){
    var redirectn =0
    var request = require('request');
request({
        uri: generateURL(videos),
        followRedirect: function(response) {
            redirectn++;
            console.log("Redirecting to " + response.headers.location);
            if(redirectn==2) reso.send(response.headers.location);
            return true;
        }
    },
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
        reso.send(body);
        }
    }
);


}



//listener
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server has started");
});
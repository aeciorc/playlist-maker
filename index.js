    
var exports = module.exports  = {};
/** Main function
 * 
 *@params: 
 * list : a String of URLs separated by space, newline or commma
 * reso: resource object from an Express's route
 * 
 */
exports.getPlaylist =function(list, callback){
    var redirectn =0;
    var request = require('request');
var r = request({
        uri: generateURL(list),
        followRedirect: function(response) {
            redirectn++;
            if(redirectn==2) r =response.headers.location;
            return true;
        }
    },
    function(error, response, body) {
        
        if (error || response.statusCode != 200) {
            console.log("Something weird happened");
            callback();
        }
        else callback(processResult(r));
            
        
            
    }
);


}

/**
 * @params:
 *  list : a String of URLs separated by space, newline or commma
 * 
 * returns: a single URL string that can be used for the GET request on youtube's API
*/

function generateURL(list){
    
let videos= list.split(/[\s\r\n,]+/).filter(Boolean);

let urlRequest = "http://www.youtube.com/watch_videos?video_ids=";

videos.forEach(function(video){
    let key;
    if (video.match('v='))
     key = video.split('v=')[1];
    else if (video.match('be/'))
    key = video.split('be/')[1];
    
   urlRequest += ','+ key;
});
 return urlRequest;
}


/**
 * @params:
 *  playlist : URL string of the temporary playlist given by Youtube's API
 * 
 * returns: the URL with an added option to save it permanently 
*/
function processResult(playlist){
playlist = playlist.split('list=')[1];
return "https://www.youtube.com/playlist?list="+playlist+"&disable_polymer=true";

}




//testing:


var videos = "https://www.youtube.com/watch?v=KbRtA_brCQ0,https://www.youtube.com/watch?v=k05i8bT_Pkg,https://www.youtube.com/watch?v=b5X7ZiAOkMU";

exports.getPlaylist(videos, function(result){
    console.log("got this:",result);
});



## playlist-maker

 A simple node.js module to generate a youtube playlist from a string of whitespace or comma separated video URLs

#### Installation:

```bash
 npm install playlist-maker --save
```
#### Usage
```javasptcri
var playlistMaker = require("playlist-maker);
var videos = "https://www.youtube.com/watch?v=KbRtA_brCQ0,https://www.youtube.com/watch?v=k05i8bT_Pkg,https://www.youtube.com/watch?v=b5X7ZiAOkMU";

playlistMaker.getPlaylist(videos, function(result){
    console.log("Here's your playlist:",result);
});
```

#### Example:
See:
- https://github.com/aeciorc/playlist-maker/tree/test-deploy

Or see it running here:
- https://aeciorc-pmaker.herokuapp.com/

---
##### based on this answer: https://webapps.stackexchange.com/a/106340

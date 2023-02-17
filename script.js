
function IGNarticles() {
    fetch('api/articles.json').then(response => {
        // console.log(response);
        return response.json();
      }).then(data => {
        // console.log(data);
        for(var i=0; i<6;i++){
            // console.log(data.data[i].metadata.headline);
            document.getElementsByClassName("article-item")[i].innerHTML +=
            data.data[i].metadata.headline;
            document.getElementsByClassName("article-item")[i].setAttribute("href", `http://www.ign.com/videos/${data.data[i].metadata.slug}`);
        }
      }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });
}

function IGNvideos(){
    fetch('api/videos.json').then(response => {
        // console.log(response);
        return response.json();
      }).then(data => {
        // console.log(data);
        var videoNum = 5;
        var indexNum = 0;
        var maxVideo = data.count;
        var loaded = false;
        window.onload = createVideoElement(0,5);
        loremIpsum();
        setVideo(data, 0);
        var loadButton = loadMore(document.getElementById("side-wrapper"));
        loadButton.addEventListener("click", ()=>{
            createVideoElement(videoNum, maxVideo);
            setVideo(data, 0, 0, maxVideo);
            loadButton.remove();
            loaded = true;
        });
        var mainVideo = document.querySelector('.main-player video');
        mainVideo.addEventListener('ended', () => {
            indexNum++;
            if(!loaded){
                var sideVideo = document.querySelectorAll('.side-wrapper .video-wrapper');
                if(indexNum>5){
                    sideVideo[sideVideo.length-1].remove();
                    document.getElementById('button-container').style.display="none";
                    videoNum--;
                    removeBorder();
                }
                setVideo(data, indexNum, indexNum, indexNum+videoNum, 1);
            }else{
                setVideo(data, indexNum, indexNum, maxVideo, 1);
                var sideVideo = document.querySelectorAll('.side-wrapper .video-wrapper');
                console.log(sideVideo);
                console.log(sideVideo.length-1);
                sideVideo[sideVideo.length-1].remove();
            }
                mainVideo.pause();
                mainVideo.load();
                mainVideo.play();
                removeBorder();
        });
      }).catch(err => {
        console.log("Error Reading data " + err);
      });

}

function articleNavDivider(num){
    for(var i = 0; i<num-2;i++){
        document.getElementsByClassName("article-item")[i].style.borderRight = "1px solid darkgrey";
    }
}

function createVideoElement(startVideo,maxVideo){ //pass the element that the object is appended to and the url of the video. index is index of main video, default is 0
    var mainVideoParent = document.getElementById("main-player");
    var sideVideoParent = document.getElementById("side-wrapper");
    for(var i = startVideo; i < maxVideo; i++){
        var count = document.querySelectorAll('video');
        var wrapper = document.createElement('div');
        var video = document.createElement('video');
        var source = document.createElement('source');
        var title = document.createElement('div');
        var text = document.createElement('div');
        var textWrapper = document.createElement('div');
        textWrapper.className = "content-wrapper";
        title.className = "content-title";
        text.className = "content-text";
        textWrapper.appendChild(title);
        textWrapper.appendChild(text);
        wrapper.className = "video-wrapper";
        wrapper.id = i;
        wrapper.appendChild(video);
        video.appendChild(source);
        if(count.length == 0){
            mainVideoParent.appendChild(wrapper);
            mainVideoParent.appendChild(textWrapper);
        }else{
            sideVideoParent.appendChild(wrapper);
            wrapper.appendChild(textWrapper);
        }
    }
    // video.play();
}

//all contents are videos-- originally intended to autoplay the sideVideos on hover for more than 2 seconds
function setVideo(data, index = 0, videoStart = 0, videoEnd = 5, count = 1){ //index = index of main video in data array
    var title = document.querySelectorAll(".content-title");
    for(var i = videoStart; i < videoEnd; i++){
        var sources = document.querySelectorAll("source");
        var videos = document.querySelectorAll("video");
        if(videoEnd == count){
            break;
        }
        if(i == index){
            sources[0].src = data.data[i].assets[2].url;
            sources[0].type = "video/mp4";
            videos[0].poster = data.data[i].thumbnails[2].url;
            title[0].innerHTML = data.data[i].metadata.title;
            console.log("set main video",data.data[i].metadata.title, `to ${0}`);
        }else{
            sources[count].src = data.data[i].assets[0].url;
            sources[count].type = "video/mp4";
            videos[count].poster = data.data[i].thumbnails[2].url;
            title[count].innerHTML = data.data[i].metadata.title;
            console.log("set side Video",data.data[i].metadata.title , `to ${count}`);
            count++;
        }
    }
    setBorders();
    toggleControls();
}


function setBorders(){
    var sideElements = document.querySelectorAll('.video-wrapper');
    for(var i = 1;i < sideElements.length-1; i++){
        // console.log(sideElements[0]);
        sideElements[i].style.borderBottom = "1px solid lightgrey";
    }
}

function removeBorder(){
    var sideElements = document.querySelectorAll('.video-wrapper');
    sideElements[sideElements.length-1].style.borderBottom = "none";
}

function loremIpsum(){
    var main = document.querySelectorAll('.content-wrapper');
    main[0].style.display = 'block';
    var mainText = document.querySelectorAll('.content-text');
    mainText[0].innerHTML += "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras risus sapien, fringilla et lacus sit amet, rutrum tempus neque. Praesent est ante, porta et sem vitae, tempus viverra justo. Cras eros augue, dapibus nec consequat in, mollis vitae metus. Sed turpis massa, bibendum sit amet urna ac, ultrices sodales ex. Phasellus efficitur malesuada ante quis imperdiet. Sed et ante venenatis, pretium neque vitae, condimentum augue. Fusce sit amet massa quis ex dictum vestibulum. Sed lacinia ipsum sem, at dictum ex faucibus convallis. Integer dictum aliquam metus, sed dignissim orci congue non.";
}

function loadMore(){
    var parent = document.getElementById('article-main-side');
    var container = document.createElement('div')
    container.id = 'button-container';
    var button = document.createElement('button');
    button.id = 'load-button'
    button.innerHTML += "Load more";
    parent.appendChild(container);
    container.appendChild(button);
    return button;
}

function toggleControls(){
    var video = document.querySelector('.main-player video');
    video.setAttribute("controls", "controls");
    var play = document.createElement('button');
    var loop = document.createElement('button');
    // var volume = document.createElement('');
}

// function controls(){
//     var videoControls = document.querySelector('.control');
// }
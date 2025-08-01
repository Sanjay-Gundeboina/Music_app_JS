let playlist = [
    { title: " Taara Taara", artist: "MM Keeravani", src: "assets/song1.mp3", img: "assets/cover1.png" },
    { title: " Monica", artist: "Anirudh", src: "assets/song2.mp3", img: "assets/cover2.png" },
    { title: " Parichayamila", artist: "Hesham Abdul Wahab", src: "assets/song3.mp3", img: "assets/cover3.png" },
    { title: "Naa Koduka", artist: "Devi Sri Prasad", src: "assets/song4.mp3", img: "assets/cover4.png" },
    { title: "Anna Antene", artist: "Anirudh Ravichander", src: "assets/song5.mp3", img: "assets/cover5.png" },
    { title: "Chinni", artist: "Thaman S", src: "assets/song6.mp3", img: "assets/cover6.png" },
    { title: "Cheppavama", artist: "Thaman S", src: "assets/song7.mp3", img: "assets/cover7.png" },
    { title: "Kalalanni", artist: " Amrit Ramnath", src: "assets/song8.mp3", img: "assets/cover8.png" },  
    { title: "Guttakindha Gumpuchettlaninda ", artist: " Venkat Ajmeera", src: "assets/song9.mp3", img: "assets/cover9.png" },  
    { title: "Musi Musi Navvula", artist: "Harris Jayaraj", src: "assets/song10.mp3", img: "assets/cover10.png" },  
    { title: "Bulliguvva", artist: " Amrit Ramnath", src: "assets/song11.mp3", img: "assets/cover11.png" },  
    { title: "Gusa Gusa Lade", artist: " Mani Sharma", src: "assets/song12.mp3", img: "assets/cover12.png" },  
    { title: "Jatha Kalise", artist: "Devi Sri Prasad", src: "assets/song13.mp3", img: "assets/cover13.png" },  
    { title: "Naatu Naatu", artist: "M. M. Keeravani", src: "assets/song14.mp3", img: "assets/cover14.png" },  
];

let pos=0;
let is_playing=false;
let is_Repeat=false;
let is_shuffle=false;

let audio=document.createElement("audio");
document.body.appendChild(audio)

let play_btn=document.getElementById("play-btn");
let next_btn=document.getElementById("next-btn");
let prev_btn=document.getElementById("prev-btn");
let shuffle_btn=document.getElementById("shuffle-btn");
let repeat_btn=document.getElementById("repeat-btn");
let playlist_container=document.getElementById("playlist");
let volume_bar=document.getElementById("volume_bar");
let seek_bar=document.getElementById("seek_bar");
let current_time=document.getElementById("current_time");
let total_duration=document.getElementById("total_duration");


function render_playlist(){
    playlist_container.innerHTML="";
    playlist.forEach((song,index)=>{
        let li=document.createElement('li');
        li.textContent=`${song.title} - ${song.artist}`;
        // li.dataset.index = index;
        li.style.cursor='pointer';
        li.onclick=()=>{
            pos=index;
            loadSong(pos);
            audio.play();
            play_btn.innerHTML='<i class="fas fa-pause"></i>';
            is_playing=true;
            highlightCurrentSong();
        }
        playlist_container.append(li)
    });
}
render_playlist();

function loadSong(index){
    document.getElementById('song-title').textContent=playlist[index].title;
    document.getElementById('song-artist').textContent=playlist[index].artist;
    document.getElementById('title_image').src=playlist[index].img;
    audio.src=playlist[index].src;
    highlightCurrentSong();

}
loadSong(pos);

function highlightCurrentSong() {
    let items = playlist_container.getElementsByTagName('li');   
    for (let i = 0; i < items.length; i++) {
        items[i].style.background = (i === pos) ? "#ddd" : "";
    }
}


play_btn.onclick=()=>{
    if(!is_playing){
        audio.play();
        play_btn.innerHTML='<i class="fas fa-pause"></i>';
        is_playing=true;
    }
    else{
        audio.pause();
        play_btn.innerHTML='<i class="fas fa-play"></i>';
        is_playing=false;
    }
};

// next_btn.addEventListener('click', nextSong);
prev_btn.onclick=()=>{
    pos=(pos-1 + playlist.length) % playlist.length;
    loadSong(pos)
    audio.play()
    play_btn.innerHTML= '<i class="fas fa-pause"></i>';
    is_playing=true;
};

volume_bar.oninput=()=>{
    audio.volume=volume_bar.value/100;
    // console.log(volume_bar.value);
   
};

audio.ontimeupdate=()=>{
    seek_bar.value=(audio.currentTime/audio.duration)*100 || 0;
    current_time.textContent=formatTime(audio.currentTime);
    total_duration.textContent=formatTime(audio.duration);
}

function formatTime(sec){
    if(isNaN(sec)) return "0:00";
    let minutes=Math.floor(sec/60);
    let seconds=Math.floor(sec%60).toString().padStart(2,'0');
    return `${minutes}:${seconds}`;
}

seek_bar.oninput=()=>{
    audio.currentTime=(seek_bar.value/100)*audio.duration;
    // console.log(seek_bar.value)
}


repeat_btn.onclick=()=>{
    is_Repeat=!is_Repeat
    repeat_btn.style.color=is_Repeat? "green" :"black";

}

shuffle_btn.onclick=()=>{
    is_shuffle=!is_shuffle;
    shuffle_btn.style.color=is_shuffle? "green" :"black";
}

audio.onended=()=>{
    if(is_Repeat){
        audio.currentTime=0
        audio.play();
    }
    else{
        nextSong();
    }
}

next_btn.onclick=()=>{
    nextSong()
    // console.log("next song")
}

function nextSong(){
    if(is_shuffle){
        let newpos;
        do{
            newpos=Math.floor(Math.random()*playlist.length);
            // console.log(newpos)
        }while(newpos==pos);
        pos=newpos
    }
    else{
        pos=(pos+1)%playlist.length;
    }
    loadSong(pos)
    audio.play();
    play_btn.innerHTML= '<i class="fas fa-pause"></i>';
    is_playing=true

    // console.log("nextone")
}





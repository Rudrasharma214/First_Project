console.log("Let's write JavaScript")
let currentsong = new Audio();


function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}



async function getsongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text()
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    console.log(as)

    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }

    return songs
}
const playmusic = (track, pause=false)=>{
    // let audio = new Audio("/songs/" + track)
    currentsong.src = "/songs/" + track
    if (!pause) {
        currentsong.play()
        play.src = "img/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}
async function main() {

    
    let songs = await getsongs()

    playmusic(songs[0], true)

    console.log(songs)

    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li>
                            <img class="invert" src="img/music.svg" alt="">
                            <div class="info">
                                <div> ${song.replaceAll("%20"," ")} </div>
                                <div>Rudra</div>
                            </div>
                            <span class="p1" >Play Now</span>
                            <img class="invert" src="img/play.svg" alt="">
                        </li>`
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(function(e){
        e.addEventListener("click", element=> {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    play.addEventListener("click", ()=>{
        if(currentsong.paused){
            currentsong.play()
            play.src = "img/pause.svg"
        }
        else{
            currentsong.pause()
            play.src = "img/plays.svg"
        }
    })



    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    })


    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent ) / 100

    })


    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "0"
    })
    // var audio = new Audio(songs[2])
    // // audio.play()

    // audio.addEventListener("loadeddata", () => {
    //     let duration = audio.duration; //hold the duration of song in seconds
    //     console.log(duration)

    // })
}

main()
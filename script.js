console.log("Let's write JavaScript")

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
async function main() {
    let songs = await getsongs()
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

    var audio = new Audio(songs[2])
    // audio.play()

    audio.addEventListener("loadeddata", () => {
        let duration = audio.duration; //hold the duration of song in seconds
        console.log(duration)

    })
}

main()

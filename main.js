const playListButton = document.getElementById('playlist')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const shuffleButton = document.getElementById('shuffle')
const prevButton = document.getElementById('prev')
const playButton = document.getElementById('play')
const pauseButton = document.getElementById('pause')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const audio = document.getElementById('audio')
const progressBar = document.getElementById('progress-bar')
const currentProgress = document.getElementById('current-progress')

const currentTimeRef = document.getElementById('current-time')
const maxDuration = document.getElementById('max-duration')

const playlistContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playlistSongs = document.getElementById('playlist-songs')

//şrkı sırası
let index = 4


//döngü durumu
let loop =true

//şarkı listesi
const songLists =[
    {
        name: "Qumrike",
        link: "Music/Aynur Doğan - QumrikE.mp3",
        artist: "Aynur DOĞAN",
        Image: "Music/Aynur Doğan-qumrike.jpg",
    },
    {
        name: "Ay Dilbere",
        link: "Music/Aram Tigran Ay Dilberê.mp3",
        artist: "Aram TİGRAN",
        Image: "Music/aram-tigran.jpg",
    },
    {
        name: "Evin",
        link: "Music/Mem ARARAT - Evîn.mp3",
        artist: "Mem ARARAT",
        Image: "Music/Mem Ararat-evin.jpg",
    },
    {
        name: "Eman Dilo",
        link: "Music/Ciwan Haco - Eman Dilo [Official Audio].mp3",
        artist: "Ciwan HACO",
        Image: "Music/ciwan haco.jpg",
    },
    {
        name: "Xaçırek",
        link: "Music/Mem ARARAT - Xaçirek.mp3",
        artist: "Mem ARARAT",
        Image: "Music/Mem Ararat-Xaçırek.jpg",
    }
 
]
//Sesi Aç
const playAudio =() =>{
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
}


//ses kapatma
const pauseAudio = () =>{
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

//Sarkı atamaSI
const setSong = (arrayIndex) => {
    let {name, link, artist, Image} = songLists[arrayIndex]

    console.log(artist)
    audio.src = link
    songName.innerHTML =name
    songArtist.innerHTML =artist
    songImage.src = Image

    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration)
    }
    playlistContainer.classList.add('hide')
    //playAudio()

}


//Zaman Düzenleme
const timeFormatter = (timeInput) =>{
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" +minute :minute

    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" +second : second
    return `${minute}: ${second}`
}

//Önce ki şarkı
const previousSong =() =>{
    if (index>0){
        index-=1
    } else{
        index = songLists.length - 1
    }
    setSong(index)
}


//Sonraki şarkı
const nextSong = () =>{
    if (loop){
        if (index == (songLists.length - 1)){
            index =0
        } else{
            index = index + 1
        }
        setSong(index)
    }else{
        let randIndex = Math.floor(Math.random() * songLists.length) 
        setSong(randIndex)
    }
}




playButton.addEventListener('click', playAudio)

nextButton.addEventListener('click', nextSong)

prevButton.addEventListener('click', previousSong)

pauseButton.addEventListener('click',pauseAudio)

progressBar.addEventListener("click", event=>{
    let coordStart = progressBar.getBoundingClientRect().left

    let coordEnd = event.clientX

    let progress = (coordEnd - coordStart) / progressBar.offsetWidth
    currentProgress.style.width = progress * 100 + "%"

    audio.currentTime = progress * audio.duration

    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
})

setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3))*100 + "%"
}, 1000);

audio.addEventListener('timeupdate', ()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

//şarkı listesini aç
playListButton.addEventListener('click', () =>{
    playlistContainer.classList.remove('hide')
})

//listeyi kapat
closeButton.addEventListener('click', () => {
    playlistContainer.classList.add('hide')
})

//şarkı listesini oluştur
const initializePlaylist = () =>{
    for(let i in songLists){
        playlistSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
            <img src="${songLists[i].Image}"/>
        </div>
        <div class="playlist-song-details">
            <span id="playlist-song-name">
                ${songLists[i].name}
            </span>
            <span id="playlist-artist-name">
                ${songLists[i].artist}
            </span>
        </div>
        </li>
        `
    }
}

window.onload =() => {
    index = 0
    setSong(index)
    pauseAudio()
    initializePlaylist()
}
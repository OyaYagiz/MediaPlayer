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
let index


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
        name: "Qumrike",
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
    },
 
]

//Zaman Düzenleme
const timeFormatter = (timeInput) =>{
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" +minute :minute

    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" +second : second
    return `${minute}: ${second}`
}

//Sarkı atamaSI
const setSong = (arrayIndex) => {
    let {name, link, artist, Image} = songLists[arrayIndex]
    audio.src = link
    songName.innerHTML =name
    songArtist.innerHTML =artist
    songImage.src = Image

    audio.onloadeddata = () => {
        maxDuration.innerText = timeFormatter(audio.duration)
    }
    playlistContainer.classList.add('hide')
    // playAudio()

}

//Sesi Aç
const playAudio =() =>{
    audio.play()
    pauseButton.classListremove('hide')
    playButton.classList.add('hide')
}
window.onload =() => {
    index = 0
    setSong(index)
}
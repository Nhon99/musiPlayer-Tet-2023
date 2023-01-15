var playList = [
    {
        id:1,
        title:'Con Hứa Sẽ Về',
        img: '/asset/img/img1.jpg',
        music:'./asset/music/song1.mp3',
        author: 'Lê Bảo Bình'
    },
    {
        id:2,
        title:'Tết Này Con Sẽ Về',
        img: '/asset/img/img2.jpg',
        music:'./asset/music/song2.mp3',
        author: 'Bùi Công Nam'
    },
    {
        id:3,
        title:'Mình Cùng Về Quê Ăn Tết',
        img: '/asset/img/img3.jpg',
        music:'./asset/music/song3.mp3',
        author: 'Trương Thảo Nhi'
    },
    {
        id:4,
        title:'Phút Giây Giao Thừa',
        img: '/asset/img/img4.jpg',
        music:'./asset/music/song4.mp3',
        author: 'Ưng Hoàng Phúc, Thu thúy'
    },
    {
        id:5,
        title:'Waiting For You',
        img: '/asset/img/img5.jpg',
        music:'./asset/music/song5.mp3',
        author: 'MONO, onionn'
    },
    {
        id:6,
        title:'Cưới Thôi',
        img: '/asset/img/img6.jpg',
        music:'./asset/music/song6.mp3',
        author: 'Masew, Masiu, B Ray, TAP'
    },
    {
        id:7,
        title:'Dịu Dàng Em Đến',
        img: '/asset/img/img7.jpg',
        music:'./asset/music/song7.mp3',
        author: 'Erick, NinjaZ'
    }
]
//add song in list
const playListMusic = document.querySelector('.play_list')
let listItemMusic = playList.map(music)
function music(playItem){
        return `<div class="${playItem.id} play_item" id="Id${playItem.id}" >
        <div class="img_song" style="background-image: url(${playItem.img});"></div>
        <div class="content_song">
            <h4 class="name_song">${playItem.title}</h4>
            <h6 class="author_song">${playItem.author}</h6>
            </div>
            <i class="dow_song fa-solid fa-ellipsis"></i>
        </div>`
}

playListMusic.innerHTML=listItemMusic.join('')

function playingSongItem(value){
    if(value===1){
        document.querySelector(`#Id${playList[indexSong].id}`).classList.add('playing_item')
    }
    
    if(value===-1){
        document.querySelector(`#Id${playList[indexSong].id}`).classList.remove('playing_item')
    }
    
}
///-------------------------------

const play = document.querySelector('.play')
const next = document.querySelector('.next')
const back = document.querySelector('.back')
const repeat = document.querySelector('.repeat')
const repeatIcon = document.querySelector('.repeat_btn')
const random = document.querySelector('.random')
const randomIcon = document.querySelector('.random_btn')

const song = document.querySelector('.song')
const title = document.querySelector('.title')
const author = document.querySelector('.author')
const wave = document.querySelector('.wave')
const CD = document.querySelector('.cd')

const currentTimeMusic = document.querySelector('.currant_time')
const durationTimeMusic = document.querySelector('.duration')
const timeMusicBar = document.querySelector('.time_music')
const volumeMusic = document.querySelector('.volume_music')
const volumeIcon= document.querySelector('.valume_icon')

//const playListSong = document.querySelector('.play_list_song')

let isPlay = true;
let indexSong = 0;
let isRandom = true;
let isRepeat = true;

// repeat music
repeat.addEventListener('click', repeatIndexSong)
function repeatIndexSong(){
    if(isRepeat){       
        repeatIcon.setAttribute('style',`color: rgba(239, 95, 212, 0.5);`)
        isRepeat = false
    } else{
        repeatIcon.setAttribute('style',`color: rgba(0, 0, 0, 0.8);`)
        isRepeat=true
    }
    console.log(isRepeat)

}

//random index song
random.addEventListener('click', randomIndexSong)
function randomIndexSong(){
    if(isRandom){       
        randomIcon.setAttribute('style',`color: rgba(239, 95, 212, 0.5);`)
        isRandom = false
    } else{
        randomIcon.setAttribute('style',`color: rgba(0, 0, 0, 0.8);`)
        isRandom=true
    }
}

//random music
function randomMusic(){
    
    playingSongItem(-1) //hieu ung o play list

    let lengthPlayList = playList.length
    //console.log(lengthPlayList,indexSong)
    indexSong=Math.floor(Math.random()*(lengthPlayList))
    handleSong()
    isPlay = true;
    playMusic()
}
// next anh back music
next.addEventListener('click',()=>{
        if(isRandom){
            changeSong(1)
        } else{
            randomMusic() 
        }
    }
)
back.addEventListener('click',()=>{
        if(isRandom){
            changeSong(-1)
        } else{
            randomMusic()
        }
    }
)
//qua bai tu dong
song.addEventListener('ended',handleEnded)
function handleEnded(){
    if(isRandom && isRepeat){
        changeSong(1)
    } else{
        if(!isRandom && isRepeat){
            randomMusic()
        }
        if((!isRepeat && isRandom)|| (!isRepeat && !isRandom)){
            isPlay = true;
            playMusic()
        } 
    }
}

function changeSong(value){
    // trả về background cũ
    playingSongItem(-1)//hieu ung o play list

    if(value===1){
        indexSong++;
        if(indexSong === playList.length){
            indexSong=0;   
        }
    } else if(value===-1){
        indexSong--;
        if(indexSong < 0){
            indexSong=playList.length - 1;   
        }
    }
    //set background mới trong handleSong
    handleSong()
    isPlay = true;
    playMusic()
}

// handle song
function handleSong(){
    song.setAttribute('src',playList[indexSong].music);
    title.innerHTML= playList[indexSong].title;
    author.innerHTML = playList[indexSong].author;
    CD.setAttribute('style',`background-image: url(${playList[indexSong].img});`)
}

// Play music
play.addEventListener('click',playMusic)

function playMusic(){

    document.querySelector(`#Id${playList[indexSong].id}`).classList.add('playing_item')

    if(isPlay){
        song.play();
        isPlay=false;  
        //console.log('nhon')
        play.innerHTML='<i class="fa-solid fa-pause"></i>'
        wave.classList.add('wave_flex')
        CD.classList.replace('cd_pause','cd_running')

    } else{
        song.pause();
        isPlay=true;
        //console.log(123)
        play.innerHTML='<i class=" fa-solid fa-play"></i>'
        wave.classList.remove('wave_flex')
        CD.classList.replace('cd_running','cd_pause')
    }

}

//set time song and auto next song 
function displayTime(){
    const {currentTime, duration} = song;
    if(!duration){
        durationTimeMusic.textContent=`00:00`
    }
    currentTimeMusic.textContent=formatTime(currentTime)
    durationTimeMusic.textContent=formatTime(duration)

    timeMusicBar.max = duration
    timeMusicBar.value = currentTime

    if(currentTime===duration){
        changeSong(1)
    }
}
setInterval(displayTime, 500);

function formatTime(time){
    let minutes = Math.floor(time/60);
    let seconds =Math.floor(time%60);
    return `${minutes<10? '0'+ minutes:minutes}:${seconds<10? '0'+ seconds:seconds}`
    
}

//Set time song by change of input type range
timeMusicBar.addEventListener('change',()=>{
    setTimeout(song.currentTime=timeMusicBar.value,500)
})

// set volume song by event onChange of input type range in Index.html
function setVolume(){
    song.volume=volumeMusic.value

    if(song.volume===0){
        volumeIcon.innerHTML=`<i class="fa-solid fa-volume-xmark"></i>`
    } else{
        volumeIcon.innerHTML=`<i class="volume_icon fa-solid fa-volume-high"></i>`
    }
}

// play list song hieu ung click-------------------------------
const button = document.querySelector(".play_list");
const dowSong = document.querySelector('.dow_song')
const likedSong = document.querySelector('.like_song')
const navBarPlayList = document.querySelector('.nav_bar_list_song')

button.addEventListener("click", buttonClick);
function buttonClick(e){ 
    console.log(indexSong)
    playingSongItem(-1)
    let element = e.target;
    if(element===dowSong){
        //dien noi dung dowload vao
    } else{
        let elementPlaySong = element.closest('.play_item:not(.playing_item)')
        
        indexSong = elementPlaySong.classList[0]-1
        console.log(indexSong)
        handleSong()
        isPlay=true
        playMusic()
    }
}

//like song
let isLike = true;
likedSong.addEventListener('click',likeSong)
function likeSong(){
    if(isLike){
        likedSong.innerHTML=`<i class="liked fa-solid fa-heart"></i>`;
        isLike=false;
    } else{
        likedSong.innerHTML=`<i class="fa-regular fa-heart"></i>`;
        isLike=true;
    }
}

//show play list
const barPlayList = document.querySelector('.bar_play_list');
const showBar = document.querySelector('.show_bar_play_list')
const deleteBar = document.querySelector('.bar_down')

showBar.addEventListener('click',addBarPlayList)
function addBarPlayList(){
    barPlayList.classList.add('bar_play_list_display')
}

deleteBar.addEventListener("click", dropDowPlayList)
function dropDowPlayList(){
    barPlayList.classList.remove('bar_play_list_display')
}
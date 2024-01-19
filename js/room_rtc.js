const APP_ID=" YOUR ID"

let uid = sessionStorage.getItem('uid')
//create new uid for user if one is not there already
if(!uid){
    uid = String(Math.floor(Math.random()*10000))
    sessionStorage.setItem('uid', uid)
}

let token = null;
let client;

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
let roomId = urlParams.get('room')

if(!room){
    roomId = 'main'
}

//room.html?room=345

let localTracks = []
let remoteUsers = {}

let joinRoomInit = async()=>{
    client=AgoraRTC.createClient({mode:'rtc',codec:'vp8'})
    await client.join(APP_ID, roomId, token, uid)

    joinStream()
}

let joinStream = async()=> {
    localTracks= await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video__container" id="user-container-${uid}">
                    <div class="video-player" id="user-${uid}"></div>
                </div>`


    document.getElementsById('streams__container').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${uid}`)
}

joinRoomInit()
 const socket = io(); // this sends a connection request at the backend 

if(navigator.geolocation) {  // navigator is protery in the window objeet that contian information about the user envirnment   
    navigator.geolocation.watchPosition((position)=>{
        const {latitude, longitude}=position.coords;
        socket.emit("send-location",{latitude,longitude});
    },(err)=>{
        console.log(err);
    },{
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge:0
    }) // watchpositon take three things1) callback to perform action data extracted 2) error (optional) 3) setting (optinal)

}

const map=L.map("map").setView([0,0],16);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution: "OpenStreetMap"
}).addTo(map)

const markers={};

socket.on("receive-location",(data)=>{
    const { id, latitude, longitude}=data;
    console.log(id,latitude,longitude);
    map.setView([latitude, longitude]);
    if(markers[id]){
        markers[id].setLatLang([latitude, longitude]);
    }
    else{
        markers[id]= L.marker([latitude, longitude]).addTo(map);
    }
        
});

socket.on("user-disconnected",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})


// //user envirment 
// It refers to the conditions, settings, and resources of the system where the browser is running.
// This includes things like:

// Browser Information

// Type and version of browser (Chrome, Firefox, Safari)

// Rendering engine (Blink, Gecko, WebKit)

// Operating System (OS)

// Windows, macOS, Linux, Android, iOS

// Device Hardware

// CPU details (navigator.hardwareConcurrency)

// Available memory (navigator.deviceMemory)

// Battery status (navigator.getBattery())

// Network Status

// Online/offline (navigator.onLine)

// Connection type (navigator.connection)

// User Preferences

// Language (navigator.language)

// Time zone (indirectly via Intl.DateTimeFormat().resolvedOptions().timeZone)

// Permissions and Capabilities

// Whether cookies are enabled

// Access to geolocation, camera, microphone, clipboard, etc
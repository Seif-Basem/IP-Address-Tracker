//api
const entered_ip = document.getElementById('ip_address');
const search_btn = document.getElementById('search_btn');

let current_ip = document.getElementById('current_ip');
let current_town = document.getElementById('current_town');
let current_zone = document.getElementById('current_zone');
let current_isp = document.getElementById('current_isp');


search_btn.onclick = function () {
    getData();
}

function getData() {
    if (entered_ip.value == "") {
        current_ip.innerHTML = `No IP Enterd`;
        current_town.innerHTML = `No Location`;
        current_zone.innerHTML = `No Time`;
        current_isp.innerHTML = `No ISP`;
    }else {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_7ch7yZHPzGko5Ujmf1hYMjLYauxfD&ipAddress=${entered_ip.value}`).then((result) => {
            // console.log(result);
            let myData = result.json();
            // console.log(myData);
            return myData;
        }).then((address) => {
            current_ip.innerHTML = address.ip;
            current_town.innerHTML = `${address.location.city}, ${address.location.country} ${address.location.postalCode}`;
            current_zone.innerHTML = `UTC ${address.location.timezone}`;
            current_isp.innerHTML = address.isp;
            latt = address.location.lat;
            lngg = address.location.lng;
            //to put a marker on the map
            L.marker({lat: latt, lng: lngg}, {icon: iconLocation}).addTo(map);
            L.map('map').setView({lat: latt, lng: lngg});
        })
    }
}

//so we put 2 links in html head then, we make a div whit id=map
//then we made that var to call it
var map = L.map('map').setView([0, 0], 2);
//the img of the location marker
let iconLocation = L.icon({
    iconUrl: '../images/icon-location.svg',
    iconSize:     [25, 32], // size of the icon
    iconAnchor:   [25, 16], // point of the icon which will correspond to marker's location
});
//to put the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


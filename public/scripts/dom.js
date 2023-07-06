import { pubList } from "./api.js";


let tempPub = {
    id: "",
    name: "",
    brewery_type: "",
    address_1: "",
    address_2: "",
    address_3: "",
    city: "",
    state_province: "",
    postal_code: 0,
    country: "",
    longitude: 0,
    latitude: 0,
    phone: 0,
    website_url: "",
    state: "",
    street: ""
}
export let userList = [];
let markers = []
export function showPubs(){
    const container = document.getElementById("container");
    removeAllChildNodes(container);
    let count = 0;
    pubList.forEach(pub => {
        tempPub = pub;
        createCard(container, count);
        count++;
    });
}
function createCard(container, count){
    const div = document.createElement("div");
    div.classList.add("card");
    const name = document.createElement("h2");
    name.innerText = tempPub.name;
    const address = document.createElement("p");
    address.innerHTML = "Address:"
    const address1 = document.createElement("p");
    address1.innerHTML = tempPub.address_1;
    const city = document.createElement("p");
    city.innerText = tempPub.city;
    const state = document.createElement("p");
    state.innerText = tempPub.state;
    const phoneCase = document.createElement("p")
    phoneCase.innerText = "Phone Number: "
    const phone = document.createElement("a");
    phone.innerText = tempPub.phone;
    phone.href = "tel:"+tempPub.phone;
    phoneCase.appendChild(phone);
    const website = document.createElement("a");
    website.innerHTML = "website";
    website.href = tempPub.website_url;
    website.title = "website";
    website.target = "_blank";
    const form = document.createElement("form");
    form.setAttribute("id", count)
    if(container === document.getElementById("container")){
        form.addEventListener("submit", addToList);
    } else {
        document.getElementById('cHide2').style.display = 'block'
        form.addEventListener("submit", removeFromList);
    }
    form.setAttribute("type", "submit")
    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("value", count);
    const add = document.createElement("BUTTON");
    const up = document.createElement("BUTTON");
    const down = document.createElement("BUTTON");
    if(container === document.getElementById("container")){
        add.innerText ="Add to Your Crawl";
        form.classList.add("save");
    } else {
        form.classList.add("remove")
        add.innerText ="Remove";
        add.classList.add("remove");
        up.addEventListener('click', moveUp);
        up.innerText = "Move Up"
        up.classList.add("brewButton");
        up.setAttribute("id", count)
        down.addEventListener('click', moveDown);
        down.innerText = "Move Down"
        down.classList.add("brewButton");
        down.setAttribute("id", count)
    }
    add.classList.add("brewButton");
    div.appendChild(name);
    div.appendChild(address);
    div.appendChild(address1);
    div.appendChild(city);
    div.appendChild(state);
    div.appendChild(phoneCase);
    div.appendChild(website);
    if(container !== document.getElementById("container")){
        div.appendChild(up);
        div.appendChild(down);
    }
    form.appendChild(add);
    div.appendChild(form)
    
    container.appendChild(div);
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
let map;
export function addToList(e){
    e.preventDefault();
    let value = e.target.id;
    let contains = false;
    userList.forEach(element => {
        if(element.id === pubList[value].id){
            contains = true;
        }
    });
    if(!contains){
        userList.push(pubList[value])
        rebuildList();
    }
}
export function addToListFromDb(brewery){
    userList.push(brewery);
    placeMarker(brewery);
    tempPub = brewery;
    createCard(document.getElementById("saveCards"), userList.length-1);
}
export function removeFromList(e){
    e.preventDefault();
    let value = e.target.id
    userList.splice(value, 1);
    rebuildList();
    if(userList.length < 1){
        document.getElementById('cHide2').style.display = 'none'
    }
}
function rebuildList(){
    const parent = document.getElementById("saveCards");
    removeAllChildNodes(parent)
    setMapOnAll(null);
    let count = 0;
    userList.forEach(pub => {
        tempPub = pub;
        createCard(parent, count);
        count++;
        placeMarker(pub);
    });
}
export function passMap(newMap){
    map = newMap;
}
function setMapOnAll(map){
    markers.forEach(marker => {
        marker.setMap(map);
    });
}
async function placeMarker(pub){
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    let position = { lat: parseFloat(pub.latitude), lng: parseFloat(pub.longitude) }
    let newCenter = new google.maps.LatLng(position.lat, position.lng);
    map.setCenter(newCenter);
    map.setZoom(12);
    const marker = new AdvancedMarkerElement({
        map : map,
        position : position,
        title : pub.name + "\nPhone: " + pub.phone,
    });
    markers.push(marker);
}
export function moveUp(e){
    e.preventDefault();
    let index = parseInt(e.target.id);
    if(index > 0){
        tempPub = userList[index];
        userList[index] = userList[index-1];
        userList[index-1] = tempPub;
        rebuildList();
    } 
}
export function moveDown(e){
    e.preventDefault();
    let index = parseInt(e.target.id);
    if(index < userList.length -1){
        tempPub = userList[index];
        userList[index] = userList[index + 1];
        userList[index + 1] = tempPub;
        rebuildList();
    }
}

export function modalBuild(state){
    document.getElementById('modal').style.display = 'block';
    const parent = document.getElementById('savedLists');
    removeAllChildNodes(parent);
    for(let i = 0; i < state.listCount; i++){
        const option = document.createElement("option");
        option.value = i;
        option.innerHTML = "List " + i;
        parent.appendChild(option);
    }
    const option = document.createElement("option");
    option.value = state.listCount;
    option.innerHTML = "New List";
    parent.appendChild(option);
}
export function modifyList(list){
    userList = [];
    rebuildList();
}
export function printRoute(route){
    const parent = document.getElementById('container3');
    parent.style.display = 'block'
    removeAllChildNodes(parent);
    const distance = document.createElement('p');
    distance.innerText = "Total Distance: " + route.distance.text;
    parent.appendChild(distance);
    const time = document.createElement('p');
    time.innerText = "Average Walking Time: " + route.duration.text;
    parent.appendChild(time);
    route.steps.forEach(step => {
        const p = document.createElement('p');
        p.innerHTML = step.instructions;
        parent.appendChild(p);
    });
}
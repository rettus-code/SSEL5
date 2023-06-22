import { showPubs } from "./dom.js";

export let pubList = [];

export async function breweryLocator(url){
    fetch(url).then(response => response.json())
    .then(response => brewList(response) )
}
function brewList(response){
    pubList = [];
    response.forEach(pub => {
        pubList.push(pub)
    });
    showPubs();
}

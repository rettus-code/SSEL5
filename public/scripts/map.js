let map;

async function initMap() {
const { Map } = await google.maps.importLibrary("maps")
    map = new Map(document.getElementById("map"), {
        center: { lat: 1, lng: 0 },
        zoom: 1,
        mapId: '6dd56c7e460c16d5'
    });
    passMap(map);
    let infoBoxDiv = document.createElement('div');
    makeInfoBox(infoBoxDiv, map);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);
}
function makeInfoBox(controlDiv, map) {
    // Set CSS for the control border.
    let controlUI = document.createElement('div');
    controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '2px';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '10px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);
  
    // Set CSS for the control interior.
    // var controlText = document.createElement('div');
    // controlText.style.color = 'rgb(25,25,25)';
    // controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    // controlText.style.fontSize = '100%';
    // controlText.style.padding = '6px';
    // controlText.textContent =
    //     'The map shows all clicks made in the last 10 minutes.';
    // controlUI.appendChild(controlText);
  }
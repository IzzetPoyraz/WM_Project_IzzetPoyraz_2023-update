import { fetchCoordinates } from './location.js';

function initMap() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  fetchCoordinates(id)
    .then(coordinates => {
      if (coordinates) {
        const { lat, lng } = coordinates;
        console.log(lat);
        console.log(lng);

        const myLatLng = { lng, lat };
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 16,
          center: myLatLng,
        });

        new google.maps.Marker({
          position: myLatLng,
          map,
          title: "Locatie",
        });
      } else {
        console.log("Geen coördinaten beschikbaar.");
      }
    })
    .catch(error => {
      console.error("Fout bij het ophalen van de coördinaten:", error);
    });
}

window.initMap = initMap;

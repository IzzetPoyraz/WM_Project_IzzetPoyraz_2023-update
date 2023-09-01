'use strict';

import { fetchCoordinates } from './location.js';

(async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const response = await fetch(`https://data.stad.gent/api/records/1.0/search/?dataset=bloklocaties-gent&q=recordid:${id}`);
  const response2 = await fetch(`https://data.stad.gent/api/records/1.0/search/?dataset=cafes-gent&q=&rows=20`);
  const data2 = await response2.json();
  console.log(data2);
  const data = await response.json();

  const detailsContainer = document.getElementsByTagName('main')[0];
  if (data.records.length > 0) {
    const record = data.records[0];
    const title = record.fields.label_1;
    const title2 = record.fields.titel;
    const address = record.fields.adres;
    const image = record.fields.teaser_img_url;
    const capaciteit = record.fields.totale_capaciteit;
    const gereserveerdePlaatsen = record.fields.gereserveerde_plaatsen;
    const reserverbaar = record.fields.tag_1;
    const reserveerLink = record.fields.lees_meer;

    const detailsDiv = document.createElement('div');
    detailsDiv.innerHTML = `
      <div class="content">
        <div class="img">
          <img class="block-image" src="${image}" alt="Placeholder image">
        </div>
        <div>
          <h2 class="main-titel">${title}</h2>
          <h3 class="titel">${title2}</h3>
          <p class="plaats">${address}</p> 
          <p class="capaciteit">capaciteit plaatsen : ${gereserveerdePlaatsen}/${capaciteit}</p>
        </div>
      </div>
      <div id="randomCafesContainer"></div>

    `;

    if (reserverbaar === "Reserveerbaar") {
      detailsDiv.innerHTML = `
        <div class="content">
          <div class="img">
            <img class="block-image" src="${image}" alt="Placeholder image">
          </div>
          <div class="content-cl">
            <div>
              <h2 class="main-titel">${title}</h2>
              <h3 class="titel">${title2}</h3>
              <p class="plaats">${address}</p> 
              <p class="capaciteit">capaciteit : ${gereserveerdePlaatsen}/${capaciteit}</p>
            </div>
            <div class="reserveerBtn" >
              <a href="${reserveerLink}" class="reserveren"> Reserveren </a>
            </div>
          </div>
        </div>
        <h5>Aangeraden cafe's<h5>
        <div id="randomCafesContainer"></div>

      `;
    }

    detailsContainer.appendChild(detailsDiv);

    const coordinates = await fetchCoordinates(id);

    if (coordinates) {
      const { lat, lng } = coordinates;

      function loadScript() {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDj_tx3RiZTmDnG_UtuRHxWHHcnscDy2P8&callback=initMap`;
        script.defer = true;
        script.async = true;
        document.head.appendChild(script);
      }
      loadScript();

      const randomCafes = getRandomCafes(data2.records, 3);
      displayRandomCafes(randomCafes);
    } else {
      detailsContainer.textContent = 'Geen gegevens gevonden.';
    }

  } else {
    detailsContainer.textContent = 'Geen gegevens gevonden.';
  }

})();

function getRandomCafes(cafes, count) {
  const shuffled = cafes.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function displayRandomCafes(cafes) {
  const container = document.getElementById('randomCafesContainer');

  container.innerHTML = '';

  cafes.forEach(cafe => {
    const cafeDiv = document.createElement('div');
    cafeDiv.classList.add('cafe');

    const name = cafe.fields.ctcname;
    const img = cafe.fields.iconshort;

    cafeDiv.innerHTML = `
      <div class="imgcoffee">
      <img src="http://${img}"></img>
      </div>
      <h3>${name}</h3>
      <p>${cafe.fields.address}</p>
    `;

    container.appendChild(cafeDiv);
  });
}


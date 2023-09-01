(async function () {
    async function getBloklocatie() {
      const response = await fetch("https://data.stad.gent/api/records/1.0/search/?dataset=bloklocaties-gent&q=&rows=60");
      const data = await response.json();
      console.log(data.records);
      const blockLocationsDiv = document.getElementById("flex-container");
      const searchInput = document.getElementById("searchInput");
  
      function filterBloklocaties() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredBloklocaties = data.records.filter(record =>
          record.fields.label_1.toLowerCase().includes(searchTerm) ||
          record.fields.titel.toLowerCase().includes(searchTerm) ||
          record.fields.adres.toLowerCase().includes(searchTerm)
        );
  
        blockLocationsDiv.innerHTML = "";
  
        filteredBloklocaties.forEach(record => {
          const title = record.fields.label_1;
          const title2 = record.fields.titel;
          const address = record.fields.adres;
          const image = record.fields.teaser_img_url;
          const location = record.fields.location;
  
          const blockDiv = document.createElement("div");
          blockDiv.classList.add("main-cl-box");
          blockDiv.innerHTML = `
            <div class="content">
              <div class="img">
                <img class="block-image" src="${image}" alt="Placeholder image">
              </div>
              <h2 class="main-titel">${title}</h2>
              <h3 class="titel">${title2}</h3>
              <p class="plaats">${address}</p> 
            </div>
            <a class="more-info" href="detail.html?id=${record.recordid}">Meer informatie</a>
          `;
  
          blockLocationsDiv.appendChild(blockDiv);
        });
      }
  
      searchInput.addEventListener("input", filterBloklocaties);
      filterBloklocaties();
    }
  
    getBloklocatie();
  })();
  
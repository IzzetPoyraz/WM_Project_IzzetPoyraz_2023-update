export async function fetchCoordinates(id) {
    const response = await fetch(`https://data.stad.gent/api/records/1.0/search/?dataset=bloklocaties-gent&q=recordid:${id}`);
    const data = await response.json();
  
    if (data.records.length > 0) {
      const record = data.records[0];
      const lat = record.fields.geo_punt[0];
      const lng = record.fields.geo_punt[1];
      return { lat, lng };
    } else {
      return null;
    }
  }
  
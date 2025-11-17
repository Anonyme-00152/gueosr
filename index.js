let panorama;

// Limites géographiques de chaque ville
const cityBounds = {
  paris: { north: 48.9020, south: 48.8156, east: 2.4699, west: 2.2257 },
  lyon: { north: 45.8357, south: 45.7076, east: 4.9446, west: 4.7681 },
  marseille: { north: 43.3947, south: 43.2085, east: 5.5320, west: 5.2130 },
  strasbourg: { north: 48.646, south: 48.519, east: 7.828, west: 7.664 }
};

// Initialisation du panorama
window.initialize = () => {
  panorama = new google.maps.StreetViewPanorama(
    document.getElementById("street-view")
  );

  document.getElementById("btn-random").addEventListener("click", newPosition);
  newPosition(); // Génère une position au chargement
};

// Génère une position aléatoire dans la ville sélectionnée
function newPosition() {
  const city = document.getElementById("city-select").value;
  const bounds = cityBounds[city];

  const randomLat = Math.random() * (bounds.north - bounds.south) + bounds.south;
  const randomLng = Math.random() * (bounds.east - bounds.west) + bounds.west;

  const streetService = new google.maps.StreetViewService();

  streetService.getPanorama(
    {
      location: { lat: randomLat, lng: randomLng },
      radius: 200
    },
    (data, status) => {
      if (status === "OK") {
        panorama.setPano(data.location.pano);
        panorama.setPov({ heading: 0, pitch: 0 });
        panorama.setVisible(true);
      } else {
        // Si pas de Street View disponible, on relance
        newPosition();
      }
    }
  );
}

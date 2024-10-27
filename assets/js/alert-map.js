const locationsData = {
    "zonasDeRisco": [
      { "lat": -30.0346, "lng": -51.2177, "popup": "Zona de Risco 1: Área sujeita a enchente" },
      { "lat": -29.6884, "lng": -53.8069, "popup": "Zona de Risco 2: Alerta de enchente" },
      { "lat": -31.7654, "lng": -52.3371, "popup": "Zona de Risco 3: Alto risco de alagamento" }
    ],
    "abrigosTemporarios": [
      { "lat": -30.035, "lng": -51.22, "popup": "Abrigo Temporário 1: Escola Municipal" },
      { "lat": -29.92, "lng": -51.18, "popup": "Abrigo Temporário 2: Centro Comunitário" }
    ],
    "pontosDeColeta": [
      { "lat": -30.04, "lng": -51.23, "popup": "Ponto de Coleta 1: Ginásio Municipal" },
      { "lat": -29.75, "lng": -52.25, "popup": "Ponto de Coleta 2: Igreja do Bairro" }
    ]
  };
  

document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map').setView([-30.0346, -51.2177], 7);
  
    // Camada base do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  
    // Criando camadas vazias para zonas de risco, abrigos e pontos de coleta
    const zonasDeRisco = L.layerGroup();
    const abrigosTemporarios = L.layerGroup();
    const pontosDeColeta = L.layerGroup();
  
    // Populando a camada de Zonas de Risco
    locationsData.zonasDeRisco.forEach(zone => {
      L.circle([zone.lat, zone.lng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 5000
      }).bindPopup(zone.popup).addTo(zonasDeRisco);
    });
  
    // Populando a camada de Abrigos Temporários
    locationsData.abrigosTemporarios.forEach(abrigos => {
      L.marker([abrigos.lat, abrigos.lng])
        .bindPopup(abrigos.popup)
        .addTo(abrigosTemporarios);
    });
  
    // Populando a camada de Pontos de Coleta
    locationsData.pontosDeColeta.forEach(ponto => {
      L.marker([ponto.lat, ponto.lng])
        .bindPopup(ponto.popup)
        .addTo(pontosDeColeta);
    });
  
    // Adicionando controles de camadas ao mapa
    const overlayMaps = {
      "Zonas de Risco": zonasDeRisco,
      "Abrigos Temporários": abrigosTemporarios,
      "Pontos de Coleta": pontosDeColeta
    };
    L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);
  
    // Exibindo todas as camadas no carregamento inicial
    zonasDeRisco.addTo(map);
    abrigosTemporarios.addTo(map);
    pontosDeColeta.addTo(map);
  });
  
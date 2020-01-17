var map = L.map('map').fitWorld();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3Nhd3llcjQiLCJhIjoiY2syc2g2bnlzMGtyeDNubW55bHRzNnkzOSJ9.WZ63B0C4v437JrMyODN-6g', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v10',
}).addTo(map);

map.locate({setView: true, maxZoom: 16});

const mapsOptions =  [
    {
        name: "Standard",
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    },
    {
        name: "Dark Mode",
        url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    },
    {
        name: "CyclOSM",
        url: "https://b.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    },
    {
        name: "Humanitarian",
        url: "https://tile-b.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    },
];

let map;
let currentTileLayer;

window.addEventListener('load', function () {
    map = L.map('map', {
        center: [-14.2350, -51.9253],
        zoom: 5
    });

    currentTileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
});


function changeMapType(type) {
    map.removeLayer(currentTileLayer);
    currentTileLayer = L.tileLayer(type.url, {
        maxZoom: 19,
        attribution: type.attribution
    }).addTo(map)
};


function changeOption(option) {
    const detailsContainer = document.getElementsByClassName('options-details-container')[0];

    const currentOption = detailsContainer.getAttribute('currentOption');

    if(currentOption == option) {
        detailsContainer.style.display = 'none';

        detailsContainer.removeAttribute('currentOption');

        return;
    };

    document.getElementsByClassName('options-title')[0].textContent = option[0].toUpperCase() + option.slice(1);
    

    detailsContainer.setAttribute('currentOption', option);
    detailsContainer.style.display = 'block';

    const detailsBody = document.getElementsByClassName('options-details-container-body')[0];

    while (detailsBody.firstChild) {
        detailsBody.removeChild(detailsBody.firstChild);
    };
    

    detailsBody.currentOption = option;

    mapsOptions.forEach(item => {
        const div = document.createElement('div');

        div.textContent = item.name;

        div.onclick = () => {
            changeMapType(item)
        };

        detailsBody.appendChild(div);
    });

}



    // const southWest = L.latLng(-33.7500, -73.9830);
    // const northEast = L.latLng(5.2718, -34.7930);
    // const bounds = L.latLngBounds(southWest, northEast);

    // map.setMaxBounds(bounds);
    // map.on('drag', function() {
    //     map.panInsideBounds(bounds, { animate: false });
    // });

    // var marker = L.marker([51.5, -0.09]).addTo(map); // add marker to points of disaster;
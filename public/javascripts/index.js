import Map from './map.js';
import Layers from './layers.js';


let map;

const layers = new Layers()

window.addEventListener('load', function () {
    loadMap();
});

function loadMap () {
    map = new Map();

    addTomtom();
};

function changeMapType(_type) {
    map.removeLayer();

    map.setLayer(_type);
};

function switchLayer(_type) {
    const name = _type.name.replaceAll(' ', '');

    const isActive = !!layers['get' + name](map.getMap());

    if(isActive) {
        layers['remove' + name](map.getMap());

        return;
    };
    
    layers['set' + name](map.getMap());
    
};


function addTomtom () {
    layers.setTomtomTraffic(map.getMap());
};

function removeTomtom () {
    layers.removeTomtomTraffic(this.getMap());
    
};

function clearOptions (option) {
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
};

window.changeOption = function (option) {
    clearOptions(option);

    const detailsBody = document.getElementsByClassName('options-details-container-body')[0];

    detailsBody.currentOption = option;

    const mapsOptions = map.getMapOptions();
    const layerOptions = layers.getLayersOptions();


    const arrayOptions = option == 'maps' ? mapsOptions : layerOptions;

    arrayOptions.forEach(item => {
        const div = document.createElement('div');

        div.textContent = item.name;


        div.onclick = () => {
            if(option == 'maps') {
                changeMapType(item);
            } else {
                switchLayer(item);
            }
        };

        detailsBody.appendChild(div);
    });

};
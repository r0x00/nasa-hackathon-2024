import Map from './map.js';
import Layers from './layers.js';


let map;

const layers = new Layers()

window.addEventListener('load', function () {
    loadMap();
});

async function loadMap () {
    map = new Map();
    
    await layers.getSettings();
    
    tomtom.addTraffic();
    tomtom.addIncident();
    wildFire.add();
    airQuality.add();
};

function changeMapType(_type) {
    map.removeLayer();
    map.setLayer(_type);


    if(_type.name == 'Dark Mode') {
        document.getElementsByTagName('body')[0].classList.add('dark-mode')
    }  else {
        document.getElementsByTagName('body')[0].classList.remove('dark-mode')
    }

    if(tomtom.getTraffic()) {
        tomtom.removeTraffic();
        tomtom.addTraffic();
    };

    if(tomtom.getIncident()) {
        tomtom.removeIncident();
        tomtom.addIncident();
    };

    if(wildFire.get()) {
        wildFire.remove();
        wildFire.add();
    };

    if(airQuality.get()) {
        airQuality.remove();
        airQuality.add();
    };
};

function switchLayer(_type) {
    const name = _type.name.replaceAll(' ', '');
    const el = document.getElementById(name);

    const isActive = !!layers['get' + name](map.getMap());

    if(isActive) {
        el.classList.add('inactive');
        layers['remove' + name](map.getMap());

        return;
    };
    
    layers['set' + name](map.getMap());

    el.classList.remove('inactive');
};

const tomtom = {
    getTraffic: function () {
        return layers.getTomtomTraffic();
    },
    
    addTraffic: function () {
        layers.setTomtomTraffic(map.getMap());
    },

    removeTraffic: function () {
        layers.removeTomtomTraffic(map.getMap());
    },

    getIncident: function () {
        return layers.getTomtomIncident();
    },

    addIncident: function () {
        layers.setTomtomIncident(map.getMap());
    },

    removeIncident: function () {
        layers.removeTomtomIncident(map.getMap());
    },
};

const wildFire = {
    get: function() {
        return layers.getWildFire();
    },

    add: function() {
        layers.setWildFire(map.getMap());
    },

    remove: function() {
        layers.removeWildFire(map.getMap());
    }
};


const airQuality = {
    get: function() {
        return layers.getAirQuality();
    },

    add: function() {
        layers.setAirQuality(map.getMap());
    },

    remove: function() {
        layers.removeAirQuality(map.getMap());
    }
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

        if(option != 'maps') {
            div.innerHTML = `${item.name} <span class="options-details-container-body-zoom">(min zoom: ${item.minZoom})<span>`;
        };
    
        const name = item.name.replaceAll(' ', '');
        div.setAttribute('id', name);

        if(option == 'layers' && !layers['get' + name]()) {
            div.classList.add('inactive')
        };

        div.onclick = () => {
            if(option == 'maps') {
                changeMapType(item);
            } else {
                switchLayer(item);
            };
        };

        detailsBody.appendChild(div);
    });
};
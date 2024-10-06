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

    const options = [ 
        { type: tomtom, get: "getTraffic", add: "addTraffic", remove: "removeTraffic" },
        { type: tomtom, get: "getIncident", add: "addIncident", remove: "removeIncident" },
        { type: wildFire, get: "get", add: "add", remove: "remove" },
        { type: airQuality, get: "get", add: "add", remove: "remove" },
        { type: temperature, get: "get", add: "add", remove: "remove" },
        { type: precipitation, get: "get", add: "add", remove: "remove" },
        { type: seaLevelPressure, get: "get", add: "add", remove: "remove" },
        { type: clouds, get: "get", add: "add", remove: "remove" },
        { type: windSpeed, get: "get", add: "add", remove: "remove" },
    ];

    for(const o of options) {
        if(o.type[o.get]()) {
            o.type[o.remove]();
            o.type[o.add]();
        };
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

const temperature = {
    get: function() {
        return layers.getTemperature();
    },

    add: function() {
        layers.setTemperature(map.getMap());
    },

    remove: function() {
        layers.removeTemperature(map.getMap());
    }
};

const precipitation = {
    get: function() {
        return layers.getPrecipitation();
    },

    add: function() {
        layers.setPrecipitation(map.getMap());
    },

    remove: function() {
        layers.removePrecipitation(map.getMap());
    }
};

const seaLevelPressure = {
    get: function() {
        return layers.getSeaLevelPressure();
    },

    add: function() {
        layers.setSeaLevelPressure(map.getMap());
    },

    remove: function() {
        layers.removeSeaLevelPressure(map.getMap());
    }
};

const clouds = {
    get: function() {
        return layers.getClouds();
    },

    add: function() {
        layers.setClouds(map.getMap());
    },

    remove: function() {
        layers.removeClouds(map.getMap());
    }
};

const windSpeed = {
    get: function() {
        return layers.getWindSpeed();
    },

    add: function() {
        layers.setWindSpeed(map.getMap());
    },

    remove: function() {
        layers.removeWindSpeed(map.getMap());
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

        let innerHTML = `<p class="no-margins">${item.name}</p>`;

        if(item.minZoom) innerHTML += ` <span class="options-details-container-body-zoom">(min zoom: ${item.minZoom})</span>`;
        if(item.maxZoom) innerHTML += ` <span class="options-details-container-body-zoom">(max zoom: ${item.maxZoom})</span>`;

        div.innerHTML = innerHTML;

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
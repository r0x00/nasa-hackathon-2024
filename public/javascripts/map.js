export default class Map {
    mapsOptions = [
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

    static map;

    static layer;

    maxZoom = 19;

    constructor() {
        this.map = L.map('map', {
            center: [-14.2350, -51.9253],
            zoom: 5,
        });

        const currentMap = this.mapsOptions[0];

        this.layer = L.tileLayer(currentMap.url, {
            maxZoom: this.maxZoom,
            attribution: currentMap.attribution
        }).addTo(this.map);
    };

    getMap () {
        return this.map
    };

    getLayer () {
        return this.layer
    };

    setLayer(_layer) {
        this.layer = L.tileLayer(_layer.url, {
            maxZoom: this.maxZoom,
            attribution: _layer.attribution
        }).addTo(this.map);
    };

    removeLayer() {
        this.map.removeLayer(this.layer);
        
        this.layer = undefined;
    };

    getMapOptions () {
        return this.mapsOptions;
    };
};
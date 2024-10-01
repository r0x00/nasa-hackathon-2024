export default class Layers {
    layersOptions = [
        {
            name: "Tomtom Traffic",
            url: `https://api.tomtom.com/traffic/map/4/tile/flow/absolute/{z}/{x}/{y}.png?key=${environments.TOMTOM_KEY}`,
            attribution: 'TOMTOM Traffic'
        },

        {
            name: "Tomtom Incidents",
            url: `https://api.tomtom.com/traffic/map/4/tile/incidents/absolute/{z}/{x}/{y}.png?key=${environments.TOMTOM_KEY}`,
            attribution: 'TOMTOM Incidents'
        },
    ];

    minZoom = 14;

    static tomtomTraffic;

    static tomtomIncident;

    setTomtomTraffic (_map) {
        const data = this.layersOptions[0]; //this.layerOptions.filter((l) => l.name != "Tomtom Traffic");

        this.tomtomTraffic = L.tileLayer(data.url, {
            minZoom: this.minZoom,
            attribution: data.attribution
        }).addTo(_map);
    };

    getTomtomTraffic() {
        return this.tomtomTraffic;
    };

    removeTomtomTraffic (_map) {
        _map.removeLayer(this.tomtomTraffic);
        
        this.tomtomTraffic = undefined;
    };


    setTomtomIncident (_map) {
        const data = this.layersOptions[1]; //this.layerOptions.filter((l) => l.name != "Tomtom Incidents");

        this.tomtomIncident = L.tileLayer(data.url, {
            minZoom: this.minZoom,
            attribution: data.attribution
        }).addTo(_map);
    };


    getTomtomIncident () {
        return this.tomtomIncident;
    };

    removeTomtomIncident (_map) {
        _map.removeLayer(this.tomtomIncident);
        
        this.tomtomIncident = undefined;
    };

    getLayersOptions () {
        return this.layersOptions
    };
};
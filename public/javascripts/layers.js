export default class Layers {
    layersOptions = [
        {
            name: "Tomtom Traffic",
            url: `https://api.tomtom.com/traffic/map/4/tile/flow/absolute/{z}/{x}/{y}.png?key={{TOMTOM_KEY}}`,
            attribution: 'TOMTOM Traffic',
            minZoom: 14
        },

        {
            name: "Tomtom Incident",
            url: `https://api.tomtom.com/traffic/map/4/tile/incidents/{z}/{x}/{y}.pbf?key={{TOMTOM_KEY}}`,
            attribution: 'TOMTOM Incident',
            minZoom: 14
        },

        {
            name: "Wild Fire",
            url: 'https://tiles.globalforestwatch.org/nasa_viirs_fire_alerts/v20230901/dynamic/{z}/{x}/{y}.pbf',
            attribution: 'Map data © NASA, Global Forest Watch',
            minZoom: 8
        },

        {
            name: "Air Quality",
            url: 'https://tiles.aqicn.org/tiles/usepa-aqi/{z}/{x}/{y}.png',
            attribution: 'Air Quality data © World Air Quality Index',
            minZoom: 8
        },

    ];

    minZoom = 14;

    static tomtomTraffic;

    static tomtomIncident;

    static wildFire;

    static airQuality;

    async getSettings () {
        const result = await fetch("/api/settings");

        const data = await result.json();

        for(const l of this.layersOptions) {
            for( const d of Object.keys(data)) {
                l.url = l.url.replaceAll("{{" + d + "}}",  data[d])
            };
        };
    };

    setTomtomTraffic (_map) {
        const data = (this.layersOptions.filter((l) => l.name == "Tomtom Traffic"))[0];

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
        const data = (this.layersOptions.filter((l) => l.name == "Tomtom Incident"))[0];

        this.tomtomIncident = L.vectorGrid.protobuf(data.url, {
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

    setWildFire (_map) {
        const data = (this.layersOptions.filter((l) => l.name == "Wild Fire"))[0];

        this.wildFire = L.vectorGrid.protobuf(data.url, {
            vectorTileLayerStyles: {
                nasa_viirs_fire_alerts: {
                    fillColor: 'red',
                    fill:true, 
                    color: 'red',   
                    weight: 1,           
                    fillOpacity: 0.3,   
                    opacity: 1,
                    innerWidth: 1,
                    radius: 5, 
                }
            },
            minZoom: 8,
            attribution: data.attribution
        }).addTo(_map);
    };

    getWildFire () {
        return this.wildFire;
    };

    removeWildFire (_map) {
        _map.removeLayer(this.wildFire);
        
        this.wildFire = undefined;
    };

    setAirQuality (_map) {
        const data = (this.layersOptions.filter((l) => l.name == "Air Quality"))[0];

        this.airQuality = L.tileLayer(data.url, {
            minZoom: 8,
            attribution: data.attribution
        }).addTo(_map);
    };

    getAirQuality() {
        return this.airQuality;
    };

    removeAirQuality (_map) {
        _map.removeLayer(this.airQuality);
        
        this.airQuality = undefined;
    };

    getLayersOptions () {
        return this.layersOptions
    };
};
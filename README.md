# Nasa Hackathon 2024

Welcome to the **Nasa Hackathon 2024 project**! This application was created for the NASA hackathon in 2024 and allows for interactive visualization of a GIS (Geographic Information System) map.


## Features
- Interactive Visualization: Explore a dynamic map with various data layers.
- Information Layers: Access a variety of data, including:
  - Real-time weather
  - Air quality
  - Incidents (in general)
  - Traffic conditions
  - Traffic incidents

## How to Use

### Docker
1- Start docker container

```
docker run -d -p 80:3000 r0x00/nasa2024

```
2- Open localhost on the browser to access the app

*Note: You can modify the configurations by using a docker volume with an .env file.*

### Cloning

1- Clone the repository

```
git clone https://github.com/r0x00/nasa-hackathon-2024.git

```
2- Install dependencies:

```
cd Nasa-Hackathon-2024
yarn install
```
3- Start the application:

```
npm start
```
4- Open localhost:3000 on the browser to access the app

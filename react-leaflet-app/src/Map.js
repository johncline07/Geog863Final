// Map.js
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import randomColor from 'randomcolor';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
//import css
import "leaflet/dist/leaflet.css";


// Import GeoJSON files
import { elmZones } from './data/elementary_Zones.js';
import { elmPoints } from './data/elementary_Points.js';
import schoolsIcon from './schools.svg';

import './App.css';


const CustomLeafletMap = () => {

  function getRandomPolygonColor() {
    return randomColor();
  }
  
  function polygonStyle(feature) {
    const schoolName = feature.properties.school_nam;

    if (schoolName) {
      const popupContent = `<b>${schoolName} Attendance Zone</b>`;

      // Bind the popup here.
      feature.properties.popupContent = popupContent;

      return {
        fillColor: getRandomPolygonColor(feature),
        color: 'black',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.5,
      };
    }

    return {
      fillColor: getRandomPolygonColor(feature),
      color: 'black',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.5,
    };
  }

  function pointToLayer(feature, latlng) {
    const schoolName = feature.properties.SCHOOL;
    const schoolAdd = feature.properties.ADDRESS;
    const customIcon = new L.Icon({
      iconUrl: schoolsIcon,
      iconSize: [24, 24],
    });

    const marker = L.marker(latlng, {
      icon: customIcon,
    });

    if (schoolName && schoolAdd) {
      const popupContext = `<b>${schoolName}</b><br>${schoolAdd}<br>`;
      marker.bindPopup(popupContext);
    }

    return marker;
  }

  return (
    <MapContainer
      center={[36.07, -79.79]}
      zoom={12}
      className='leaflet-container'
      style={{
        height: '100vh',
      }}
    >
      {/* GeoJSON layers */}
      <GeoJSON
        data={elmZones}
        style={polygonStyle}
        onEachFeature={function (feature, layer) {
          if (feature.properties && feature.properties.school_nam) {
            layer.bindPopup(`<b>${feature.properties.school_nam} Attendance Zone</b>`);
          }
        }}
      />

      <GeoJSON
        data={elmPoints}
        pointToLayer={pointToLayer}
      />
      
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
    </MapContainer>
  );
};

export default CustomLeafletMap;
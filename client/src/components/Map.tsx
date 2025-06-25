'use client';
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

type WeatherStation = {
  id: number;
  ws_name: string;
  site: string;
  portfolio: string;
  latitude: number;
  longitude: number;
  latestMeasurements: {
    name: string; // long name
    unit: string;
    values: {
      timestamp: string;
      value: number;
    }[]
  }[];
}

type Props = {
  stations: WeatherStation[];
  isLoading: boolean;
  isError: boolean;
};

const WeatherMap = ({ stations, isLoading, isError }: Props) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  if (isLoading || isError || !stations || stations.length === 0) return;

  const map = new mapboxgl.Map({
    container: mapContainerRef.current!,
    style: 'mapbox://styles/liangceli/cmant30jh019g01sne9s27lp2',
    center: [134.5, -25],
    zoom: 3.5,
  });

  stations.forEach((station) => {
    const measurementHtml = station.latestMeasurements
      .map((m: any) => `
        <div>
          ${m.variableName}: ${m.value} ${m.unit}<br/>
          <small>${new Date(m.timestamp).toLocaleString()}</small>
        </div>
      `)
      .join("");

    new mapboxgl.Marker()
      .setLngLat([station.longitude, station.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="font-size: 14px">
            <strong>${station.name}</strong><br/>
            Site: ${station.site}<br/>
            Portfolio: ${station.portfolio}<br/>
            <strong>Measurements</strong><br/>
            ${measurementHtml}
          </div>
        `)
      )
      .addTo(map);
  });

  mapRef.current = map;
  return () => map.remove();
}, [stations, isLoading, isError]);

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};

export default WeatherMap;
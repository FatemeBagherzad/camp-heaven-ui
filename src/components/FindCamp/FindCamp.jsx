/*global google*/
import './FindCamp.scss';
import { GoogleMap, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { useState } from 'react';
import { MarkerF } from '@react-google-maps/api';
import CampDetail from '../CampDetail/CampDetail';

const mapApi = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const FindCamp = ({ camps }) => {
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState([]);
  const [campWithId, setCampWithId] = useState();
  const [detailOpen, setDetailOpen] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapApi,
  });

  const handleCloseDetail = () => {
    if (detailOpen) {
      setDetailOpen(false);
    }
  };
  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    camps?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };
  const handleMarkerClick = (address, lat, lng, id) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ address, id });
    setIsOpen(true);
    const campWithId = camps.find((camp) => camp.id === id);
    setCampWithId(campWithId);
    setDetailOpen(true);
  };

  return (
    <div className="mapPage">
      <div className="map">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            onLoad={onMapLoad}
            onClick={() => setIsOpen(false)}
          >
            {camps.map(({ address, lat, lng, id }, ind) => (
              <MarkerF
                key={id}
                position={{ lat, lng }}
                onClick={() => {
                  handleMarkerClick(address, lat, lng, id);
                }}
              >
                {isOpen && infoWindowData?.id === ind && (
                  <InfoWindow
                    onCloseClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <h3>{infoWindowData.address}</h3>
                  </InfoWindow>
                )}
              </MarkerF>
            ))}
          </GoogleMap>
        )}
      </div>
      {detailOpen && campWithId && (
        <div>
          <CampDetail camp={campWithId} handleCloseDetail={handleCloseDetail} />
        </div>
      )}
    </div>
  );
};
export default FindCamp;

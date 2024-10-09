/*global google*/
import './FindCamp.scss';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from '@react-google-maps/api';
import { useMemo, useState, useEffect } from 'react';
import { MarkerF } from '@react-google-maps/api';
import CampDetail from '../CampDetail/CampDetail';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORT = import.meta.env.VITE_PORT;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const mapApi = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const FindCamp = ({ camps }) => {
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: 'AIzaSyCqbovPZmambDyt1DD2yXu1i2rzs0E_VKg',
  // });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapApi,
  });

  // //FOR NEXT SPRINT
  // const center = useMemo(() => ({ lat: 43.6532, lng: -79.3832 }), []);
  // const [searchQuery, setSearchQuery] = useState('');
  // //   const filteredItems = allInvetories.filter((item) =>
  // //   item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
  // // );
  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState([]);
  const [campWithId, setCampWithId] = useState();
  const [detailOpen, setDetailOpen] = useState(false);

  //find the array of camps with highest rate
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

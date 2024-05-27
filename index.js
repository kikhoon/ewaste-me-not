// This sample requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB9GqJRfUlcsNgCALqPzO76kf9Uaw2wFVw&libraries=places">

function initMap() {
  const styledMapType = new google.maps.StyledMapType(
    [
      { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#93817c" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{ color: "#a5b076" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#447530" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#f5f1e6" }],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#fdfcf8" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#f8c967" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#e9bc62" }],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [{ color: "#e98d58" }],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [{ color: "#db8555" }],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ color: "#806b63" }],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [{ color: "#8f7d77" }],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#ebe3cd" }],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#b9d3c2" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#92998d" }],
      },
    ],
    { name: "Styled Map" },
  );

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 1.3521, lng: 103.8198 },
    zoom: 13,
    mapTypeControlOptions: {
      mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
    },
  });

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set("styled_map", styledMapType);
  map.setMapTypeId("styled_map");

  const input = document.getElementById("pac-input");
  // Specify just the place data fields that you need.
  const autocomplete = new google.maps.places.Autocomplete(input, {
    fields: ["place_id", "geometry", "name", "formatted_address"],
  });

  autocomplete.bindTo("bounds", map);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content");

  infowindow.setContent(infowindowContent);

  const geocoder = new google.maps.Geocoder();
  const marker = new google.maps.Marker({ map: map });
  const styles = {
    default: [],
    hide: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
/*
      {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "poi.government",
        stylers: [{ visibility: "on" }],
      },
      {
        featureType: "poi.medical",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "poi.park",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "poi.placeofworship",
        stylers: [{ visibility: "on" }],
      },
      {
        featureType: "poi.sports_complex",
        stylers: [{ visibility: "off" }],
      },
*/
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
  autocomplete.addListener("place_changed", () => {
    infowindow.close();

    const place = autocomplete.getPlace();

    if (!place.place_id) {
      return;
    }

    geocoder
      .geocode({ placeId: place.place_id })
      .then(({ results }) => {
        map.setZoom(19);
        map.setCenter(results[0].geometry.location);
        map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        map.setOptions({ styles: styles["hide"] });
        
        map.data.loadGeoJson(
          "./EwasteRecycling_NEW.geojson"
        );

        // Custom style for GeoJSON features
        map.data.setStyle(function(feature) {
          var geometryType = feature.getGeometry().getType();
          if (geometryType === 'Point') {
            return {
              icon: {
//                url: 'http://maps.google.com/mapfiles/ms/icons/orange.png',
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: 'red',
                strokeColor: 'red',
              } 
            };
          } else if (geometryType === 'LineString') {
            return {
              strokeColor: 'blue',
              strokeWeight: 2
            };
          }
        });

        // Set the position of the marker using the place ID and location.
        // @ts-ignore TODO This should be in @typings/googlemaps.
        marker.setPlace({
          placeId: place.place_id,
          location: results[0].geometry.location,
        });
        marker.setVisible(true);
        infowindowContent.children["place-name"].textContent = place.name;
        // infowindowContent.children["place-id"].textContent = place.place_id;
        infowindowContent.children["place-address"].textContent =
          results[0].formatted_address;
        infowindow.open(map, marker);
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  });
}

window.initMap = initMap;

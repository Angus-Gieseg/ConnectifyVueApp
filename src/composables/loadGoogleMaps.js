let googleMapsLoaded = false;

export function loadGoogleMaps(apiKey) {
  return new Promise((resolve, reject) => {
    if (googleMapsLoaded) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      googleMapsLoaded = true;
      resolve();
    };

    script.onerror = () => {
      reject(new Error("Failed to load the Google Maps script."));
    };

    document.head.appendChild(script);
  });
}

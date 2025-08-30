declare global {
  interface Window {
    kakao: any;
  }

  namespace kakao.maps {
    class Map {
      getCenter() {
        throw new Error('Method not implemented.');
      }
      constructor(container: HTMLElement, options: any);
      setCenter(latlng: LatLng): void;
      destroy(): void;
    }
    class Marker {
      constructor(options: any);
    }
    class LatLng {
      constructor(lat: number, lng: number);
    }

    namespace services {
      interface AddressSearchResult {
        address_name: string;
        x: string;
        y: string;
      }

      type Status = 'OK' | 'ZERO_RESULT' | 'ERROR';

      class Geocoder {
        addressSearch(
          address: string,
          callback: (result: AddressSearchResult[], status: Status) => void
        ): void;
      }
    }
  }
}

export {};

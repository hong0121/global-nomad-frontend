declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao {
    namespace maps {
      function load(callback: () => void): void;

      class LatLng {
        constructor(lat: number, lng: number);
        getLat(): number;
        getLng(): number;
      }

      interface MapOptions {
        center: LatLng;
        level: number;
        scrollwheel?: boolean;
      }

      class Map {
        constructor(container: HTMLElement, options: MapOptions);
        setCenter(latlng: LatLng): void;
      }

      interface MarkerOptions {
        map: Map;
        position: LatLng;
      }

      class Marker {
        constructor(options: MarkerOptions);
      }

      namespace services {
        interface AddressResult {
          address_name: string;
          address_type: string;
          x: string; // longitude
          y: string; // latitude
          road_address?: {
            address_name: string;
            building_name: string;
            main_building_no: string;
            region_1depth_name: string;
            region_2depth_name: string;
            region_3depth_name: string;
            road_name: string;
            sub_building_no: string;
            underground_yn: string;
            x: string;
            y: string;
            zone_no: string;
          };
        }

        type Status = 'OK' | 'ZERO_RESULT' | 'ERROR';

        class Geocoder {
          addressSearch(
            address: string,
            callback: (result: AddressResult[], status: Status) => void
          ): void;
        }
      }

      namespace event {
        function trigger(target: Map | Marker, type: string): void;
      }
    }
  }
}

export {};

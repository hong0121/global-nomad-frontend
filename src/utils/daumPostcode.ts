declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    daum: any;
  }
}

export interface DaumAddressData {
  zonecode: string;
  address: string;
  addressType?: string;
  bname?: string;
  buildingName?: string;
}

function loadDaumPostcodeScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById('daum-postcode-script')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'daum-postcode-script';
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error('Daum postcode script load failed'));
    document.body.appendChild(script);
  });
}

export function openDaumPostcode(): Promise<DaumAddressData> {
  return new Promise(async (resolve, reject) => {
    if (typeof window === 'undefined') return;

    try {
      await loadDaumPostcodeScript();

      new window.daum.Postcode({
        oncomplete: (data: DaumAddressData) => {
          resolve(data);
        },
      }).open();
    } catch (error) {
      reject(error);
    }
  });
}

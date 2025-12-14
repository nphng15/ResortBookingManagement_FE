const API_BASE_URL = '/api/v1';

export interface SearchParams {
  name: string;
  checkin: string;
  checkout: string;
  number: number;
}

export interface Resort {
  id: number;
  name: string;
  address: string;
  rating: number;
  min_price: number;
  images: string[];
  services: string[];
}

export const searchResorts = async (params: SearchParams): Promise<Resort[]> => {
  const queryString = new URLSearchParams({
    name: params.name,
    checkin: params.checkin,
    checkout: params.checkout,
    number: params.number.toString(),
  }).toString();

  const url = `${API_BASE_URL}/search?${queryString}`;
  console.log('Fetching:', url);

  const response = await fetch(url);
  console.log('Response status:', response.status);
  
  if (!response.ok) {
    throw new Error('Failed to search resorts');
  }
  
  const data = await response.json();
  console.log('Data:', data);
  return data;
};

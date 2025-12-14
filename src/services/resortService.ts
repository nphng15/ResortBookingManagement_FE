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

export interface RoomType {
  id: number;
  name: string;
  area: number;
  bed_amount: number;
  people_amount: number;
  price: number;
}

export interface ResortDetail {
  id: number;
  name: string;
  address: string;
  rating: number;
  images: string[];
  room_types: RoomType[];
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

export const getResortById = async (id: number): Promise<ResortDetail> => {
  const url = `${API_BASE_URL}/resorts?id=${id}`;
  console.log('Fetching resort detail:', url);

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch resort detail');
  }
  
  return response.json();
};

export interface Feedback {
  id: number;
  resort_id: number;
  customer_id: number;
  rating: number;
  comment: string;
  created_at: string;
}

export const getResortFeedbacks = async (resortId: number): Promise<Feedback[]> => {
  const url = `${API_BASE_URL}/resorts/${resortId}/feedbacks`;
  console.log('Fetching feedbacks:', url);

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch feedbacks');
  }
  
  return response.json();
};

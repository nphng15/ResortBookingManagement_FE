import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router';

export interface SearchState {
  location: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
}

export function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const routeLocation = useLocation();

  // Parse URL params
  const getInitialLocation = () => searchParams.get('name') || '';
  const getInitialCheckIn = () => searchParams.get('checkin') 
    ? new Date(searchParams.get('checkin')!) 
    : new Date();
  const getInitialCheckOut = () => searchParams.get('checkout') 
    ? new Date(searchParams.get('checkout')!) 
    : new Date(Date.now() + 86400000);
  const getInitialGuests = () => parseInt(searchParams.get('number') || '2');

  // Search state
  const [location, setLocation] = useState(getInitialLocation);
  const [checkIn, setCheckIn] = useState(getInitialCheckIn);
  const [checkOut, setCheckOut] = useState(getInitialCheckOut);
  const [guests, setGuests] = useState(getInitialGuests);

  // Dropdown states
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  // Sync với URL params
  useEffect(() => {
    setLocation(getInitialLocation());
    setCheckIn(getInitialCheckIn());
    setCheckOut(getInitialCheckOut());
    setGuests(getInitialGuests());
  }, [searchParams]);

  // Dropdown controls
  const openLocationDropdown = useCallback(() => {
    setShowLocationDropdown(true);
    setShowDatePicker(false);
    setShowGuestsDropdown(false);
  }, []);

  const openDatePicker = useCallback(() => {
    setShowDatePicker(true);
    setShowLocationDropdown(false);
    setShowGuestsDropdown(false);
  }, []);

  const openGuestsDropdown = useCallback(() => {
    setShowGuestsDropdown(true);
    setShowLocationDropdown(false);
    setShowDatePicker(false);
  }, []);

  const closeAllDropdowns = useCallback(() => {
    setShowLocationDropdown(false);
    setShowDatePicker(false);
    setShowGuestsDropdown(false);
  }, []);

  const isAnyDropdownOpen = showLocationDropdown || showDatePicker || showGuestsDropdown;

  // Search actions
  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (location) params.set('name', location);
    if (checkIn) params.set('checkin', checkIn.toISOString().split('T')[0]);
    if (checkOut) params.set('checkout', checkOut.toISOString().split('T')[0]);
    params.set('number', guests.toString());
    
    if (routeLocation.pathname === '/resorts') {
      setSearchParams(params);
    } else {
      navigate(`/search?${params.toString()}`);
    }
  }, [location, checkIn, checkOut, guests, routeLocation.pathname, setSearchParams, navigate]);

  // Helpers
  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
  }, []);

  const getNights = useCallback(() => {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [checkIn, checkOut]);

  const incrementGuests = useCallback(() => setGuests(g => g + 1), []);
  const decrementGuests = useCallback(() => setGuests(g => Math.max(1, g - 1)), []);

  return {
    // Search state
    location,
    setLocation,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    incrementGuests,
    decrementGuests,

    // Dropdown state
    showLocationDropdown,
    showDatePicker,
    showGuestsDropdown,
    isAnyDropdownOpen,
    openLocationDropdown,
    openDatePicker,
    openGuestsDropdown,
    closeAllDropdowns,

    // Actions & helpers
    handleSearch,
    formatDate,
    getNights,
  };
}

import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const FavouritesContext = createContext();

// Provider Component
export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavourites = JSON.parse(localStorage.getItem('favourites'));
      if (Array.isArray(savedFavourites)) {
        setFavourites(savedFavourites);
      }
    } catch (error) {
      console.error('Error loading favourites from localStorage:', error);
      setFavourites([]);
    }
  }, []);

  // Update localStorage whenever favourites change
  useEffect(() => {
    try {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    } catch (error) {
      console.error('Error saving favourites to localStorage:', error);
    }
  }, [favourites]);

  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};

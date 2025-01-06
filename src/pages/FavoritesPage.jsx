import React from 'react';
import { Container } from 'react-bootstrap';
import Favourites from '../components/Favourites';

const FavoritesPage = () => {
  return (
    <>
      
      <Container className="mt-5">
        <Favourites />
      </Container>
      
    </>
  );
};

export default FavoritesPage;

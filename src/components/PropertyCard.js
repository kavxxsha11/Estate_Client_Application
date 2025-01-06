import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FavouritesContext } from '../contexts/FavouritesContext';
import './PropertyCard.css'; // Custom CSS for hover effects

const PropertyCard = ({ property }) => {
  const { favourites, setFavourites } = useContext(FavouritesContext);

  const isFavourited = favourites.some((fav) => fav.id === property.id);

  // Handle drag functionality
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY',
    item: { property },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [property]);

  // Toggle favorite status
  const toggleFavourite = () => {
    if (isFavourited) {
      // Remove from favorites
      setFavourites(favourites.filter((fav) => fav.id !== property.id));
    } else {
      // Add to favorites
      setFavourites([...favourites, property]);
    }
  };

  return (
    <Card
      className="mb-3 position-relative property-card"
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    >
      {/* Heart Icon */}
      <div
        onClick={toggleFavourite}
        className="heart-icon"
        aria-label={isFavourited ? 'Remove from favorites' : 'Add to favorites'}
        title={isFavourited ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavourited ? <FaHeart /> : <FaRegHeart />}
      </div>

      <Card.Img
        variant="top"
        src={property.images[0]}
        alt={`${property.type} in ${property.location}`}
        loading="lazy"
      />
      <Card.Body>
        <Card.Title>{property.type} in {property.location}</Card.Title>
        <Card.Text>
          <strong>Price:</strong> £{property.price.toLocaleString()} <br />
          <strong>Bedrooms:</strong> {property.bedrooms} <br />
          <strong>Date Added:</strong> {property.dateAdded}
        </Card.Text>
        <Button variant="primary" as={Link} to={`/property/${property.id}`}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Button, Image } from 'react-bootstrap';
import { FaBed, FaBath, FaParking } from 'react-icons/fa';
import { MdSquareFoot, MdCalendarToday } from 'react-icons/md';
import { FavouritesContext } from '../contexts/FavouritesContext';
import DOMPurify from 'dompurify';
import './PropertyPage.css';
import { useCallback } from 'react';

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  useEffect(() => {
    fetch('/properties.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch properties data');
        }
        return response.json();
      })
      .then((data) => {
        const found = data.find((prop) => prop.id === Number(id));
        if (found) {
          setProperty(found);
        } else {
          console.error('Property not found');
        }
      })
      .catch((error) => console.error('Error fetching property:', error));
  }, [id]);

  const addToFavourites = () => {
    if (property && !favourites.find((fav) => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  const removeFromFavourites = () => {
    if (property && favourites.find((fav) => fav.id === property.id)) {
      setFavourites(favourites.filter((fav) => fav.id !== property.id));
    }
  };

  

const nextImage = useCallback(() => {
  if (property) {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  }
}, [property]);

const previousImage = useCallback(() => {
  if (property) {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  }
}, [property]);

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      previousImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [nextImage, previousImage]);




  if (!property) return <p>Loading...</p>;

  const isFavourited = favourites.find((fav) => fav.id === property.id);
  const currentImage = property.images[currentImageIndex];

  return (
    <div className="container mt-4">
  <h1 className="text-center">{property.type} in {property.location}</h1>

  {/* Image Gallery Container */}
  <div className="image-gallery-container mt-4">
    <button
      className="arrow-button left-arrow"
      onClick={previousImage}
      aria-label="Previous Image"
    >
      &#10094;
    </button>

    <Image
      src={currentImage}
      fluid
      alt={`${property.type} main`}
      className="main-image"
    />

    <button
      className="arrow-button right-arrow"
      onClick={nextImage}
      aria-label="Next Image"
    >
      &#10095;
    </button>
  </div>

  {/* Thumbnails */}
  <div className="thumbnails-row">
    {property.images.map((img, index) => (
      <Image
        key={index}
        src={img}
        thumbnail
        alt={`${property.type} thumbnail ${index + 1}`}
        className={`thumbnail-image ${index === currentImageIndex ? 'active-thumbnail' : ''}`}
        onClick={() => setCurrentImageIndex(index)}
      />
    ))}
  </div>

  {/* Property Price */}
  <div className="property-price text-center">
    <h2>£{property.price.toLocaleString()}</h2>
  </div>

  {/* Property Details */}
  <div className="property-details text-center">
    <div className="property-detail-item">
      <FaBed />
      <span>{property.bedrooms} beds</span>
    </div>
    <div className="property-detail-item">
      <FaBath />
      <span>{property.bathrooms || 'N/A'} baths</span>
    </div>
    <div className="property-detail-item">
      <MdSquareFoot />
      <span>{property.area || 'N/A'} sqft</span>
    </div>
    <div className="property-detail-item">
      <FaParking />
      <span>{property.parking || 'N/A'} parking</span>
    </div>
    <div className="property-detail-item">
      <MdCalendarToday />
      <span>Year Built: {property.yearBuilt || 'N/A'}</span>
    </div>
  </div>

  {/* Favourite Button */}
  <div className="text-center">
    <Button
      variant={isFavourited ? "success" : "outline-secondary"}
      className="mt-3 favourite-button"
      onClick={isFavourited ? removeFromFavourites : addToFavourites}
    >
      {isFavourited ? "Added to Favourites" : "Add to Favourites"}
    </Button>
  </div>

  {/* Tabs for additional information */}
  <Tabs defaultActiveKey="description" className="mt-4">
    <Tab eventKey="description" title="Description">
      <p className="mt-3 description-text">
        {isDescriptionExpanded ? property.longDescription : `${property.longDescription.substring(0, 200)}...`}
        {property.longDescription.length > 200 && (
          <Button
            variant="link"
            onClick={toggleDescription}
            className="description-toggle-button"
          >
            {isDescriptionExpanded ? "Hide Description" : "Read More"}
          </Button>
        )}
      </p>
    </Tab>
    <Tab eventKey="floorplan" title="Floor Plan">
      <Image src={property.floorPlan} fluid className="mt-3 floor-plan" alt="Floor Plan" />
    </Tab>
    <Tab eventKey="map" title="Map">
  <div
    className="mt-3 map-embed"
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(property.googleMapEmbed, {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
      })
    }}
  ></div>
</Tab>

  </Tabs>
</div>
  );
};

export default PropertyPage;

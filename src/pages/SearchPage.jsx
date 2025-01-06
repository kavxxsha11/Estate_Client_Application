// src/pages/SearchPage.js
import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import PropertyList from '../components/PropertyList';
import Favourites from '../components/Favourites';
import { Container, Row, Col } from 'react-bootstrap';
import './SearchPage.css';

const SearchPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    // Fetch properties from properties.json
    fetch('/properties.json')
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setFilteredProperties(data); // Initially display all properties
      })
      .catch((error) => console.error('Error fetching properties:', error));
  }, []);

  const handleSearch = (criteria) => {
    let filtered = properties.filter((property) => {
      // Filter by Property Type
      const matchesType = criteria.type ? property.type === criteria.type : true;

      // Filter by Price Range
      const matchesMinPrice = criteria.minPrice ? property.price >= parseInt(criteria.minPrice) : true;
      const matchesMaxPrice = criteria.maxPrice ? property.price <= parseInt(criteria.maxPrice) : true;

      // Filter by Bedrooms
      const matchesBedrooms = criteria.bedrooms ? property.bedrooms >= parseInt(criteria.bedrooms) : true;

      // Filter by Date Added
      let matchesDate = true;
      if (criteria.dateAddedFrom && criteria.dateAddedTo) {
        const propertyDate = new Date(property.dateAdded);
        matchesDate =
          propertyDate >= criteria.dateAddedFrom && propertyDate <= criteria.dateAddedTo;
      } else if (criteria.dateAddedFrom) {
        const propertyDate = new Date(property.dateAdded);
        matchesDate = propertyDate >= criteria.dateAddedFrom;
      }

      // Filter by Postcode Area
      const matchesPostcode = criteria.postcode ? property.postcode.startsWith(criteria.postcode) : true;

      return (
        matchesType &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesBedrooms &&
        matchesDate &&
        matchesPostcode
      );
    });

    setFilteredProperties(filtered);
  };

  return (
    <div className="search-page">
      {/* Hero Section */}
      <div className="hero-section d-flex align-items-center justify-content-center text-center">
        <div className="text-white">
          <h1 className="display-4" style={{ color: 'white', fontWeight: 'bold' }}>Find Your Dream Property</h1>
          <p className="lead" style={{ color: 'yellow' , fontWeight: '400'}}>Browse through our extensive listings to find the perfect home for you.</p>
        </div>
      </div>
      
      <Container className="mt-5" id="search-form">
        <Row>
          {/* Favorites Box on the Left */}
          <Col lg={3} md={4} className="mb-4 mb-lg-0">
            <Favourites />
          </Col>
          {/* Search Form and Property Listings on the Right */}
          <Col lg={9} md={8}>
            <SearchForm onSearch={handleSearch} />
            <PropertyList properties={filteredProperties} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchPage;

import React from 'react';
import PropertyCard from './PropertyCard';
import { Row, Col } from 'react-bootstrap';

const PropertyList = ({ properties }) => {
  return (
    <div>
      <h2 className="mb-4">Search Results</h2>
      {properties.length === 0 ? (
        <p>No properties found matching your criteria.</p>
      ) : (
        <Row>
          {properties.map((property) => (
            <Col key={property.id} lg={4} md={6} sm={12} className="mb-4">
              <PropertyCard property={property} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default PropertyList;

import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import './SearchForm.css';

const propertyTypes = [
  { value: '', label: 'Any' },
  { value: 'House', label: 'House' },
  { value: 'Flat', label: 'Flat' },
  { value: 'Bungalow', label: 'Bungalow' },
  { value: 'Terraced House', label: 'Terraced House' },
  { value: 'Semi-Detached House', label: 'Semi-Detached House' },
  { value: 'Studio', label: 'Studio' },
  { value: 'Penthouse', label: 'Penthouse' }
];

const postcodeOptions = [
  { value: '', label: 'Any' },
  { value: 'BR1', label: 'BR1' },
  { value: 'NW1', label: 'NW1' },
  { value: 'SW1', label: 'SW1' },
  { value: 'E1', label: 'E1' },
  { value: 'SE1', label: 'SE1' },
  { value: 'W1', label: 'W1' },
  { value: 'NW3', label: 'NW3' }
];

const bedroomsOptions = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' }
];

const SearchForm = ({ onSearch }) => {
  const [type, setType] = useState(propertyTypes[0]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState(bedroomsOptions[0]);
  const [dateAddedFrom, setDateAddedFrom] = useState(null);
  const [dateAddedTo, setDateAddedTo] = useState(null);
  const [postcode, setPostcode] = useState(postcodeOptions[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      type: type.value,
      minPrice,
      maxPrice,
      bedrooms: bedrooms.value,
      dateAddedFrom,
      dateAddedTo,
      postcode: postcode.value
    });
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Property Type */}
            <Col md={4} className="mb-3">
              <Form.Group controlId="propertyType">
                <Form.Label>Property Type</Form.Label>
                <Select
                  options={propertyTypes}
                  value={type}
                  onChange={setType}
                  placeholder="Select Type"
                  isClearable
                  aria-label="Property Type"menuPortalTarget={document.body} // Ensuring dropdowns render in the body element context
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9998 }) }} // Inline style to ensure dropdowns are on topstyles
                />
              </Form.Group>
            </Col>

            {/* Price Range */}
            <Col md={4} className="mb-3">
              <Form.Group controlId="priceRange">
                <Form.Label>Price Range (£)</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Min Price"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      min="0"
                      aria-label="Minimum Price"
                      menuPortalTarget={document.body} 
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9998}) }} 
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Max Price"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      min="0"
                      aria-label="Maximum Price"
                      menuPortalTarget={document.body} 
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9998 }) }} 
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>

            {/* Bedrooms */}
            <Col md={4} className="mb-3">
              <Form.Group controlId="bedrooms">
                <Form.Label>Bedrooms</Form.Label>
                <Select
                  options={bedroomsOptions}
                  value={bedrooms}
                  onChange={setBedrooms}
                  placeholder="Select Bedrooms"
                  isClearable
                  aria-label="Bedrooms"
                  menuPortalTarget={document.body} 
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9998 }) }} 
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Date Added From */}
            <Col md={6} className="mb-3">
    <Form.Group controlId="dateAddedFrom">
        <Form.Label>Date Added From</Form.Label>
        <div className="datepicker-wrapper">
            <DatePicker
                selected={dateAddedFrom}
                onChange={(date) => setDateAddedFrom(date)}
                className="form-control"
                dateFormat="yyyy-MM-dd"
                placeholderText="Select start date"
                isClearable
                aria-label="Date Added From"
            />
        </div>
    </Form.Group>
</Col>


            
          
            {/* Postcode Area */}
            <Col md={6} className="mb-3">
              <Form.Group controlId="postcode">
                <Form.Label>Postcode Area</Form.Label>
                <Select
                  options={postcodeOptions}
                  value={postcode}
                  onChange={setPostcode}
                  placeholder="Select Postcode"
                  isClearable
                  aria-label="Postcode Area"
                  menuPortalTarget={document.body} 
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9998 }) }}
                />
              </Form.Group>
            </Col>

            {/* Search Button */}
            <Col md={6} className="d-flex align-items-end mb-3">
              <Button variant="primary" type="submit" className="w-100" aria-label="Search Properties">
                <FaSearch className="me-2" /> Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SearchForm;

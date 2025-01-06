import React, { useContext, useState } from 'react';
import { ListGroup, Button, Image } from 'react-bootstrap';
import { FavouritesContext } from '../contexts/FavouritesContext';
import { useDrop, useDrag } from 'react-dnd';
import { FaTrash } from 'react-icons/fa';
import './Favourites.css'; // Custom CSS for styling

const Favourites = () => {
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const [showDropZone, setShowDropZone] = useState(false); // State to control the visibility of the drop zone

  // Handle removing a property from favourites
  const removeFromFavourites = (id) => {
    const updatedFavourites = favourites.filter((fav) => fav.id !== id);
    setFavourites(updatedFavourites);
  };

  // Handle clearing all favourites
  const clearFavourites = () => {
    setFavourites([]);
  };

  // Drop zone for adding properties to favourites
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ['PROPERTY', 'FAVOURITE'],
      drop: (item, monitor) => {
        if (monitor.getItemType() === 'PROPERTY') {
          const propertyToAdd = item.property;
          if (!favourites.find((fav) => fav.id === propertyToAdd.id)) {
            setFavourites([...favourites, propertyToAdd]);
          }
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [favourites, setFavourites]
  );

  // Drop zone for deleting items from favourites
  const [{ isOverDropZone }, dropZone] = useDrop(
    () => ({
      accept: 'FAVOURITE',
      drop: (item) => {
        removeFromFavourites(item.id);
        setShowDropZone(false); // Hide the drop zone after dropping
      },
      collect: (monitor) => ({
        isOverDropZone: !!monitor.isOver(),
      }),
    }),
    [favourites]
  );

  return (
    <div>
      {/* Main Favourites Container */}
      <div
        ref={drop}
        className="favourites-container p-3 border rounded"
        style={{
          backgroundColor: isOver ? '#f8f9fa' : 'white',
          minHeight: '300px',
          position: 'sticky',
          top: '80px',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <h2>Favourites</h2>
        {favourites.length === 0 ? (
          <p>Drag properties here or use the "Add to Favourites" button.</p>
        ) : (
          <>
            <ListGroup>
              {favourites.map((fav) => (
                <DraggableFavouriteItem
                  key={fav.id}
                  fav={fav}
                  removeFromFavourites={removeFromFavourites}
                  setShowDropZone={setShowDropZone} // Trigger drop zone visibility on drag start
                />
              ))}
            </ListGroup>
            <Button
              variant="secondary"
              className="mt-3 w-100"
              onClick={clearFavourites}
              aria-label="Clear all favourites"
            >
              Clear All
            </Button>
          </>
        )}
      </div>

      {/* Temporary Drop Zone for Removing Favourites */}
      {showDropZone && (
        <div
          ref={dropZone}
          className="temporary-drop-zone p-3 mt-3 text-center rounded"
          style={{
            backgroundColor: isOverDropZone ? '#f8d7da' : '#f8f9fa',
            border: isOverDropZone ? '2px dashed #dc3545' : '2px dashed #ced4da',
            color: '#6c757d',
          }}
        >
          Drop here to remove from favourites
        </div>
      )}
    </div>
  );
};

const DraggableFavouriteItem = ({ fav, removeFromFavourites, setShowDropZone }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'FAVOURITE',
      item: { id: fav.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      item: () => {
        setShowDropZone(true); // Show the drop zone on drag start
        return { id: fav.id };
      },
      end: () => setShowDropZone(false), // Hide the drop zone on drag end
    }),
    [fav.id]
  );

  return (
    <ListGroup.Item
      ref={drag}
      className="d-flex align-items-center"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <Image
        src={fav.images[0]}
        rounded
        width={50}
        height={50}
        alt={`${fav.type} thumbnail`}
        className="me-3"
      />
      <div className="flex-grow-1">
        {fav.type} in {fav.location}
      </div>
      <Button
        variant="danger"
        size="sm"
        onClick={() => removeFromFavourites(fav.id)}
        aria-label={`Remove ${fav.type} from favourites`}
      >
        <FaTrash />
      </Button>
    </ListGroup.Item>
  );
};

export default Favourites;

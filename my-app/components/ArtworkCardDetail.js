import { useState, useEffect } from 'react';  // ✅ Import useState, useEffect
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';  // ✅ Ensure correct path
import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';

// Import functions for adding/removing favourites
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  // Update the "showAdded" state when favouritesList changes
  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  // Modify the favourites handling function
  const handleFavourites = async () => {
    if (showAdded) {
      // If already added to favourites, remove it
      const updatedFavourites = await removeFromFavourites(objectID);
      setFavouritesList(updatedFavourites);
    } else {
      // If not in favourites, add it
      const updatedFavourites = await addToFavourites(objectID);
      setFavouritesList(updatedFavourites);
    }
    setShowAdded(!showAdded);  // Toggle the showAdded state
  };

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text><strong>Object Date:</strong> {data.objectDate || "N/A"}</Card.Text>
        <Card.Text><strong>Classification:</strong> {data.classification || "N/A"}</Card.Text>
        <Card.Text><strong>Medium:</strong> {data.medium || "N/A"}</Card.Text>
        
        <br />
        <Card.Text><strong>Artist:</strong> {data.artistDisplayName || "N/A"}  
          {data.artistDisplayName && data.artistWikidata_URL && (
            <> (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>)</>
          )}</Card.Text>
        <Card.Text><strong>Credit Line:</strong> {data.creditLine || "N/A"}</Card.Text>
        <Card.Text><strong>Dimensions:</strong> {data.dimensions || "N/A"}</Card.Text>

        {/* Favourite Button Here */}
        <Button 
          variant={showAdded ? "primary" : "outline-primary"} 
          onClick={handleFavourites}
        >
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
}

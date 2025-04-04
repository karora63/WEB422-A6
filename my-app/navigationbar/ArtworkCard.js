import useSWR from 'swr';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  // Use primaryImage if available, otherwise use primaryImageSmall
  const imageSrc = data.primaryImage || data.primaryImageSmall || "https://via.placeholder.com/300x300.png?text=No+Image";

  return (
    <Card className="h-100">
      <Card.Img 
        variant="top" 
        src={imageSrc} 
        alt={data.title || "Artwork Image"}
        style={{ height: '250px', objectFit: 'cover' }} 
        onError={(e) => { e.target.src = "https://via.placeholder.com/300x300.png?text=No+Image"; }} // ✅ Handle broken images
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          {data.objectDate || "N/A"} <br />
          {data.classification || "N/A"} <br />
          {data.medium || "N/A"}
        </Card.Text>
        <div className="mt-auto">
          <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
            <Button variant="primary">{objectID}</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

import { useAtom } from "jotai";
import { favouritesAtom } from "../store"; // Adjust if the atom file is elsewhere
import { Row, Col ,Card } from "react-bootstrap";
import ArtworkCard from "../navigationbar/ArtworkCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  return (
    <div>
      <h1>Favourites</h1>
      {favouritesList.length > 0 ? (
    <Row className="gy-4">
      {favouritesList.map((objectID) => (
        <Col lg={3} key={objectID}>
          <ArtworkCard objectID={objectID} />
        </Col>
      ))}
    </Row>
  ) : (
    <Card>
      <Card.Body>
        <h4>Nothing Here</h4>
        <p>Try searching for something else.</p>
      </Card.Body>
    </Card>
  )}
    </div>



  );
}
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Ensure body background is white for the Home page
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#333"; // Make text darker

    return () => {
      document.body.style.backgroundColor = ""; // Reset when leaving page
      document.body.style.color = "";
    };
  }, []);

  return (
    <Container className="mt-4">
      <Row className="my-4">
        <Col>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
            alt="The Metropolitan Museum of Art"
            fluid
            rounded
          />
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <p>
            The <strong>Metropolitan Museum of Art</strong> The Metropolitan Museum of Art of New York City, colloquially `&quot`the Met`&quot`, is the largest art museum in the Americas. Its permanent collection contains over two million works, divided among 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan`&apos`s Upper East Side, is by area one of the world`&apos`s largest art museums. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.
          </p>
          <p>
          The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum`&apos`s permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the European masters, and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments, costumes, and accessories, as well as antique weapons and armor from around the world. Several notable interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries.
          </p>
        </Col>
        <Col md={6}>
          <p>
          The Fifth Avenue building opened on March 30, 1880. In 2021, despite the COVID-19 pandemic in New York City, the museum attracted 1,958,000 visitors, ranking fourth on the list of most-visited art museums in the world.


          </p>
          <p>
            Learn more at: 
            <a 
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" 
              target="_blank" 
              rel="noreferrer"
            > Wikipedia</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
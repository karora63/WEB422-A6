import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai'; // Import useAtom
import { searchHistoryAtom } from '../store'; // Import the searchHistoryAtom

export default function AdvancedSearch() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // Get and set the search history using useAtom
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  // Function to process form data and generate query string
  const submitForm = (data) => {
    let queryString = `searchBy=${data.searchBy}`;

    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    if (data.isOnView) queryString += `&isOnView=true`;
    if (data.isHighlight) queryString += `&isHighlight=true`;
    queryString += `&q=${data.q}`;

    // Save the current search to the search history atom
    const newSearchHistory = [...searchHistory, queryString]; // Add current query to history
    setSearchHistory(newSearchHistory); // Update the atom with the new search history

    // Redirect to the artwork search page with the query string
    router.push(`/artwork?${queryString}`);
  };

  return (
    <Container>
      <h1 className="mt-4 text-dark">Advanced Search</h1> {/* Darkened the text */}
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Search Query</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="" 
                name="q" 
                {...register("q", { required: true })} 
              />
              {errors.q && <Form.Text className="text-danger">This field is required</Form.Text>}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Label>Search By</Form.Label>
            <Form.Select name="searchBy" className="mb-3" {...register("searchBy", { required: true })}>
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="" 
                name="geoLocation" 
                {...register("geoLocation")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="" 
                name="medium"
                {...register("medium")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Highlighted"
              name="isHighlight"
              {...register("isHighlight")}
            />
            <Form.Check
              type="checkbox"
              label="Currently on View"
              name="isOnView"
              {...register("isOnView")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
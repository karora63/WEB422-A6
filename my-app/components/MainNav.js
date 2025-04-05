import Link from 'next/link';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai'; // Import useAtom from jotai
import { searchHistoryAtom } from '../../store'; // Import the searchHistoryAtom from the store

export default function MainNav() {
  
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // State to manage the navbar expansion
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // Access and modify the search history

  // Handle search submission
  const handleSearch = (event) => {
    event.preventDefault();

    // Create the query string for the search
    const queryString = `title=true&q=${search}`;

    // Update the search history atom with the new search query
    const newSearchHistory = [...searchHistory, queryString];
    setSearchHistory(newSearchHistory);

    // Redirect to the search results page
    router.push(`/artwork?${queryString}`);

    // Close the navbar after the search
    setIsExpanded(false);
  };

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-primary" expand="lg" expanded={isExpanded}>
        <Navbar.Brand>Khushi Arora</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link onClick={() => setIsExpanded(false)}>Home</Nav.Link>
            </Link>
            <Link href="/search" passHref legacyBehavior >
              <Nav.Link onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>
            </Link>
            <Link href="/history" passHref legacyBehavior> Search History</Link>
            <NavDropdown title="User Name">
              <Link href="/favourites" passHref legacyBehavior>
                <NavDropdown.Item onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>

          {/* Search Form */}
          &nbsp;<Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" variant="outline-light">Search</Button>
          </Form>&nbsp;
        </Navbar.Collapse>
      </Navbar>
      <br /><br />
    </>
  );
}
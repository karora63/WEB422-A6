import { useState, useEffect } from "react";
import Link from 'next/link';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store"; // Import your atom for search history
import { readToken, removeToken } from "../lib/authenticate"; // Import authentication functions

export default function MainNav() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false); // State to manage the navbar expansion
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // Access and modify the search history

  const token = readToken(); // Check if token exists

  // Function to handle search submission
  const handleSearch = (event) => {
    event.preventDefault();
    const queryString = `title=true&q=${search}`;
    setSearchHistory([...searchHistory, queryString]); // Update search history
    router.push(`/artwork?${queryString}`);
    setIsExpanded(false); // Collapse the navbar
  };

  // Logout function
  const logout = () => {
    removeToken(); // Remove the authentication token
    setIsExpanded(false); // Collapse the navbar
    router.push("/login"); // Redirect to the login page
  };

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-primary" expand="lg" expanded={isExpanded}>
        <Navbar.Brand>Khushi Arora</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Use Link directly on Nav.Link */}
            <Link href="/" passHref>
              <Nav.Link onClick={() => setIsExpanded(false)}>Home</Nav.Link>
            </Link>
            {token ? (
              <>
                <Link href="/search" passHref>
                  <Nav.Link onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>
                </Link>

                <NavDropdown title={token.userName} id="user-nav-dropdown">
                  <Link href="/favourites" passHref>
                    <NavDropdown.Item onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref>
                    <NavDropdown.Item onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav>
                <Link href="/register" passHref>
                  <Nav.Link onClick={() => setIsExpanded(false)} active>
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref>
                  <Nav.Link onClick={() => setIsExpanded(false)} active>
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
          </Nav>

          {/* Search Form */}
          {token && (
            <Form className="d-flex" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit" variant="outline-light">
                Search
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>
      <br />
      <br />
    </>
  );
}

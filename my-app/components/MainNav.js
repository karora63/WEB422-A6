import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { isAuthenticated, removeToken, readToken } from "@/lib/authenticate";

export default function MainNav() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  const [searchValue, setValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [userName, setUserName] = useState("");  // Store username

  // Handle the search form submission
  async function submitForm(e) {
    e.preventDefault();
    setValue("");
    setIsExpanded(false);
    let queryString = `title=true&q=${searchValue}`;
    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?title=true&q=${searchValue}`);
  }

  // Handle user logout
  function logout() {
    removeToken(); // Remove token from localStorage
    router.push("/login"); // Redirect to login page
  }

  // Update the username on component mount if user is authenticated
  useEffect(() => {
    const token = readToken(); // Check if the user is authenticated
    if (token) {
      try {
        const decodedToken = JSON.parse(token); // Parse the token if it's valid
        setUserName(decodedToken.userName || "User"); // Set the username or default to "User"
      } catch (error) {
        console.error("Error decoding token", error);
        setUserName("User");
      }
    }
  }, []);

  return (
    <>
      <Navbar
        className="fixed-top navbar-dark bg-primary"
        expand="lg"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Khushi Arora</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          />
          {isAuthenticated() ? (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link legacyBehavior passHref href="/">
                  <Nav.Link
                    onClick={() => {
                      setIsExpanded(false);
                    }}
                  >
                    Home
                  </Nav.Link>
                </Link>

                <Link legacyBehavior passHref href="/search">
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={() => {
                      setIsExpanded(false);
                    }}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>

                <Link legacyBehavior passHref href="/history">
                  <Nav.Link
                    active={router.pathname === "/history"}
                    onClick={() => {
                      setIsExpanded(false);
                    }}
                  >
                    Search History
                  </Nav.Link>
                </Link>
              </Nav>
              <Form className="d-flex" onSubmit={submitForm}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setValue(e.target.value)}
                />
                <Button className="btn btn-success" type="submit">
                  Search
                </Button>
              </Form>
              <NavDropdown title={userName} id="basic-nav-dropdown" style={{ color: "white" }}>
                <Link legacyBehavior passHref href="/favourites">
                  <NavDropdown.Item
                    onClick={() => {
                      setIsExpanded(false);
                    }}
                  >
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link legacyBehavior passHref href="/history">
                  <NavDropdown.Item
                    active={router.pathname === "/history"}
                    onClick={() => {
                      setIsExpanded(false);
                    }}
                  >
                    Search History
                  </NavDropdown.Item>
                </Link>
                <Link href="/login" legacyBehavior passHref>
                  <NavDropdown.Item
                    onClick={() => {
                      setIsExpanded(false);
                      logout();
                    }}
                    active={router.pathname === "/login"}
                  >
                    Logout
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Navbar.Collapse>
          ) : (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link legacyBehavior passHref href="/login">
                  <Nav.Link
                    active={router.pathname === "/login"}
                    onClick={() => {
                      setIsExpanded(false);
                    }}
                  >
                    Login
                  </Nav.Link>
                </Link>
                <Link legacyBehavior passHref href="/register">
                  <Nav.Link
                    active={router.pathname === "/register"}
                    onClick={() => {
                      setIsExpanded(false);
                    }}
                  >
                    Register
                  </Nav.Link>
                </Link>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

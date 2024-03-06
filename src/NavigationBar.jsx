import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Form, Nav, Button, FormControl, Container } from "react-bootstrap";
import { useRef, useState } from 'react';
import './NavigationBar.css'

export default function NavigationBar({ onSearch, choosen }) {

  const searchInputed = useRef();
  const [currentlyActive, setCurrentlyActive] = useState('');

  function handleSearchMovie() {
    setCurrentlyActive('');
    if (searchInputed.current.value.trim() === '') {
      return;
    } else {
      onSearch(searchInputed.current.value);
      searchInputed.current.value = '';
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchMovie();
      searchInputed.current.value = '';
    }
  }

  function handleTrending() {
    choosen('trending');
    setCurrentlyActive('trending')
  }
  function handleUpcoming() {
    choosen('upcoming');
    setCurrentlyActive('upcoming');
  }
  function handlePopularTvShows() {
    choosen('popularShows');
    setCurrentlyActive('popularShows');
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="navigation-bar">
      <Container fluid>
        <Navbar.Brand href='/home'>MOVIEMANIAC</Navbar.Brand>
        <Navbar.Brand href='' className={`mx-3 ${currentlyActive === 'trending' ? 'active' : ''}`}
          type="button"
          onClick={handleTrending}> Trending Movies&Series </Navbar.Brand>
        <Navbar.Brand href='' className={`mx-3 ${currentlyActive === 'upcoming' ? 'active' : ''}`}
          type="button"
          onClick={handleUpcoming} > Upcoming Movies </Navbar.Brand>
        <Navbar.Brand href='' className={`mx-3 ${currentlyActive === 'popularShows' ? 'active' : ''}`}
          type="button"
          onClick={handlePopularTvShows}>TV Shows </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll'></Navbar.Toggle>

        <Navbar.Collapse id='navbarScroll'>
          <Nav className='me-auto my-8 my-lg-3'
            style={{ maxHeight: '100px' }}
            navbarScroll>
          </Nav>
          <div>
            <Form className='d-flex' onSubmit={handleFormSubmit}>
              <FormControl type='search' placeholder='Enter the name of the movie' className='me-4'
                aria-label='search' name='' ref={searchInputed} onKeyDown={handleKeyDown}>
              </FormControl>
              <Button variant='primary' type='button' onClick={handleSearchMovie}>Search</Button>
            </Form>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}
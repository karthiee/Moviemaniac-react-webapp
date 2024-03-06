import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './MovieBox.css';
import Modal from "./Modal";
import { Col, Container, Row } from "react-bootstrap";
import NoMovies from "./NoMovies";


const API_URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=070cb8829e4215ef79f7f8af57b570e0";
const API_IMG = "https://image.tmdb.org/t/p/w500/";
const API_SEARCH = "https://api.themoviedb.org/3/search/multi?api_key=070cb8829e4215ef79f7f8af57b570e0";
const API_TRENDING = "https://api.themoviedb.org/3/trending/all/week?api_key=070cb8829e4215ef79f7f8af57b570e0";
const API_UPCOMING = "https://api.themoviedb.org/3/movie/upcoming?api_key=070cb8829e4215ef79f7f8af57b570e0";
const API_TV_SHOWS = "https://api.themoviedb.org/3/tv/on_the_air?api_key=070cb8829e4215ef79f7f8af57b570e0";
let API_CHOOSEN = '';





export default function MovieBox({ searchQuery, choosenCategory }) {

    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [noMovie, setNoMovie] = useState(false);
    // let noMovie = false;

    useEffect(() => {
        async function fetchMoviesDetail() {
            const response = await fetch(API_URL);
            const responseData = await response.json();
            console.log(responseData);
            setNoMovie(false);
            setMovies(responseData.results)
        }
        fetchMoviesDetail();
    }, []);



    useEffect(() => {
        if (searchQuery) {
            async function searchMovie() {
                const response = await fetch(API_SEARCH + `&query=${searchQuery}`);
                const responseData = await response.json();
                if (responseData.results.length === 0) {
                    setNoMovie(true);
                    setMovies(responseData.results);
                    choosenCategory=''; 
                }
                else if(responseData.results.length>0) {
                    setNoMovie(false);
                    setMovies(responseData.results);
                }
                console.log("this is searched movie list");
                console.log(movies); // next render only it is visible
            }
            searchMovie();
        }
    }, [searchQuery]);

    useEffect(() => {
        if (choosenCategory) {
            if (choosenCategory === 'trending') { API_CHOOSEN = API_TRENDING }
            else if (choosenCategory === 'upcoming') { API_CHOOSEN = API_UPCOMING }
            else if (choosenCategory === 'popularShows') { API_CHOOSEN = API_TV_SHOWS }
            async function trendingMovies() {
                const response = await fetch(API_CHOOSEN);
                const responseData = await response.json();
                setNoMovie(false);
                setMovies(responseData.results);
                console.log('this is trending movies');
                console.log(movies);
            }
            trendingMovies();
        }
    }, [choosenCategory]);




    function handleViewMore(movie) {
        setShowModal(true);
        setSelectedMovie(movie);
    }
    function handleModalClose() {
        setShowModal(false);
    }

    function choosenMedia(choosenCategory, movieItems) {
        if (choosenCategory === 'upcoming') {
            return (movieItems.original_title)
        }
        else if (choosenCategory === 'popularShows') {
            return movieItems.original_name
        }
        else if ((choosenCategory === 'trending') && (movieItems.media_type === 'tv')) {
            return movieItems.original_name
        }
        else if ((choosenCategory === 'trending') && (movieItems.media_type === 'movie')) {
            return movieItems.original_title
        }
        if ((choosenCategory != 'upcoming' && choosenCategory != 'trending' && choosenCategory != 'popularShows')) {
            return movieItems.original_title
        }
    }

    return (
        <div className="container" >
            <div className="grid">
                {!noMovie && movies.map((movieItems) => (
                    <div className="card text-center bg-secondary mb-3">
                        <div className="card body main-card" key={movieItems.id}>
                            <img className="card-img-top" src={API_IMG + movieItems.poster_path} alt="Movie_Image"/>
                            <p>{choosenMedia(choosenCategory, movieItems)}</p>
                        </div>
                        <div className="card-body view-more-body">
                            <button className='btn btn-warning view-button' onClick={() => handleViewMore(movieItems)}>View More!</button>
                            {selectedMovie && <Modal open={showModal} onClose={handleModalClose}>
                                <Container className="modal-container">
                                    <Row>
                                        <Col sm={8} className="image-detail-column">
                                            <div className="modal-display">
                                                <img className="modal-img" src={API_IMG + selectedMovie.poster_path} alt="MovieImages" />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="movie-deails-modal image-detail-column">
                                                <div className="movie-details">
                                                    <p className="modal-movie-heading">Movie Name : </p>
                                                    <p>{choosenMedia(choosenCategory, selectedMovie)}</p>
                                                    <p className="modal-movie-heading">Overview : </p>
                                                    <p>{selectedMovie.overview}</p>
                                                    <p className="modal-movie-heading">Release Date:</p>
                                                    <p>{selectedMovie.release_date}</p>
                                                    <p className="modal-movie-heading">Rating:</p>
                                                    <p>{Math.round((selectedMovie.vote_average) * 10) / 10}/10</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-warning" onClick={handleModalClose}>Close</button>
                                    </div>
                                </Container>
                            </Modal>}
                        </div>
                    </div>
                ))
                }

            </div>
            {noMovie && <NoMovies />}
        </div>
    );
}
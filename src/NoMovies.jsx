import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import imageSlate from '../src/assets/FilmSlate.png'
import './NoMovies.css'

export default function NoMovies() {
    return (
        <>
            <div className='app-container'>
                <div className='noMovie-content'>
                    <img src={imageSlate} alt='noMovies' />
                </div>
            </div>
            <div className='app-text'>
                <p> NO MOVIES EXISTS !</p>
            </div>
        </>
    );
}
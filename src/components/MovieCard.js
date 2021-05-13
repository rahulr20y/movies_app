import React from 'react';
import {addFavourite, removeFromFavourites} from '../actions';
import movies from '../reducers';

class MovieCard extends React.Component {

    handleFavouriteClick = () => {
        const {movie} = this.props;
        this.props.dispatch(addFavourite(movie));
    }
    handleUnFavouriteClick = () => {
        const {movie} = this.props;
        this.props.dispatch(removeFromFavourites(movie));
    }
    render(){
        const {movie, isFavorite} = this.props
        return (
            <div className='movie-card'>
                <div className='left'>
                    <img src={movie.Poster} alt="movie poster" />
                </div>
                <div className='right'>
                    <div className='title'>{movie.Title}</div>
                    <div className='plot'>{movie.Plot}</div>
                    <div className='footer'>
                        <div className='rating'>{movie.imdbRating}</div>
                        {
                            isFavorite
                            ? <button className='unfavourite-btn' onClick={ this.handleUnFavouriteClick }>Unfavourites</button>
                            : <button className='favourite-btn' onClick={ this.handleFavouriteClick }>Favourites</button>
                        }
                    </div>
                </div>
            </div>
          );
    }

}

export default MovieCard;
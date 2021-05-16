import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import React from 'react';
import { addMovies, setShowFavourites } from '../actions';

class App extends React.Component {

  componentDidMount(){
    const {store} = this.props;
    store.subscribe( () => {
      console.log('UPDATED');
      this.forceUpdate();
    })
    // make API calls
    //Dispatch actions
    this.props.store.dispatch(addMovies(data));

    console.log('STATE', this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
     const { movies } = this.props.store.getState();
    //let favourites = this.props.store.getState().favourites;

    const index = movies.favourites.indexOf(movie);
    //console.log(index)
    if (index !== -1){
      return true;
    }
    return false;

  }
  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  }

  render() {
    const {movies, search} = this.props.store.getState(); // {movies: {} , search: {}}
    const {list, favourites, showFavourites} = movies;
    console.log('RENDER',this.props.store.getState());
    
    const displayMovies = showFavourites ? favourites : list;
    return (
        <div className="App">
          <Navbar store={this.props.store} search={search}/>
          <div className="main">
            <div className="tabs">
              <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
              <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
            </div>

            <div className="list">
                {displayMovies.map( (movie, index) => (
                    <MovieCard 
                      movie={movie}
                      key={`movies-${index}`}
                      dispatch={this.props.store.dispatch}
                      isFavorite = {this.isMovieFavourite(movie)}
                    />
                ))}
            </div>
            {displayMovies.length === 0 ? <div className="no-movies">No movies to display! </div> : null}
          </div>
        </div>
      );
    }
}

export default App;

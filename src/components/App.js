import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import React from 'react';
import { addMovies, setShowFavourites } from '../actions';
import { connect } from '../index';

class App extends React.Component {

  componentDidMount(){
    // make API calls
    //Dispatch actions
    this.props.dispatch(addMovies(data));

    //console.log('STATE', this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
     const { movies } = this.props;
    //let favourites = this.props.store.getState().favourites;

    const index = movies.favourites.indexOf(movie);
    //console.log(index)
    if (index !== -1){
      return true;
    }
    return false;

  }
  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  }

  render() {
    const {movies, search} = this.props; // {movies: {} , search: {}}
    const {list, favourites, showFavourites} = movies;
    //console.log('RENDER',this.props.store.getState());

    const displayMovies = showFavourites ? favourites : list;

    return (
        <div className="App">
          <Navbar search={search}/>
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
                      dispatch={this.props.dispatch}
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


// class AppWrapper extends React.Component {
//     render() {
//       return (
//         <StoreContext.Consumer>
//           {(store) => <App store={store} />}
//         </StoreContext.Consumer>
//       )
//     }
// }


function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.movies
  };
}

const connectedAppComponent = connect(mapStateToProps)(App); 

export default connectedAppComponent;

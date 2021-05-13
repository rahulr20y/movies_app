import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import React from 'react';
import { addMovies } from '../actions';

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
     const { favourites } = this.props.store.getState();
    //let favourites = this.props.store.getState().favourites;

    const index = favourites.indexOf(movie);
    //console.log(index)
    if (index !== -1){
      return true;
    }
    return false;

  }

  render() {
  const {list} = this.props.store.getState(); // {list: [] , favourites: []}
  console.log('RENDER',this.props.store.getState());
  return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>

          <div className="list">
              {list.map( (movie, index) => (
                  <MovieCard 
                    movie={movie}
                    key={`movies-${index}`}
                    dispatch={this.props.store.dispatch}
                    isFavorite = {this.isMovieFavourite(movie)}
                  />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

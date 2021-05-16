import React from 'react';
//import {data} from '../data';
import { addMovieToList, handleMovieSearch } from '../actions';

class Navbar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            searchText: ''
        }
    }

    handleAddToMovies = (movie) => {
        this.props.store.dispatch(addMovieToList(movie));
        this.setState({
            showSearchResults : false
        })
    }
    handleSearch = () =>{
        const {searchText} = this.state;
        //console.log(searchText);
        this.props.store.dispatch(handleMovieSearch(searchText));
    }
    handleChange = (e) => {
        this.setState({
            searchText: e.target.value
        });
    }

    render(){
        const {result, showSearchResults} = this.props.search;

        return (

            <div className='nav'>
                <div className='search-container'>
                    <input onChange={this.handleChange} />
                    <button id='search-btn' onClick={this.handleSearch}>Search</button>

                    {
                        showSearchResults && 
                        <div className='search-results'>
                            <div className='search-result'>
                                <img src={result.Poster} alt="movie-poster"/>
                                <div className='movie-info'>
                                    <span>{result.Title}</span>
                                    <button onClick={() => this.handleAddToMovies(result)}>Add To Movies</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
          );
    }

}

export default Navbar;
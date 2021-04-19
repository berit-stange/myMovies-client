import React from 'react'; //import React into file
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component { //exposing the component

    constructor() {
        super(); //initializes component’s state
        this.state = {
            movies: [],
            selectedMovie: null //tells the application that no movie cards were clicked
        };
    }

    componentDidMount() {
        axios.get('https://movie-app-001.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (selectedMovie) return <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => {
            this.setSelectedMovie(newSelectedMovie);
        }} />;

        if (movies.length === 0) return <div className="main-view">The list is empty</div>;

        return (
            <div className="main-view">
                {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={newSelectedMovie => { this.setState({ selectedMovie: newSelectedMovie }); }} />)}
            </div>
        );
    }
}

import React from 'react'; //import React into file
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component { //exposing the component

    constructor() {
        super(); //initializes component’s state
        this.state = {
            movies: [
                { _id: 1, Title: 'Adams Apples', Description: 'Adam, a former neo-Nazi, is temporarily assigned to live in a religious enclave. The community is led by Ivan, an eternally optimistic priest. In order to move forward with his rehabilitation, Adam must select a task, so he decides to bake an apple pie. However, his simple choice is complicated by having to use apples from a tree that is plagued by problems.', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMTU4NTc5NjM5M15BMl5BanBnXkFtZTgwODEyMTE0MDE@._V1_FMjpg_UX1000_.jpg', Director: 'Anders Thomas Jensen', Genre: 'Black Comedy' },
                { _id: 2, Title: 'Parasite', Description: 'desc2...', ImagePath: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX1000_.jpg', Director: 'Bong Joon-ho', Genre: 'Drama' },
                { _id: 3, Title: 'What we do in the shadows', Description: 'Viago, Deacon and Vladislav are vampires who are finding that modern life has them struggling with the mundane - like paying rent, keeping up with the chore wheel, trying to get into nightclubs and overcoming flatmate conflicts.', ImagePath: 'https://www.newdvdreleasedates.com/images/posters/large/what-we-do-in-the-shadows-2014-03.jpg', Director: 'Taika Waititi', Genre: 'Mockumentary' }
            ],
            selectedMovie: null //tells the application that no movie cards were clicked
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        // if (selectedMovie) return <MovieView movieData={selectedMovie} />;

        if (movies.length === 0) return <div className="main-view">The list is empty</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                    ))
                }
                {/* {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={newSelectedMovie => { this.setState({ selectedMovie: newSelectedMovie }); }} />)} */}
                {/* {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)} */}
            </div>
        );
    }
}

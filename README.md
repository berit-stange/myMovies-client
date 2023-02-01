# myMovies-client

## Project description
Building the client-side for an application called myMovies based on
its existing server-side code (REST API and database) using React

![myMovies-client](./src/img/my-movies-app-in-use-2_1.gif)

## Features
- Allows users to see a list of all movies in the database
- Allows users to see a fliter list of all movies in the database by title
- Allows users to get detailed information about a single movie by movie title
- Allows users to get detailed information about a genre by genre name
- Allows users to get detailed information about a director by name
- Allows new users to create an user account
- Allows existing users to update their user info or to delete their account
- Allows existing users to add or remove movies to/from their list of favorites

## API
Loading movie data via the REST API: [github.com/berit-stange/movie_api](https://https://github.com/berit-stange/movie_api/blob/comments-and-documentation/README.md)

## Database
MongoDB Atlas

Collections: movies, user

## Dependencies 
Install dependencies: 
```bash
npm install
```

## Building
Setting up parcel: 
```bash
npm install -g parcel-bundler
```

### Run application in browser
Parcel will run a local server on port: 1234

Open the application in your browser:
``` 
http://localhost:1234/
```

## Dependencies
- React
- ReactDOM
- React-Bootstrap
- Axios
- PropTypes
- Redux


## Deployment
Hosted on Netlify: [ mymovies-app.netlify.app ](https://mymovies-app.netlify.app/) 
import React from "react";


class MovieInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieId: '',
      title: '',
      backdrop_path: '',
      overview: '',
      release_date: '',
      hours: 0,
      minutes: 0,
      imdb_id: ''
    };

    this.handleBackClick = this.handleBackClick.bind(this);
  }

  // componentDidUpdate(e) {
  //   // Fetch movie data
  //   if (this.props.movieId !== 'default') {
  //     if (this.props.movieId !== this.state.movieId) {
  //       let movieUrl = `https://api.themoviedb.org/3/movie/${this.props.movieId}?api_key=5dee9b99bfc124fbabfa815c9bb193ba&language=en-US`;
  //       let _movieId = this.props.movieId;

  //       fetch(movieUrl)
  //         .then(res => res.json())
  //         .then(resObj => {
  //           let releaseDate = resObj.release_date;
  //           let runtime = resObj.runtime;
  //           let year = releaseDate.substr(0, releaseDate.indexOf('-'));

  //           // format runtime
  //           let _hours = 0;
  //           let _minutes = 0;
  //           let justMinutes = false;
  //           while (justMinutes === false) {
  //             if (runtime >= 60) {
  //               runtime -= 60;
  //               _hours++;
  //             }
  //             else {
  //               _minutes = runtime;
  //               justMinutes = true;
  //             }
  //           }

  //           this.setState({
  //             movieId: _movieId,
  //             title: resObj.original_title,
  //             backdrop_path: resObj.backdrop_path,
  //             overview: resObj.overview,
  //             release_date: year,
  //             hours: _hours,
  //             minutes: _minutes,
  //             imdb_id: resObj.imdb_id
  //           })
  //         });
  //     }
  //   }
  // }

  handleBackClick(e) {
    this.props.backClicked(true);
  }

  render() {
    return (
      <div className="grid-container">
        <div className="grid-x grid-margin-x">
          <div className="cell small-12 medium-10 medium-offset-1 large-8 large-offset-2">
          <button onClick={this.handleBackClick}><i className="fi-arrow-left white-text large-icon"></i></button>
            <img src={`https://image.tmdb.org/t/p/w500${this.props.backdrop_path}`} alt="Movie backdrop"/>
            <h1>{this.props.title}</h1>
            <p className="movie-metadata">{this.props.release_date}</p>
            <p className="movie-metadata">{this.props.hours}hr {this.props.minutes}min</p>
            <a className="movie-metadata" href={`https://www.imdb.com/title/${this.props.imdb_id}`} target="_blank" >IMDB</a>
            <p>{this.props.overview}</p>
            <p><a href="#">Watch Now</a></p>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieInfo;
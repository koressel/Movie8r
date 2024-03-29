import React from 'react';
import './App.css';
import 'jquery';
import './lib/foundation.min.css';
import SearchBar from './components/searchbar';
import GenreMenu from './components/genremenu';
import Pagination from './components/pagination';
import MovieInfo from './components/movieinfo';
import PageTitle from './components/pagetitle';


class Movie8r extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      APIKEY: process.env.REACT_APP_TMDB_API_KEY,
      baseURL: 'https://api.themoviedb.org/3/',
      movieElements: [],
      currentURL: `https://api.themoviedb.org/3/discover/movie?&api_key=${'5dee9b99bfc124fbabfa815c9bb193ba'}`,
      movieId: 'default',
      nextURL: '',
      prevTitle: "",
      title: "New Release",
      backdrop_path: "",
      overview: "",
      release_date: "",
      hours: 0,
      minutes: 0,
      imdb_id: "",
      bgColor: "blue",
      page: 1,
      maxPage: 1,

    };

    this.handleMovieClick = this.handleMovieClick.bind(this);
    this.newSearch = this.newSearch.bind(this);
    this.genreChange = this.genreChange.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.backClicked = this.backClicked.bind(this);
  }


  componentDidMount() {
    const $ = window.$;
    $(document).foundation();

    fetch(this.state.currentURL)
      .then(res => res.json())
      .then(resultObj => {
        if (this.state.page === 1) {
          let lastPageI = document.querySelector('#back-button i');
          lastPageI.classList.remove('white-text');
          lastPageI.classList.add('grey-text');
          let lastPageA = document.querySelector('#back-button');
          lastPageA.classList.add('disabled');
        }
        let maxPage = resultObj.total_pages;
        console.log(resultObj);
        let result = resultObj.results;
        // let backdropID = 1;
        let movieElements = result.map(movie => {
          return (
            <div className="movie cell small-4 medium-3 large-2" key={movie.id}>
              <img onClick={this.handleMovieClick} src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} id={movie.id} alt={movie.original_title} />
            </div>
          );
        });

        this.setState({ movieElements: movieElements, maxPage: maxPage});
      });
  }

  componentDidUpdate() {
    if (this.state.nextURL !== this.state.currentURL) {
      if (this.state.nextURL !== '') {
        fetch(this.state.nextURL)
          .then(res => res.json())
          .then(resultObj => {
            let _maxPage = resultObj.total_pages;

            // update page buttons
            if (this.state.page === 1) {
              let lastPageI = document.querySelector('#back-button i');
              lastPageI.classList.remove('white-text');
              lastPageI.classList.add('grey-text');
              let lastPageA = document.querySelector('#back-button');
              lastPageA.classList.add('disabled');
            }
            else {
              let lastPageI = document.querySelector('#back-button i');
              lastPageI.classList.remove('grey-text');
              lastPageI.classList.add('white-text');
              let lastPageA = document.querySelector('#back-button');
              lastPageA.classList.remove('disabled');
            }

            if (this.state.page === _maxPage) {
              let nextPageI = document.querySelector('#forward-button i');
              nextPageI.classList.remove('white-text');
              nextPageI.classList.add('grey-text');
              let nextPageA = document.querySelector('#forward-button');
              nextPageA.classList.add('disabled');
            }

            //update movies
            let result = resultObj.results;
            let errorMsg = document.getElementById('error-callout');
            if (result.length === 0) {
              errorMsg.style.display = 'block';
            }
            let movieElements = result.map(movie => {
              return (
                <div className="movie cell small-4 medium-3 large-2" key={movie.id}>
                  <img onClick={this.handleMovieClick} src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} id={movie.id} alt={movie.original_title} />
                </div>
              );
            });

            this.setState({
              movieElements: movieElements,
              currentURL: this.state.nextURL,
              maxPage: _maxPage
            });
          });
      }
    }
  }

  handleMovieClick(e) {
    let id = e.target.id;
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=5dee9b99bfc124fbabfa815c9bb193ba&language=en-US`;
    let movies = document.querySelector('#movie-container');
    let info = document.querySelector('#info-container');
    let pagination = document.querySelector('#pagination');

    // show info overlay
    movies.classList = ('hide grid-x grid-margin-x');
    pagination.classList = 'hide text-center';
    info.classList = "";

    fetch(url)
    .then(res => res.json())
    .then(resObj => {
      let releaseDate = resObj.release_date;
      let runtime = resObj.runtime;
      let year = releaseDate.substr(0, releaseDate.indexOf('-'));

      // format runtime
      let _hours = 0;
      let _minutes = 0;
      let justMinutes = false;
      while (justMinutes === false) {
        if (runtime >= 60) {
          runtime -= 60;
          _hours++;
        }
        else {
          _minutes = runtime;
          justMinutes = true;
        }
      }

      const colors = ["blue","green","orange", "purple"];
      const currentColor = this.state.bgColor;
      let nextColor = "";
      if (currentColor === colors[colors.length-1]) {
        nextColor = "blue";
      }
      else {
        nextColor = colors[colors.indexOf(currentColor) + 1];
      }

      const _prevTitle = this.state.title;

      this.setState({
        movieId: id,
        prevTitle: _prevTitle,
        title: resObj.original_title,
        backdrop_path: resObj.backdrop_path,
        overview: resObj.overview,
        release_date: year,
        hours: _hours,
        minutes: _minutes,
        imdb_id: resObj.imdb_id,
        bgColor: nextColor
      })
    });
  }

  newSearch(keywords) {

    let nextPageI = document.querySelector('#forward-button i');
    nextPageI.classList.add('white-text');
    let nextPageA = document.querySelector('#forward-button');
    nextPageA.classList.remove('disabled');

    // set genre to default
    let newReleaseOption = document.querySelector('#genre-menu').getElementsByTagName('option')[0];
    newReleaseOption.selected = 'selected';
    let currentURL = this.state.currentURL;

    // change directory
    let params = currentURL.substring(44);
    let _nextURL = `${this.state.baseURL}search/movie?${params}`;

    // reset page to 1
    let pstart = _nextURL.search('&page=');
    if (pstart !== -1) {
      pstart += 6;
      let pvalue = _nextURL.substring(pstart);

      let pend = pvalue.indexOf('&');
      pend = pstart + pend;
      _nextURL = _nextURL.substring(0, pstart) + '1' + _nextURL.substring(pend);

    }
    else {
      pstart = _nextURL.search('/movie?');
      pstart += 7;
      _nextURL = _nextURL.substring(0, pstart) + '&page=1' + _nextURL.substring(pstart);
    }

    // write query to url
    let start = _nextURL.search('&query=');
    if (start !== -1) {
      start += 7;
      _nextURL = _nextURL.substring(0, start);
      _nextURL += keywords
    }
    else {
      _nextURL += `&query=${keywords}`;
    }

    // remove genre 
    let gstart = _nextURL.search('with_genres=');
    if (gstart !== -1) {
      let gvalue = _nextURL.substring(gstart);
      let gend = gvalue.indexOf('&');
      gend = gstart + gend;
      _nextURL = _nextURL.substring(0, gstart - 1) + _nextURL.substring(gend);
    }

    const colors = ["blue","green","orange", "purple"];
    const currentColor = this.state.bgColor;
    let nextColor = "";
    if (currentColor === colors[colors.length-1]) {
      nextColor = "blue";
    }
    else {
      nextColor = colors[colors.indexOf(currentColor) + 1];
    }
    
    this.setState({ 
      nextURL: encodeURI(_nextURL), 
      page: 1, 
      title: keywords,
      bgColor: nextColor
    });
  }

  genreChange(genreID) {
    let genreName = "";
    switch (genreID) {
      case 0:
        genreName = 'New Release';
        break;
      case 28:
        genreName = 'Action';
        break;
      case 12:
        genreName = 'Adventure';
        break;
      case 16:
        genreName = 'Animation';
        break;
      case 35:
        genreName = 'Comedy';
        break;
      case 80:
        genreName = 'Crime';
        break;
      case 99:
        genreName = 'Documentary';
        break;
      case 18:
        genreName = 'Drama';
        break;
      case 10751:
        genreName = 'Family';
        break;
      case 14:
        genreName =  'Fantasy';
        break;
      case 36:
        genreName = 'History';
        break;
      case 27:
        genreName = 'Horror';
        break;
      case 10402:
        genreName = 'Music';
        break;
      case 9648:
        genreName = 'Mystery';
        break;
      case 10749:
        genreName = 'Romance';
        break;
      case 878:
        genreName = 'Science Fiction';
        break;
      case 53:
        genreName = 'Thriller';
        break;
      case 10752:
        genreName = 'War';
        break;
      case 37:
        genreName = 'Western';
        break;
      default:
        genreName = 0;
    }
 
    let nextPageI = document.querySelector('#forward-button i');
    nextPageI.classList.add('white-text');
    let searchText = document.querySelector('.search');
    searchText.placeholder = 'search';

    let currentURL = this.state.currentURL;
    let _nextURL;

    // change directory
    let dir = 'https://api.themoviedb.org/3/discover/movie?';
    if (this.state.currentURL.substring(0, 42) === 'https://api.themoviedb.org/3/search/movie?') {
      currentURL = dir + currentURL.substring(42)
    }

    // reset page to 1
    let pstart = currentURL.search('&page=');
    if (pstart !== -1) {
      pstart += 6;
      let pvalue = currentURL.substring(pstart);

      let pend = pvalue.indexOf('&');
      pend = pstart + pend;
      _nextURL = currentURL.substring(0, pstart) + '1' + currentURL.substring(pend);

    }
    else {
      pstart = currentURL.search('/movie?');
      pstart += 7;
      _nextURL = currentURL.substring(0, pstart) + '&page=1' + currentURL.substring(pstart);
    }

    if (genreID === 0) {
      let start = _nextURL.search('&with_genres=');
      if (start !== -1) {
        // update genreID
        start += 13;
        let value = _nextURL.substring(start);
        let end = value.indexOf('&');
        end = start + end;
        _nextURL = _nextURL.substring(0, (start - 13)) + _nextURL.substring(end);
      }
      // add genreID
      else {
        start = _nextURL.search('/movie?');
        start += 7;
        _nextURL = _nextURL.substring(0, start) + _nextURL.substring(start);
      }
    }
    else {
      let start = _nextURL.search('&with_genres=');
      if (start !== -1) {
        // update genreID
        start += 13;
        let value = _nextURL.substring(start);
        let end = value.indexOf('&');
        end = start + end;
        _nextURL = _nextURL.substring(0, start) + genreID + _nextURL.substring(end);
      }
      // add genreID
      else {
        start = _nextURL.search('/movie?');
        start += 7;
        _nextURL = _nextURL.substring(0, start) + '&with_genres=' + genreID + _nextURL.substring(start);
      }
    }

    // remove query
    let qstart = _nextURL.search('&query=');
    if (qstart !== -1) {
      _nextURL = _nextURL.substring(0, qstart);
    }

    const colors = ["blue","green","orange", "purple"];
    const currentColor = this.state.bgColor;
    let nextColor = "";
    if (currentColor === colors[colors.length-1]) {
      nextColor = "blue";
    }
    else {
      nextColor = colors[colors.indexOf(currentColor) + 1];
    }

    // hide info overlay if visible
    let movies = document.querySelector('#movie-container');
    let info = document.querySelector('#info-container');
    let pagination = document.querySelector('#pagination');

    info.classList = "hide";
    movies.classList = ('grid-x grid-margin-x');
    pagination.classList = 'text-center';

    this.setState({
      nextURL: encodeURI(_nextURL),
      page: 1,
      title: genreName,
      bgColor: nextColor
    });
  }

  pageChange(page) {
    if (page === (this.state.maxPage + 1)) {
      //disable forward button if only page of results
      let nextPageI = document.querySelector('#forward-button i');
      nextPageI.classList.remove('white-text');
      nextPageI.classList.add('grey-text');
      let nextPageA = document.querySelector('#forward-button');
      nextPageA.classList.add('disabled');
      return;
    }
    else {
      window.scrollTo(0, 0);

      let nextPageI = document.querySelector('#forward-button i');
      nextPageI.classList.remove('grey-text');
      nextPageI.classList.add('white-text');
      let nextPageA = document.querySelector('#forward-button');
      nextPageA.classList.remove('disabled');
      let currentURL = this.state.currentURL;
      let _nextURL;

      let start = currentURL.search('page=');
      if (start !== -1) {
        start += 5;
        let value = currentURL.substring(start);
        let end = value.indexOf('&');
        end = start + end;
        _nextURL = currentURL.substring(0, start) + page + currentURL.substring(end);
      }
      else {
        let insertionPoint = currentURL.search('/movie?');
        insertionPoint += 7;
        // insertionPoint += 21;
        _nextURL = currentURL.substring(0, insertionPoint) + '&page=' + page + currentURL.substring(insertionPoint);
      }

      this.setState({ nextURL: encodeURI(_nextURL), page: page });
    }

  }

  getGenreID(genre) {
    let id = 0;
    switch (genre) {
      case 'Action':
        id = 28;
        break;
      case 'Adventure':
        id = 12;
        break;
      case 'Animation':
        id = 16;
        break;
      case 'Comedy':
        id = 35;
        break;
      case 'Crime':
        id = 80;
        break;
      case 'Documentary':
        id = 99;
        break;
      case 'Drama':
        id = 18;
        break;
      case 'Family':
        id = 10751;
        break;
      case 'Fantasy':
        id = 14;
        break;
      case 'History':
        id = 36;
        break;
      case 'Horror':
        id = 27;
        break;
      case 'Music':
        id = 10402;
        break;
      case 'Mystery':
        id = 9648;
        break;
      case 'Romance':
        id = 10749;
        break;
      case 'Science Fiction':
        id = 878;
        break;
      case 'Thriller':
        id = 53;
        break;
      case 'War':
        id = 10752;
        break;
      case 'Western':
        id = 37;
        break;
      default:
        id = 0;
    }

    return id;
  }

  backClicked(boolean) {
    let movies = document.querySelector('#movie-container');
    let info = document.querySelector('#info-container');
    let pagination = document.querySelector('#pagination');

    info.classList = "hide";
    movies.classList = ('grid-x grid-margin-x');
    pagination.classList = 'text-center';

    const colors = ["blue","green","orange", "purple"];
    const currentColor = this.state.bgColor;
    let nextColor = "";
    if (currentColor === colors[colors.length-1]) {
      nextColor = "blue";
    }
    else {
      nextColor = colors[colors.indexOf(currentColor) + 1];
    }

    this.setState({
      title: this.state.prevTitle,
      bgColor: nextColor
    });
  }

  render() {
    return (
      <div className="App">
        <div className="title-bar title-bar-show" data-responsive-toggle="mobile-menu" data-hide-for="medium">
          <div className="title-bar-left">
            <a href="/" id="logo">Movie8r</a>
          </div>
          <div className="title-bar-right">
            <button className="menu-icon" type="button" data-toggle="mobile-menu"></button>
          </div>
        </div>

        <div className="top-bar grid-x" id="mobile-menu" data-animate="hinge-in-from-top hinge-out-from-top">
          <div className="cell small-1 medium-4 large-5 show-for-medium">
            <a href="/" id="logo">Movie8r</a>
          </div>

          <div className="cell small-12 medium-5 large-5">
            <SearchBar
              newSearch={this.newSearch}
            ></SearchBar>
          </div>

          <div className="cell small-12 medium-3 large-2">
            <GenreMenu
              genreChange={this.genreChange}
              pageChange={this.pageChange}
            ></GenreMenu>
          </div>

        </div>

      <PageTitle
        title={this.state.title}
        bgColor={this.state.bgColor}
      ></PageTitle>

        <main>

          <div className="grid-container">
            <div className="grid-x">
              <div className="cell small-6 small-offset-3">
                <div id="error-callout" className="callout primary">
                  <h1>Whoops!</h1>
                  <p>It looks like there's nothing here...</p>
                  <button id="error-button" className="button">Back</button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid-container fluid">
            <div id="movie-container" className="grid-x grid-margin-x">
              {this.state.movieElements}
            </div>
            <div id="info-container" className="hide">
              <MovieInfo
                backClicked={this.backClicked}
                movieId={this.state.movieId}
                title={this.state.title}
                backdrop_path={this.state.backdrop_path}
                overview={this.state.overview}
                release_date={this.state.release_date}
                hours={this.state.hours}
                minutes={this.state.minutes}
                imdb_id={this.state.imdb_id}
              ></MovieInfo>
            </div>
          </div>

          <Pagination
            pageChange={this.pageChange}
            page={this.state.page}
          ></Pagination>
        </main>
      </div>
    );
  }
}



export default Movie8r;

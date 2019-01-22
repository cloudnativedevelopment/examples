import React, { Component }  from 'react';
import { hot } from 'react-hot-loader';

import userAvatar from './assets/images/user.jpg';
import narcosBackground from './assets/images/narcos-bg.jpg';
import narcosLogo from './assets/images/narcos-logo.png';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shows: {
        data: {},
        loaded: false
      },
      movies: {
        data: {},
        loaded: false
      }
    };
  }

  componentDidMount() {
    fetch('/api/movies')
      .then(res => res.json())
      .then(result => {
        this.setState({
          movies: {
            data: result,
            loaded: true
          }
        })
      });

    fetch('/api/shows')
      .then(res => res.json())
      .then(result => {
        this.setState({
          shows: {
            data: result,
            loaded: true
          }
        })
      });
  }

  render() {
    const { movies, shows } = this.state;
    return (
      <div className="App">
        <header className="Header">
          <div className="logo">Movies</div>
          <UserProfile />
        </header>
        <Hero />
        <TitleList title="Top TV picks for Cindy" titles={shows.data} loaded={shows.loaded}/>
        <TitleList title="Trending now" titles={movies.data} loaded={movies.loaded} />
      </div>
    );
  }
}

class Loader extends Component {
  render() {
    return (
      <div className="Loader">
        <svg version="1.1" id="loader" x="0px" y="0px"
            width="40px" 
            height="40px" 
            viewBox="0 0 50 50" 
            style={{
              enableBackground: 'new 0 0 50 50'
            }}>
          <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
            <animateTransform attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"/>
          </path>
        </svg>
      </div>
    );
  }
}


class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="UserProfile">
        <div className="User">
          <div className="name">Cindy Lopez</div>
          <div className="image"><img src={userAvatar} alt="profile" /></div>
        </div>
      </div>
    );
  }
}


class Hero extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="hero" className="Hero" style={{backgroundImage: `url(${narcosBackground})`}}>
        <div className="content">
          <img className="logo" src={narcosLogo} alt="narcos background" />
          <h2>Season 2 now available</h2>
          <p>
            A gritty chronicle of the war against Latin America's infamously violent and powerful 
            cartels.
          </p>
          <div className="button-wrapper">
            <HeroButton primary={true} text="Watch now" />
            <HeroButton primary={false} text="+ My list" />
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    );
  }
}


class HeroButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href="#" className="Button" data-primary={this.props.primary}>{this.props.text}</a>
    );
  }
}


class TitleList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let titles = '';
    if (this.props.titles.results) {
      titles = this.props.titles.results.map((title, i) => {
        if (i < 4) {
          let name = '';
          const backDrop = `http://image.tmdb.org/t/p/original${title.backdrop_path}`;
          if (!title.name) {
            name = title.original_title;
          } else {
            name = title.name;
          }
          return (
            <Item 
              key={title.id} 
              title={name} 
              score={title.vote_average} 
              overview={title.overview} 
              backdrop={backDrop} 
            />
          );  
        } else {
          return (
            <div key={title.id}></div>
          );
        }
      }); 
    } 
    return (
      <div ref="titlecategory" className="TitleList">
        <div className="Title">
          <h1>{this.props.title}</h1>
          <div className="titles-wrapper">
            {titles || <Loader />}
          </div>
        </div>
      </div>
    );
  }
}


class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Item" style={{ backgroundImage: `url(${this.props.backdrop})` }} >
        <div className="overlay">
          <div className="title">{this.props.title}</div>
          <div className="rating">{this.props.score} / 10</div>
          <div className="plot">{this.props.overview}</div>
          <ListToggle />
        </div>
      </div>
    );
  }
}


class ListToggle extends Component {
  constructor(props) {
    super(props);
    this.state = { toggled: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if(this.state.toggled === true) {
      this.setState({ toggled: false });
    } else {
      this.setState({ toggled: true }); 
    }
  }

  render() {
    return (
      <div className="ListToggle" onClick={this.handleClick} data-toggled={this.state.toggled}>
        <div>
          <div style={{ width: '32px', height: '32px'}}>
            <svg className="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path d="M24,13.2c-0.6,0-1,0.4-1,1v9h-9c-0.6,0-1,0.4-1,1s0.4,1,1,1h9v9c0,0.6,0.4,1,1,1s1-0.4,1-1v-9h9c0.6,0,1-0.4,1-1    s-0.4-1-1-1h-9v-9C25,13.6,24.6,13.2,24,13.2z"/>
            </svg>
          </div>
          <div style={{ width: '32px', height: '32px'}}>
            <svg className="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path d="M33.2,16.9L21,29l-6.5-6.4c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l7.2,7.1c0.2,0.2,0.5,0.3,0.7,0.3    c0.3,0,0.5-0.1,0.7-0.3l12.8-12.8c0.4-0.4,0.4-1,0-1.4C34.2,16.5,33.6,16.5,33.2,16.9z"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);

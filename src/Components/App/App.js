import React, { Component } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

Spotify.getAccessToken();

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My playList',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
  //  if(!this.state.playlistTracks.find(playlistTracks=>playlistTracks.id === track.id)){
          //this.state.playlistTracks.push(track)
        //  this.setState({playlistTracks: this.state.playlistTracks})
    //    this.setState(prevState => ({
        //  playlistTracks: prevState.playlistTracks.push(track)
          //[prevState.playlistTracks,track]
      //  }));
    //}
    if (!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
      this.setState(prevState => ({
        playlistTracks: [...prevState.playlistTracks, track]//used the spread operator to push into the array
      }));
    }
  }

  removeTrack(track){
    this.setState({
playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
});
      }

  updatePlayListName(name){
    this.setState({playlistName:name});
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris);
   this.setState({
     searchResults: []
   });
     console.info(trackUris);
  }

  search(term){
    Spotify.search(term)
      .then(searchResults => this.setState({
        searchResults: searchResults
      }));
  }

  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
      <SearchBar onSearch ={this.search}/>
      <div className="App-playlist">
      <SearchResults searchResults = {this.state.searchResults}
                      onAdd = {this.addTrack}/>

      <Playlist playlistName = {this.state.playlistName}
                playlistTracks = {this.state.playlistTracks}
                onRemove = {this.removeTrack}
                onNameChange = {this.updatePlayListName}
                onSave={this.savePlaylist}/>

      </div>
      </div>
      </div>
    );
  }
}

export default App;

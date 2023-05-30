import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="container">
          <header>IMA SDK DAI Demo (HLS.JS)</header>

          <div id="input-wrapper">
            <strong>Stream type:</strong>
            <div class="radio-group">
              <input type="radio" id="live-radio" name="stream-type" checked/>
              <label for="live-radio">Live (<span id="sample-live-link" class="link">Sample</span>)</label>
            </div>
            <div class="radio-group">
              <input type="radio" id="vod-radio" name="stream-type"/>
              <label for="vod-radio">VOD (<span id="sample-vod-link" class="link">Sample</span>)</label>
            </div>
            <div id="live-inputs" class="input-group">
              <label for="asset-key" class="input-group">Asset key: </label>
              <input type="text" id="asset-key" class="input-group"/><br />
              <label for="live-api-key" class="input-group">API Key (optional): </label>
              <input type="text" id="live-api-key" class="input-group"/>
            </div>
            <div id="vod-inputs" class="input-group">
              <label for="cms-id" class="input-group">CMS ID: </label>
              <input type="text" id="cms-id"/>
              <label for="video-id" class="input-group">Video ID: </label>
              <input type="text" id="video-id" class="input-group"/><br />
              <label for="vod-api-key" class="input-group">API Key (optional): </label>
              <input type="text" id="vod-api-key" class="input-group"/>
            </div>
          </div>

          <div id="video-player">
            <video id="content"></video>
            <div id="ad-ui"></div>
          </div>
          <div id="progress"></div>
          <div id="buttons">
            <button id="play-button" class="button">Play</button>
            <button id="bookmark-button" class="button">Save Bookmark to URL</button>
          </div>
          <div id="companion"></div>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </div>
  );
}

export default App;

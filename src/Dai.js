// This stream will be played if ad-enabled playback fails.

const BACKUP_STREAM =
    'http://storage.googleapis.com/testtopbox-public/video_content/bbb/' +
    'master.m3u8';

// Live stream asset key.
const TEST_ASSET_KEY = 'c-rArva4ShKVIAkNfy6HUQ';

// VOD content source and video IDs.
const TEST_CONTENT_SOURCE_ID = '2489270';
const TEST_VIDEO_ID = '9000000000067127';

// StreamManager which will be used to request ad-enabled streams.
let streamManager;

// hls.js video player.
const hls = new Hls({autoStartLoad: false});

// Radio button for Live Stream.
let liveRadio;

// Radio button for VOD stream.
let vodRadio;

// Live sample fake link.
let liveFakeLink;

// VOD sample fake link.
let vodFakeLink;

// Wrapper for live input fields.
let liveInputs;

// Wrapper for VOD input fields.
let vodInputs;

// Text box with asset key.
let assetKeyInput;

// Text box with live API key.
let liveAPIKeyInput;

// Text box with CMS ID.
let cmsIdInput;

// Text box with Video ID.
let videoIdInput;

// Text box with VOD API key.
let vodAPIKeyInput;

// Video element.
let videoElement;

// Play button.
let playButton;

// Button to save bookmark to URL.
let bookmarkButton;

// Companion ad div.
let companionDiv;

// Div showing current ad progress.
let progressDiv;

// Ad UI div.
let adUiDiv;

// Flag tracking if we are currently in snapback mode or not.
let isSnapback;

// Time to seek to after an ad if that ad was played as the result of snapback.
let snapForwardTime;

// Content time for stream start if it's bookmarked.
let bookmarkTime;

// Whether we are currently playing a live stream or a VOD stream
let isLiveStream;

// Whether the stream is currently in an ad break.
let isAdBreak;

/**
 * Initializes the page.
 */
const initPage = () => {
  initUI();
  initPlayer();
}

const initUI = () => {
    liveRadio = document.getElementById('live-radio');
    vodRadio = document.getElementById('vod-radio');
    liveFakeLink = document.getElementById('sample-live-link');
    vodFakeLink = document.getElementById('sample-vod-link');
    liveInputs = document.getElementById('live-inputs');
    vodInputs = document.getElementById('vod-inputs');
    assetKeyInput = document.getElementById('asset-key');
    liveAPIKeyInput = document.getElementById('live-api-key');
    cmsIdInput = document.getElementById('cms-id');
    videoIdInput = document.getElementById('video-id');
    vodAPIKeyInput = document.getElementById('vod-api-key');
  
    liveRadio.addEventListener('click', onLiveRadioClick);
  
    vodRadio.addEventListener('click', onVODRadioClick);
  
    liveFakeLink.addEventListener('click', () => {
      onLiveRadioClick();
      assetKeyInput.value = TEST_ASSET_KEY;
    });
  
    vodFakeLink.addEventListener('click', () => {
      onVODRadioClick();
      cmsIdInput.value = 2489270;
      videoIdInput.value = 9000000000067127;
    });
}

const initPlayer = () => {
    videoElement = document.getElementById('content');
    playButton = document.getElementById('play-button');
    bookmarkButton = document.getElementById('bookmark-button');
    adUiDiv = document.getElementById('ad-ui');
    progressDiv = document.getElementById('progress');
    companionDiv = document.getElementById('companion');
  
    const queryParams = getQueryParams();
    bookmarkTime = parseInt(queryParams['bookmark']) || null;
  
    videoElement.addEventListener('seeked', onSeekEnd);
    videoElement.addEventListener('pause', onStreamPause);
    videoElement.addEventListener('play', onStreamPlay);
  
    streamManager = new google.ima.dai.api.StreamManager(videoElement, adUiDiv);
    streamManager.addEventListener(
        google.ima.dai.api.StreamEvent.Type.LOADED, onStreamLoaded, false);
    streamManager.addEventListener(
        google.ima.dai.api.StreamEvent.Type.ERROR, onStreamError, false);
    streamManager.addEventListener(
        google.ima.dai.api.StreamEvent.Type.AD_PROGRESS, onAdProgress, false);
    streamManager.addEventListener(
        google.ima.dai.api.StreamEvent.Type.AD_BREAK_STARTED, onAdBreakStarted,
        false);
    streamManager.addEventListener(
        google.ima.dai.api.StreamEvent.Type.AD_BREAK_ENDED, onAdBreakEnded,
        false);
    streamManager.addEventListener(
        google.ima.dai.api.StreamEvent.Type.STARTED, onAdStarted, false);
  
    hls.on(Hls.Events.FRAG_PARSING_METADATA, function(event, data) {
      if (streamManager && data) {
        // For each ID3 tag in our metadata, we pass in the type - ID3, the
        // tag data (a byte array), and the presentation timestamp (PTS).
        data.samples.forEach(function(sample) {
          streamManager.processMetadata('ID3', sample.data, sample.pts);
        });
      }
    });
  
    playButton.addEventListener('click', onPlayButtonClick);
    bookmarkButton.addEventListener('click', onBookmarkButtonClick);
  }

  
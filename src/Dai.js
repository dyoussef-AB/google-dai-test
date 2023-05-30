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
function initPage() {
  initUI();
  initPlayer();
}

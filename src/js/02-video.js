import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iFrameEl = document.querySelector('#vimeo-player');
const VIDEO_PLAYER_CURRENT_TIME = 'videoplayer-current-time';
const player = new Player(iFrameEl);

const currentTime = localStorage.getItem(VIDEO_PLAYER_CURRENT_TIME);

const handlerCurrentTime = data => {
	localStorage.setItem(VIDEO_PLAYER_CURRENT_TIME, data.seconds);
};
if (currentTime === null) {
	player.setCurrentTime(0);
}
player.setCurrentTime(currentTime);
player.on('timeupdate', throttle(handlerCurrentTime, 1000));
player.setVolume(0.02);

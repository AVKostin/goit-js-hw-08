import throttle from 'lodash.throttle';

const iFrame = document.querySelector('#vimeo-player');
const VIDEO_PLAYER_CURRENT_TIME = 'videoplayer-current-time';
const player = new Vimeo.Player(iFrame);
const currentTime = localStorage.getItem(VIDEO_PLAYER_CURRENT_TIME);

const handlerCurrentTime = data => {
	localStorage.setItem(VIDEO_PLAYER_CURRENT_TIME, data.seconds);
};

player.on('timeupdate', throttle(handlerCurrentTime, 1000));

player
	.setCurrentTime(currentTime)
	.then()
	.catch(error => {
		switch (error.name) {
			case 'RangeError':
				break;
			default:
				break;
		}
	});

player
	.setVolume(0.02)
	.then()
	.catch(error => {
		switch (error.name) {
			case 'RangeError':
				break;
			default:
				break;
		}
	});

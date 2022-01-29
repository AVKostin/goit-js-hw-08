import Throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const currentTime = localStorage.getItem('videoplayer-current-time');

const handlerCurrentTime = data => {
  localStorage.setItem('videoplayer-current-time', `${data.seconds}`);
};

player.on('timeupdate', Throttle(handlerCurrentTime, 1000));

player
  .setCurrentTime(currentTime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
      default:
        break;
    }
  });

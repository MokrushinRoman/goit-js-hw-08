import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const refs = {
  iframe: document.querySelector('#vimeo-player'),
};

const player = new Player(refs.iframe);
const LOCAL_STORAGE_KEY = 'videoplayer-current-time';
let videoDuration = 571;
let playerTime = 0;

// player
//   .getDuration()
//   .then(function (duration) {
//     videoDuration = duration;
//   })
//   .catch(function (error) {
//     error;
//   });
// console.log(videoDuration);

// создать слушатель и функцию записи значений в ЛХ
player.on('timeupdate', throttle(onVideoplayerCurrentTime, 1000));

function onVideoplayerCurrentTime() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      if (seconds >= videoDuration) {
        playerTime = 0;
      } else {
        playerTime = seconds;
      }

      console.log(playerTime);
    })
    .catch(function (error) {
      console.error('Remove state error: ', error.message);
    });
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(playerTime));
}

// создание функцию получения данных иx ЛХ при загрузке страницы
const getTimeFromStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
console.log('getTimeFromStorage', getTimeFromStorage);

player.setCurrentTime(getTimeFromStorage).catch(function (error) {
  console.log('Error message: ', error.message);
});

// player
//   .getEnded()
//   .then(function (ended) {
//     console.log(ended);
//   })
//   .catch(function (error) {
//     console.log('Error message: ', error.message);
//   });

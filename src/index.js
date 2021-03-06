import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


/*let safari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

if (safari) {
    console.log("is safari");

    document.addEventListener('touchmove', function (event) {
        if (event.scale !== 1) {
            event.preventDefault();
        }
    }, false);

    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        let now = (new Date()).getTime();
        if (now - lastTouchEnd <= 500) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}*/

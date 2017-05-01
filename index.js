console.log('Hello World');

const express = require('express');

const app = express();

app.use(express.static('./assets'));

app.set('view engine','ejs');

app.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'Home',
        headline: 'Welcome'
    });
});

app.get('/about', (req, res) => {
    res.render('pages/about', {
        title: 'About me',
        headline: 'Hello my friend',
        bio: 'Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und Konsonantien leben die Blindtexte.'
    })
});

app.get('/tweets', (req, res) => {
    res.render('pages/tweets', {
        title: 'Tweets',
        headline: 'My tweets'
    })
});

app.listen(8080, (err) => {
    if(err) {
        return console.error(err.message);
    }
    console.log('webapp static is listening for requests...');
});
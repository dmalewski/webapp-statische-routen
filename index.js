console.log('Hello World');

const express = require('express')

const bodyparser = require('body-parser');

const fetchTweets = require('./lib/services/twitter');

// {} explizit die Funktion rausholen
const { persistMail } = require('./lib/services/persister');

const app = express();

app.use(express.static('./assets'));

app.use(bodyparser.urlencoded({extended: true}));

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

    const query = req.query.searchTerm || 'Node.js';

    fetchTweets(query)
        .then((tweets) => {
           // console.log(tweets);

             res.render('pages/tweets', {
               title: 'Tweets',
               headline: 'My tweets',
               tweets,
             });
        });

});

app.get('/contact', (req, res) => {
    res.render('pages/contact',{
        title: 'Kontakt',
        headline: 'Send me some feedback!'
    });
});

//für die Formular Absendung
app.post('/contact', (req, res) => {

    const author = req.body.author;
    const message = req.body.message;

    persistMail(author, message)
        .then(() => {
              res.render('pages/thanks', {
                title: `Thank you, ${author}!`,
                headline: `Thanks, ${author}!`,
                subheadline: 'Awesome, your message is stored!'
             });
        })
        .catch((err) => {
            console.error(err);

            res.send('Autsch" Hat nicht geklappt.');
        });
});

app.listen(8080, (err) => {
    if(err) {
        return console.error(err.message);
    }
    console.log('webapp static is listening for requests...');
});
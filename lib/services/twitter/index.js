const request = require('request-promise');

const API_BASE_URL = 'https://delirious-cappelletti.glitch.me/tweets';

const fetchTweets = (query) => {
    return request(`${API_BASE_URL}/${query}`)
        .then((serializedTweets) => {
            const tweets = JSON.parse(serializedTweets);
    
            return tweets;
        });
};

module.exports = fetchTweets;
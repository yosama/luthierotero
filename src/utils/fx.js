
const superagent = require('superagent');
const _ = require('underscore');

module.exports = function (Config) {
  const url = process.env.OPENEXCHANGES_URL + Config.openExchangeRatesKey;
  const rates = {
    USD: 1,
    EUR: 1.1,
    GBP: 1.5
  };

  const ping = function (callback) {
    superagent.get(url, (error, res) => {
      // If error happens, ignore it because we'll try again in an hour
      if (error) {
        if (callback) {
          callback(error);
        }
        return;
      }

      let results;
      try {
        results = JSON.parse(res.text);
        _.each(results.rates || {}, (value, key) => {
          rates[key] = value;
        });
        if (callback) {
          callback(null, rates);
        }
      } catch (e) {
        if (callback) {
          callback(e);
        }
      }
    });
  };

  setInterval(ping, 60 * 60 * 1000); // Repeat every hour

  // Return the current state of the exchange rates
  const ret = () => rates;

  ret.ping = ping;
  return ret;
};

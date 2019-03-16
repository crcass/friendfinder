const friends = require('../data/friends');
const searchFriends = require('../lib/searchFriends');

module.exports = app => {
  app.get('/api/friends', (req, res) => res.json(friends));

  app.post('/api/friends', (req, res) => {
    const newUser = req.body;
    const result = searchFriends(newUser, friends);
    friends.push(newUser);
    return res.status(201).send(result);
  });
};

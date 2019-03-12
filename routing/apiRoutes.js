const friends = require('../app/data/friends');

const findFriend = (arr1, arr2) => {
  totalDifference = 0;
  for (let i = 0; i < arr1.length; i++) {
    result = arr1[i] - arr2[i];
    if (result < 0) {
      result *= -1;
    }
    totalDifference = totalDifference + result;
  }
  return totalDifference;
};

const searchFriends = (user, friends) => {
  friendScore = 50;
  bestFriend = '';
  bestFriendPhoto = '';
  friends.forEach(person => {
    if (findFriend(user.scores, person.scores) < friendScore) {
      bestFriend = person.name;
      bestFriendPhoto = person.photo;
      friendScore = findFriend(user.scores, person.scores);
    }
  });
  // console.log(bestFriend, bestFriendPhoto);
  return [bestFriend, bestFriendPhoto];
};

module.exports = app => {
  app.get('/api/friends', (req, res) => res.json(friends));

  app.post('/api/friends', (req, res) => {
    newUser = req.body;
    if (newUser) {
      res.status(201).send(searchFriends(newUser, friends));
      friends.push(newUser);
    }
  });
};

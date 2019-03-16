const findFriend = require('./findFriend');

const searchFriends = (user, friends) => {
  let friendScore = 40;
  let bestFriend = '';
  let bestFriendPhoto = '';
  let compatPercentage = 0;
  friends.forEach(person => {
    if (findFriend(user.scores, person.scores) < friendScore) {
      bestFriend = person.name;
      bestFriendPhoto = person.photo;
      friendScore = findFriend(user.scores, person.scores);
      compatPercentage = 100 - (friendScore * 2.5);
    }
  });
  return [bestFriend, bestFriendPhoto, compatPercentage];
};

module.exports = searchFriends;

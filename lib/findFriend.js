const findFriend = (arr1, arr2) => {
  let totalDifference = 0;
  arr1.forEach(
    (item, index) => (totalDifference += Math.abs(item - arr2[index]))
  );
  return totalDifference;
};

module.exports = findFriend;

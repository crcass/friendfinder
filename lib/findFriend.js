const findFriend = (arr1, arr2) => {
  let totalDifference = 0;
  arr1.forEach(
    (item, index) => (totalDifference += Math.abs(item - arr2[index]))
  );
  return totalDifference;
};

module.exports = findFriend;

// const findFriend = (arr1, arr2) => {
//   const total = arr1.reduce((prev, curr, index) => {
//     const diff = Math.abs(curr - arr2[indeex]);
//     prev += diff;
//   }, 0)
//   console.log({ total });
//   return total;
// };
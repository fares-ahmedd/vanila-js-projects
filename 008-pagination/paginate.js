const paginate = (followers) => {
  const initialNumberOfPage = 9;
  const numberOfPage = Math.ceil(followers.length / initialNumberOfPage);
  const newFollowers = Array.from({ length: numberOfPage }, (_, index) => {
    const start = index * initialNumberOfPage;
    return followers.slice(start, start + initialNumberOfPage);
  });
  return newFollowers;
  //   console.log(newFollowers);
};

export default paginate;

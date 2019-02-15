exports.createAuthor = name => {
  const array = name.split("_");
  let author = array[0].charAt(0).toUpperCase() + array[0].slice(1);
  for (let i = 1; i < array.length; i++) {
    author =
      author + " " + array[i].charAt(0).toUpperCase() + array[i].slice(1);
  }
  return author;
};

exports.getRandomText = (string_length = 5) => {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var randomstring = '';
  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring
}

exports.paginate = (page, pageSize) => {
  const offset = page * pageSize;
  const limit = pageSize;

  return {
    offset,
    limit,
  };
};
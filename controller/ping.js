const status = (req, res) => {
  res.send({
    status: 'ok'
  });
};

module.exports = { status };

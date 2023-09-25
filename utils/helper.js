const handleError = (err, res) => {
  console.log(err);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
  return;
};

const sendres = (code = 204, body, res) => {
  let resObj = body ? { ...body } : undefined;
  if (resObj) res.status(code).json(resObj);
  else res.status(code).end();
  return;
};

module.exports = { handleError, sendres };

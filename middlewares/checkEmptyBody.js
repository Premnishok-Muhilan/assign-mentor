/*
    checkEmptyBody middleware to check 
    if the request body is empty for
    POST and PUT request
*/

function checkEmptyBody(req, res, next) {
  if (req.body && Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body cannot be empty" });
  }
  next();
}

module.exports = checkEmptyBody;

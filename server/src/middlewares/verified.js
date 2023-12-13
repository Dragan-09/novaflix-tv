const verified = (req, res, next) => {
  if (!req.user.verified) {
    return res.status(400).json({
      message:
        "Your account is not verfied, we sent a verification link, check you email!",
    });
  }
  next();
};

module.exports = verified;

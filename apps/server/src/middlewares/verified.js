const verify = require("../services/email/verification");

const verified = async (req, res, next) => {
  if (!req.user.verified) {
    try {
      const v = await verify(req.user.id);
    } catch (error) {
      return res.status(400).json({
        message: "Something went wrong!",
      });
    }

    return res.status(400).json({
      message:
        "Your account is not verfied, we sent a verification link, check you email!",
    });
  }
  next();
};

module.exports = verified;

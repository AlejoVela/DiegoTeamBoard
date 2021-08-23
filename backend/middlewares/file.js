const upload = async (req, res, next) => {
  let type = req.files.image.type;
  if (type == null) {
    next();
  } else {
    if (type) {
      if (
        type !== "image/png" &&
        type !== "image/jpg" &&
        type !== "image/jpeg" &&
        type !== "image/gif"
      ) {
        return res
          .status(400)
          .send("Invalid type: only .png, .jpg, jpeg and .gif");
      } else {
        next();
      }
    }
  }
};

module.exports = upload;
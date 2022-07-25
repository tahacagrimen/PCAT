const Photo = require("../models/Photo");
const fs = require("fs");

exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1;
  const photosperPage = 6;
  const totalPhotos = await Photo.find().countDocuments();
  const photos = await Photo.find({})
    .sort("-dateCreated")
    .skip((page - 1) * photosperPage)
    .limit(photosperPage);
  res.render("index", {
    photos: photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosperPage),
  });
};

exports.getPhoto = async (req, res) => {
  let photo = await Photo.findById(req.params.id);
  res.render("photo", {
    photo,
  });
};

exports.addPhoto = (req, res) => {
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + "/../public/uploads/" + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadedImage.name,
    });
    res.redirect("/");
  });
};

exports.updatePhoto = async (req, res) => {
  let photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${photo._id}`);
};

exports.deletePhoto = async (req, res) => {
  let photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + "/../public" + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.deleteOne({ _id: req.params.id });
  res.redirect("/");
};

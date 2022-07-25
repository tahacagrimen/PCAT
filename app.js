const express = require("express");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
const photoController = require("./controllers/photoControllers");
const pageController = require("./controllers/pageControllers");
mongoose
  .connect(
    "mongodb+srv://tahacagrimen:Taha1995@cluster0.ktphj.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

// Template Engine
// Biz sayfamızın dinamik bir şekilde çalışmasını yani içeriğinde değişiklikler yapmayı isteriz. İşte burada template engine -şablon motoru- kavramı devreye girer.

// Expresse template engine kullanmak için ejs kütüphanesini ekliyoruz.
app.set("view engine", "ejs");

// Kendi yazdığımız middleware.
// const myLogger = (req, res, next) => {
//   console.log("LOGGED 1");
//   next();
// };

// const myLogger2 = (req, res, next) => {
//   console.log("LOGGED 2");
//   next();
// };

// Bir express uygulamasında statik dosyaları kullanmak için, express web çatısının express.static gömülü middleware fonksiyonu kullanılır.
app.use(express.static("public"));
// Urldeki datayı okumamızı sağlıyor
app.use(express.urlencoded({ extended: true }));
// Urldeki datayı json formatında okumamızı sağlıyor
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

// ROUTES
app.get("/", photoController.getAllPhotos);
app.get("/photos/:id", photoController.getPhoto);
app.post("/photos", photoController.addPhoto);
app.put("/photos/:id", photoController.updatePhoto);
app.delete("/photos/:id", photoController.deletePhoto);
app.get("/about", pageController.getAboutPage);
app.get("/add", pageController.getAddPage);
app.get("/photos/edit/:id", pageController.getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});

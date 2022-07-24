const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const Photo = require("./models/Photo");
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/pcat-db");

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

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add", (req, res) => {
  res.render("add");
});
// Middleware i kullanmak için app.use() kullanıyoruz.
// app.use(myLogger);
// app.use(myLogger2);

app.post("/photos", async (req, res) => {
  Photo.create(req.body);
  res.redirect("/");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});

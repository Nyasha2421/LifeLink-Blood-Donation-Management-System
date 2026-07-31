const Donor = require("../models/donor");
const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");
const bcrypt = require("bcrypt");

// GET LOGIN
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    title: "Login",
  });
};

// POST LOGIN
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.send("Invaild Email or Password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.send("Invaild Email or Password");
  }
  req.session.isLoggedIn = true;
  req.session.userId = user._id;
  return res.redirect("/");
};

// GET LOGOUT
exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};

// GET REGISTER
exports.getRegister = (req, res, next) => {
  res.render("auth/register", {
    title: "Register",
  });
};
// POST REGISTER
exports.postRegister = async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  const user = new User(req.body);
  await user.save();
  res.render("donor/DonorSuccess");
};

// GET BECOME A DONOR
exports.getBecomeDonor = (req, res, next) => {
  res.render("auth/becomeDonor", {
    title: "Become a Donor",
    errorMessage: null,
    formData: {},
  });
};

// POST BECOME A DONOR
exports.postBecomeDonor = async (req, res, next) => {
  try {
    const existingDonor = await Donor.findOne({ user: req.session.userId });
    console.log("SESSION IN DONOR", req.session);
    if (existingDonor) {
      return res.render("home/success", {
        title: "Already Registered",
        heading: "Already a Donor",
        message: "You have already registered as a blood donor.",
        smallmessage: "try after 3 months",
        buttonText: "Go To Dashboard",
        buttonLink: "/dashboard",
      });
    }
    const donor = new Donor({ ...req.body, user: req.session.userId });
    await donor.save();
    res.render("donor/DonorSuccess");
  } catch (error) {
    if (error.name === "ValidationError") {
      let message = Object.values(error.errors)[0].message;
      return res.render("auth/becomeDonor", {
        title: "Become a Donor",
        errorMessage: message,
        formData: req.body,
      });
    }
  }
};

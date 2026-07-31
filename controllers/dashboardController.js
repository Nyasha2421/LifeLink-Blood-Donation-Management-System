const User = require("../models/user");
const Donor = require("../models/donor");

exports.getDashboard = async (req, res, next) => {
  const userId = req.session.userId;
  const user = await User.findById(userId);
  const donor = await Donor.findOne({ user: userId });
  res.render("dashboard/dashboard", {
    title: "Dashboard",
    user,
    donor,
  });
};

exports.getEditDonor = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const donor = await Donor.findOne({ user: userId });
    res.render("dashboard/edit-donor", {
      title: "Edit Donor Profile",
      donor,
      errorMessage: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.postEditDonor = async (req, res, next) => {
  const userId = req.session.userId;
  try {
    await Donor.findOneAndUpdate({ user: userId }, req.body, {
      new: true,
      runValidators: true,
    });
    res.redirect("/dashboard");
  } catch (error) {
    if (error.name === "ValidationError") {
      let message = Object.values(error.errors)[0].message;
      return res.render("dashboard/edit-donor", {
        title: "Edit Donor Profile",
        errorMessage: message,
        donor: {
          ...req.body,
          _id: userId,
        },
        formData: req.body,
      });
    }
  }
};

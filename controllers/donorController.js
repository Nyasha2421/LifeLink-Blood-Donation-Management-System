const { default: mongoose } = require("mongoose");

const Donor = require("../models/donor");
exports.getDonors = async (req, res, next) => {
  const allDonors = await Donor.find();
  res.render("donor/donors", {
    title: "Donor",
    donors: allDonors,
  });
};

exports.getViewDetails = async (req, res, next) => {
  try {
    const donorId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(donorId)) {
      return res.redirect("/donors");
    }
    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.redirect("/donors");
    }
    const isOwner = donor.user.toString() === req.session.userId;
    res.render("donor/viewDetails", {
      donor: donor,
      title: "Donor Profile",
      isOwner,
    });
  } catch (error) {
    next(error);
  }
};

exports.getEditDonor = async (req, res, next) => {
  try {
    const donorId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(donorId)) {
      return res.redirect("/donors");
    }
    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.redirect("/donors");
    }
    res.render("donor/edit", {
      donor: donor,
      title: "Edit Donor",
      errorMessage: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.postEditDonor = async (req, res, next) => {
  const donorId = req.params.id;
  try {
    const editdonor = req.body;
    editdonor.available = editdonor.available === "true";
    const updatedDonor = await Donor.findByIdAndUpdate(donorId, editdonor, {
      new: true,
      runValidators: true,
    });
    res.redirect(`/donors/${donorId}`);
  } catch (error) {
    if (error.name === "ValidationError") {
      let message = Object.values(error.errors)[0].message;
      return res.render("donor/edit", {
        title: "Edit Donor",
        errorMessage: message,
        donor: {
          ...req.body,
          _id: donorId,
        },
        formData: req.body,
      });
    }
  }
};

exports.getDeleteDonor = async (req, res, next) => {
  try {
    const donorId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(donorId)) {
      return res.redirect("/donors");
    }
    const updatedDonor = await Donor.findByIdAndDelete(donorId);
    if (!updatedDonor) {
      return res.redirect("/donors");
    }
    res.render("donor/DonorDelete");
  } catch (error) {
    next(error);
  }
};

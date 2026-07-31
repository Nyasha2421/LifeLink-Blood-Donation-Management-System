const Donor = require("../models/donor");
const Contact = require("../models/contact");
const BloodRequest = require("../models/bloodRequest");

exports.getHome = async (req, res, next) => {
  const totalDonors = await Donor.countDocuments();
  const availableDonors = await Donor.countDocuments({ available: true });
  const totalBloodRequest = await BloodRequest.countDocuments();
  const urgentRequest = await BloodRequest.countDocuments({
    emergencylevel: "Urgent",
  });
  res.render("home/index", {
    title: "Home",
    totalDonors,
    availableDonors,
    totalBloodRequest,
    urgentRequest,
  });
};

exports.getAbout = (req, res, next) => {
  res.render("home/about", {
    title: "About",
  });
};

exports.getContact = (req, res, next) => {
  res.render("home/contact", {
    title: "Contact",
     errorMessage: null,
     contact: null
  });
};

exports.postContact = async (req, res, next) => {
  try{
  const contact = await new Contact(req.body);
  contact.save();
  res.render("home/success", {
    title: "Contact",
    heading: "Message Sent Successfully",
    message: "Thank you for contacting us.",
    smallmessage: "We'll respond to you as soon as possible.",
    buttonText: " Back to Home",
    buttonLink: "/",
  });
  }
catch(error){
  if(error.name === "ValidationError"){
    const message = Object.values(error.errors)[0].message;
    return res.render("home/contact",{
      title: "Contact",
      errorMessage: message,
      contact: req.body
    })
  }
  next(error);
}
};

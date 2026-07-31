const bloodRequest = require("../models/bloodRequest");
const BloodRequest = require("../models/bloodRequest");

exports.getCreateRequest = (req, res, next) => {
  res.render("request/createRequest", {
    title: "Create Request",
    errorMessage: null,
    bloodrequests: {},
  });
};

exports.postCreateRequest = async (req, res, next) => {
  try {
    const requestData = req.body;
    requestData.user = req.session.userId;
    const request = new BloodRequest(requestData);
    await request.save();
    res.render("home/success", {
      title: "My Request",
      heading: "Blood Request Submitted!",
      message: "Your Blood request has been submitted successfully. ",
      smallmessage: " We hope a suitable donor response soon.",
      buttonText: "Go to My Requests",
      buttonLink: "/requests/my",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      let message = Object.values(error.errors)[0].message;
      return res.render("request/createRequest", {
        title: "Blood Request",
        errorMessage: message,
        bloodrequests: { ...req.body },
      });
    }
    next(error);
  }
};

exports.getMyRequest = async (req, res, next) => {
  const requests = await BloodRequest.find({ user: req.session.userId });
  res.render("request/myRequests", {
    title: "My Request",
    requests,
  });
};

exports.getDeleteRequest = async (req, res, next) => {
  const requestId = req.params.id;
  const request = await BloodRequest.findById(requestId);
  if (request.user == req.session.userId) {
    await BloodRequest.findByIdAndDelete(requestId);
    return res.redirect("/requests/my");
  }
  return res.status(403).send("Unauthorized");
};

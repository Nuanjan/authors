const Author = require("../models/author.model");

module.exports.index = (req, res) => {
  Author.find()
    .then((allAuthors) => res.json({ Authors: allAuthors }))
    .catch((err) => {
      console.log(err);
    });
};
module.exports.getOneAuthor = (req, res) => {
  Author.findOne({ _id: req.params.id })
    .then((oneAuthor) => res.json({ Author: oneAuthor }))
    .catch((err) => {
      console.log(err);
    });
};
module.exports.createAuthor = (req, res) => {
  console.log(" this is request body", req.body);
  let errArr = "";
  Author.create(req.body)
    .then((Author) => res.json({ Author }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return (errArr = [
          ...Object.values(err.errors).map((val) => val.message),
        ]);
      }
    })
    .then((errArr) => res.send(errArr))
    .catch((err) => console.log(err));
};
module.exports.updateAuthor = (req, res) => {
  let errArr = "";
  Author.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((updatedAuthor) => res.json(updatedAuthor))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return (errArr = [
          ...Object.values(err.errors).map((val) => val.message),
        ]);
      }
    })
    .then((errArr) => res.send(errArr))
    .catch((err) => {
      console.log(err);
    });
};
module.exports.deleteAuthor = (req, res) => {
  Author.deleteOne({ _id: req.params.id })
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
    });
};

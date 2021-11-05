const Author = require("../models/author.model");

module.exports.index = (req, res) => {
  Author.find()
    .then((allAuthors) => res.json({ authors: allAuthors }))
    .catch((err) => {
      console.log(err);
    });
};
module.exports.getOneAuthor = (req, res) => {
  Author.count({ _id: req.params.id }, function (err, count) {
    if (count > 0) {
      Author.findOne({ _id: req.params.id })
        .then((oneAuthor) => res.json({ author: oneAuthor }))
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(" id doesn't exist");
      return res.status(404);
    }
  });
};
module.exports.createAuthor = (req, res) => {
  //checking name exists
  Author.exists({ name: req.body.name }, function (err, result) {
    if (result) {
      return res.status(400).json({ message: "name already exist!" });
    } else {
      console.log(result, " this is result");
      let errText = [];
      Author.create(req.body)
        .then((author) => res.json({ author }))
        .catch((err) => {
          if (err.name === "ValidationError") {
            errText = [...Object.values(err.errors).map((val) => val.message)];
            return res.status(400).json({ message: errText[0] });
          }
        })
        .catch((err) => console.log(err));
    }
  });
};
module.exports.updateAuthor = (req, res) => {
  let errText = [];
  console.log(req.body, "request body on put method");
  Author.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: false,
    runValidators: true,
  })
    .then((updatedAuthor) => res.json(updatedAuthor))
    .catch((err) => {
      if (err.name === "ValidationError") {
        errText = [...Object.values(err.errors).map((val) => val.message)];
        console.log("got err here");
        return res.status(400).json({ message: errText[0] });
      }
    })
    .catch((err) => console.log(err));
};
module.exports.deleteAuthor = (req, res) => {
  Author.deleteOne({ _id: req.params.id })
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
    });
};

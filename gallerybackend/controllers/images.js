const imageModel=require("../models/images")
const _ = require("lodash");
const Joi = require("joi");



// const getImages = function (req, res, next) {
//     imageModel.find({},(err, data) => {
//        return res.send(data);
//     });
//   };

const getImages = async function (req, res, next) {
    try {
       const data = await imageModel.find({});
      return res.send(data);
    } catch (err) {
      next(err);
    }
  };

  



  const createImage = async function (req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().max(150).required(),
      category: Joi.string().required(),
      image: Joi.string().required(),
    });
  
    const { error } = schema.validate(req.body);
    const errorDetails = _.get(error, "details", []);
  
    if (!_.isEmpty(errorDetails)) {
      return res.send(errorDetails);
    }
  
    try {
      const image = new imageModel(req.body);
      const data = await image.save();
      return res.send(data);
    } catch (err) {
      return res.status(422).send(err);
    }
  };
  

  module.exports = {
     getImages,
     createImage
  };
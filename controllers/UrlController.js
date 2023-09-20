const UrlModel = require("../models/UrlModel")
const getIndex = require("../utils/getIndex")
const dns = require('dns');
// const url = require('url');
// const { body, validationResult } = require("express-validator")
// const { sanitizeBody } = require("express-validator")
// //helper file to prepare responses.
// const apiResponse = require("../helpers/apiResponse")
// const utility = require("../helpers/utility")

exports.isValidUrl = [
  (req,res,next) => {
    try {
      let url = new URL(req.body.url)
      dns.lookup(url.hostname, function(err, address, family) {
        if (err) {
          res.status(400).json({ error: 'invalid url' })
        } else {
          next()
        }
      })
    } catch (err) {
      res.status(400).json({ error: 'invalid url' })
    }
  }
]

exports.createUrl = [
  async (req, res) => {
    try {
      console.log(req.body.url)
      let idNumber = await getIndex.getNextSequence()
      const url = new UrlModel({
        _id: idNumber,
        urlPath: req.body.url,
      })
      // create new url and save it to database
      url
        .save()
        .then(function () {
          res.status(201).json({ original_url: req.body.url, short_url: idNumber})
        })
        .catch(function (err) {
          res.status(400).json({ message: "Error", error: err })
        })
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Error in creating url", error: err })
    }
  },
]
exports.redirectUrl = [
  (req, res) => {
    UrlModel.findById(req.params.id).exec().then(function (docs) {
      if (docs) {
        res.redirect(docs.urlPath)
      } else {
        res.status(404).json({ message: "Url not found" })
      }
    }).catch(function (err) {
      res.status(400).json({ message: "Error", error: err })
    })
  }
]

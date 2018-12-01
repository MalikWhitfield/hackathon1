let router = require('express').Router()
let Images = require('../models/image')
let Users = require('../models/user')

//get image by id
router.get('/:id', (req, res, next) => {
  Images.findById(req.params.id)
  .populate('comments').exec((err, fullImage) => {
    if (err) {
      return next(err)
    }
    res.send(fullImage)
  })
    // .then(image => res.send({ image }))
    // .catch(next)
})
// get images by user id 
router.get('/images/:userId', (req, res, next) => {
  Users.findById(req.params.userId)
    .then(image => {
      Images.find({ userId: image._id})
        .then(images => {
          res.send(images)
        })
    })
    .catch(next)
})

// get all images
router.get('/', (req, res, next) => {
  Images.find({})
    .then(image => res.send({ image }))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Users.findOne(req.session.uid)
    .then(user => {
      req.body.user = req.session.username
      Images.create(req.body)
        .then(image => {
          res.send(image)
        })
        .catch(next)
    })
})





//delete an image
router.delete('/:id', (req, res, next) => {
  //Validates is creator before deleting
  Images.deleteOne({ _id: req.params.id, creatorId: req.session.uid })
    .then(image => {
      Users.findOneAndUpdate({ _id: req.session.uid }, { image: undefined })
        .then(user => {
          res.send({ message: "DELORTED", data: image })
        })
    })
    .catch(next)
})

// //update/modify an existing log
// router.put('/:id', (req, res, next) => {
//   //Validates is creator before updating
//   Logs.findOneAndUpdate({ _id: req.params.id, creatorId: req.session.uid }, { new: true })
//     .then(log => res.send(log))
//     .catch(next)
// })

module.exports = router
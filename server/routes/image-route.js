let router = require('express').Router()
let Images = require('../models/image')
let Users = require('../models/user')

//get log by id
router.get('/:id', (req, res, next) => {
  Images.findById(req.params.id)
    .then(log => res.send({ log }))
    .catch(next)
})

router.get('/images/:userId', (req, res, next) => {
  Users.findById(req.params.userId)
    .then(image => {
      Images.find({ userId: image._id })
        .then(images => {
          res.send(images)
        })
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  Images.find({})
    .then(log => res.send({ log }))
    .catch(next)
})

router.post('/', (req, res, next) => {
  // debugger
  Users.findOne(req.session.uid)
    .then(user => {
      req.body.user = req.session.uid
      // req.body.shipId = user.ship
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
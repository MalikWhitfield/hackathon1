let router = require('express').Router()
let Videos = require('../models/video')
let Users = require('../models/user')

//get log by id
router.get('/:id', (req, res, next) => {
  Videos.findById(req.params.id)
    .then(log => res.send({ log }))
    .catch(next)
})

router.get('/videos/:userId', (req, res, next) => {
  Users.findById(req.params.userId)
    .then(video => {
      Videos.find({ userId: video._id })
        .then(Videos => {
          res.send(Videos)
        })
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  Videos.find({})
    .then(log => res.send({ log }))
    .catch(next)
})

router.post('/', (req, res, next) => {
  // debugger
  Users.findOne(req.session.uid)
    .then(user => {
      req.body.user = req.session.uid
      // req.body.shipId = user.ship
      Videos.create(req.body)
        .then(video => {
          res.send(video)
        })
        .catch(next)
    })
})





//delete an video
router.delete('/:id', (req, res, next) => {
  //Validates is creator before deleting
  Videos.deleteOne({ _id: req.params.id, creatorId: req.session.uid })
    .then(video => {
      Users.findOneAndUpdate({ _id: req.session.uid }, { video: undefined })
        .then(user => {
          res.send({ message: "DELORTED", data: video })
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
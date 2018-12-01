let router = require('express').Router()
let Images = require('../models/image')
let Users = require('../models/user')
let Comments = require('../models/comment')
let Videos = require('../models/video')

// //get log by id
// router.get('/:id', (req, res, next) => {
//   Images.findById(req.params.id)
//     .then(log => res.send({ log }))
//     .catch(next)
// })

//THIS SHOULD GET THE COMMENTS THAT ARE ON THE IMAGE
router.get('/images/:imageId', (req, res, next) => {
  Images.findById(req.params.imageId)
    .then(image => {
      Images.find({ commentId: image._id })
        .then(comments => {
          res.send(comments)
        })
    })
    .catch(next)
})

router.get('/videos/:videoId', (req, res, next) => {
  Videos.findById(req.params.videoId)
    .then(video => {
      Videos.find({ commentId: video._id })
        .then(comments => {
          res.send(comments)
        })
    })
    .catch(next)
})

// THIS SHOWS ALL COMMENTS VV
router.get('/', (req, res, next) => {
  Comments.find({})
    .then(comments => res.send({ comments }))
    .catch(next)
})

router.post('/:imageId', (req, res, next) => {
  req.body.author = req.session.uid
  req.body.imageId = req.params.imageId
  Comments.create(req.body)
    .then(comment => {
      res.send(comment)
    })
    .catch(next)
})

router.post('/:videoId', (req, res, next) => {
  req.body.author = req.session.uid
  Comments.create(req.body)
    .then(comment => {
      res.send(comment)
    })
    .catch(next)
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



//REPLIES
router.post('/:commentId/subcomments', (req, res, next) => {
  req.body.author = req.session.uid
  Comments.findById(req.params.commentId)
    .then(comment => {
      comment.subComments.push(req.body)
      comment.save(err => {
        if (err) {
          return next(err)
        }
        res.send(comment)
      })
    })

})


module.exports = router
import ImageService from "./image-service.js";

let _is = new ImageService
let _auth = {}


function draw() {
    let template = ''
    _is.images.forEach(img => {
    console.log(img)
    let comments = _is.comments
    let commentTemplate = ''
    if(comments[img._id]){
      comments[img._id].forEach(c=>{
        let subcommentTemplate = ''
        c.subComments.forEach(sc=>{
          subcommentTemplate += `<li>${sc.description}</li>`
        })

        commentTemplate += `
        <li>${c.description}</li>
        <ul>${subcommentTemplate}<ul>
        `
      })
    }
      let votes = _is.votes
  let voteTemplate = `
  <p>${img.vote}</p>
  `

    
    template += `
      <img src= "${img.url}" height="200" width="200" data-toggle="modal" data-target="#image-${img._id}">
      <div class="modal fade" id="image-${img._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header top">
              <h3>${img.username}</h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body center">
              <img src= "${img.url}" height="300" width="300" class="center">
            </div>

            <div class="modal-footer left">
              <h2>${img.caption}</h2>
            </div>

            <div class="modal-footer left">
              <form onsubmit="app.controllers.imageController.addComment(event, '${img._id}')">
                <input type="textarea" class="form-control" name="description"/>
                <button type="submit" class="btn btn-primary">Add Comment</button>
              </form>
              <p>Comments:</p>
              <ul>${commentTemplate}</ul>
            </div>

            <div class="modal-footer left">
              <p>Votes:</p>
              <ul>${voteTemplate}</ul>
              <button data-dismiss="modal" onclick="app.controllers.imageController.upVote('${img._id}')"><i class="fas fa-thumbs-up sm"></i></button>
              <button data-dismiss="modal" onclick="app.controllers.imageController.downVote('${img._id}')"><i class="fas fa-thumbs-down sm"></i></button>
            </div>
          </div>
        </div>
      </div>
    `
    })
    document.getElementById('images').innerHTML = template
}


export default class ImageController {
  constructor(auth){
    _auth = auth
    _is.getImages(draw)
  }
  
  
  postImage(e) {
    e.preventDefault()
    let form = event.target
    let image = {
      caption: form.caption.value,
      url: form.imgUrl.value
    }
    if (!_auth.user._id) { return alert("Please Login to Post") }
  
    _is.postImage(image, draw)
  }
  
  upVote(imgId) {
    _is.upVote(imgId, draw)
  }
  downVote(imgId) {
    _is.downVote(imgId, draw)
  }
  addComment(e, imgId) {
    e.preventDefault()
    let form = e.target
    let comment = {
      description: form.description.value,
      imageId: imgId      
    }
    if (!_auth.user._id) { return alert("Please Login to Post a Comment") }
    _is.addComment(comment, draw)
  }
}

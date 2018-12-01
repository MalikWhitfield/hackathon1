import ImageService from "./image-service.js";

let _is = new ImageService
let _auth = {}

function showImages() {
    _is.getImages(draw)
}



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
    template += `
      <img src= "${img.url}" height="200" width="200" data-toggle="modal" data-target="#image-${img._id} ">
      <div class="modal fade" id="image-${img._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3>${_auth.username}</h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <img src= "${img.url}" height="300" width="300">
            </div>
            <div class="modal-footer">
            <h2>Caption: ${img.caption}</h2>
            </div>
            <div class="modal-footer">
            <p>Comments:</p>
            <ul>${commentTemplate}</ul>
            </div>
          </div>
        </div>
      </div>
    `
    })
    document.getElementById('images').innerHTML = template
}

function postImage(e) {
  e.preventDefault()
  let form = event.target
  let image = {
    caption: form.caption.value,
    imgUrl: form.imgUrl.value
  }
  if (!_auth.user._id) { return alert("Please Login to Post") }

  _is.postImage(image, draw)
}

export default class ImageController {
    constructor(auth){
      _auth = auth
      _is.getImages(draw)
    }
  drawNew(image) {

    document.getElementById("post-img").innerHTML = `
    <button type="button" class="btn btn-dark btn-lg" data-toggle="modal" data-target="#postimage">Post Image</button>`
  }


}

import ImageController from "./components/images/image-controller.js";
// import CommentController from "./components/comments/comment-controller.js";
// import ReplyController from "./components/replies/reply-controller.js";
import AuthController from "./components/auth/auth-controller.js";
import AuthService from "./components/auth/auth-service.js";

function drawPostImageButton() {

  document.getElementById("post-img").innerHTML = `
    <button type="button" class="btn btn-dark btn-lg" data-toggle="modal" data-target="#postimage">Post Image</button>`
}


//only every instatiate Auth Service once, pass refrenece to all controllers
let auth = new AuthService(drawPostImageButton)


class App {
  constructor() {
    this.controllers = {
      authController: new AuthController(auth),
      imageController: new ImageController(auth),
      // commentController: new CommentController(auth),
      // replyController: new ReplyController(auth)
    }
  }
}

window.app = new App()
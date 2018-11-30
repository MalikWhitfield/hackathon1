let _authService = {}

function drawUserLogin() {
    console.log('not logged In')
    document.getElementById("auth-status").innerHTML = `
<button type="button" class="btn btn-dark btn-lg" data-toggle="modal" data-target="#signin">Login/Register</button>
      `
  
   }

function drawLogout() {
    console.log('logged in')
    document.getElementById('auth-status').innerHTML = `<button onclick="app.controllers.authController.logout()">logout</button>`
  
  }

  function _drawRegister() {
    document.getElementById('auth-register').innerHTML = `<button onclick="app.controllers.authController.logout()">logout</button>
    
      `
  }

  export default class AuthController {
    constructor(auth) {
        _authService = auth
        _authService.authenticate(drawLogout, drawUserLogin)
      }
      login(event) {
        event.preventDefault();
        let creds = {
        username: event.target.username.value,
          email: event.target.email.value,
          password: event.target.password.value
        }
        _authService.login(creds, drawLogout)
      }
      register(event) {
        event.preventDefault();
        let creds = {
            username: event.target.username.value,
          email: event.target.email.value,
          password: event.target.password.value
        }
        _authService.register(creds, drawLogout)
      }
      logout() {
        _authService.logout(drawUserLogin)
      }
      showRegister() {
        _drawRegister()
      }
      showLogin() {
        drawUserLogin()
      }
     
  }
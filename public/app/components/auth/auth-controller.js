let _authService = {}

function drawUserLogin() {
    console.log('not logged In')
    document.getElementById('auth').innerHTML = `
    <form onsubmit="app.controllers.authController.login(event)">
    <input type="text" name="username" placeholder="username" required>
        <input type="email" name="email" placeholder="email" required>
        <input type="password" name="password" placeholder="password" required>
        <button type="submit">Login</button>
      </form>
      `
  
    }

function drawLogout() {
    console.log('logged in')
    document.getElementById('auth').innerHTML = `<button onclick="app.controllers.authController.logout()">logout</button>`
  
  }

  function _drawRegister() {
    document.getElementById('auth').innerHTML = `
    <form onsubmit="app.controllers.authController.register(event)">
    <input type="text" name="username" placeholder="username" required>
        <input type="email" name="email" placeholder="email" required>
        <input type="password" name="password" placeholder="password" required>
        <button type="submit">Register</button>
      </form>
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
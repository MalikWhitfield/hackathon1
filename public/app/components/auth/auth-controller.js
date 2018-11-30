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

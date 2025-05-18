  const API_URL = 'https://blog-platform.kata.academy/api';
    let authToken = '';

    function register() {
      const username = document.getElementById('regUsername').value;
      const email = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;

      fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: { username, email, password }
        })
      })
      .then(res => res.json())
      .then(data => display(data))
      .catch(err => displayError(err));
    }

    function login() {
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: { email, password }
        })
      })
      .then(res => res.json())
      .then(data => {
        authToken = data.user.token;
        display(data);
      })
      .catch(err => displayError(err));
    }

    function getCurrentUser() {
      if (!authToken) {
        display({ error: 'Сначала выполните вход.' });
        return;
      }

      fetch(`${API_URL}/user`, {
        method: 'GET',
        headers: { 'Authorization': 'Token ' + authToken }
      })
      .then(res => res.json())
      .then(data => display(data))
      .catch(err => displayError(err));
    }

    function display(data) {
      document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    }

    function displayError(error) {
      document.getElementById('output').textContent = 'Ошибка: ' + error;
    }
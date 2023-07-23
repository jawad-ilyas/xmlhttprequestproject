let form;
let searchUser;

function handleSubmit(event) {
  event.preventDefault();
  form = event.target;
  searchUser = form.elements["searchUser"].value;
  console.log(searchUser);

  if (searchUser) {
    const http = new XMLHttpRequest();
    console.log(http);
    http.open("get", `https://api.github.com/users/${searchUser}`);
    http.send();
    console.log(http);
    const title = document.querySelector("#title");
    const bio = document.querySelector("#bio");
    const avatar = document.querySelector("#avatar");
    const html_url = document.querySelector("#html_url");
    http.onreadystatechange = function () {
      console.log(http.readyState);
      if (http.readyState === 4) {
        const data = JSON.parse(this.responseText);

        title.textContent = data.login;
        bio.textContent = data.bio;
        avatar.src = data.avatar_url;
        html_url.href = data.html_url;
      }
    };
  } else {
    console.log("User is not found.");
  }
}

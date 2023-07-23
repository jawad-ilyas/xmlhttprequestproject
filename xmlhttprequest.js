let form;
let searchUser;

function handleSubmit(event) {
  event.preventDefault(); // Prevents the default form submission behavior.
  form = event.target; // Stores the form element in the 'form' variable.
  searchUser = form.elements["searchUser"].value; // Retrieves the value entered in the 'searchUser' input field.
  
  form.reset(); // Resets the form after submission.

  if (searchUser) {
    const http = new XMLHttpRequest(); // Creates a new XMLHttpRequest object.
  
    http.open("get", `https://api.github.com/users/${searchUser}`); // Specifies the API endpoint to fetch GitHub user data.
    http.send(); // Sends the XMLHttpRequest to initiate the request to the GitHub API.

   

    const title = document.querySelector("#title"); // Selects the element with ID 'title'.
    const bio = document.querySelector("#bio"); // Selects the element with ID 'bio'.
    const avatar = document.querySelector("#avatar"); // Selects the element with ID 'avatar'.
    const html_url = document.querySelector("#html_url"); // Selects the element with ID 'html_url'.
    const error = document.querySelector("#error"); // Selects the element with ID 'error'.

    http.onreadystatechange = function () {
      // This function is called when the XMLHttpRequest state changes.

      if (http.readyState === 4 && http.status === 200) {
        // Checks if the request is completed (readyState 4) and successful (status 200).

        const data = JSON.parse(this.responseText); // Parses the JSON response from the GitHub API.
        title.textContent = data.login; // Sets the content of 'title' element to the GitHub username.
        bio.textContent = data.bio; // Sets the content of 'bio' element to the GitHub user's bio.
        avatar.src = data.avatar_url; // Sets the 'src' attribute of 'avatar' element to the GitHub user's avatar URL.
        html_url.href = data.html_url; // Sets the 'href' attribute of 'html_url' element to the GitHub user's profile URL.
      }

      if (http.readyState === 4 && http.status === 404) {
        // Checks if the request is completed (readyState 4) and the user is not found (status 404).

        try {
          const messageResponse = JSON.parse(http.response); // Parses the JSON response to extract the error message.
          error.textContent = "User " + messageResponse.message; // Sets the content of 'error' element to the error message.
        } catch (error) {
          console.error(error); // Logs any errors that occur during JSON parsing.
        }
      }
    };
  } else {
    console.log("User is not found.");
  }
}

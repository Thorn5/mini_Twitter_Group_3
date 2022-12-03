// function show(logStuff) {
//     console.log(logStuff);
// }

// // Create a request variable and assign a new XMLHttpRequest object to it.
// var request = new XMLHttpRequest()

// // Open a new connection, using the GET request on the URL endpoint
// request.open('GET', 'https://twitter-mini-ansa.herokuapp.com/tweet/list', true)

// request.onload = function () {
//   // Begin accessing JSON data here
// }

// // Send request
// request.send()

// // Begin accessing JSON data here
// var data = JSON.parse(this.response)


// Get DOM elements
const postsContainer = document.getElementById("posts");
const api = "https://twitter-mini-ansa.herokuapp.com/tweet/list";

/* 
Render post - This function takes an object with an id, userID, title 
and body
*/

const renderPost = ({ _id, text, owner, date }) => {
  // Create div container
  const postContent = document.createElement("div");
  // Set id as attribute
  postContent.setAttribute("id", _id);
  // Template
  postContent.innerHTML = `
                        <h5>${text}</h5>
                        <p>${date}</p>
                        <small>Author: ${owner}</small>
                      `;
  // Prepend to container
  postsContainer.prepend(postContent);
};

/*
Render error - This function takes an error object and displays it. 
It also sets a timeout to remove it from the DOM  
*/

const renderError = (error) => {
  // Create div for error
  const errorContainer = document.createElement("div");
  // Setting styles via cssText property
  errorContainer.style.cssText = "color: white; background-color: red";
  // Template
  errorContainer.innerHTML = `
                          <strong>Error: ${error}</strong>
                        `;
  // Prepend to container
  postsContainer.prepend(errorContainer);
  setTimeout(() => errorContainer.remove(), 3000);
};

postsContainer.innerHTML = "Loading...";
fetch(api)
  .then((res) => res.json())
  .then((data) => data.forEach((post) => renderPost(post)))
  .catch((err) => {
    renderError(err);
  });

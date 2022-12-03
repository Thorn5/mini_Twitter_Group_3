const postsContainer = document.getElementById("posts");
fetch('https://twitter-mini-ansa.herokuapp.com/tweet/list')
  .then(response => response.json())
  // .then(json => console.log(json.tweets[2]))
  // .then(json => localStorage.setItem("tweets", JSON.stringify(json.tweets)))
  .then((data) => data.forEach((post) => renderPost(post)))
  .catch((err) => {
    renderError(err);
  })
  ;


//  const renderPost = ({ id, userId, title, body }) => {
  const renderPost = ({ _id, text, owner, date }) => {

    // Create div container
    const postContent = document.createElement("div");
    // Set id as attribute
    postContent.setAttribute("id", _id);
    // Template
    postContent.innerHTML = `
                          <h5>${owner}</h5>
                          <p>${text}</p>
                          <small>date: ${date}</small>
                        `;
    // Prepend to container
    postsContainer.prepend(postContent);
  };


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
    document.getElementById("posts").prepend(errorContainer);
    setTimeout(() => errorContainer.remove(), 3000);
  };
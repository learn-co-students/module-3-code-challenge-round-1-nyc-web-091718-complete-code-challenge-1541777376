document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  /**********************************************************************
  * Vars & Constants
  **********************************************************************/
  let imageId = 1409; //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  // My Vars
  const imageHTML = document.getElementById('image');
  const nameHTML = document.getElementById('name');
  const likesHTML = document.getElementById('likes');
  const commentListHTML = document.getElementById('comments');
  const likeBtn = document.getElementById('like_button');
  const commentForm = document.getElementById('comment_form');
  const commentInput = document.getElementById('comment_input');

  let imageObj = null;
  let imageName = "";
  let imageSRC = "";
  let imageLikes = 0;
  let imageComments = [];

  /**********************************************************************
  * Fetch on Load
  **********************************************************************/
  fetch(imageURL)
  .then(responseObject => responseObject.json())
  .then(json => {
    console.log(imageURL);
    console.log(json);
    imageObj = json;
    imageSRC = json.url;
    imageLikes = json.like_count;
    imageComments = json.comments;
    imageName = json.name;
    //console.log(`src: ${imageSRC}\nname: ${imageName}\nlikes: ${imageLikes}\ncomm: ${imageComments}`)

    console.dir(imageObj)
    renderPage();
  })

  /**********************************************************************
  * Event Listeners
  **********************************************************************/
  likeBtn.addEventListener('click', (event) => {
    imageLikes = ++ imageLikes;
    renderPage();
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        "image_id": imageId
      })
    })
    .then(responseObject => responseObject.json())
    .then(json => {
      console.dir(json);
      // debugger
    })
  })

  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.dir(commentInput);

    let newComment = {
      'image_id': imageId,
      'content': commentInput.value
    };

    imageComments.push(newComment);
    renderPage();
    commentForm.reset();

    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newComment)
    })
    .then(responseObject => responseObject.json())
    .then(json => {
      console.dir(json);
      console.dir(imageComments);
      imageComments[imageComments.length - 1] = json;
      renderPage();
      // debugger;
    })
  })

  commentListHTML.addEventListener('click', (event) => {
    if(event.target.id === "btn-delete"){
      const targetId = event.target.parentElement.dataset.commentid;
      fetch(commentsURL+`/${targetId}`, {
        method: "DELETE"
      })
      .then(responseObject => responseObject.json())
      .then(json => {
        console.dir(imageComments);
        console.log(targetId);
        let remComments = imageComments.filter(com => com.id != targetId);
        imageComments = remComments;
        renderPage();
        // debugger
      })
      // console.log(event.target.parentNode)
    }
  })

  /**********************************************************************
  * Helper Methods
  **********************************************************************/
  function renderPage(){
    console.log(imageHTML);
    imageHTML.src = imageSRC;
    imageHTML.dataset.id = imageId;
    nameHTML.innerHTML = `${imageName}`;
    likesHTML.innerHTML = `${imageLikes}`;

    let newComments = "";
    imageComments.forEach((comment) => {
      newComments +=
      `
        <li data-commentId="${comment.id}">
          <span>${comment.content}</span>
          <button id="btn-delete">delete</button>
        </li>
      `
    })
    commentListHTML.innerHTML = newComments;
    // debugger;
  }

})


/**********************************************************************
* RandoPic User can
* As a user when page loads, see image, comments and likes
* user can click to like image, increases likes of image by 1
* user can fill input fields and submit form , add & render new comment
* comments and likes persist after a refresh
**********************************************************************/

/**********************************************************************
* THING TO ADD
* Make a object to handle image, likes, comments?
**********************************************************************/

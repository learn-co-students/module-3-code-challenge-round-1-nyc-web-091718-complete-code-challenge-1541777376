let image

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1415 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/1415`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  image = document.querySelector("img")


  fetch(imageURL).then(function(response) {
      response.json().then(function(json) {
        image.url = `${imageURL}`
      image.innerHTML = `src="https://randopic.herokuapp.com/images/1415" id="image" data-id="1415"`
      // debugger
    })
  });
});

// Apologies. I can't even get the picture to display.  Without being able to reference previous labs, I wasn't even remotely ready for today's challenge.  I will prepare for next week.

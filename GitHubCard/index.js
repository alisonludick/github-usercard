/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

    axios.get('https://api.github.com/users/alisonludick')
        .then(response => {
            gitHubCard(response); 
        })
        .catch(error => {
            console.log(error);
        })


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

axios.get('https://api.github.com/users/alisonludick/followers') 
        .then(response => {
          response.data.forEach(user => {
            axios.get(`https://api.github.com/users/${user.login}`)
            .then(response => {
              gitHubCard(response); 
            })
          })
        })
        .catch(err => {
          console.log(err); 
        })
      

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function gitHubCard (response) {
  const parentDiv = document.createElement('div'); 
  const childDiv = document.createElement('div'); 
  const img = document.createElement('img'); 
  const h3 = document.createElement('h3'); 
  const p1 = document.createElement('p'); 
  const p2 = document.createElement('p'); 
  const p3 = document.createElement('p'); 
  const url = document.createElement('a'); 
  const p4 = document.createElement('p'); 
  const p5 = document.createElement('p'); 
  const p6 = document.createElement('p'); 

  img.setAttribute('src', response.data['avatar_url']); 
  url.setAttribute('href', response.data['html_url']); 
  h3.textContent = response.data.name; 
  p1.textContent = response.data.login; 
  p2.textContent = response.data.location; 
  p3.textContent = "Profile: "; 
  url.textContent = response.data.html_url; 
  p4.textContent = "Followers: " + response.data.followers; 
  p5.textContent = "Following: " + response.data.following; 
  p6.textContent = response.data.bio; 

  parentDiv.classList.add('card'); 
  childDiv.classList.add('card-info');
  h3.classList.add('name'); 
  p1.classList.add('username'); 
  let elements = [h3, p1, p2, p3, p4, p5, p6]
  elements.forEach(element => childDiv.appendChild(element)); 

  const cardContainer = document.querySelector('.cards'); 
  cardContainer.appendChild(parentDiv); 
  parentDiv.appendChild(img); 
  parentDiv.appendChild(childDiv); 
  p3.appendChild(url); 
  return parentDiv; 
}
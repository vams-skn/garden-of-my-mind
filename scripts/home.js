const newEntry = document.getElementById('new-garden-entry');
const visitG = document.getElementById('visit-my-garden');

visitG.addEventListener('click', function() {
  console.log("clicked");
  window.location.href = "./garden.html";
});

newEntry.addEventListener('click', function() {
  window.location.href = './new.html';
});
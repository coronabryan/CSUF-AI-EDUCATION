let images = [];
let currentImageIndex = 0;
let score = 0;

async function fetchImages() {
  const response = await fetch('/api/images');
  const data = await response.json();
  images = shuffleArray(data);
  displayImage();
}

function displayImage() {
  if (currentImageIndex < images.length) {
    document.getElementById('game-image').src = images[currentImageIndex].src;
    document.getElementById('feedback').innerText = '';
  } else {
    document.getElementById('game-container').innerHTML = `<h2>Game Over! Your Score: ${score}/${images.length}</h2>`;
  }
}

function makeGuess(guess) {
  const correctType = images[currentImageIndex].type;
  if (guess === correctType) {
    document.getElementById('feedback').innerText = 'Correct!';
    score++;
  } else {
    document.getElementById('feedback').innerText = `Incorrect! It was ${correctType}.`;
  }
  currentImageIndex++;
  setTimeout(displayImage, 1000);
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

fetchImages();

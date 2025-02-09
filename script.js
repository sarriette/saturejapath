<<<<<<< HEAD
let currentImageIndex = 0;
const images = [
    "images/posters/casse-tete.png",
    "images/posters/violence.png",
];

function openGallery(index) {
    currentImageIndex = index;
    document.getElementById("galleryModal").style.display = "flex";
    updateImage();
}

function closeGallery() {
    document.getElementById("galleryModal").style.display = "none";
}

function navigate(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    if (currentImageIndex >= images.length) currentImageIndex = 0;
    updateImage();
}

function updateImage() {
    document.getElementById("largeImage").src = images[currentImageIndex];
}
=======
let currentImageIndex = 0;
const images = [
    "images/posters/casse-tete.png",
    "images/posters/violence.png",
];

function openGallery(index) {
    currentImageIndex = index;
    document.getElementById("galleryModal").style.display = "flex";
    updateImage();
}

function closeGallery() {
    document.getElementById("galleryModal").style.display = "none";
}

function navigate(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    if (currentImageIndex >= images.length) currentImageIndex = 0;
    updateImage();
}

function updateImage() {
    document.getElementById("largeImage").src = images[currentImageIndex];
}
>>>>>>> c07e554551e2be61030ae75c9964d19799769666

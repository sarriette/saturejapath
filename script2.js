let currentImageIndex = 0;
const images = [
    "images/massilia/carte-marseille.png",
    "images/massilia/IMG_20230407_232838-01.jpeg",
    "images/massilia/IMG_20230407_232907-01.jpeg",
    "images/massilia/Screenshot_2023-05-03-20-15-56-221_com.camerasideas.instashot.jpg",
    "images/massilia/IMG_20230407_232743-01.jpeg",
    "images/massilia/montange.jpeg",
    "images/massilia/IMG_20230407_232930-01.jpeg",
    "images/massilia/IMG_20230407_232822-01.jpeg",
    "images/massilia/WhatsApp Image 2025-03-06 at 18.50.55.jpeg",
    "images/massilia/ju.jpeg",
    "images/massilia/grostruc.jpeg",
    "images/massilia/WhatsApp Image 2025-03-06 at 18.56.26.jpeg",
    "images/massilia/pigeons.jpeg",
    "images/massilia/kevadams.jpeg",
    "images/massilia/IMG_20230407_232600-01.jpeg",
    "images/massilia/calanques.jpeg",
    "images/massilia/IMG_20230407_232539.jpg",
    "images/massilia/IMG_20230407_232333.jpg",
    "images/massilia/lunettes.jpeg",
    "images/massilia/julia.jpeg",
    "images/massilia/mer.jpeg",
    "images/massilia/réunion.jpeg",
    "images/massilia/IMG_20230407_232200.jpg",
    "images/massilia/IMG_20230407_232224.jpg",
    "images/massilia/IMG_20230407_232244.jpg",
    "images/massilia/IMG_20230407_232654-01.jpeg",
    "images/massilia/IMG_20230407_232633-01.jpeg"
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

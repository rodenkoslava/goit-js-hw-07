import { galleryItems } from "./gallery-items.js";

const galleryEl = document.querySelector(".gallery");
const bodyEl = document.querySelector("body");
let modalImage;

const createGalleryMarkup = galleryItems
  .map(
    ({ original, preview, description }) => `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img class="gallery__image"src="${preview}" data-source="${original}" alt= "${description}"/>
        </a>
    </div>`
  )
  .join("");

galleryEl.insertAdjacentHTML("beforeend", createGalleryMarkup);

const onGalleryClick = (e) => {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  onOpenModal(e.target.dataset.source);
};

galleryEl.addEventListener("click", onGalleryClick);

const onCreateModal = (img) =>
  basicLightbox.create(`<img src="${img}" width="1280" alt="${img}">`, {
    closable: true,
    onShow: (onCreateModal) => window.addEventListener("keyup", onKeyPress),
    onClose: (onCreateModal) => window.removeEventListener("keyup", onKeyPress),
  });

const onOpenModal = (img) => {
  modalImage = onCreateModal(img);
  modalImage.show();

  console.log("Open modal");
};

// Добавление закрытия модального окна по нажатию клавиши `Escape`.

const onKeyPress = (e) => {
  if (e.code === "Escape") modalImage.close();

  console.log("Close modal with escape");
};

console.log(galleryItems);

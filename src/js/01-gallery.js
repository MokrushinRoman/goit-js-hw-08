import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items.js';

const refs = {
  galleryContainer: document.querySelector('.gallery'),
};

// create gallary markup
function onCreateGallaryMarkup(images) {
  return images
    .map(({ preview, description, original }) => {
      return `
    <div class="gallery__item">
        <a href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
    </div>
`;
    })
    .join('');
}

// rendering gallary markup into div.gallary
refs.galleryContainer.insertAdjacentHTML(
  'beforeend',
  onCreateGallaryMarkup(galleryItems)
);

// ------------- ACTIONS

// create click action using simplelightbox lib
const lightbox = new SimpleLightbox('.gallery a', {
  captionPosition: 'bottom',
  captionsData: 'alt',
  captionDelay: 350,
});

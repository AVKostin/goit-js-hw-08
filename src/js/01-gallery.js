import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';

const galleryRef = document.querySelector('.gallery');
const itemGalleryMarkup = createGalleryMarkup(galleryItems);

galleryRef.insertAdjacentHTML('beforeend', itemGalleryMarkup);

function createGalleryMarkup(galleryItems) {
	return galleryItems
		.map(({ preview, original, description }) => {
			return `
			<a class="gallery__link" href="${original}">
				<img
                    class="gallery__image"
                        src="${preview}"
                        alt="${description}"
				/>
			</a>`;
		})
		.join('');
}
new SimpleLightbox('.gallery a', {
	captionsData: 'alt',
	captionDelay: 250,
});
// lightbox.on('show.simplelightbox', function () {});

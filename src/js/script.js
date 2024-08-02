document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
});

function crearGaleria() {
    
    const images_cant = 16;
    const gallery = document.querySelector('.gallery-images');

    for(let i = 1; i <= images_cant; i++) {
        const image = document.createElement('IMG')
        image.src = `src/img/gallery/full/${i}.jpg`
        image.alt = 'Imagen Galeria'
        gallery.appendChild(image);
    }
}
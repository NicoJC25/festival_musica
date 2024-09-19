document.addEventListener('DOMContentLoaded', function() {
    staticNavigation();
    createGallery();
    linkHover();
    scrollNav();
});

function staticNavigation() {
    const header = document.querySelector('.header')
    const aboutFestival = document.querySelector('.about-festival')

    window.addEventListener('scroll', function () {
        if(aboutFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    });
}

function createGallery() {
    
    const images_cant = 16;
    const gallery = document.querySelector('.gallery-images');

    for(let i = 1; i <= images_cant; i++) {
        image.loading = 'lazy' // Lazy load
        image.width = "300"
        image.height = "200"
        const image = document.createElement('IMG')
        image.src = `src/img/gallery/full/${i}.jpg`
        image.alt = 'Imagen Galeria'        

        // Event Handler
        image.onclick = function() {
            showImage(i)
        }

        gallery.appendChild(image);
    }
}

function showImage(i) {

    const image = document.createElement('IMG')
    image.src = `src/img/gallery/full/${i}.jpg`
    image.alt = 'Imagen Galeria'
    

    // Generate Modal
    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = closeModal

    //Close modal button

    const closeModalBtn = document.createElement('BUTTON')
    closeModalBtn.textContent = 'X'
    closeModalBtn.classList.add('btn-close')
    closeModalBtn.onclick = closeModal
    
    modal.appendChild(image)
    modal.appendChild(closeModalBtn)

    // Append to HTML
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
}

function closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out')

    setTimeout(() => {
        modal?.remove()

        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')
    }, 500);
}

function linkHover() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.main-navigation a')

        let actual = '';
        sections.forEach( section  => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if(window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active')
            if(link.getAttribute('href') === '#' + actual){
                link.classList.add('active')
            }
        })
    });
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.main-navigation')

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'})
        })
    })
}
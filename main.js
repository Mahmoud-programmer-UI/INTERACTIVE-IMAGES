document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter; // dataset.filter == data-filter
            console.log(filter)
            // Filter images
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content img');
    const lightboxInfo = document.querySelector('.image-info');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const images = Array.from(document.querySelectorAll('.gallery-item img'));
    
    let currentImageIndex = 0;
    console.log(galleryItems)
    // Open lightbox
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        img.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightbox();
            lightbox.classList.add('show');
            document.body.style.overflow="hidden"
        });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('show');
        document.body.style.overflow="auto"
    });
    
    // Navigate images
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('show');
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
    
    function updateLightbox() {
        const activeImages = Array.from(document.querySelectorAll(`.gallery-item[style="display: block;"] img, .gallery-item:not([style]) img`));
        const src = activeImages[currentImageIndex].src;
        const alt = activeImages[currentImageIndex].alt;
        const category = activeImages[currentImageIndex].parentElement.dataset.category;
        
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightboxInfo.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)}: ${alt}`;
        // Update currentImageIndex to match the active images array
        currentImageIndex = images.indexOf(activeImages[currentImageIndex]);
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;    
        updateLightbox();
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightbox();
    }
});
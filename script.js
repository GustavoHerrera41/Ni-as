/**
 * Navigation function to go from landing page to gallery.
 */
function navigateToGallery() {
    document.body.style.transition = 'opacity 0.5s ease-out';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = 'gallery.html';
    }, 500);
}

// Gallery Logic
let currentImageIndex = 0;
const viewedIndices = new Set();
const totalImages = 20;

const galleryImages = [
    "images/img1.jpg", "images/img2.jpg", "images/img3.jpg", "images/img4.jpg", "images/img5.jpg",
    "images/img6.jpg", "images/img7.jpg", "images/img8.jpg", "images/img9.jpg", "images/img10.jpg",
    "images/img11.jpg", "images/img12.jpg", "images/img13.jpg", "images/img14.jpg", "images/img15.jpg",
    "images/img16.jpg", "images/img17.jpg", "images/img18.jpg", "images/img19.jpg", "images/img20.jpg"
];

let firstClickDone = false;

function openLightbox(index) {
    currentImageIndex = index;
    const modal = document.getElementById('lightbox');
    const modalImg = document.getElementById('lightboxImg');
    
    if (!firstClickDone) {
        document.getElementById('warningModal').style.display = 'block';
        firstClickDone = true;
        return; // Don't open lightbox until they click "Entendido"
    }
    
    modal.style.display = 'flex';
    modalImg.src = galleryImages[currentImageIndex];
    
    markAsViewed(index);
}

function closeLightbox() {
    if (viewedIndices.size < totalImages) {
        document.getElementById('exitModal').style.display = 'block';
        document.getElementById('lightbox').style.display = 'none'; // hide lightbox while warning is shown
    } else {
        document.getElementById('lightbox').style.display = 'none';
    }
}

function closeExitModal() {
    document.getElementById('exitModal').style.display = 'none';
}

function resumeGallery() {
    document.getElementById('exitModal').style.display = 'none';
    document.getElementById('lightbox').style.display = 'flex';
}

function backToStart() {
    window.location.href = 'index.html';
}

function closeWarningModal() {
    document.getElementById('warningModal').style.display = 'none';
    // Open the first image after closing warning
    openLightbox(0);
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    document.getElementById('lightboxImg').src = galleryImages[currentImageIndex];
    markAsViewed(currentImageIndex);
}

function markAsViewed(index) {
    viewedIndices.add(index);
    document.getElementById('currentView').innerText = viewedIndices.size;
    
    // Check if all 20 have been viewed
    if (viewedIndices.size >= totalImages) {
        // Automatic closure as requested
        setTimeout(() => {
            closeLightbox();
            document.getElementById('transfer-btn-container').style.display = 'flex';
        }, 300); // Small delay to see the 20/20
    }
}

function revealPrank() {
    // Send WhatsApp notification
    const phone = "5493813043498";
    const text = encodeURIComponent("Termine de ver tus niñas. (VOLVE A LA PAGINA)");
    const waUrl = `https://wa.me/${phone}?text=${text}`;
    
    window.open(waUrl, '_blank');
    
    // Show the prank alert
    document.getElementById('prankAlert').style.display = 'block';
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    console.log('Interactive Gallery Refined!');
    
    // --- SECURITY & ADMIN FEATURES ---
    let isAdmin = false;

    // Admin Backdoor: Click the H1 title 5 times
    let adminClicks = 0;
    const titleObj = document.querySelector('h1.animate-pop');
    if (titleObj) {
        titleObj.addEventListener('click', () => {
            adminClicks++;
            if (adminClicks === 5) {
                let pwd = prompt("Ingrese contraseña de administrador:");
                if (pwd === "Mavecia3") {
                    isAdmin = true;
                    alert("Modo Administrador ACTIVADO. Protecciones desactivadas.");
                } else if (pwd !== null) {
                    alert("Contraseña incorrecta.");
                }
                adminClicks = 0;
            }
        });
    }

    // 1. Disable Right-Click (Context Menu)
    document.addEventListener('contextmenu', event => {
        if (!isAdmin) event.preventDefault();
    });

    // 2. Disable F12, Inspect, View Source, PrintScreen
    document.addEventListener('keydown', (e) => {
        if (isAdmin) return;
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
            (e.ctrlKey && e.key === 'U') ||
            e.key === 'PrintScreen') {
            e.preventDefault();
        }
    });

    // 3. Basic "Anti-Screenshot" (Hide content when window loses focus e.g., Snipping Tool, alt-tab)
    document.addEventListener('visibilitychange', () => {
        if (!isAdmin && document.hidden) {
            document.body.style.opacity = '0';
        } else {
            document.body.style.opacity = '1';
        }
    });

    window.addEventListener('blur', () => {
        if (!isAdmin) document.body.style.opacity = '0';
    });

    window.addEventListener('focus', () => {
        document.body.style.opacity = '1';
    });
});

document.getElementById('waste-type')?.addEventListener('change', function() {
    let category = this.value;
    document.getElementById('classification-result').innerText = "This waste belongs to: " + category;
});

const scanBtn = document.getElementById('scan-btn');
const uploadBtn = document.getElementById('upload-btn');
const scannerPreview = document.getElementById('scanner-preview');
let stream = null;


scanBtn.addEventListener('click', async () => {
    try {
        if (stream) {
            
            stopScanning();
            scanBtn.textContent = 'Scan';
        } else {
            
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            scannerPreview.srcObject = stream;
            scanBtn.textContent = 'Stop Scan';
        }
    } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Unable to access camera. Please ensure you have granted camera permissions.');
    }
});


uploadBtn.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                scannerPreview.src = e.target.result;
                
                processImage(file);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file.');
        }
    }
});


function stopScanning() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
        scannerPreview.srcObject = null;
    }
}


async function processImage(file) {
    try {
        
        scanBtn.textContent = 'Processing...';
        
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        
        scanBtn.textContent = 'Scan';
        
        
    } catch (error) {
        console.error('Error processing image:', error);
        alert('Error processing image. Please try again.');
        scanBtn.textContent = 'Scan';
    }
}


window.addEventListener('beforeunload', () => {
    stopScanning();
});


document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        scanBtn.click();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-category, .project-card, .timeline-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.skill-category, .project-card, .timeline-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
});

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);

// Run once on page load
animateOnScroll();

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});
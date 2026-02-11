// Modal functions
function showImage(src) {
    document.getElementById('modalImage').src = src;
}

function showVideo(src) {
    const video = document.getElementById('modalVideo');
    video.src = src;
    video.play();
}

function stopVideo() {
    const video = document.getElementById('modalVideo');
    video.pause();
    video.src = '';
}

// Stop video when modal is hidden
document.getElementById('videoModal').addEventListener('hidden.bs.modal', stopVideo);

// Navbar scroll color change
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.nav-pill-container');
    const workSection = document.querySelector('.section-dark-red');
    const workSectionTop = workSection.offsetTop;
    const scrollPosition = window.scrollY + 100;
    
    if (scrollPosition >= workSectionTop) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        navbar.style.border = '1px solid rgba(0, 0, 0, 0.1)';
        navbar.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-white');
            link.classList.add('text-dark');
        });
    } else {
        navbar.style.backgroundColor = '#4a0505';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = 'none';
        navbar.style.border = '1px solid rgba(255,255,255,0.1)';
        navbar.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-dark');
            link.classList.add('text-white');
        });
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-fade-left, .animate-fade-right, .animate-fade-up, .animate-scale').forEach(el => {
    observer.observe(el);
});

// Set skill circle percentages
document.querySelectorAll('.skill-circle').forEach(circle => {
    const percent = circle.getAttribute('data-percent');
    circle.style.setProperty('--percent', percent);
});

// Portfolio filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const photoshopSubmenu = document.getElementById('photoshop-submenu');
    
    function hideAllSubmenus() {
        photoshopSubmenu.style.display = 'none';
    }

    // Show only 3 per category on initial load
    const initCounts = {};
    document.querySelectorAll('.work-item').forEach(item => {
        const category = item.querySelector('.work-category').textContent.trim();
        initCounts[category] = (initCounts[category] || 0) + 1;
        if (initCounts[category] > 3) {
            item.style.display = 'none';
        }
    });
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.trim();
            
            // Show/hide appropriate submenu
            hideAllSubmenus();
            if (filter === 'Photoshop') {
                photoshopSubmenu.style.display = 'block';
            }
            
            // Filter items
            if (filter === 'All') {
                // Show only 3 items per category
                const categoryCounts = {};
                document.querySelectorAll('.work-item').forEach(item => {
                    const category = item.querySelector('.work-category').textContent.trim();
                    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
                    if (categoryCounts[category] <= 3) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            } else {
                document.querySelectorAll('.work-item').forEach(item => {
                    const category = item.querySelector('.work-category').textContent.trim();
                    if (category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Submenu link click handler
    document.querySelectorAll('.submenu-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active submenu link within the same submenu
            const parentContainer = this.closest('.submenu-container');
            parentContainer.querySelectorAll('.submenu-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Get the ps-filter value
            const psFilter = this.getAttribute('data-ps-filter');
            
            // Filter Photoshop items by ps-category
            document.querySelectorAll('.work-item').forEach(item => {
                const category = item.querySelector('.work-category').textContent.trim();
                const psCategory = item.getAttribute('data-ps-category');
                
                if (category !== 'Photoshop') {
                    item.style.display = 'none';
                } else if (psFilter === 'all') {
                    item.style.display = 'block';
                } else if (psCategory === psFilter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

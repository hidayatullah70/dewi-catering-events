// DARK MODE FUNCTIONALITY
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    
    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    }
    
    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
    
    // Check saved preference
    const savedMode = localStorage.getItem('darkMode');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedMode === 'enabled' || (!savedMode && prefersDarkScheme.matches)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', function(e) {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === null) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });
}

// MOBILE MENU FUNCTIONALITY
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// SMOOTH SCROLLING
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// NAVBAR SCROLL EFFECT
function initializeNavbarScroll() {
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-3');
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.classList.remove('py-3');
            navbar.classList.add('py-4');
        }
    });
}

// MENU TAB FUNCTIONALITY
function initializeMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuSections = document.querySelectorAll('.menu-section');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all menu sections
            menuSections.forEach(section => section.classList.add('hidden'));
            
            // Show corresponding menu section
            document.getElementById(`menu-${tabName}`).classList.remove('hidden');
        });
    });
}

// MENU SELECTION BUTTONS
function initializeMenuSelection() {
    document.querySelectorAll('.menu-select').forEach(button => {
        button.addEventListener('click', function() {
            const menuName = this.getAttribute('data-menu');
            const menuPrice = this.getAttribute('data-price');
            const menuUnit = this.getAttribute('data-unit') || 'paket';
            
            // Map menu names to radio button IDs
            let radioId = '';
            switch(menuName) {
                case 'Paket Tumpeng Nasi Kuning':
                    radioId = 'menu-paket-tumpeng';
                    break;
                case 'Paket Tumpeng Nasi Putih':
                    radioId = 'menu-paket-tumpeng-putih';
                    break;
                case 'Paket Snack Tampahan':
                    radioId = 'menu-paket-snack';
                    break;
                case 'Paket Angkringan Tampahan':
                    radioId = 'menu-paket-angkringan';
                    break;
                case 'Paket Ayam/Bebek Utuh':
                    radioId = 'menu-paket-ayam-bebek';
                    break;
                case 'Paket Sate & Gado-Gado':
                    radioId = 'menu-paket-sate';
                    break;
                case 'Nasi Box':
                    radioId = 'menu-nasi-box';
                    break;
                case 'Snack Box':
                    radioId = 'menu-snack-box';
                    break;
                case 'Rice Bowl':
                    radioId = 'menu-rice-bowl';
                    break;
                default:
                    radioId = 'menu-paket-tumpeng'; // Default fallback
            }
            
            const radioButton = document.getElementById(radioId);
            if (radioButton) {
                radioButton.checked = true;
            }
            
            // Scroll to order form
            document.getElementById('order').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Show confirmation toast
            showToast(`Anda memilih ${menuName} - Rp ${parseInt(menuPrice).toLocaleString('id-ID')}/${menuUnit}`);
        });
    });
}

// WHATSAPP ORDER FUNCTIONALITY
function initializeWhatsAppOrder() {
    const submitButton = document.getElementById('submit-whatsapp');
    
    if (!submitButton) return;
    
    submitButton.addEventListener('click', function() {
        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const date = document.getElementById('date').value;
        const guests = document.getElementById('guests').value;
        const notes = document.getElementById('notes').value.trim();
        
        // Get selected menu
        const selectedMenu = document.querySelector('input[name="menu"]:checked');
        const menu = selectedMenu ? selectedMenu.value : "Belum memilih menu";
        
        // Validate required fields
        let isValid = true;
        
        if (!name) {
            document.getElementById('name').classList.add('border-red-500');
            isValid = false;
        }
        
        if (!phone) {
            document.getElementById('phone').classList.add('border-red-500');
            isValid = false;
        }
        
        if (!address) {
            document.getElementById('address').classList.add('border-red-500');
            isValid = false;
        }
        
        if (!date) {
            document.getElementById('date').classList.add('border-red-500');
            isValid = false;
        }
        
        if (!guests) {
            document.getElementById('guests').classList.add('border-red-500');
            isValid = false;
        }
        
        if (!selectedMenu) {
            showToast('Harap pilih menu yang diinginkan!', 'error');
            isValid = false;
        }
        
        if (!isValid) {
            showToast('Harap lengkapi semua field yang wajib diisi!', 'error');
            return;
        }
        
        // Remove error highlights
        document.querySelectorAll('.border-red-500').forEach(el => {
            el.classList.remove('border-red-500');
        });
        
        // Format date
        const formattedDate = new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Create WhatsApp message
        const message = `*PESANAN CATERING - DEWI CATERING & EVENTS*

*DATA PEMESANAN:*
👤 Nama Lengkap: ${name}
📱 Nomor WhatsApp: ${phone}
📍 Alamat Acara: ${address}
📅 Tanggal Acara: ${formattedDate}
👥 Jumlah Tamu: ${guests} orang
🍽️ Menu Dipilih: ${menu}
📝 Catatan Tambahan: ${notes || "Tidak ada catatan"}

_Saya ingin memesan catering dengan detail di atas. Mohon informasikan ketersediaan dan total biayanya. Terima kasih._`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // WhatsApp number
        const whatsappNumber = "6281384224733";
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');
        
        // Show success message
        showToast('Mengarahkan ke WhatsApp dengan data pesanan Anda...', 'success');
    });
}

// NEWSLETTER FORM
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value) {
                showToast('Terima kasih telah berlangganan newsletter kami!', 'success');
                emailInput.value = '';
            }
        });
    }
}

// FORM VALIDATION & HELPERS
function initializeFormHelpers() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.setAttribute('min', today);
        
        // Set default date to 3 days from now
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
        dateInput.value = threeDaysFromNow.toISOString().split('T')[0];
    }
    
    // Remove error highlights on input
    const formInputs = document.querySelectorAll('#order-form input, #order-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('border-red-500');
        });
    });
}

// TOAST NOTIFICATION FUNCTION
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Determine color
    let bgColor = 'bg-blue-500';
    let icon = 'fa-info-circle';
    
    if (type === 'error') {
        bgColor = 'bg-red-500';
        icon = 'fa-exclamation-circle';
    } else if (type === 'success') {
        bgColor = 'bg-green-500';
        icon = 'fa-check-circle';
    } else if (type === 'warning') {
        bgColor = 'bg-yellow-500';
        icon = 'fa-exclamation-triangle';
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification fixed top-6 right-6 px-6 py-4 rounded-lg shadow-lg text-white z-50 transform transition-all duration-300 ${bgColor}`;
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${icon} mr-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// INITIALIZE EVERYTHING WHEN DOM IS LOADED
document.addEventListener('DOMContentLoaded', function() {
    initializeDarkMode();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeNavbarScroll();
    initializeMenuTabs();
    initializeMenuSelection();
    initializeWhatsAppOrder();
    initializeNewsletter();
    initializeFormHelpers();
    
    console.log('Dewi Catering & Events website initialized successfully!');
});

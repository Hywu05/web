// Main JavaScript - Xử lý chung cho toàn bộ website

document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js loaded');
    
    try {
        // Check login status and update UI
        checkLoginStatus();
        
        // Add event listeners
        addEventListeners();
        
        // Initialize cart count
        updateCartCount();
    } catch (error) {
        console.error('Error in main.js initialization:', error);
    }
});

function checkLoginStatus() {
    console.log('Checking login status...');
    
    try {
        // Check if user is logged in (in a real app, this would check with server)
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        
        console.log('Is logged in:', isLoggedIn);
        console.log('User info:', userInfo);
        
        const loginLink = document.getElementById('loginLink');
        const profileLink = document.getElementById('profileLink');
        
        console.log('Login link found:', !!loginLink);
        console.log('Profile link found:', !!profileLink);
        
        if (isLoggedIn && userInfo.email) {
            // User is logged in - show profile link
            console.log('User is logged in, showing profile link');
            if (loginLink) loginLink.style.display = 'none';
            if (profileLink) {
                profileLink.style.display = 'inline-flex';
                profileLink.innerHTML = `<i class="fas fa-user-circle"></i> ${userInfo.name || 'Tài khoản'}`;
            }
        } else {
            // User is not logged in - show login link
            console.log('User is not logged in, showing login link');
            if (loginLink) loginLink.style.display = 'inline-flex';
            if (profileLink) profileLink.style.display = 'none';
        }
    } catch (error) {
        console.error('Error checking login status:', error);
    }
}

function addEventListeners() {
    try {
        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add to cart functionality
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        console.log('Found add to cart buttons:', addToCartButtons.length);
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-product-id');
                console.log('Adding product to cart:', productId);
                addToCart(productId);
            });
        });
        
        // Search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch(this.value);
                }
            });
        }
        
        // Newsletter subscription
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                subscribeNewsletter(email);
            });
        }
        
        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuToggle && navLinks) {
            mobileMenuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
            });
        }
    } catch (error) {
        console.error('Error adding event listeners:', error);
    }
}

function addToCart(productId) {
    try {
        console.log('Adding to cart:', productId);
        // Get current cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        // Check if product already exists in cart
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
            console.log('Increased quantity for existing item');
        } else {
            // Lấy thông tin sản phẩm từ HTML
            const btn = document.querySelector(`.add-to-cart[data-product-id="${productId}"]`);
            const promoItem = btn ? btn.closest('.promo-item') : null;
            let name = '', price = 0, image = '';
            if (promoItem) {
                name = promoItem.querySelector('h3')?.innerText || '';
                image = promoItem.querySelector('img')?.src || '';
                // Lấy giá mới (giá sale)
                const priceText = promoItem.querySelector('.price span:last-child')?.innerText || '';
                price = parseInt(priceText.replace(/[^\d]/g, '')) || 0;
            }
            cart.push({
                id: productId,
                name,
                price,
                image,
                quantity: 1
            });
            console.log('Added new item to cart');
        }
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart saved to localStorage:', cart);
        // Update cart count
        updateCartCount();
        // Show success message
        showMessage('Sản phẩm đã được thêm vào giỏ hàng!', 'success');
    } catch (error) {
        console.error('Error adding to cart:', error);
        showMessage('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!', 'error');
    }
}

function updateCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartCountElements = document.querySelectorAll('.cart-count');
        
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        console.log('Updating cart count:', totalItems);
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            
            // Add animation
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'pulse 0.5s ease-in-out';
            }, 10);
        });
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

function performSearch(query) {
    try {
        if (query.trim()) {
            // In a real app, this would redirect to search results page
            console.log('Searching for:', query);
            showMessage(`Đang tìm kiếm: ${query}`, 'info');
        }
    } catch (error) {
        console.error('Error performing search:', error);
    }
}

function subscribeNewsletter(email) {
    try {
        if (email && isValidEmail(email)) {
            // In a real app, this would send to server
            console.log('Newsletter subscription:', email);
            showMessage('Cảm ơn bạn đã đăng ký nhận tin!', 'success');
        } else {
            showMessage('Vui lòng nhập email hợp lệ!', 'error');
        }
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        showMessage('Có lỗi xảy ra khi đăng ký!', 'error');
    }
}

function isValidEmail(email) {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    } catch (error) {
        console.error('Error validating email:', error);
        return false;
    }
}

function showMessage(message, type = 'info') {
    try {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message-toast');
        existingMessages.forEach(msg => msg.remove());
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-toast';
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            max-width: 300px;
        `;
        
        // Set background based on type
        if (type === 'success') {
            messageDiv.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
        } else if (type === 'error') {
            messageDiv.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
        } else {
            messageDiv.style.background = 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)';
        }
        
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 500);
        }, 3000);
    } catch (error) {
        console.error('Error showing message:', error);
    }
}

// Login/Logout functions
function loginUser(userData) {
    try {
        console.log('Logging in user:', userData);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userInfo', JSON.stringify(userData));
        checkLoginStatus();
    } catch (error) {
        console.error('Error logging in user:', error);
    }
}

function logoutUser() {
    try {
        console.log('Logging out user');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userInfo');
        checkLoginStatus();
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error logging out user:', error);
    }
}

// Add CSS animations if not already present
if (!document.querySelector('#main-animations')) {
    try {
        const style = document.createElement('style');
        style.id = 'main-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
            
            /* Mobile menu styles */
            @media (max-width: 768px) {
                .nav-links {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    flex-direction: column;
                    padding: 20px;
                }
                
                .nav-links.active {
                    display: flex;
                }
                
                .nav-links li {
                    margin: 10px 0;
                }
            }
        `;
        document.head.appendChild(style);
    } catch (error) {
        console.error('Error adding CSS animations:', error);
    }
}
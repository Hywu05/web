// Cart JavaScript - Xử lý giỏ hàng

document.addEventListener('DOMContentLoaded', function() {
    console.log('Cart.js loaded');
    
    // Initialize cart functionality
    initializeCart();
    
    // Add event listeners
    addCartEventListeners();
});

function initializeCart() {
    // Update cart count in header
    updateCartCount();
    
    // Load cart items from localStorage
    loadCartItems();
    
    // Check if cart is empty and show appropriate state
    checkCartState();
}

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const emptyCartState = document.getElementById('emptyCartState');
    
    if (cart.length === 0) {
        // Show empty cart state
        if (emptyCartState) {
            emptyCartState.style.display = 'block';
        }
        return;
    }
    
    // Hide empty cart state
    if (emptyCartState) {
        emptyCartState.style.display = 'none';
    }
    
    // Product data (in real app, this would come from database)
    const products = {
        '1': {
            id: '1',
            name: 'Serum Dưỡng Ẩm Vitamin C',
            price: 850000,
            image: '/images/download.jpg',
            description: 'Dung tích: 30ml'
        },
        '2': {
            id: '2',
            name: 'Kem Chống Nắng SPF 50+',
            price: 450000,
            image: '/images/kem-chong-nang-hang-ngay-ecosy-ultra-daily-sun-cream-61543.png',
            description: 'Dung tích: 50ml'
        },
        '3': {
            id: '3',
            name: 'Son Môi Lì Cao Cấp',
            price: 250000,
            image: '/images/5f93bb10fffdca748ee4765e_Son-YSL-Rouge-Pur-Couture-The-Slim-Matte-Lipstick-Mau-23-Mystery-Red-Vivalust.vn-6-3.jpeg',
            description: 'Màu: Đỏ Ruby'
        }
    };
    
    // Generate cart items HTML
    let cartItemsHTML = '';
    
    cart.forEach(item => {
        const product = products[item.id];
        if (product) {
            const total = product.price * item.quantity;
            cartItemsHTML += `
                <div class="cart-item" data-product-id="${item.id}">
                    <div class="item-product">
                        <img src="${product.image}" alt="${product.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                        </div>
                    </div>
                    <div class="item-price">${formatCurrency(product.price)}</div>
                    <div class="item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value, true)">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                    <div class="item-total">${formatCurrency(total)}</div>
                    <div class="item-action">
                        <button class="remove-btn" onclick="removeCartItem('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }
    });
    
    // Add cart actions
    if (cart.length > 0) {
        cartItemsHTML += `
            <div class="cart-actions" style="margin-top: 30px; display: flex; gap: 15px; justify-content: space-between;">
                <button class="btn-continue" onclick="window.location.href='index.html'" style="padding: 12px 25px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 15px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
                    <i class="fas fa-arrow-left" style="margin-right: 10px;"></i>
                    Tiếp tục mua hàng
                </button>
                <button class="btn-clear" onclick="clearCart()" style="padding: 12px 25px; background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; border: none; border-radius: 15px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
                    <i class="fas fa-trash" style="margin-right: 10px;"></i>
                    Xóa tất cả
                </button>
            </div>
        `;
    }
    
    cartItemsContainer.innerHTML = cartItemsHTML;
}

function addCartEventListeners() {
    // Apply coupon button
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', function() {
            applyCoupon();
        });
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            proceedToCheckout();
        });
    }
}

function checkCartState() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartSummary = document.getElementById('cartSummary');
    const cartHeader = document.querySelector('.cart-header');
    
    if (cart.length === 0) {
        // Show empty cart state
        if (cartSummary) {
            cartSummary.style.display = 'none';
        }
        if (cartHeader) {
            cartHeader.style.display = 'none';
        }
    } else {
        // Show cart items
        if (cartSummary) {
            cartSummary.style.display = 'block';
        }
        if (cartHeader) {
            cartHeader.style.display = 'grid';
        }
        calculateCartTotals();
    }
}

function updateQuantity(productId, change, isDirectInput = false) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (isDirectInput) {
            item.quantity = parseInt(change) || 1;
        } else {
            item.quantity += parseInt(change);
        }
        
        if (item.quantity < 1) {
            item.quantity = 1;
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
        calculateCartTotals();
    }
}

function removeCartItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    loadCartItems();
    updateCartCount();
    checkCartState();
    
    showMessage('Sản phẩm đã được xóa khỏi giỏ hàng!', 'success');
}

function clearCart() {
    if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
        localStorage.removeItem('cart');
        loadCartItems();
        updateCartCount();
        checkCartState();
        
        showMessage('Đã xóa tất cả sản phẩm khỏi giỏ hàng!', 'success');
    }
}

function calculateCartTotals() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const products = {
        '1': { price: 850000 },
        '2': { price: 450000 },
        '3': { price: 250000 }
    };
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const product = products[item.id];
        if (product) {
            subtotal += product.price * item.quantity;
        }
    });
    
    const shipping = subtotal > 0 ? 30000 : 0;
    const discount = subtotal > 1000000 ? 100000 : 0;
    const total = subtotal + shipping - discount;
    
    // Update summary
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('shipping').textContent = formatCurrency(shipping);
    document.getElementById('discount').textContent = `-${formatCurrency(discount)}`;
    document.getElementById('total').textContent = formatCurrency(total);
    
    // Enable/disable checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        if (subtotal > 0) {
            checkoutBtn.disabled = false;
            checkoutBtn.style.opacity = '1';
            checkoutBtn.style.cursor = 'pointer';
        } else {
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = '0.5';
            checkoutBtn.style.cursor = 'not-allowed';
        }
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        
        // Add animation
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
    });
}

function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (cart.length === 0) {
        showMessage('Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.', 'error');
        return;
    }
    
    // Show loading state
    const checkoutBtn = document.getElementById('checkoutBtn');
    const originalText = checkoutBtn.innerHTML;
    checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 10px;"></i>Đang xử lý...';
    checkoutBtn.disabled = true;
    
    // Simulate checkout process
    setTimeout(() => {
        showMessage('Chuyển hướng đến trang thanh toán...', 'success');
        
        setTimeout(() => {
            // In a real application, this would redirect to a checkout page
            alert('Chức năng thanh toán sẽ được tích hợp với cổng thanh toán thực tế.');
            checkoutBtn.innerHTML = originalText;
            checkoutBtn.disabled = false;
        }, 1500);
    }, 2000);
}

function applyCoupon() {
    const couponInput = document.getElementById('couponInput');
    const couponCode = couponInput.value.trim();
    
    if (!couponCode) {
        showMessage('Vui lòng nhập mã giảm giá!', 'error');
        return;
    }
    
    // Simulate coupon validation
    const validCoupons = ['BEAUTY10', 'WELCOME20', 'SALE30'];
    
    if (validCoupons.includes(couponCode.toUpperCase())) {
        showMessage('Mã giảm giá hợp lệ! Đã áp dụng giảm giá.', 'success');
        couponInput.style.borderColor = '#27ae60';
        couponInput.style.boxShadow = '0 0 0 3px rgba(39, 174, 96, 0.1)';
    } else {
        showMessage('Mã giảm giá không hợp lệ!', 'error');
        couponInput.style.borderColor = '#e74c3c';
        couponInput.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.cart-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'cart-message';
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
}

// Add CSS animations if not already present
if (!document.querySelector('#cart-animations')) {
    const style = document.createElement('style');
    style.id = 'cart-animations';
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
    `;
    document.head.appendChild(style);
}
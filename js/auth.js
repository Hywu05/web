// Auth JavaScript - Xử lý đăng nhập và đăng ký

// Immediately clear any stored form data
(function() {
    // Clear any existing form data
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.setAttribute('autocomplete', 'off');
        form.setAttribute('data-lpignore', 'true');
        form.setAttribute('novalidate', 'true');
    });
    
    // Clear all input fields immediately
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        input.value = '';
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('data-lpignore', 'true');
        input.setAttribute('data-form-type', 'other');
        input.setAttribute('spellcheck', 'false');
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('autocapitalize', 'off');
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth.js loaded');
    
    // Disable browser autofill for all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.setAttribute('autocomplete', 'off');
        form.setAttribute('data-lpignore', 'true');
        form.setAttribute('novalidate', 'true');
    });
    
    // Clear all input fields on page load
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        // Clear any existing values
        input.value = '';
        
        // Set attributes to prevent autofill
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('data-lpignore', 'true');
        input.setAttribute('data-form-type', 'other');
        input.setAttribute('readonly', 'readonly');
        input.setAttribute('spellcheck', 'false');
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('autocapitalize', 'off');
        
        // Remove readonly after a short delay
        setTimeout(() => {
            input.removeAttribute('readonly');
        }, 100);
    });
    
    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('registerPassword');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // Password strength checker
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }

    // Login form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateLoginForm();
        });
        
        // Prevent form from showing saved data on click
        const loginInputs = loginForm.querySelectorAll('input');
        loginInputs.forEach(input => {
            // Clear value on click
            input.addEventListener('click', function() {
                if (this.type === 'email' || this.type === 'password') {
                    this.value = '';
                    this.setAttribute('autocomplete', 'off');
                    this.setAttribute('data-lpignore', 'true');
                    this.setAttribute('data-form-type', 'other');
                }
            });
            
            // Prevent browser autofill
            input.addEventListener('focus', function() {
                if (this.type === 'email' || this.type === 'password') {
                    this.value = '';
                    this.setAttribute('autocomplete', 'off');
                    this.setAttribute('data-lpignore', 'true');
                    this.setAttribute('data-form-type', 'other');
                }
            });
            
            // Clear any existing autofill data
            setTimeout(() => {
                if (this.type === 'email' || this.type === 'password') {
                    this.value = '';
                    this.setAttribute('autocomplete', 'off');
                    this.setAttribute('data-lpignore', 'true');
                    this.setAttribute('data-form-type', 'other');
                }
            }, 100);
            
            // Additional prevention on mouseenter
            input.addEventListener('mouseenter', function() {
                if (this.type === 'email' || this.type === 'password') {
                    this.setAttribute('autocomplete', 'off');
                    this.setAttribute('data-lpignore', 'true');
                    this.setAttribute('data-form-type', 'other');
                }
            });
            
            // Additional prevention on touchstart (mobile)
            input.addEventListener('touchstart', function() {
                if (this.type === 'email' || this.type === 'password') {
                    this.value = '';
                    this.setAttribute('autocomplete', 'off');
                    this.setAttribute('data-lpignore', 'true');
                    this.setAttribute('data-form-type', 'other');
                }
            });
        });
    }

    // Register form validation
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateRegisterForm();
        });
        
        // Prevent form from showing saved data on click
        const registerInputs = registerForm.querySelectorAll('input');
        registerInputs.forEach(input => {
            // Clear value on click
            input.addEventListener('click', function() {
                if (this.type === 'email' || this.type === 'password') {
                    this.value = '';
                    this.setAttribute('autocomplete', 'off');
                    this.setAttribute('data-lpignore', 'true');
                    this.setAttribute('data-form-type', 'other');
                }
            });
            
            // Prevent browser autofill
            input.addEventListener('focus', function() {
                if (this.type === 'email' || this.type === 'password') {
                    this.value = '';
                    this.setAttribute('autocomplete', 'off');
                    this.setAttribute('data-lpignore', 'true');
                    this.setAttribute('data-form-type', 'other');
                }
            });
            
            // Clear any existing autofill data
            setTimeout(() => {
                if (this.type === 'email' || this.type === 'password') {
                    this.value = '';
                    this.setAttribute('autocomplete', 'off');
                    this.setAttribute('data-lpignore', 'true');
                    this.setAttribute('data-form-type', 'other');
                }
            }, 100);
            
            // Additional prevention on mouseenter
            input.addEventListener('mouseenter', function() {
                if (this.type === 'email' || this.type === 'password') {
                    this.setAttribute('autocomplete', 'off');
                    this.setAttribute('data-lpignore', 'true');
                    this.setAttribute('data-form-type', 'other');
                }
            });
            
            // Additional prevention on touchstart (mobile)
            input.addEventListener('touchstart', function() {
                if (this.type === 'email' || this.type === 'password') {
                    this.value = '';
                    this.setAttribute('autocomplete', 'off');
                    this.setAttribute('data-lpignore', 'true');
                    this.setAttribute('data-form-type', 'other');
                }
            });
        });
    }

    // Real-time validation
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
});

// Password strength checker
function checkPasswordStrength(password) {
    const strength1 = document.getElementById('strength1');
    const strength2 = document.getElementById('strength2');
    const strength3 = document.getElementById('strength3');
    const strength4 = document.getElementById('strength4');
    const strengthText = document.getElementById('strengthText');
    
    if (!strength1) return;

    let strength = 0;
    let feedback = '';

    // Check length
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Check for lowercase
    if (/[a-z]/.test(password)) strength++;

    // Check for uppercase
    if (/[A-Z]/.test(password)) strength++;

    // Check for numbers
    if (/[0-9]/.test(password)) strength++;

    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    // Update visual indicators
    const strengthBars = [strength1, strength2, strength3, strength4];
    strengthBars.forEach((bar, index) => {
        if (index < strength) {
            if (strength <= 2) {
                bar.style.background = '#e74c3c';
                feedback = 'Yếu';
            } else if (strength <= 3) {
                bar.style.background = '#f39c12';
                feedback = 'Trung bình';
            } else if (strength <= 4) {
                bar.style.background = '#3498db';
                feedback = 'Mạnh';
            } else {
                bar.style.background = '#27ae60';
                feedback = 'Rất mạnh';
            }
        } else {
            bar.style.background = '#e9ecef';
        }
    });

    strengthText.textContent = `Độ mạnh: ${feedback}`;
    strengthText.style.color = strength <= 2 ? '#e74c3c' : strength <= 3 ? '#f39c12' : strength <= 4 ? '#3498db' : '#27ae60';
}

// Validate login form
function validateLoginForm() {
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    let isValid = true;

    // Clear previous errors
    clearAllErrors();

    // Validate email
    if (!email.value.trim()) {
        showFieldError(email, 'Email không được để trống');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Email không hợp lệ');
        isValid = false;
    }

    // Validate password
    if (!password.value.trim()) {
        showFieldError(password, 'Mật khẩu không được để trống');
        isValid = false;
    } else if (password.value.length < 6) {
        showFieldError(password, 'Mật khẩu phải có ít nhất 6 ký tự');
        isValid = false;
    }

    if (isValid) {
        console.log('Login form is valid, starting login process...');
        
        // Simulate login process
        const submitBtn = document.querySelector('.btn-auth');
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Đang đăng nhập...';

        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Đăng nhập';
            
            // Store user info in localStorage
            const userData = {
                email: email.value,
                name: email.value.split('@')[0], // Use email prefix as name for demo
                loginTime: new Date().toISOString()
            };
            
            console.log('Login successful, user data:', userData);
            
            // Store in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userInfo', JSON.stringify(userData));
            
            console.log('User data saved to localStorage');
            
            // Show success message
            showSuccessMessage('Đăng nhập thành công!');
            
            // Redirect to home page after 1 second
            console.log('Preparing to redirect to index.html...');
            setTimeout(() => {
                console.log('Redirecting to index.html...');
                redirectToHome();
            }, 1000);
        }, 2000);
    }
}

// Validate register form
function validateRegisterForm() {
    const name = document.getElementById('registerName');
    const email = document.getElementById('registerEmail');
    const phone = document.getElementById('registerPhone');
    const password = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.querySelector('input[name="terms"]');
    
    let isValid = true;

    // Clear previous errors
    clearAllErrors();

    // Validate name
    if (!name.value.trim()) {
        showFieldError(name, 'Họ và tên không được để trống');
        isValid = false;
    } else if (name.value.length < 2) {
        showFieldError(name, 'Họ và tên phải có ít nhất 2 ký tự');
        isValid = false;
    }

    // Validate email
    if (!email.value.trim()) {
        showFieldError(email, 'Email không được để trống');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Email không hợp lệ');
        isValid = false;
    }

    // Validate phone
    if (!phone.value.trim()) {
        showFieldError(phone, 'Số điện thoại không được để trống');
        isValid = false;
    } else if (!isValidPhone(phone.value)) {
        showFieldError(phone, 'Số điện thoại không hợp lệ');
        isValid = false;
    }

    // Validate password
    if (!password.value.trim()) {
        showFieldError(password, 'Mật khẩu không được để trống');
        isValid = false;
    } else if (password.value.length < 8) {
        showFieldError(password, 'Mật khẩu phải có ít nhất 8 ký tự');
        isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword.value.trim()) {
        showFieldError(confirmPassword, 'Xác nhận mật khẩu không được để trống');
        isValid = false;
    } else if (confirmPassword.value !== password.value) {
        showFieldError(confirmPassword, 'Mật khẩu xác nhận không khớp');
        isValid = false;
    }

    // Validate terms
    if (!terms.checked) {
        showFieldError(terms, 'Bạn phải đồng ý với điều khoản sử dụng');
        isValid = false;
    }

    if (isValid) {
        console.log('Register form is valid, starting registration process...');
        
        // Simulate registration process
        const submitBtn = document.querySelector('.btn-auth');
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Đang đăng ký...';

        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Đăng ký';
            
            // Store user info in localStorage
            const userData = {
                name: name.value,
                email: email.value,
                phone: phone.value,
                registerTime: new Date().toISOString()
            };
            
            console.log('Registration successful, user data:', userData);
            
            // Store in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userInfo', JSON.stringify(userData));
            
            console.log('User data saved to localStorage');
            
            // Show success message
            showSuccessMessage('Đăng ký thành công! Chào mừng bạn đến với Beauty Cosmetics.');
            
            // Redirect to home page after 2 seconds
            console.log('Preparing to redirect to index.html...');
            setTimeout(() => {
                console.log('Redirecting to index.html...');
                redirectToHome();
            }, 2000);
        }, 2000);
    }
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    switch (fieldName) {
        case 'email':
            if (!value) {
                showFieldError(field, 'Email không được để trống');
            } else if (!isValidEmail(value)) {
                showFieldError(field, 'Email không hợp lệ');
            }
            break;
            
        case 'password':
            if (!value) {
                showFieldError(field, 'Mật khẩu không được để trống');
            } else if (value.length < 6) {
                showFieldError(field, 'Mật khẩu phải có ít nhất 6 ký tự');
            }
            break;
            
        case 'name':
            if (!value) {
                showFieldError(field, 'Họ và tên không được để trống');
            } else if (value.length < 2) {
                showFieldError(field, 'Họ và tên phải có ít nhất 2 ký tự');
            }
            break;
            
        case 'phone':
            if (!value) {
                showFieldError(field, 'Số điện thoại không được để trống');
            } else if (!isValidPhone(value)) {
                showFieldError(field, 'Số điện thoại không hợp lệ');
            }
            break;
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + 'Error') || 
                        document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    field.style.borderColor = '#e74c3c';
    field.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
}

function clearFieldError(field) {
    const errorElement = document.getElementById(field.name + 'Error') || 
                        document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    field.style.borderColor = '#e9ecef';
    field.style.boxShadow = 'none';
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.borderColor = '#e9ecef';
        input.style.boxShadow = 'none';
    });
}

function showSuccessMessage(message) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(39, 174, 96, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
    `;
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 500);
    }, 3000);
}

// Improved redirect function
function redirectToHome() {
    console.log('Executing redirect to home...');
    
    // Try multiple redirect methods
    try {
        // Method 1: window.location.replace (most reliable)
        window.location.replace('index.html');
        console.log('Redirect method 1: window.location.replace executed');
        
        // Method 2: Fallback after 1 second
        setTimeout(() => {
            if (window.location.pathname.indexOf('index.html') === -1) {
                console.log('Trying fallback redirect method...');
                window.location.href = 'index.html';
            }
        }, 1000);
        
        // Method 3: Final fallback after 2 seconds
        setTimeout(() => {
            if (window.location.pathname.indexOf('index.html') === -1) {
                console.log('Trying final fallback redirect method...');
                window.location = 'index.html';
            }
        }, 2000);
        
    } catch (error) {
        console.error('Redirect error:', error);
        // Emergency fallback
        window.location = 'index.html';
    }
}

// Add CSS animations
const style = document.createElement('style');
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
`;
document.head.appendChild(style);
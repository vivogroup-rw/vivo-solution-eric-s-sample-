document.addEventListener('DOMContentLoaded', () => {
    // Page Elements
    const signupForm = document.getElementById('signup-form');
    const signupSection = document.getElementById('signup-section');
    const paymentSection = document.getElementById('payment-section');
    const backBtn = document.getElementById('back-to-signup');
    const loginForm = document.getElementById('login-form');
    const paymentForm = document.getElementById('payment-form');

    // Dashboard Elements
    const navUsername = document.getElementById('nav-username');
    const profileUsername = document.getElementById('profile-username');
    const profileCountry = document.getElementById('profile-country');

    const displayUsername = document.getElementById('display-username');

    // 1. Handle Sign Up Submission
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const countrySelect = document.getElementById('country');
            const country = countrySelect.options[countrySelect.selectedIndex].text;

            // Save basic info for dashboard simulation
            localStorage.setItem('mmo_user', JSON.stringify({
                username: username,
                email: email,
                country: country
            }));

            if (displayUsername) displayUsername.textContent = username;

            // Transition to Payment
            signupSection.classList.add('hidden');
            setTimeout(() => {
                paymentSection.classList.remove('hidden');
                paymentSection.classList.add('fade-in');
            }, 300);
        });
    }

    // 2. Handle Payment Submission (Redirect to Dashboard)
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Payment of 5,800 RWF processing successfully. Your account is activated!');

            // Redirect to Dashboard
            window.location.href = 'dashboard.html';
        });
    }

    // 3. Handle Login Submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('login-username').value;

            // For simulation, we check if we have a saved user, otherwise just use the input
            const savedUser = JSON.parse(localStorage.getItem('mmo_user') || '{}');
            if (savedUser.username !== username) {
                localStorage.setItem('mmo_user', JSON.stringify({
                    username: username,
                    email: 'guest@example.com',
                    country: 'International'
                }));
            }

            window.location.href = 'dashboard.html';
        });
    }

    // 4. Load Dashboard Data
    if (navUsername || profileUsername) {
        const savedUser = JSON.parse(localStorage.getItem('mmo_user') || '{"username":"Guest", "country":"---"}');

        if (navUsername) navUsername.textContent = savedUser.username;
        if (profileUsername) profileUsername.textContent = savedUser.username;
        if (profileCountry) profileCountry.textContent = savedUser.country;
    }

    // 5. Country to Phone Prefix Mapping
    const countryToPrefix = {
        'rwanda': '+250', 'algeria': '+213', 'angola': '+244', 'benin': '+229',
        'botswana': '+267', 'burkina_faso': '+226', 'burundi': '+257', 'kenya': '+254',
        'nigeria': '+234', 'south_africa': '+27', 'uganda': '+256', 'tanzania': '+255',
        'usa': '+1', 'uk': '+44', 'india': '+91', 'canada': '+1-ca'
    };

    const countrySelect = document.getElementById('country');
    const prefixSelect = document.getElementById('phone-prefix');

    if (countrySelect && prefixSelect) {
        countrySelect.addEventListener('change', () => {
            const prefix = countryToPrefix[countrySelect.value];
            if (prefix) {
                prefixSelect.value = prefix;
            }
        });
    }

    // 6. Back button (Payment to Signup)
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            paymentSection.classList.add('hidden');
            setTimeout(() => {
                signupSection.classList.remove('hidden');
                signupSection.classList.add('fade-in');
            }, 300);
        });
    }
});

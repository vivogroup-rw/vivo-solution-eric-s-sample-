document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const signupSection = document.getElementById('signup-section');
    const paymentSection = document.getElementById('payment-section');
    const backBtn = document.getElementById('back-to-signup');
    
    const displayUsername = document.getElementById('display-username');
    const amountInput = document.getElementById('pay-amount');
    const amountText = document.getElementById('selected-amount-text');
    
    const optionCards = document.querySelectorAll('.option-card');

    // Handle Sign Up Submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        displayUsername.textContent = username;

        // Transition to Payment
        signupSection.classList.add('hidden');
        setTimeout(() => {
            paymentSection.classList.remove('hidden');
            paymentSection.classList.add('fade-in');
        }, 300);
    });

    // Handle Option Selection
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active from others
            optionCards.forEach(c => c.classList.remove('active'));
            // Add active to this
            card.classList.add('active');
            
            // Update values
            const amount = card.getAttribute('data-amount');
            const amountFormatted = parseInt(amount).toLocaleString() + ' RWF';
            
            amountInput.value = amount;
            amountText.textContent = amountFormatted;
        });
    });

    // Handle Payment Submission
    document.getElementById('payment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Payment processing simulated successfully for ' + amountText.textContent);
    });

    // Back button
    backBtn.addEventListener('click', () => {
        paymentSection.classList.add('hidden');
        setTimeout(() => {
            signupSection.classList.remove('hidden');
            signupSection.classList.add('fade-in');
        }, 300);
    });
});

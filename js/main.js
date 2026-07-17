document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Greeting & Date Utility
    const greetingEl = document.getElementById('greeting');
    const dateEl = document.getElementById('currentDate');
    if (greetingEl && dateEl) {
        const hour = new Date().getHours();
        const greetingText = hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!";
        greetingEl.textContent = greetingText;
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = new Date().toLocaleDateString('en-US', dateOptions);
    }

    // 2. Multi-Page View Transition Switching System
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const navLinksContainer = document.getElementById('navLinks');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.dataset.page;
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            pageSections.forEach(section => {
                if (section.id === targetPage) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });

            // Resets scroll window offset when user shifts categories
            window.scrollTo({ top: 0, behavior: 'instant' });

            // Ensure adaptive overlay menu drawer collapses down
            navLinksContainer.classList.add('hidden');
            navLinksContainer.classList.remove('flex');
        });
    });

    // 3. Mobile View Trigger Toggle
    document.getElementById('menuToggle').addEventListener('click', () => {
        navLinksContainer.classList.toggle('hidden');
        navLinksContainer.classList.toggle('flex');
    });

    // 4. Form Submission Input Verification Integrity Block
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            document.querySelectorAll('.error').forEach(err => {
                err.textContent = '';
                err.style.display = 'none';
            });
            document.getElementById('successMsg').style.display = 'none';

            // Validate full name criteria lengths
            const name = document.getElementById('name').value.trim();
            const nameError = document.getElementById('nameError');
            if (name.length < 2) {
                nameError.textContent = "Name must be at least 2 characters";
                nameError.style.display = 'block';
                isValid = false;
            }

            // Verify explicit format patterns for emails
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailError = document.getElementById('emailError');
            if (!emailRegex.test(email)) {
                emailError.textContent = "Enter a valid email address";
                emailError.style.display = 'block';
                isValid = false;
            }

            // Confirm context volume parameters for textual inputs
            const message = document.getElementById('message').value.trim();
            const messageError = document.getElementById('messageError');
            if (message.length < 10) {
                messageError.textContent = "Message must be at least 10 characters";
                messageError.style.display = 'block';
                isValid = false;
            }

            // Process callback if all validations evaluate successfully
            if (isValid) {
                document.getElementById('successMsg').style.display = 'block';
                contactForm.reset();
            }
        });
    }
});

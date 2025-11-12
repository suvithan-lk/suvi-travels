// Preloader
        window.addEventListener('load', function() {
            const preloader = document.querySelector('.preloader');
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 2000); // Show preloader for 2 seconds
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        });

        // Set minimum date
        const pickupDateInput = document.getElementById('pickupDate');
        if (pickupDateInput) {
            pickupDateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
        }

        // Scroll reveal animation
        function reveal() {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal();

        // Destination card click
        document.querySelectorAll('.destination-luxury-card').forEach(card => {
            card.addEventListener('click', function() {
                const destinationName = this.querySelector('h3').textContent;
                const toPlaceInput = document.getElementById('toPlace');
                if (toPlaceInput) {
                    toPlaceInput.value = destinationName;
                    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => toPlaceInput.focus(), 800);
                }
            });
        });

        // Send booking function
        function sendBooking() {
            sendWhatsApp();
        }

        function sendWhatsApp() {
            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                passengers: document.getElementById('passengers').value,
                fromPlace: document.getElementById('fromPlace').value,
                toPlace: document.getElementById('toPlace').value,
                pickupDate: document.getElementById('pickupDate').value,
                pickupTime: document.getElementById('pickupTime').value,
                tripType: document.getElementById('tripType').value,
                message: document.getElementById('message').value
            };

            let message = `*✨ Luxury Booking Request - Suvi Travels ✨*\n\n`;
            message += `*Guest Information:*\n`;
            message += `👤 Name: ${data.name || 'Not provided'}\n`;
            message += `📧 Email: ${data.email || 'Not provided'}\n`;
            message += `📱 Phone: ${data.phone || 'Not provided'}\n`;
            message += `👥 Guests: ${data.passengers || 'Not provided'}\n\n`;
            message += `*Journey Details:*\n`;
            message += `📍 From: ${data.fromPlace || 'Not provided'}\n`;
            message += `🎯 To: ${data.toPlace || 'Not provided'}\n`;
            message += `📅 Date: ${data.pickupDate || 'Not provided'}\n`;
            message += `🕐 Time: ${data.pickupTime || 'Not provided'}\n`;
            message += `🎭 Experience: ${data.tripType || 'Not provided'}\n`;
            
            if (data.message) {
                message += `\n*Special Requests:*\n${data.message}`;
            }

            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/94754272556?text=${encodedMessage}`;
            window.open(whatsappURL, '_blank');
        }

        // Phone formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0 && !value.startsWith('94')) {
                    if (value.startsWith('0')) {
                        value = '94' + value.substring(1);
                    }
                }
                e.target.value = value;
            });
        }
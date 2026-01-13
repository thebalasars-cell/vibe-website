document.addEventListener('DOMContentLoaded', () => {
    // Fix for mobile viewport height changes (browser UI)
    function setVh() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Prevent scrolling when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Portfolio Tab Switching
    const tabs = document.querySelectorAll('.portfolio-tab');
    const items = document.querySelectorAll('.portfolio-item');

    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-target');

                // Update active tab class
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Filter items
                items.forEach(item => {
                    if (item.getAttribute('data-type') === target) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Video Controls (Hover & Scroll)
    const videoCards = document.querySelectorAll('.video-card');

    // Intersection Observer for scroll-to-play (Mobile)
    const observerOptions = {
        threshold: 0.6 // Video must be 60% visible to start
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if (!video) return;

            // On mobile, auto-play when scrolling into view
            if (window.innerWidth <= 768) {
                if (entry.isIntersecting) {
                    video.play().catch(() => { });
                    entry.target.classList.add('playing');
                } else {
                    video.pause();
                    entry.target.classList.remove('playing');
                }
            }
        });
    }, observerOptions);

    videoCards.forEach(card => {
        const video = card.querySelector('video');
        if (!video) return;

        // Start observing for scroll-play
        observer.observe(card);

        // Desktop Hover Play
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                video.muted = false;
                video.play();
                card.classList.add('playing');
            }
        });

        card.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                video.pause();
                video.muted = true;
                card.classList.remove('playing');
            }
        });

        // Toggle on click/tap (Manual override)
        card.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                card.classList.add('playing');
            } else {
                video.pause();
                card.classList.remove('playing');
            }
        });
    });
});

(function() {
    'use strict';

    /* ---------- 1. NAV TOGGLE (mobile) ---------- */
    document.querySelector('.nav-toggle')?.addEventListener('click', () => {
        document.querySelector('.nav').classList.toggle('nav-open');
    });

    /* ---------- 2. REVEAL OBSERVER ---------- */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.property-card, .service-card, .team-card, .contact-form, .about-content').forEach(el => revealObserver.observe(el));

    /* ---------- 3. SMOOTH SCROLL ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                document.querySelector('.nav')?.classList.remove('nav-open');
            }
        });
    });

    /* ---------- 4. DARK MODE ---------- */
    const darkToggle = document.getElementById('darkToggle');
    const html = document.documentElement;

    if (darkToggle) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            darkToggle.innerHTML = '&#9788;';
        }

        darkToggle.addEventListener('click', function() {
            const current = html.getAttribute('data-theme');
            if (current === 'dark') {
                html.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                this.innerHTML = '&#9790;';
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                this.innerHTML = '&#9788;';
            }
        });
    }

    /* ---------- 5. LANGUAGE SWITCHER ---------- */
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('lang') || 'tr';

    function applyTranslations(lang) {
        const t = translations[lang];
        if (!t) return;

        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                el.innerHTML = t[key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key]) {
                el.placeholder = t[key];
            }
        });

        html.setAttribute('lang', lang === 'tr' ? 'tr' : 'en');

        if (langToggle) {
            langToggle.textContent = t['nav-lang'] || (lang === 'tr' ? 'EN' : 'TR');
        }

        if (darkToggle) {
            darkToggle.setAttribute('aria-label', t['dark-aria'] || '');
        }
        if (langToggle) {
            langToggle.setAttribute('aria-label', t['lang-aria'] || '');
        }
    }

    if (langToggle) {
        langToggle.addEventListener('click', function() {
            currentLang = currentLang === 'tr' ? 'en' : 'tr';
            localStorage.setItem('lang', currentLang);
            applyTranslations(currentLang);
        });
    }

    applyTranslations(currentLang);

    /* ---------- 6. FORM SUBMISSION ---------- */
    document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const original = btn.textContent;
            btn.textContent = '✓ ' + (currentLang === 'tr' ? 'Gönderildi' : 'Sent');
            btn.style.background = '#2ecc71';
            btn.style.borderColor = '#2ecc71';
            btn.style.color = '#fff';

            const msg = document.createElement('div');
            msg.style.cssText = 'margin-top:1rem;padding:1rem 1.25rem;background:rgba(46,204,113,0.12);border:1px solid rgba(46,204,113,0.3);border-radius:8px;font-size:0.85rem;color:rgba(255,255,255,0.85);text-align:center;';
            msg.textContent = currentLang === 'tr'
                ? 'Teşekkürler! Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
                : 'Thank you! Your message has been sent successfully. We will get back to you shortly.';
            this.appendChild(msg);

            this.reset();
            setTimeout(() => {
                btn.textContent = original;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
                msg.remove();
            }, 5000);
        });
    });

})();

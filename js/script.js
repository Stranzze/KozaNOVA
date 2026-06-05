(function() {
    'use strict';

    /* NAV TOGGLE (mobile) */
    document.querySelector('.nav-toggle')?.addEventListener('click', () => {
        document.querySelector('.nav').classList.toggle('nav-open');
    });

    /*  REVEAL OBSERVER  */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.property-card, .service-card, .team-card, .contact-form, .about-content').forEach(el => revealObserver.observe(el));

    /*  SMOOTH SCROLL  */
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

    /*  DARK   */
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

    /*  LANGUAGE  */
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

    /*  FORM VALIDATION & SUBMISSION  */
    function validateForm(form) {
        const fields = [
            { el: form.querySelector('[name="name"]'), test: v => v.value.trim().length > 0,
              msg: { tr: 'Adınız ve soyadınız zorunludur.', en: 'Name is required.' } },
            { el: form.querySelector('[name="email"]'), test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.value.trim()),
              msg: { tr: 'Geçerli bir e-posta adresi giriniz.', en: 'Enter a valid email address.' } },
            { el: form.querySelector('[name="phone"]'), test: v => /^[0-9\s\+\-\(\)]{7,20}$/.test(v.value.trim()),
              msg: { tr: 'Geçerli bir telefon numarası giriniz.', en: 'Enter a valid phone number.' } },
            { el: form.querySelector('[name="interest"]'), test: v => v.value !== '',
              msg: { tr: 'İlgi alanınızı seçiniz.', en: 'Please select an area of interest.' } }
        ];

        const errors = [];
        fields.forEach(({ el, test, msg }) => {
            const valid = test(el);
            el.classList.toggle('error', !valid);
            if (!valid) errors.push(msg[currentLang]);
        });

        return errors;
    }

    document.querySelectorAll('.contact-form').forEach(form => {
        const errorDiv = form.querySelector('.form-error');

        form.addEventListener('submit', function(e) {
            const errors = validateForm(this);

            if (errors.length > 0) {
                e.preventDefault();
                errorDiv.textContent = errors.join(' ');
                errorDiv.style.display = 'block';
                this.querySelector('.error')?.focus();
                return;
            }

            errorDiv.style.display = 'none';

            const btn = this.querySelector('button[type="submit"]');
            const original = btn.textContent;
            btn.disabled = true;
            btn.textContent = currentLang === 'tr' ? 'Gönderiliyor...' : 'Sending...';

            if (!this.hasAttribute('data-netlify')) {
                e.preventDefault();
                const msg = document.createElement('div');
                msg.style.cssText = 'margin-top:1rem;padding:1rem 1.25rem;background:rgba(46,204,113,0.12);border:1px solid rgba(46,204,113,0.3);border-radius:8px;font-size:0.85rem;color:rgba(255,255,255,0.85);text-align:center;';
                msg.textContent = currentLang === 'tr'
                    ? 'Teşekkürler! Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
                    : 'Thank you! Your message has been sent successfully. We will get back to you shortly.';
                this.appendChild(msg);
                this.reset();
                btn.disabled = false;
                btn.textContent = original;
                setTimeout(() => msg.remove(), 5000);
            }
        });

        form.querySelectorAll('input, select, textarea').forEach(el => {
            el.addEventListener('input', () => {
                if (el.name === 'phone') {
                    el.value = el.value.replace(/\D/g, '');
                }
                el.classList.remove('error');
                if (errorDiv.style.display === 'block') {
                    const errors = validateForm(form);
                    errorDiv.textContent = errors.join(' ');
                    if (errors.length === 0) errorDiv.style.display = 'none';
                }
            });
        });
    });

})();

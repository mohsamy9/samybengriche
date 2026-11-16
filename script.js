(() => {
    'use strict';

    const root = document.documentElement;
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    /* ---------- Thème ---------- */
    const themeToggle = $('#themeToggle');
    if (themeToggle) {
        const isDark = () => {
            const set = root.getAttribute('data-theme');
            if (set) return set === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        };
        const sync = () => themeToggle.setAttribute('aria-label', isDark() ? 'Passer en thème clair' : 'Passer en thème sombre');
        sync();
        themeToggle.addEventListener('click', () => {
            const next = isDark() ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
            sync();
        });
    }

    /* ---------- Header & menu mobile ---------- */
    const header = $('#header');
    const nav = $('#nav');
    const menuBtn = $('#menuToggle');

    const setMenu = (open) => {
        if (!nav || !menuBtn) return;
        nav.classList.toggle('is-open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
        document.body.classList.toggle('menu-open', open);
    };

    if (menuBtn) {
        menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
        $$('a', nav).forEach((a) => a.addEventListener('click', () => setMenu(false)));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                setMenu(false);
                menuBtn.focus();
            }
        });
        window.matchMedia('(min-width: 821px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
    }

    if (header) {
        const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ---------- Lien actif ---------- */
    const navLinks = $$('.nav a[href^="#"]');
    const sections = navLinks
        .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((a) => {
                    const active = a.getAttribute('href') === '#' + entry.target.id;
                    a.classList.toggle('is-active', active);
                    if (active) a.setAttribute('aria-current', 'true');
                    else a.removeAttribute('aria-current');
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach((s) => spy.observe(s));
    }

    /* ---------- Apparition au scroll ---------- */
    const reveals = $$('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
        reveals.forEach((el) => io.observe(el));
    } else {
        reveals.forEach((el) => el.classList.add('is-visible'));
    }

    /* ---------- Modale projets ---------- */
    const modal = $('#projectModal');
    if (modal && typeof modal.showModal === 'function') {
        const mImg = $('#modalImage', modal);
        const mTitle = $('#modalTitle', modal);
        const mContent = $('#modalContent', modal);
        const mTags = $('#modalTags', modal);
        let lastTrigger = null;

        const openProject = (card, trigger) => {
            mImg.src = $('img', card).src;
            mTitle.textContent = $('.project-title', card).textContent;
            mContent.innerHTML = $('.project-more', card).innerHTML;
            mTags.innerHTML = $('.project-tags', card).innerHTML;
            lastTrigger = trigger;
            modal.showModal();
            modal.scrollTop = 0;
            document.body.classList.add('modal-open');
        };

        $$('.project').forEach((card) => {
            const btn = $('.project-open', card);
            btn.addEventListener('click', () => openProject(card, btn));
        });

        $('.modal-close', modal).addEventListener('click', () => modal.close());
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
        modal.addEventListener('close', () => {
            document.body.classList.remove('modal-open');
            if (lastTrigger) lastTrigger.focus();
        });
    } else {
        // Navigateurs sans <dialog> : afficher le détail directement dans la carte
        $$('.project-more').forEach((el) => { el.hidden = false; el.classList.add('project-more-inline'); });
    }

    /* ---------- Année ---------- */
    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    /* ---------- Formulaire (Formspree) ---------- */
    const form = $('#contactForm');
    if (!form) return;

    const fields = {
        name: { el: $('#name'), check: (v) => v.trim().length >= 2, msg: 'Indiquez votre nom (2 caractères minimum).' },
        email: { el: $('#email'), check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Adresse email invalide.' },
        message: { el: $('#message'), check: (v) => v.trim().length >= 10, msg: 'Votre message doit contenir au moins 10 caractères.' }
    };
    const consent = $('#consent');
    const submitBtn = $('#submitBtn');
    const status = $('#formStatus');

    const setError = (id, el, msg) => {
        const out = $('#error-' + id);
        if (out) out.textContent = msg || '';
        if (el) {
            el.classList.toggle('is-invalid', Boolean(msg));
            el.setAttribute('aria-invalid', msg ? 'true' : 'false');
        }
    };

    const validate = () => {
        let firstInvalid = null;
        Object.entries(fields).forEach(([id, f]) => {
            const ok = f.check(f.el.value);
            setError(id, f.el, ok ? '' : f.msg);
            if (!ok && !firstInvalid) firstInvalid = f.el;
        });
        if (!consent.checked) {
            setError('consent', null, 'Merci de cocher cette case pour envoyer votre message.');
            if (!firstInvalid) firstInvalid = consent;
        } else {
            setError('consent', null, '');
        }
        if (firstInvalid) firstInvalid.focus();
        return !firstInvalid;
    };

    Object.entries(fields).forEach(([id, f]) => {
        f.el.addEventListener('input', () => {
            if (f.el.classList.contains('is-invalid') && f.check(f.el.value)) setError(id, f.el, '');
        });
    });
    consent.addEventListener('change', () => { if (consent.checked) setError('consent', null, ''); });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        status.textContent = '';
        status.className = 'form-status';

        if ($('#website').value !== '') return;
        if (!validate()) return;

        $('#replyto-hidden').value = fields.email.el.value.trim();
        submitBtn.classList.add('is-loading');
        submitBtn.disabled = true;

        try {
            const data = new FormData(form);
            data.delete('consent');
            const res = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' }
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.errors ? body.errors.map((x) => x.message).join(', ') : 'Une erreur est survenue. Veuillez réessayer.');
            }
            status.textContent = 'Message envoyé, merci.';
            status.classList.add('is-ok');
            form.reset();
            window.location.href = 'thank-you.html';
        } catch (err) {
            status.textContent = (err && err.message) || 'Erreur réseau. Réessayez plus tard ou écrivez-moi directement par email.';
            status.classList.add('is-error');
            submitBtn.classList.remove('is-loading');
            submitBtn.disabled = false;
        }
    });
})();

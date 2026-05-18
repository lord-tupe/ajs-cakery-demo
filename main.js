// ========== DOM READY ==========
document.addEventListener('DOMContentLoaded', () => {
    // ---------- PRODUCTS DATA (MWK pricing) ----------
    const products = [
        { id: 1, name: 'Strawberry Dream', category: 'classic', price: 2500, desc: 'Fresh strawberry frosting with cherry', img: 'assets/product1.jpg', badge: 'Popular' },
        { id: 2, name: 'Chocolate Bliss', category: 'premium', price: 3500, desc: 'Belgian chocolate & gold crumbles', img: 'assets/product2.jpg', badge: 'Premium' },
        { id: 3, name: 'Blueberry Vanilla', category: 'classic', price: 2200, desc: 'Creamy vanilla & fresh blueberries', img: 'assets/product3.jpg' },
        { id: 4, name: 'Red Velvet', category: 'premium', price: 3200, desc: 'Cream cheese frosting & crumbs', img: 'assets/product4.jpg', badge: 'Best Seller' },
        { id: 5, name: 'Lemon Zest', category: 'seasonal', price: 2800, desc: 'Tangy lemon curd & meringue', img: 'assets/product5.jpg' },
        { id: 6, name: 'Passion Fruit', category: 'seasonal', price: 3000, desc: 'Tropical passion fruit buttercream', img: 'assets/product6.jpg' },
        { id: 7, name: 'Salted Caramel', category: 'premium', price: 3800, desc: 'Caramel drizzle & sea salt', img: 'assets/product7.jpg' },
        { id: 8, name: 'Classic Vanilla', category: 'classic', price: 2000, desc: 'Madagascar vanilla bean', img: 'assets/product8.jpg' }
    ];

    // ---------- RENDER PRODUCTS ----------
    const productsGrid = document.getElementById('productsGrid');
    function renderProducts(filter = 'all') {
        productsGrid.innerHTML = '';
        const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
        filtered.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card fade-in';
            card.innerHTML = `
                <div class="product-card__image">
                    <img src="${p.img}" alt="${p.name}">
                    ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
                </div>
                <div class="product-card__body">
                    <div class="product-card__category">${p.category}</div>
                    <h3 class="product-card__name">${p.name}</h3>
                    <p class="product-card__desc">${p.desc}</p>
                    <div class="product-card__footer">
                        <span class="product-card__price">K ${p.price.toLocaleString()}</span>
                    </div>
                    <button class="product-card__add" data-id="${p.id}">
                        <i class="fa-solid fa-plus"></i> Add to Cart
                    </button>
                </div>
            `;
            productsGrid.appendChild(card);
        });
        attachAddToCartListeners();
    }

    // ---------- ADD TO CART + TOAST ----------
    let cartCount = 3;
    const cartBadge = document.getElementById('cartBadge');

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('visible'));
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 400);
        }, 2200);
    }

    function attachAddToCartListeners() {
        document.querySelectorAll('.product-card__add').forEach(btn => {
            btn.addEventListener('click', function() {
                cartCount++;
                cartBadge.textContent = cartCount;
                cartBadge.style.transform = 'scale(1.4)';
                setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
                this.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
                this.style.background = 'var(--color-accent)';
                this.style.color = '#0D0D0D';
                setTimeout(() => {
                    this.innerHTML = '<i class="fa-solid fa-plus"></i> Add to Cart';
                    this.style.background = '';
                    this.style.color = '';
                }, 1500);
                showToast('Added to cart!');
            });
        });
    }

    // ---------- FILTER SYSTEM ----------
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter);
        });
    });

    // ---------- COUNTDOWN TIMER (real future date) ----------
    function updateCountdown() {
        const now = new Date();
        const end = new Date();
        end.setDate(now.getDate() + 2);
        end.setHours(23, 59, 59, 999);
        const diff = end - now;
        if (diff <= 0) return;
        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor((diff % (86400000)) / (3600000));
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById('days').textContent = String(d).padStart(2,'0');
        document.getElementById('hours').textContent = String(h).padStart(2,'0');
        document.getElementById('minutes').textContent = String(m).padStart(2,'0');
        document.getElementById('seconds').textContent = String(s).padStart(2,'0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ---------- NAVIGATION SCROLL EFFECTS ----------
    const nav = document.getElementById('nav');
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
        if (window.scrollY > 500) backToTopBtn.classList.add('visible');
        else backToTopBtn.classList.remove('visible');
    });
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // ---------- MOBILE MENU ----------
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    document.querySelectorAll('.mobile-menu__link, .mobile-menu .btn').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ---------- ACTIVE NAV LINK HIGHLIGHT ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });

    // ---------- INTERSECTION OBSERVER FOR FADE-IN ----------
    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => observer.observe(el));

    // ---------- NEWSLETTER FORM ----------
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        const btn = this.querySelector('button');
        const original = btn.textContent;
        btn.textContent = '✓ Subscribed!';
        btn.style.background = '#4CAF50';
        input.value = '';
        setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
        }, 3000);
        showToast('Subscribed successfully!');
    });

    // ---------- INITIAL RENDER ----------
    renderProducts();
});
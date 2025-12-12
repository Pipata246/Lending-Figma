// Прелоадер
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});

// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Интерактивные точки слайдера
const dots = document.querySelectorAll('.dot');
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');

const slides = [
    {
        title: 'Lessons and insights<br><span class="highlight">from 8 years</span>',
        subtitle: 'Where to grow your business as a photographer: site or social media?'
    },
    {
        title: 'Manage your entire<br><span class="highlight">community</span>',
        subtitle: 'Build and manage your community with our powerful tools and features.'
    },
    {
        title: 'The unseen of spending<br><span class="highlight">three years</span>',
        subtitle: 'Discover insights and lessons learned from three years of community building.'
    }
];

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Удаляем активный класс у всех точек
        dots.forEach(d => d.classList.remove('active'));
        // Добавляем активный класс к текущей точке
        dot.classList.add('active');
        
        // Обновляем контент с анимацией
        heroTitle.style.opacity = '0';
        heroSubtitle.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.innerHTML = slides[index].title;
            heroSubtitle.textContent = slides[index].subtitle;
            heroTitle.style.opacity = '1';
            heroSubtitle.style.opacity = '1';
        }, 200);
    });
});

// Автоматическая смена слайдов
let currentSlide = 0;
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    dots[currentSlide].click();
}, 5000);

// Анимация появления элементов при скролле - ПОСТОЯННАЯ РАБОТА
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Элемент появился в области видимости - показываем
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate-in');
        } else {
            // Элемент ушел из области видимости - скрываем для повторной анимации
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            entry.target.classList.remove('animate-in');
        }
    });
}, observerOptions);

// Применяем анимацию к элементам
document.addEventListener('DOMContentLoaded', () => {
    // Анимация для карточек сообщества
    const communityCards = document.querySelectorAll('.community-card');
    communityCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Анимация для логотипов клиентов - с постоянной работой
    const clientLogos = document.querySelectorAll('.client-logo');
    
    // Создаем отдельный observer для логотипов с другой логикой
    const logoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            } else {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'scale(0.8)';
            }
        });
    }, observerOptions);
    
    clientLogos.forEach((logo, index) => {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.8)';
        logo.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
        logoObserver.observe(logo);
    });
    
    // Анимация для секций
    const sections = document.querySelectorAll('.section-header');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Анимация для статистики
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });
    
    // Анимация для блог-карточек
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`;
        observer.observe(card);
    });
    
    // Анимация для текстовых блоков
    const textBlocks = document.querySelectorAll('.unlock-text, .achievements-text, .design-text, .tesla-text');
    textBlocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateX(-40px)';
        block.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(block);
    });
    
    // Анимация для иллюстраций
    const illustrations = document.querySelectorAll('.unlock-image, .design-image, .tesla-image');
    illustrations.forEach(illustration => {
        illustration.style.opacity = '0';
        illustration.style.transform = 'translateX(40px)';
        illustration.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(illustration);
    });
    
    // Анимация для CTA секции
    const ctaContent = document.querySelector('.cta-content');
    if (ctaContent) {
        ctaContent.style.opacity = '0';
        ctaContent.style.transform = 'scale(0.9)';
        ctaContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(ctaContent);
    }
});

// Активная ссылка в навигации при скролле
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Индикатор прогресса скролла
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Hover эффекты для кнопок
document.querySelectorAll('.get-demo-btn, .register-button, .learn-more-btn, .register-btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 8px 25px rgba(76, 175, 80, 0.3)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});

// Параллакс эффект для иллюстрации
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const illustration = document.querySelector('.hero-illustration');
    
    if (illustration && scrolled < window.innerHeight) {
        const speed = scrolled * 0.05;
        illustration.style.transform = `translateY(${speed}px)`;
    }
});

// Анимация кода в экране компьютера
function animateCode() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.width = Math.random() * 40 + 60 + '%';
        }, index * 500);
    });
}

// Запускаем анимацию кода каждые 3 секунды
setInterval(animateCode, 3000);

// Анимация счетчиков статистики
function animateCounters() {
    const counters = document.querySelectorAll('.stat-info h3');
    const targets = ['2,245,341', '46,328', '828,867', '1,926,436'];
    
    counters.forEach((counter, index) => {
        if (targets[index]) {
            let current = 0;
            const target = parseInt(targets[index].replace(/,/g, ''));
            const increment = target / 100;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current).toLocaleString();
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = targets[index];
                }
            };
            
            updateCounter();
        }
    });
}

// Создаем observer для счетчиков
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, { threshold: 0.5 });

// Наблюдаем за секцией достижений
document.addEventListener('DOMContentLoaded', () => {
    const achievementsSection = document.querySelector('.achievements');
    if (achievementsSection) {
        counterObserver.observe(achievementsSection);
    }
});

// Добавляем стили для активной ссылки и анимаций
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: #4CAF50;
        font-weight: 600;
    }
    
    .hero-title,
    .hero-subtitle {
        transition: opacity 0.3s ease;
    }
    
    /* Дополнительные анимации */
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Пульсация для кнопок */
    .register-btn:hover,
    .register-button:hover,
    .learn-more-btn:hover,
    .get-demo-btn:hover {
        animation: pulse 0.6s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    /* Анимация для иллюстраций */
    .hero-illustration,
    .unlock-illustration,
    .design-illustration {
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    /* Анимация для карточек при наведении */
    .community-card:hover,
    .blog-card:hover {
        animation: cardHover 0.3s ease forwards;
    }
    
    @keyframes cardHover {
        from { transform: translateY(0); }
        to { transform: translateY(-8px); }
    }
    
    /* Прогресс бар скролла */
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #4CAF50, #81C784);
        z-index: 9999;
        transition: width 0.3s ease;
    }
`;
document.head.appendChild(style);

// Постоянная анимация плавающих элементов
function animateFloatingElements() {
    const rocket = document.querySelector('.float-element.rocket');
    const gears = document.querySelector('.float-element.gears');
    
    if (rocket) {
        rocket.style.animation = 'float 4s ease-in-out infinite';
    }
    
    if (gears) {
        gears.style.animation = 'rotate 8s linear infinite';
    }
    
    // Анимация для персонажа
    const character = document.querySelector('.character');
    if (character) {
        character.style.animation = 'characterBob 3s ease-in-out infinite';
    }
}

// Добавляем стили для новых анимаций
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes characterBob {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }
    
    @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Анимация для листьев */
    .leaf {
        animation: leafFloat 4s ease-in-out infinite;
    }
    
    .leaf-1 { animation-delay: 0s; }
    .leaf-2 { animation-delay: 1.3s; }
    .leaf-3 { animation-delay: 2.6s; }
    
    @keyframes leafFloat {
        0%, 100% { 
            transform: rotate(45deg) translateY(0px); 
            opacity: 0.6;
        }
        50% { 
            transform: rotate(45deg) translateY(-8px); 
            opacity: 0.8;
        }
    }
    
    /* Анимация для зеленых элементов в экране */
    .green-item {
        animation: codeGlow 2s ease-in-out infinite alternate;
    }
    
    @keyframes codeGlow {
        from { opacity: 0.8; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(additionalStyles);

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Запускаем анимацию кода
    setTimeout(animateCode, 2000);
    
    // Запускаем постоянные анимации
    animateFloatingElements();
    
    // Добавляем эффект печатания для заголовка
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            setTimeout(() => {
                heroTitle.style.opacity = '1';
            }, 500);
        }
    }, 1500);
});

console.log('🚀 JustGo website loaded successfully!');
console.log('✨ All animations and interactions are ready!');
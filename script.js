document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------
       NAVBAR — scroll effect
    ---------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    /* ----------------------------------------------------------
       MOBILE DRAWER
    ---------------------------------------------------------- */
    const hamburger     = document.getElementById('hamburger');
    const mobileDrawer  = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');

    function openDrawer() {
        hamburger.classList.add('open');
        mobileDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        hamburger.classList.remove('open');
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        mobileDrawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });

    drawerOverlay.addEventListener('click', closeDrawer);

    // Close drawer when any link inside it is clicked
    mobileDrawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

    /* ----------------------------------------------------------
       HERO SLIDER
    ---------------------------------------------------------- */
    const slides    = document.querySelectorAll('.hero-slide');
    const dots      = document.querySelectorAll('.dot');
    const prevBtn   = document.getElementById('heroPrev');
    const nextBtn   = document.getElementById('heroNext');
    let current     = 0;
    let autoTimer;

    function goTo(index) {
        if (slides.length <= 1) return;
        slides[current].classList.remove('active');
        if (dots[current]) dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
    }

    function startAuto() {
        if (slides.length <= 1) return;
        clearInterval(autoTimer);
        autoTimer = setInterval(() => goTo(current + 1), 5000);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
    dots.forEach(dot => dot.addEventListener('click', () => {
        goTo(Number(dot.dataset.index));
        startAuto();
    }));

    if (slides.length > 1) {
        startAuto();
    }

    /* ----------------------------------------------------------
       COURSE FILTER TABS
    ---------------------------------------------------------- */
    const filterTabs  = document.querySelectorAll('.filter-tab');
    const courseCards = document.querySelectorAll('.course-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;
            courseCards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.style.display = match ? 'flex' : 'none';
            });
        });
    });

    /* ----------------------------------------------------------
       SCROLL REVEAL — simple intersection observer
    ---------------------------------------------------------- */
    const revealEls = document.querySelectorAll(
        '.course-card, .benefit-card, .stat-card, .testimonial-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

});

/* ----------------------------------------------------------
   COURSE MODAL LOGIC
---------------------------------------------------------- */
const courseData = {
    1: {
        title: "Técnico em Enfermagem",
        desc: "O curso Técnico em Enfermagem da Salute forma profissionais capacitados para atuar na promoção, prevenção, recuperação e reabilitação da saúde. Com aulas práticas em laboratórios modernos e estágio garantido.",
        features: ["Estágio em Hospitais Parceiros", "Laboratórios de Ponta", "Diploma Reconhecido pelo MEC", "Foco em Humanização"]
    },
    2: {
        title: "Técnico em Radiologia",
        desc: "Capacite-se para operar equipamentos de diagnóstico por imagem. O curso abrange desde radiologia convencional até tomografia e ressonância magnética, preparando você para o mercado tecnológico da saúde.",
        features: ["Treinamento com Equipamentos Reais", "Proteção Radiológica", "Mercado em Expansão", "Aulas com Especialistas"]
    },
    3: {
        title: "Técnico em Estética",
        desc: "Torne-se um especialista em cuidados faciais e corporais. Aprenda as técnicas mais modernas de limpeza de pele, massagens, depilação e protocolos de rejuvenescimento.",
        features: ["Prática Profissionalizante", "Gestão de Clínicas de Estética", "Produtos de Alta Qualidade", "Certificação Rápida"]
    },
    4: {
        title: "Auxiliar de Farmácia",
        desc: "Aprenda a rotina de uma farmácia, desde o atendimento ao cliente até a organização de estoque e leitura de receituário médico. Ideal para quem busca rápida inserção no mercado.",
        features: ["Leitura de Receitas", "Controle de Estoque", "Atendimento de Excelência", "Farmacologia Básica"]
    },
    5: {
        title: "Segurança do Trabalho",
        desc: "Desenvolva habilidades para prevenir acidentes e doenças ocupacionais. Aprenda a elaborar planos de prevenção e garantir um ambiente de trabalho seguro e produtivo.",
        features: ["Normas Regulamentadoras (NRs)", "Inspeção de Segurança", "Prevenção de Incêndios", "Consultoria Empresarial"]
    },
    6: {
        title: "Cuidador de Idosos",
        desc: "Um curso voltado para o cuidado humanizado da terceira idade. Aprenda sobre higiene, alimentação, medicação e o suporte emocional necessário para garantir qualidade de vida aos idosos.",
        features: ["Cuidado Humanizado", "Noções de Primeiros Socorros", "Nutrição na Terceira Idade", "Ética Profissional"]
    },
    7: {
        title: "Administração em Saúde",
        desc: "Aprenda a gerir processos administrativos em clínicas e hospitais. Foco em faturamento hospitalar, recepção, gestão de arquivos e atendimento ao público na área da saúde.",
        features: ["Faturamento Hospitalar", "Gestão de Pessoas", "Sistemas de Gestão", "Ética Administrativa"]
    },
    8: {
        title: "Análises Clínicas",
        desc: "Capacite-se para realizar coletas de materiais biológicos e exames laboratoriais de rotina. Auxilie no diagnóstico médico com precisão técnica e segurança.",
        features: ["Técnicas de Coleta", "Microbiologia Básica", "Hematologia", "Segurança Laboratorial"]
    },
    9: {
        title: "Atendimento Pré-Hospitalar (APH)",
        desc: "Curso intensivo para situações de emergência. Aprenda manobras de ressuscitação, imobilização e primeiros socorros avançados para salvar vidas em ambientes críticos.",
        features: ["Atendimento de Trauma", "Protocolos de Emergência", "Salvamento Terrestre", "Certificação de Salvatagem"]
    }
};

function openCourseModal(id) {
    const modal = document.getElementById('courseModal');
    const modalBody = document.getElementById('modalBody');
    const data = courseData[id];

    if (!data) return;

    modalBody.innerHTML = `
        <div class="modal-body-header">
            <h2>${data.title}</h2>
        </div>
        <div class="modal-body-content">
            <p>${data.desc}</p>
            <div class="modal-body-features">
                ${data.features.map(f => `<div><i class="ri-checkbox-circle-line"></i> ${f}</div>`).join('')}
            </div>
        </div>
        <div class="modal-body-footer">
            <a href="https://wa.me/5500000000000?text=Olá, gostaria de mais informações sobre o curso de ${data.title}" class="modal-btn-cta">QUERO ME INSCREVER</a>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Evita scroll ao abrir modal
}

function closeCourseModal() {
    const modal = document.getElementById('courseModal');
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Devolve scroll
}

window.onclick = function(event) {
    const modal = document.getElementById('courseModal');
    if (event.target == modal) {
        closeCourseModal();
    }
}


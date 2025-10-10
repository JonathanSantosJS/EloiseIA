// script.js - VERSÃO PREMIUM
document.addEventListener('DOMContentLoaded', function() {
    // Efeito de digitação para o nome
    function typeWriterEffect() {
        const nameElement = document.querySelector('.name');
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    }

    // Inicializar efeitos visuais
    function initializePremiumEffects() {
        // Adicionar classe loaded para animações
        document.body.classList.add('loaded');
        
        // Efeito de parallax sutil no fundo
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.profile-card, .links-card');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Intersection Observer para animações sob demanda
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observar todos os cards
        document.querySelectorAll('.profile-card, .links-card, .socials-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Função premium para abrir links
    function openLink(url) {
        // Efeito visual antes de abrir
        const button = event.currentTarget;
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        // Analytics premium
        const linkData = {
            url: url,
            timestamp: new Date().toISOString(),
            element: button.textContent.trim()
        };
        
        console.log('🔗 Link premium clicado:', linkData);
        
        // Salvar no localStorage para analytics
        saveClickAnalytics(linkData);
        
        // Abrir link
        setTimeout(() => {
            window.open(url, '_blank', 'noopener,noreferrer');
        }, 200);
    }

    // Sistema de analytics simples
    function saveClickAnalytics(data) {
        const analytics = JSON.parse(localStorage.getItem('eloise_analytics') || '[]');
        analytics.push(data);
        localStorage.setItem('eloise_analytics', JSON.stringify(analytics.slice(-100))); // Manter últimos 100 clicks
    }

    // Função premium para copiar link
    function copyToClipboard(text) {
        const copyButton = document.querySelector('.copy-button');
        const originalHTML = copyButton.innerHTML;
        
        // Efeito visual
        copyButton.style.transform = 'scale(0.95)';
        copyButton.classList.add('copied');
        
        navigator.clipboard.writeText(text).then(() => {
            // Feedback visual premium
            copyButton.innerHTML = '✅ <span>Copiado!</span>';
            copyButton.style.background = 'linear-gradient(135deg, #48BB78, #38A169)';
            copyButton.style.borderColor = '#48BB78';
            copyButton.style.color = 'white';
            
            // Notificação sutil
            showNotification('Link copiado para a área de transferência!');
            
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            copyButton.innerHTML = '❌ <span>Erro ao copiar</span>';
        });

        // Restaurar estado original
        setTimeout(() => {
            copyButton.style.transform = '';
            copyButton.classList.remove('copied');
            copyButton.innerHTML = originalHTML;
            copyButton.style.background = '';
            copyButton.style.borderColor = '';
            copyButton.style.color = '';
        }, 2000);
    }

    // Sistema de notificações premium
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'premium-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✨</span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary-60), var(--accent-10));
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transform: translateX(400px);
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            z-index: 1000;
            max-width: 300px;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.2);
        `;
        
        document.body.appendChild(notification);
        
        // Animação de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }, 3000);
    }

    // Contador de cliques sociais
    function setupSocialAnalytics() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const platform = this.querySelector('svg').parentNode.textContent.trim();
                const socialData = {
                    platform: platform,
                    url: this.href,
                    timestamp: new Date().toISOString()
                };
                
                console.log('📱 Social click:', socialData);
                saveClickAnalytics(socialData);
                
                // Analytics para redes sociais
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'social_click', {
                        event_category: 'social',
                        event_label: platform,
                        transport_type: 'beacon'
                    });
                }
            });
        });
    }

    // Sistema de tema automático
    function setupAutoTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const hour = new Date().getHours();
        const isNight = hour > 18 || hour < 6;
        
        if (prefersDark || isNight) {
            document.body.classList.add('auto-dark');
        }
    }

    // Efeitos de hover avançados
    function setupAdvancedHoverEffects() {
        const cards = document.querySelectorAll('.profile-card, .links-card, .socials-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleY = (x - centerX) / 25;
                const angleX = (centerY - y) / 25;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    // Inicializar todas as funcionalidades premium
    function initializeAll() {
        typeWriterEffect();
        initializePremiumEffects();
        setupSocialAnalytics();
        setupAutoTheme();
        setupAdvancedHoverEffects();
        
        // Event listeners premium
        const linkButtons = document.querySelectorAll('[data-link]');
        linkButtons.forEach(button => {
            button.addEventListener('click', function() {
                const url = this.getAttribute('data-link');
                openLink(url);
            });
        });

        const copyButton = document.querySelector('[data-copy]');
        if (copyButton) {
            copyButton.addEventListener('click', function() {
                const url = this.getAttribute('data-copy');
                copyToClipboard(url);
            });
        }

        // Melhorar acessibilidade
        const focusableElements = document.querySelectorAll('button, a, [tabindex]');
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '3px solid var(--primary-60)';
                this.style.outlineOffset = '3px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }

    // Iniciar tudo quando o DOM estiver pronto
    initializeAll();
});
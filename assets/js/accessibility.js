(() => {
    const root = document.documentElement;
    const fontScales = [1.125, 1.35, 1.575, 1.8, 2.25];
    const storageKey = 'lise-accessibility';
    const controls = document.createElement('div');
    controls.className = 'accessibility-controls';
    controls.dataset.accessibilityControls = '';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', 'Opções de acessibilidade visual');

    const fontButton = document.createElement('button');
    fontButton.type = 'button';
    fontButton.textContent = 'A+';

    const themeButton = document.createElement('button');
    themeButton.type = 'button';

    controls.append(fontButton, themeButton);

    const fitFlashcardContent = () => {
        const card = document.getElementById('flashcard-card');
        if (!card) return;

        const faces = card.querySelectorAll(':scope > .card-inner > div');
        if (faces.length === 0) return;

        card.style.height = '';
        const contentHeight = Math.max(...Array.from(faces, face => face.scrollHeight));
        if (contentHeight > 380) {
            card.style.height = `${contentHeight + 16}px`;
        }
    };

    const initialize = () => {
        document.body.append(controls);

        let preferences = {};
        try {
            const storedPreferences = JSON.parse(localStorage.getItem(storageKey) || '{}');
            if (storedPreferences && typeof storedPreferences === 'object') {
                preferences = storedPreferences;
            }
        } catch (error) {
            console.warn('Não foi possível carregar as preferências de acessibilidade.', error);
        }

        let scaleIndex = fontScales.indexOf(preferences.fontScale);
        if (scaleIndex < 0) scaleIndex = 0;

        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
        let isDark = typeof preferences.dark === 'boolean' ? preferences.dark : prefersDark;

        const savePreferences = () => {
            try {
                localStorage.setItem(storageKey, JSON.stringify({
                    fontScale: fontScales[scaleIndex],
                    dark: isDark
                }));
            } catch (error) {
                console.warn('Não foi possível salvar as preferências de acessibilidade.', error);
            }
        };

        const applyFontScale = () => {
            const scale = fontScales[scaleIndex];
            root.style.setProperty('--a11y-font-scale', scale);
            const nextScale = fontScales[(scaleIndex + 1) % fontScales.length];
            const currentPercent = Math.round((scale / fontScales[0]) * 100);
            const nextPercent = Math.round((nextScale / fontScales[0]) * 100);
            fontButton.setAttribute(
                'aria-label',
                `Aumentar texto: ${currentPercent}%. Próximo tamanho: ${nextPercent}%.`
            );
            fontButton.title = `Texto em ${currentPercent}%; clique para ${nextPercent}%`;
            fitFlashcardContent();
        };

        const applyTheme = () => {
            root.dataset.theme = isDark ? 'dark' : 'light';
            themeButton.textContent = isDark ? 'Claro' : 'Escuro';
            themeButton.setAttribute('aria-pressed', String(isDark));
            themeButton.setAttribute(
                'aria-label',
                isDark ? 'Ativar modo claro' : 'Ativar modo escuro'
            );
            themeButton.title = isDark ? 'Ativar modo claro' : 'Ativar modo escuro';
        };

        const registerText = container => {
            const elements = new Set();
            const addIfText = element => {
                if (
                    !element ||
                    element.closest('[data-accessibility-controls]') ||
                    element.matches('script, style, svg, noscript')
                ) return;

                if (Array.from(element.childNodes).some(
                    node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
                )) {
                    elements.add(element);
                }
            };

            if (container.nodeType === Node.ELEMENT_NODE) addIfText(container);
            const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
                acceptNode: node => node.textContent.trim()
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT
            });
            while (walker.nextNode()) addIfText(walker.currentNode.parentElement);

            if (container.querySelectorAll) {
                container.querySelectorAll('input, textarea, select').forEach(element => {
                    if (!element.closest('[data-accessibility-controls]')) elements.add(element);
                });
            }

            if (elements.size === 0) return;

            const previousScale = root.style.getPropertyValue('--a11y-font-scale');
            root.style.setProperty('--a11y-font-scale', '1');
            elements.forEach(element => {
                if (element.hasAttribute('data-a11y-scaled')) return;
                const computedStyle = getComputedStyle(element);
                const baseFontSize = parseFloat(computedStyle.fontSize);
                const baseLineHeight = parseFloat(computedStyle.lineHeight);
                element.style.setProperty('--a11y-base-font-size', `${baseFontSize}px`);
                element.style.setProperty(
                    '--a11y-line-height-ratio',
                    Number.isFinite(baseLineHeight) && baseFontSize > 0
                        ? baseLineHeight / baseFontSize
                        : 1.5
                );
                if (element.closest('header')) {
                    element.style.setProperty('--a11y-local-scale', fontScales[0]);
                }
                element.setAttribute('data-a11y-scaled', '');
            });
            root.style.setProperty('--a11y-font-scale', previousScale || fontScales[0]);
        };

        applyFontScale();
        applyTheme();
        registerText(document.body);
        fitFlashcardContent();

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'characterData') {
                    registerText(mutation.target.parentElement);
                    return;
                }
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                        registerText(node.nodeType === Node.TEXT_NODE ? node.parentElement : node);
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true, characterData: true, subtree: true });

        fontButton.addEventListener('click', () => {
            scaleIndex = (scaleIndex + 1) % fontScales.length;
            applyFontScale();
            savePreferences();
        });

        themeButton.addEventListener('click', () => {
            isDark = !isDark;
            applyTheme();
            savePreferences();
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize, { once: true });
    } else {
        initialize();
    }
})();

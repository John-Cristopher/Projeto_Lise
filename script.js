/**
 * Script da Landing Page Profissional — Lise
 */

// Dados de Combinações de Termos do Simulador Etimológico
const combinations = {
    'glico-lise': 'Glicólise: Quebra catalisada por enzimas da molécula de glicose, levando à formação de ácido pirúvico e à geração de ATP.',
    'glico-genese': 'Glicogênese: Processo bioquímico no qual moléculas de glicose são sintetizadas para formar cadeias complexas de glicogênio.',
    'cito-lise': 'Citólise: Processo de rompimento físico ou dissolução da membrana plasmática celular, ocasionando a liberação de seu conteúdo.',
    'cito-logia': 'Citologia: Ramo da biologia que estuda a morfologia, desenvolvimento, propriedades fisiológicas e interações das células.',
    'hemato-logia': 'Hematologia: Especialidade científica encarregada de analisar o sangue, as células sanguíneas e as disfunções associadas.',
    'lipo-lise': 'Lipólise: Decomposição biológica de lipídios (gorduras) armazenados no organismo em ácidos graxos livres e glicerol.',
    'lipo-genese': 'Lipogênese: Processo metabólico de formação de lipídios ou gorduras a partir de açúcares ou carboidratos digeridos.'
};

let selectedPrefix = '';
let selectedPrefixLabel = '';
let selectedSuffix = '';
let selectedSuffixLabel = '';

document.addEventListener('DOMContentLoaded', () => {

    // 1. Inicialização do Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    initLiquidHoverButtons();

    // 2. Inicialização do Objeto 3D da Marca (somente na seção "Jornada")
    initLiseMolecule('lise-3d-jornada');

    // 3. Elementos da Header e Navegação
    const cabecalhoPrincipal = document.getElementById('cabecalho-principal');
    const btnMenu = document.getElementById('botao-menu');
    const menuMovel = document.getElementById('menu-movel');

    /**
     * Lógica da Header "Líquida / Descolável" ao Rolar
     */
    function handleScrollHeader() {
        if (!cabecalhoPrincipal) return;

        if (window.scrollY > 20) {
            cabecalhoPrincipal.classList.add('is-scrolled');
        } else {
            cabecalhoPrincipal.classList.remove('is-scrolled');
        }
    }

    window.addEventListener('scroll', handleScrollHeader, { passive: true });
    handleScrollHeader(); // Execução inicial ao carregar a página

    /**
     * Menu Mobile Toggle
     */
    if (btnMenu && menuMovel) {
        btnMenu.addEventListener('click', () => {
            menuMovel.classList.toggle('hidden');
            menuMovel.classList.toggle('flex');
        });

        const linksMoveis = menuMovel.querySelectorAll('a');
        linksMoveis.forEach(link => {
            link.addEventListener('click', () => {
                menuMovel.classList.add('hidden');
                menuMovel.classList.remove('flex');
            });
        });
    }

    /**
     * Animação de Giro do Flashcard (Hero)
     */
    const flashcard = document.getElementById('flashcard-card');
    if (flashcard) {
        flashcard.addEventListener('click', () => {
            const innerCard = flashcard.querySelector('.card-inner');
            if (innerCard) {
                innerCard.classList.toggle('rotate-y-180');
            }
        });
    }

    console.log("Interface do projeto Lise e animações carregadas com sucesso.");
});

/**
 * Animação líquida nos CTAs principais, baseada na deformação SVG do exemplo.
 */
function initLiquidHoverButtons() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.querySelectorAll('.liquid-hover-button').forEach(button => {
        new LiquidHoverButton(button);
    });
}

class LiquidHoverButton {
    constructor(button) {
        this.button = button;
        this.margin = 18;
        this.gap = 8;
        this.tension = 0.4;
        this.forceFactor = 0.2;
        this.hoverFactor = -0.15;
        this.color1 = button.dataset.color1 || '#4A5D4E';
        this.color2 = button.dataset.color2 || '#5D7462';
        this.color3 = button.dataset.color3 || '#8DAA91';
        this.layers = [
            { points: [], viscosity: 0.5, mouseForce: 100, forceLimit: 2 },
            { points: [], viscosity: 0.8, mouseForce: 150, forceLimit: 3 }
        ];
        this.touches = [];
        this.frame = null;
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.classList.add('liquid-hover-svg');
        this.svg.setAttribute('aria-hidden', 'true');
        this.svg.setAttribute('focusable', 'false');

        const content = document.createElement('span');
        content.className = 'liquid-hover-content';
        while (button.firstChild) content.appendChild(button.firstChild);
        button.append(this.svg, content);

        this.layers.forEach(layer => {
            layer.path = document.createElementNS(this.svg.namespaceURI, 'path');
            this.svg.appendChild(layer.path);
        });

        this.svgDefs = document.createElementNS(this.svg.namespaceURI, 'defs');
        this.svg.appendChild(this.svgDefs);
        this.resize();

        button.addEventListener('pointermove', event => {
            if (event.pointerType === 'touch') return;
            this.setPointer(event.clientX, event.clientY);
            this.animate();
        });
        button.addEventListener('pointerleave', () => {
            this.touches = [];
            this.animate();
        });
        button.addEventListener('focus', () => {
            const rect = button.getBoundingClientRect();
            this.setPointer(rect.left + rect.width / 2, rect.top + rect.height / 2);
            this.animate();
        });
        button.addEventListener('blur', () => {
            this.touches = [];
            this.animate();
        });
        window.addEventListener('resize', () => {
            this.resize();
            this.animate();
        }, { passive: true });

        if ('ResizeObserver' in window) {
            this.resizeObserver = new ResizeObserver(() => this.resize());
            this.resizeObserver.observe(button);
        }
    }

    setPointer(clientX, clientY) {
        const rect = this.button.getBoundingClientRect();
        this.touches = [{
            x: clientX - rect.left + this.margin,
            y: clientY - rect.top + this.margin,
            force: 1
        }];
    }

    resize() {
        const rect = this.button.getBoundingClientRect();
        this.width = Math.max(1, rect.width);
        this.height = Math.max(1, rect.height);
        this.svgWidth = this.width + this.margin * 2;
        this.svgHeight = this.height + this.margin * 2;
        this.svg.setAttribute('width', this.svgWidth);
        this.svg.setAttribute('height', this.svgHeight);
        this.initOrigins();
        this.update();
        this.draw();
    }

    createPoint(x, y) {
        return { x, y, ox: x, oy: y, vx: 0, vy: 0 };
    }

    initOrigins() {
        for (const layer of this.layers) {
            const points = [];
            const radius = Math.floor(this.height / 2);
            for (let x = radius; x < this.width - radius; x += this.gap) {
                points.push(this.createPoint(x + this.margin, this.margin));
            }
            for (let alpha = Math.floor(this.height * 1.25); alpha >= 0; alpha -= this.gap) {
                const angle = Math.PI / Math.floor(this.height * 1.25) * alpha;
                points.push(this.createPoint(
                    Math.sin(angle) * radius + this.margin + this.width - radius,
                    Math.cos(angle) * radius + this.margin + radius
                ));
            }
            for (let x = this.width - radius - 1; x >= radius; x -= this.gap) {
                points.push(this.createPoint(x + this.margin, this.margin + this.height));
            }
            for (let alpha = 0; alpha <= Math.floor(this.height * 1.25); alpha += this.gap) {
                const angle = Math.PI / Math.floor(this.height * 1.25) * alpha;
                points.push(this.createPoint(
                    this.height - Math.sin(angle) * radius + this.margin - radius,
                    Math.cos(angle) * radius + this.margin + radius
                ));
            }
            layer.points = points;
        }
    }

    update() {
        let moving = false;
        for (const layer of this.layers) {
            const points = layer.points;
            for (const point of points) {
                const dx = point.ox - point.x;
                const dy = point.oy - point.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const force = distance * this.forceFactor;
                point.vx += force * (dx / distance || 0);
                point.vy += force * (dy / distance || 0);

                for (const touch of this.touches) {
                    let mouseForce = layer.mouseForce;
                    if (
                        touch.x > this.margin &&
                        touch.x < this.margin + this.width &&
                        touch.y > this.margin &&
                        touch.y < this.margin + this.height
                    ) {
                        mouseForce *= -this.hoverFactor;
                    }
                    const mx = point.x - touch.x;
                    const my = point.y - touch.y;
                    const mouseDistance = Math.sqrt(mx * mx + my * my);
                    const mouseEffect = Math.max(
                        -layer.forceLimit,
                        Math.min(layer.forceLimit, mouseForce * touch.force / mouseDistance)
                    );
                    point.vx += mouseEffect * (mx / mouseDistance || 0);
                    point.vy += mouseEffect * (my / mouseDistance || 0);
                }

                point.vx *= layer.viscosity;
                point.vy *= layer.viscosity;
                point.x += point.vx;
                point.y += point.vy;
                if (
                    Math.abs(point.vx) > 0.08 ||
                    Math.abs(point.vy) > 0.08 ||
                    Math.abs(point.ox - point.x) > 0.2 ||
                    Math.abs(point.oy - point.y) > 0.2
                ) moving = true;
            }

            for (let index = 0; index < points.length; index += 1) {
                const previous = points[(index + points.length - 1) % points.length];
                const point = points[index];
                const next = points[(index + 1) % points.length];
                const lineX = next.x - previous.x;
                const lineY = next.y - previous.y;
                const lineLength = Math.sqrt(lineX * lineX + lineY * lineY) || 1;
                const previousDistance = Math.hypot(point.x - previous.x, point.y - previous.y);
                const nextDistance = Math.hypot(point.x - next.x, point.y - next.y);
                point.cPrev = {
                    x: point.x - lineX / lineLength * previousDistance * this.tension,
                    y: point.y - lineY / lineLength * previousDistance * this.tension
                };
                point.cNext = {
                    x: point.x + lineX / lineLength * nextDistance * this.tension,
                    y: point.y + lineY / lineLength * nextDistance * this.tension
                };
            }
        }
        return moving;
    }

    draw() {
        this.layers.forEach((layer, index) => {
            layer.path.style.fill = index === 0 ? this.color1 : this.color2;
            const points = layer.points;
            if (!points.length) return;
            const commands = [`M ${points[0].x} ${points[0].y}`];
            for (let pointIndex = 0; pointIndex < points.length; pointIndex += 1) {
                const point = points[pointIndex];
                const next = points[(pointIndex + 1) % points.length];
                commands.push(
                    `C ${point.cNext.x} ${point.cNext.y} ${next.cPrev.x} ${next.cPrev.y} ${next.x} ${next.y}`
                );
            }
            commands.push('Z');
            layer.path.setAttribute('d', commands.join(' '));
        });

        if (this.touches.length) {
            let gradient = this.svgDefs.firstElementChild;
            if (!gradient) {
                gradient = document.createElementNS(this.svg.namespaceURI, 'radialGradient');
                gradient.id = `liquid-hover-gradient-${LiquidHoverButton.nextId++}`;
                const innerStop = document.createElementNS(this.svg.namespaceURI, 'stop');
                innerStop.setAttribute('offset', '0%');
                innerStop.setAttribute('stop-color', this.color3);
                const outerStop = document.createElementNS(this.svg.namespaceURI, 'stop');
                outerStop.setAttribute('offset', '100%');
                outerStop.setAttribute('stop-color', this.color2);
                gradient.append(innerStop, outerStop);
                this.svgDefs.appendChild(gradient);
            }
            gradient.setAttribute('cx', this.touches[0].x / this.svgWidth);
            gradient.setAttribute('cy', this.touches[0].y / this.svgHeight);
            gradient.setAttribute('r', '0.8');
            this.layers[1].path.style.fill = `url(#${gradient.id})`;
        }
    }

    animate() {
        if (this.frame !== null) return;
        const step = () => {
            const moving = this.update();
            this.draw();
            if (this.touches.length || moving) {
                this.frame = window.requestAnimationFrame(step);
            } else {
                this.frame = null;
            }
        };
        this.frame = window.requestAnimationFrame(step);
    }
}

LiquidHoverButton.nextId = 1;

/**
 * 4. Funções do Simulador do Decodificador Morfológico
 */
function selectPrefix(prefix, label, evt) {
    selectedPrefix = prefix;
    selectedPrefixLabel = label;

    document.querySelectorAll('.prefix-btn').forEach(btn => {
        btn.classList.remove('border-brand-gold', 'bg-brand-sage/10');
    });

    const targetBtn = evt ? evt.currentTarget : (event ? event.currentTarget : null);
    if (targetBtn) {
        targetBtn.classList.add('border-brand-gold', 'bg-brand-sage/10');
    }

    updateDisplay();
}

function selectSuffix(suffix, label, evt) {
    selectedSuffix = suffix;
    selectedSuffixLabel = label;

    document.querySelectorAll('.suffix-btn').forEach(btn => {
        btn.classList.remove('border-brand-gold', 'bg-brand-sage/10');
    });

    const targetBtn = evt ? evt.currentTarget : (event ? event.currentTarget : null);
    if (targetBtn) {
        targetBtn.classList.add('border-brand-gold', 'bg-brand-sage/10');
    }

    updateDisplay();
}

function updateDisplay() {
    const termDisplay = document.getElementById('term-display');
    const formulaDisplay = document.getElementById('formula-display');
    const definitionDisplay = document.getElementById('definition-display');

    if (!termDisplay || !formulaDisplay || !definitionDisplay) return;

    if (selectedPrefix && !selectedSuffix) {
        termDisplay.innerText = `${selectedPrefix}-...`;
        formulaDisplay.innerText = `${selectedPrefixLabel} + (selecione o sufixo)`;
        definitionDisplay.innerText = "Escolha um sufixo para terminar a combinação.";
    } else if (!selectedPrefix && selectedSuffix) {
        termDisplay.innerText = `...-${selectedSuffix}`;
        formulaDisplay.innerText = `(selecione o prefixo) + ${selectedSuffixLabel}`;
        definitionDisplay.innerText = "Escolha um prefixo para terminar a combinação.";
    } else if (selectedPrefix && selectedSuffix) {
        const fullTerm = `${selectedPrefix}${selectedSuffix}`;
        const key = `${selectedPrefix}-${selectedSuffix}`;

        let formattedTerm = fullTerm;
        if (fullTerm === 'glicolise') formattedTerm = 'Glicólise';
        else if (fullTerm === 'glicogenese') formattedTerm = 'Glicogênese';
        else if (fullTerm === 'citolise') formattedTerm = 'Citólise';
        else if (fullTerm === 'lipolise') formattedTerm = 'Lipólise';
        else if (fullTerm === 'lipogenese') formattedTerm = 'Lipogênese';
        else formattedTerm = fullTerm.charAt(0).toUpperCase() + fullTerm.slice(1);

        termDisplay.innerText = formattedTerm;
        formulaDisplay.innerText = `${selectedPrefix} (${selectedPrefixLabel.toLowerCase()}) + ${selectedSuffix} (${selectedSuffixLabel.toLowerCase()})`;

        if (combinations[key]) {
            definitionDisplay.innerHTML = `<strong>${combinations[key]}</strong>`;
        } else {
            definitionDisplay.innerText = `O termo "${formattedTerm}" foi combinado estruturalmente com base nos radicais fornecidos, porém não possui definição registrada no simulador básico.`;
        }
    }
}

function resetTerm() {
    selectedPrefix = '';
    selectedPrefixLabel = '';
    selectedSuffix = '';
    selectedSuffixLabel = '';

    document.querySelectorAll('.prefix-btn').forEach(btn => btn.classList.remove('border-brand-gold', 'bg-brand-sage/10'));
    document.querySelectorAll('.suffix-btn').forEach(btn => btn.classList.remove('border-brand-gold', 'bg-brand-sage/10'));

    const termDisplay = document.getElementById('term-display');
    const formulaDisplay = document.getElementById('formula-display');
    const definitionDisplay = document.getElementById('definition-display');

    if (termDisplay) termDisplay.innerText = "Selecione as partes";
    if (formulaDisplay) formulaDisplay.innerText = "Escolha acima para combinar";
    if (definitionDisplay) definitionDisplay.innerText = "A composição morfológica revelará o significado intuitivo do termo gerado sem a necessidade de memorização estrita.";
}

/**
 * 5. Objeto 3D da Marca — "Molécula Lise" (Three.js)
 */
function initLiseMolecule(containerId = 'lise-3d') {
    const container = document.getElementById(containerId);
    if (!container || typeof THREE === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth;
    let height = container.clientHeight;
    if (width === 0 || height === 0) {
        const observer = new ResizeObserver(() => {
            if (container.clientWidth === 0 || container.clientHeight === 0) return;
            observer.disconnect();
            initLiseMolecule(containerId);
        });
        observer.observe(container);
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const orbitingText = containerId === 'lise-3d-jornada'
        ? document.getElementById('texto-circular-jornada')
        : null;
    const journeySection = containerId === 'lise-3d-jornada'
        ? document.getElementById('jornada')
        : null;
    const journeySteps = journeySection
        ? Array.from(journeySection.querySelectorAll('.jornada-bloco'))
        : [];

    // Geometria em Icosaedro (Representação do Núcleo da Molécula)
    const geometry = new THREE.IcosahedronGeometry(1.7, 1);
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x8DAA91, // brand-sage
        transparent: true,
        opacity: 0.55
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);

    const nodeMaterial = new THREE.PointsMaterial({
        color: 0xC5A467, // brand-gold
        size: 0.11,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true
    });
    const nodes = new THREE.Points(geometry, nodeMaterial);

    const molecule = new THREE.Group();
    molecule.add(wireframe);
    molecule.add(nodes);
    molecule.rotation.set(0.5, 0.6, 0);
    scene.add(molecule);

    let currentRotX = molecule.rotation.x;
    let currentRotY = molecule.rotation.y;
    let isTicking = false;

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function targetRotationFromScroll() {
        if (!journeySection) {
            return { x: 0.5, y: 0.6 };
        }

        const sectionRect = journeySection.getBoundingClientRect();
        const progress = clamp(
            (window.innerHeight - sectionRect.top) / (sectionRect.height + window.innerHeight),
            0,
            1
        );

        return {
            x: 0.5 + Math.sin(progress * Math.PI) * 0.35,
            y: 0.6 + progress * Math.PI
        };
    }

    function updateJourneySteps() {
        if (!journeySection || journeySteps.length === 0) return;

        const stage = container.getBoundingClientRect();
        const orbitLeft = stage.left + stage.width / 2 - Math.min(stage.width, stage.height) * 0.43;
        const orbitCenterY = stage.top + stage.height / 2;
        const orbitRadius = window.innerHeight * 0.62;

        journeySteps.forEach(step => {
            const rect = step.getBoundingClientRect();
            const currentTranslateX = Number(step.dataset.orbitTranslateX || 0);
            const stepCenterY = rect.top + rect.height / 2;
            const progress = clamp(
                0.5 - (stepCenterY - orbitCenterY) / (orbitRadius * 2),
                0,
                1
            );
            const arc = Math.sin(progress * Math.PI);
            const stepCenterX = rect.left + rect.width / 2 - currentTranslateX;
            const maxTranslateX = Math.max(
                0,
                orbitLeft - 20 - rect.width / 2 - stepCenterX
            );
            const translateX = maxTranslateX * arc;
            const rotateX = (0.5 - progress) * 48;
            const rotateY = (0.5 - progress) * 24;
            const scale = 0.94 + arc * 0.06;

            step.dataset.orbitTranslateX = String(translateX);
            step.style.opacity = String(arc);
            step.style.transform =
                `translate3d(${translateX}px, 0, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        });
    }

    function render() {
        updateJourneySteps();
        if (orbitingText) {
            const rotation = (currentRotY - 0.6) * (180 / Math.PI);
            orbitingText.style.transform = `rotate(${rotation}deg)`;
        }
        renderer.render(scene, camera);
    }

    function tick() {
        const target = targetRotationFromScroll();
        currentRotX += (target.x - currentRotX) * 0.06;
        currentRotY += (target.y - currentRotY) * 0.06;
        molecule.rotation.x = currentRotX;
        molecule.rotation.y = currentRotY;
        render();

        if (Math.abs(target.x - currentRotX) > 0.0005 || Math.abs(target.y - currentRotY) > 0.0005) {
            requestAnimationFrame(tick);
        } else {
            isTicking = false;
        }
    }

    function requestTick() {
        if (!isTicking) {
            isTicking = true;
            requestAnimationFrame(tick);
        }
    }

    if (prefersReducedMotion) {
        render();
    } else {
        window.addEventListener('scroll', requestTick, { passive: true });
        requestTick();
    }

    window.addEventListener('resize', () => {
        width = container.clientWidth;
        height = container.clientHeight;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        render();
        updateJourneySteps();
    });
}
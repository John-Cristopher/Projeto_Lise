/**
 * Script da Landing Page Profissional — Lise
 */

// Dados de Combinações de Termos do Simulador
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

    // Inicialização do Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Inicialização do objeto 3D da marca (somente na seção "Jornada")
    initLiseMolecule('lise-3d-jornada');

    // Elementos do cabeçalho
    const cabecalhoPrincipal = document.getElementById('cabecalho-principal');
    const barraNav = document.getElementById('barra-nav');
    const btnMenu = document.getElementById('botao-menu');
    const menuMovel = document.getElementById('menu-movel');

    /**
     * 1. Lógica do Cabeçalho Flutuante
     */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            cabecalhoPrincipal.classList.add('pt-2');
            barraNav.classList.add('shadow-lg', 'border-brand-slate/10');
            barraNav.classList.remove('shadow-sm', 'border-brand-slate/5');
        } else {
            cabecalhoPrincipal.classList.remove('pt-2');
            barraNav.classList.add('shadow-sm', 'border-brand-slate/5');
            barraNav.classList.remove('shadow-lg', 'border-brand-slate/10');
        }
    });

    /**
     * 2. Toggle do Menu Mobile
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
     * 3. Animação de Giro do Flashcard (Hero)
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

    console.log("Interface do projeto Lise carregada com sucesso.");
});

/**
 * 4. Funções de Simulação do Decodificador Morfológico
 */
function selectPrefix(prefix, label, evt) {
    selectedPrefix = prefix;
    selectedPrefixLabel = label;

    // Atualiza estado visual dos botões de prefixo
    document.querySelectorAll('.prefix-btn').forEach(btn => {
        btn.classList.remove('border-brand-gold', 'bg-brand-sage/10');
    });

    const targetBtn = evt ? evt.currentTarget : event.currentTarget;
    if (targetBtn) {
        targetBtn.classList.add('border-brand-gold', 'bg-brand-sage/10');
    }

    updateDisplay();
}

function selectSuffix(suffix, label, evt) {
    selectedSuffix = suffix;
    selectedSuffixLabel = label;

    // Atualiza estado visual dos botões de sufixo
    document.querySelectorAll('.suffix-btn').forEach(btn => {
        btn.classList.remove('border-brand-gold', 'bg-brand-sage/10');
    });

    const targetBtn = evt ? evt.currentTarget : event.currentTarget;
    if (targetBtn) {
        targetBtn.classList.add('border-brand-gold', 'bg-brand-sage/10');
    }

    updateDisplay();
}

function updateDisplay() {
    const termDisplay = document.getElementById('term-display');
    const formulaDisplay = document.getElementById('formula-display');
    const definitionDisplay = document.getElementById('definition-display');

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

/**
 * 5. Objeto 3D da Marca — "Molécula Lise"
 *
 * Uma estrutura de vértices e arestas, inspirada em uma molécula, que gira
 * conforme a rolagem da página. A ideia reforça visualmente o próprio
 * conceito por trás do nome "Lise": as partes (radicais/nós) que se
 * reorganizam para formar um termo, em vez de um objeto decorativo genérico.
 *
 * Aceita um containerId para inicializar a cena no container da seção "Jornada".
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

    // Núcleo: icosaedro em wireframe (as "arestas" entre os radicais)
    const geometry = new THREE.IcosahedronGeometry(1.7, 1);
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x8DAA91, // brand-sage
        transparent: true,
        opacity: 0.55
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);

    // Nós: pontos dourados nos vértices (os "átomos"/termos)
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

    function targetRotationFromScroll() {
        const scrollY = window.scrollY;
        return {
            x: 0.5 + Math.sin(scrollY * 0.0015) * 0.35,
            y: 0.6 + scrollY * 0.0022
        };
    }

    function render() {
        if (orbitingText) {
            const rotation = (currentRotY - 0.6) * (180 / Math.PI);
            orbitingText.style.transform = `rotate(${rotation}deg)`;
        }
        renderer.render(scene, camera);
    }

    function tick() {
        const target = targetRotationFromScroll();
        // Suaviza a rotação (lerp) para que o giro acompanhe a rolagem
        // sem parecer travado a cada pixel.
        currentRotX += (target.x - currentRotX) * 0.06;
        currentRotY += (target.y - currentRotY) * 0.06;
        molecule.rotation.x = currentRotX;
        molecule.rotation.y = currentRotY;
        render();

        // Continua a animação enquanto a rotação não convergiu ao alvo,
        // evitando um loop de renderização rodando o tempo todo à toa.
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
        // Respeita a preferência do usuário: exibe a estrutura parada,
        // em um ângulo fixo, sem animação de rolagem.
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
    });
}

function resetTerm() {
    selectedPrefix = '';
    selectedPrefixLabel = '';
    selectedSuffix = '';
    selectedSuffixLabel = '';

    document.querySelectorAll('.prefix-btn').forEach(btn => btn.classList.remove('border-brand-gold', 'bg-brand-sage/10'));
    document.querySelectorAll('.suffix-btn').forEach(btn => btn.classList.remove('border-brand-gold', 'bg-brand-sage/10'));

    document.getElementById('term-display').innerText = "Selecione as partes";
    document.getElementById('formula-display').innerText = "Escolha acima para combinar";
    document.getElementById('definition-display').innerText = "A composição morfológica revelará o significado intuitivo do termo gerado sem a necessidade de memorização estrita.";
}
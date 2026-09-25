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
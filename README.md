# LISE — Biologia que faz sentido

![HTML](https://img.shields.io/badge/HTML5-estrutura-2F9F68?style=flat-square)
![CSS](https://img.shields.io/badge/CSS3-interface-6A214F?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-interatividade-CDA85A?style=flat-square)
![Status](https://img.shields.io/badge/status-prototipo_academico-0F5132?style=flat-square)

A **LISE** é uma proposta de plataforma educacional que torna a linguagem da biologia mais acessível. Em vez de apenas memorizar termos científicos, estudantes investigam como as palavras são formadas por meio de radicais, prefixos e sufixos.

O projeto combina etimologia, recursos visuais e aprendizagem ativa para aproximar conceitos complexos da realidade de estudantes e professores.

![Demonstração da interface da LISE](./img/preview.gif)

## Principais recursos

- Decodificador interativo de termos biológicos;
- construção de palavras a partir de componentes morfológicos;
- flashcard 3D e jornada visual de aprendizagem;
- proposta de flashcards, quizzes, jogos e trilhas de estudo;
- apresentação de experiências específicas para estudantes e professores;
- comparação de planos educacionais;
- navegação responsiva para computador, tablet e celular;
- modo escuro, controle de tamanho do texto e cuidados de acessibilidade.

## Páginas do projeto

| Página | Arquivo | Conteúdo |
| --- | --- | --- |
| Início | [`index.html`](./index.html) | Apresentação da plataforma, demonstrações interativas, método, públicos, planos e FAQ |
| Sobre nós | [`about.html`](./about.html) | História, propósito, missão, visão, valores e equipe |
| Planos e preços | [`price.html`](./price.html) | Opções para estudantes, professores e instituições |

## Identidade visual

A interface preserva a biologia como base da marca. O verde conduz a experiência; o roxo/ameixa destaca decisões e informações importantes; e o dourado aparece como um acento acolhedor e moderado.

| Cor | Código | Aplicação |
| --- | --- | --- |
| Verde LISE | `#2F9F68` | Cor principal, ações e elementos ligados à descoberta |
| Verde profundo | `#0F5132` | Contraste, títulos e áreas institucionais |
| Roxo/ameixa | `#6A214F` | Destaques estratégicos e chamadas de atenção |
| Dourado mel | `#CDA85A` | Acentos, detalhes e feedback visual |
| Creme | `#FFF8F2` | Fundos claros e leitura confortável |

## Tecnologias

- **HTML5** para a estrutura semântica das páginas;
- **CSS3** e **Tailwind CSS** para o sistema visual e a responsividade;
- **JavaScript** para interações, navegação e acessibilidade;
- **Three.js** para a experiência visual tridimensional;
- **GSAP** e **ScrollTrigger** para animações orientadas pela rolagem;
- **Lucide** para os ícones da interface;
- **Bricolage Grotesque**, **Instrument Sans** e **IBM Plex Mono** como fontes locais.

## Estrutura

```text
LISE-Final/
├── index.html
├── about.html
├── price.html
├── assets/
│   ├── css/
│   │   ├── accessibility.css
│   │   ├── design-system.css
│   │   └── fonts.css
│   ├── fonts/
│   └── js/
│       ├── accessibility.js
│       └── script.js
└── img/
```

## Como executar localmente

O projeto é estático e não exige instalação de dependências. Para uma visualização completa, execute um servidor HTTP local na raiz do projeto.

Com Python:

```bash
python -m http.server 4173
```

Depois, acesse:

```text
http://localhost:4173
```

Também é possível abrir `index.html` diretamente no navegador, mas um servidor local evita limitações de carregamento de recursos. É necessário estar conectado à internet para carregar as bibliotecas distribuídas por CDN.

## Acessibilidade

A LISE inclui recursos de apoio à leitura, como modo escuro, ampliação de texto e navegação responsiva. O projeto também utiliza marcação semântica, descrições acessíveis e estados de foco visíveis para favorecer a navegação por teclado.

## Equipe

- Isabelly Ferreira
- João Pedro Stadler
- John Cristopher
- Lívia Domingues

## Contexto e licença

Este é um protótipo acadêmico desenvolvido como Trabalho de Conclusão de Curso. O repositório ainda não possui uma licença de uso definida; para reutilização ou distribuição, consulte a equipe responsável.

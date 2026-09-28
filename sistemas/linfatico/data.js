const ATLAS_DATA = [
  {
    "id": 1,
    "range": "I.A – I.B.4",
    "group": "Timo",
    "title": "Medula óssea vermelha e timo — anatomia macroscópica",
    "coverage": "parcial",
    "images": [
      {
        "src": "assets/images/medula-ossea-vermelha.webp",
        "alt": "Osso seccionado mostrando áreas avermelhadas de medula óssea",
        "caption": "Medula óssea vermelha em osso seccionado."
      },
      {
        "src": "assets/images/timo-detalhado.webp",
        "alt": "Timo com lobos direito e esquerdo, cápsula e arquitetura interna",
        "caption": "Timo — lobos, cápsula e organização lobular."
      },
      {
        "src": "assets/images/timo-localizacao.webp",
        "alt": "Timo em localização torácica anterior",
        "caption": "Localização do timo no tórax (peça anatômica)."
      }
    ],
    "items": [
      {
        "key": "I.A",
        "code": "I.A",
        "name": "Medula óssea vermelha"
      },
      {
        "key": "I.B.1",
        "code": "I.B.1",
        "name": "Lobo direito do timo"
      },
      {
        "key": "I.B.2",
        "code": "I.B.2",
        "name": "Lobo esquerdo do timo"
      },
      {
        "key": "I.B.3",
        "code": "I.B.3",
        "name": "Istmo do timo",
        "status": "parcial",
        "note": "Não está individualizado de forma inequívoca nas pranchas atuais."
      },
      {
        "key": "I.B.4",
        "code": "I.B.4",
        "name": "Cápsula do timo"
      }
    ]
  },
  {
    "id": 2,
    "range": "I.B.5 – II.B",
    "group": "Timo",
    "title": "Arquitetura do timo, tonsilas e placas de Peyer",
    "coverage": "completo",
    "images": [
      {
        "src": "assets/images/timo-detalhado.webp",
        "alt": "Timo com septos interlobulares, córtex e medula",
        "caption": "Timo — trabéculas/septos, córtex e medula."
      },
      {
        "src": "assets/images/visao-geral-linfatico.webp",
        "alt": "Visão geral do sistema linfático com tonsilas e placas de Peyer",
        "caption": "Tonsilas e placas de Peyer no contexto do sistema linfático."
      }
    ],
    "items": [
      {
        "key": "I.B.5",
        "code": "I.B.5",
        "name": "Trabéculas do timo"
      },
      {
        "key": "I.B.6",
        "code": "I.B.6",
        "name": "Córtex do timo"
      },
      {
        "key": "I.B.7",
        "code": "I.B.7",
        "name": "Medula do timo"
      },
      {
        "key": "II.A",
        "code": "II.A",
        "name": "Tonsilas"
      },
      {
        "key": "II.B",
        "code": "II.B",
        "name": "Placas de Peyer"
      }
    ]
  },
  {
    "id": 3,
    "range": "II.C – II.D.2",
    "group": "Linfonodo",
    "title": "Apêndice vermiforme e organização do linfonodo",
    "coverage": "parcial",
    "images": [
      {
        "src": "assets/images/visao-geral-linfatico.webp",
        "alt": "Visão geral mostrando apêndice vermiforme no sistema linfático",
        "caption": "Apêndice vermiforme — localização no sistema linfático."
      }
    ],
    "items": [
      {
        "key": "II.C",
        "code": "II.C",
        "name": "Apêndice vermiforme"
      },
      {
        "key": "II.D.1",
        "code": "II.D.1",
        "name": "Linfonodo — parênquima",
        "status": "parcial",
        "note": "Sem prancha específica de linfonodo em corte nas imagens atuais."
      },
      {
        "key": "II.D.1a",
        "code": "II.D.1a",
        "name": "Linfonodo — córtex",
        "status": "parcial"
      },
      {
        "key": "II.D.1b",
        "code": "II.D.1b",
        "name": "Linfonodo — medula",
        "status": "parcial"
      },
      {
        "key": "II.D.2",
        "code": "II.D.2",
        "name": "Linfonodo — estroma (arcabouço)",
        "status": "parcial"
      }
    ]
  },
  {
    "id": 4,
    "range": "II.D.2a – II.E.1b",
    "group": "Linfonodo",
    "title": "Estroma do linfonodo e estroma do baço",
    "coverage": "parcial",
    "images": [
      {
        "src": "assets/images/baco-visceral.webp",
        "alt": "Baço em peça anatômica mostrando face visceral e hilo",
        "caption": "Baço — peça anatômica; apoio para sua organização macroscópica."
      }
    ],
    "items": [
      {
        "key": "II.D.2a",
        "code": "II.D.2a",
        "name": "Linfonodo — cápsula",
        "status": "parcial"
      },
      {
        "key": "II.D.2b",
        "code": "II.D.2b",
        "name": "Linfonodo — trabéculas",
        "status": "parcial"
      },
      {
        "key": "II.E.1",
        "code": "II.E.1",
        "name": "Baço — estroma",
        "status": "parcial"
      },
      {
        "key": "II.E.1a",
        "code": "II.E.1a",
        "name": "Baço — cápsula",
        "status": "parcial"
      },
      {
        "key": "II.E.1b",
        "code": "II.E.1b",
        "name": "Baço — trabéculas",
        "status": "parcial"
      }
    ]
  },
  {
    "id": 5,
    "range": "II.E.2 – II.E.4",
    "group": "Baço",
    "title": "Baço — parênquima e faces",
    "coverage": "parcial",
    "images": [
      {
        "src": "assets/images/baco-visceral.webp",
        "alt": "Baço em localização anatômica e face visceral",
        "caption": "Baço — localização e face visceral."
      }
    ],
    "items": [
      {
        "key": "II.E.2",
        "code": "II.E.2",
        "name": "Baço — parênquima",
        "status": "parcial"
      },
      {
        "key": "II.E.2a",
        "code": "II.E.2a",
        "name": "Polpa vermelha",
        "status": "parcial"
      },
      {
        "key": "II.E.2b",
        "code": "II.E.2b",
        "name": "Polpa branca",
        "status": "parcial"
      },
      {
        "key": "II.E.3",
        "code": "II.E.3",
        "name": "Face diafragmática",
        "status": "parcial"
      },
      {
        "key": "II.E.4",
        "code": "II.E.4",
        "name": "Face visceral"
      }
    ]
  },
  {
    "id": 6,
    "range": "II.E.4a – II.E.5",
    "group": "Baço",
    "title": "Baço — hilo, faces viscerais e artéria esplênica",
    "coverage": "parcial",
    "images": [
      {
        "src": "assets/images/baco-visceral.webp",
        "alt": "Face visceral do baço com hilo e vasos esplênicos",
        "caption": "Face visceral e hilo esplênico com vasos."
      }
    ],
    "items": [
      {
        "key": "II.E.4a",
        "code": "II.E.4a",
        "name": "Hilo esplênico"
      },
      {
        "key": "II.E.4b",
        "code": "II.E.4b",
        "name": "Face gástrica",
        "status": "parcial"
      },
      {
        "key": "II.E.4c",
        "code": "II.E.4c",
        "name": "Face cólica",
        "status": "parcial"
      },
      {
        "key": "II.E.4d",
        "code": "II.E.4d",
        "name": "Face renal",
        "status": "parcial"
      },
      {
        "key": "II.E.5",
        "code": "II.E.5",
        "name": "Artéria esplênica"
      }
    ]
  },
  {
    "id": 7,
    "range": "II.E.6 – 9b",
    "group": "Baço",
    "title": "Vasos do baço e linfonodos parietais",
    "coverage": "parcial",
    "images": [
      {
        "src": "assets/images/baco-visceral.webp",
        "alt": "Baço e vasos no hilo esplênico",
        "caption": "Vasos do hilo esplênico."
      },
      {
        "src": "assets/images/mama-paraesternais.webp",
        "alt": "Drenagem linfática da mama com linfonodos paraesternais",
        "caption": "Linfonodos paraesternais — referência topográfica."
      },
      {
        "src": "assets/images/troncos-ductos-torax.webp",
        "alt": "Esquema dos linfáticos torácicos com linfonodos intercostais",
        "caption": "Linfonodos intercostais e drenagem torácica."
      }
    ],
    "items": [
      {
        "key": "II.E.6",
        "code": "II.E.6",
        "name": "Artérias trabeculares",
        "status": "parcial"
      },
      {
        "key": "II.E.7",
        "code": "II.E.7",
        "name": "Artérias centrais",
        "status": "parcial"
      },
      {
        "key": "II.E.8",
        "code": "II.E.8",
        "name": "Veia esplênica",
        "status": "parcial"
      },
      {
        "key": "9a",
        "code": "9a",
        "name": "Linfonodos paraesternais"
      },
      {
        "key": "9b",
        "code": "9b",
        "name": "Linfonodos intercostais"
      }
    ]
  },
  {
    "id": 8,
    "range": "9c – 10b",
    "group": "Linfonodos torácicos",
    "title": "Linfonodos parietais frênicos e mediastinais",
    "coverage": "parcial",
    "images": [
      {
        "src": "assets/images/retroperitoneal-linfaticos.webp",
        "alt": "Dissecção com linfonodos mediastinais e ducto torácico",
        "caption": "Linfonodos mediastinais e ducto torácico — visão ampla."
      },
      {
        "src": "assets/images/torax-linfonodos-bronquicos.webp",
        "alt": "Dissecção do tórax com linfonodos relacionados à árvore brônquica",
        "caption": "Linfonodos do tórax — relações mediastinais e brônquicas."
      }
    ],
    "items": [
      {
        "key": "9c",
        "code": "9c",
        "name": "Frênicos superiores anteriores",
        "status": "parcial"
      },
      {
        "key": "9d",
        "code": "9d",
        "name": "Frênicos superiores médios",
        "status": "parcial"
      },
      {
        "key": "9e",
        "code": "9e",
        "name": "Frênicos superiores posteriores",
        "status": "parcial"
      },
      {
        "key": "10a",
        "code": "10a",
        "name": "Mediastinais anteriores",
        "status": "parcial"
      },
      {
        "key": "10b",
        "code": "10b",
        "name": "Mediastinais médios"
      }
    ]
  },
  {
    "id": 9,
    "range": "10b — subgrupos",
    "group": "Linfonodos torácicos",
    "title": "Linfonodos mediastinais médios",
    "coverage": "parcial",
    "images": [
      {
        "src": "assets/images/torax-linfonodos-bronquicos.webp",
        "alt": "Árvore brônquica com linfonodos traqueais, traqueobrônquicos superiores e broncopulmonares",
        "caption": "Linfonodos broncopulmonares e traqueobrônquicos superiores."
      },
      {
        "src": "assets/images/traqueobronquiais-inferiores.webp",
        "alt": "Dissecção da bifurcação traqueal com linfonodos traqueobrônquicos inferiores",
        "caption": "Linfonodos traqueobrônquicos inferiores."
      }
    ],
    "items": [
      {
        "key": "10b-pulmonares",
        "code": "10b",
        "name": "Pulmonares",
        "status": "parcial"
      },
      {
        "key": "10b-broncopulmonares",
        "code": "10b",
        "name": "Broncopulmonares"
      },
      {
        "key": "10b-tbs",
        "code": "10b",
        "name": "Traqueobrônquiais superiores"
      },
      {
        "key": "10b-tbi",
        "code": "10b",
        "name": "Traqueobrônquiais inferiores"
      },
      {
        "key": "10b-paratraqueais",
        "code": "10b",
        "name": "Paratraqueais",
        "status": "parcial"
      }
    ]
  },
  {
    "id": 10,
    "range": "10c – 11d",
    "group": "Troncos",
    "title": "Mediastinais posteriores e troncos linfáticos superiores",
    "coverage": "parcial",
    "images": [
      {
        "src": "assets/images/thoracic-duct-cadaver.webp",
        "alt": "Ducto torácico no mediastino posterior junto ao esôfago",
        "caption": "Mediastino posterior — ducto torácico e esôfago."
      },
      {
        "src": "assets/images/cabeca-pescoco-linfaticos.webp",
        "alt": "Vasos linfáticos da cabeça e pescoço com troncos jugular e subclávio",
        "caption": "Troncos jugular e subclávio."
      },
      {
        "src": "assets/images/troncos-ductos-torax.webp",
        "alt": "Esquema de troncos e ductos linfáticos torácicos",
        "caption": "Troncos jugular, subclávio e broncomediastinal."
      }
    ],
    "items": [
      {
        "key": "10c",
        "code": "10c",
        "name": "Mediastinais posteriores (esofágicos)",
        "status": "parcial"
      },
      {
        "key": "11a",
        "code": "11a",
        "name": "Tronco jugular"
      },
      {
        "key": "11b",
        "code": "11b",
        "name": "Tronco subclávio"
      },
      {
        "key": "11c",
        "code": "11c",
        "name": "Tronco broncomediastinal"
      },
      {
        "key": "11d",
        "code": "11d",
        "name": "Troncos intestinais",
        "status": "parcial",
        "note": "A região de convergência é mostrada, mas o tronco intestinal não está nomeado de forma inequívoca."
      }
    ]
  },
  {
    "id": 11,
    "range": "11e – 11g",
    "group": "Troncos",
    "title": "Troncos lombares e grandes ductos linfáticos",
    "coverage": "parcial",
    "images": [
      {
        "src": "assets/images/retroperitoneal-linfaticos.webp",
        "alt": "Parede posterior toracoabdominal com tronco lombar, cisterna do quilo e ducto torácico",
        "caption": "Tronco lombar direito, cisterna do quilo e ducto torácico."
      },
      {
        "src": "assets/images/thoracic-duct-cisterna.webp",
        "alt": "Esquema do ducto torácico desde a cisterna do quilo até a junção venosa",
        "caption": "Ducto torácico e cisterna do quilo."
      },
      {
        "src": "assets/images/troncos-ductos-torax.webp",
        "alt": "Esquema do ducto linfático direito e ducto torácico",
        "caption": "Ducto linfático direito e ducto torácico."
      },
      {
        "src": "assets/images/cervical-virchow-ducto.webp",
        "alt": "Dissecção cervical mostrando ducto torácico e linfonodo supraclavicular",
        "caption": "Terminação cervical do ducto torácico."
      }
    ],
    "items": [
      {
        "key": "11e",
        "code": "11e",
        "name": "Troncos lombares",
        "status": "parcial",
        "note": "A prancha identifica explicitamente o tronco lombar direito; a bilateralidade pode ser complementada."
      },
      {
        "key": "11f",
        "code": "11f",
        "name": "Ducto torácico"
      },
      {
        "key": "11g",
        "code": "11g",
        "name": "Ducto linfático direito"
      }
    ]
  }
];

const EXTRA_GALLERY = [
  {
    "src": "assets/images/axilares-grupos.webp",
    "title": "Linfonodos axilares — grupos",
    "caption": "Grupos anterior/peitoral, central, lateral, posterior e apical."
  },
  {
    "src": "assets/images/axilares-disseccao.webp",
    "title": "Axila — relações anatômicas",
    "caption": "Dissecção dos linfonodos axilares e estruturas vasculonervosas."
  },
  {
    "src": "assets/images/inguinais.webp",
    "title": "Linfonodos inguinais superficiais",
    "caption": "Cadeias superficial horizontal e vertical e vasos linfáticos."
  },
  {
    "src": "assets/images/iliacos-externos.webp",
    "title": "Linfonodos ilíacos externos",
    "caption": "Linfonodos ilíacos externos em relação aos vasos ilíacos."
  },
  {
    "src": "assets/images/pelve-iliaco-externo.webp",
    "title": "Pelve — linfonodo ilíaco externo",
    "caption": "Relação do linfonodo ilíaco externo com estruturas pélvicas."
  },
  {
    "src": "assets/images/mama-paraesternais.webp",
    "title": "Drenagem linfática da mama",
    "caption": "Linfonodos axilares, paraesternais e vias de drenagem da mama."
  }
];

const GROUPS = ['Todos',...new Set(ATLAS_DATA.map(b=>b.group))];

const ATLAS_DATA = [
  {
    id: 1, range: '1–5', group: 'Nariz', title: 'Nariz externo', coverage: 'completo',
    images: [
      {src:'assets/images/bl01-nariz-externo.webp', alt:'Nariz externo com raiz, dorso, ápice, asa e narina identificados', caption:'Nariz externo — referências de superfície.'}
    ],
    items: [
      {n:1, name:'Raiz do nariz'}, {n:2, name:'Dorso do nariz'}, {n:3, name:'Ápice do nariz'},
      {n:4, name:'Asa do nariz'}, {n:5, name:'Narinas'}
    ]
  },
  {
    id: 2, range: '6–10', group: 'Nariz', title: 'Osteologia da abertura nasal', coverage: 'completo',
    images:[{src:'assets/images/bl02-ossos-nasais.webp', alt:'Crânio em vista anterior com ossos nasais, suturas, maxilas e abertura piriforme', caption:'Vista anterior — ossos nasais, maxilas, suturas e abertura piriforme.'}],
    items:[
      {n:6,name:'Ossos nasais (D e E)'},{n:7,name:'Sutura internasal'},{n:8,name:'Maxilas (D e E)'},{n:9,name:'Sutura intermaxilar'},{n:10,name:'Abertura piriforme'}
    ]
  },
  {
    id:3, range:'11–15', group:'Nariz', title:'Ossos da região nasal e etmoide', coverage:'completo',
    images:[{src:'assets/images/bl03-ossos-regiao-nasal.webp', alt:'Crânio colorido com espinha nasal anterior, sutura frontonasal, frontal, lacrimal e etmoide', caption:'Vista anterior — relações ósseas da região nasal.'}],
    items:[
      {n:11,name:'Espinha nasal anterior'},{n:12,name:'Sutura frontonasal'},{n:13,name:'Frontal'},{n:14,name:'Lacrimal'},
      {n:15,name:'Etmoide',subs:['Concha nasal superior','Concha nasal média','Lâmina perpendicular do etmoide','Massas laterais (D e E)','Lâmina cribriforme']}
    ]
  },
  {
    id:4, range:'16–20', group:'Nariz', title:'Concha, meatos e vômer', coverage:'completo',
    images:[{src:'assets/images/bl04-meatos-vomer.webp', alt:'Parede lateral da cavidade nasal e septo nasal com meatos e vômer', caption:'Parede lateral da cavidade nasal + septo nasal.'}],
    items:[
      {n:16,name:'Concha nasal inferior'},{n:17,name:'Meato nasal superior'},{n:18,name:'Meato nasal médio'},{n:19,name:'Meato nasal inferior'},{n:20,name:'Vômer'}
    ]
  },
  {
    id:5, range:'21–25', group:'Nariz', title:'Coanas, esfenoide e palato ósseo', coverage:'completo',
    images:[
      {src:'assets/images/bl05-base-cranio-palato.webp', alt:'Base do crânio em vista inferior com coanos e palato duro', caption:'Vista inferior — coanos e componentes do palato duro.'},
      {src:'assets/images/bl05-osso-palatino.webp', alt:'Osso palatino isolado em diferentes vistas', caption:'Osso palatino — lâminas horizontal e perpendicular.'}
    ],
    items:[
      {n:21,name:'Esfenoide'},{n:22,name:'Coanos'},{n:23,name:'Processo palatino da maxila'},{n:24,name:'Lâmina horizontal do palatino'},{n:25,name:'Lâmina perpendicular do palatino'}
    ]
  },
  {
    id:6, range:'26–30', group:'Nariz', title:'Cartilagens nasais e músculo prócero', coverage:'completo',
    images:[
      {src:'assets/images/bl06-cartilagens-nariz.webp', alt:'Cartilagens do nariz em fotografias e esquemas', caption:'Cartilagens nasais — lateral, alares e septal.'},
      {src:'assets/images/bl06-procero.webp', alt:'Músculo prócero identificado na face', caption:'Músculo prócero.'}
    ],
    items:[
      {n:26,name:'Cartilagens nasais laterais (D e E)'},{n:27,name:'Cartilagens alares maiores'},{n:28,name:'Cartilagens alares menores'},{n:29,name:'Cartilagem do septo nasal'},{n:30,name:'m. Prócero'}
    ]
  },
  {
    id:7, range:'31–35', group:'Nariz', title:'Músculos do nariz e vestíbulo', coverage:'completo',
    images:[
      {src:'assets/images/bl07-nasal-transversa-alar.webp', alt:'Dissecção mostrando partes transversa e alar do músculo nasal', caption:'Músculo nasal — partes transversa e alar.'},
      {src:'assets/images/bl07-levantador-labio-asa.webp', alt:'Dissecção do levantador do lábio superior e da asa do nariz', caption:'Levantador do lábio superior e da asa do nariz.'},
      {src:'assets/images/bl07-abaixador-septo.webp', alt:'Abaixador do septo nasal identificado', caption:'Abaixador do septo nasal.'},
      {src:'assets/images/bl07-vestibulo.webp', alt:'Corte anatômico da cavidade nasal com vestíbulo indicado', caption:'Vestíbulo do nariz.'}
    ],
    items:[
      {n:31,name:'m. Nasal – parte transversa'},{n:32,name:'m. Nasal – parte alar'},{n:33,name:'m. Levantador do lábio superior e da asa do nariz'},{n:34,name:'m. Abaixador do septo nasal'},{n:35,name:'Vestíbulo do nariz'}
    ]
  },
  {
    id:8, range:'36–40', group:'Nariz', title:'Cavidade nasal e regiões da mucosa', coverage:'completo',
    images:[
      {src:'assets/images/bl08-cavidade-vibrissas-seio-frontal.webp', alt:'Corte mediano mostrando cavidade nasal, vibrissas e seio frontal', caption:'Corte mediano — cavidade nasal, vibrissas e seio frontal.'},
      {src:'assets/images/bl08-regioes-olfatoria-respiratoria.webp', alt:'Esquema colorido das regiões olfatória e respiratória da cavidade nasal', caption:'Região olfatória e região respiratória.'}
    ],
    items:[
      {n:36,name:'Vibrissas'},{n:37,name:'Cavidade nasal'},{n:38,name:'Região olfatória'},{n:39,name:'Região respiratória'},{n:40,name:'Seio frontal'}
    ]
  },
  {
    id:9, range:'41–45', group:'Nariz', title:'Seios paranasais e células etmoidais', coverage:'completo',
    images:[
      {src:'assets/images/bl09-seios-esfenoidal-maxilar.webp', alt:'Corte de crânio mostrando seios esfenoidal e maxilar', caption:'Seios esfenoidal e maxilar.'},
      {src:'assets/images/bl09-celulas-etmoidais.webp', alt:'Etmoide com grupos de células etmoidais anteriores, médias e posteriores destacados', caption:'Divisão didática das células etmoidais.'}
    ],
    items:[
      {n:41,name:'Seio esfenoidal'},{n:42,name:'Seio maxilar'},{n:43,name:'Células etmoidais anteriores'},{n:44,name:'Células etmoidais médias'},{n:45,name:'Células etmoidais posteriores'}
    ]
  },
  {
    id:10, range:'46–50', group:'Nariz', title:'Drenagem da cavidade nasal', coverage:'parcial',
    images:[
      {src:'assets/images/bl10-drenagem-nasal.webp', alt:'Parede lateral da cavidade nasal com aberturas e vias de drenagem', caption:'Drenagem dos seios e abertura do ducto nasolacrimal.'},
      {src:'assets/images/bl10-ducto-frontonasal.webp', alt:'Dissecção com sonda atravessando o ducto frontonasal e abertura do seio maxilar', caption:'Ducto frontonasal, hiato semilunar e óstio maxilar.'},
      {src:'assets/images/bl10-hiato-bolha-conchas-cadaver.webp', alt:'Dissecção sagital da cavidade nasal com concha média refletida, hiato semilunar, bolha etmoidal, concha inferior e seio frontal', caption:'Peça anatômica — hiato semilunar, bolha etmoidal e conchas nasais em relação.'},
      {src:'assets/images/bl10-cavidade-nasal-nervos-arterias.jpg', alt:'Prancha anatômica das paredes da cavidade nasal com nervos e artérias em cortes sagitais', caption:'Cavidade nasal — nervos, artérias e relações anatômicas em cortes sagitais.'},
      {src:'assets/images/bl10-seccao-mediana-sinus-meatos.jpg', alt:'Corte mediano da cabeça mostrando cavidade nasal, seios paranasais, hiato semilunar, ducto nasolacrimal e abertura da tuba auditiva', caption:'Corte mediano — drenagem nasal, seios paranasais e relações com a nasofaringe.'}
    ],
    items:[
      {n:46,name:'Ducto lacrimonasal',status:'parcial',note:'A prancha demonstra a abertura do ducto nasolacrimal no meato inferior; o trajeto completo pode ser complementado pelo aluno.'},
      {n:47,name:'Ducto frontonasal'},{n:48,name:'Bolha etmoidal'},{n:49,name:'Hiato semilunar'},{n:50,name:'Abertura do seio maxilar'}
    ]
  },
  {
    id:11, range:'51–55', group:'Faringe', title:'Recesso esfenoetmoidal e partes da faringe', coverage:'completo',
    images:[
      {src:'assets/images/bl11-recesso-esfenoetmoidal.webp', alt:'Corte mediano com recesso esfenoetmoidal e parte nasal da faringe', caption:'Recesso esfenoetmoidal e nasofaringe.'},
      {src:'assets/images/bl11-faringe-partes.webp', alt:'Vista posterior da faringe com partes nasal, oral e laríngea', caption:'Faringe — partes nasal, oral e laríngea.'},
      {src:'assets/images/bl11-tuba-toro-salpingofaringea.webp', alt:'Dissecção da nasofaringe mostrando óstio faríngeo da tuba auditiva, toro tubário, prega salpingofaríngea e recesso faríngeo', caption:'Peça anatômica — óstio da tuba auditiva, toro tubário, prega salpingofaríngea e recesso faríngeo.'}
    ],
    items:[
      {n:51,name:'Recesso esfenoetmoidal'},
      {n:52,name:'Parte nasal da faringe',subs:['Óstio faríngeo da tuba auditiva','Toro tubário','Prega salpingofaríngea','Prega salpingopalatina','Tonsila faríngea','Tonsila tubária']},
      {n:53,name:'Parte oral da faringe'},{n:54,name:'Úvula palatina'},{n:55,name:'Parte laríngea da faringe',subs:['Recesso piriforme']}
    ]
  },
  {
    id:12, range:'56–60', group:'Faringe', title:'Músculos da faringe', coverage:'completo',
    images:[
      {src:'assets/images/bl12-musculos-faringe.webp', alt:'Músculos da faringe em vista posterior e lateral', caption:'Constritores e estilofaríngeo.'},
      {src:'assets/images/bl12-palatofaringeo-estilofaringeo.webp', alt:'Parede posterior da faringe com palatofaríngeo e estilofaríngeo', caption:'Palatofaríngeo e estilofaríngeo.'},
      {src:'assets/images/bl12-constritores-estilofaringeo-cadaver.webp', alt:'Dissecção posterior da faringe mostrando constritores superior, médio e inferior e músculo estilofaríngeo', caption:'Peça anatômica — constritores da faringe e músculo estilofaríngeo.'}
    ],
    items:[
      {n:56,name:'m. Constritor superior da faringe'},{n:57,name:'m. Constritor médio da faringe'},{n:58,name:'m. Constritor inferior da faringe'},{n:59,name:'m. Estilofaríngeo'},{n:60,name:'m. Palatofaríngeo'}
    ]
  },
  {
    id:13, range:'61–65', group:'Laringe', title:'Salpingofaríngeo e cavidade da laringe', coverage:'completo',
    images:[
      {src:'assets/images/bl13-adito-pregas-ventriculo.webp', alt:'Laringe com ádito, prega vestibular e ventrículo', caption:'Ádito, prega vestibular e ventrículo da laringe.'},
      {src:'assets/images/bl13-musculo-ariepiglotico.webp', alt:'Dissecção dos músculos laríngeos com músculo ariepiglótico', caption:'Músculo ariepiglótico.'},
      {src:'assets/images/bl13-vestibulo-laringe.webp', alt:'Corte sagital da laringe com vestíbulo identificado', caption:'Vestíbulo da laringe.'},
      {src:'assets/images/bl12-palatofaringeo-estilofaringeo.webp', alt:'Parede posterior da faringe mostrando salpingofaríngeo', caption:'Salpingofaríngeo e relações faríngeas.'}
    ],
    items:[
      {n:61,name:'m. Salpingofaríngeo'},
      {n:62,name:'Ádito da laringe',subs:['Prega ariepiglótica','Músculo ariepiglótico']},
      {n:63,name:'Vestíbulo da laringe'},{n:64,name:'Prega vestibular'},{n:65,name:'Ventrículo da laringe'}
    ]
  },
  {
    id:14, range:'66–70', group:'Laringe', title:'Glote, cavidade infraglótica e cartilagens', coverage:'completo',
    images:[
      {src:'assets/images/bl14-cavidade-infraglotica.webp', alt:'Corte da laringe com cavidade infraglótica e pregas vocais', caption:'Prega vocal, glote e cavidade infraglótica.'},
      {src:'assets/images/bl14-cartilagens-laringe.webp', alt:'Prancha das cartilagens tireoidea e cricoidea com ligamentos e articulações', caption:'Cartilagens tireoidea e cricoidea — vistas lateral, posterior e superior.'},
      {src:'assets/images/bl14-tireoidea-posicao-laringe.jpg', alt:'Cartilagem tireoidea em vistas lateral e anterior e esquema da posição da laringe e do hioide no pescoço', caption:'Cartilagem tireoidea e posição da laringe/hioide no pescoço.'}
    ],
    items:[
      {n:66,name:'Prega vocal'},{n:67,name:'Glote'},{n:68,name:'Cavidade infraglótica'},
      {n:69,name:'Cartilagem tireoidea',subs:['Lâmina direita da cartilagem tireoidea','Lâmina esquerda da cartilagem tireoidea','Proeminência laríngea','Incisura tireoidea superior','Incisura tireoidea inferior','Corno superior da cartilagem tireoidea','Corno inferior da cartilagem tireoidea','Linha oblíqua','Membrana tireo-hioidea','Ligamento tireo-hioideo mediano','Ligamento tireo-hioideo lateral']},
      {n:70,name:'Cartilagem cricoidea',subs:['Arco da cartilagem cricoidea','Lâmina da cartilagem cricoidea','Ligamento cricotireoideo mediano','Ligamento cricotraqueal','Articulação cricotireoidea','Articulação cricoaritenoidea']}
    ]
  },
  {
    id:15, range:'71–75', group:'Laringe', title:'Epiglote, aritenoides e supra-hioideos', coverage:'completo',
    images:[
      {src:'assets/images/bl15-epiglote-pregas-valecula.webp', alt:'Epiglote com pregas glossoepiglóticas, valécula, corniculada e cuneiforme', caption:'Epiglote, pregas glossoepiglóticas, valécula, corniculada e cuneiforme.'},
      {src:'assets/images/bl15-aritenoide-ligamentos.webp', alt:'Laringe em vistas internas com cartilagens aritenoideas e ligamentos', caption:'Cartilagens aritenoideas e ligamentos.'},
      {src:'assets/images/bl15-gordura-pre-epiglotica.webp', alt:'Esquema da laringe mostrando gordura pré-epiglótica', caption:'Corpo adiposo pré-epiglótico.'},
      {src:'assets/images/bl15-supra-hioideos.webp', alt:'Dissecção lateral mostrando músculos supra-hioideos', caption:'Músculos supra-hioideos.'}
    ],
    items:[
      {n:71,name:'Cartilagem epiglótica (epiglote)',subs:['Corpo adiposo pré-epiglótico','Pecíolo epiglótico','Ligamento tireoepiglótico','Ligamento hioepiglótico','Prega glossoepiglótica mediana','Prega glossoepiglótica lateral','Valécula epiglótica']},
      {n:72,name:'Cartilagem aritenoidea',subs:['Processo muscular da cartilagem aritenoidea','Processo vocal da cartilagem aritenoidea','Base da cartilagem aritenoidea']},
      {n:73,name:'Cartilagem corniculada'},{n:74,name:'Cartilagem cuneiforme'},
      {n:75,name:'Mm. Supra-hioideos',subs:['m. Digástrico (ventres anterior e posterior)','m. Milo-hioideo','m. Gênio-hioideo','m. Estilo-hioideo']}
    ]
  },
  {
    id:16, range:'76–80', group:'Laringe', title:'Infra-hioideos e músculo cricotireoideo', coverage:'completo',
    images:[
      {src:'assets/images/bl16-infra-hioideos.webp', alt:'Dissecção anterior do pescoço mostrando músculos infra-hioideos', caption:'Músculos infra-hioideos.'},
      {src:'assets/images/bl16-estilo-palato-faringeo.webp', alt:'Parede posterior da faringe com estilofaríngeo e palatofaríngeo', caption:'Estilofaríngeo e palatofaríngeo.'},
      {src:'assets/images/bl16-cricotireoideo.webp', alt:'Prancha laríngea com músculo cricotireoideo', caption:'Músculo cricotireoideo — partes reta e oblíqua.'}
    ],
    items:[
      {n:76,name:'Mm. Infra-hioideos',subs:['m. Esterno-hioideo','m. Esterno-tireoideo','m. Tireo-hioideo','m. Omo-hioideo']},
      {n:77,name:'m. Estilo-faríngeo'},{n:78,name:'m. Palato-faríngeo'},{n:79,name:'m. Cricotireoideo – parte oblíqua'},{n:80,name:'m. Cricotireoideo – parte reta'}
    ]
  },
  {
    id:17, range:'81–85', group:'Laringe', title:'Músculos intrínsecos da laringe', coverage:'completo',
    images:[
      {src:'assets/images/bl17-musculos-intrinsecos.webp', alt:'Dissecção posterolateral da laringe com músculos intrínsecos identificados', caption:'Cricoaritenoideos, aritenoideos e tireoaritenoideo.'},
      {src:'assets/images/bl17-musculos-laringe.webp', alt:'Prancha de músculos da laringe em vistas lateral, anterior e posterior', caption:'Músculos intrínsecos — vistas complementares.'},
      {src:'assets/images/bl17-laringe-musculos-vistas.jpg', alt:'Prancha adicional dos músculos da laringe com vistas laterais, anterior e ação dos músculos internos', caption:'Músculos da laringe — vistas laterais adicionais e ação dos músculos internos.'}
    ],
    items:[
      {n:81,name:'m. Cricoaritenoideo lateral'},{n:82,name:'m. Cricoaritenoideo posterior'},{n:83,name:'m. Aritenoideo transverso'},{n:84,name:'m. Aritenoideo oblíquo'},{n:85,name:'m. Tireoaritenoideo'}
    ]
  },
  {
    id:18, range:'86–90', group:'Traqueia', title:'Tireoepiglótico, vocal e traqueia', coverage:'completo',
    images:[
      {src:'assets/images/bl18-tireoepiglotico-vocal.webp', alt:'Vista lateral da laringe com tireoepiglótico e tireoaritenoideo', caption:'Músculos tireoepiglótico e vocal — relações laterais.'},
      {src:'assets/images/bl18-traqueia-bifurcacao.webp', alt:'Esquema da traqueia com cartilagens, bifurcação e carina', caption:'Cartilagens traqueais, ligamentos intercartilaginosos e bifurcação.'}
    ],
    items:[
      {n:86,name:'m. Tireoepiglótico'},{n:87,name:'m. Vocal'},{n:88,name:'Cartilagens traqueais'},{n:89,name:'Ligamentos anulares'},{n:90,name:'Bifurcação da traqueia'}
    ]
  },
  {
    id:19, range:'91–92', group:'Traqueia', title:'Carina e parede membranácea', coverage:'completo',
    images:[
      {src:'assets/images/bl18-traqueia-bifurcacao.webp', alt:'Traqueia e brônquios principais com carina', caption:'Carina da traqueia.'},
      {src:'assets/images/bl19-parede-membranacea.webp', alt:'Vista posterior da traqueia com parede membranácea identificada', caption:'Parede membranácea da traqueia.'},
      {src:'assets/images/pulmoes-lateral-medial.jpg', alt:'Pulmões direito e esquerdo em vistas lateral e medial, com lobos, fissuras e hilo pulmonar', caption:'Pulmões — vistas lateral e medial como complemento anatômico das relações da carina e dos brônquios principais.'}
    ],
    items:[{n:91,name:'Carina da traqueia'},{n:92,name:'Parede membranácea'}]
  }
];

const GROUPS = ['Todos','Nariz','Faringe','Laringe','Traqueia'];

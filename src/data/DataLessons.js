const dataLessons = [
  // MATEMATIKA (courseId: 1)
  {
    id: 1,
    courseId: 1,
    title: "Počítání do 20",
    description: "Sčítání a odčítání pro nejmenší, hravá forma výuky",
    price: "300 Kč",
    duration: "1 hodina",
    startDate: "2026-03-10",
    capacity: 15,
    ageMin: 6,
    ageMax: 8
  },
  {
    id: 2,
    courseId: 1,
    title: "Násobilka",
    description: "Naučíme se násobilku zábavnou formou pomocí her",
    price: "350 Kč",
    duration: "1.5 hodiny",
    startDate: "2026-03-12",
    capacity: 15,
    ageMin: 8,
    ageMax: 10
  },
  {
    id: 3,
    courseId: 1,
    title: "Zlomky a procenta",
    description: "Práce se zlomky, procenty, základy poměrů",
    price: "400 Kč",
    duration: "2 hodiny",
    startDate: "2026-03-15",
    capacity: 12,
    ageMin: 11,
    ageMax: 14
  },
  {
    id: 4,
    courseId: 1,
    title: "Algebra - rovnice",
    description: "Řešení lineárních a kvadratických rovnic",
    price: "500 Kč",
    duration: "2 hodiny",
    startDate: "2026-03-18",
    capacity: 12,
    ageMin: 14,
    ageMax: 18
  },
  {
    id: 5,
    courseId: 1,
    title: "Vyšší matematika",
    description: "Derivace, integrály, limity pro studenty VŠ",
    price: "700 Kč",
    duration: "3 hodiny",
    startDate: "2026-03-22",
    capacity: 10,
    ageMin: 18,
    ageMax: 99
  },

  //PROGRAMOVÁNÍ (courseId: 2) 
  {
    id: 6,
    courseId: 2,
    title: "Scratch - programování pro děti",
    description: "První kroky v programování pomocí bloků",
    price: "350 Kč",
    duration: "1.5 hodiny",
    startDate: "2026-03-11",
    capacity: 12,
    ageMin: 8,
    ageMax: 12
  },
  {
    id: 7,
    courseId: 2,
    title: "Python základy",
    description: "Úvod do Pythonu, proměnné, podmínky, cykly",
    price: "500 Kč",
    duration: "2 hodiny",
    startDate: "2026-03-14",
    capacity: 10,
    ageMin: 12,
    ageMax: 16
  },
  {
    id: 8,
    courseId: 2,
    title: "JavaScript a tvorba webu",
    description: "HTML, CSS, JavaScript pro začátečníky",
    price: "600 Kč",
    duration: "2.5 hodiny",
    startDate: "2026-03-17",
    capacity: 10,
    ageMin: 14,
    ageMax: 99
  },
  {
    id: 9,
    courseId: 2,
    title: "Python pokročilý",
    description: "OOP, dekorátory, generátory, async",
    price: "800 Kč",
    duration: "3 hodiny",
    startDate: "2026-03-20",
    capacity: 8,
    ageMin: 16,
    ageMax: 99
  },

  //ČEŠTINA (courseId: 3)
  {
    id: 10,
    courseId: 3,
    title: "Čtení a psaní pro prvňáčky",
    description: "Naučíme se číst a psát první písmena a slova",
    price: "300 Kč",
    duration: "1 hodina",
    startDate: "2026-03-09",
    capacity: 20,
    ageMin: 6,
    ageMax: 8
  },
  {
    id: 11,
    courseId: 3,
    title: "Gramatika - pády",
    description: "Skloňování podstatných jmen, 7 pádů",
    price: "350 Kč",
    duration: "1.5 hodiny",
    startDate: "2026-03-13",
    capacity: 18,
    ageMin: 9,
    ageMax: 12
  },
  {
    id: 12,
    courseId: 3,
    title: "Sloh - vypravování",
    description: "Jak napsat poutavé vyprávění a popis",
    price: "400 Kč",
    duration: "2 hodiny",
    startDate: "2026-03-16",
    capacity: 15,
    ageMin: 10,
    ageMax: 14
  },
  {
    id: 13,
    courseId: 3,
    title: "Literatura - rozbor díla",
    description: "Analýza literárních děl, stylistika",
    price: "450 Kč",
    duration: "2 hodiny",
    startDate: "2026-03-19",
    capacity: 12,
    ageMin: 14,
    ageMax: 18
  },

  // ANGLIČTINA (courseId: 4)
  {
    id: 14,
    courseId: 4,
    title: "Angličtina pro nejmenší",
    description: "První anglická slůvka, barvy, zvířata, čísla",
    price: "300 Kč",
    duration: "1 hodina",
    startDate: "2026-03-11",
    capacity: 18,
    ageMin: 6,
    ageMax: 9
  },
  {
    id: 15,
    courseId: 4,
    title: "Základní konverzace",
    description: "Představení se, základní fráze, slovní zásoba",
    price: "400 Kč",
    duration: "1.5 hodiny",
    startDate: "2026-03-14",
    capacity: 15,
    ageMin: 10,
    ageMax: 14
  },
  {
    id: 16,
    courseId: 4,
    title: "Anglická gramatika",
    description: "Časy, podmínkové věty, trpný rod",
    price: "500 Kč",
    duration: "2 hodiny",
    startDate: "2026-03-18",
    capacity: 12,
    ageMin: 13,
    ageMax: 18
  },
  {
    id: 17,
    courseId: 4,
    title: "Business English",
    description: "Obchodní angličtina, psaní emailů, prezentace",
    price: "700 Kč",
    duration: "2 hodiny",
    startDate: "2026-03-21",
    capacity: 10,
    ageMin: 18,
    ageMax: 99
  },

  //DATABÁZE (courseId: 5)
  {
    id: 18,
    courseId: 5,
    title: "Úvod do databází",
    description: "Co jsou databáze, tabulky, základní koncepty",
    price: "500 Kč",
    duration: "2 hodiny",
    startDate: "2026-04-01",
    capacity: 10,
    ageMin: 15,
    ageMax: 99
  },
  {
    id: 19,
    courseId: 5,
    title: "SQL dotazy",
    description: "SELECT, WHERE, JOIN, agregační funkce",
    price: "600 Kč",
    duration: "2.5 hodiny",
    startDate: "2026-04-05",
    capacity: 8,
    ageMin: 16,
    ageMax: 99
  },
  {
    id: 20,
    courseId: 5,
    title: "Návrh databází",
    description: "ER diagramy, normalizace, vztahy mezi tabulkami",
    price: "700 Kč",
    duration: "3 hodiny",
    startDate: "2026-04-08",
    capacity: 8,
    ageMin: 17,
    ageMax: 99
  },

  //ZEMĚPIS (courseId: 6)
  {
    id: 21,
    courseId: 6,
    title: "Kontinenty a oceány",
    description: "Poznejte základní geografii světa",
    price: "300 Kč",
    duration: "1.5 hodiny",
    startDate: "2026-03-20",
    capacity: 25,
    ageMin: 8,
    ageMax: 12
  },
  {
    id: 22,
    courseId: 6,
    title: "Evropa a její hlavní města",
    description: "Státy Evropy, jejich hlavní města a zajímavosti",
    price: "350 Kč",
    duration: "1.5 hodiny",
    startDate: "2026-03-24",
    capacity: 25,
    ageMin: 10,
    ageMax: 14
  },
  {
    id: 23,
    courseId: 6,
    title: "Klima a podnebí",
    description: "Klimatické pásy, počasí, přírodní jevy",
    price: "400 Kč",
    duration: "2 hodiny",
    startDate: "2026-03-27",
    capacity: 20,
    ageMin: 12,
    ageMax: 16
  },

  //SPRÁVA POČÍTAČOVÝCH SÍTÍ (courseId: 7)
  {
    id: 24,
    courseId: 7,
    title: "Základy počítačových sítí",
    description: "IP adresy, routery, switche, základní terminologie",
    price: "700 Kč",
    duration: "2.5 hodiny",
    startDate: "2026-04-05",
    capacity: 8,
    ageMin: 16,
    ageMax: 99
  },
  {
    id: 25,
    courseId: 7,
    title: "Linux pro správce sítí",
    description: "Příkazová řádka, konfigurace, bash skripty",
    price: "800 Kč",
    duration: "3 hodiny",
    startDate: "2026-04-09",
    capacity: 6,
    ageMin: 17,
    ageMax: 99
  },
  {
    id: 26,
    courseId: 7,
    title: "Windows Server administrace",
    description: "Active Directory, Group Policy, správa serverů",
    price: "850 Kč",
    duration: "3 hodiny",
    startDate: "2026-04-12",
    capacity: 6,
    ageMin: 18,
    ageMax: 99
  },

  //DĚJEPIS (courseId: 8)
  {
    id: 27,
    courseId: 8,
    title: "Pravěk a starověk",
    description: "Vývoj člověka, Egypt, Řecko, Řím",
    price: "350 Kč",
    duration: "1.5 hodiny",
    startDate: "2026-03-25",
    capacity: 20,
    ageMin: 10,
    ageMax: 14
  },
  {
    id: 28,
    courseId: 8,
    title: "Středověk",
    description: "Rytíři, hrady, křížové výpravy, husitství",
    price: "400 Kč",
    duration: "2 hodiny",
    startDate: "2026-03-28",
    capacity: 18,
    ageMin: 12,
    ageMax: 16
  },
  {
    id: 29,
    courseId: 8,
    title: "Světové války",
    description: "1. a 2. světová válka, příčiny a důsledky",
    price: "450 Kč",
    duration: "2 hodiny",
    startDate: "2026-04-02",
    capacity: 15,
    ageMin: 14,
    ageMax: 18
  },

  // FYZIKA (courseId: 9)
  {
    id: 30,
    courseId: 9,
    title: "Fyzikální veličiny",
    description: "Hmotnost, objem, hustota, síla - základy",
    price: "400 Kč",
    duration: "2 hodiny",
    startDate: "2026-04-10",
    capacity: 14,
    ageMin: 12,
    ageMax: 15
  },
  {
    id: 31,
    courseId: 9,
    title: "Mechanika",
    description: "Pohyb, rychlost, zrychlení, Newtonovy zákony",
    price: "500 Kč",
    duration: "2 hodiny",
    startDate: "2026-04-14",
    capacity: 12,
    ageMin: 14,
    ageMax: 18
  },
  {
    id: 32,
    courseId: 9,
    title: "Elektřina a magnetismus",
    description: "Elektrický proud, obvody, Ohmův zákon",
    price: "550 Kč",
    duration: "2.5 hodiny",
    startDate: "2026-04-17",
    capacity: 10,
    ageMin: 15,
    ageMax: 18
  },

  // CHEMIE (courseId: 10)
  {
    id: 33,
    courseId: 10,
    title: "Základy chemie",
    description: "Atomy, molekuly, chemické prvky, periodická tabulka",
    price: "400 Kč",
    duration: "2 hodiny",
    startDate: "2026-04-15",
    capacity: 14,
    ageMin: 13,
    ageMax: 16
  },
  {
    id: 34,
    courseId: 10,
    title: "Anorganická chemie",
    description: "Kyseliny, zásady, soli, chemické reakce",
    price: "500 Kč",
    duration: "2 hodiny",
    startDate: "2026-04-19",
    capacity: 12,
    ageMin: 14,
    ageMax: 18
  },
  {
    id: 35,
    courseId: 10,
    title: "Organická chemie",
    description: "Uhlovodíky, alkoholy, kyseliny, sloučeniny uhlíku",
    price: "550 Kč",
    duration: "2.5 hodiny",
    startDate: "2026-04-22",
    capacity: 10,
    ageMin: 15,
    ageMax: 18
  }
];

export default dataLessons;
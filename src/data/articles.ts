export type Article = {
  slug: string;
  title: string;
  h1?: string;
  seoTitle?: string;
  metaDescription?: string;
  tag: string;
  date: string;
  publishedAtIso?: string;
  updatedAt?: string;
  updatedAtIso?: string;
  excerpt: string;
  body: string;
  image: string;
  imageAlt?: string;
  authorName?: string;
  reviewerName?: string;
  reviewedAt?: string;
  targetQuery?: string;
  summary?: string;
  keyTakeaways?: string[];
  sections?: ArticleSection[];
  faq?: ArticleFaq[];
  sources?: ArticleSource[];
  cta?: {
    title?: string;
    body?: string;
    bullets?: string[];
    note?: string;
    label: string;
    href: string;
  };
};

export type ArticleSection = {
  id: string;
  title: string;
  body?: string[];
  bullets?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
};

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type ArticleSource = {
  title: string;
  publisher: string;
  url: string;
};

export const articles: Article[] = [
  {
    slug: "hostblasor-barn-symtom-smitta",
    title: "Höstblåsor hos barn – symtom, smitta och när du söker vård",
    h1: "Höstblåsor hos barn: symtom, smitta och vårdråd",
    seoTitle: "Höstblåsor hos barn: symtom, smitta och råd",
    metaDescription: "Höstblåsor ger ofta feber och blåsor i mun, på händer och fötter. Läs om smitta, lindring, förskola och när ditt barn behöver söka vård i tid.",
    tag: "BARNHÄLSA",
    date: "september 14, 2026",
    publishedAtIso: "2026-09-14",
    image: "/bilder/artiklar/hostblasor-barn.webp",
    imageAlt: "Neutral illustration av ett barns hand och fot bredvid vatten och kall mat vid höstblåsor.",
    authorName: "Hemläkare.se redaktion",
    targetQuery: "höstblåsor hos barn",
    excerpt: "Höstblåsor är en vanlig virusinfektion hos barn som oftast går över inom en vecka. Så känner du igen symtomen, lindrar besvären och vet när vård behövs.",
    summary: "Höstblåsor hos barn börjar ofta med feber och halsont, följt av ömma blåsor i munnen och utslag eller blåsor på händer och fötter. Infektionen är oftast lindrig och läker av sig själv inom ungefär en vecka. Det viktigaste hemma är att barnet får i sig vätska. Kontakta vårdcentral om febern varar mer än fyra dagar, besvären inte avtar inom sju till tio dagar eller barnet har svårt att dricka.",
    keyTakeaways: [
      "Höstblåsor orsakas av enterovirus och är vanligast under sensommaren och tidig höst.",
      "Typiska symtom är feber, halsont och blåsor i munnen, på händerna och på fötterna.",
      "Kall dryck och mjuk, sval mat kan göra det lättare att få i sig vätska och energi.",
      "Barnet kan återgå till förskola eller skola när det orkar delta och har varit feberfritt ett dygn utan febernedsättande.",
      "Sök vård om barnet inte får i sig vätska, har feber längre än fyra dagar eller inte blir bättre inom sju till tio dagar."
    ],
    body: "Höstblåsor hos barn är en virusinfektion som även kallas hand-, fot- och munsjuka. Namnet beskriver var utslagen ofta sitter: i och runt munnen samt på händer och fötter. Sjukdomen drabbar framför allt barn under tio år och förekommer oftast under sensommaren och tidig höst. Även vuxna kan smittas, men det är mindre vanligt.\n\nDe flesta barn blir friska utan särskild behandling. Besvären i munnen kan däremot göra det svårt att äta och dricka. Håll därför särskilt koll på vätskeintaget och på hur barnet mår i övrigt. Utslag kan ha olika färg beroende på hudton, och placeringen är ofta mer vägledande än färgen. Generell information kan inte ersätta en individuell medicinsk bedömning om du är orolig för barnet.",
    sections: [
      {
        id: "symtom-hostblasor-barn",
        title: "Symtom på höstblåsor hos barn",
        body: [
          "Höstblåsor börjar ofta med måttlig feber, halsont, huvudvärk eller förkylningsliknande besvär under ett par dagar. Därefter brukar små röda utslag och blåsor komma i munnen och på huden. Blåsorna i munnen kan sitta på läpparnas insida, kinderna, tungan, gommen eller i svalget och kan göra ont.",
          "På huden syns utslagen oftast på handflator och fotsulor, men de kan också finnas på andra delar av kroppen. De kan klia och behöver inte alltid bli tydligt vätskefyllda. På mörkare hud kan utslagen se mörkare ut än den omgivande huden i stället för klarröda."
        ],
        bullets: [
          "Feber och halsont före eller samtidigt med utslagen.",
          "Smärtsamma blåsor eller små sår i munnen.",
          "Prickar eller blåsor på händer och fötter, ibland även på andra hudområden.",
          "Minskad aptit eller svårigheter att dricka på grund av ont i munnen.",
          "Ibland klåda, illamående eller trötthet."
        ]
      },
      {
        id: "orsak-och-smitta",
        title: "Orsak och hur höstblåsor smittar",
        body: [
          "Höstblåsor orsakas av virus i enterovirusgruppen. Smittan sprids framför allt vid nära kontakt. Virus kan finnas i saliv, luftvägssekret, vätska från blåsor och avföring och kan även spridas via händer, föremål, mat eller vatten som förorenats.",
          "Tiden från smitta till symtom är ofta tre till sju dagar. Smittsamheten är störst tidigt i sjukdomsförloppet, och personer utan symtom kan också föra viruset vidare. Därför har smittan ofta redan hunnit spridas när blåsorna upptäcks i en barngrupp. God handhygien, särskilt efter toalettbesök och blöjbyte, minskar risken för vidare spridning."
        ]
      },
      {
        id: "skillnad-andra-utslag",
        title: "Höstblåsor, vattkoppor eller svinkoppor?",
        body: [
          "Flera vanliga barninfektioner kan ge blåsor. Vid höstblåsor är kombinationen av sår i munnen och utslag på handflator och fotsulor typisk. Vattkoppor ger oftare många kliande blåsor som kommer i omgångar och sprids över stora delar av kroppen. Svinkoppor är en bakterieinfektion som ofta börjar runt mun eller näsa och kan ge gulaktiga, honungsfärgade skorpor.",
          "Det går inte alltid att avgöra orsaken säkert hemma. Sök bedömning om utslagen är svårtolkade, snabbt försämras, blir variga eller om barnet verkar tydligt påverkat."
        ],
        table: {
          headers: ["Tillstånd", "Typiskt mönster", "Viktig skillnad"],
          rows: [
            ["Höstblåsor", "Blåsor i munnen samt på händer och fötter.", "Ofta feber först och ont i munnen."],
            ["Vattkoppor", "Kliande blåsor som kan spridas över hela kroppen.", "Utslagen kommer ofta i flera omgångar."],
            ["Svinkoppor", "Blåsor eller sår, ofta kring mun och näsa.", "Gulaktiga skorpor och lokal spridning är vanligt."]
          ]
        }
      },
      {
        id: "lindra-hemma",
        title: "Så kan du lindra besvären hemma",
        body: [
          "Det finns ingen särskild behandling som tar bort höstblåsor. Målet är i stället att lindra smärtan och hjälpa barnet att dricka. Erbjud små mängder vätska ofta. Sval dryck, yoghurt eller glass kan vara lättare att få i sig när det gör ont i munnen. Sur, salt eller stark mat kan svida och är bra att undvika så länge munnen är öm.",
          "Receptfria smärtstillande läkemedel kan ibland behövas. Följ alltid anvisningarna på förpackningen och välj preparat utifrån barnets ålder och vikt. Ring 1177 eller kontakta vårdcentral innan du ger läkemedel till barn yngre än sex månader."
        ],
        bullets: [
          "Erbjud vatten eller annan lämplig dryck ofta, gärna svalt.",
          "Välj mjuk och sval mat som inte svider i munnen.",
          "Låt barnet vila men följ allmäntillståndet och vätskeintaget.",
          "Tvätta händerna noggrant med tvål och vatten.",
          "Dela inte glas, bestick eller handdukar under den akuta sjukdomstiden."
        ]
      },
      {
        id: "forskola-skola",
        title: "När kan barnet gå tillbaka till förskola eller skola?",
        body: [
          "Barnet behöver inte vara hemma tills alla blåsor har försvunnit. Eftersom smittan ofta sprids innan utslagen syns går det sällan att stoppa ett utbrott genom att isolera barn som har kvar blåsor.",
          "Barnet kan återgå när det orkar vara med i gruppens vanliga aktiviteter hela dagen och har varit feberfritt i ett dygn utan febernedsättande läkemedel. Förskolans eller skolans vanliga rutiner vid infektion gäller också."
        ]
      },
      {
        id: "nar-soka-vard",
        title: "När ska du söka vård för höstblåsor?",
        body: [
          "De flesta behöver inte undersökas av vården. Kontakta vårdcentral om barnet har feber i mer än fyra dagar, om symtomen inte avtar inom sju till tio dagar eller om barnet har svårt att få i sig vätska. Ring 1177 om du är osäker på hur bråttom det är eller vart du ska vända dig.",
          "Sök vård skyndsamt om barnet blir påtagligt slött, kissar mycket mindre än vanligt eller visar andra tecken på vätskebrist. Allvarliga komplikationer är ovanliga. Ring 112 vid livshotande tillstånd, exempelvis om barnet är medvetslöst, får svåra andningsbesvär eller ett pågående krampanfall."
        ],
        bullets: [
          "Barnet har svårt att dricka eller får inte behålla vätska.",
          "Barnet kissar tydligt mindre, är torrt i munnen eller ovanligt trött.",
          "Febern varar längre än fyra dagar.",
          "Besvären minskar inte inom sju till tio dagar.",
          "Utslagen blir variga, mycket ömma eller snabbt mer utbredda."
        ]
      },
      {
        id: "naglar-efterat",
        title: "Om en nagel lossnar efter infektionen",
        body: [
          "Ibland kan en nagel börja lossna några veckor efter att barnet har haft höstblåsor, särskilt om det fanns blåsor under nageln. Det kan se oroande ut men den nationella vägledningen beskriver att en ny nagel växer ut. Kontakta vården om området blir rött, svullet, varigt eller mycket smärtsamt, eller om du är osäker på orsaken."
        ]
      }
    ],
    faq: [
      {
        question: "Hur länge varar höstblåsor hos barn?",
        answer: "De flesta barn tillfrisknar inom ungefär en vecka. Kontakta vårdcentral om symtomen inte avtar inom sju till tio dagar."
      },
      {
        question: "Hur länge smittar höstblåsor?",
        answer: "Smittsamheten är störst under de första sjukdomsdagarna, men virus kan finnas kvar längre i bland annat avföring. God handhygien är därför viktig även när barnet har blivit bättre."
      },
      {
        question: "Måste barnet vara hemma tills blåsorna är borta?",
        answer: "Nej. Barnet kan återgå när det orkar delta i verksamheten hela dagen och har varit feberfritt i ett dygn utan febernedsättande läkemedel."
      },
      {
        question: "Kan vuxna få höstblåsor?",
        answer: "Ja, men det är mindre vanligt än hos barn. Vuxna kan få liknande symtom med feber, ont i munnen och utslag på händer och fötter."
      },
      {
        question: "Kan man få höstblåsor flera gånger?",
        answer: "Ja. Flera olika enterovirus kan orsaka höstblåsor, så en genomgången infektion ger inte säkert skydd mot alla framtida infektioner."
      },
      {
        question: "Finns det vaccin eller antibiotika mot höstblåsor?",
        answer: "Nej. Höstblåsor orsakas av virus, och det finns inget vaccin eller någon särskild antiviral behandling mot infektionen. Antibiotika hjälper inte mot virus."
      }
    ],
    sources: [
      {
        title: "Höstblåsor",
        publisher: "1177",
        url: "https://www.1177.se/sjukdomar--besvar/hud-har-och-naglar/infektioner-pa-huden/hostblasor/"
      },
      {
        title: "Höstblåsor – kliniskt kunskapsstöd",
        publisher: "1177 för vårdpersonal",
        url: "https://vardpersonal.1177.se/kunskapsstod/kliniska-kunskapsstod/hostblasor/"
      },
      {
        title: "Sjukdomsinformation om enterovirusinfektion",
        publisher: "Folkhälsomyndigheten",
        url: "https://www.folkhalsomyndigheten.se/vara-amnesomraden/smittsamma-sjukdomar/smittsam-sjukdom/sjukdomsinformation-om-enterovirusinfektion/"
      },
      {
        title: "Vattkoppor",
        publisher: "1177",
        url: "https://www.1177.se/sjukdomar--besvar/hud-har-och-naglar/infektioner-pa-huden/vattkoppor/"
      },
      {
        title: "Svinkoppor – impetigo",
        publisher: "1177",
        url: "https://www.1177.se/sjukdomar--besvar/hud-har-och-naglar/infektioner-pa-huden/svinkoppor---impetigo/"
      }
    ],
    cta: {
      title: "Behöver ditt barn en medicinsk bedömning?",
      body: "Läs vår guide om barn- och ungdomshälsa för information om vanliga besvär och vilket nästa vårdsteg som kan vara lämpligt.",
      bullets: [
        "Råd om vanliga symtom hos barn",
        "Vägledning om när vård bör kontaktas",
        "Information för föräldrar och vårdnadshavare"
      ],
      note: "Vid osäkerhet kan du ringa 1177.",
      label: "Läs om barn- och ungdomshälsa",
      href: "/vardguiden/barn-ungdomshalsa"
    }
  },
  {
    slug: "testartikel-publiceringsflode-2026-09-14",
    title: "Testartikel: automatiserat publiceringsflöde",
    tag: "TEST",
    date: "september 14, 2026",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Detta är en tydligt märkt testartikel som verifierar publiceringsflödet från GitHub till Hemläkare.se.",
    body: "Detta är en testartikel utan medicinskt innehåll. Den har skapats för att verifiera att en ändring i GitHub-repots main-branch automatiskt byggs och publiceras i produktion av Vercel. Inga befintliga artiklar eller sidor har ändrats i testet.",
  },
  {
    slug: "vanligaste-orsakerna-januari-2026",
    title: "De vanligaste orsakerna till att svenskar sökte vård i januari 2026",
    tag: "VÅRDNYTT",
    date: "januari 27, 2026",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Januari är traditionellt en av årets mest intensiva månader. Här är vad som driver flest till vården.",
    body: "Januari är traditionellt en av årets mest intensiva månader hos Hemläkare.se. När helgerna är över söker många vård för både akuta besvär och sådant som lagts på is under julen. De vanligaste orsakerna inkluderar förkylning, influensa, magsjuka och stressrelaterade besvär. Vi finns här för dig — digitalt och fysiskt, på dina villkor.",
  },
  {
    slug: "anhorigveckan-solna",
    title: "Anhörigvecka i Solna",
    tag: "SOLNA",
    date: "september 9, 2025",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Anhörigveckan äger rum 29 september–3 oktober i Solna. Välkommen att delta.",
    body: "Mellan 29 september – fredag 3 oktober kommer Anhörigveckan i Solna ta plats. I samband med internationella Anhörigdagen, som infaller söndag 6 oktober, uppmärksammar vi alla som vårdar en närstående. Välkommen att delta i våra digitala aktiviteter under veckan.",
  },
  {
    slug: "semester-och-recept",
    title: "Semester och recept – det här bör du ha koll på",
    tag: "LÄKEMEDEL",
    date: "juli 9, 2025",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Ska du resa i sommar? Här är vad du behöver tänka på kring dina läkemedel.",
    body: "Ska du resa i sommar – inom Sverige eller utomlands? Här är några saker att tänka på när det gäller dina läkemedel. Se till att ha tillräckligt med medicin för hela resan, ta reda på reglerna för ditt resmål och kontakta oss online om du behöver förnya ett recept innan avresa.",
  },
  {
    slug: "hosta-som-inte-gar-over",
    title: "Hosta som inte går över – när ska du söka vård?",
    tag: "SYMTOM",
    date: "mars 12, 2026",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "En hosta som varar mer än tre veckor kan vara ett tecken på något som behöver utredas.",
    body: "De flesta hostattacker är ofarliga och går över av sig själva inom 1–2 veckor. Men en hosta som varar mer än tre veckor kallas kronisk och bör alltid utredas av en läkare. Vanliga orsaker är astma, allergi, återflöde av magsyra eller en kvarliggande infektion efter förkylning. I sällsynta fall kan det handla om något allvarligare. Kontakta oss online om du oroar dig – vi kan bedöma dina symtom snabbt.",
  },
  {
    slug: "hoga-blodtrycket",
    title: "Högt blodtryck – symtom, orsaker och behandling",
    tag: "HJÄRTA",
    date: "februari 18, 2026",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Högt blodtryck kallas 'den tysta sjukdomen' – de flesta märker ingenting förrän det är för sent.",
    body: "Högt blodtryck (hypertoni) är en av de vanligaste folksjukdomarna i Sverige och drabbar var tredje vuxen. Problemet är att det sällan ger symtom. Obehandlat ökar risken kraftigt för hjärtinfarkt, stroke och njurskada. Behandling består av livsstilsförändringar som mer rörelse, saltreducering och vid behov läkemedel. Med vår blodtrycksmätare kopplad till din läkare kan du mäta hemma och dela resultaten direkt.",
  },
  {
    slug: "diabetes-typ-2-tidiga-tecken",
    title: "Tidiga tecken på typ 2-diabetes – så känner du igen dem",
    tag: "DIABETES",
    date: "januari 14, 2026",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Ökad törst, trötthet och täta toalettbesök kan vara tidiga varningssignaler.",
    body: "Typ 2-diabetes utvecklas ofta långsamt och många bär på sjukdomen utan att veta om det. Tidiga symtom kan inkludera ökad törst, frekvent urinering, extrem trötthet, suddig syn och långsamma sårläkning. Riskfaktorer inkluderar övervikt, stillasittande livsstil, ärftlighet och ålder över 45 år. En enkel blodsockermätning hos oss kan ge svar. Ju tidigare diagnos, desto bättre prognos.",
  },
  {
    slug: "stress-och-utmattning",
    title: "Stress och utmattning – så återhämtar du dig",
    tag: "PSYKISK HÄLSA",
    date: "april 3, 2026",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Utmattningssyndrom är vanligare än någonsin. Här är de första stegen mot återhämtning.",
    body: "Utmattningssyndrom uppstår när kroppen och hjärnan inte längre orkar hantera långvarig stress. Symtomen inkluderar extrem trötthet, koncentrationssvårigheter, sömnproblem och känslomässig utmattning. Återhämtning tar tid – ofta månader till år. De viktigaste stegen är att minska belastningen, prioritera sömn, äta regelbundet och söka stöd hos en läkare eller psykolog. Vi kan hjälpa dig att ta det första steget.",
  },
  {
    slug: "magsmarta-orsaker",
    title: "Magsmärta – de vanligaste orsakerna och vad du ska göra",
    tag: "MAGE",
    date: "mars 28, 2026",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Magsmärta kan ha dussintals orsaker. Lär dig skilja på vad som kräver akutvård och vad som kan vänta.",
    body: "Magsmärta är ett av de vanligaste symtomen vi ser. Orsaker varierar från gaser och irritabel tarm (IBS) till appendicit, gallsten eller magsår. Plötslig, intensiv smärta i nedre högra delen av magen kan tyda på blindtarmsinflammation och kräver akutvård. Smärta som kommer och går, ofta kopplad till mat eller stress, är oftare funktionell. Tveka inte att kontakta oss – vi hjälper dig tolka symtomen.",
  },
  {
    slug: "sova-battre",
    title: "Sova bättre – 10 bevisade råd från läkarna",
    tag: "LIVSSTIL",
    date: "februari 5, 2026",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Dålig sömn påverkar allt från hjärtat till immunförsvaret. Här är vad forskningen säger.",
    body: "God sömn är lika viktig som kost och motion. Vuxna behöver 7–9 timmar per natt. Bevisade råd: håll regelbundna sovtider, undvik skärmar en timme innan läggdags, håll sovrummet svalt (16–18°C), undvik koffein efter kl 14, begränsa alkohol, rör på dig dagligen men inte sent på kvällen, hantera stress med avslappningstekniker, och undvik tunga måltider sent. Har du kroniska sömnproblem kan vi utreda bakomliggande orsaker.",
  },
  {
    slug: "influensa-eller-forkylning",
    title: "Influensa eller förkylning – vad är skillnaden?",
    tag: "INFEKTIONER",
    date: "november 20, 2025",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Många förväxlar influensa med en kraftig förkylning. Skillnaden kan vara avgörande.",
    body: "Förkylning startar gradvis med rinnsnuva och halsont. Influensa slår till snabbt med hög feber (38,5°C+), muskelvärk, huvudvärk och extrem trötthet. Med influensa orkar du knappt gå upp ur sängen – med förkylning kan du ofta fortsätta din vardag. Riskgrupper (äldre, gravida, kroniskt sjuka) bör vaccinera sig mot influensa varje höst. Kontakta oss om du tillhör riskgrupp eller om symtomen förvärras.",
  },
  {
    slug: "antibiotika-nar-behovs-det",
    title: "Antibiotika – när behövs det egentligen?",
    tag: "LÄKEMEDEL",
    date: "oktober 8, 2025",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Antibiotikaresistens är ett globalt hot. Lär dig när antibiotika faktiskt hjälper.",
    body: "Antibiotika fungerar enbart mot bakterier – inte mot virus. Det betyder att förkylning, influensa och de flesta halsinfektioner inte botas med antibiotika. Onödig användning bidrar till antibiotikaresistens, ett av de allvarligaste hoten mot folkhälsan. Däremot är antibiotika nödvändigt vid exempelvis streptokockinfektion, urinvägsinfektion, lunginflammation och borrelia. Vi gör rätt bedömning och skriver ut antibiotika enbart när det verkligen behövs.",
  },
  {
    slug: "ryggont-hemma",
    title: "Ryggont – vad du kan göra hemma och när du ska söka vård",
    tag: "RÖRELSEAPPARATEN",
    date: "september 15, 2025",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "80 procent av alla svenskar drabbas av ryggont någon gång. Här är bästa råden.",
    body: "Ryggsmärta är den vanligaste orsaken till sjukskrivning i Sverige. De flesta episoder läker av sig själva inom 4–6 veckor. Du kan lindra smärtan hemma med rörelse (undvik sängläge), värme, receptfria smärtstillande och stretching. Sök vård om smärtan strålar ner i benet (kan tyda på diskbråck), om du har domningar eller om smärtan uppkommit efter trauma. Vi kan bedöma och hjälpa dig vidare digitalt.",
  },
  {
    slug: "allergi-symtom-behandling",
    title: "Allergi – symtom, utredning och behandling",
    h1: "Allergi: symtom, utredning och behandling",
    seoTitle: "Allergi: symtom, test och behandling",
    metaDescription: "Lär dig känna igen allergisymtom, skillnaden mellan allergi och överkänslighet, när du bör söka vård och vilka behandlingar som kan hjälpa.",
    tag: "ALLERGI",
    date: "april 15, 2026",
    publishedAtIso: "2026-04-15",
    updatedAt: "september 10, 2026",
    updatedAtIso: "2026-09-10",
    image: "/bilder/artiklar/allergi.jpg",
    imageAlt: "Person med pollenallergi som nyser utomhus under pollensäsong.",
    authorName: "Hemläkare.se redaktion",
    reviewerName: "Hemläkare.se medicinska team",
    reviewedAt: "september 10, 2026",
    targetQuery: "allergi symtom behandling",
    excerpt: "Allergi kan ge nysningar, rinnande ögon, nässelutslag, astma och ibland allvarliga reaktioner. Här får du veta hur allergi utreds och behandlas.",
    summary: "Allergi innebär att immunförsvaret reagerar mot ett ämne som kroppen egentligen borde tåla, till exempel pollen, pälsdjur, kvalster, livsmedel, läkemedel eller insektsstick. Vanliga symtom är nysningar, täppt eller rinnande näsa, kliande ögon, hosta, astma, nässelutslag, magbesvär och svullnad. Behandlingen beror på vad du reagerar mot och hur svåra besvären är. Vid snabbt tilltagande andningsbesvär, svullnad i mun eller svalg, svimningskänsla eller påverkat allmäntillstånd ska du ringa 112.",
    keyTakeaways: [
      "Allergi kan drabba näsa, ögon, luftvägar, hud och mage.",
      "Pricktest eller blodprov kan stödja diagnosen, men symtombilden är lika viktig.",
      "Antihistamin hjälper ofta snabbt, medan kortisonnässpray kan behöva några dagar.",
      "Allergisk astma, nässelutslag och matallergi behöver ibland särskild bedömning.",
      "Ring 112 vid misstänkt anafylaxi: andningsbesvär, svullnad i svalg eller svimningskänsla."
    ],
    body: "Allergi är vanligt, men besvären kan se väldigt olika ut. En person får rinnande näsa och kliande ögon under pollensäsongen. En annan får nässelutslag av ett livsmedel, pipande andning av pälsdjur eller en kraftig reaktion efter ett getingstick. Därför behöver en bra allergibedömning börja med frågan: vad händer, när händer det och vad verkar utlösa det?\n\nEn allergi uppstår när immunförsvaret reagerar mot ett ämne, ett allergen, som de flesta andra tål. Reaktionen kan vara mild och irriterande, men ibland påverkar den sömn, arbete, skola, träning och livskvalitet. Hos personer med astma kan allergi också göra luftvägsbesvär sämre.\n\nMålet med behandling är inte bara att dämpa symtom för dagen. Rätt behandling ska minska inflammationen, förebygga försämringar, hjälpa dig undvika onödiga begränsningar och avgöra när vidare utredning eller allergen immunterapi kan vara aktuellt.",
    sections: [
      {
        id: "vad-ar-allergi",
        title: "Vad är allergi?",
        body: [
          "Allergi betyder att immunförsvaret överreagerar på ett ämne som normalt inte är farligt. Ämnet kallas allergen. Vanliga allergen är pollen, pälsdjur, kvalster, mögel, vissa livsmedel, läkemedel, latex och insektsgift.",
          "Alla reaktioner är inte allergi. En del är irritation eller överkänslighet utan allergisk mekanism, till exempel rinnande näsa av starka dofter eller magbesvär av vissa livsmedel. Därför är det viktigt att inte bara testa, utan också förstå symtomen."
        ],
        table: {
          headers: ["Typ av besvär", "Vanliga symtom", "Vanliga utlösare"],
          rows: [
            ["Allergisk rinit", "Nysningar, klåda, rinnande eller täppt näsa.", "Pollen, pälsdjur, kvalster, mögel."],
            ["Allergisk konjunktivit", "Kliande, röda och rinnande ögon.", "Pollen och pälsdjur."],
            ["Allergisk astma", "Hosta, pip i bröstet, andfåddhet.", "Pollen, pälsdjur, kvalster, ansträngning i kombination med allergi."],
            ["Nässelutslag", "Kliande upphöjda utslag som flyttar sig.", "Infektion, läkemedel, livsmedel eller okänd orsak."],
            ["Födoämnesallergi", "Klåda i mun, svullnad, magbesvär, utslag eller andningsbesvär.", "Nötter, jordnötter, skaldjur, ägg, mjölk, fisk med flera."]
          ]
        }
      },
      {
        id: "symtom",
        title: "Vanliga symtom på allergi",
        body: [
          "Allergisymtom kommer ofta i mönster. Pollenbesvär återkommer under vissa delar av året. Kvalsterbesvär märks ofta mer i hemmet eller på morgonen. Pälsdjursallergi kan komma vid direkt kontakt, men också i miljöer där allergen finns kvar i textilier.",
          "Symtomens timing är viktig. En snabb reaktion efter mat, läkemedel eller insektsstick bedöms annorlunda än långsamma och diffusa besvär som kommer över flera dagar."
        ],
        bullets: [
          "Nysningar, rinnsnuva eller nästäppa.",
          "Klåda i näsa, gom, hals eller ögon.",
          "Röda, rinnande eller svullna ögon.",
          "Hosta, pipande andning eller tryck över bröstet.",
          "Nässelutslag, rodnad eller svullnad i huden.",
          "Magont, illamående, kräkningar eller diarré efter vissa livsmedel.",
          "Trötthet och sämre sömn vid långdragna näsbesvär."
        ]
      },
      {
        id: "anafylaxi",
        title: "Varningssignaler: när allergi kan vara akut",
        body: [
          "Anafylaxi, eller allergisk chock, är en allvarlig allergisk reaktion som kan bli livshotande. Den kommer ofta snabbt och kan påverka flera organsystem samtidigt, till exempel hud, luftvägar, mage och cirkulation.",
          "Ring 112 direkt om du misstänker anafylaxi. Om personen har adrenalinpenna ska den användas enligt ordination, men det ska inte ersätta ambulans."
        ],
        bullets: [
          "Svårt att andas, pipande andning eller tryck över bröstet.",
          "Svullnad i läppar, tunga, mun eller svalg.",
          "Yrsel, svimningskänsla, kallsvettning eller kraftig matthet.",
          "Snabbt spridande nässelutslag eller klåda över kroppen.",
          "Kräkningar eller diarré tillsammans med andra allergisymtom.",
          "Oro, förvirring eller känsla av att något är allvarligt fel."
        ]
      },
      {
        id: "utredning",
        title: "Så utreds allergi",
        body: [
          "En allergiutredning börjar med din berättelse: vilka symtom du får, hur snabbt de kommer, hur ofta de återkommer och vad du tror utlöser dem. Testresultat behöver alltid tolkas tillsammans med symtomen.",
          "Pricktest och blodprov som mäter specifikt IgE kan visa om kroppen är sensibiliserad mot ett allergen. Ett positivt test betyder inte alltid att ämnet orsakar dina besvär, och ett negativt test utesluter inte alla former av överkänslighet."
        ],
        table: {
          headers: ["Utredning", "När den används", "Vad den kan visa"],
          rows: [
            ["Symtomgenomgång", "Alltid som första steg.", "Mönster, utlösare och svårighetsgrad."],
            ["Pricktest", "Vid misstänkt IgE-förmedlad allergi.", "Snabb hudreaktion mot utvalda allergen."],
            ["Blodprov/specifikt IgE", "När pricktest inte passar eller behöver kompletteras.", "Antikroppar mot specifika allergen."],
            ["PEF/spirometri", "Vid hosta, pip eller misstänkt astma.", "Hur luftvägarna fungerar."],
            ["Provokation", "I utvalda fall och under kontrollerade former.", "Om ett misstänkt ämne faktiskt utlöser reaktion."]
          ]
        }
      },
      {
        id: "behandling",
        title: "Behandling: vad hjälper mot allergi?",
        body: [
          "Behandlingen beror på typ av allergi. Vid pollenallergi räcker receptfria läkemedel för många, men återkommande eller svåra besvär kan behöva en mer planerad behandling. Vid allergisk rinit är kortisonnässpray ofta effektivt, särskilt vid nästäppa.",
          "Antihistamin kan hjälpa snabbt mot klåda, nysningar, rinnsnuva och nässelutslag. Ögondroppar kan hjälpa vid ögonbesvär. Vid astmasymtom behövs bedömning av luftvägarna och ofta särskild astmabehandling."
        ],
        bullets: [
          "Antihistamintabletter, nässpray eller ögondroppar kan lindra snabbt.",
          "Kortisonnässpray kan vara bäst vid täppt näsa och inflammation.",
          "Saltvattensköljning kan minska pollen och sekret i näsan.",
          "Astmasymtom ska inte behandlas som bara vanlig pollenallergi.",
          "Undvik utlösande allergen när det är möjligt, men gör det på ett rimligt sätt.",
          "Vid svår allergi kan specialistbedömning och allergen immunterapi vara aktuellt."
        ]
      },
      {
        id: "pollenallergi",
        title: "Pollenallergi: planera före säsongen",
        body: [
          "Pollenallergi ger ofta nysningar, rinnande näsa, nästäppa, kliande ögon och trötthet. Besvären kan bli värre vid torrt, varmt och blåsigt väder, och lättare efter regn.",
          "Om du vet att du brukar få besvär varje år är det klokt att börja behandling innan symtomen blivit som värst. Kortisonnässpray behöver ofta några dagars regelbunden användning innan full effekt märks."
        ],
        bullets: [
          "Följ pollenprognosen under säsong.",
          "Vädra gärna när pollenhalterna är lägre.",
          "Skölj hår eller byt kläder efter mycket utevistelse om du får besvär.",
          "Torka inte sängkläder utomhus under hög pollensäsong.",
          "Sök hjälp om receptfria läkemedel inte räcker."
        ]
      },
      {
        id: "matallergi",
        title: "Matallergi och korsreaktioner",
        body: [
          "Matallergi kan ge allt från lindrig klåda i munnen till allvarliga reaktioner. Hos pollenallergiker är det vanligt med korsreaktioner mot rå frukt, grönsaker eller nötter, ofta som klåda i mun och svalg. Det kallas ibland oralt allergisyndrom.",
          "Undvik inte stora livsmedelsgrupper utan bedömning om du inte haft tydliga reaktioner. Onödiga kostrestriktioner kan göra vardagen svårare och hos barn kan det påverka näringsintag."
        ],
        bullets: [
          "Sök vård vid återkommande reaktioner efter mat.",
          "Ring 112 vid andningsbesvär, svullnad i svalg eller svimningskänsla.",
          "Berätta alltid om reaktionens tidsförlopp och mängden du åt.",
          "Barn med misstänkt matallergi bör bedömas så att kosten blir säker och näringsrik."
        ]
      },
      {
        id: "ait",
        title: "Allergivaccination: när kan AIT vara aktuellt?",
        body: [
          "Allergen immunterapi, ofta kallat allergivaccination eller AIT, innebär att kroppen gradvis vänjs vid ett allergen. Behandlingen kan vara aktuell vid vissa allergier, till exempel pollen, kvalster eller bi- och getinggift, särskilt om vanliga läkemedel inte räcker.",
          "AIT är en långsiktig behandling och kräver noggrann bedömning. Den passar inte alla, men kan minska symtom och läkemedelsbehov hos rätt patient."
        ]
      },
      {
        id: "nar-soka-vard",
        title: "När ska du söka vård?",
        body: [
          "Sök vård om allergibesvären påverkar sömn, arbete, skola, träning eller livskvalitet trots egenbehandling. Du bör också söka hjälp om du får astmaliknande symtom, återkommande nässelutslag, misstänkt matallergi eller om du behöver veta vad du faktiskt är allergisk mot.",
          "Sök också vård om du använder receptfria läkemedel under lång tid utan tillräcklig effekt. En strukturerad behandlingsplan kan ofta ge betydligt bättre kontroll."
        ],
        bullets: [
          "Receptfria läkemedel hjälper inte tillräckligt.",
          "Du får hosta, pip i bröstet eller andfåddhet.",
          "Besvären stör sömn, arbete, skola eller träning.",
          "Du misstänker allergi mot mat, läkemedel eller insektsstick.",
          "Du har haft en kraftig reaktion och behöver akutplan eller adrenalinpenna.",
          "Du undviker mycket i vardagen utan att veta vad du reagerar på."
        ]
      }
    ],
    faq: [
      {
        question: "Hur vet jag om det är allergi?",
        answer: "Allergi misstänks när symtom återkommer i tydliga mönster, till exempel vid pollen, pälsdjur, kvalster, mat eller insektsstick. Pricktest eller blodprov kan stödja diagnosen, men måste tolkas tillsammans med dina symtom."
      },
      {
        question: "Vad hjälper bäst mot pollenallergi?",
        answer: "Antihistamin kan lindra snabbt, särskilt klåda och nysningar. Vid nästäppa och mer ihållande besvär är kortisonnässpray ofta effektivt, men behöver användas regelbundet i några dagar för full effekt."
      },
      {
        question: "När är allergi akut?",
        answer: "Ring 112 vid misstänkt anafylaxi, till exempel andningsbesvär, svullnad i mun eller svalg, svimningskänsla, kraftig matthet eller snabbt spridande utslag tillsammans med andra symtom."
      },
      {
        question: "Kan allergi ge trötthet?",
        answer: "Ja. Allergi kan störa sömnen genom nästäppa, klåda, hosta och ögonbesvär. Inflammation och långdragna symtom kan också göra att du känner dig trött och mindre fokuserad."
      },
      {
        question: "Är ett positivt allergitest alltid en allergi?",
        answer: "Nej. Ett positivt test kan visa sensibilisering, men betyder inte alltid att ämnet orsakar besvär. Därför är symtom, tidsförlopp och exponering avgörande för diagnosen."
      },
      {
        question: "Kan allergi behandlas långsiktigt?",
        answer: "Ja. Många får bra kontroll med rätt läkemedel och planering. Vid vissa allergier kan allergen immunterapi, AIT, vara aktuellt och ge mer långvarig lindring."
      }
    ],
    sources: [
      {
        title: "Allergisk chock – anafylaxi",
        publisher: "1177",
        url: "https://www.1177.se/olyckor--skador/akuta-rad---forsta-hjalpen/allergisk-chock--anafylaxi/"
      },
      {
        title: "Är pollenmedicin receptfritt?",
        publisher: "Läkemedelsverket",
        url: "https://fragor.lakemedelsverket.se/org/lakemedelsverket/d/receptfria-lakemedel-mot-pollenallergi/"
      },
      {
        title: "Rinit, allergisk och dess inverkan på astma",
        publisher: "Internetmedicin",
        url: "https://www.internetmedicin.se/allergologi/rinit-allergisk-och-dess-inverkan-pa-astma-aria"
      },
      {
        title: "Anafylaxi",
        publisher: "1177 för vårdpersonal",
        url: "https://vardpersonal.1177.se/kunskapsstod/kliniska-kunskapsstod/anafylaxi/?region=stockholm&selectionCode=profession_primarvard"
      },
      {
        title: "Allergi",
        publisher: "Astma- och Allergiförbundet",
        url: "https://astmaoallergiforbundet.se/information-rad/allergi/"
      }
    ],
    cta: {
      title: "Osäker på vad du reagerar mot?",
      body: "Få hjälp att reda ut symtom, möjliga utlösare och vilken behandling som passar. Vi kan bedöma om du behöver allergitest, astmakontroll eller vidare utredning.",
      bullets: [
        "Kartläggning av symtom och utlösare",
        "Råd om receptfria och receptbelagda alternativ",
        "Hjälp vidare vid astma, matallergi eller kraftiga reaktioner"
      ],
      note: "Vid andningsbesvär eller svullnad i svalg: ring 112.",
      label: "Få hjälp med allergi",
      href: "/vardguiden/lung-allergisjukdomar"
    },
  },
  {
    slug: "depression-tecken-hjalp",
    title: "Depression – tecken att se upp för och hur du söker hjälp",
    tag: "PSYKISK HÄLSA",
    date: "januari 22, 2026",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Depression är en av de vanligaste sjukdomarna globalt. Att söka hjälp är ett styrketecken.",
    body: "Depression handlar inte om att vara svag eller att inte försöka tillräckligt. Det är en sjukdom med biologiska, psykologiska och sociala orsaker. Tecken inkluderar ihållande nedstämdhet, förlorat intresse för saker du tidigare gillade, sömnstörningar, aptitförändringar, koncentrationssvårigheter och i värsta fall tankar om att inte vilja leva. Effektiv behandling finns – samtalsterapi, läkemedel eller en kombination. Ta första steget och kontakta oss.",
  },
  {
    slug: "viktminskning-tips",
    title: "Hållbar viktminskning – vad forskningen faktiskt säger",
    tag: "LIVSSTIL",
    date: "februari 28, 2026",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Kraschdieter fungerar sällan långsiktigt. Här är vad som faktiskt håller.",
    body: "Forskning visar att de mest hållbara viktminskningarna uppnås genom måttligt kaloriunderskott (300–500 kcal/dag), proteinrik kost som mättar bättre, regelbunden styrketräning för att bevara muskelmassa, god sömn och stresshantering. Undvikande av ultraprocessad mat och ökad vardagsrörelse är minst lika viktigt som träning. Det finns inga genvägar – men vi kan hjälpa dig hitta en plan som passar just dig.",
  },
  {
    slug: "urinvagsinfektion-kvinna",
    title: "Urinvägsinfektion – symtom, behandling och förebyggande",
    tag: "UROLOGI",
    date: "mars 5, 2026",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Varannan kvinna drabbas av UVI under sin livstid. Här är allt du behöver veta.",
    body: "Urinvägsinfektion (UVI) är en av de vanligaste bakterieinfektionerna och drabbar framför allt kvinnor. Symtom: sveda vid urinering, täta trängningar, grumlig eller illaluktande urin och ibland feber. Behandling är oftast antibiotika i kort kur. Förebyggande åtgärder: drick mycket vatten, kissa efter sex, undvik parfymerade produkter intim och bär inte tighta syntetbyxor. Vid feber och ryggsmärta kan infektionen ha spridit sig till njurarna – sök vård skyndsamt.",
  },
  {
    slug: "barnvaccination-schema",
    title: "Barnvaccination i Sverige – fullständigt schema och varför det är viktigt",
    tag: "BVC",
    date: "december 3, 2025",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Det svenska vaccinationsprogrammet skyddar barn mot 12 allvarliga sjukdomar. Här är schemat.",
    body: "Det nationella vaccinationsprogrammet för barn i Sverige inkluderar skydd mot difteri, stelkramp, kikhosta, polio, Hib, pneumokock, rotavirus, MPR (mässling, påssjuka, röda hund), HPV och meningokock. Vaccinationer ges från 3 månaders ålder upp till gymnasiet. Vacciner är mycket säkra och bevisade livräddare. Har du frågor om ditt barns vaccinationer? Vår BVC-mottagning hjälper dig.",
  },
  {
    slug: "kolesterol-vad-ar-farligt",
    title: "Kolesterol – vad är ett farligt värde och vad kan du göra?",
    tag: "HJÄRTA",
    date: "januari 30, 2026",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Högt kolesterol syns inte och märks inte – men ökar risken för hjärtattack dramatiskt.",
    body: "Kolesterol är ett fettämne som kroppen behöver, men för höga nivåer av LDL ('dåligt kolesterol') ökar risken för åderförkalkning, hjärtinfarkt och stroke. Totalt kolesterol under 5 mmol/L är eftersträvansvärt för de flesta. Kost med mycket fiber, nötter, fisk och olivolja sänker LDL. Mättat fett och transfetter höjer det. Vid kraftigt förhöjda värden är statiner effektiva och välbeprövade läkemedel. Ta ett enkelt blodprov hos oss för att kolla dina värden.",
  },
  {
    slug: "astma-hos-barn",
    title: "Astma hos barn – tecken, utredning och behandling",
    tag: "BARN",
    date: "oktober 22, 2025",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Astma är den vanligaste kroniska sjukdomen hos barn. Rätt behandling gör stor skillnad.",
    body: "Astma hos barn yttrar sig ofta som återkommande pipande andning, nattlig hosta, andfåddhet vid lek och täta luftvägsinfektioner. Diagnos ställs med lungfunktionstest och allergitestning. Behandling: kortverkande luftrörsvidgare vid behov och förebyggande inhalationssteroid vid behov av daglig medicin. Med rätt behandling kan barn med astma leka, idrotta och leva precis som andra barn. Vi utreder och följer upp hos oss.",
  },
  {
    slug: "rynkor-och-hudaldrande",
    title: "Varför åldras huden – och vad du faktiskt kan göra åt det",
    tag: "HUD",
    date: "mars 19, 2026",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Sol, socker och stress är hudens värsta fiender. Här är vad vetenskapen säger.",
    body: "Hudens åldrande beror till 80% på yttre faktorer – framförallt UV-strålning. Kollagenproduktionen minskar med åldern, vilket ger rynkor och slapphet. Bevisade åtgärder: daglig SPF 30+, retinol (A-vitamin) på kvällen, C-vitamin serum på morgonen, hyaluronsyra för fukt och sluta röka. Socker orsakar glykering som bryter ner kollagen. Inget kräm botar åldring, men dessa hjälper. Vid oroliga hudförändringar – kontakta oss.",
  },
  {
    slug: "migrän-behandling",
    title: "Migrän – orsaker, triggers och effektiv behandling",
    tag: "NEUROLOGI",
    date: "februari 12, 2026",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Migrän drabbar var sjunde person. Det finns nu fler behandlingsalternativ än någonsin.",
    body: "Migrän är inte bara en 'vanlig huvudvärk'. Det är en neurologisk sjukdom med pulserande ensidig huvudvärk, illamående, ljus- och ljudkänslighet som kan vara förlamande i timmar till dagar. Vanliga triggers: hormonförändringar, sömnbrist, stress, hoppad måltid, alkohol och starkt ljus. Akutbehandling: triptaner (receptbelagda) är guld. Förebyggande: betablockerare, topiramat eller nya CGRP-hämmare. Vi kan skriva ut rätt medicin och hjälpa dig identifiera dina triggers.",
  },
  {
    slug: "solvax-och-solskydd",
    title: "Solskydd – vilket SPF behöver du egentligen?",
    h1: "Solskydd och SPF: så skyddar du huden på riktigt",
    seoTitle: "Solskydd och SPF: vilket skydd behöver du?",
    metaDescription: "Lär dig välja rätt SPF, förstå UVA och UVB, smörja rätt mängd och skydda barn mot solen med råd från 1177, Cancerfonden och Läkemedelsverket.",
    tag: "HUD",
    date: "maj 2, 2026",
    publishedAtIso: "2026-05-02",
    updatedAt: "september 10, 2026",
    updatedAtIso: "2026-09-10",
    image: "/bilder/artiklar/solskydd-1.jpg",
    imageAlt: "Solskyddskräm appliceras på hud för att skydda mot UV-strålning.",
    authorName: "Hemläkare.se redaktion",
    reviewerName: "Hemläkare.se medicinska team",
    reviewedAt: "september 10, 2026",
    targetQuery: "vilket SPF behöver jag",
    excerpt: "SPF 30 räcker ofta om det används rätt, men barn och känslig hud behöver extra skydd. Här får du en praktisk guide till UVA, UVB, mängd och återapplicering.",
    summary: "För de flesta vuxna är SPF 30 eller högre ett bra val, men solskyddskräm ska ses som ett komplement till skugga, kläder, hatt och solglasögon. Barn bör skyddas extra noggrant och små barn ska inte vara i direkt sol. Välj bredspektrumskydd mot både UVA och UVB, använd riklig mängd och smörj igen efter bad, svettning och ungefär varannan timme vid stark sol.",
    keyTakeaways: [
      "SPF anger främst skydd mot UVB, strålningen som gör att huden bränner sig.",
      "Välj minst SPF 30 och kontrollera att produkten även skyddar mot UVA.",
      "Solskyddskräm fungerar bara som utlovat om du använder tillräckligt mycket.",
      "Kläder, hatt, solglasögon och skugga är basen; solkräm är komplementet.",
      "Barns hud är känsligare än vuxnas och behöver extra skydd mot direkt sol."
    ],
    body: "Det korta svaret är att de flesta vuxna bör välja minst SPF 30 när solen är stark, och SPF 50 kan vara klokt för barn, ljus hud, fjäll, strand, båt, utlandsresa eller om du lätt bränner dig. Men den viktigaste frågan är inte bara vilken siffra som står på flaskan. Det avgörande är hur länge du är i solen, om skyddet täcker både UVA och UVB, hur mycket du använder och om du fyller på efter bad eller svettning.\n\nSolskydd handlar alltså inte om att kunna sola längre. Det handlar om att minska den totala UV-belastningen på huden. UV-strålning kan ge brännskador, soleksem, pigmentförändringar, snabbare hudåldrande och ökad risk för hudcancer. Du kan dessutom få skador även molniga dagar och även när huden inte känns varm.\n\nDen bästa strategin är enkel: planera dagen efter solen, välj skugga när UV-strålningen är stark, täck huden med kläder och använd solskyddsmedel på hud som inte täcks. Då blir SPF ett verkligt skydd, inte en falsk trygghet.",
    sections: [
      {
        id: "vad-betyder-spf",
        title: "Vad betyder SPF?",
        body: [
          "SPF står för Sun Protection Factor och beskriver framför allt skyddet mot UVB-strålning. UVB är den del av UV-ljuset som tydligast gör att huden blir röd och bränd. En högre SPF ger mer skydd, men skillnaden mellan höga faktorer är mindre än många tror.",
          "I praktiken är SPF 30 ofta en bra lägstanivå, men bara om du använder tillräcklig mängd. Om du smörjer för tunt blir det verkliga skyddet betydligt lägre än siffran på förpackningen."
        ],
        table: {
          headers: ["SPF", "Passar ofta för", "Viktigt att komma ihåg"],
          rows: [
            ["SPF 15", "Kort vardagsexponering när UV-index är lågt.", "Ofta för lågt vid stark sommarsol, strand, fjäll eller utlandsresa."],
            ["SPF 30", "De flesta vuxna vid svensk vår- och sommarsol.", "Bra basnivå om den används rikligt och fylls på."],
            ["SPF 50", "Barn, ljus eller känslig hud, stark sol, bad, båt, snö och utlandsresa.", "Ger extra marginal när risken att bränna sig är hög."],
            ["SPF 50+", "Mycket känslig hud eller läkemedel/sjukdom som ökar solkänslighet.", "Bör kombineras med kläder och skugga, inte ersätta dem."]
          ]
        }
      },
      {
        id: "uva-uvb",
        title: "UVA och UVB: därför behöver du bredspektrumskydd",
        body: [
          "Solen avger flera typer av UV-strålning. UVB bidrar starkt till att du bränner dig, medan UVA tränger djupare ned i huden och bidrar till hudåldrande, pigmentförändringar och vissa ljuskänslighetsreaktioner. Både UVA och UVB kan skada huden.",
          "Välj därför ett solskydd som tydligt anger skydd mot både UVA och UVB. SPF-talet räcker inte som enda kvalitetsmarkör, eftersom det främst säger något om UVB-skyddet."
        ]
      },
      {
        id: "hur-mycket-solskydd",
        title: "Hur mycket solskyddskräm ska man använda?",
        body: [
          "De flesta använder för lite solskyddsmedel. För att komma nära skyddet på förpackningen behöver du lägga på ett jämnt och rikligt lager. Som tumregel brukar en vuxen behöva ungefär en handfull solskyddskräm för hela kroppen.",
          "Glöm inte områden som ofta missas: öron, nacke, hårfäste, läppar, ovansidan av händer och fötter, bakom knän och axlar. Använd solstift eller läpprodukt med SPF på läppar, näsa och andra extra utsatta punkter."
        ],
        bullets: [
          "Smörj innan du går ut eller innan bad om du ska vara länge ute.",
          "Massera in jämnt och täck all hud som inte skyddas av kläder.",
          "Fyll på efter bad, handdukstorkning eller kraftig svettning.",
          "Vid bad och stark sol: smörj ungefär varannan timme.",
          "Låt inte solskyddsmedel ligga öppet i stark värme eller direkt sol."
        ]
      },
      {
        id: "barn-solskydd",
        title: "Solskydd för barn",
        body: [
          "Barns hud är känsligare än vuxnas. Barn under ett år bör helst inte vara i direkt solljus alls. Skugga, solhatt och täckande kläder är förstahandsvalet, särskilt mitt på dagen.",
          "För barn som kryper, går eller badar kan solskyddsmedel behövas på hud som inte går att täcka. Välj vattenfast solskydd för barn med SPF 30 eller högre, gärna SPF 50 när solen är stark eller barnet badar mycket."
        ],
        bullets: [
          "Planera lek och bad före eller efter de starkaste soltimmarna.",
          "Använd solhatt som skuggar ansikte, öron och nacke.",
          "Välj täta, luftiga kläder eller UV-kläder vid bad och lång utevistelse.",
          "Smörj utsatta områden som ansikte, händer och fötter.",
          "Var extra försiktig nära vatten, sand och snö som reflekterar ljus."
        ]
      },
      {
        id: "uv-index",
        title: "Använd UV-index i stället för magkänsla",
        body: [
          "UV-index visar hur stark UV-strålningen är. När UV-index är 3 eller högre behöver huden skyddas. I Sverige kan UV-index bli högt redan på våren, särskilt mitt på dagen, även när luften fortfarande känns sval.",
          "Väderkänslan lurar ofta. Moln kan släppa igenom mycket UV-strålning, vind gör att solen känns svagare än den är och vatten, sand och snö reflekterar ljuset så att huden får mer strålning."
        ],
        bullets: [
          "Var extra försiktig mellan ungefär klockan 11 och 15.",
          "Sök skugga när solen står högt.",
          "Skydda dig även molniga dagar om UV-index är högt.",
          "Tänk extra på solskydd vid strand, båt, fjäll, snö och utlandsresa."
        ]
      },
      {
        id: "dagligt-solskydd",
        title: "Behöver man solskydd varje dag?",
        body: [
          "I Sverige är UV-strålningen låg under de mörkaste vintermånaderna, men under vår, sommar och soliga dagar med snö kan huden behöva skydd även vid vardagsaktiviteter. Ansikte, öron, nacke och händer får ofta mest dagsljus över tid.",
          "Om du använder hudvård med aktiva ingredienser, har pigmentbenägen hud, rosacea, tidigare hudcancer eller läkemedel som gör huden ljuskänslig kan dagligt solskydd vara extra viktigt under ljusa månader."
        ]
      },
      {
        id: "vanliga-misstag",
        title: "Vanliga misstag med solskydd",
        body: [
          "Det vanligaste misstaget är att använda solskyddskräm för att kunna vara längre i solen. Då kan den skyddande effekten minska, eftersom den totala tiden i UV-strålning ökar. Solskydd ska hjälpa dig att minska skadan, inte förlänga exponeringen.",
          "Ett annat misstag är att lita på gamla produkter. Solskyddsmedel fungerar sämre om de varit öppnade länge, legat varmt eller passerat hållbarheten."
        ],
        bullets: [
          "För lite kräm ger mycket lägre skydd än SPF-talet antyder.",
          "Solskydd behöver fyllas på, särskilt efter bad och svettning.",
          "Moln, vind och vatten gör inte solen ofarlig.",
          "Solbränna är en hudskada, inte ett hälsotecken.",
          "Solarium ger UV-exponering och bör undvikas."
        ]
      },
      {
        id: "nar-soka-vard",
        title: "När ska du söka vård efter sol?",
        body: [
          "De flesta milda solskador kan lindras genom att undvika mer sol, kyla huden och använda mjukgörande lotion. Men vissa reaktioner behöver rådgivning, särskilt hos barn eller om huden får blåsor.",
          "Kontakta vården om ett barn får blåsor efter solbränna, om du får kraftiga besvär, feber, allmänpåverkan, tecken på infektion eller om en hudförändring uppstår eller förändras efter solexponering."
        ],
        bullets: [
          "Sök råd vid blåsor, kraftig smärta eller utbredd solbränna.",
          "Var extra uppmärksam på små barn och personer med känslig hud.",
          "Kontrollera leverfläckar som ändrar färg, form eller storlek.",
          "Läs även vår guide om hudcancer och leverfläckar om du är orolig för en fläck."
        ]
      },
      {
        id: "lakemedel-sol",
        title: "Läkemedel kan göra huden extra solkänslig",
        body: [
          "Vissa läkemedel kan öka hudens känslighet för solljus, framför allt UVA. Det kan ge kraftigare solreaktioner än du brukar få, även om du normalt tål solen bra.",
          "Läs bipacksedeln och fråga läkare eller apotekspersonal om du använder läkemedel och är osäker. Vid ökad ljuskänslighet räcker det inte alltid med vanlig solkräm; kläder, skugga och bredspektrumskydd med hög SPF blir extra viktigt."
        ]
      }
    ],
    faq: [
      {
        question: "Vilken SPF behöver jag?",
        answer: "För de flesta vuxna är SPF 30 eller högre en bra nivå när solen är stark. Välj SPF 50 vid ljus eller känslig hud, för barn, vid bad, strand, båt, fjäll, snö eller utlandsresa."
      },
      {
        question: "Är SPF 50 mycket bättre än SPF 30?",
        answer: "SPF 50 ger mer marginal, men skillnaden blir bara relevant om du använder tillräckligt mycket och fyller på. För tunt lager gör att det faktiska skyddet blir mycket lägre än siffran på flaskan."
      },
      {
        question: "Skyddar solskyddskräm mot både UVA och UVB?",
        answer: "Inte automatiskt. SPF-talet beskriver främst UVB-skyddet. Välj ett solskydd som tydligt anger UVA- och UVB-skydd eller bredspektrumskydd."
      },
      {
        question: "Måste jag smörja mig när det är molnigt?",
        answer: "Ja, om UV-index är högt eller du ska vara ute länge. Moln kan släppa igenom UV-strålning, och huden kan skadas även om solen inte känns stark."
      },
      {
        question: "Hur ofta ska man fylla på solskydd?",
        answer: "Fyll på efter bad, handdukstorkning eller mycket svettning. Vid stark sol och bad är ungefär varannan timme en bra tumregel."
      },
      {
        question: "Kan barn använda samma solskydd som vuxna?",
        answer: "Barn bör använda solskydd som är anpassat för barn, gärna vattenfast och med SPF 30 eller högre. Barn under ett år bör helst inte vistas i direkt sol."
      },
      {
        question: "Får jag D-vitamin om jag använder solskydd?",
        answer: "Ja, de flesta får tillräckligt med D-vitamin ändå genom kortare vardaglig solexponering och kost. Att bränna sig behövs inte för D-vitamin och ökar risken för hudskador."
      }
    ],
    sources: [
      {
        title: "Så skyddar du dig mot solen",
        publisher: "1177",
        url: "https://www.1177.se/liv--halsa/sol-och-varme/sa-skyddar-du-dig-mot-solen/"
      },
      {
        title: "Solskador på huden",
        publisher: "1177",
        url: "https://www.1177.se/olyckor--skador/brannskador-och-koldskador/solskador-pa-huden/"
      },
      {
        title: "Myter om solskydd",
        publisher: "Läkemedelsverket",
        url: "https://www.lakemedelsverket.se/sv/om-lakemedelsverket/press-och-nyheter/kort-om/myter-om-solskydd"
      },
      {
        title: "Vilka krav finns på solskyddsmedel?",
        publisher: "Läkemedelsverket",
        url: "https://fragor.lakemedelsverket.se/org/lakemedelsverket/d/vilka-krav-finns-pa-solskyddsmedel/"
      },
      {
        title: "Vanliga frågor och svar om solen",
        publisher: "Cancerfonden",
        url: "https://www.cancerfonden.se/minska-risken/solen/vanliga-fragor-och-svar-om-solen"
      },
      {
        title: "Rapport från SSM:s vetenskapliga råd om ultraviolett strålning 2025",
        publisher: "Strålsäkerhetsmyndigheten",
        url: "https://www.stralsakerhetsmyndigheten.se/publikationer/rapporter/stralskydd/2026/202609/"
      }
    ],
    cta: {
      title: "Osäker på en solskada eller leverfläck?",
      body: "Få hjälp att bedöma om dina besvär kan hanteras hemma eller behöver undersökas vidare. Du beskriver vad du ser och kan bifoga bilder om det gäller en hudförändring.",
      bullets: [
        "Snabb första rådgivning",
        "Möjlighet att bifoga bilder",
        "Hjälp vidare vid misstänkt hudförändring"
      ],
      note: "Du behöver inte veta om det är allvarligt innan du söker råd.",
      label: "Starta bedömning",
      href: "/vardguiden/hud-konssjukdomar"
    },
  },
  {
    slug: "skovlig-ledvark",
    title: "Ledvärk och stelhet – när är det reumatism?",
    tag: "REUMATOLOGI",
    date: "januari 8, 2026",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Inte all ledvärk är reumatism – men vissa tecken bör utredas skyndsamt.",
    body: "Ledvärk kan ha många orsaker: artros (förslitning), reumatoid artrit (autoimmun), gikt, psoriasisartrit eller borrelia. Reumatoid artrit kännetecknas av stelhet på morgonen längre än 30 minuter, svullna leder i händer och fötter och symmetriska besvär. Tidigt omhändertagande är avgörande för att bromsa sjukdomsförloppet. Gikt ger plötslig, intensiv smärta oftast i stortåleden. Vi kan ta blodprover och remittera vid behov.",
  },
  {
    slug: "psykisk-ohalsa-unga",
    title: "Psykisk ohälsa bland unga – vad föräldrar bör känna till",
    tag: "PSYKISK HÄLSA",
    date: "mars 1, 2026",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Var fjärde tonåring mår psykiskt dåligt. Hur märker du det och vad kan du göra?",
    body: "Psykisk ohälsa bland unga ökar och är nu den vanligaste orsaken till sjukskrivning hos unga vuxna. Tecken att se upp för: tillbakadragenhet, förändrade sovvanor, tappat intresse för tidigare intressen, irritabilitet, nedstämdhet eller ångest inför vardagliga situationer. Föräldrar kan hjälpa genom att lyssna utan att döma, ta känslouttryck på allvar och söka professionell hjälp tidigt. Vår mottagning för Ungas Psykiska Hälsa erbjuder digitala samtal varje vecka.",
  },
  {
    slug: "feber-nar-sok-vard",
    title: "Feber – när ska du söka vård och vad hjälper?",
    tag: "SYMTOM",
    date: "november 5, 2025",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Feber är en del av immunförsvarets försvar – men ibland är den ett varningstecken.",
    body: "Feber är kroppens naturliga svar på infektion och hjälper immunförsvaret att bekämpa virus och bakterier. Lätt feber (under 38,5°C) hos friska vuxna behöver sällan behandlas medicinskt. Sök vård om: feber är över 39,5°C, varar mer än 3–4 dagar, åtföljs av svår nackstyvhet eller utslag, eller om du tillhör riskgrupp. Hos barn under 3 månader ska all feber utredas akut. Paracetamol och ibuprofen lindrar symtomen.",
  },
  {
    slug: "nar-ga-till-akuten",
    title: "Akuten eller vårdcentralen? Så gör du rätt val",
    tag: "VÅRDNYTT",
    date: "oktober 14, 2025",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Fel val kostar dig tid och belastar vården i onödan. Lär dig skillnaden.",
    body: "Akutmottagningen är till för livshotande tillstånd: bröstsmärta, stroke, allvarliga skador, svår andnöd och medvetslöshet. Allt annat hanteras bättre av en vårdcentral – och numera digitalt online.Du slipper väntetider och smittorisk i väntrum. Ring 112 vid livsfara, 1177 för rådgivning, eller kontakta oss direkt online för allt annat. Vi svarar snabbt.",
  },
  {
    slug: "graviditet-tidiga-tecken",
    title: "Tidiga graviditetstecken – mer än bara illamående",
    tag: "GRAVIDITET",
    date: "februari 20, 2026",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Många tidiga graviditetstecken förväxlas med PMS eller sjukdom. Här är de vanligaste.",
    body: "Utöver utebliven mens och illamående kan tidiga graviditetstecken inkludera bröstömhet, ökad trötthet, täta toalettbesök, förändrad lukt- och smakkänslighet, lätt blödning vid implantation och humörsvängningar. Hemgraviditetstest kan ge positivt utslag redan 10 dagar efter befruktning. Vid positivt test: kontakta din barnmorska eller oss för mödravårdsremiss och tidig uppföljning.",
  },
  {
    slug: "kost-for-bra-tarmsundhet",
    title: "Bra tarmhälsa – kosten som gör störst skillnad",
    h1: "Kost för bra tarmhälsa: maten som gör störst skillnad",
    seoTitle: "Kost för bra tarmhälsa: fibrer, fullkorn och magvänliga råd",
    metaDescription: "Så äter du för en lugnare mage och bättre tarmhälsa: fibrer, fullkorn, baljväxter, fermenterad mat, IBS-råd och när du bör söka vård.",
    tag: "KOST",
    date: "april 10, 2026",
    publishedAtIso: "2026-04-10",
    updatedAt: "september 10, 2026",
    updatedAtIso: "2026-09-10",
    image: "/bilder/artiklar/tarmhalsa.webp",
    imageAlt: "Fiberrik mat med grönsaker, baljväxter och fullkorn som stöd för tarmhälsa.",
    authorName: "Hemläkare.se redaktion",
    reviewerName: "Hemläkare.se medicinska team",
    reviewedAt: "september 10, 2026",
    targetQuery: "kost för bra tarmhälsa",
    excerpt: "Tarmhälsa byggs framför allt av vanor som går att hålla: mer fibrer, fullkorn, baljväxter, frukt, grönsaker och regelbundna måltider.",
    summary: "Den bästa kosten för tarmhälsa är oftast inte en strikt diet, utan ett stabilt kostmönster med mer växtbaserad, fiberrik mat: fullkorn, baljväxter, grönsaker, frukt, bär, nötter och frön. Fibrer hjälper tarmen att arbeta, ger näring till tarmens bakterier och kan bidra till regelbunden avföring. Men öka gradvis, särskilt om du har IBS, gaser eller känslig mage. Sök vård vid blod i avföringen, ofrivillig viktnedgång, nattliga besvär, långvarig diarré eller ny förstoppning som inte går över.",
    keyTakeaways: [
      "Tarmhälsa gynnas mest av helheten: fibrer, fullkorn, baljväxter, frukt och grönsaker över tid.",
      "Öka fiberintaget långsamt och drick mer vätska, annars kan gaser och förstoppning bli värre.",
      "Lösliga fibrer från till exempel havre, frukt, grönsaker och baljväxter tolereras ofta bättre vid känslig mage.",
      "Fermenterad mat och probiotika kan hjälpa vissa, men effekten varierar och är inte en universallösning.",
      "Blod i avföringen, viktnedgång, feber eller långvarigt förändrade avföringsvanor ska bedömas av vården."
    ],
    body: "Tarmhälsa har blivit ett stort ämne, och med det kommer många löften: detox, mikrobiomtester, dyra tillskott och dieter som påstår sig passa alla. Den tråkigare men betydligt mer användbara sanningen är att tarmen oftast mår bäst av regelbundenhet, tillräckligt med fibrer, varierad mat och vanor som du kan hålla även när livet är lite rörigt.\n\nTarmfloran, eller tarmens mikrobiota, består av många olika mikroorganismer. Den påverkas av vad du äter, men också av läkemedel, infektioner, stress, sömn, rörelse och tidigare sjukdomar. Därför ska tarmhälsa inte reduceras till en enda ingrediens. Det är mönstret över tid som räknas.\n\nFör de flesta vuxna är den viktigaste förändringen enkel att beskriva men ibland svår att göra: ät mer fiberrik mat från flera olika källor. Fullkorn, baljväxter, rotfrukter, grönsaker, frukt, bär, nötter och frön bidrar med olika typer av fibrer och näringsämnen. Samtidigt behöver råden anpassas. En person med förstoppning kan må bättre av mer fibrer och vätska, medan någon med IBS kan behöva öka långsammare och välja fibertyper med mer omsorg.",
    sections: [
      {
        id: "vad-ar-tarmhalsa",
        title: "Vad menas med bra tarmhälsa?",
        body: [
          "Bra tarmhälsa handlar inte om att magen alltid ska vara helt tyst. En frisk mage kan låta, bilda gaser och variera lite från dag till dag. Det viktiga är att du inte har återkommande smärta, diarré, förstoppning, uppblåsthet eller andra besvär som begränsar vardagen.",
          "En fungerande tarm hjälper kroppen att bryta ner mat, ta upp näring, transportera avföring och samspela med immunförsvaret. Kosten är en viktig del, men den behöver ses tillsammans med sömn, stress, rörelse och eventuella sjukdomar."
        ],
        bullets: [
          "Avföringen kommer regelbundet och utan större besvär.",
          "Du har inte återkommande magsmärta som styr vardagen.",
          "Du kan äta varierat utan att behöva undvika stora livsmedelsgrupper i onödan.",
          "Tillfälliga magbesvär går över och följer begripliga mönster.",
          "Du vet när symtom bör bedömas av vården."
        ]
      },
      {
        id: "fiberrik-mat",
        title: "Fibrer: grunden i en tarmvänlig kost",
        body: [
          "Fibrer är kolhydrater från växtriket som inte bryts ner helt i tunntarmen. De påverkar tarmen på olika sätt: vissa binder vatten och gör avföringen mjukare, andra ger volym och hjälper tarmens rörelser, och vissa kan fermenteras av bakterier i tjocktarmen.",
          "För många är ett gradvis högre fiberintag den viktigaste förändringen för magen. Men om du ökar för snabbt kan du få mer gaser, uppblåsthet och magknip. Därför är taktiken nästan lika viktig som valet av mat."
        ],
        table: {
          headers: ["Livsmedel", "Varför det hjälper", "Magvänligt sätt att börja"],
          rows: [
            ["Havregryn och råg", "Ger fullkorn och lösliga fibrer.", "Byt frukost 2–3 dagar i veckan först."],
            ["Bönor, linser och kikärter", "Bidrar med fibrer, protein och fermenterbara kolhydrater.", "Börja med några matskedar och skölj konserverade baljväxter."],
            ["Grönsaker och rotfrukter", "Ger fibrer, vätska och många olika näringsämnen.", "Lägg till en näve extra per måltid."],
            ["Frukt och bär", "Ger ofta lösliga fibrer och kan vara lättare för magen.", "Välj hela frukter hellre än juice."],
            ["Nötter och frön", "Ger fibrer och omättade fetter.", "Börja med en liten näve eller en matsked frön."]
          ]
        }
      },
      {
        id: "fullkorn-baljvaxter",
        title: "Fullkorn och baljväxter gör störst skillnad över tid",
        body: [
          "Fullkorn betyder att hela sädeskornet finns kvar. Det ger mer fibrer, mineraler och bioaktiva ämnen än siktade spannmålsprodukter. Baljväxter som bönor, linser och ärter är samtidigt ett av de mest effektiva sätten att höja fiberintaget utan att måltiden behöver bli komplicerad.",
          "Ett bra mål är inte att äta perfekt, utan att göra fiberrika val till standard oftare: havregryn i frukosten, grovt bröd, fullkornsris, matvete, linssoppa, bönor i tacos eller kikärter i sallad."
        ],
        bullets: [
          "Byt vitt bröd mot rågbröd eller annat fullkornsbröd.",
          "Välj havregryn, müsli med fullkorn eller osötad gröt oftare.",
          "Lägg linser i köttfärssås, soppor eller grytor.",
          "Byt en del av pastan eller riset mot fullkornsvariant.",
          "Ha bönor eller kikärter som färdig genväg i kylen."
        ]
      },
      {
        id: "fermenterat-probiotika",
        title: "Fermenterad mat och probiotika: bra för vissa, inte magi",
        body: [
          "Yoghurt, fil, kefir, surkål, kimchi och andra fermenterade livsmedel kan passa bra i en varierad kost. De kan bidra med bakteriekulturer och göra det lättare att skapa regelbundna matvanor. Men fermenterad mat botar inte alla magbesvär, och personer med känslig mage kan reagera på till exempel syra, laktos eller vissa kolhydrater.",
          "Probiotika kan hjälpa vissa, särskilt vid vissa former av diarré eller IBS-liknande besvär, men effekten beror på produkt, bakteriestam och individ. Om du provar är det klokt att testa en sak i taget under några veckor och följa symtomen."
        ],
        bullets: [
          "Välj naturella produkter oftare än sötade.",
          "Börja med små mängder om du lätt får gaser.",
          "Utvärdera en produkt i taget så du vet vad som påverkar magen.",
          "Avsluta om besvären tydligt blir värre.",
          "Se probiotika som ett möjligt komplement, inte grunden i tarmhälsa."
        ]
      },
      {
        id: "ibs-kanslig-mage",
        title: "Om du har IBS eller känslig mage",
        body: [
          "Vid IBS kan samma mat som är nyttig för många ge mer symtom hos vissa. Baljväxter, lök, vitlök, kål, råg och vissa frukter kan ge gaser och smärta eftersom de innehåller kolhydrater som jäser i tarmen. Det betyder inte att maten är farlig, men den kan behöva anpassas.",
          "FODMAP-kost kan lindra IBS-symtom hos en del, men bör helst göras tillsammans med dietist. Poängen är inte att utesluta så mycket som möjligt för alltid, utan att hitta vilka livsmedel och mängder just din mage tolererar."
        ],
        table: {
          headers: ["Vid känslig mage", "Smart strategi", "Undvik fällan"],
          rows: [
            ["Mycket gaser", "Öka fibrer långsamt och välj mindre portioner baljväxter.", "Att gå från låg fiber till mycket bönor över en natt."],
            ["Förstoppning", "Testa mer vätska, rörelse och lösliga fibrer.", "Att lägga till fibrer utan att dricka mer."],
            ["Diarré", "Ät regelbundet och minska sådant som tydligt triggar.", "Att självdiagnostisera allergi eller glutenproblem direkt."],
            ["IBS-misstanke", "För symtomdagbok och sök stöd vid långvariga besvär.", "Att fastna i en strikt diet utan plan för återintroduktion."]
          ]
        }
      },
      {
        id: "sa-borjar-du",
        title: "En enkel 4-veckors plan för bättre tarmvanor",
        body: [
          "Det bästa upplägget är ofta det som känns lite för enkelt. Om du ändrar allt samtidigt vet du inte vad som hjälpte eller störde magen. Välj hellre en ny vana per vecka och låt kroppen hinna med.",
          "Målet är inte maximal fiber på kortast tid. Målet är en mage som fungerar bättre och ett kostmönster du kan fortsätta med."
        ],
        table: {
          headers: ["Vecka", "Fokus", "Exempel"],
          rows: [
            ["1", "Regelbundenhet", "Ät frukost eller lunch vid ungefär samma tid varje dag."],
            ["2", "En extra växtkälla", "Lägg till frukt, bär eller grönsak till två måltider."],
            ["3", "Fullkorn", "Byt till havre, rågbröd eller fullkornspasta några gånger i veckan."],
            ["4", "Baljväxter", "Lägg till linser, bönor eller kikärter i små portioner."]
          ]
        }
      },
      {
        id: "mat-att-minska",
        title: "Matvanor som kan störa magen",
        body: [
          "Det finns ingen enskild förbjuden mat för alla. Däremot kan stora mängder alkohol, mycket fet eller stark mat, stora måltider sent på kvällen, mycket sockeralkoholer och en väldigt fiberfattig kost ge mer magbesvär hos många.",
          "Rött och processat kött bör inte ta för stor plats i kosten. Ett mer växtbaserat mönster med fullkorn, grönsaker, frukt och baljväxter är bättre för både mage och långsiktig hälsa."
        ],
        bullets: [
          "Minska ultraprocessad mat om den tränger undan riktig mat med fibrer.",
          "Var försiktig med stora mängder sötningsmedel som slutar på -ol, till exempel sorbitol.",
          "Begränsa alkohol om magen ofta blir orolig.",
          "Ät långsammare och testa mindre portioner om du blir uppblåst efter måltid.",
          "Undvik onödigt restriktiva dieter utan tydlig anledning."
        ]
      },
      {
        id: "nar-soka-vard",
        title: "När ska du söka vård för mag- och tarmbesvär?",
        body: [
          "Kost kan hjälpa mycket, men alla magbesvär ska inte lösas med kostförändringar. Nya, långvariga eller tydligt försämrade symtom bör bedömas, särskilt om du har röda flaggor.",
          "Sök vård om du har blod i avföringen, ofrivillig viktnedgång, feber, nattliga diarréer, svår smärta, långvarig diarré, ny förstoppning som inte går över eller om du misstänker celiaki, inflammatorisk tarmsjukdom eller tarmcancer. Testa inte glutenfritt innan celiakiutredning om det går att undvika, eftersom det kan påverka provsvar."
        ],
        bullets: [
          "Blod eller svart avföring.",
          "Ofrivillig viktnedgång eller uttalad trötthet.",
          "Diarré eller smärta som väcker dig på natten.",
          "Feber, kräkningar eller tecken på uttorkning.",
          "Nytt förändrat avföringsmönster som håller i sig.",
          "Magbesvär som påverkar arbete, sömn eller vardag trots egenvård."
        ]
      }
    ],
    faq: [
      {
        question: "Vilken mat är bäst för tarmhälsan?",
        answer: "För de flesta är grunden fullkorn, baljväxter, grönsaker, frukt, bär, nötter och frön. Variation är viktig eftersom olika livsmedel ger olika typer av fibrer och näringsämnen."
      },
      {
        question: "Hur snabbt märks det om jag äter mer fibrer?",
        answer: "Vissa märker skillnad på avföring och mättnad inom några dagar, men tarmen kan behöva flera veckor för att vänja sig. Öka gradvis och drick tillräckligt med vätska."
      },
      {
        question: "Kan fibrer göra magen värre?",
        answer: "Ja, särskilt om du ökar snabbt eller har IBS. Då kan gaser, uppblåsthet och magknip öka. Börja med små mängder och välj gärna lösliga fibrer från till exempel havre, frukt och vissa grönsaker."
      },
      {
        question: "Är probiotika bra för tarmhälsan?",
        answer: "Probiotika kan hjälpa vissa, men effekten varierar mellan produkter och personer. Det är klokt att se probiotika som ett komplement, inte som ersättning för fiberrik och varierad mat."
      },
      {
        question: "Behöver jag undvika gluten för en bättre mage?",
        answer: "Inte om du inte har celiaki eller tydliga besvär som utreds. Om celiaki misstänks bör du inte börja med glutenfri kost innan provtagning, eftersom det kan göra tester mindre tillförlitliga."
      },
      {
        question: "När är magbesvär ett varningstecken?",
        answer: "Sök vård vid blod i avföringen, ofrivillig viktnedgång, feber, nattliga diarréer, svår smärta, långvarig diarré eller ny förstoppning som inte går över."
      }
    ],
    sources: [
      {
        title: "Grönsaker och frukt – råd",
        publisher: "Livsmedelsverket",
        url: "https://stage.livsmedelsverket.se/matvanor-halsa--miljo/kostrad/rad-om-bra-mat-hitta-ditt-satt/gronsaker-och-frukt---rad/"
      },
      {
        title: "Nya nordiska näringsrekommendationer",
        publisher: "Livsmedelsverket",
        url: "https://www.livsmedelsverket.se/om-oss/press/nyheter/pressmeddelanden/idag-lanseras-nya-nordiska-naringsrekommendationer"
      },
      {
        title: "IBS – känslig tarm",
        publisher: "1177",
        url: "https://www.1177.se/sjukdomar--besvar/mage-och-tarm/tarmbesvar/ibs--kanslig-tarm/"
      },
      {
        title: "Förstoppning",
        publisher: "1177",
        url: "https://www.1177.se/Stockholm/sjukdomar--besvar/mage-och-tarm/diarre-forstoppning-och-blod-i-avforingen/forstoppning/"
      },
      {
        title: "Blod i avföringen hos vuxna",
        publisher: "1177",
        url: "https://www.1177.se/Gavleborg/sjukdomar--besvar/mage-och-tarm/diarre-forstoppning-och-blod-i-avforingen/blod-i-avforingen-hos-vuxna/"
      },
      {
        title: "Eat a diet rich in wholegrains, vegetables, fruit and beans",
        publisher: "World Cancer Research Fund",
        url: "https://www.wcrf.org/research-policy/evidence-for-our-recommendations/wholegrains-veg-fruit-beans/"
      }
    ],
    cta: {
      title: "Har du magbesvär som inte släpper?",
      body: "Få hjälp att förstå om dina besvär passar med förstoppning, IBS, matintolerans eller något som behöver utredas vidare. Vi hjälper dig sortera symtom, kostmönster och nästa steg.",
      bullets: [
        "Bedömning av mag- och tarmbesvär",
        "Råd om kost, egenvård och varningssignaler",
        "Hjälp vidare vid blod i avföring, viktnedgång eller långvariga symtom"
      ],
      note: "Vid kraftig smärta, blod i avföringen eller påverkat allmäntillstånd: sök vård akut.",
      label: "Få hjälp med magen",
      href: "/vardguiden/mag-tarmsjukdomar"
    },
  },
  {
    slug: "kolesterolsankande-kost",
    title: "Kolesterolsänkande kost – 8 livsmedel du bör äta mer av",
    tag: "HJÄRTA",
    date: "mars 22, 2026",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Kost kan sänka LDL-kolesterol med upp till 20–30%. Här är de bästa livsmedlen.",
    body: "Livsmedel som bevisats sänka LDL-kolesterol: havregryn (betaglukan), nötter (valnötter, mandel), feta fiskar (lax, makrill), olivolja, avokado, bönor och linser, sojaprodukter och växtsterolin-berikade margariner. Undvik smör, kokosfett, chark och fet mejeriprodukter. En omstrukturering av kosten kan ge märkbara resultat på 6–8 veckor. Kombinera med motion för bäst effekt.",
  },
  {
    slug: "sköldkörteln-symtom",
    title: "Sköldkörtelsjukdomar – symtom du inte ska ignorera",
    tag: "HORMONER",
    date: "december 18, 2025",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Sköldkörteln styr ämnesomsättningen. Både för hög och för låg aktivitet ger tydliga symtom.",
    body: "Sköldkörteln producerar hormoner som reglerar ämnesomsättningen. Hypotyreos (underfunktion) ger: trötthet, viktuppgång, frusenhet, förstoppning och depression. Hypertyreos (överfunktion) ger: viktminskning, hjärtklappning, oro, svettningar och skakningar. Båda diagnosticeras med ett enkelt blodprov (TSH, T3, T4). Behandling med läkemedel ger mycket god effekt. Kvinnor drabbas 5–10 gånger oftare än män.",
  },
  {
    slug: "alkohol-och-halsa",
    title: "Alkohol och hälsa – vad du bör veta om riskerna",
    tag: "LIVSSTIL",
    date: "januari 17, 2026",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Det finns ingen riskfri nivå av alkohol. Här är vad forskningen visar.",
    body: "Ny forskning visar att alkohol ökar risken för minst 7 cancerformer, lever- och hjärtsjukdomar samt psykisk ohälsa – redan vid måttlig konsumtion. Riskbruk definieras som mer än 9 standardglas/vecka för kvinnor och 14 för män. Tecken på problematiskt bruk: dricka ensam, alkohol för att hantera känslor, missade åtaganden. Vi erbjuder diskreta samtal om alkohol och kan koppla dig till rätt stöd.",
  },
  {
    slug: "magsar-och-magsura",
    title: "Magsår och magsyra – skillnader, orsaker och behandling",
    tag: "MAGE",
    date: "november 28, 2025",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Halsbränna varje vecka är inte normalt. Det kan tyda på GERD och bör utredas.",
    body: "Halsbränna uppstår när magsyra refluxar upp i matstrupen. Kronisk halsbränna (mer än 2 ggr/vecka) kallas GERD och kan på sikt skada matstrupen. Magsår orsakas oftast av bakterien H. pylori eller NSAID-läkemedel. Symtom: brännande smärta i övre magen, sura uppstötningar, illamående. Behandling: protonpumpshämmare (PPI), H. pylori-behandling vid behov och livsstilsförändringar (undvik alkohol, rökning, sent ätande).",
  },
  {
    slug: "hudcancer-kolla-leverflackar",
    title: "Hudcancer – så kontrollerar du dina leverfläckar",
    h1: "Hudcancer och leverfläckar: så kontrollerar du huden",
    seoTitle: "Hudcancer och leverfläckar: så kontrollerar du huden",
    metaDescription: "Lär dig känna igen misstänkta leverfläckar med ABCDE-regeln, när du bör söka vård och hur en läkare bedömer hudförändringar.",
    tag: "HUD",
    date: "maj 15, 2026",
    publishedAtIso: "2026-05-15",
    updatedAt: "september 10, 2026",
    updatedAtIso: "2026-09-10",
    image: "/bilder/artiklar/hudcancer-1.jpeg",
    imageAlt: "Närbild av hud med leverfläck som kontrolleras för tecken på hudcancer.",
    authorName: "Hemläkare.se redaktion",
    reviewerName: "Hemläkare.se medicinska team",
    reviewedAt: "september 10, 2026",
    targetQuery: "kontrollera leverfläckar",
    excerpt: "Melanom är den allvarligaste hudcancerformen. Lär dig ABCDE-regeln, vilka hudförändringar som bör bedömas och hur du kontrollerar huden hemma.",
    summary: "Kontrollera leverfläckar som ändrar färg, form eller storlek, börjar klia, blöda, blir såriga eller ser tydligt annorlunda ut än dina andra fläckar. ABCDE-regeln hjälper dig att upptäcka varningssignaler, men en misstänkt hudförändring ska alltid bedömas av vårdpersonal. Tidig upptäckt av melanom förbättrar möjligheten till behandling.",
    keyTakeaways: [
      "Titta efter förändring över tid: en fläck som växer, byter färg eller ändrar form ska kontrolleras.",
      "Använd ABCDE-regeln: asymmetri, ojämn kant, flera färger, storlek och utveckling.",
      "Sök vård om en fläck kliar, blöder, vätskar, blir sårig eller inte läker.",
      "Fotografera misstänkta fläckar och jämför efter några veckor om du är osäker.",
      "Skydda huden mot stark UV-strålning med skugga, kläder och solskydd där kläder inte täcker."
    ],
    body: "Kontrollera leverfläckar som ändrar färg, form eller storlek, börjar klia, blöda, blir såriga eller ser tydligt annorlunda ut än dina andra fläckar. ABCDE-regeln hjälper dig att upptäcka varningssignaler, men en misstänkt hudförändring ska alltid bedömas av vårdpersonal. Tidig upptäckt av melanom förbättrar möjligheten till behandling.\n\nHudcancer är ett samlingsnamn för flera cancersjukdomar i huden. Den form många oroar sig mest för är malignt melanom, eftersom den kan sprida sig om den inte upptäcks i tid. Samtidigt är de flesta leverfläckar ofarliga. Målet med egenkontroll är därför inte att du ska ställa diagnos själv, utan att du ska veta vilka förändringar som behöver bedömas.\n\nEtt bra sätt att börja är att lära känna din egen hud. Titta igenom kroppen i bra ljus, använd spegel för ryggen och glöm inte hårbotten, fotsulor, mellan tårna, under naglar och bakom öron. Om du har många leverfläckar kan bilder hjälpa dig att upptäcka förändringar över tid.",
    sections: [
      {
        id: "vad-ar-hudcancer",
        title: "Vad är hudcancer?",
        body: [
          "Hudcancer uppstår när celler i huden börjar växa okontrollerat. De vanligaste formerna är basalcellscancer, skivepitelcancer och malignt melanom. Basalcellscancer växer oftast långsamt och sprider sig sällan, medan skivepitelcancer och melanom behöver bedömas och behandlas tidigt.",
          "Malignt melanom utgår från melanocyter, cellerna som bildar hudens pigment. Det kan uppstå i en befintlig leverfläck men också som en helt ny pigmenterad eller ibland rödrosa hudförändring. Därför är förändring över tid en av de viktigaste signalerna."
        ]
      },
      {
        id: "kontrollera-hemma",
        title: "Så kontrollerar du leverfläckar hemma",
        body: [
          "Gör kontrollen metodiskt, gärna ungefär en gång i månaden om du har många leverfläckar, tidigare hudcancer eller lätt bränner dig i solen. Välj ett rum med starkt ljus och använd både helkroppsspegel och handspegel.",
          "Titta inte bara på de fläckar du redan känner till. Nya hudförändringar efter 30-årsåldern, sår som inte läker och fläckar som sticker ut från mönstret på din övriga hud är också värda att uppmärksamma."
        ],
        bullets: [
          "Börja med ansikte, öron, hårbotten och nacke.",
          "Fortsätt med armar, handflator, naglar och mellan fingrarna.",
          "Kontrollera bröst, mage, rygg och säte med spegel eller hjälp av någon närstående.",
          "Avsluta med ben, fotsulor, hälar, mellan tårna och under tånaglarna.",
          "Fotografera fläckar du vill följa och notera datum, storlek och placering."
        ]
      },
      {
        id: "abcde-regeln",
        title: "ABCDE-regeln: fem tecken att känna till",
        body: [
          "ABCDE-regeln används ofta för att bedöma om en pigmenterad hudförändring behöver undersökas närmare. Regeln är ett stöd, inte ett facit. Vissa melanom är små, ljusa eller rödrosa och passar inte perfekt in i mönstret."
        ],
        table: {
          headers: ["Bokstav", "Titta efter", "Varför det spelar roll"],
          rows: [
            ["A - Asymmetri", "Den ena halvan skiljer sig från den andra.", "Melanom är ofta mer oregelbundna än vanliga leverfläckar."],
            ["B - Border/kant", "Ojämna, flikiga eller oskarpa kanter.", "Vanliga leverfläckar har oftare jämna och tydliga kanter."],
            ["C - Color/färg", "Flera färger i samma fläck, till exempel brun, svart, röd, blå eller vit.", "Färgvariation kan vara ett varningstecken."],
            ["D - Diameter", "Större än cirka 5-6 millimeter, eller tydlig tillväxt.", "Storlek är mindre viktigt än förändring, men större fläckar bör följas."],
            ["E - Evolution", "Fläcken förändras i färg, form, storlek, yta eller symtom.", "Förändring över tid är ofta den starkaste signalen."
            ]
          ]
        }
      },
      {
        id: "fula-ankungen",
        title: "Glöm inte “fula ankungen”-tecknet",
        body: [
          "Dina leverfläckar brukar ofta likna varandra. En fläck som plötsligt ser helt annorlunda ut än dina andra, den så kallade fula ankungen, bör kontrolleras även om den inte uppfyller alla ABCDE-kriterier.",
          "Det kan handla om en fläck som är mörkare, rödare, mer upphöjd, snabbare växande eller bara tydligt avvikande från ditt vanliga hudmönster."
        ]
      },
      {
        id: "sok-vard",
        title: "När ska du söka vård?",
        body: [
          "Kontakta vården om en leverfläck eller hudförändring förändras, blir sårig, kliar, blöder eller växer. Du behöver inte vara säker på att det är farligt. Det räcker att förändringen är ny, avvikande eller gör dig orolig.",
          "Sök hellre en gång för mycket än att vänta på en förändring som fortsätter utvecklas. Vid misstanke om hudcancer kan vården undersöka fläcken med dermatoskop och vid behov ta bort den för mikroskopisk analys.",
          "Den här artikeln är generell medicinsk information och ersätter inte individuell bedömning. Om du har en snabbt växande, blödande eller sårig hudförändring bör du kontakta vården för rådgivning."
        ],
        bullets: [
          "En fläck växer eller ändrar form.",
          "Färgen ändras, blir flammig eller får flera nyanser.",
          "Fläcken börjar klia, blöda, vätska eller göra ont.",
          "Den övergår till ett sår eller läker inte.",
          "Du får en ny pigmenterad fläck efter 30-årsåldern.",
          "En hudförändring ser tydligt annorlunda ut än dina andra."
        ]
      },
      {
        id: "riskfaktorer",
        title: "Vem har högre risk för hudcancer?",
        body: [
          "Alla kan få hudcancer, men risken är högre hos personer som lätt bränner sig, har ljus hud, många leverfläckar, tidigare hudcancer eller nära släktingar som haft melanom. Mycket UV-exponering, särskilt upprepade solbrännor, ökar också risken.",
          "Solariesolning är en onödig UV-exponering och bör undvikas. Barns hud är extra känslig, och att bränna sig som barn ökar risken för hudcancer senare i livet."
        ]
      },
      {
        id: "lakarbedomning",
        title: "Så går en läkarbedömning till",
        body: [
          "Läkaren börjar med att fråga när förändringen uppstod, om den har ändrats och om du har symtom som klåda, blödning eller sårbildning. Därefter undersöks huden, ofta med dermatoskop, ett förstorande instrument med ljus som gör strukturer under hudytan lättare att bedöma.",
          "Om fläcken bedöms misstänkt tas den vanligtvis bort kirurgiskt och skickas för analys. En bildbedömning kan vara ett första steg för att avgöra hur snabbt du behöver undersökas, men den ersätter inte alltid en fysisk undersökning eller vävnadsprov."
        ]
      },
      {
        id: "forebygga",
        title: "Så minskar du risken",
        body: [
          "Det viktigaste du kan göra är att minska onödig UV-exponering. Skydda huden när solen är stark, särskilt när UV-index är 3 eller högre. I Sverige gäller det ofta mitt på dagen under vår och sommar.",
          "Solskyddskräm är ett komplement, inte huvudskyddet. Kläder, hatt, solglasögon och skugga ger ett mer pålitligt skydd, särskilt för barn och personer med känslig hud."
        ],
        bullets: [
          "Undvik att bränna dig i solen.",
          "Sök skugga när solen är som starkast.",
          "Använd täckande kläder, hatt och solglasögon.",
          "Använd solskydd på hud som inte täcks av kläder.",
          "Undvik solarium.",
          "Håll extra koll på huden om du har många leverfläckar eller tidigare hudcancer."
        ]
      }
    ],
    faq: [
      {
        question: "Hur vet man om en leverfläck är farlig?",
        answer: "Du kan inte säkert avgöra det själv. Varningssignaler är att fläcken ändrar färg, form eller storlek, blir asymmetrisk, får flera färger, börjar klia, blöda eller blir sårig. En läkare kan bedöma om den behöver undersökas närmare."
      },
      {
        question: "Hur ofta ska man kontrollera sina leverfläckar?",
        answer: "Det finns inget exakt intervall som passar alla. Om du har många leverfläckar, lätt bränner dig eller tidigare haft hudcancer är det klokt att kontrollera huden regelbundet, till exempel en gång i månaden. Fråga vården om du behöver särskild uppföljning."
      },
      {
        question: "Kan hudcancer klia?",
        answer: "Ja, en hudförändring som kliar kan behöva bedömas, särskilt om den samtidigt förändras, blöder eller blir sårig. Klåda är dock vanligt vid många ofarliga hudförändringar, så helhetsbilden är viktig."
      },
      {
        question: "Är alla mörka leverfläckar farliga?",
        answer: "Nej. Många mörka leverfläckar är helt ofarliga. Det viktiga är om fläcken är ny, förändras eller skiljer sig tydligt från dina andra fläckar."
      },
      {
        question: "Kan melanom vara ljust eller rött?",
        answer: "Ja. De flesta melanom är pigmenterade, men vissa kan vara ljusa, rosa eller röda. Därför ska även en ny eller växande hudförändring utan mörk färg tas på allvar."
      },
      {
        question: "Kan jag skicka bild på en leverfläck?",
        answer: "En tydlig bild kan hjälpa vården att göra en första bedömning och prioritera rätt. Ta gärna en översiktsbild som visar var fläcken sitter och en närbild i bra ljus. Vid misstanke kan fysisk undersökning eller provtagning fortfarande behövas."
      }
    ],
    sources: [
      {
        title: "Födelsemärken, leverfläckar",
        publisher: "1177",
        url: "https://www.1177.se/Gotland/sjukdomar--besvar/hud-har-och-naglar/fodelsemarken-och-hudforandringar/fodelsemarken-leverflackar/"
      },
      {
        title: "Malignt melanom – hudcancer",
        publisher: "1177",
        url: "https://www.1177.se/Stockholm/sjukdomar--besvar/cancer/cancerformer/malignt-melanom--hudcancer/"
      },
      {
        title: "Malignt melanom",
        publisher: "Cancerfonden",
        url: "https://www.cancerfonden.se/om-cancer/cancersjukdomar/malignt-melanom"
      },
      {
        title: "Födelsemärken och leverfläckar",
        publisher: "Cancerfonden",
        url: "https://www.cancerfonden.se/om-cancer/symtom-och-orsaker/fodelsemarken-och-leverflackar"
      },
      {
        title: "Råd och rekommendationer om sol och UV",
        publisher: "Strålsäkerhetsmyndigheten",
        url: "https://www.stralsakerhetsmyndigheten.se/omraden/sol-och-solarier/rad-och-rekommendationer/"
      }
    ],
    cta: {
      label: "Få en första bedömning",
      href: "/vardguiden/hud-konssjukdomar"
    },
  },
  {
    slug: "motion-for-hjarnhalsa",
    title: "Rörelse för hjärnan – hur träning skyddar mot demens",
    tag: "NEUROLOGI",
    date: "februari 25, 2026",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Regelbunden motion kan minska risken för Alzheimers med upp till 45%. Här är varför.",
    body: "Fysisk aktivitet ökar blodflödet till hjärnan, stimulerar produktion av BDNF (ett protein som stärker nervceller) och minskar inflammation. Studier visar att 150 minuter måttlig träning per vecka kan minska risken för demens med 30–45%. Även promenader ger effekt. Styrketräning 2 ggr/vecka förbättrar kognition hos äldre. Det är aldrig för sent att börja – hjärnan behåller sin plasticitet livet ut.",
  },
  {
    slug: "blodsocker-stabilt",
    title: "Stabilt blodsocker – nyckeln till energi och viktkontroll",
    tag: "DIABETES",
    date: "april 8, 2026",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Blodsockersvängningar orsakar trötthet, sug och humörsvängningar. Så stabiliserar du det.",
    body: "Blodsockersvängningar uppstår när du äter snabba kolhydrater utan fiber, protein eller fett. Kroppen svarar med insulinpåslag som ger blodsockerfall – och du känner dig trött och sugen. Stabilisera genom att: börja måltiden med grönsaker och protein, kombinera alltid kolhydrater med fiber och fett, undvik drycker med socker, ät regelbundet och rör dig efter maten. Detta hjälper både normalviktiga och diabetiker.",
  },
  {
    slug: "tandhalsa-och-hjartat",
    title: "Tandlossning och hjärtsjukdom – det dolda sambandet",
    tag: "HJÄRTA",
    date: "mars 8, 2026",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Forskning visar ett tydligt samband mellan dålig munhälsa och hjärt-kärlsjukdomar.",
    body: "Bakterier vid tandköttsinflammation kan ta sig in i blodbanan och bidra till inflammation i blodkärlen, vilket ökar risken för hjärtinfarkt och stroke. Studier visar att personer med tandlossning har upp till 49% högre risk för hjärt-kärlsjukdom. Råd: borsta tänderna 2 ggr/dag, använd tandtråd, besök tandläkaren regelbundet och sluta röka. God munhälsa är en del av din generella hälsa.",
  },
  {
    slug: "angest-hantera",
    title: "Ångest – så hanterar du den med bevisade metoder",
    tag: "PSYKISK HÄLSA",
    date: "april 1, 2026",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Ångest är vanligt och behandlingsbart. KBT och rörelse är de mest bevisade metoderna.",
    body: "Ångest är kroppens larmsystem – ibland aktiveras det för ofta eller för starkt. Symtom: oro, hjärtklappning, andfåddhet, svettningar och undvikande beteende. Effektiva behandlingsmetoder: kognitiv beteendeterapi (KBT) – guld standard, exponering (konfrontera det du undviker gradvis), regelbunden motion (lika effektiv som SSRI vid lindrig-måttlig ångest), mindfulness och i vissa fall läkemedel. Vi kan hjälpa dig komma igång med rätt insats.",
  },
  {
    slug: "ekzem-psoriasis-skillnad",
    title: "Eksem och psoriasis – hur skiljer du dem åt?",
    tag: "HUD",
    date: "december 10, 2025",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Båda ger kliande, röd hud – men orsak och behandling skiljer sig åt.",
    body: "Eksem (atopisk dermatit) ger kliande, röda, torra hudutslag som ofta syns i armveck och knäveck. Det är en allergisk/inflammatorisk reaktion. Psoriasis ger väldefinierade, silverfjälliga plack oftast på armbågar, knän och hårbotten. Det är en autoimmun sjukdom. Behandling: eksem – mjukgörare, kortisonsalva, ibland immunmodulerare. Psoriasis – lokala steroider, D-vitaminpreparat, biologiska läkemedel vid svår form. Skicka bild till oss för bedömning.",
  },
  {
    slug: "nyttigt-fett-daligt-fett",
    title: "Nyttigt och onyttigt fett – vad du faktiskt ska äta",
    tag: "KOST",
    date: "januari 25, 2026",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Fettet i din kost påverkar hjärta, hjärna och hormoner. Lär dig skilja på sorterna.",
    body: "Omättat fett (olivolja, avokado, nötter, fisk) är hjärtskyddande och bör dominera. Mättat fett (smör, kött, kokosfett) höjer LDL och bör begränsas. Transfett (industriell härdning) är det farligaste och är nu förbjudet i EU men kan finnas i importerade produkter. Omega-3-fettsyror (lax, makrill, linfrö) är antiinflammatoriska och viktiga för hjärna och hjärta. Fett är nödvändigt – välj rätt sort.",
  },
  {
    slug: "inkontinens-behandling",
    title: "Urinläckage – vanligt men inte normalt. Här är hjälpen.",
    tag: "UROLOGI",
    date: "februari 8, 2026",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Var tredje kvinna och var femte man lider av urinläckage. De flesta söker aldrig hjälp.",
    body: "Urininkontinens delas in i ansträngningsinkontinens (läckage vid hosta/nysning/träning) och trängningsinkontinens (plötslig stark trängning). Ansträngningsinkontinens orsakas ofta av försvagad bäckenbotten efter förlossning eller med åldern. Behandling: bäckenbottenträning (Kegel-övningar) – effektivt för 60–70%, blåsträning, livsstilsförändringar och vid behov kirurgi. Det är inte något du behöver acceptera – kontakta oss.",
  },
  {
    slug: "hjartinfarkt-tecken-kvinnor",
    title: "Hjärtinfarkt hos kvinnor – symtomen som alltför ofta missas",
    tag: "HJÄRTA",
    date: "mars 14, 2026",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Kvinnors hjärtinfarktsymtom skiljer sig från mäns – och missas alltför ofta av vården.",
    body: "Klassisk bröstsmärta är vanligare hos män. Kvinnor drabbas oftare av atypiska symtom: trötthet, illamående, ont i ryggen, käken eller armarna, andfåddhet och yrsel. Det gör att hjärtinfarkt hos kvinnor försenat diagnosticeras med i genomsnitt 30 minuter längre än hos män. Riskfaktorer för kvinnor: högt blodtryck, diabetes, rökning och stress har starkare koppling till hjärtsjukdom för kvinnor. Ring 112 vid misstanke.",
  },
  {
    slug: "snus-och-halsa",
    title: "Snus och hälsa – vad vet vi egentligen?",
    tag: "LIVSSTIL",
    date: "november 12, 2025",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Snus är inte ofarligt trots myten. Här är vad forskningen faktiskt visar.",
    body: "Snus innehåller nikotin och ett 30-tal kända cancerframkallande ämnen. Bevisade risker: bukspottkörtelcancer, ökad risk för hjärt-kärlsjukdom, typ 2-diabetes och prematur förlossning. Nikotin är starkt beroendeframkallande oavsett intag. Snus är inte ett säkert alternativ till rökning – det är ett annorlunda riskprofil. Vill du sluta? Vi kan hjälpa med nikotinersättning och stöd.",
  },
  {
    slug: "somnloshet-kronisk",
    title: "Kronisk sömnlöshet – effektiv behandling utan sömnpiller",
    h1: "Kronisk sömnlöshet: behandling som hjälper på riktigt",
    seoTitle: "Kronisk sömnlöshet: symtom, orsaker och behandling",
    metaDescription: "Lär dig vad kronisk sömnlöshet är, när du bör söka hjälp och varför KBT-i ofta rekommenderas före sömnmedel vid långvariga sömnproblem.",
    tag: "LIVSSTIL",
    date: "april 18, 2026",
    publishedAtIso: "2026-04-18",
    updatedAt: "september 10, 2026",
    updatedAtIso: "2026-09-10",
    image: "/bilder/artiklar/somnloshet-kronisk.jpg",
    imageAlt: "Person som ligger vaken i sängen under natten vid kronisk sömnlöshet.",
    authorName: "Hemläkare.se redaktion",
    reviewerName: "Hemläkare.se medicinska team",
    reviewedAt: "september 10, 2026",
    targetQuery: "kronisk sömnlöshet",
    excerpt: "Sömnlöshet som pågår länge kan påverka humör, koncentration, arbete och hälsa. Här får du veta när du bör söka hjälp och varför KBT-i ofta är förstahandsval.",
    summary: "Kronisk sömnlöshet innebär att du under längre tid har svårt att somna, vaknar ofta, vaknar för tidigt eller sover så dåligt att vardagen påverkas. KBT för insomni, ofta kallat KBT-i, rekommenderas i första hand vid långvariga sömnsvårigheter eftersom behandlingen angriper vanor, tankar och mönster som håller besvären vid liv. Sömnmedel kan ibland behövas kortvarigt, men bör inte vara huvudlösningen vid kroniska problem.",
    keyTakeaways: [
      "Sök hjälp om sömnproblemen påverkar vardagen och inte blir bättre trots egna förändringar.",
      "KBT-i är ofta förstahandsbehandling vid långvarig sömnlöshet.",
      "Sömndagbok är ett viktigt verktyg för att förstå mönster och utlösande faktorer.",
      "Sömnmedel kan lindra kortvarigt men löser sällan orsaken till kronisk insomni.",
      "Snarkning, andningsuppehåll, rastlösa ben, smärta, depression och ångest kan behöva utredas."
    ],
    body: "Kronisk sömnlöshet är mer än några dåliga nätter. Det handlar om återkommande svårigheter att somna, sova sammanhängande eller vakna utvilad, samtidigt som sömnproblemen påverkar dagtid. Du kan bli trött, lättirriterad, nedstämd, få sämre koncentration och känna att kroppen aldrig riktigt återhämtar sig.\n\nDet viktiga är att sömnlöshet går att behandla. Många fastnar i en ond cirkel där oro för sömnen, oregelbundna rutiner, tupplurar, skärmar, stress och allt längre tid i sängen gör problemet mer långvarigt. Därför räcker det inte alltid med allmänna råd som att dricka mindre kaffe eller lägga sig tidigare.\n\nVid långvariga sömnsvårigheter är målet att hitta orsaken och bryta mönstret som håller besvären vid liv. Ofta är KBT-i den mest träffsäkra behandlingen, men ibland behöver läkaren också bedöma stress, psykisk ohälsa, läkemedel, smärta, klimakteriebesvär, sköldkörtelrubbning, sömnapné eller restless legs.",
    sections: [
      {
        id: "vad-ar-kronisk-somnloshet",
        title: "Vad är kronisk sömnlöshet?",
        body: [
          "Sömnlöshet, eller insomni, innebär att du har svårt att somna, vaknar ofta under natten, vaknar för tidigt eller upplever att sömnen inte ger återhämtning. För att det ska vara ett vårdproblem ska det också påverka hur du fungerar på dagen.",
          "Begreppet kronisk används när besvären är långvariga. I praktiken söker många vård när problemen har pågått i flera veckor eller månader, särskilt om de påverkar arbete, studier, humör, relationer eller säkerhet i vardagen."
        ],
        table: {
          headers: ["Typ av sömnproblem", "Vanlig upplevelse", "Kan tala för"],
          rows: [
            ["Svårt att somna", "Du ligger vaken länge trots trötthet.", "Stress, oro, oregelbunden dygnsrytm eller för mycket tid i sängen."],
            ["Vaknar ofta", "Sömnen blir splittrad och ytlig.", "Stress, alkohol, smärta, nattliga toalettbesök eller sömnapné."],
            ["Vaknar för tidigt", "Du vaknar tidigt och kan inte somna om.", "Depression, stress, ålder eller dygnsrytmförskjutning."],
            ["Inte utvilad", "Du sover många timmar men känner dig ändå trött.", "Sömnapné, låg sömnkvalitet, läkemedel eller annan sjukdom."]
          ]
        }
      },
      {
        id: "symtom",
        title: "Vanliga symtom på långvariga sömnproblem",
        body: [
          "Sömnlöshet märks inte bara på natten. Det är ofta dagtidssymtomen som avgör hur mycket hjälp du behöver. En person kan sova få timmar men fungera bra, medan en annan sover längre men har tydlig funktionspåverkan.",
          "Vanliga dagtidssymtom är trötthet, försämrad koncentration, minnessvårigheter, nedstämdhet, oro, värk, muskelspänning och lägre stresstålighet."
        ],
        bullets: [
          "Svårt att somna trots att du är trött.",
          "Upprepade uppvaknanden under natten.",
          "Tidigt uppvaknande utan att kunna somna om.",
          "Oro inför natten och rädsla för att inte kunna sova.",
          "Trötthet, irritation eller nedstämdhet dagen efter.",
          "Sämre fokus, minne och prestationsförmåga."
        ]
      },
      {
        id: "orsaker",
        title: "Vad orsakar kronisk sömnlöshet?",
        body: [
          "Sömnlöshet börjar ofta med en tydlig utlösande faktor: stress, sjukdom, sorg, småbarnsperiod, arbetsbelastning, smärta, läkemedel eller förändrad dygnsrytm. Problemet blir långvarigt när kroppen lär sig koppla sängen till vakenhet, kamp och oro.",
          "Det är också vanligt att sömnproblem förekommer tillsammans med andra tillstånd. Ångest, depression, utmattning, ADHD, klimakteriebesvär, smärta, reflux, nattliga urinträngningar och snarkning med andningsuppehåll kan alla störa sömnen."
        ],
        bullets: [
          "Stress och oro.",
          "Oregelbundna sovtider eller skiftarbete.",
          "Koffein, nikotin och alkohol.",
          "Smärta, klåda, hosta eller reflux.",
          "Depression, ångest eller utmattning.",
          "Sömnapné, restless legs eller annan sömnsjukdom.",
          "Läkemedel som påverkar sömn eller vakenhet."
        ]
      },
      {
        id: "kbt-i",
        title: "KBT-i: förstahandsbehandling vid långvarig sömnlöshet",
        body: [
          "KBT-i betyder kognitiv beteendeterapi för insomni. Behandlingen är praktisk och strukturerad. Du får kartlägga sömnen, förstå vad som håller problemet vid liv och stegvis ändra beteenden och tankemönster som gör att hjärnan förknippar sängen med vakenhet.",
          "Till skillnad från sömnmedel handlar KBT-i inte bara om att få en bättre natt. Målet är att sömnen ska bli mer stabil över tid, även efter avslutad behandling."
        ],
        table: {
          headers: ["Del i KBT-i", "Vad det innebär", "Syfte"],
          rows: [
            ["Sömndagbok", "Du registrerar sovtider, uppvaknanden och dagvanor.", "Hitta mönster och mäta förbättring."],
            ["Stimuluskontroll", "Sängen används främst för sömn, inte grubbel och vaken kamp.", "Återkoppla sängen till sömnighet."],
            ["Sömnrestriktion", "Tiden i sängen justeras till faktisk sömntid och ökas gradvis.", "Bygga starkare sömntryck och mer sammanhängande sömn."],
            ["Kognitiva tekniker", "Du arbetar med oro, katastroftankar och prestationskrav kring sömn.", "Minska stressen som håller dig vaken."],
            ["Återfallsprevention", "Du lär dig hantera sämre perioder utan att hamna i gamla mönster.", "Göra förbättringen mer hållbar."]
          ]
        }
      },
      {
        id: "sjalvhjalp",
        title: "Vad kan du göra själv?",
        body: [
          "Sömnråd botar inte alltid kronisk insomni, men de kan minska belastningen på sömnsystemet. De fungerar bäst när de är konkreta och genomförbara, inte som en lång lista med regler som skapar mer stress.",
          "Välj två eller tre förändringar i taget och följ dem konsekvent i minst två veckor. För många förändringar samtidigt gör det svårare att veta vad som faktiskt hjälper."
        ],
        bullets: [
          "Gå upp ungefär samma tid varje dag, även efter en dålig natt.",
          "Få dagsljus på morgonen och rör på dig under dagen.",
          "Undvik koffein sent på dagen och var försiktig med nikotin.",
          "Undvik alkohol som sömnstrategi; den kan försämra sömnkvaliteten.",
          "Lägg undan skärmar och arbete i god tid före läggdags.",
          "Om du inte somnar: gå upp en stund och återvänd när du blir sömnig.",
          "Undvik långa tupplurar, särskilt sent på dagen."
        ]
      },
      {
        id: "sommnmedel",
        title: "När behövs sömnmedel?",
        body: [
          "Sömnmedel kan ibland vara motiverat under en kort period, till exempel vid akut kris, tillfällig svår sömnlöshet eller när sömnbristen ger tydlig funktionspåverkan. Men läkemedel bör användas med försiktighet och följas upp.",
          "Vid kronisk sömnlöshet löser sömnmedel sällan grundproblemet. Vissa preparat kan ge biverkningar, tolerans, beroende eller dagtrötthet. Därför är det viktigt att behandlingen anpassas individuellt och att orsakerna till sömnproblemen utreds."
        ],
        bullets: [
          "Använd inte någon annans sömnmedel.",
          "Kombinera inte sömnmedel med alkohol.",
          "Var försiktig om du kör bil eller arbetar med riskfyllda moment dagen efter.",
          "Diskutera nedtrappning med läkare om du använt sömnmedel länge.",
          "Sök hjälp om du känner att du inte kan sova utan tabletter."
        ]
      },
      {
        id: "nar-soka-vard",
        title: "När ska du söka vård?",
        body: [
          "Sök hjälp om sömnproblemen inte blir bättre trots att du försökt förändra dina vanor, eller om sömnen påverkar arbete, studier, relationer, humör eller säkerhet. Ju tidigare du får stöd, desto lättare är det ofta att bryta mönstret.",
          "Du bör också söka vård om du har kraftig dagtrötthet, snarkar med andningsuppehåll, somnar ofrivilligt dagtid, har rastlösa ben, nattliga panikkänslor, depression, ångest, smärta eller läkemedel som kan påverka sömnen."
        ],
        bullets: [
          "Sömnproblemen har pågått i flera veckor och påverkar vardagen.",
          "Du känner dig nedstämd, orolig eller utmattad.",
          "Du snarkar kraftigt eller någon har märkt andningsuppehåll.",
          "Du har obehag i benen som lindras av rörelse på kvällen.",
          "Du använder alkohol eller tabletter för att kunna sova.",
          "Du är så trött dagtid att bilkörning eller arbete blir riskfyllt."
        ]
      },
      {
        id: "utredning",
        title: "Så går en sömnutredning till",
        body: [
          "En första bedömning görs ofta i primärvården. Läkaren går igenom sömnvanor, stress, psykisk hälsa, läkemedel, alkohol, koffein, smärta och andra symtom. Du kan få fylla i skattningsformulär och föra sömndagbok.",
          "Ibland behövs prover eller vidare utredning. Vid misstanke om sömnapné eller annan sömnsjukdom kan du remitteras för sömnregistrering."
        ]
      },
      {
        id: "akut-hjalp",
        title: "När är sömnproblem mer akut?",
        body: [
          "Sömnlöshet i sig är sällan akut, men vissa situationer kräver snabb hjälp. Sök akut vård eller kontakta 112 om du har tankar på att skada dig själv eller inte orkar leva. Kontakta vården skyndsamt om sömnbristen gör att du riskerar olyckor, till exempel i trafiken eller på arbetet.",
          "Om sömnproblemen kommer tillsammans med kraftig upprymdhet, minskat sömnbehov, impulsivitet eller ovanligt hög energi kan det vara tecken på hypomani eller mani och bör bedömas av vården."
        ]
      }
    ],
    faq: [
      {
        question: "Vad räknas som kronisk sömnlöshet?",
        answer: "Kronisk sömnlöshet innebär långvariga svårigheter att somna, sova sammanhängande eller känna sig återhämtad, samtidigt som du påverkas dagtid. Många söker hjälp när besvären pågått i flera veckor eller månader."
      },
      {
        question: "Är KBT-i bättre än sömnmedel?",
        answer: "Vid långvarig sömnlöshet rekommenderas KBT-i ofta i första hand eftersom behandlingen riktar in sig på de mönster som håller problemet vid liv. Sömnmedel kan ibland lindra kortvarigt men löser sällan orsaken."
      },
      {
        question: "Kan man få KBT för sömnproblem digitalt?",
        answer: "Ja, KBT och internetbaserad behandling kan vara ett alternativ för vissa. En vårdbedömning kan hjälpa dig avgöra om digital behandling passar eller om du behöver annan utredning först."
      },
      {
        question: "När ska jag söka hjälp för sömnproblem?",
        answer: "Sök hjälp om sömnen påverkar din vardag, ditt humör, din koncentration eller din säkerhet och inte förbättras trots egna förändringar. Sök också vid snarkning med andningsuppehåll, kraftig dagtrötthet eller psykisk ohälsa."
      },
      {
        question: "Är det farligt att sova dåligt några nätter?",
        answer: "Några enstaka dåliga nätter är vanligt och oftast inte farligt. Problemet är när sömnsvårigheterna blir återkommande och påverkar hur du fungerar under dagen."
      },
      {
        question: "Kan alkohol hjälpa mig att sova?",
        answer: "Alkohol kan göra att du känner dig sömnig, men försämrar ofta sömnkvaliteten och kan göra att du vaknar mer under natten. Det är därför ingen bra strategi vid sömnproblem."
      }
    ],
    sources: [
      {
        title: "Sömnsvårigheter",
        publisher: "1177",
        url: "https://www.1177.se/liv--halsa/stresshantering-och-somn/somnsvarigheter/"
      },
      {
        title: "KBT, kognitiv beteendeterapi",
        publisher: "1177",
        url: "https://www.1177.se/undersokning-behandling/behandlingar-vid-psykiska-sjukdomar-och-besvar/kognitiv-beteendeterapi-kbt/"
      },
      {
        title: "Insomni",
        publisher: "Socialstyrelsens försäkringsmedicinska beslutsstöd",
        url: "https://forsakringsmedicin.socialstyrelsen.se/beslutsstod-for-diagnoser/diagnoser/nervsystemets-sjukdomar/insomni/"
      },
      {
        title: "Läkemedel vid sömnstörning/insomni",
        publisher: "Läkemedelsboken",
        url: "https://lakemedelsboken.se/terapiomraden/psykiatri/somnstorningar2/insomni/behandling/farmakologisk-behandling/lakemedel-vid-somnstorninginsomni/"
      },
      {
        title: "Psykoterapi eller medicin hjälp för sömnlösa när egenvård inte räcker",
        publisher: "SBU",
        url: "https://www.sbu.se/sv/pressmeddelanden/tidigare-pressmeddelanden/aldre-an-fem-ar/pressmeddelande-2010/psykoterapi-eller-medicin-hjalp-for-somnlosa-nar-egenvard-inte-racker/"
      }
    ],
    cta: {
      title: "Sover du dåligt trots att du försökt själv?",
      body: "Få hjälp att förstå varför sömnen inte fungerar och vad nästa steg bör vara. Vi kan bedöma sömnvanor, stress, läkemedel och symtom som kan behöva utredas.",
      bullets: [
        "Kartläggning av sömn och dagtrötthet",
        "Råd om KBT-i och egenbehandling",
        "Hjälp vidare vid misstänkt sömnapné, stress eller psykisk ohälsa"
      ],
      note: "Du behöver inte vänta tills sömnproblemen tar över vardagen.",
      label: "Få hjälp med sömnen",
      href: "/vardguiden/psykisk-halsa"
    },
  },
  {
    slug: "prostataproblem",
    title: "Prostataproblem – symtom att inte ignorera",
    tag: "UROLOGI",
    date: "oktober 30, 2025",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Godartad prostataförstoring drabbar hälften av män över 50. Prostatacancer är vanligast hos äldre män.",
    body: "Prostatan omger urinröret och växer med åldern. Symtom på prostataförstoring: svag urinstråle, täta trängningar, ofullständig blåstömning och upprepade uppgångningar på natten. Prostatacancer är vanligaste cancerformen hos män – PSA-test via blodprov kan ge tidig varning. Förhöjt PSA kräver vidare utredning. Kontakta oss för ett PSA-prov om du är man över 50 eller har ärftlighet.",
  },
  {
    slug: "d-vitamin-brist",
    title: "D-vitaminbrist i Sverige – vem behöver tillskott?",
    tag: "KOST",
    date: "december 5, 2025",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Upp till hälften av Sveriges befolkning har D-vitaminbrist under vinterhalvåret.",
    body: "D-vitamin produceras i huden vid solljusexponering. Under oktober–april är solens vinkel för låg i Sverige för att huden ska producera D-vitamin. Brist kopplas till bensköra skelet, försämrat immunförsvar, depression och ökad infektionskänslighet. Riskgrupper: äldre, mörkhy, inomhusarbetare, personer med fetma och de som täcker kroppen av kulturella skäl. Rekommenderat dagstillskott: 10 mikrogram (400 IE) för vuxna, mer för riskgrupper.",
  },
  {
    slug: "halsont-behandling",
    title: "Halsont – förkylning, strep eller tonsillit?",
    tag: "INFEKTIONER",
    date: "oktober 25, 2025",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Inte all halsont kräver antibiotika – men streptokockinfektion gör det. Lär dig skillnaden.",
    body: "Halsont vid förkylning åtföljs av snuva och hosta – virus orsakar och antibiotika hjälper inte. Streptokockhalsinfektion (strep throat) ger plötsligt halsont utan hosta, feber, svullna lymfkörtlar och vita prickar på halsmandlarna – kräver antibiotika. Mononukleos (körtelfeber) ger extrem trötthet, svullna lymfkörtlar och feber. Snabbtest för streptokocker kan tas hos oss. Skicka ett foto av halsen online för en första bedömning.",
  },
  {
    slug: "motion-vid-depression",
    title: "Träning som medicin mot depression – vad säger forskningen?",
    tag: "PSYKISK HÄLSA",
    date: "mars 25, 2026",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Regelbunden motion är lika effektivt som antidepressiva vid lindrig-måttlig depression.",
    body: "Flera metaanalyser visar att 30 minuters måttlig träning 3 ggr/vecka är lika effektivt som SSRI vid lindrig till måttlig depression. Motion ökar serotonin, dopamin och noradrenalin – samma signalsubstanser som antidepressiva påverkar. Det minskar också stresshormoner och ökar BDNF som stärker hjärnans nervceller. Aerobisk träning (löpning, cykling) och styrketräning ger båda effekt. Rörelse är medicin – men ersätter inte behandling vid svår depression.",
  },
  {
    slug: "forlossningsdepression",
    title: "Förlossningsdepression – vanligare än du tror",
    tag: "PSYKISK HÄLSA",
    date: "februari 15, 2026",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Var tionde ny förälder drabbas. Det är inte ditt fel och det går att behandla.",
    body: "Förlossningsdepression drabbar 10–15% av nyblivna mammor och uppstår inom det första året. Symtom: nedstämdhet, oro, sömnstörningar utöver babyns uppvakningar, skuldkänslor och i svåra fall tankar om att skada sig själv eller barnet. Det är en medicinsk tillstånd – inte ett tecken på att du är en dålig förälder. Behandling: stöd, samtalsterapi och vid behov läkemedel som är säkra vid amning. Sök hjälp tidigt.",
  },
  {
    slug: "njursten-symtom",
    title: "Njursten – de värsta smärtorna och vad du kan göra",
    tag: "UROLOGI",
    date: "september 22, 2025",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Njurstenssmärtan beskrivs som en av de svåraste smärtorna som finns. Så förebygger du den.",
    body: "Njursten orsakar plötslig, krampaktig smärta i sidan som strålar ner mot ljumsken – ofta åtföljd av illamående och blod i urinen. Stenar under 5 mm passerar oftast av sig själva med riklig vätsketillförsel och smärtstillande. Större stenar kan behöva krossas med ultraljud (ESWL). Förebyggande: drick 2–3 liter vatten/dag, minska salt- och proteinintag, undvik oxalatrika livsmedel (spenat, choklad) om du är känslig.",
  },
  {
    slug: "vaccinera-sig-vuxen",
    title: "Vaccination för vuxna – vilka vacciner behöver du?",
    tag: "INFEKTIONER",
    date: "november 8, 2025",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Barnvaccinerna räcker inte livet ut. Vuxna behöver regelbundna påfyllnadsdoser.",
    body: "Vuxna rekommenderas: stelkramp/difteri/kikhosta vart 10:e år, influensa varje höst (riskgrupper), pneumokock (över 65 eller riskgrupp), HPV (upp till 45 år hos de ej vaccinerade), och covid-19 vid aktuella rekommendationer. Inför utlandsresa kan ytterligare vacciner krävas beroende på destination. Vi hjälper dig se över och fylla på ditt vaccinationsskydd.",
  },
  {
    slug: "omega3-halsa",
    title: "Omega-3 – varför det är en av de viktigaste fettsyrorna",
    tag: "KOST",
    date: "april 5, 2026",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Omega-3 skyddar hjärtat, hjärnan och minskar inflammation. Här är bästa källorna.",
    body: "Omega-3-fettsyrorna EPA och DHA finns framförallt i fet fisk som lax, makrill och sill. De minskar inflammation, sänker triglycerider, skyddar hjärtat och stöder hjärnfunktion och ögonhälsa. ALA (alfa-linolensyra) finns i linfrö, chiafrön och valnötter men omvandlas ineffektivt till EPA/DHA. Rekommendation: ät fet fisk 2–3 ggr/vecka eller ta fiskoljetillskott med minst 1g EPA+DHA/dag. Vegetarianer kan välja algolja.",
  },
  {
    slug: "arbetstress-utmattning",
    title: "Arbetsrelaterad stress – tidiga varningssignaler och vad du kan göra",
    tag: "PSYKISK HÄLSA",
    date: "mars 18, 2026",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Utmattningssyndrom är den vanligaste orsaken till sjukskrivning. Fånga signalerna tidigt.",
    body: "Tidiga varningssignaler på arbetsrelaterad utmattning: du kan inte koppla av på ledigheten, du vaknar redan trött, koncentrationssvårigheter, ökad irritabilitet, fysiska symtom som huvudvärk och muskelvärk utan annan orsak. Åtgärder: kommunicera tydligt med chef om arbetsbelastning, ta alla raster, etablera gränser mellan arbete och fritid, prioritera sömn och motion. Vi kan sjukskriva, remittera och stötta dig i processen.",
  },
  {
    slug: "osteoporos-forebygga",
    title: "Benskörhet (osteoporos) – förebygg det innan det är för sent",
    tag: "RÖRELSEAPPARATEN",
    date: "januari 12, 2026",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Osteoporos kallas 'tyst sjukdom' – du märker det inte förrän du bryter ett ben.",
    body: "Benskörhet innebär att benmassan minskar och risken för frakturer ökar – framförallt i höft, handled och kotpelaren. Riskfaktorer: kvinna efter menopaus, ålder, rökning, D-vitaminbrist, kalciumbrist och inaktivitet. Förebyggande: styrketräning och viktbärande aktivitet (promenader, dans), tillräckligt kalciumintag (800–1000 mg/dag), D-vitamin, undvik rökning och alkohol. Bentäthetsmätning (DXA) rekommenderas till riskgrupper.",
  },
  {
    slug: "blodtrycket-hemma",
    title: "Mäta blodtrycket hemma – så gör du rätt",
    tag: "HJÄRTA",
    date: "juni 3, 2024",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Hemblodtrycksmätning ger mer tillförlitliga värden än på vårdcentralen. Här är tekniken.",
    body: "Blodtryck uppmätt hemma speglar verkligheten bättre än mätningar på mottagningen, där många får falskt höga värden av 'vitrockseffekten'. Mät alltid på samma tid (morgon före frukost och medicin), sittandes med stöd för ryggen, armen i hjärtnivå, efter 5 minuters vila. Ta två mätningar med 1 minuts mellanrum och notera genomsnittet. Normalt värde: under 135/85 mmHg hemma. Dela dina mätvärden med oss online.",
  },
  {
    slug: "graviditetstecken-vecka-for-vecka",
    title: "Graviditetens tre trimestrar – vad händer i kroppen?",
    tag: "GRAVIDITET",
    date: "maj 14, 2024",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Från befruktning till förlossning förändras kroppen dramatiskt. En trimester i taget.",
    body: "Första trimestern (v1–12): illamående, trötthet, bröstömhet och fosterutveckling av alla organ. Andra trimestern (v13–27): illamåendet avtar, magen syns, du känner de första rörelserna. Tredje trimestern (v28–40): snabb tillväxt, sänkt andningskapacitet, täta toalettbesök och förberedelse för förlossning. Kontakta barnmorska tidigt – vi hjälper med remiss och uppföljning.",
  },
  {
    slug: "barnets-fejber",
    title: "Feber hos barn – när ska du ringa 1177?",
    tag: "BARN",
    date: "april 22, 2024",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Feber hos barn oroar alla föräldrar. Lär dig när det är allvarligt och när du kan avvakta.",
    body: "Feber under 38,5°C hos barn över 3 månader kräver sällan läkarkontakt om barnet är piggt. Ring 1177 om: barnet är under 3 månader med feber, febern överstiger 40°C, febern kvarstår mer än 4 dagar, barnet är onormalt slött, vägrar dricka eller har svårt att andas. Ge paracetamol eller ibuprofen i rätt dos efter vikt, se till att barnet dricker och håll koll.",
  },
  {
    slug: "pms-och-pmds",
    title: "PMS och PMDS – när de hormonella svängningarna tar över livet",
    tag: "HORMONER",
    date: "mars 30, 2024",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "PMDS drabbar 3–8% av fertila kvinnor och kan vara försvagande. Det finns hjälp att få.",
    body: "Premenstruellt syndrom (PMS) ger milda humörsvängningar och fysiska besvär dagarna innan mens. PMDS (premenstruellt dysforiskt syndrom) är svårare med depression, ångest, irritabilitet och fysiska symtom som kraftigt påverkar vardagen. Behandling: regelbunden motion, kosttillskott (magnesium, B6), SSRI (som ges cykliskt eller kontinuerligt) och p-piller med kontinuerlig dosering. Diagnosen kräver symtomdagbok i 2 månader.",
  },
  {
    slug: "karpal-kanalens-syndrom",
    title: "Karpaltunnelsyndrom – domningar i handen som du inte ska ignorera",
    tag: "RÖRELSEAPPARATEN",
    date: "februari 28, 2024",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Stickningar och domningar i tumme, pek- och långfinger är klassiska tecken. Här är behandlingen.",
    body: "Karpaltunnelsyndrom uppstår när medianusnerven kläms i handleden. Typiska symtom: domningar och stickningar i tumme, pek- och långfinger, framförallt på natten. Riskfaktorer: repetitivt arbete, graviditet, diabetes, hypotyros och övervikt. Diagnos med nervledningshastighet. Behandling: handledsskena på natten, kortisoinjektion, och vid svår påverkan kirurgi som är mycket effektiv.",
  },
  {
    slug: "alzheimers-tidiga-tecken",
    title: "Alzheimers – de tidiga tecknen och hur sjukdomen utvecklas",
    tag: "NEUROLOGI",
    date: "januari 20, 2024",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Glömska är inte alltid normalt åldrande. Lär dig skilja på dem.",
    body: "Alzheimers är den vanligaste demensformen och drabbar 100 000 svenskar. Tidiga tecken: glömmer nyligen inlärda saker (inte gamla minnen), svårt att hitta rätt ord, förlorar saker, försämrat omdöme och drar sig undan socialt. Normalt åldrande: glömmer namn men minns senare, tappar saker men hittar dem. Det finns idag bromsmediciner och stöd. Tidig utredning via oss ger bäst förutsättningar.",
  },
  {
    slug: "sår-som-inte-laker",
    title: "Sår som inte läker – möjliga orsaker och när du ska söka vård",
    tag: "HUD",
    date: "december 12, 2023",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Ett sår som inte läkt på fyra veckor ska alltid utredas.",
    body: "Kroniska sår (som inte läker på 4 veckor) kan bero på diabetes (nedsatt blodcirkulation och nervskada), venös insufficiens, artärsjukdom, infektion eller i sällsynta fall hudcancer. Tecken på infekterat sår: rodnad, värme, svullnad, var och ökad smärta. Diabetes är den vanligaste orsaken – högt blodsocker försämrar läkningen drastiskt. Kontakta oss – vi bedömer och remitterar till sårspecialist vid behov.",
  },
  {
    slug: "irritabel-tarm",
    title: "Irritabel tarm (IBS) – orsaker, triggers och behandling",
    tag: "MAGE",
    date: "november 18, 2023",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "IBS drabbar var femte svensk. Det är inte farligt men kan vara mycket besvärligt.",
    body: "Irritabel tarm (IBS) ger återkommande magsmärta kopplad till avföringsförändringar utan organisk orsak. Vanliga triggers: stress, fet mat, koffein, alkohol, laktos och gluten (utan celiaki). Behandling: FODMAP-diet (visat 70% symtomlindring), stresshantering, regelbundna måltider, probiotika och vid behov kramplösande läkemedel. Viktigt att utesluta celiaki, inflammatorisk tarmsjukdom och tarmcancer med blodprover och koloskopi.",
  },
  {
    slug: "polycystiskt-ovariesyndrom",
    title: "PCOS – symtom, diagnos och behandling",
    tag: "HORMONER",
    date: "oktober 25, 2023",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "PCOS är den vanligaste hormonrubbningen hos fertila kvinnor och är kraftigt underdiagnostiserad.",
    body: "Polycystiskt ovariesyndrom (PCOS) drabbar 5–10% av fertila kvinnor. Symtom: oregelbundna eller uteblivna menstruationer, ökad hårväxt i ansiktet (hirsutism), akne, viktuppgång och svårigheter att bli gravid. Diagnos: minst 2 av 3 kriterier – oregelbunden ägglossning, förhöjda androgener och cystiska äggstockar på ultraljud. Behandling beror på mål: p-piller vid menstruationsreglering, metformin vid insulinresistens, klomifen vid fertilitet.",
  },
  {
    slug: "ljusterapi-vinterdepression",
    title: "Vinterdepression och ljusterapi – hur det fungerar",
    tag: "PSYKISK HÄLSA",
    date: "september 8, 2023",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Säsongsbunden depression drabbar 500 000 svenskar. Ljusterapi hjälper 70–80%.",
    body: "Säsongsbunden depression (SAD) uppstår när mörker och kortare dagar rubbар dygnsrytmen och minskar serotonin- och melatoninproduktionen. Symtom: nedstämdhet, ökad sömn, ökat matlust (särskilt sötsaker), social tillbakadragning och trötthet. Ljusterapi med 10 000 lux lampa 30 minuter varje morgon hjälper 70–80% inom 1–2 veckor. Börja i oktober–november. Kombineras med regelbunden motion och vid behov SSRI.",
  },
  {
    slug: "barn-och-skarmtid",
    title: "Skärmtid och barn – vad säger forskningen egentligen?",
    tag: "BARN",
    date: "augusti 14, 2023",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Debatten är het men forskningen mer nyanserad. Här är vad vi faktiskt vet.",
    body: "WHO rekommenderar: inga skärmar för barn under 1 år, max 1 timme/dag för 2–4-åringar, inga skärmar en timme före sömn. Forskning visar att passivt tittande (YouTube) är mer skadligt än interaktivt användande (videochat med familj). Skärmtid kopplad till sömnstörningar, koncentrationsproblem och ökad risk för övervikt. Viktigt är inte bara mängden utan innehållet och om föräldern är aktiv tillsammans med barnet.",
  },
  {
    slug: "magnesium-brist-symtom",
    title: "Magnesiumbrist – symtom du kanske inte kopplar till mineralbrist",
    tag: "KOST",
    date: "juli 20, 2023",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Upp till 70% av västvärldens befolkning får i sig för lite magnesium. Här är tecknen.",
    body: "Magnesium är inblandat i över 300 enzymatiska reaktioner i kroppen. Brist ger: muskelkramper (särskilt i benen), sömnproblem, trötthet, huvudvärk, ångest, hjärtklappning och förstoppning. Bästa källorna: nötter (cashew, mandel), frön (pumpa, sesam), mörkgröna bladgrönsaker, fullkorn och mörk choklad. Tillskott: magnesiumglycinat eller magnesiumcitrat absorberas bäst. Undvik magnesiumoxid – dålig absorption.",
  },
  {
    slug: "celiak-glutenintolerans",
    title: "Celiaki och glutenintolerans – vad är skillnaden och hur vet du?",
    tag: "MAGE",
    date: "juni 15, 2023",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Celiaki är en autoimmun sjukdom. Icke-celiakisk glutenkänslighet är något annat. Lär dig skillnaden.",
    body: "Celiaki är en autoimmun sjukdom där gluten skadar tarmluddet och leder till malabsorption. Symtom: diarré, uppblåsthet, viktnedgång, trötthet, anemi och i barn tillväxthämning. Diagnosticeras med blodprov (antikroppar) och tarmbiops. Behandling: strikt glutenfri kost livet ut. Icke-celiakisk glutenkänslighet ger liknande symtom men utan tarmskada. Testa aldrig glutenfritt innan diagnos – det påverkar testresultaten.",
  },
  {
    slug: "hudutslag-orsaker",
    title: "Hudutslag – guide till de vanligaste typerna och orsakerna",
    tag: "HUD",
    date: "maj 22, 2023",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Utslag kan se liknande ut men ha helt olika orsaker. Här är en guide.",
    body: "Vanliga hudutslag: nässelfeber (upphöjda röda fläckar, kliar intensivt, ofta allergisk reaktion), rosfeber (streptokockinfefktion med tydlig gräns), ringorm (ringformad svampinfektion), rosacea (rödhet i ansiktet, kronisk), kontakteksem (lokalt utslag vid allergen), och vattkoppor (vätskefyllda blåsor med feber). Skicka bild till oss online för snabb bedömning utan att behöva besöka mottagning.",
  },
  {
    slug: "hjartklappning-orsaker",
    title: "Hjärtklappning – ofarlig eller ett varningstecken?",
    tag: "HJÄRTA",
    date: "april 18, 2023",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "De flesta hjärtklappningar är ofarliga – men vissa kräver utredning.",
    body: "Hjärtklappning (palpitationer) innebär att du märker ditt hjärtslag som snabbt, hårt eller oregelbundet. Ofarliga orsaker: koffein, stress, sömnbrist, anemi, dehydrering och hormonsvängningar. Utred vid: klappning i vila, svimning eller nästan-svimning, bröstsmärta, andfåddhet eller oregelbundet hjärtslag. EKG och blodprover är förstahandsutredning. Atrieflimmer är den vanligaste rytmrubbningen och kräver behandling.",
  },
  {
    slug: "ledigt-fran-jobb-sjukdom",
    title: "Sjukskrivning – dina rättigheter och hur processen fungerar",
    tag: "VÅRDNYTT",
    date: "mars 12, 2023",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Många vet inte sina rättigheter vid sjukskrivning. Här är allt du behöver veta.",
    body: "De första 14 dagarna betalar arbetsgivaren sjuklön (80% av lönen, dag 2–14). Dag 1 är karensdag utan ersättning. Från dag 15 tar Försäkringskassan vid med sjukpenning. Läkarintyg krävs från dag 8. Vid längre sjukskrivning gör FK en rehabiliteringskedja-bedömning: dag 180 prövas om du kan arbeta hos annan arbetsgivare. Vi skriver sjukintyg och hjälper dig navigera processen.",
  },
  {
    slug: "svamp-i-underlivet",
    title: "Svampinfektion i underlivet – symtom, behandling och förebyggande",
    tag: "UROLOGI",
    date: "februari 8, 2023",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Tre av fyra kvinnor drabbas någon gång. Här är hur du behandlar och förebygger.",
    body: "Vaginal svampinfektion orsakas av Candida albicans och ger klåda, sveda, tjock vitaktig flytning och rodnad. Vanliga triggers: antibiotika, graviditet, diabetes, nedsatt immunförsvar och täta syntetbyxor. Behandling: antimykotisk kräm eller vaginalkapsel (receptfritt). Återkommande infektioner (fler än 4/år) kräver utredning och ev. profylaktisk behandling. Kontakta oss om symtomen inte förbättras inom 3 dagar.",
  },
  {
    slug: "yrsel-bakomliggande-orsaker",
    title: "Yrsel – vad orsakar det och när är det allvarligt?",
    tag: "NEUROLOGI",
    date: "januari 15, 2023",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Yrsel kan komma från örat, hjärnan eller blodet. Orsaken avgör behandlingen.",
    body: "Benign paroxysmal lägesyrsel (BPPV) är vanligast – kristaller i innerörat orsakar kortvarig intensiv yrsel vid rörelse. Behandlas effektivt med Epley-manövern. Meniéres sjukdom: episoder med yrsel, tinnitus och hörselnedsättning. Vestibularisneurit: plötslig långvarig yrsel utan hörselnedsättning (virusinfektion). Allvarligt: yrsel med dubbelseende, talsvårigheter, ansiktsförlamning eller kraftig huvudvärk – ring 112.",
  },
  {
    slug: "kosttillskott-fungerar",
    title: "Kosttillskott – vilka fungerar och vilka är pengarna ur fickan?",
    tag: "KOST",
    date: "december 20, 2022",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Marknaden är fylld av löften. Forskningen är mer selektiv. Här är sanningen.",
    body: "Tillskott med bevisad effekt: D-vitamin (vid brist), magnesium (vid brist), omega-3 (hjärtskyddande), folsyra (graviditet), B12 (veganer), kreatin (styrketräning), järn (vid anemi). Tillskott med begränsad evidens: C-vitamin (förebygger inte förkylning men kan korta den marginellt), zink, probiotika (effekt beror på stam). Slösa inte pengar på: collagen-drycker, detox-produkter, de flesta 'superfood'-extrakt och multivitaminer vid balanserad kost.",
  },
  {
    slug: "mjallborrande-huvudvark",
    title: "Spänningshuvudvärk – orsaker och effektiv behandling",
    tag: "NEUROLOGI",
    date: "november 25, 2022",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Spänningshuvudvärk är den vanligaste huvudvärktypen och drabbar 80% av befolkningen.",
    body: "Spänningshuvudvärk ger ett tryckande, åtstramande band runt huvudet, oftast bilateralt. Orsaker: muskelspänningar i nacke och skuldror, stress, dålig arbetsställning, dehydrering och sömnbrist. Behandling: paracetamol eller ibuprofen, men akta för läkemedelsorsakad huvudvärk vid för frekvent användning (mer än 10–15 dagar/månad). Förebyggande: ergonomi, regelbunden rörelse, stresshantering och tillräcklig vätska.",
  },
  {
    slug: "fibromyalgi-orsaker",
    title: "Fibromyalgi – en sjukdom som alltför länge inte tagits på allvar",
    tag: "RÖRELSEAPPARATEN",
    date: "oktober 30, 2022",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Fibromyalgi ger utbredd smärta och utmattning utan synliga orsaker. Det är en verklig sjukdom.",
    body: "Fibromyalgi är en kronisk smärtsjukdom som drabbar 2–4% av befolkningen, övervägande kvinnor. Symtom: utbredd muskelsmärta, extrem trötthet, sömnstörningar, kognitiva problem ('fibrofog'), huvudvärk och IBS. Diagnos baseras på symtom och uteslutning av andra sjukdomar. Behandling: multidisciplinär approach med gradvis konditionsträning, KBT, amitriptylin eller duloxetin, god sömnhygien och stresshantering.",
  },
  {
    slug: "blodprovsresultat-forstar",
    title: "Förstå dina blodprovsresultat – vad betyder värdena?",
    tag: "VÅRDNYTT",
    date: "september 5, 2022",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Blodprovssvar kan vara förvirrande. Här är de viktigaste värdena förklarade.",
    body: "Vanliga blodvärden: Hb (hemoglobin) – mäter syretransport, lågt = anemi. CRP – inflammationsmarkör, förhöjt vid infektion. TSH – sköldkörtelfunktion. Kreatinin – njurfunktion. HbA1c – långtidsblodsocker för diabetes. LDL/HDL – kolesterol. Vita blodkroppar – immunförsvar, högt vid infektion. Normala referensvärden varierar beroende på ålder och kön. Kontakta oss om du har frågor om dina provsvar.",
  },
  {
    slug: "akne-vuxna",
    title: "Akne hos vuxna – varför du fortfarande kan ha det och vad som hjälper",
    tag: "HUD",
    date: "augusti 10, 2022",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Akne försvinner inte alltid i tonåren. Vuxenakne ökar och har ofta hormonella orsaker.",
    body: "Vuxenakne (efter 25 år) drabbar allt fler och har ofta hormonella kopplingar – PCOS, menscykeln, stress och p-pillebyte. Symtom: djupa inflammerade finnar framförallt längs käklinjen och halsen. Effektiv behandling: retinol/adapalen (topikalt), bensoylperoxid, azelainsyra, antibiotikakräm eller systemisk behandling med isotretinoin (Accutane) vid svår akne. P-piller kan hjälpa hormonell akne. Vi remitterar till hudläkare vid behov.",
  },
  {
    slug: "stroke-symtom-snabbt",
    title: "Stroke – SNABBT-testet som kan rädda liv",
    tag: "NEUROLOGI",
    date: "juli 4, 2022",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Varje minut räknas vid stroke. Lär dig SNABBT-testet utantill.",
    body: "Stroke uppstår när blodflödet till hjärnan avbryts. Tid är hjärna – för varje minut utan behandling dör 1,9 miljoner nervceller. SNABBT-testet: S – Snedhet i ansiktet (be personen le), N – Nedsatt armkraft (be personen lyfta båda armarna), A – Artikulationssvårigheter (be personen säga en mening), B – Balanssvårigheter, B – Brådskande syn- eller huvudvärksproblem, T – Tid att ringa 112. Ring 112 omedelbart. Försök aldrig köra själv.",
  },
  {
    slug: "horselskada-tinnitus",
    title: "Tinnitus och hörselskada – orsaker, risker och vad du kan göra",
    tag: "NEUROLOGI",
    date: "juni 8, 2022",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "1,3 miljoner svenskar lider av tinnitus. Det finns ingen bot men hjälp finns.",
    body: "Tinnitus är upplevelsen av ljud (pip, sus, brus) utan extern källa. Vanligaste orsak: bullerskada. Andra orsaker: åldershörsel, öroninfektion, Meniéres sjukdom och vissa läkemedel (ASA, kinin, vissa antibiotika). Det finns ingen etablerad bot, men habitueringsträning (TRT), KBT och hörapparater vid hörselnedsättning minskar påverkan. Skydda hörseln vid buller – skador är permanenta. Kraftig plötslig tinnitus med hörselnedsättning kräver akutvård.",
  },
  {
    slug: "kronisk-smarta-hantera",
    title: "Kronisk smärta – moderna synsätt på behandling",
    tag: "RÖRELSEAPPARATEN",
    date: "maj 16, 2022",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Smärta som varar mer än 3 månader behandlas bäst med en biopsykosocial approach.",
    body: "Kronisk smärta (mer än 3 månader) är inte bara en förlängning av akut smärta – det är en separat sjukdom med förändrad smärtbearbetning i hjärnan. Biopsykosocial modell: biologiska (skada, inflammation), psykologiska (katastrofiering, depression) och sociala faktorer (arbete, relationer) påverkar alla smärtupplevelsen. Effektiv behandling: gradvis aktivitetsökning, KBT, multidisciplinär smärtrehabilitering, minimal opioidanvändning och stöd.",
  },
  {
    slug: "njurarna-funktion",
    title: "Njurarna – hur de fungerar och tecken på njurproblem",
    tag: "UROLOGI",
    date: "april 20, 2022",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Njursjukdom smyger sig på. Enkla blodprover avslöjar tidigt om något är fel.",
    body: "Njurarna filtrerar 180 liter blod per dygn och reglerar vätskebalans, blodtryck och elektrolyter. Tidiga tecken på njurproblem: svullnad i ben och fötter, trötthet, förändrad urination, skummande urin (protein) och högt blodtryck. GFR (glomerulär filtrationshastighet) mäter njurfunktionen – under 60 i mer än 3 månader indikerar kronisk njursjukdom. Riskgrupper: diabetiker, hypertoni och äldre. Yearly kontroll rekommenderas.",
  },
  {
    slug: "vegankost-halsa",
    title: "Vegankost och hälsa – vad du måste komplettera med",
    tag: "KOST",
    date: "mars 14, 2022",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Vegankost kan vara mycket hälsosam – men kräver planering för att undvika brister.",
    body: "En välplanerad vegankost har kopplats till lägre risk för hjärt-kärlsjukdom, typ 2-diabetes och viss cancer. Men obligatoriska tillskott: B12 (finns ej i växtmat, brist ger nervskada), D-vitamin (vinter), omega-3 (algbaserat EPA/DHA), jod (ej i växtmat utan tång), kalcium (om lite mejeriprodukter) och zink. Järn absorberas sämre från växter – kombinera med C-vitamin. Ta blodprov för att kontrollera dina värden.",
  },
  {
    slug: "aterhamtning-traning",
    title: "Återhämtning efter träning – varför vilan är lika viktig som träningen",
    tag: "LIVSSTIL",
    date: "februari 10, 2022",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Träning bryter ner muskler – det är vilan som bygger upp dem. Många underskattar detta.",
    body: "Muskeluppbyggnad sker under återhämtning, inte under träning. Tecken på otillräcklig återhämtning: minskad prestationsförmåga, ökad skaderisk, sömnproblem, humörförsämring och sjukdom. Rekommendationer: 48 timmar vila för tränade muskelgrupper, 7–9 timmars sömn, tillräckligt proteinintag (1,6–2,2 g/kg), hydrering och aktiv återhämtning (promenader, stretching). Chronisk överträning kräver ibland veckor till månader av vila.",
  },
  {
    slug: "gallsten-symtom",
    title: "Gallsten – symtom, orsaker och behandling",
    tag: "MAGE",
    date: "januari 8, 2022",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Gallsten drabbar var femte kvinna och var tionde man. De flesta ger inga symtom – men när de gör det är det intensivt.",
    body: "Gallsten bildas när gallan kristalliseras i gallblåsan. De flesta (80%) ger inga symtom. Gallstensanfall: intensiv smärta i övre högra buken, ofta efter fet måltid, strålar till ryggen och höger skulderblad, åtföljd av illamående. Behandling vid symtomgivande gallsten: laparoskopisk borttagning av gallblåsan (kolecystektomi) – enkel operation med snabb återhämtning. Söker akut vid feber och gulsot som tyder på gallgångssten.",
  },
  {
    slug: "cancer-tidiga-tecken",
    title: "Cancertecken att aldrig ignorera – lista från onkologer",
    tag: "VÅRDNYTT",
    date: "december 5, 2021",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Tidig cancerdiagnostik är avgörande. Dessa symtom ska alltid utredas.",
    body: "Tecken att alltid ta på allvar: oförklarlig viktminskning (mer än 5 kg utan anledning), blod i avföring eller urin, klump i bröst, armhåla eller på halsen, sår som inte läker, kvarstående hosta eller heshet utan infektion, förändrat avföringsmönster, svårigheter att svälja och ovanlig trötthet. Dessa symtom kan ha godartade orsaker – men ska alltid utredas skyndsamt. Kontakta oss för remiss och utredning.",
  },
  {
    slug: "kost-cancer-forebygga",
    title: "Kost och cancer – vad forskningen säger om förebyggande",
    tag: "KOST",
    date: "november 10, 2021",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Upp till 30–40% av all cancer kan förebyggas med livsstilsförändringar.",
    body: "WHO estimerar att 30–40% av cancer kan förebyggas med kost och livsstil. Skyddande faktorer: frukt och grönsaker (minst 400g/dag), fiber, fullkorn, baljväxter och begränsad alkohol. Riskhöjande: processat kött (korv, chark – klassificerat som klass 1-cancerframkallande), rött kött (max 500g/vecka), alkohol (ökar risken för 7 cancerformer), fetma och tobak. Ingen enskild 'superkost' skyddar – det är det totala mönstret som räknas.",
  },
  {
    slug: "viktnedgang-orsaker",
    title: "Oförklarlig viktminskning – möjliga orsaker och när du ska söka vård",
    tag: "SYMTOM",
    date: "oktober 15, 2021",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Att tappa mer än 5% av kroppsvikten utan att försöka ska alltid utredas.",
    body: "Oförklarlig viktminskning (mer än 5% av kroppsvikten på 6–12 månader) kräver utredning. Möjliga orsaker: diabetes (typ 1 eller okontrollerad typ 2), sköldkörtelsjukdom (hypertyreos), depression, malabsorption (celiaki, IBD), infektion (TBC) och cancer. Utredning inkluderar blodprover, urinprov och vid behov bilddiagnostik. Kontakta oss – vi gör en samlad bedömning och sätter igång rätt utredning.",
  },
  {
    slug: "ryggskolios",
    title: "Skolios – när ryggraden böjer sig och vad det innebär",
    tag: "RÖRELSEAPPARATEN",
    date: "september 20, 2021",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Skolios drabbar 2–3% av befolkningen. De flesta fall är milda och kräver enbart uppföljning.",
    body: "Skolios innebär att ryggraden böjer sig åt sidan i ett S- eller C-mönster. Idiopatisk skolios (okänd orsak) uppstår oftast under puberteten och drabbar flickor 4 gånger oftare. Mild kurva (under 25°): uppföljning. Måttlig (25–45°): korsett under tillväxtperioden. Svår (över 45°): kirurgisk korrigering. Symtom: ojämna axlar eller höfter, utstående skulderblad och ryggsmärta i vuxen ålder.",
  },
  {
    slug: "hiv-fakta-behandling",
    title: "HIV 2024 – fakta, behandling och livet med diagnosen",
    tag: "INFEKTIONER",
    date: "augusti 12, 2021",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "HIV är inte längre en dödsdom. Modern behandling gör det möjligt att leva ett fullvärdigt liv.",
    body: "Med modern antiretroviral behandling (ART) kan HIV-positiva leva lika länge som HIV-negativa och bli icke-smittsamma (U=U: Undetectable=Untransmittable). Behandling startas nu direkt vid diagnos oavsett CD4-nivå. PrEP (profylax) är tillgänglig för högriskgrupper och minskar smittrisken med 99%. HIV-test rekommenderas som en del av rutinprovtagning. Stigmat kring HIV är ett större problem idag än sjukdomen i sig.",
  },
  {
    slug: "tarminflammation-crohn-uc",
    title: "Crohns sjukdom och ulcerös kolit – skillnader och behandling",
    tag: "MAGE",
    date: "juli 18, 2021",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "IBD drabbar 60 000 svenskar och är kronisk. Rätt behandling ger lång remission.",
    body: "Inflammatorisk tarmsjukdom (IBD) delas i Crohns (kan drabba hela magtarmkanalen) och ulcerös kolit (enbart tjocktarmen). Symtom: diarré (ofta med blod vid UC), magsmärtor, trötthet, viktnedgång och feber vid skov. Behandling: aminosalicylater (5-ASA), kortison vid skov, immunmodulerare och biologiska läkemedel (TNF-hämmare, integrinhämmare). Målet är att uppnå och bibehålla remission och undvika kirurgi.",
  },
  {
    slug: "klamydia-sti-fakta",
    title: "Klamydia och andra STI – symtom, testning och behandling",
    tag: "INFEKTIONER",
    date: "juni 22, 2021",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Klamydia ger sällan symtom men kan leda till infertilitet om obehandlat.",
    body: "Klamydia är Sveriges vanligaste STI med 30 000 fall per år. 70–80% av smittade har inga symtom. Komplikationer: PID (bäckeninflammation), epididymit och infertilitet. Test: urinprov eller svabb, enkelt att göra hos oss. Behandling: azitromycin i engångsdos. Testa dig vid ny partner, efter oskyddat sex eller om partner fått diagnos. Andra vanliga STI: gonorré (ökande antibiotikaresistens), herpes, HPV och syfilis.",
  },
  {
    slug: "hormonersattning-klimakteriet",
    title: "Hormonersättning i klimakteriet – nytta och risker",
    tag: "HORMONER",
    date: "maj 28, 2021",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "HRT har rehabiliterats av ny forskning. Lär dig vad som gäller för dig.",
    body: "Klimakteriesymtom (svettningar, vallningar, sömnproblem, torra slemhinnor, humörsvängningar) drabbar 80% av kvinnor. Hormonersättningsterapi (HRT) är den mest effektiva behandlingen. Ny forskning har omvärderat riskerna: för friska kvinnor under 60 år eller inom 10 år efter menopaus är fördelarna ofta större än riskerna. Risken för bröstcancer beror på typ av gestagen. Diskutera individuell riskprofil med oss – det finns inte ett svar för alla.",
  },
  {
    slug: "panikattack-hantera",
    title: "Panikattack – vad som händer i kroppen och hur du stoppar den",
    tag: "PSYKISK HÄLSA",
    date: "april 14, 2021",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "En panikattack toppar på 10 minuter och känns som döden – men är ofarlig. Lär dig hantera den.",
    body: "En panikattack aktiverar kroppens flykt-eller-fäkt-system och ger hjärtklappning, andfåddhet, yrsel, stickningar, svettningar och en känsla av att dö eller bli galen – utan verklig fara. Toppen nås på ca 10 minuter. Tekniker: boxandning (4-4-4-4), grounding (5 saker du ser, 4 du hör, 3 du känner, 2 du luktar, 1 du smakar), acceptera utan att kämpa emot. Återkommande panikattacker kräver KBT-behandling.",
  },
  {
    slug: "trombos-djup-ventrombos",
    title: "Blodpropp – symtom, riskfaktorer och förebyggande",
    tag: "HJÄRTA",
    date: "mars 8, 2021",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Djup ventrombos kan leda till lungemboli. Lär dig tecknen och riskfaktorerna.",
    body: "Djup ventrombos (DVT) uppstår vanligen i benvenen och ger smärta, svullnad och rodnad i ena benet. En lossnad blodpropp som når lungorna kallas lungemboli – livshotande. Riskfaktorer: långvarig immobilisering (långa flygningar), kirurgi, cancer, p-piller, graviditet, övervikt och ärftlighet. Förebyggande vid långa resor: rörelse, kompressionsstrumpor och god hydrering. Antikoagulation är behandlingen. Ring 112 vid misstänkt lungemboli.",
  },
  {
    slug: "makuladegeneration-ogon",
    title: "Makuladegeneration – den vanligaste orsaken till blindhet hos äldre",
    tag: "NEUROLOGI",
    date: "februari 12, 2021",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "AMD drabbar var fjärde person över 75. Tidig behandling kan rädda synen.",
    body: "Åldersrelaterad makuladegeneration (AMD) förstör det centrala synfältet. Torr form (85%): långsam progression, inga godkända behandlingar men AREDS2-tillskott kan bromsa. Våt form (15%): snabb progression med blödningar – behandlas effektivt med anti-VEGF-injektioner i ögat om det tas i tid. Riskfaktorer: ålder, rökning, ärftlighet, ljus hudfärg och övervikt. Regelbundna ögonundersökningar efter 60 är viktiga.",
  },
  {
    slug: "sjalvvard-vid-forkylning",
    title: "Självvård vid förkylning – vad som faktiskt hjälper",
    tag: "INFEKTIONER",
    date: "januari 5, 2021",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Det finns inget botemedel mot förkylning – men du kan lindra symtomen avsevärt.",
    body: "Förkylning orsakas av virus (oftast rhinovirus) och varar 7–10 dagar. Vad hjälper: vila och sömn (immunförsvaret arbetar hårdare under sömn), rikligt vätskeintag, saltvattenssköljning för nässlemhinnorna, mentol-inhalation, paracetamol/ibuprofen mot smärta, zink-sugtabletter (kan korta förkylningen med 1–2 dagar om tagna inom 24 timmar). Antibiotika hjälper inte. Sök vård om symtomen förvärras efter dag 3–4.",
  },
  {
    slug: "adhd-vuxna",
    title: "ADHD hos vuxna – symtom, diagnos och behandling",
    tag: "PSYKISK HÄLSA",
    date: "december 8, 2020",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Många vuxna med ADHD fick aldrig diagnos som barn. Lär dig känna igen det.",
    body: "ADHD hos vuxna yttrar sig ofta annorlunda än hos barn: snarare koncentrationssvårigheter och inre rastlöshet än hyperaktivitet. Vanliga tecken: svårt att avsluta uppgifter, tendens att skjuta upp, ofta för sent, glömsk, impulsiv i beslut och svårt att hantera stress. Diagnos görs av psykolog/psykiater med strukturerade instrument. Behandling: centralstimulantia (metylfenidat, amfetamin) plus KBT. Medicin är mycket effektiv – bortom myterna.",
  },
  {
    slug: "bipolart-syndrom",
    title: "Bipolärt syndrom – att leva med manier och depressioner",
    tag: "PSYKISK HÄLSA",
    date: "november 14, 2020",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Bipolärt missförstås ofta som vanliga humörsvängningar. Det är en allvarlig men behandlingsbar sjukdom.",
    body: "Bipolärt syndrom innebär episoder av mani (upprymdhet, minskat sömnbehov, storhetskänslor, impulsivitet) och depression. Typ 1: fullblåst mani. Typ 2: hypomani (mildare). Feldiagnostiseras ofta som depression (mani-episoder missas). Litium är fortfarande guld-standard för förebyggande behandling. Antidepressiva utan stämningsstabilisator kan utlösa mani. Kräver psykiatrisk uppföljning – men med rätt behandling lever de flesta produktiva liv.",
  },
  {
    slug: "immunforsvaret-starka",
    title: "Stärka immunförsvaret – vad som faktiskt fungerar",
    tag: "LIVSSTIL",
    date: "oktober 20, 2020",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Inga superfood 'boostar' immunförsvaret. Men rätt livsstil håller det i toppskick.",
    body: "Immunsystemet är komplext och kan inte 'boostas' med en produkt. Vad som faktiskt håller det starkt: sömn (under 6 timmar/natt halverar antikroppssvar på vaccin), motion (30 min/dag minskar infektionsrisk med 40%), stresshantering (kortisol hämmar immunsystemet), balanserad kost med tillräckligt zink och C-vitamin, vaccination och icke-rökning. Undvik produkter som lovar att 'stärka immunförsvaret' utan belägg.",
  },
  {
    slug: "hypertyreos-symtom",
    title: "Hypertyreos – när sköldkörteln producerar för mycket hormoner",
    tag: "HORMONER",
    date: "september 15, 2020",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Hjärtklappning, viktminskning och nervositet kan vara tecken på hypertyreos.",
    body: "Hypertyreos uppstår när sköldkörteln producerar för mycket T3 och T4. Vanligaste orsak: Graves sjukdom (autoimmun). Symtom: hjärtklappning, viktminskning trots god aptit, värmeintolerans, svettningar, darrningar, oro/ångest, sömnsvårigheter och diarré. Diagnos: lågt TSH och förhöjt fritt T4. Behandling: tyreostatika (tiamazol), radiojodinbehandling eller kirurgi. Obehandlad hypertyreos ökar risken för atrieflimmer och osteoporos.",
  },
  {
    slug: "borrelia-fasting",
    title: "Borrelia – symtom, behandling och när fästingbett kräver vård",
    tag: "INFEKTIONER",
    date: "augusti 8, 2020",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Borrelia smittar via fästingar men är enkelt behandlat om det tas i tid.",
    body: "Borrelia är en bakterieinfektion som sprids av fästingar infekterade med Borrelia burgdorferi. Tidigt tecken: wandering erythema – en röd, expanderande ring runt bettet (uppträder hos 70%). Utan behandling kan borrelia sprida sig till leder, hjärtat och nervsystemet. Behandling: doxycyklin 10–14 dagar i tidigt stadium, längre vid spridd infektion. Fästingbett utan utslag kräver inte automatiskt antibiotika – men följ bettstället i 4–6 veckor.",
  },
  {
    slug: "tarmcancer-screening",
    title: "Tarmcancer – varför du bör delta i screeningprogrammet",
    tag: "CANCER",
    date: "juli 12, 2020",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Tarmcancer är den tredje vanligaste cancerformen men botas i 90% om den hittas tidigt.",
    body: "Tjocktarmscancer drabbar 6 000 svenskar per år. Tidig cancer (stadium I) botas i 90% av fallen – sent stadium (IV) bara 10%. Symtom: blod i avföring, förändrat avföringsmönster, magsmärta, viktnedgång och anemi. Screening (kolorektal cancer): i Sverige erbjuds 60–74-åringar avföringsprov (FIT) vartannat år. Riskgrupper (ärftlighet, IBD) bör koloskoperas tidigare. Kontakta oss om du har symtom.",
  },
  {
    slug: "prostata-godartad",
    title: "Godartad prostataförstoring – symtom och behandling",
    tag: "UROLOGI",
    date: "juni 18, 2020",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "BPH drabbar hälften av män över 50 och 90% av män över 80. Det finns bra behandling.",
    body: "Benign prostatahyperplasi (BPH) ger svag urinstråle, trängningar, tveksam start, ofullständig blåstömning och nattliga uppsteg. Behandling: livsstilsförändringar (minska koffein och alkohol, träna bäckenbotten), alfablockerare (tamsulosin) för snabb symtomlindring, 5-alfareduktashämmare (finasterid) vid stor prostatakörtel. Kirurgi (TURP) vid svår obstruktion. PSA-test utesluter prostatacancer.",
  },
  {
    slug: "kost-vid-hogblodtryck",
    title: "DASH-dieten – kosten som sänker blodtrycket bevisat",
    tag: "HJÄRTA",
    date: "maj 25, 2020",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "DASH-dieten kan sänka systoliskt blodtryck med 8–14 mmHg – lika mycket som ett blodtrycksmedicin.",
    body: "DASH (Dietary Approaches to Stop Hypertension) är kostmönstret med starkast evidens för blodtryckssänkning. Principerna: rikligt med frukt, grönsaker, fullkorn och mejeriprodukter med låg fetthalt. Begränsa: rött kött, socker, mättat fett och framförallt salt (under 5–6 g/dag). Kalium (bananer, potatis, avokado) motverkar saltets blodtryckshöjande effekt. Kombinera med rörelse för optimal effekt.",
  },
  {
    slug: "njurbäckeninflammation",
    title: "Njurbäckeninflammation – symtom och varför det är allvarligare än UVI",
    tag: "UROLOGI",
    date: "april 30, 2020",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "När en UVI når njurarna blir det allvarligare och kräver längre antibiotikabehandling.",
    body: "Njurbäckeninflammation (pyelonefrit) uppstår när bakterier från urinblåsan når njurarna. Symtom: hög feber (38,5°C+), frossa, ryggsmärta/flanksmärta, illamående och UVI-symtom. Kräver omedelbar läkarkontakt och antibiotika i 7–14 dagar (längre än vanlig UVI). Svåra fall kräver sjukhusvård med intravenöst antibiotika. Risken ökar vid graviditet, diabetes, njursten och strukturella urinvägsavvikelser.",
  },
  {
    slug: "hypoglykemi-lavt-blodsocker",
    title: "Lågt blodsocker (hypoglykemi) – symtom, orsaker och akuthjälp",
    tag: "DIABETES",
    date: "mars 20, 2020",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Hypoglykemi kan drabba också icke-diabetiker. Lär dig känna igen och behandla det.",
    body: "Hypoglykemi definieras som blodsocker under 4 mmol/L. Symtom: darrningar, svettningar, hjärtklappning, hunger, yrsel, förvirring och i svåra fall medvetslöshet. Hos diabetiker: för mycket insulin, hoppat måltid eller ovanlig träning. Hos icke-diabetiker: reaktiv hypoglykemi efter socker, alkohol på tom mage, leversjukdom. Akutbehandling: 15g snabba kolhydrater (3 druvsockertabletter, 1,5 dl juice). Upprepa om inte bättre efter 15 min.",
  },
  {
    slug: "sömnapne",
    title: "Sömnapné – vanligare än du tror och kopplat till allvarliga sjukdomar",
    tag: "LIVSSTIL",
    date: "februari 15, 2020",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Snarkning är inte alltid ofarligt. Sömnapné ökar risken för hjärtsjukdom, stroke och diabetes.",
    body: "Obstruktiv sömnapné innebär upprepade andningsstopp under sömnen, orsakat av att luftvägen kollapsar. Symtom: högt snarkning med andningsuppehåll, extrem dagtrötthet, nattliga uppvaknanden och morgonhuvudvärk. Riskfaktorer: övervikt, stor nackomfång, alkohol och rökning. Behandling: CPAP (goldstandard), viktminskning, sömnposition och i vissa fall kirurgi. Obehandlad sömnapné ökar risken för hypertoni, hjärtinfarkt, stroke och typ 2-diabetes.",
  },
  {
    slug: "mensvark-behandling",
    title: "Mensvärk – normal, primär eller ett tecken på endometrios?",
    tag: "HORMONER",
    date: "januari 20, 2020",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Inte all mensvärk är normal. Svår värk kan vara ett tecken på endometrios.",
    body: "Primär dysmenorré (vanlig mensvärk) orsakas av prostaglandiner och behandlas effektivt med NSAID (ibuprofen, naproxen – tas 1–2 dagar innan mens). Sekundär dysmenorré kan tyda på endometrios, myom eller IUD-komplikation. Endometrios drabbar 10% av fertila kvinnor och tar i genomsnitt 7–8 år att diagnosticera. Tecken: smärta utanför menstruationsdagarna, smärta vid samlag, tarmbesvär under mens och infertilitet. Kräver remiss till gynekolog.",
  },
  {
    slug: "rona-covid-seneffekter",
    title: "Long COVID – symtom, orsaker och vad som kan hjälpa",
    tag: "INFEKTIONER",
    date: "december 12, 2019",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Var tionde COVID-patient utvecklar kvarstående symtom. Forskningen börjar kartlägga orsaken.",
    body: "Long COVID definieras som symtom som kvarstår mer än 12 veckor efter akut COVID-19. Vanligaste symtom: extrem trötthet (post-exertional malaise), kognitiva problem ('brain fog'), andfåddhet, hjärtklappning och sömnstörningar. Mekanismer: kvarvarande virusreservoarer, autoimmun aktivering, mikrokoagulation och dysautonomia. Behandling: pacing (energihushållning), symtomriktade insatser och rehabilitering. Forskning pågår aktivt.",
  },
  {
    slug: "lungcancer-tecken",
    title: "Lungcancer – de symtom du inte ska bortförklara",
    tag: "CANCER",
    date: "november 18, 2019",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Lungcancer ger ofta symtom sent. Tidig misstanke och snabb utredning är avgörande.",
    body: "Lungcancer är den cancerform som dödar flest i Sverige. Tidiga symtom är ofta ospecifika och bortförklaras: ihållande hosta (framförallt om förändrad), heshet, upprepade luftvägsinfektioner, blod i upphostningar, bröstsmärta vid djupandning och oförklarlig viktnedgång. Rökning är orsak i 85% av fallen men lungcancer drabbar även aldrig-rökare. Lågdos CT-screening erbjuds nu till högriskgrupper. Kontakta oss om du har symtom.",
  },
  {
    slug: "kost-hjarna",
    title: "Hjärnkost – mat som stärker minnet och skyddar mot kognitiv nedsättning",
    tag: "KOST",
    date: "oktober 22, 2019",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "MIND-dieten minskar risken för Alzheimers med upp till 53%. Här är principerna.",
    body: "MIND-dieten kombinerar Medelhavsdieten och DASH och är specifikt utformad för hjärnhälsa. Ät rikligt av: gröna bladgrönsaker (dagligen), bär (blåbär och jordgubbar minst 2 ggr/vecka), nötter, olivolja, fullkorn, fisk (1 ggr/vecka), bönor och fjäderfä. Begränsa: rött kött, smör/margarin, ost, bakverk och snabbmat. Studier visar 53% lägre risk för Alzheimers vid strikt följning och 35% vid måttlig.",
  },
  {
    slug: "resesjuka-forebygga",
    title: "Åksjuka – orsaker och effektiva förebyggande åtgärder",
    tag: "LIVSSTIL",
    date: "september 28, 2019",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Var tredje person lider av åksjuka. Det finns bra hjälp att få.",
    body: "Åksjuka uppstår när hjärnan får motstridiga signaler från ögon, inneröra och kropp. Mest utsatt: bilfärd med läsning, kryssning och VR. Förebyggande: titta på horisonten, sitt framåt i färdriktningen, undvik läsning, frisk luft, ät lätt, undvik alkohol. Läkemedel: meklozin (receptfritt), skopolamin-plåster (läkare), ingefära (viss evidens). Barn 2–12 år är mest känsliga. De flesta vuxna minskar känsligheten med åren.",
  },
  {
    slug: "leverbettan",
    title: "Levercirrhos – varningstecken och hur du skyddar levern",
    tag: "MAGE",
    date: "augusti 15, 2019",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Levern är tyst – den protesterar inte förrän skadan är stor. Lär dig varningstecknen.",
    body: "Levercirrhos är slutstadiet av kronisk leverskada – ärrvävnad ersätter fungerande leverceller. Orsaker: alkohol (vanligast), fettlever (NAFLD/NASH, kopplat till fetma och diabetes), hepatit B och C. Tidiga tecken: trötthet, aptitlöshet, illamående. Sena tecken: gulfärgning (ikterus), ascites (vätska i buken), förvirring (leverencefalopati) och blödningsbenägenhet. Levern har god regenerationsförmåga – sluta dricka alkohol och behandla grundorsaken tidigt.",
  },
  {
    slug: "epilepsi-fakta",
    title: "Epilepsi – fakta, myter och vad du gör vid ett anfall",
    tag: "NEUROLOGI",
    date: "juli 20, 2019",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Epilepsi är vanligare än de flesta tror. Lär dig hjälpa vid ett anfall.",
    body: "Epilepsi drabbar 60 000 svenskar. Det är en hjärnsjukdom med återkommande oprovocerade anfall. Myt: epilepsi är alltid kramper. Fakta: anfall kan se ut på många sätt – frånvaro, automatismer, styva muskler. Vad du gör vid tonisk-kloniskt anfall: lägg personen på sidan, ta bort farliga föremål, håll koll på tid. Ring 112 om: anfallet pågår mer än 5 minuter, om det är ett barn, om personen inte vaknar. Behandling: antiepileptika, effektivt hos 70%.",
  },
  {
    slug: "anemi-trotthet-jarnbrist",
    title: "Järnbristanemi – den vanligaste orsaken till extrem trötthet",
    tag: "SYMTOM",
    date: "juni 25, 2019",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Järnbrist är den vanligaste näringsbristsjukdomen globalt. Enkelt att diagnosticera och behandla.",
    body: "Järnbristanemi ger: extrem trötthet, blek hud, andfåddhet, hjärtklappning, huvudvärk, kallor och i svåra fall pica (sug att äta jord eller is). Vanligaste orsaker: riklig mens, graviditet, otillräckligt intag (veganer) och malabsorption (celiaki). Diagnos: blodprov med Hb, ferritin och transferrinmättnad. Behandling: järntabletter tas bäst på tom mage med C-vitamin, eller intravenöst järn vid svår brist eller malabsorption.",
  },
  {
    slug: "aptitlosa-aldring",
    title: "Undernäring hos äldre – ett underskattat folkhälsoproblem",
    tag: "ÄLDRE",
    date: "maj 30, 2019",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Var tredje äldre på sjukhus är undernärd. Det påverkar läkning, immunförsvar och livskvalitet.",
    body: "Undernäring hos äldre beror på minskad aptit (fysiologisk ålersförändrining, läkemedel, depression), sväljsvårigheter, ensamhet, ekonomi och kognitiv nedsättning. Konsekvenser: sämre sårläkning, nedsatt immunförsvar, muskelnedgång (sarkopeni), ökad fallrisk och förlängd sjukhusvistelse. Åtgärder: energirik och proteinrik kost, täta måltider, energitillskott, och vid behov dietistkontakt. Vår äldremottagning hjälper.",
  },
  {
    slug: "diabetes-fotter",
    title: "Diabetesfoten – varför fotvård är livsavgörande vid diabetes",
    tag: "DIABETES",
    date: "april 22, 2019",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Diabetesfotkomplikationer leder till 80% av alla amputationer i Sverige. De flesta är förebyggbara.",
    body: "Diabetes skadar nerver (neuropati) och blodkärl i fötterna. Neuropati ger domningar – du känner inte sår eller trycksår. Dålig cirkulation hindrar läkning. Resultat: kroniska sår som kan leda till amputation. Daglig fotkontroll är obligatorisk vid diabetes. Inspektera: sprickor, rödhet, sår, svullnad. Bär alltid skor, aldrig barfota inomhus. Klipp naglarna rakt. Kontakta oss eller diabetesteamet vid minsta sår.",
  },
  {
    slug: "ms-multipel-skleros",
    title: "MS – multipel skleros, symtom och vad modern behandling kan ge",
    tag: "NEUROLOGI",
    date: "mars 28, 2019",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "MS drabbar 20 000 svenskar. Modern behandling har revolutionerat prognosen.",
    body: "Multipel skleros är en kronisk autoimmun sjukdom som angriper myelinskidan runt nervceller. Symtom varierar beroende på var i CNS skadan sker: synstörningar (optikus neurit), domningar, motorikproblem, trötthet och kognitiva svårigheter. Skovvis MS (85%): perioder med symtom följt av förbättring. Modern behandling (DMT) minskar skovsfrekvensen med 50–70%. Tidigt insatt behandling ger bäst långtidsprognos.",
  },
  {
    slug: "vardaglig-rorelse",
    title: "NEAT – den dolda träningen som förbränner mer kalorier än gymmet",
    tag: "LIVSSTIL",
    date: "februari 20, 2019",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Non-exercise activity thermogenesis (NEAT) är energiförbrukning utanför schemalagd träning.",
    body: "NEAT innefattar all rörelse som inte är schemalagd träning: att gå, stå, ha händerna rörliga och fidgeting. Aktiva individer förbrukar via NEAT upp till 2000 extra kalorier per dag jämfört med stillasittande – mycket mer än vad du bränner på gymmet. Tips: stå istället för att sitta, ta trapporna, gå vid telefonsamtal, cykla till jobbet, ta korta promenadpauser varannan timme. Stillasittande är farligt oavsett om du tränar.",
  },
  {
    slug: "psoriasis-behandling",
    title: "Psoriasis – modern behandling som faktiskt fungerar",
    tag: "HUD",
    date: "januari 15, 2019",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Psoriasis är inte bara hudsjukdom – det påverkar leder, hjärtat och psyket.",
    body: "Psoriasis är en autoimmun inflammatorisk sjukdom med silverfjälliga plack, klåda och sveda. Drabbar 2–3% av befolkningen. Kopplat till psoriasisartrit (20%), ökad hjärt-kärlrisk och depression. Behandling: lokala steroider och D-vitaminanalog (lindrig), metotrexat och acitretin (måttlig-svår), biologiska läkemedel (IL-17, IL-23, TNF-hämmare – mycket effektiva). Solljus och havsbad hjälper många. Undvik triggrar: stress, infektioner, alkohol.",
  },
  {
    slug: "inkontinens-man",
    title: "Urininkontinens hos män – inte bara ett problem för äldre",
    tag: "UROLOGI",
    date: "december 10, 2018",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Urinläckage hos män har ofta koppling till prostata. Det finns effektiv behandling.",
    body: "Urininkontinens hos män orsakas ofta av prostataförstoring, prostatacancerbehandling (kirurgi/strålning) eller neurologiska tillstånd. Typer: trängningsinkontinens (plötslig kraftig trängning), blandinkontinens och postoperativ stressinkontinens. Behandling: bäckenbottenträning (effektivt efter prostatarektomi), blåsträning, alfablockerare och antikolinergika. I svåra fall: sfinkterprostes eller TVT-operation. Sök hjälp – det behöver inte begränsa ditt liv.",
  },
  {
    slug: "kronisk-bronkit",
    title: "KOL och kronisk bronkit – rökarens sjukdom som drabbar allt fler",
    tag: "INFEKTIONER",
    date: "november 5, 2018",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "KOL är den tredje vanligaste dödsorsaken globalt. Den är underdiagnostiserad och kan bromsas.",
    body: "Kronisk obstruktiv lungsjukdom (KOL) orsakas till 80–90% av rökning. Symtom: progredierande andfåddhet, kronisk hosta (morgonhosta), ökad slemproduktion. Diagnos med spirometri. KOL är oåterkalleligt – det går inte att reparera skadan. Men: sluta röka bromsar sjukdomsprogressionen dramatiskt. Behandling: bronkdilaterare, inhalationskortisonsteroid, pulmonell rehabilitering och vaccination. Kontrollera lungfunktionen om du är rökare eller ex-rökare.",
  },
  {
    slug: "hjarnkonkussion",
    title: "Hjärnskakning – vad du måste veta om symptom och återhämtning",
    tag: "NEUROLOGI",
    date: "oktober 8, 2018",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Hjärnskakning kräver mer respekt än vi brukar ge den. Här är rätt hantering.",
    body: "Hjärnskakning är en mild traumatisk hjärnskada utan strukturell skada, men med funktionell påverkan. Symtom: huvuvädrk, illamående, ljus/ljudkänslighet, minneslucka, förvirring och trötthet. Röda flaggor som kräver akutvård: medvetslöshet, upprepade kräkningar, kramper, tilltagande huvudvärk och neurologi. Vila är hörnstenen i behandling – men absolut sängvila är inte längre rekommenderat. Gradvis återgång till aktivitet. 'Return to Play'-protokoll vid idrott.",
  },
  {
    slug: "sarkopenin-muskelmassa-aldring",
    title: "Sarkopeni – varför du förlorar muskelmassa med åldern och vad du gör",
    tag: "ÄLDRE",
    date: "september 12, 2018",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Vi förlorar 3–8% muskelmassa per decennium efter 30. Det är inte oundvikligt.",
    body: "Sarkopeni är åldersrelaterad förlust av muskelmassa och funktion. Konsekvenser: ökad fallrisk, försämrad metabolsim, sämre insulinkänslighet och minskad livskvalitet. Orsaker: minskad fysisk aktivitet, otillräckligt proteinintag, hormonnedgång och inflammation. Förebyggande och behandling: styrketräning (effektivt även för 80-90-åringar), proteinrikt kostintag (1,2–1,6 g/kg/dag), leucinrika livsmedel (ägg, fisk, mejeriprodukter) och D-vitamin.",
  },
  {
    slug: "fodselmarkoppling",
    title: "Födselmärken och leverfläckar – guide till vad du ska hålla koll på",
    tag: "HUD",
    date: "augusti 16, 2018",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "De flesta leverfläckar är ofarliga – men några förändringar kräver snabb bedömning.",
    body: "Normala leverfläckar (nevi): jämn brun färg, symmetrisk form, under 6 mm. Kontrollera med ABCDE: Asymmetri, Border (ojämn), Color (fler färger), Diameter (över 6 mm), Evolution (förändring). Kongenitala nevi (födselmärken) har låg men förhöjd risk för melanom. Fotografera dina fläckar och dokumentera förändringar. Hos oss kan du skicka bilder via prickmottagningen för snabb bedömning utan att behöva boka tid.",
  },
  {
    slug: "kostfiber-tarm",
    title: "Kostfiber – varför du troligen äter för lite och hur du ökar intaget",
    tag: "KOST",
    date: "juli 22, 2018",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "90% av svenskar äter för lite fiber. Det ökar risken för en rad sjukdomar.",
    body: "Rekommenderat fiberintag: 25–35 g/dag. Genomsnittlig svensk äter ca 18 g. Fiber mättar, sänker kolesterol, reglerar blodsocker, minskar risken för tarmcancer och matar tarmfloran. Lösliga fibrer (havre, bönor, äpplen, psyllium): sänker LDL. Olösliga fibrer (fullkorn, nötter, grönsaker): ger volym och förebygger förstoppning. Öka intaget gradvis för att undvika gaser. Drick mer vatten parallellt.",
  },
  {
    slug: "alkohol-lever-konsekvenser",
    title: "Alkohol och levern – från fettlever till cirrhos",
    tag: "MAGE",
    date: "juni 28, 2018",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Alkoholrelaterad leversjukdom följer ett mönster. Tidiga stadier är reversibla.",
    body: "Alkohol metaboliseras nästan uteslutande i levern. Steg 1: Alkoholfettlever – uppstår vid regelbunden konsumption, helt reversibel vid alkoholfrihet. Steg 2: Alkoholhepatit – inflammation, kan vara allvarlig. Steg 3: Cirrhos – irreversibel ärrbildning. Redan 2–3 glas alkohol dagligen ökar risken. Leverprover (ALAT, ASAT, GT) är enkla blodprov som avslöjar tidig leverpåverkan. Ring oss om du vill testa dina leverprover eller diskutera alkohol.",
  },
  {
    slug: "barn-mage-appendicit",
    title: "Blindtarmsinflammation hos barn – symtom och när det är akut",
    tag: "BARN",
    date: "maj 25, 2018",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Appendicit är den vanligaste orsaken till akutkirurgi hos barn. Lär dig symtomen.",
    body: "Appendicit börjar typiskt med diffus smärta runt naveln som vandrar till nedre högra buken (McBurney's punkt) under 12–24 timmar. Åtföljs av illamående, kräkningar, aptitlöshet och lätt feber. Barn kan ha atypiska symtom – peka med fingret om du ber dem visa var det gör ont. Perforering sker om behandling dröjer. Sök akutvård om: smärtan förvärras, barnet har feber och ont i nedre högra buken, eller om barnet är väldig sjukt.",
  },
  {
    slug: "vitamin-b12-brist",
    title: "B12-brist – en tyst epidemi med allvarliga konsekvenser",
    tag: "KOST",
    date: "april 30, 2018",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "B12-brist kan ge irreversibla nervskador om det inte behandlas i tid.",
    body: "Vitamin B12 är nödvändigt för nervsystemet och blodcellsproduktion. Brist ger: trötthet, domningar/stickningar i händer och fötter, minnesproblem, depression och vid svår brist: irreversibel nervskada. Riskgrupper: veganer och vegetarianer (B12 finns bara i animalier), äldre (minskad magsyra och intrinsic factor), metforminbrukare och vid magsäcksoperation. Diagnos: B12 i blod. Behandling: tillskott oralt eller injektion.",
  },
  {
    slug: "atopisk-dermatit-vuxen",
    title: "Atopisk dermatit hos vuxna – modern behandling inklusive biologiska läkemedel",
    tag: "HUD",
    date: "mars 22, 2018",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Atopisk dermatit är inte bara ett barnproblem. Vuxna får det och nya behandlingar finns.",
    body: "Atopisk dermatit (AD) hos vuxna kan vara kvarvarande från barndomen eller debutera i vuxen ålder. Svår AD hos vuxna: intensiv klåda, sömnstörningar, infektionskänslighet och psykisk påverkan (depression, ångest). Modern behandling: dupilumab (biologisk IL-4/13-hämmare) – dramatisk effekt hos svåra fall. Även JAK-hämmare (baricitinib, upadacitinib) som tablettbehandling. Dessa är receptbelagda och kräver specialistremiss – vi hjälper dig dit.",
  },
  {
    slug: "mononukleos-kysssjukan",
    title: "Körtelfeber (mononukleos) – allt du behöver veta",
    tag: "INFEKTIONER",
    date: "februari 25, 2018",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Körtelfeber drabbar framförallt unga och kan ge månader av trötthet.",
    body: "Infektiös mononukleos orsakas av Epstein-Barr-virus (EBV). Symtom: extrem trötthet, halsont (kan likna strep), svullna lymfkörtlar (hals, armhåla, ljumske), feber och i 50% förstoring av mjälten. Diagnos: blodprov (mono-test, EBV-antikroppar). Behandling: ingen specifik – vila och symtomlindring. Undvik kontaktidrott i 4–6 veckor pga mjältförstoring (risk för bristning). Tröttheten kan kvarstå månader. Amoxicillin/ampicillin ger utslag vid EBV.",
  },
  {
    slug: "overaktiv-blaasa",
    title: "Överaktiv blåsa – symtom, orsaker och behandling",
    tag: "UROLOGI",
    date: "januari 30, 2018",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Trängningar och täta toalettbesök begränsar livet för miljontals svenska. Det behöver det inte.",
    body: "Överaktiv blåsa (OAB) ger plötsliga, svårkontrollerade trängningar att kissa, ofta med läckage (trängningsinkontinens). Drabbar 15% av befolkningen. Orsaker: överaktiva blåsmuskler, neurologiska tillstånd, östrogenbrist (menopaus) och urinvägsinfektion. Behandling: blåsträning (effektivt förstahandsval), bäckenbottenövningar, antikolinergika (solifenacin, tolterodin), mirabegron och i svåra fall botulinumtoxin-injektioner i blåsan.",
  },
  {
    slug: "kortisonet-bipåverkan",
    title: "Kortison – viktigt läkemedel med biverkningar du bör känna till",
    tag: "LÄKEMEDEL",
    date: "december 15, 2017",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Kortison är ett av de mest använda läkemedlen. Korrekt användning minimerar biverkningar.",
    body: "Kortison (kortikosteroider) är potent antiinflammatoriska och används vid astma, allergi, reumatism, IBD och hud. Lokalt kortison (inhalation, nässpray, kräm): minimal systemabsorption, mycket säkert. Systemiskt kortison (tabletter, injektioner): effektivt men biverkningar vid lång tids behandling: viktuppgång, benskörhet, diabetes, immunsuppression, hudatrofi och adrenal suppression. Behandla alltid kortast möjliga tid med lägst effektiv dos.",
  },
  {
    slug: "overvikt-bmi",
    title: "BMI – vad det mäter, vad det inte mäter och vad som är viktigare",
    tag: "LIVSSTIL",
    date: "november 20, 2017",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "BMI är ett trubbigt mått. Midjemåttet och fettfördelningen säger mer om hälsorisk.",
    body: "BMI (Body Mass Index = vikt/längd²) används kliniskt men har begränsningar: den skiljer inte på fett- och muskelmassa, den tar inte hänsyn till fettfördelning. En muskulös person kan ha 'övervikts-BMI' med utmärkt hälsa. Mer informativt: midjemåttet (risk höjd vid >88 cm för kvinnor, >102 cm för män), midja-höftkvot och visceralt fett (mäts med DEXA). Central fetma (bukfett) ökar hjärt-kärlrisken mer än subkutant fett.",
  },
  {
    slug: "premenopaus-perimenopaus",
    title: "Perimenopaus – åren innan menopaus som få pratar om",
    tag: "HORMONER",
    date: "oktober 25, 2017",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Perimenopaus kan börja redan i 40-årsåldern och pågå i 4–8 år. Lär dig känna igen symtomen.",
    body: "Perimenopaus är övergångsfasen innan menopaus (12 månader utan mens). Den börjar vanligtvis 45–50 år men kan starta i 40-årsåldern. Symtom: oregelbunden mens, vallningar, sömnstörningar, humörsvängningar, torrhet i underlivet och hjärtklappning. Hormonnivåerna varierar kraftigt – prover kan vara missvisande. Behandling: hormonersättning, lokalt östrogen för torra slemhinnor och stöd för sömnproblem. Kontakta oss om symtomen påverkar din vardag.",
  },
  {
    slug: "fosterskador-alkohol",
    title: "Alkohol under graviditet – det finns ingen känd säker mängd",
    tag: "GRAVIDITET",
    date: "september 18, 2017",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "FASD (fosterskador av alkohol) är den vanligaste förebyggbara orsaken till intellektuell funktionsnedsättning.",
    body: "Alkohol passerar moderkakan och fostret saknar förmåga att bryta ner det. Fetalt alkoholsyndrom (FAS) är svåraste formen: tillväxthämning, karakteristiska ansiktsdrag och neurologisk skada. Men även lägre doser kan ge partiella FASD: beteendeproblem, inlärningssvårigheter och uppmärksamhetsstörning. Det finns ingen känd säker gräns under graviditet. Rådet är tydligt: undvik alkohol helt under hela graviditeten.",
  },
  {
    slug: "hjartsvikt-tecken",
    title: "Hjärtsvikt – när hjärtat inte orkar pumpa tillräckligt",
    tag: "HJÄRTA",
    date: "augusti 22, 2017",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Hjärtsvikt drabbar 250 000 svenskar. Tidig diagnos och behandling förbättrar prognosen avsevärt.",
    body: "Hjärtsvikt innebär att hjärtat inte pumpar tillräckligt blod för kroppens behov. Symtom: andfåddhet (framförallt vid ansträngning och liggandes), trötthet, bensvullnad och nattlig hosta. Orsaker: hypertoni, hjärtinfarkt, klaff-fel och arytmier. Behandling: ACE-hämmare/ARB, betablockerare, diuretika (vätskedrivande) och aldosteronantagonist – kombinationen ökar överlevnad markant. Undvik salt och begränsa vätskeintag vid svår hjärtsvikt.",
  },
  {
    slug: "skadliga-kemikalier-mat",
    title: "Kemikalier i mat – vad du faktiskt behöver oroa dig för",
    tag: "KOST",
    date: "juli 28, 2017",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Mediebruset kring gifter i maten är stort. Lär dig skilja på verkliga risker och panikskapande rubriker.",
    body: "Verkliga risker att minimera: akrylamid (bildas vid upphettning av stärkelserika livsmedel – variera tillagning), bly och kadmium (inälvsmat, njure), PFAS i dricksvatten (kontrollera lokal vattenkvalitet), bisfenol A i plast (BPA-fritt är bättre för uppvärmning). Överskattade risker: rester av bekämpningsmedel på konventionella frukter/grönt (halterna är extremt låga – äta mer grönt är alltid rätt). Eko är bättre miljömässigt men inte nödvändigt av hälsoskäl.",
  },
  {
    slug: "osteoartrit-artros",
    title: "Artros – inte bara en ålderssjukdom och inte ofrånkomlig",
    tag: "RÖRELSEAPPARATEN",
    date: "juni 30, 2017",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Artros drabbar 700 000 svenskar. Rätt rörelse minskar smärtan – inte ökar den.",
    body: "Artros innebär nedbrytning av ledbrosk, framförallt i knä, höft, händer och ryggrad. Myten: 'slita ut lederna' genom träning. Fakta: ledbrosk saknar blodkärl och närs via rörelse – för lite rörelse förvärrar artros. Behandling: konditionsträning och styrketräning minskar smärta och förbättrar funktion. Viktminskning (1 kg minskar 4 kg belastning på knäet). NSAID och paracetamol vid behov. Kirurgi (total ledprotets) vid svår artros som inte svarar på konservativ behandling.",
  },
  {
    slug: "kost-inflammation",
    title: "Antiinflammatorisk kost – vad det innebär och om det fungerar",
    tag: "KOST",
    date: "maj 28, 2017",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Kronisk inflammation kopplas till de flesta civilisationssjukdomarna. Kosten spelar roll.",
    body: "Kronisk låggradig inflammation bidrar till hjärt-kärlsjukdom, diabetes typ 2, cancer och demens. Antiinflammatorisk kost liknar Medelhavsdieten: olivolja, fet fisk, bär, mörka grönsaker, nötter, fullkorn och kryddor (gurkmeja, ingefära). Proinflammatorisk mat: socker, transfett, raffinerade kolhydrater, röda och processade köttkuddar och alkohol. Ingen enskild mat är magisk – det är det totala kostmönstret över tid som avgör.",
  },
  {
    slug: "glaukom-ogontryck",
    title: "Glaukom – den smygande ögonsjukdomen som leder till blindhet",
    tag: "NEUROLOGI",
    date: "april 25, 2017",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Glaukom ger inga symtom förrän stor skada redan skett. Regelbunden ögonkontroll är avgörande.",
    body: "Glaukom skadas synnerven, oftast pga förhöjt ögontryck. Det börjar i perifera synfältet – du märker det inte förrän stort synfält förlorats. Riskfaktorer: ålder (över 60), ärftlighet, hög närsynthet och diabetes. Tidig diagnos via ögonläkare: tryckmätning, synfälttest och seende av synnerv. Behandling: ögondroppar som sänker trycket, laser eller kirurgi. Skadan är irreversibel – men bromsmediciner håller den kvar.",
  },
  {
    slug: "folsyra-neural-ror",
    title: "Folsyra vid graviditet – varför du ska börja ta det redan innan du är gravid",
    tag: "GRAVIDITET",
    date: "mars 30, 2017",
    image: "/bilder/aktuellt-1.jpg",
    excerpt: "Neuralrörsdefekter bildas under de första 28 dagarna av graviditeten – innan de flesta vet att de är gravida.",
    body: "Neuralrörsdefekter (spina bifida, anencefali) uppstår under de första 4 graviditetsveckorna. Folsyra minskar risken med 50–70%. Rekommendation: 400 mikrogram folsyra dagligen från minst 4 veckor innan planerad graviditet till och med graviditetsvecka 12. Högre dos (5 mg) vid ärftlighet, epilepsiläkemedel eller diabetes. Folsyra finns i gröna bladgrönsaker men kosten räcker sällan – tillskott behövs.",
  },
  {
    slug: "neuropati-domningar-ben",
    title: "Perifer neuropati – domningar, stickningar och smärta i händer och fötter",
    tag: "NEUROLOGI",
    date: "februari 22, 2017",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "Perifer neuropati har många orsaker. Diabetes och B12-brist är de vanligaste.",
    body: "Perifer neuropati innebär skada på perifera nerver med domningar, stickningar, brännande smärta och svaghet, oftast i fötterna och händerna (strumpa-handske-mönster). Vanliga orsaker: diabetes (50% av diabetiker drabbas), B12-brist, alkohol, kemoterapi, hypothyreos, och ärftliga former. Behandling av grundorsaken bromsar progressionen. Smärtlindring: gabapentin, duloxetin, tricykliska antidepressiva och topikalt capsaicin.",
  },
  {
    slug: "depression-kost",
    title: "Kost och depression – det starka sambandet som forskning nu bekräftar",
    tag: "PSYKISK HÄLSA",
    date: "januari 28, 2017",
    image: "/bilder/aktuellt-3.jpg",
    excerpt: "Tarmens hälsa påverkar hjärnan via tarm-hjärna-axeln. Kosten spelar en roll vid depression.",
    body: "Forskning visar att Medelhavskost minskar risken för depression med 33%. Tarm-hjärna-axeln: 95% av serotonin produceras i tarmen, och tarmfloran kommunicerar direkt med hjärnan via vagusnerven. Kost som skyddar mot depression: omega-3, fermenterad mat, fiber, zink och magnesium. Kost som ökar risk: ultraprocessad mat, socker och alkohol. KoMET-studien visade att kostintervention minskade depressiva symtom lika effektivt som psykoterapi.",
  },
];

const monthMap: Record<string, number> = {
  januari: 0, februari: 1, mars: 2, april: 3, maj: 4, juni: 5,
  juli: 6, augusti: 7, september: 8, oktober: 9, november: 10, december: 11,
};

function parseDate(date: string): Date {
  const [month, day, year] = date.replace(",", "").split(" ");
  return new Date(Number(year), monthMap[month], Number(day));
}

articles.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

export const articlesBySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));

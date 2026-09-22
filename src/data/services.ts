export type ServiceStep = {
  title: string;
  description: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceSource = {
  label: string;
  href: string;
};

export type HealthcareService = {
  slug: string;
  name: string;
  eyebrow: string;
  seoTitle: string;
  metaDescription: string;
  title: string;
  lead: string;
  price: string;
  originalPrice?: string;
  priceNote: string;
  bookingHref: string;
  cardDescription: string;
  highlights: string[];
  suitableTitle: string;
  suitableIntro: string;
  suitableFor: string[];
  steps: ServiceStep[];
  scopeTitle: string;
  scopeIntro: string;
  scopeItems: string[];
  importantTitle: string;
  important: string[];
  faq: ServiceFaq[];
  relatedSlugs: string[];
  sources: ServiceSource[];
};

export type ServicePriceGroup = {
  category: string;
  items: { name: string; price: string }[];
};

export const vaccinePriceGroups: ServicePriceGroup[] = [
  {
    category: "Säsongs- och standardvaccin",
    items: [
      { name: "Säsongsinfluensa", price: "Från 460 kr" },
      { name: "TBE", price: "Från 420 kr" },
      { name: "Bältros (Shingrix)", price: "Från 2 500 kr" },
      { name: "RS-virus", price: "Från 2 220 kr" },
      { name: "HPV", price: "Från 2 395 kr" },
      { name: "Pneumokocker", price: "Från 995 kr" },
      { name: "Stelkramp, difteri och kikhosta", price: "Från 450 kr" },
      { name: "MPR", price: "Från 625 kr" },
    ],
  },
  {
    category: "Resevaccin",
    items: [
      { name: "Hepatit A", price: "Från 495 kr" },
      { name: "Hepatit B", price: "Från 480 kr" },
      { name: "Rabies", price: "Från 1 270 kr" },
      { name: "Tyfoidfeber", price: "Från 530 kr" },
      { name: "Kolera", price: "Från 520 kr" },
      { name: "Gula febern", price: "Från 735 kr" },
      { name: "Japansk encefalit", price: "Från 1 670 kr" },
      { name: "Dengue", price: "Från 2 140 kr" },
      { name: "Meningokocker (ACWY/B)", price: "Från 960 kr" },
    ],
  },
  {
    category: "Barn, graviditet och senior",
    items: [
      { name: "Barnvaccinationer", price: "Från 395 kr" },
      { name: "Vaccination under graviditet", price: "Från 395 kr" },
      { name: "Seniorvaccinationer 65+", price: "Från 295 kr" },
    ],
  },
];

export const healthcareServices: HealthcareService[] = [
  {
    slug: "fysiskt-lakarbesok",
    name: "Fysiskt läkarbesök",
    eyebrow: "Läkarbesök på plats",
    seoTitle: "Läkare på hembesök i Stockholm – fysiskt läkarbesök",
    metaDescription:
      "Boka ett privat läkarbesök hemma i Stockholm för 995 kr. Personlig medicinsk bedömning, fysisk undersökning och tydlig vägledning.",
    title: "Fysiskt läkarbesök hemma med tid för hela bilden",
    lead:
      "När besvären behöver undersökas på plats kommer läkaren hem till dig i Stockholm. Du får tid att beskriva hur du mår, en fysisk undersökning och en tydlig plan framåt.",
    price: "995 kr",
    originalPrice: "2 790 kr",
    priceNote: "Priset gäller läkarbesöket. Eventuella prover eller andra åtgärder kan tillkomma.",
    bookingHref: "/boka/fysiskt-lakarbesok",
    cardDescription:
      "Träffa en läkare på plats för medicinsk bedömning, kroppsundersökning och tydlig återkoppling. Kostar 995 kr.",
    highlights: ["Personlig läkarbedömning", "Fysisk undersökning vid behov", "Tydlig plan efter besöket"],
    suitableTitle: "När passar ett fysiskt läkarbesök?",
    suitableIntro:
      "Ett besök på plats är ofta rätt val när läkaren behöver undersöka kroppen eller när ett digitalt samtal inte ger tillräckligt underlag.",
    suitableFor: [
      "Nya eller återkommande symtom som behöver bedömas på plats",
      "Besvär från till exempel luftvägar, mage, hud, leder eller muskler",
      "Uppföljning av en behandling eller ett tidigare läkarbesök",
      "När du vill ha mer tid för frågor och en samlad medicinsk bedömning",
    ],
    steps: [
      { title: "Boka en tid", description: "Välj en tid och lämna kort information om vad du söker för." },
      { title: "Träffa läkaren", description: "Läkaren går igenom symtom och sjukdomshistoria och undersöker det som är relevant." },
      { title: "Få en plan", description: "Du får råd om behandling och uppföljning. Vid behov diskuteras provtagning eller remiss." },
    ],
    scopeTitle: "Det här ingår i besöket",
    scopeIntro:
      "Innehållet styrs av dina besvär. Målet är en trygg bedömning och att du förstår vad som händer härnäst.",
    scopeItems: [
      "Genomgång av symtom, läkemedel och relevant sjukdomshistoria",
      "Riktad fysisk undersökning utifrån medicinskt behov",
      "Individuell rådgivning och behandlingsplan",
      "Remiss när läkaren bedömer att det är medicinskt motiverat",
    ],
    importantTitle: "Bra att veta före besöket",
    important: [
      "Ta gärna fram din aktuella läkemedelslista och tidigare relevanta provsvar.",
      "Diagnos, provtagning eller remiss kan aldrig garanteras utan avgörs av läkaren.",
      "Vid livshotande symtom ska du ringa 112. För sjukvårdsrådgivning kan du ringa 1177.",
    ],
    faq: [
      { question: "Vad kostar ett fysiskt läkarbesök?", answer: "Besöket kostar just nu 995 kr, jämfört med ordinarie pris 2 790 kr. Eventuella prover, läkemedel eller andra åtgärder kan tillkomma." },
      { question: "Kan jag få remiss?", answer: "Ja, om läkaren efter sin bedömning anser att det är medicinskt motiverat. Remiss kan inte garanteras på förhand." },
      { question: "Vad ska jag förbereda?", answer: "Ha gärna legitimation, aktuell läkemedelslista och relevanta tidigare vård- eller provuppgifter tillgängliga." },
    ],
    relatedSlugs: ["digitalt-lakarbesok", "hudforandringar", "blodprovstagning"],
    sources: [
      { label: "1177 – Kroppsundersökning hos läkare", href: "https://www.1177.se/undersokning-behandling/undersokningar-och-provtagning/kroppsundersokningar/kroppsundersokning/" },
    ],
  },
  {
    slug: "digitalt-lakarbesok",
    name: "Digitalt läkarbesök",
    eyebrow: "Läkare via videosamtal",
    seoTitle: "Digitalt läkarbesök – träffa läkare online",
    metaDescription:
      "Boka digitalt läkarbesök för 595 kr. Träffa läkare via video för bedömning, rådgivning och behandling när besväret passar för digital vård.",
    title: "Digitalt läkarbesök – trygg vård där du är",
    lead:
      "Träffa en läkare via videosamtal för medicinsk bedömning, rådgivning och en tydlig plan. Om dina besvär behöver undersökas fysiskt hjälper vi dig att förstå nästa steg.",
    price: "595 kr",
    originalPrice: "995 kr",
    priceNote: "Priset gäller videosamtalet. Eventuella prover eller läkemedel ingår inte.",
    bookingHref: "/boka/digitalt-lakarbesok",
    cardDescription:
      "Träffa en läkare via videosamtal för medicinsk bedömning, rådgivning och behandling – tryggt och smidigt där du befinner dig.",
    highlights: ["Videosamtal med läkare", "Ingen restid", "Råd och plan efter besöket"],
    suitableTitle: "När passar digital vård?",
    suitableIntro:
      "Många besvär kan bedömas genom samtal, synliga symtom och en noggrann genomgång. Läkaren avgör alltid om underlaget räcker.",
    suitableFor: [
      "Rådgivning om nytillkomna eller återkommande besvär",
      "Uppföljning av en behandling eller tidigare bedömning",
      "Besvär som kan visas och beskrivas via video",
      "Frågor om läkemedel, egenvård och nästa steg",
    ],
    steps: [
      { title: "Boka videosamtal", description: "Välj en tid och beskriv kort vad du vill ha hjälp med." },
      { title: "Logga in", description: "Anslut från en lugn och välbelyst plats med fungerande kamera och ljud." },
      { title: "Få bedömning", description: "Läkaren gör en individuell bedömning och förklarar behandling eller fortsatt vård." },
    ],
    scopeTitle: "Det kan läkaren hjälpa dig med",
    scopeIntro: "Ett digitalt besök ger inte alltid samma undersökningsmöjligheter som ett fysiskt besök.",
    scopeItems: [
      "Medicinsk bedömning utifrån samtal och synliga symtom",
      "Råd om egenvård och behandling",
      "Hänvisning till fysisk vård, provtagning eller akut vård när det behövs",
    ],
    importantTitle: "När ska du välja annan vård?",
    important: [
      "Digital vård passar inte när läkaren behöver känna, lyssna eller ta prover för att kunna bedöma besväret.",
      "Sök akut vård vid till exempel svår andnöd, bröstsmärta, tecken på stroke eller snabbt försämrat allmäntillstånd.",
      "Ring 112 vid livshotande symtom och 1177 för sjukvårdsrådgivning.",
    ],
    faq: [
      { question: "Vad kostar ett digitalt läkarbesök?", answer: "Besöket kostar just nu 595 kr, jämfört med ordinarie pris 995 kr." },
      { question: "Vad händer om digital vård inte räcker?", answer: "Läkaren förklarar vilken fortsatt vård som behövs, till exempel ett fysiskt besök, provtagning eller akut bedömning." },
    ],
    relatedSlugs: ["fysiskt-lakarbesok", "hudforandringar", "blodprovstagning"],
    sources: [
      { label: "1177 – Videosamtal med vården", href: "https://www.1177.se/om-1177/nar-du-loggar-in-pa-1177.se/det-har-kan-du-gora-nar-du-loggat-in/kontakta-varden-pa-natet/videosamtal-med-varden/" },
    ],
  },
  {
    slug: "hudforandringar",
    name: "Hudförändringar",
    eyebrow: "Bedömning av hudbesvär",
    seoTitle: "Hudförändringar – medicinsk bedömning online",
    metaDescription:
      "Få en läkarbedömning av hudförändringar för 695 kr. Visa förändringen via bilder och video och få råd om rätt nästa steg.",
    title: "Låt en läkare bedöma din hudförändring",
    lead:
      "Har du upptäckt en ny prick, ett utslag eller en förändring i huden? Via bilder och videosamtal gör läkaren en första bedömning och hjälper dig vidare.",
    price: "695 kr",
    priceNote: "Priset gäller digital läkarbedömning. Provtagning, ingrepp eller specialistbesök ingår inte.",
    bookingHref: "/boka/hudforandringar",
    cardDescription:
      "Få en medicinsk bedömning av en hudförändring via ett digitalt läkarbesök och tydlig vägledning om nästa steg.",
    highlights: ["Bedömning via bilder och video", "Läkare går igenom förändringen", "Råd om fortsatt vård"],
    suitableTitle: "Hudbesvär vi kan göra en första bedömning av",
    suitableIntro:
      "Bra bilder och information om hur förändringen utvecklats hjälper läkaren. En digital bedömning kan behöva kompletteras på plats.",
    suitableFor: [
      "Nya eller förändrade födelsemärken och pigmentfläckar",
      "Utslag, rodnad, klåda eller torra hudområden",
      "Knölar, sår eller förändringar som inte läker",
      "Uppföljning av tidigare bedömda hudbesvär",
    ],
    steps: [
      { title: "Förbered bilder", description: "Ta skarpa bilder i dagsljus: en översiktsbild och en närbild, gärna med storleksreferens." },
      { title: "Träffa läkaren digitalt", description: "Berätta när förändringen kom, hur den utvecklats och om den ger symtom." },
      { title: "Få nästa steg", description: "Du får råd om behandling, egenvård eller om förändringen behöver undersökas fysiskt." },
    ],
    scopeTitle: "Läkaren tittar bland annat på",
    scopeIntro: "Bedömningen väger samman utseende, utveckling, symtom och dina medicinska riskfaktorer.",
    scopeItems: [
      "Form, färg, avgränsning och storlek",
      "Om förändringen vuxit, blött, kliat eller ändrat utseende",
      "Hur länge besväret funnits och tidigare behandlingar",
      "Om fysisk undersökning, dermatoskopi eller provtagning behövs",
    ],
    importantTitle: "Sök vård skyndsamt vid varningssignaler",
    important: [
      "Sök vård om ett födelsemärke eller en hudförändring växer, ändrar form eller färg, blöder eller inte läker.",
      "En digital bedömning ersätter inte dermatoskopi eller vävnadsprov när läkaren bedömer att det behövs.",
      "Vid snabbt försämrat allmäntillstånd, utbredda blåsor eller svår allergisk reaktion ska du söka akut vård.",
    ],
    faq: [
      { question: "Kan hudcancer uteslutas digitalt?", answer: "Nej. Bilder och video kan ge vägledning, men misstänkta förändringar behöver ofta undersökas på plats och ibland provtas." },
      { question: "Hur tar jag bra bilder?", answer: "Använd dagsljus, fokusera tydligt och ta både en översiktsbild och en närbild. Lägg gärna en linjal bredvid utan att täcka förändringen." },
      { question: "Vad händer om läkaren är osäker?", answer: "Du får rekommendation om fysisk undersökning, dermatoskopi eller annan fortsatt vård." },
    ],
    relatedSlugs: ["digitalt-lakarbesok", "fysiskt-lakarbesok", "blodprovstagning"],
    sources: [
      { label: "1177 – Födelsemärken och hudförändringar", href: "https://www.1177.se/sjukdomar--besvar/hud-har-och-naglar/fodelsemarken-och-hudforandringar/fodelsemarken-leverflackar" },
    ],
  },
  {
    slug: "vitamininjektioner",
    name: "Vitamininjektioner",
    eyebrow: "Behandling efter läkarbedömning",
    seoTitle: "Vitamininjektioner – bedömning och behandling",
    metaDescription:
      "Vitamininjektioner för 1 495 kr efter individuell medicinsk bedömning. Vi bedömer behov, lämplig behandling och säker uppföljning.",
    title: "Vitamininjektioner när det finns ett medicinskt behov",
    lead:
      "Injektioner ska användas på rätt indikation. Därför börjar vi med en medicinsk bedömning av symtom, tidigare provsvar och vilken behandling som är lämplig för dig.",
    price: "1 495 kr",
    priceNote: "Priset gäller injektionen. Vilket preparat som är lämpligt bedöms vid bokat besök av vårdpersonal.",
    bookingHref: "/boka/vitamininjektioner",
    cardDescription:
      "Boka en tid för vitamininjektion. Vårdpersonal går igenom behov och lämpligt preparat vid besöket.",
    highlights: ["Individuell bedömning", "Behandling på medicinsk indikation", "Säker administration"],
    suitableTitle: "När kan injektionsbehandling vara aktuell?",
    suitableIntro:
      "Behovet beror på vilket vitamin det gäller, orsaken till en eventuell brist och om kroppen kan tillgodogöra sig behandling via munnen.",
    suitableFor: [
      "Konstaterad eller misstänkt brist som behöver medicinsk bedömning",
      "Tidigare ordinerad injektionsbehandling som behöver följas upp",
      "Situationer där tabletter inte är lämpliga eller ger otillräcklig effekt",
      "När läkare bedömer att injektion är säkrare eller mer ändamålsenlig",
    ],
    steps: [
      { title: "Medicinsk bedömning", description: "Vi går igenom symtom, läkemedel, sjukdomar och relevanta provsvar." },
      { title: "Ordination", description: "Läkaren avgör om behandling behövs och vilket preparat, dos och intervall som är lämpligt." },
      { title: "Injektion och uppföljning", description: "Behandlingen ges av vårdpersonal och följs upp utifrån ordination och behov." },
    ],
    scopeTitle: "Säker behandling före snabba löften",
    scopeIntro: "Trötthet och liknande symtom kan ha många orsaker. En vitamininjektion är inte en generell energibehandling.",
    scopeItems: [
      "Bedömning av om symtom kan bero på vitaminbrist",
      "Genomgång av tidigare provsvar och eventuell kompletterande provtagning",
      "Kontroll av kontraindikationer och risker",
      "Plan för behandling och uppföljning när indikation finns",
    ],
    importantTitle: "Innan du bokar",
    important: [
      "Det behöver framgå vilket vitaminpreparat som erbjuds. Kontakta oss om du är osäker.",
      "Provtagning kan behövas innan behandling och kan innebära en separat kostnad.",
      "Vi lovar inte ökad energi, stärkt immunförsvar eller andra effekter utan konstaterat medicinskt behov.",
    ],
    faq: [
      { question: "Vilka vitamininjektioner erbjuder ni?", answer: "Utbud och ordination kan variera. Vårdpersonal går igenom vilket preparat som är lämpligt vid det bokade besöket." },
      { question: "Behöver jag ta blodprov först?", answer: "Det beror på symtom, tidigare diagnos och vilket vitamin det gäller. Läkaren avgör om provtagning behövs." },
      { question: "Kan jag boka en injektion utan läkarbedömning?", answer: "Nej, behandlingen ges endast när vården bedömer att den är medicinskt lämplig och säker." },
    ],
    relatedSlugs: ["blodprovstagning", "fysiskt-lakarbesok", "digitalt-lakarbesok"],
    sources: [
      { label: "1177 – Brist på vitamin B12", href: "https://www.1177.se/sjukdomar--besvar/hjarta-och-blodkarl/blodsjukdomar/blodbrist-pa-grund-av-for-lite-vitamin-b12/" },
    ],
  },
  {
    slug: "blodprovstagning",
    name: "Hälsokontroll",
    eyebrow: "Hälsokontroller med blodprov",
    seoTitle: "Blodprovstagning – välj hälsokontroll och blodprovspaket",
    metaDescription:
      "Välj bland sju blodprovspaket från 995 kr. Se exakt vilka markörer som ingår och få digitala provsvar efter provtagningen.",
    title: "Blodprovstagning med paket för olika behov",
    lead:
      "Välj en hälsokontroll utifrån hur bred analys du önskar. Du ser exakt vilka markörer som ingår i varje paket och får dina provsvar digitalt.",
    price: "Från 995 kr",
    priceNote: "Pris och antal markörer varierar mellan paketen. En hälsokontroll ersätter inte en individuell läkarbedömning vid symtom.",
    bookingHref: "/boka/blodprovstagning",
    cardDescription:
      "Välj ett paket utifrån hur omfattande hälsokontroll du önskar. Blodprovstagning och digitala provsvar ingår.",
    highlights: ["Sju tydliga paket", "Från 32 till 66 markörer", "Digitala provsvar"],
    suitableTitle: "Välj paket efter vad du vill undersöka",
    suitableIntro:
      "Paketen omfattar olika kombinationer av exempelvis blodstatus, blodsocker, blodfetter, lever, njurar, sköldkörtel, vitaminer och hormoner.",
    suitableFor: [
      "Dig som vill få en överblick över flera vanliga blodvärden",
      "Dig som vill följa utvalda värden över tid",
      "Dig som söker ett kvinno- eller mansanpassat paket",
      "Dig som vill välja mellan en grundläggande och mer omfattande kontroll",
    ],
    steps: [
      { title: "Jämför paketen", description: "Se pris, antal markörer och den exakta listan över analyser som ingår." },
      { title: "Genomför provtagningen", description: "Följ instruktionerna inför provet; vissa analyser kan kräva särskilda förberedelser." },
      { title: "Ta del av provsvaren", description: "Resultaten visas digitalt. Sök vård för medicinsk bedömning om ett värde avviker eller du har symtom." },
    ],
    scopeTitle: "Om blodprov och hälsokontroller",
    scopeIntro: "Ett provvärde behöver alltid tolkas i sitt sammanhang.",
    scopeItems: [
      "Referensintervall kan variera mellan laboratorier och individer",
      "Ett avvikande värde betyder inte automatiskt att du har en sjukdom",
      "Normala provsvar utesluter inte alla sjukdomar eller orsaker till symtom",
      "Läkare kan rekommendera omprov, kompletterande analys eller undersökning",
    ],
    importantTitle: "Sök vård utifrån symtom – inte bara provsvar",
    important: [
      "Har du nya eller tydliga symtom bör du boka en medicinsk bedömning i stället för att själv välja ett brett provpaket.",
      "Förberedelser som fasta och tidpunkt kan påverka vissa analyser; följ alltid instruktionerna du får.",
      "Kontakta vården om du behöver hjälp att tolka avvikande resultat.",
    ],
    faq: [
      { question: "Vilket blodprovspaket ska jag välja?", answer: "Välj efter vilka områden du vill undersöka och hur bred kontroll du önskar. Om du har symtom är det bättre att först få en läkarbedömning." },
      { question: "Behöver jag fasta före provtagningen?", answer: "Det beror på vilka analyser som ingår. Följ alltid de förberedelseinstruktioner du får inför just ditt prov." },
      { question: "Ingår läkarutlåtande?", answer: "Innehållet kan variera mellan paketen. Kontrollera paketinformationen vid bokning och boka läkarbesök om du behöver en medicinsk helhetsbedömning." },
    ],
    relatedSlugs: ["fysiskt-lakarbesok", "digitalt-lakarbesok", "vitamininjektioner"],
    sources: [
      { label: "1177 – Blodprov", href: "https://www.1177.se/undersokning-behandling/undersokningar-och-provtagning/provtagning-och-matningar/blodprov/" },
    ],
  },
  {
    slug: "vaccination-hemma",
    name: "Vaccination hemma",
    eyebrow: "Vaccination på en plats som passar dig",
    seoTitle: "Vaccination hemma – vaccin i hemmet i Stockholm",
    metaDescription:
      "Boka vaccination hemma i Stockholm. Se vaccin och frånpriser för bland annat influensa, TBE, bältros och resevaccination.",
    title: "Vaccination hemma – tryggt och smidigt",
    lead:
      "Få vaccination på en plats som passar dig. Vi hjälper dig att välja rätt vaccin utifrån ålder, hälsa, tidigare doser och eventuell resa.",
    price: "Från 295 kr/dos",
    priceNote: "Priser anges per dos. Hembesöksavgift kan tillkomma och flera vaccin kräver mer än en dos.",
    bookingHref: "/boka/vaccination-hemma",
    cardDescription:
      "Välj vaccin och boka en tid. Betalning sker inte i förväg – det slutliga priset stäms av vid besöket.",
    highlights: ["Vaccination i hemmet", "Standard- och resevaccin", "Individuell vaccinationsbedömning"],
    suitableTitle: "Vaccination för vardag, säsong och resa",
    suitableIntro:
      "Vilket skydd du behöver beror på bland annat ålder, hälsa, tidigare vaccinationer, resmål och hur snart du reser.",
    suitableFor: [
      "Säsongsvaccination, till exempel mot influensa",
      "Skydd mot exempelvis TBE, bältros eller pneumokocker",
      "Resevaccination inför utlandsvistelse",
      "Familjer, seniorer eller andra som föredrar vaccination i hemmet",
    ],
    steps: [
      { title: "Kontakta oss", description: "Berätta vilket vaccin du söker, vilka som ska vaccineras och önskad plats." },
      { title: "Vaccinationsbedömning", description: "Vi går igenom hälsa, allergier, läkemedel, tidigare doser och eventuellt resmål." },
      { title: "Vaccination och plan", description: "Vaccinet ges av vårdpersonal och du får information om skydd, vanliga reaktioner och nästa dos." },
    ],
    scopeTitle: "Inför vaccinationen",
    scopeIntro: "Ta gärna fram vaccinationshistorik och resplan innan du kontaktar oss.",
    scopeItems: [
      "Individuell kontroll av vilket vaccin som är lämpligt",
      "Genomgång av kontraindikationer och försiktighet",
      "Information om dosintervall och när skyddet förväntas börja",
      "Råd om vanliga reaktioner och när du ska söka vård",
    ],
    importantTitle: "Pris, doser och medicinska undantag",
    important: [
      "Frånpriser gäller per dos. Det totala priset beror på vaccin, antal doser och eventuell hembesöksavgift.",
      "Vaccination kan behöva skjutas upp vid vissa sjukdomstillstånd eller feber; vårdpersonalen gör den slutliga bedömningen.",
      "Inför resa bör rådgivning ske i god tid eftersom vissa vaccinationsserier tar flera veckor.",
    ],
    faq: [
      { question: "Vad kostar vaccination hemma?", answer: "Vaccinpriserna börjar på 295 kr per dos. Hembesöksavgift kan tillkomma och det totala priset beror på vaccin och antal doser." },
      { question: "Kan hela familjen vaccineras samtidigt?", answer: "Det går ofta att planera, men lämplighet och dos bedöms individuellt för varje person. Kontakta oss med antal personer och önskat vaccin." },
      { question: "Hur långt före en resa ska jag vaccinera mig?", answer: "Så tidigt som möjligt. Behov och schema beror på resmål, resans längd, tidigare doser och vilket vaccin som behövs." },
    ],
    relatedSlugs: ["fysiskt-lakarbesok", "digitalt-lakarbesok", "blodprovstagning"],
    sources: [
      { label: "Folkhälsomyndigheten – Rekommendationer om vaccination", href: "https://www.folkhalsomyndigheten.se/vara-amnesomraden/vaccinationer/rekommendationer-om-vaccination/" },
      { label: "1177 – Reseråd och vaccinationer", href: "https://www.1177.se/liv--halsa/reserad-och-vaccinationer/" },
    ],
  },
];

export const healthcareServicesBySlug = new Map(
  healthcareServices.map((service) => [service.slug, service]),
);

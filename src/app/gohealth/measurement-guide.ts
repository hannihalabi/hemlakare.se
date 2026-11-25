type MeasurementGroup = {
  id: string;
  title: string;
  intro: string;
  topics: { title: string; description: string; measures: string[] }[];
  sources: { label: string; href: string }[];
};

export const measurementGroups: MeasurementGroup[] = [
  {
    id: "blood",
    title: "Blodprov",
    intro: "Guiden visar exempel på möjliga analyser. Du och läkaren väljer vilka prover som är relevanta för dig utifrån dina symtom, din hälsa och dina mål.",
    topics: [
      {
        title: "Blodvärde och syretransport",
        description: "Hemoglobin bär syre till bland annat musklerna. Ett blodstatus visar hur många röda blodkroppar du har och deras storlek. Ett prov för retikulocyter visar nybildningen.",
        measures: ["Hemoglobin (Hb)", "Röda blodkroppar", "Andel röda blodkroppar (EVF)", "Cellstorlek (MCV)", "Retikulocyter"],
      },
      {
        title: "Järnförråd",
        description: "Om orken förändras kan läkaren undersöka både kroppens järnförråd och hur mycket järn som finns tillgängligt. Även inflammation kan påverka ferritin.",
        measures: ["Ferritin", "Järn", "Transferrin", "Transferrinmättnad"],
      },
      {
        title: "Blodsocker och ämnesomsättning",
        description: "Fasteglukos visar nivån vid provtagningen. HbA1c speglar blodsockret under de senaste två till tre månaderna. Andra analyser kan komplettera vid en utredning.",
        measures: ["Fasteglukos", "HbA1c", "Glukosbelastning", "Insulin", "C-peptid", "Ketoner"],
      },
      {
        title: "Blodfetter och hjärt–kärlhälsa",
        description: "Olika blodfetter och de partiklar som transporterar dem hjälper läkaren att bedöma din hjärt–kärlrisk tillsammans med bland annat blodtryck och ärftlighet.",
        measures: ["Totalkolesterol", "LDL", "HDL", "Non-HDL (beräknat)", "Triglycerider", "ApoB", "ApoA1", "Lipoprotein(a)"],
      },
      {
        title: "Muskler och fysisk belastning",
        description: "CK kan stiga efter ett hårt träningspass. Flera laktatprov under ett stegrande arbetsprov kan visa vid vilken ansträngning laktatnivån börjar stiga tydligt.",
        measures: ["Kreatinkinas (CK)", "Blodlaktat vid arbete"],
      },
      {
        title: "Inflammation och immunförsvar",
        description: "Vid misstanke om infektion eller inflammation kan läkaren väga samman inflammationsprover och fördelningen av olika vita blodkroppar med hur du mår.",
        measures: ["CRP", "Högkänsligt CRP", "Sänka (SR)", "Vita blodkroppar", "Neutrofiler", "Lymfocyter", "Eosinofiler"],
      },
      {
        title: "Lever och gallvägar",
        description: "Flera värden tillsammans kan ge ledtrådar om levern och gallvägarna. Läkaren tolkar mönstret utifrån bland annat symtom och läkemedel.",
        measures: ["ALAT", "ASAT", "ALP", "GT", "Bilirubin", "Albumin"],
      },
      {
        title: "Njurar, vätska och salter",
        description: "Kreatinin och cystatin C används för att uppskatta hur njurarna filtrerar blodet. Andra prover hjälper läkaren att bedöma salt- och vätskebalansen.",
        measures: ["Kreatinin", "Cystatin C", "Uppskattad njurfunktion (eGFR)", "Urea", "Natrium", "Kalium", "Klorid", "Osmolalitet"],
      },
      {
        title: "Vitaminer, mineraler och skelett",
        description: "Vid exempelvis misstanke om brist kan ett riktat blodprov visa om du behöver vidare utredning. Kalcium och bisköldkörtelhormon kan ge information om mineralbalansen.",
        measures: ["Vitamin B12", "Folat", "D-vitamin", "Kalcium", "Fosfat", "Magnesium", "Bisköldkörtelhormon (PTH)", "Zink", "Koppar"],
      },
      {
        title: "Sköldkörtel och binjurar",
        description: "TSH och sköldkörtelhormoner hjälper läkaren att bedöma ämnesomsättningen. Kortisol och ACTH kan undersökas vid frågor om binjurarna. Kortisol varierar över dygnet och behöver tolkas utifrån provtagningstiden.",
        measures: ["TSH", "Fritt T4", "Fritt T3", "Kortisol", "ACTH"],
      },
      {
        title: "Könshormoner och reproduktion",
        description: "Olika hormoner kan ge svar på frågor om exempelvis menscykel eller fertilitet. Vilket prov som tas och när beror på vad läkaren utreder.",
        measures: ["Testosteron", "SHBG", "Östradiol", "Progesteron", "LH", "FSH", "Prolaktin", "AMH", "Graviditetshormon (hCG)"],
      },
      {
        title: "Andra riktade analyser",
        description: "Vissa prover används i en specifik utredning, exempelvis för att undersöka blodets koagulation, hjärtpåverkan eller misstanke om celiaki.",
        measures: ["Blodplättar", "PK(INR)", "APTT", "Troponin", "NT-proBNP", "Urat", "Lipas", "Blodgas", "Allergiantikroppar", "Celiakiantikroppar", "Antikroppar mot specifika infektioner"],
      },
    ],
    sources: [
      { label: "1177 om blodprov", href: "https://www.1177.se/blodprov" },
      { label: "Karolinskas provkatalog", href: "https://www.karolinska.se/provtagningsanvisningar" },
    ],
  },
  {
    id: "wearable",
    title: "Klocka och telefon",
    intro: "Vilka värden klockan visar beror på modell och inställningar. Flera är uppskattningar. I GoHealth-appen ser du vilka mätningar du kan dela med vårdteamet.",
    topics: [
      {
        title: "Puls och hjärtrytm",
        description: "Följ pulsen i vila, under sömn och vid träning. Efter liknande pass kan du jämföra hur snabbt den sjunker. Vissa klockor kan även registrera EKG och uppmärksamma en oregelbunden rytm.",
        measures: ["Vilopuls", "Nattpuls", "Träningspuls", "Högsta uppmätta puls", "Tid i pulszoner", "Pulsåterhämtning", "Enkanals-EKG", "Notiser om oregelbunden rytm"],
      },
      {
        title: "Sömn och dygnsrytm",
        description: "Tiderna för insomning och uppvaknande visar hur regelbundet du sover. Klockan uppskattar hur natten fördelas mellan olika sömnstadier.",
        measures: ["Insomning", "Uppvaknande", "Sömntid", "Regelbundenhet", "Vaken tid", "Lätt sömn", "Djupsömn", "REM-sömn"],
      },
      {
        title: "Andning och temperatur",
        description: "Vissa modeller kan följa andning, syrenivå och förändringar i handledens temperatur under natten. En notis om möjliga tecken på sömnapné kan tas upp med vården.",
        measures: ["Andningsfrekvens", "Uppskattad syremättnad (SpO₂)", "Handledstemperatur", "Nattliga andningsstörningar", "Notiser om möjlig sömnapné"],
      },
      {
        title: "Rörelse i vardagen",
        description: "En telefon som du bär med dig kan till exempel räkna steg och uppskatta hur långt du går. Följ hur vardagsrörelsen skiljer sig mellan arbetsdagar och lediga dagar.",
        measures: ["Steg per dag", "Gång- och löpdistans", "Gånghastighet", "Trappor", "Aktiva minuter", "Uppskattad energiförbrukning"],
      },
      {
        title: "Kondition och träningsbelastning",
        description: "Passens antal, längd och intensitet beskriver träningsveckan. Vissa sportklockor använder träningshistorik och puls för att uppskatta kondition och återhämtning.",
        measures: ["Antal pass", "Passlängd", "Intensitet", "Träningsbelastning", "Uppskattat VO₂max", "Uppskattad återhämtningstid", "Uppskattad laktattröskel"],
      },
      {
        title: "Löpning och teknik",
        description: "Tempo och höjdmeter beskriver passet. Andra mått visar hur ditt löpsteg förändras, exempelvis hur länge foten är i marken vid varje steg.",
        measures: ["Tempo", "Hastighet", "Mellantider", "Höjdmeter", "Kadens (steg per minut)", "Steglängd", "Markkontakttid", "Vertikal rörelse", "Uppskattad löpeffekt (watt)"],
      },
      {
        title: "Stress och återhämtning",
        description: "HRV visar variationen i tid mellan hjärtslagen. Din vanliga nivå, sömn och egen upplevelse ger trenden sammanhang. Klockans stress- och återhämtningspoäng bygger på tillverkarens beräkningar.",
        measures: ["Pulsvariabilitet (HRV)", "Vilopulstrend", "Sömntrend", "Beräknad stresspoäng", "Beräknad återhämtningspoäng", "Egen skattning av stress och trötthet"],
      },
      {
        title: "Menscykel",
        description: "Du kan registrera mens och följa hur cykellängden varierar. Vissa klockor använder temperaturmönster för att i efterhand uppskatta när ägglossning kan ha skett.",
        measures: ["Registrerad mens", "Cykellängd", "Variation mellan cykler", "Uppskattad ägglossning i efterhand"],
      },
    ],
    sources: [
      { label: "Apple om vitalparametrar", href: "https://support.apple.com/sv-se/120142" },
      { label: "Apple om löpmått", href: "https://support.apple.com/sv-se/guide/watch/apd1f24d4d35/watchos" },
      { label: "Garmin om återhämtning", href: "https://www.garmin.com/sv-SE/garmin-technology/running-science/physiological-measurements/recovery-time/" },
    ],
  },
  {
    id: "clinical",
    title: "Andra mätningar",
    intro: "Vissa värden kräver en separat mätare eller en undersökning på mottagning. Du och läkaren kan även följa kroppsmått som midjemått över tid.",
    topics: [
      {
        title: "Blodtryck med manschett",
        description: "Över- och undertryck kan följas hemma vid olika tidpunkter. Vid behov kan vården jämföra blodtrycket när du ligger och står. Ett blodtrycksvärde anges i mmHg.",
        measures: ["Systoliskt övertryck", "Diastoliskt undertryck", "Morgon- och kvällstryck", "Förändring från liggande till stående"],
      },
      {
        title: "Glukos med separat sensor",
        description: "En kontinuerlig glukossensor (CGM) mäter glukos i vävnadsvätskan. Kurvan visar hur nivån ändras över dygnet, till exempel efter mat eller rörelse. En kompatibel klocka kan visa sensorns värden.",
        measures: ["Glukoskurva", "Variation över dygnet", "Förändring efter måltid och aktivitet"],
      },
      {
        title: "Lungfunktion med spirometri",
        description: "När du blåser i en spirometer mäts hur mycket luft du kan andas ut och hur snabbt luften strömmar ut.",
        measures: ["Utandad volym första sekunden (FEV₁)", "Forcerad vitalkapacitet (FVC)", "Kvoten FEV₁/FVC"],
      },
      {
        title: "Arbetsprov med andningsmask",
        description: "På en cykel eller ett löpband ökar belastningen stegvis. En andningsmask gör det möjligt att mäta hur mycket syre kroppen tar upp och hur andningen förändras.",
        measures: ["Syreupptag vid olika belastningar", "Maximalt syreupptag (VO₂max)", "Ventilation"],
      },
      {
        title: "Hjärtats pumpförmåga med ultraljud",
        description: "Ett ultraljud av hjärtat kan visa hur mycket blod som pumpas ut i varje slag och hur stor andel av blodet i vänster kammare som lämnar kammaren när den drar ihop sig.",
        measures: ["Slagvolym", "Ejektionsfraktion"],
      },
    ],
    sources: [
      { label: "1177 om blodtrycksmätning", href: "https://www.1177.se/undersokning-behandling/undersokningar-och-provtagning/provtagning-och-matningar/matningar/blodtrycksmatning/" },
      { label: "GIH om arbetsfysiologiska tester", href: "https://www.gih.se/forskning/laboratorier/astrandlaboratoriet" },
    ],
  },
];

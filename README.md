# Hemläkare.se

Webbplats och interaktiv prototyp för Hemläkare.se. Projektet visar hur en
svensk digital vårdtjänst kan presentera sitt erbjudande, sina mottagningar,
patientinformation och en enkel kundservicechatt.

> [!IMPORTANT]
> Projektet är en prototyp. Chatt, bokningsknappar och övriga vårdflöden är
> inte kopplade till ett riktigt vårdsystem. Personer, adresser, priser,
> recensioner och annan verksamhetsinformation i koden behöver verifieras
> innan webbplatsen publiceras.

## Det finns i projektet

- Startsida med tjänster, arbetssätt, omdömen och aktuellt
- Sidor för mottagningar, patientavgifter, recensioner och om verksamheten
- FAQ med kategorier och separata svarssidor
- Vårdguide med olika medicinska ämnesområden
- Artikelsida med nyheter och hälsorelaterat innehåll
- Responsiv navigering och sidfot
- Metadata, sitemap och robots.txt för sökmotorer
- Interaktiv demo av en kundservicechatt
- Adminpanel för att hantera chattar i demon

## Starta lokalt

Du behöver:

- Node.js 20.9 eller senare
- npm

Installera projektet:

```bash
npm install
```

Starta utvecklingsläget:

```bash
npm run dev
```

Öppna sedan [http://localhost:3000](http://localhost:3000).

För adminpanelen behövs `DATABASE_URL` och `ADMIN_SESSION_SECRET` (minst 32
tecken). Börja med att kopiera `.env.example` till `.env.local` och fyll i
värdena. Utan dem kan de publika sidorna fortfarande byggas, men admin- och
chattfunktionerna kan inte logga in.

## Vanliga kommandon

| Kommando | Vad det gör |
| --- | --- |
| `npm run dev` | Startar webbplatsen lokalt och uppdaterar den när kod ändras |
| `npm run lint` | Kontrollerar vanliga kodfel |
| `npm run build` | Skapar och kontrollerar en produktionsversion |
| `npm run start` | Startar den färdigbyggda produktionsversionen |

Kör `npm run build` före leverans för att kontrollera att hela webbplatsen kan
byggas.

## Viktiga sidor

| Adress | Innehåll |
| --- | --- |
| `/` | Startsida |
| `/mottagningar` | Fysiska och digitala mottagningar |
| `/patientavgifter` | Priser och betalningsinformation |
| `/recensioner` | Patientomdömen |
| `/om` | Verksamhet, värderingar och team |
| `/faq` | Vanliga frågor |
| `/vardguiden` | Medicinska ämnesområden |
| `/aktuellt` | Artiklar och nyheter |
| `/chatt-demo` | Presentationssida för chattprototypen |
| `/admin` | Adminpanel med chattinkorg i prototypen |

Artiklar, FAQ-svar och delar av vårdguiden har även egna adresser baserade på
innehållets namn.

## Testa chattdemon

1. Öppna `/chatt-demo`.
2. Öppna besökarvyn och adminpanelen i två flikar.
3. Starta en chatt som besökare.
4. Svara på chatten i `/admin`.

Chattinkorgen använder projektets databas när den är konfigurerad. Om
databasen saknas visas en tydlig konfigurationsstatus i adminpanelen.

Första lokala inloggningen kräver dessutom en användare i `admin_users`.
Migrationen skapar tabellen men inget lösenord. Skapa användaren i din lokala
eller preview-databas med en bcrypt-hash, och använd sedan samma e-postadress
och lösenord i `/admin`.

## Var innehållet finns

```text
src/
├── app/          Sidor, sidmetadata, sitemap och robots.txt
├── components/   Återanvändbara delar av gränssnittet
├── data/         Artiklar och länkar till FAQ
├── hooks/        Logik som används av chattdemon
└── lib/          Chattens datamodell och demodata

public/
└── bilder/       Bilder och illustrationer
```

Några vanliga platser att ändra:

- Startsidan: `src/app/page.tsx` och `src/components/`
- Artiklar: `src/data/articles.ts`
- FAQ: `src/app/faq/` och `src/data/chatFaqLinks.ts`
- Vårdguiden: `src/app/vardguiden/`
- Chattdemon: `src/components/ChatWidget.tsx`,
  `src/components/chat/`, `src/hooks/` och `src/lib/chat-demo.ts`
- Färger och gemensam formgivning: `src/app/globals.css`
- Bilder: `public/bilder/`

## Teknik i korthet

Projektet använder:

- Next.js 16 med App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint

Artiklarna ligger i dag både som befintligt filinnehåll och i ett CMS-schema i
databasen. Adminpanelen `/admin` har backend-inloggning, versionshantering,
granskningsflöde, SEO-statistik och källor. Betalning, bokningsmotor och
journalintegration ingår ännu inte.

## Inför produktion

Minst följande behöver göras innan detta kan användas som en riktig vårdtjänst:

- Verifiera allt medicinskt och verksamhetsrelaterat innehåll
- Ersätta platshållare och saknade bilder
- Koppla knappar och formulär till riktiga, säkra tjänster
- Bygga autentisering, behörighet och serverlagring för chatt
- Genomföra juridisk, medicinsk, säkerhets- och tillgänglighetsgranskning
- Bestämma driftmiljö och hantering av patient- och personuppgifter

## Bygga och köra i produktion

```bash
npm run build
npm run start
```

Applikationen kan köras hos en leverantör som stödjer en vanlig Next.js- och
Node.js-server. Val av drift för en riktig vårdtjänst måste göras utifrån
kraven på säkerhet, personuppgifter och medicinsk information.

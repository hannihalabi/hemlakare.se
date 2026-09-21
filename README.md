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
- Bokningsschema med lediga tider och betalning via Stripe (`/boka/[slug]`)

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

För bokningsflödet (`/boka/[slug]`) behövs dessutom Stripe- och
Google Calendar-nycklarna som beskrivs i [Betalning och bokning](#betalning-och-bokning).

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
| `/boka/[slug]` | Bokningsschema med betalning för en tjänst |

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

## Betalning och bokning

Bokningsschemat (`/boka/[slug]`) visar lediga tider för en tjänst, tar betalt
med Stripe och bekräftar bokningen först när betalningen har gått igenom.

Arkitekturen i korthet:

- **Reglerna** för när tjänster kan bokas (veckodagar, tider, tjänstlängd)
  ligger i tabellerna `provider_availability_rules` och `service_durations`
  i databasen.
- **Sanningskällan för upptagen tid** är vårdgivarens vanliga Google Calendar.
  Lediga tider räknas fram som regler minus det som redan är upptaget i
  kalendern (och minus egna pågående bokningar). Blockar du tid direkt i
  kalendern (semester, ett hembesök du bokat per telefon) syns det
  automatiskt som upptaget på sajten – ingen dubbel inmatning.
- **Betalningen** sker via Stripe Checkout (Stripes hostade betalsida).
  När en patient väljer en tid skapas en tillfällig "hold" (10 minuter) och
  patienten skickas till Stripe för att betala – kort, Klarna, Apple/Google
  Pay m.fl. hanteras helt av Stripe, utan egen redirect-hantering i koden.
  Bokningen bekräftas och läggs i Google Calendar först när Stripes webhook
  rapporterar att betalningen lyckats – inte innan.
- **Tjänster med varianter** (`src/data/booking-variants.ts`) – just nu
  blodprovspaket (`blodprovstagning`) och vaccin (`vaccination-hemma`) –
  visar ett extra steg där patienten väljer alternativ innan tid. Paket med
  fast pris kräver förskottsbetalning som övriga tjänster. Vaccin har bara
  "från"-priser (beror på antal doser/hembesöksavgift), så de bokas **utan**
  förskottsbetalning – bokningen bekräftas direkt och det slutliga priset
  stäms av vid besöket.

### 1. Kör databasmigrationerna

Migrationerna i `db/migrations/` körs manuellt mot Neon-databasen i den
ordning filerna är numrerade, t.ex. via `psql "$DATABASE_URL" -f db/migrations/0007_bookings.sql`
eller motsvarande i Neons SQL-editor.

- `0007_bookings.sql` skapar bokningstabellerna och lägger in exempelregler
  (vardagar 08–17) som bör justeras efter vårdgivarens faktiska schema.
- `0008_bookings_checkout_session.sql` byter bokningens Stripe-referenskolumn
  till Checkout Session.
- `0009_test_service.sql` lägger till en intern testtjänst (`testtjanst`,
  10 kr) för att verifiera hela flödet utan att riskera en riktig
  patientbokning. Kan tas bort igen enligt kommentaren i filen.
- `0010_booking_variants.sql` lägger till stöd för tjänster med flera
  bokningsbara varianter (blodprovspaket, vaccin) och tillgänglighetsregler
  för `blodprovstagning` och `vaccination-hemma`.

### 2. Skapa Stripe-nycklar

1. Skapa ett konto på [dashboard.stripe.com](https://dashboard.stripe.com) om
   det inte redan finns ett.
2. Hämta `STRIPE_SECRET_KEY` under **Developers → API keys**.
3. Skapa en webhook (**Developers → Webhooks**, eller **Workbench → Webhooks**
   i den nyare Stripe Dashboard-designen) som pekar på
   `https://<din-domän>/api/booking/webhook` och lyssnar på
   `checkout.session.completed` och `checkout.session.expired`. Kopiera
   signeringshemligheten till `STRIPE_WEBHOOK_SECRET`.
   - Lokalt kan du i stället köra `stripe listen --forward-to localhost:3000/api/booking/webhook`
     med [Stripe CLI](https://stripe.com/docs/stripe-cli) och använda
     hemligheten den skriver ut.

### 3. Koppla Google Calendar (engångssetup)

Vårdgivaren loggar aldrig in via sajten – i stället skapas en engångs
"refresh token" som backend sedan använder för att läsa/skriva i just den
kalendern.

1. Skapa ett projekt i [Google Cloud Console](https://console.cloud.google.com/),
   aktivera **Google Calendar API** och skapa OAuth-klientuppgifter av typen
   "Web application" med redirect-URI `http://localhost:3000/api/auth/google-calendar/callback`
   (lägg till produktionens URL också när den finns).
2. Fyll i `GOOGLE_CALENDAR_CLIENT_ID` och `GOOGLE_CALENDAR_CLIENT_SECRET` i
   `.env.local`.
3. Logga in med det Google-konto vars kalender ska styra tillgängligheten och
   godkänn scopet `https://www.googleapis.com/auth/calendar` via Googles
   [OAuth Playground](https://developers.google.com/oauthplayground) (ange
   dina egna klientuppgifter under kugghjulet → "Use your own OAuth
   credentials").
4. Byt ut den engångskod Playground ger dig mot ett access- och refresh-token
   och spara refresh-token som `GOOGLE_CALENDAR_REFRESH_TOKEN`.
5. Sätt `GOOGLE_CALENDAR_ID` till `primary` (standardkalendern för det
   inloggade kontot) eller till en specifik kalenders id om vårdgivaren har
   en separat bokningskalender.

Refresh-token upphör inte automatiskt att gälla och behöver bara skapas en
gång per vårdgivarkalender.

### API-rutter

| Rutt | Gör |
| --- | --- |
| `GET /api/booking/slots?service=<slug>` | Lediga tider för en tjänst |
| `POST /api/booking/create` | Skapar en hold + en Stripe Checkout-session för vald tid |
| `POST /api/booking/webhook` | Stripe-webhook som bekräftar bokningen och skapar kalenderhändelsen |

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
granskningsflöde, SEO-statistik och källor. Bokning och betalning finns för
tjänster med fast pris (se [Betalning och bokning](#betalning-och-bokning));
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

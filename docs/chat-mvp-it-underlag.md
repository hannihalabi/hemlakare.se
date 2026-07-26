# Hemläkare Chat MVP

## Beslutsunderlag för IT

**Status:** Interaktiv flödesprototyp  
**Kanal:** Administrativ kundservice  
**Utanför MVP:** Medicinsk rådgivning, patientjournal, bilagor och identifierad patientdialog

## 1. Sammanfattning

MVP:n visar ett sammanhängande flöde från en publik chattwidget till en intern
medarbetarinkorg:

1. Besökaren väljer ett administrativt ämne och bekräftar kanalens
   säkerhetsgräns.
2. Ett nytt ärende skapas i kundservicekön.
3. En medarbetare tar ärendet och svarar.
4. Svaret visas direkt i besökarens chatt.
5. Ärendet kan markeras som väntande, hänvisas till säker patientkontakt eller
   avslutas.

Prototypen validerar användarupplevelse och arbetssätt. Den är avsiktligt inte
en produktionsbackend.

## 2. Så demonstreras MVP:n

Starta utvecklingsmiljön:

```bash
npm run dev
```

Öppna följande i separata flikar:

- Presentationsvy: `http://localhost:3000/chatt-demo`
- Besökarvy: `http://localhost:3000`
- Medarbetarvy: `http://localhost:3000/personal/chattar`

Rekommenderat tvåminutersscenario:

1. Klicka på **Chatta med oss** i besökarvyn.
2. Välj **Boka eller omboka**, bekräfta säkerhetsinformationen och starta
   chatten.
3. Skicka:  
   *Hej! Jag har bokat ett hembesök på fredag men behöver flytta tiden. Hur gör
   jag?*
4. Öppna **Nya** i medarbetarvyn och välj det nya ärendet.
5. Klicka **Ta ärendet**.
6. Välj snabbsvar **Säker bokning** och skicka.
7. Gå tillbaka till besökarfliken och visa att svaret kommit fram.
8. Avsluta ärendet i medarbetarvyn och lämna återkoppling i besökarvyn.

Knappen **Återställ demo** återställer fiktiva konversationer inför nästa
visning.

## 3. MVP-omfattning

### Ingår

- Responsiv besökarwidget
- Ämnesval och säkerhetsinformation
- Gemensam ärendekö
- Olästmarkering och status
- Tilldelning till medarbetare
- Textmeddelanden i båda riktningar
- Snabbsvar
- Hänvisning till säker patientkontakt
- Väntande och avslutad status
- Besökarens Ja/Nej-återkoppling
- Synkronisering mellan två flikar
- Fiktiv seed-data och återställning
- Grundläggande tangentbords- och skärmläsarstöd

### Ingår inte

- Riktig autentisering, SSO, BankID eller MFA
- Server-API, databas eller WebSocket-tjänst
- Medicinsk bedömning eller behandling
- Bilagor, foton eller dokument
- Patientjournal eller journalsystemsintegration
- SMS- och e-postleverans
- Produktionsloggning, övervakning och incidenthantering

## 4. Prototypens teknik

MVP:n använder Next.js, React och webbläsarens `localStorage`.
Webbläsarhändelser synkroniserar tillståndet mellan öppna flikar.

Detta ger en stabil presentation utan externa konton eller infrastruktur. Det
är inte en rekommenderad produktionslösning: uppgifterna finns endast i den
aktuella webbläsaren och delas inte mellan olika användare eller enheter.

## 5. Föreslagen produktionsarkitektur

```text
Besökarwidget
    │ HTTPS + anonym sessionscookie
    ▼
Next.js BFF / API
    │ schema-validering, rate limit, CSRF-skydd
    ▼
Chattjänst ─────────────── Realtime gateway
    │                           │
    ▼                           ▼
PostgreSQL                 Medarbetarportal
    │                           │
    ├── retention/gallring      └── Entra ID/SSO + MFA + RBAC
    └── append-only auditlogg

Bakgrundskö
    └── neutrala SMS-/e-postaviseringar utan meddelandeinnehåll
```

Viktiga principer:

- API-lagret är den enda vägen till chattjänsten.
- Tilldelning måste ske atomärt så att två medarbetare inte kan ta samma
  ärende.
- Meddelandeinnehåll ska inte förekomma i analytics, applikationsloggar eller
  aviseringar.
- Auditloggen ska visa vem som läst eller ändrat ett ärende utan att duplicera
  fritextinnehållet.
- Realtime-lagret ska auktorisera varje prenumeration; ett konversations-id är
  inte i sig en behörighet.

## 6. Föreslagen domänmodell

### Conversation

| Fält | Beskrivning |
| --- | --- |
| `id` | Internt UUID |
| `public_reference` | Visnings-id, exempelvis `#1043` |
| `anonymous_session_id` | Hashad eller opak besökarsession |
| `category` | Bokning, pris, tjänsten eller annat |
| `status` | Ny, aktiv, väntar på personal, väntar på besökare, avslutad |
| `assigned_employee_id` | Null tills ärendet tas |
| `source_url` | Sidan där chatten startades |
| `safety_notice_accepted_at` | Tidpunkt för bekräftad information |
| `first_response_at` | Underlag för SLA |
| `last_message_at` | Sortering och köprioritering |
| `retention_until` | Styr automatisk gallring |
| `created_at`, `updated_at`, `closed_at` | Livscykel |

### Message

| Fält | Beskrivning |
| --- | --- |
| `id` | UUID |
| `conversation_id` | Relation till ärendet |
| `sender_type` | Besökare, medarbetare eller system |
| `sender_id` | Null för anonym besökare/system |
| `body` | Meddelandeinnehåll |
| `created_at` | Skapad |
| `delivered_at` | Levererad till mottagaren |
| `read_at` | Läskvittens |

### Employee

`id`, `display_name`, `role`, `team_id`, `active`

### AuditEvent

`id`, `actor_id`, `action`, `entity_type`, `entity_id`, strukturerad metadata
utan meddelandeinnehåll samt `created_at`.

Kontaktuppgifter bör separeras från meddelandetabellerna, krypteras och ges en
egen kort lagringstid.

## 7. Exempel på API-kontrakt

```text
POST   /api/chat/conversations
GET    /api/chat/conversations/:publicToken
POST   /api/chat/conversations/:publicToken/messages

GET    /api/staff/conversations?status=new
POST   /api/staff/conversations/:id/claim
POST   /api/staff/conversations/:id/messages
PATCH  /api/staff/conversations/:id/status

GET    /api/realtime/token
```

Besökarens `publicToken` ska vara opakt, tillräckligt slumpmässigt och bundet
till sessionscookien. Personal-endpoints ska kräva SSO, MFA och rollkontroll.

## 8. Säkerhets- och integritetsgräns

Gränssnittet beskriver chatten som administrativ och ber besökaren att inte
skriva personnummer, symtom eller känsliga hälsouppgifter. Fri text innebär ändå
att sådana uppgifter kan inkomma.

Produktionslösningen bör därför informationsklassas och utformas utifrån att
känsliga uppgifter kan förekomma. Före produktionsbeslut behövs minst:

- Fastställd personuppgiftsansvarig och behandlingsändamål
- Bedömning tillsammans med dataskydds- och informationssäkerhetsfunktion
- DPIA-bedömning
- Godkända personuppgiftsbiträden och underbiträden
- Beslut om lagringsplats och eventuella tredjelandsöverföringar
- TLS under transport och kryptering i vila
- SSO, MFA, minsta behörighet och regelbunden behörighetsgranskning
- Åtkomst- och händelseloggar med skyddad lagring
- Fastställd retention och verifierad automatisk gallring
- XSS-säker rendering, schemavalidering, längdgränser, rate limit och botskydd
- Neutrala aviseringar utan patient- eller ärendeinnehåll
- Rutiner för incidenter, registerutdrag och radering
- Beslut om när information kan behöva dokumenteras i patientjournal

Prototypen ska inte beskrivas som GDPR-säkrad eller patientdatasäker. Det är
produktionsarkitektur, avtal och verksamhetsrutiner som tillsammans avgör detta.

## 9. Icke-funktionella krav att besluta

| Område | Fråga för IT/verksamhet |
| --- | --- |
| Tillgänglighet | Vilken WCAG-nivå ska verifieras och av vem? |
| SLA | Vilka öppettider och svarstider ska visas för besökaren? |
| Volym | Förväntade samtidiga konversationer och toppar? |
| Kontinuitet | Hur hanteras driftstörning och reservkanal? |
| Retention | Hur länge ska öppna respektive avslutade ärenden sparas? |
| Identitet | Entra ID för personal? När krävs BankID för besökare? |
| Integration | CRM, bokningssystem, journal eller 1177? |
| Avisering | Godkänd leverantör för innehållsfria SMS/e-postnotiser? |
| Ägarskap | Vem äger produkt, information, bemanning och incidenter? |

## 10. Acceptanskriterier för nästa tekniska pilot

- Två olika webbläsare kan delta i samma konversation.
- Nytt meddelande levereras och visas utan siduppdatering.
- Endast behörig personal kan lista, läsa och svara på ärenden.
- Samtidigt övertagande av samma ärende ger exakt en ägare.
- Varje läsning, tilldelning, statusändring och export kan följas i auditloggen.
- Meddelanden återställs efter omstart utan dataförlust.
- Gallring sker automatiskt och är testbar.
- Aviseringar innehåller aldrig chattinnehåll.
- Fel, återanslutning och fördröjd leverans visas begripligt för användaren.
- Tangentbord, skärmläsare, mobilvy och reducerad rörelse är verifierade.

## 11. Rekommenderat nästa beslut

Godkänn först att den publika widgeten är en **administrativ kundservicekanal**.
Genomför därefter en avgränsad teknisk pilot med vald identitetslösning,
EU-hostad databas/realtime, auditlogg och ett litet internt testteam.

Medicinsk chatt bör behandlas som ett separat initiativ med säker
patientidentifiering, kliniskt arbetssätt och beslut om journalföring.

## 12. Myndighetsvägledning

- [IMY: Patientdatalagen och sammanhållen vård- och omsorgsdokumentation](https://www.imy.se/verksamhet/dataskydd/dataskydd-pa-olika-omraden/vard/om-patientdatalagen-och-svod/)
- [IMY: Vad är personuppgifter om hälsa?](https://www.imy.se/vanliga-fragor-och-svar/vad-ar-personuppgifter-om-halsa/)
- [Inera: 1177 inkorg](https://www.inera.se/tjanster/alla-tjanster-a-o/1177-inkorg/)

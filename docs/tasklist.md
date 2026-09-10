# Hemläkare.se: strategi för organisk tillväxt och konvertering

Datum: 2026-09-07

Syfte: ge en konkret väg från nuvarande kodbas till högre organisk trafik med mätbara konverteringar. Målet är att maximera chansen att vinna prioriterade Google-resultat, men ingen seriös SEO-plan kan lova plats 1. Google skriver själv att lokal ranking inte kan köpas eller begäras fram, och att indexering/visning inte är garanterad.

## Källor som styr rekommendationerna

- Google Search Central: helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central: generativ AI i Search och varför vanlig SEO fortfarande gäller: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central: vägledning om AI-genererat innehåll: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- Google Search Central: spam policies, särskilt scaled content abuse: https://developers.google.com/search/docs/essentials/spam-policies
- Google Business Profile: lokal ranking bygger på relevans, avstånd och prominens: https://support.google.com/business/answer/7091?hl=sv
- Google Search Central: canonical URLs: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google Search Central: sitemap `lastmod` ska bara ändras vid meningsfull ändring: https://developers.google.com/search/blog/2014/10/best-practices-for-xml-sitemaps-rssatom
- web.dev: Core Web Vitals-trösklar: https://web.dev/articles/defining-core-web-vitals-thresholds
- Vercel Cron Jobs: användning/pris och frekvensgränser: https://vercel.com/docs/cron-jobs/usage-and-pricing
- Vercel Cron Jobs: säkerhet, lås och idempotens: https://vercel.com/docs/cron-jobs/manage-cron-jobs
- IMY: känsliga personuppgifter i hälso- och sjukvården: https://www.imy.se/verksamhet/dataskydd/dataskydd-pa-olika-omraden/vard/fragor-och-svar-om-personuppgifter-i-halso--och-sjukvarden--for-vardgivare/
- IMY: information till registrerade patienter: https://www.imy.se/verksamhet/dataskydd/dataskydd-pa-olika-omraden/vard/den-registrerades-rattigheter-for-vardgivare/

## Kort slutsats

Hemläkare.se är positionerad som privatfinansierad vård utan kö: digital kontakt, fast läkare/sköterska, mottagningar, hembesök, prickmottagning och ett särskilt spår för ungas psykiska hälsa. Det är en kommersiellt stark idé eftersom sökintentionen är akut, lokal och konverteringsnära: "privatläkare Stockholm", "läkare hembesök", "snabb läkare", "prickmottagning online", "receptförnyelse privat" och liknande.

Den nuvarande sajten har bra grundform och många sidor, men den beter sig mer som en snygg prototyp än en trovärdig vårdaktör redo att vinna organisk trafik. Största hindren är:

1. Bokningsvägen är inte verkligt färdig. Många CTA:er går till `/mottagningar`, och på mottagningssidan länkar "Boka tid" tillbaka till samma sida.
2. Innehållsmängden är hög men för tunn. Det finns 143 artiklar med 39-72 ord i brödtext, median 56 ord. För vård/YMYL är det en risk, inte en rankingmotor.
3. Förtroendesignaler måste verifieras. Team, adresser, årtal, patientantal, recensioner, svarstider och påståenden måste vara sanna, styrkta och konsekventa.
4. Tekniska SEO-detaljer saknas: kanoniska URL:er, korrekt `lastModified`, unikare metadata, fungerande OG-bild, saknade sidor, saknade artikelbilder och tydlig schema-strategi.
5. Adminpanelen har en bra chattgrund men blogg/statistik är placeholders. För organisk tillväxt bör adminpanelen bli ett SEO/CMS-operativsystem med medicinsk granskningskö.
6. Automation ska skapa research och utkast, inte masspublicera vårdinnehåll. Timvisa utkast kan vara rimligt på Vercel Pro, men publicering måste kräva redaktionell och medicinsk granskning.

## Kodfynd

### Affärs- och konverteringsflöde

- Headerns primära CTA `Boka direkt` går till `/mottagningar`, inte till en bokningssida eller tidsbokning. Se `src/components/Header.tsx:43`.
- Hero-sökningen säger ja för Stockholm eller postnummer i 1xx-serien, medan sajten samtidigt påstår Stockholm, Göteborg och Solna. Se `src/components/Hero.tsx:33`.
- Vid positivt områdessvar länkas användaren åter till `/mottagningar`. Se `src/components/Hero.tsx:100`.
- På `/mottagningar` går "Boka tid" till `/mottagningar`, alltså samma sida. Se `src/app/mottagningar/page.tsx:173`.
- Mottagningskort länkar till `/mottagningar/${slug}`, men det finns ingen `src/app/mottagningar/[slug]/page.tsx`. Se `src/app/mottagningar/page.tsx:253`.
- Specialiteten "Digital mottagning" använder sluggen `aldremottagning`, vilket gör att två kort pekar mot samma framtida URL. Se `src/app/mottagningar/page.tsx:115`.
- Footer länkar till flera sidor som inte finns: `/cookies`, `/integritetspolicy`, `/finns-i-ditt-omrade`, `/lunchforelasning`, `/prickmottagning`, plus flera andra kontakt-/mottagningslänkar. Se `src/components/Footer.tsx:3`, `src/components/Footer.tsx:24`, `src/components/Footer.tsx:34`.
- Prickmottagningen har en intern länk med `href="#"` och en länk till saknade `/prickmottagning`. Se `src/components/Prickmottagning.tsx:19` och `src/components/Prickmottagning.tsx:89`.
- Lunchföreläsningen har `href="#"` och saknade `/lunchforelasning`. Se `src/components/Lunchforelasning.tsx:34` och `src/components/Lunchforelasning.tsx:44`.

### Innehåll

- `src/data/articles.ts` innehåller 143 artiklar. Brödtexten är 39-72 ord, median 56 ord. Artiklarna saknar fält för författare, medicinsk granskare, källor, review-datum och evidensnivå.
- Artikelvyn renderar brödtexten som ett enda stycke och saknar innehållsstruktur, källor, FAQ, relaterade sidor, tjänste-CTA och internlänkar. Se `src/app/aktuellt/[slug]/page.tsx:50`.
- De tre artikelbilderna `/bilder/aktuellt-1.jpg`, `/bilder/aktuellt-2.jpg`, `/bilder/aktuellt-3.jpg` refereras återkommande men finns inte i `public/bilder`. Se exempel `src/data/articles.ts:17`.
- Vårdguidekategorierna under `/vardguiden/[slug]` är i praktiken introtext + sex ämnesetiketter. Ämnena är inte länkade till djupare guider. Se `src/app/vardguiden/[slug]/page.tsx:444` och `src/app/vardguiden/[slug]/page.tsx:456`.
- Sidan har två mer omfattande guider för akut vård och barn/ungdomars hälsa, men de dupliceras också via generiska `/vardguiden/[slug]` i sitemap och routing. Se `src/app/sitemap.ts:15` och `src/app/sitemap.ts:55`.
- Vissa vårdguidekategorier ligger långt utanför nuvarande erbjudande, t.ex. transplantation, kirurgi/plastikkirurgi, cancer och tandvård. Om bolaget inte faktiskt erbjuder detta bör sidorna konsolideras, noindexas eller vinklas till "när ska du söka vård och vart ska du vända dig".

### Förtroende och regelefterlevnad

- `Om oss` innehåller namngivna läkare, grundare, milestones, patientantal och ratingvärden. De måste verifieras eller ersättas med tydligt prototypinnehåll före skarp lansering. Se `src/app/om/page.tsx:59`, `src/app/om/page.tsx:98` och `src/app/om/page.tsx:281`.
- `Recensioner` innehåller starka patientcitat och externa ratingtal utan verifierbar koppling till faktiska käll-URL:er. Se `src/app/recensioner/page.tsx:15` och `src/app/recensioner/page.tsx:115`.
- Sajten påstår att uppgifter är säkra och att Patientdatalagen följs. Det kräver faktisk teknisk, juridisk och processmässig uppfyllelse, inte bara text. Se `src/app/faq/page.tsx:123`.
- Integritetspolicy och cookies länkas i footer men sidorna saknas. Se `src/components/Footer.tsx:209`.
- Chatten har bra textmässig avgränsning till administrativ kundservice, men den ligger nära vårdkontexten och måste skyddas mot att hälsodata matas in.

### Teknisk SEO

- Root metadata sätter `metadataBase`, title, description, Open Graph och Twitter. Bra start. Se `src/app/layout.tsx:4`.
- Det finns inga explicita `alternates.canonical`-fält. För en växande sajt med många liknande sidor bör varje indexerbar sida få self-referential canonical.
- OG-bilden `/og-image.jpg` används men saknas i `public`. Se `src/app/layout.tsx:21`.
- Root schema är `MedicalOrganization`, men logo pekar på saknad OG-bild och saknar verkliga adresser, telefon, läkare, öppettider, `sameAs` och per-mottagning schema. Se `src/app/page.tsx:12`.
- Sitemap använder `new Date()` för alla routes varje gång den byggs/servas. Se `src/app/sitemap.ts:47`. Det gör `lastmod` mindre trovärdigt.
- Sitemap innehåller duplicerade vårdguide-URL:er för akut vård och barn/ungdomars hälsa. Se `src/app/sitemap.ts:55` samt `src/app/sitemap.ts:15`.
- Admin och chattdemo har `robots: { index: false, follow: false }`, vilket är rätt start. Se `src/app/admin/page.tsx:8` och `src/app/chatt-demo/page.tsx`.
- Lint gick igenom. `npm run build` gick igenom med Next.js 16.2.4 och genererade 205 statiska/dynamiska routes.

### Backend och admin

- Adminlogin finns med bcrypt/JWT-cookie och server-side sessions. Se `src/app/api/admin/auth/login/route.ts:13` och `src/lib/admin-auth.ts:16`.
- Cookie är `httpOnly`, `sameSite: strict` och `secure` i produktion. Se `src/lib/admin-auth.ts:42`.
- Databasen har `admin_users`, `chat_conversations`, `chat_messages` och `audit_events`. Se `db/migrations/0001_admin_backend.sql:3`.
- Chattreferens skapas med slumpad `#1000-9999`, men kolumnen är unique och det finns ingen retry vid kollision. Se `src/app/api/chat/conversations/route.ts:15`.
- Adminhooken hämtar konversationer initialt och efter mutation, men ingen polling, SSE eller realtime. Se `src/hooks/useAdminConversations.ts:36`.
- Besökarhooken hämtar konversation initialt och efter egna meddelanden, men inte automatiskt efter personalsvar. Se `src/hooks/useVisitorChat.ts:39`.
- StaffInbox-bannern visar nu korrekt backend- och sessionsstatus.
- StaffInbox använder den inloggade användarens session för filtrering och tilldelning.
- Adminflikarna `Blogg` och `Statistik` är implementerade enligt Fas 5.

## Strategisk SEO-position

Hemläkare.se ska inte försöka bli "ett nytt 1177" över alla sjukdomsområden. Starkaste organiska positionen är att bli den mest trovärdiga kommersiella auktoriteten för privat, snabb, personlig vård i utvalda situationer.

Primär sökpositionering:

- Privatläkare i Stockholm, Göteborg och Solna, men bara om dessa mottagningar är verkliga.
- Läkarbesök hemma och på jobbet i de områden där hembesök faktiskt erbjuds.
- Digital läkarkontakt med tydliga begränsningar, pris och tider.
- Prickmottagning/hudförändring som konverterar till bildbedömning eller bokning.
- Receptförnyelse, remiss, intyg och provtagning, om tjänsterna faktiskt erbjuds.
- Barnfamiljer och ungas psykiska hälsa, om vårdteam och föreläsningar är verkliga.
- Kontinuitet: fast läkare/sköterska, proaktiv uppföljning och kroniska besvär.

Sekundär innehållspositionering:

- Symtomguider som hjälper användaren förstå när de ska söka akut vård, när digital kontakt räcker och när Hemläkare.se kan hjälpa.
- Pris- och jämförelsesidor som besvarar köpfrågor ärligt: privat vård vs vårdcentral, frikort, försäkring, hembesök, digital vård.
- Lokal serviceinformation: öppettider, adress, parkering, tillgänglighet, område, hembesöksområde, personal, bilder, bokningslänkar.

Det viktigaste är att varje SEO-sida ska ha en tydlig roll:

- Svara bättre än konkurrenten.
- Bevisa varför Hemläkare.se är trovärdigt.
- Visa exakt när ni kan hjälpa.
- Leda till rätt konvertering.

## Innehållsstrategi

### Innehåll som bör pausas eller omarbetas

Pausa masspublicering av de 143 korta artiklarna tills varje artikel har:

- tydlig sökintention,
- unik vinkel från Hemläkare.se,
- medicinsk granskare,
- källor,
- datum för publicering och senaste granskning,
- internlänkar till relevanta tjänster,
- tydlig akut-varning där det behövs,
- ett ärligt CTA-flöde,
- tillräckligt djup för att vara en "destination", inte bara en snippet.

Artiklar som inte kan möta detta bör:

- slås ihop till större guider,
- omdirigeras till bättre sidor,
- noindexas tills de håller kvalitet,
- eller tas bort från sitemap.

### Rekommenderade hubbar

Bygg färre men starkare kluster:

1. Privatläkare
   - `/privatlakare`
   - `/privatlakare-stockholm`
   - `/privatlakare-goteborg`
   - `/privatlakare-solna`
   - `/privatlakare-pris`
   - `/privatlakare-vs-vardcentral`

2. Hembesök
   - `/hembesok-lakare`
   - `/hembesok-lakare-stockholm`
   - `/hembesok-lakare-goteborg`
   - `/hembesok-lakare-solna`
   - `/hembesok-pris`
   - `/hembesok-vad-kan-lakaren-gora`

3. Digital vård
   - `/digital-lakare`
   - `/receptfornyelse-online`
   - `/remiss-online`
   - `/sjukintyg`
   - `/provtagning`
   - `/digital-vard-pris`

4. Hud och prickmottagning
   - `/prickmottagning`
   - `/hudforandring`
   - `/leverflack-kolla`
   - `/melanom-varningstecken`
   - `/fota-leverflackar`
   - `/nar-soka-vard-for-prickar`

5. Barn/familj
   - `/bvc`
   - `/barnlakare-online`
   - `/barnlakare-stockholm`
   - `/feber-barn-nar-soka-vard`
   - `/ungas-psykiska-halsa`
   - `/lunchforelasning`

6. Kroniska och proaktiva besvär
   - `/hogt-blodtryck`
   - `/blodtrycksmatare-kopplad-till-lakare`
   - `/diabetes-typ-2-uppfoljning`
   - `/astma-kol-uppfoljning`
   - `/aldremottagning`

## Sidmallar

### Service-/money page

Varje kommersiell sida bör ha:

- H1 med tjänst + plats eller tjänst + behov.
- Kort svar på "kan ni hjälpa mig med detta?"
- Pris eller prisintervall.
- Bokningsflöde med faktisk knapp till bokning.
- Tillgänglighet: tider, områden, digitalt/fysiskt/hembesök.
- Legitimerad kompetens: vem utför vården?
- Vad som ingår och inte ingår.
- Akut-varning: när användaren ska ringa 112/1177.
- FAQ som besvarar köpfrågor.
- Internlänkar till pris, mottagning, relaterade besvär.
- Schema: `MedicalBusiness`/`MedicalClinic`/`LocalBusiness` där korrekt, utan falska review snippets.

### Medicinsk guide

Varje guide bör ha:

- Medicinsk ansvarsfriskrivning i början, inte gömd längst ned.
- "Sök akut om..."-ruta.
- "Det här kan Hemläkare.se hjälpa med" och "Det här ska inte hanteras hos oss".
- Författare, medicinsk granskare, legitimation/specialitet.
- Publicerad och medicinskt granskad datum.
- Källor från primära/auktoritativa källor.
- Strukturerad disposition med H2/H3.
- Symtom, orsaker, egenvård, utredning, behandling, när söka vård.
- Relevant CTA med kontext.
- Relaterade guider och tjänster.

## Teknisk task-list från start till mål

### Fas 0: Beslutsgrund, sanning och mätning

- [P0-001] Fastställ primär konvertering: betald bokning, listning, kontaktförfrågan eller telefonlead. Klart när varje CTA har ett entydigt mål.
- [P0-002] Fastställ vilka tjänster som faktiskt erbjuds vid lansering. Klart när varje service har status: live, snart, informationssida eller bort.
- [P0-003] Verifiera geografier: Stockholm, Göteborg, Solna, hela Sverige digitalt. Klart när varje område har verklig täckning, adress, öppettider och hembesöksradie.
- [P0-004] Verifiera juridisk vårdgivarinformation: bolag, vårdgivare, IVO, patientförsäkring, klagomålsväg, journalhantering. Klart när faktasidor kan publiceras utan placeholder.
- [P0-005] Verifiera team, recensioner, ratingvärden, patientantal och årtal. Klart när allt osäkert antingen styrks eller tas bort.
- [P0-006] Koppla Search Console, GA4/annan analytics, Google Business Profiles och eventuell bokningsplattform. Klart när baseline kan mätas.
- [P0-007] Exportera baseline: indexerade sidor, impressions, clicks, CTR, queries, pages, conversions, Core Web Vitals. Klart när första dashboard finns.
- [P0-008] Skapa keyword map för de 30 viktigaste sökorden: intent, sida, prioritet, konkurrens, konverteringsmål. Klart när ingen sida tävlar mot en annan.

### Fas 1: Kritisk teknisk och UX-städning

- [P0-009] Skapa riktig boknings-/konverteringssida, t.ex. `/boka`, eller koppla till extern bokning. Klart när header, hero och servicesidor leder dit.
- [P0-010] Ändra alla "Boka" CTA:er till rätt destination och eventnamn. Klart när ingen CTA går till samma sida utan syfte.
- [P0-011] Skapa eller omdirigera saknade sidor: `/integritetspolicy`, `/cookies`, `/finns-i-ditt-omrade`, `/prickmottagning`, `/lunchforelasning`.
- [P0-012] Skapa `src/app/mottagningar/[slug]/page.tsx` eller ta bort länkarna. Klart när alla mottagningskort har giltig destination.
- [P0-013] Fixera digital mottagningssluggen så den inte pekar på `aldremottagning`.
- [P0-014] Ta bort `href="#"` och ersätt med riktiga länkar eller knappar.
- [P0-015] Skapa verklig `/og-image.jpg` eller dynamisk OG-route. Klart när Open Graph/Twitter-bild fungerar.
- [P0-016] Lägg till self-referential canonical på indexerbara sidor via Next metadata `alternates`.
- [P0-017] Rätta sitemap: ta bort dubbletter, ta bort sidor som inte ska indexeras, använd stabila `lastModified` baserat på faktiskt content-datum.
- [x] [P0-018] Ta bort prototyptext i admin som säger att backend saknas, eller visa korrekt miljöstatus.
- [P0-019] Lägg till produktionens 404/not-found med sökvägar tillbaka till viktiga sidor.
- [P0-020] Ersätt hero- och sektionsplaceholders med verkliga bilder där de behövs för förtroende.
- [P0-021] Lägg till alt-texter som beskriver verkligt innehåll, inte generiska placeholders.
- [P0-022] Sätt performancebudget: LCP <= 2,5 s, INP <= 200 ms, CLS <= 0,1 på 75:e percentilen.

### Fas 2: Konverteringsmaskin

- [P0-023] Bygg `/boka` med val: digitalt, mottagning, hembesök, prickmottagning, föreläsning. Klart när användaren aldrig behöver gissa nästa steg.
- [P0-024] Lägg in transparent pris i bokningsflödet innan användaren lämnar kontaktuppgifter.
- [P0-025] Lägg till försäkrings-/privatbetalningsval om relevant.
- [P0-026] Lägg till triagefrågor utan att samla onödiga hälsodata i osäker kanal.
- [P0-027] Skapa lead recovery: påbörjad men ej slutförd bokning skickar säkert uppföljningsmail om samtycke finns.
- [P0-028] Lägg till mobil sticky CTA på money pages.
- [P0-029] Lägg till telefon/mail/chatt som sekundära konverteringar med tydlig spårning.
- [P0-030] Skapa trygghetssektion nära CTA: legitimation, patientförsäkring, integritet, journal, när 112/1177 gäller.

### Fas 3: Innehållskvalitet och pruning

- [P0-031] Inventera alla 143 artiklar med status: behåll, slå ihop, uppgradera, noindex, redirect, ta bort.
- [P0-032] Stoppa tunna artiklar från sitemap tills de är uppgraderade.
- [P0-033] Definiera medicinsk editorial policy: källkrav, granskare, akutvarningar, språk, AI-användning, revision.
- [P0-034] Skapa content-modell med author, reviewer, specialty, reviewedAt, sources, targetQuery, intent, CTA och schemaType.
- [P0-035] Uppgradera 10 viktigaste artiklarna till fulla guider innan fler publiceras.
- [P0-036] Konsolidera vårdguidekategorier som inte matchar verkligt erbjudande.
- [P0-037] Gör ämnesetiketter klickbara först när en riktig djupguide finns.
- [P0-038] Skapa internlänkningsregler: hub -> service -> guide -> booking.
- [P0-039] Lägg in "sök akut"-komponent på riskämnen.
- [P0-040] Skapa content QA-checklista som blockerar publicering vid saknad källa, granskare eller CTA.

### Fas 4: Money pages och lokal SEO

- [P1-041] Bygg `/privatlakare-stockholm` med unik lokal information, inte generisk text.
- [P1-042] Bygg `/hembesok-lakare-stockholm` med områden, responstid, pris, vad som kan göras hemma.
- [P1-043] Bygg `/prickmottagning` med medicinsk process, fotoinstruktioner, när fysisk undersökning krävs.
- [P1-044] Bygg `/digital-lakare` med exakt omfattning, tider, pris, begränsningar.
- [P1-045] Bygg `/receptfornyelse-online`, om tjänsten är verklig.
- [P1-046] Bygg `/sjukintyg`, om tjänsten är verklig och regelverket är verifierat.
- [P1-047] Bygg `/mottagningar/stockholm`, `/mottagningar/goteborg`, `/mottagningar/solna` enbart om adresserna är verkliga.
- [P1-048] Lägg till Google Business Profile för varje verklig mottagning med samma NAP som sajten.
- [P1-049] Ladda upp verkliga mottagningsbilder, teamfoto och exteriör/interiör i GBP.
- [P1-050] Skapa review-process utan incitament och utan review gating.
- [P1-051] Bygg lokala landningssidor för stadsdelar först när ni har unik serviceinformation, inte doorway-sidor.
- [P1-052] Skapa lokal citation-lista: Vården.se, Hitta, Eniro, branschregister, relevanta försäkringspartners.

### Fas 5: Adminpanelen som SEO-operativsystem

- [x] [P1-053] Bygg Blogg/CMS-fliken: lista, skapa, redigera, förhandsgranska, schemalägga, publicera, avpublicera.
- [x] [P1-054] Lägg till workflow-status: draft, SEO review, medical review, legal/privacy review, ready, scheduled, published, noindex.
- [x] [P1-055] Lägg till rollstyrning: admin, editor, medical_reviewer, staff.
- [x] [P1-056] Lägg till audit log för contentändringar, inte bara chatt.
- [x] [P1-057] Lägg till versionshistorik och rollback för artiklar/sidor.
- [x] [P1-058] Lägg till fält för meta title, meta description, canonical, OG image, schema och robots.
- [x] [P1-059] Lägg till källbibliotek med primära källor och `lastCheckedAt`.
- [x] [P1-060] Lägg till internlänksförslag i editor.
- [x] [P1-061] Lägg till SEO-score som varnar, inte styr: saknad H1, duplicerad title, tunn text, saknad CTA, saknade källor.
- [x] [P1-062] Lägg till publiceringskalender och ämnesbacklog.
- [x] [P1-063] Lägg till statistikflik med import av GSC-export (queries, impressions, CTR, position), manuella konverteringsmått och contentstatus per URL.
- [x] [P1-064] Lägg till broken link/image checker i admin.
- [x] [P1-065] Koppla admin till sitemap-regenerering och cache revalidation efter publicering.

### Fas 6: Chatten som konverterings- och supportlager

- [x] [P1-066] Byt från `DEMO_EMPLOYEE` till inloggad session i StaffInbox.
- [P1-067] Lägg till polling, SSE eller realtime för nya meddelanden.
- [P1-068] Lägg till referensnummergenerator med sekvens eller retry vid unik constraint-kollision.
- [P1-069] Lägg till rate limit, bot-skydd och spamfilter på publik chatt.
- [P1-070] Lägg till tydlig säker överlämning till identifierad patientkontakt när hälsodata krävs.
- [P1-071] Lägg till SLA, tags, prioritet och ärendekategorier.
- [P1-072] Lägg till exporterbara chattnyckeltal: första svarstid, avslutade ärenden, nöjdhet, ämnen, konvertering.
- [P1-073] Lägg till retention-policy och rensningsjobb för chattdata.

### Fas 7: Automation

- [P1-074] Skapa `vercel.json` med cron endast när deploymentplan är bestämd.
- [P1-075] Skapa `/api/cron/content-ideation` som kör timvis på Pro: `0 * * * *`.
- [P1-076] Skydda alla cron routes med `CRON_SECRET`.
- [P1-077] Lägg till `cron_runs`-tabell med run id, schedule time, status, startedAt, finishedAt, error, counts.
- [P1-078] Lägg till distribuerat lås eller Postgres advisory lock så två körningar inte skapar dubbletter.
- [P1-079] Gör cron idempotent: varje ämne/brief får stabil hash och kan köras om utan dublett.
- [P1-080] Låt AI skapa research brief, outline, källförslag och utkast, men sätt status `draft` eller `medical_review`, aldrig autopublish.
- [P1-081] Lägg till kvalitetsgrind: stoppa utkast om källor saknas, medicinska påståenden är okällade eller topic redan täcks.
- [P1-082] Lägg till dagligt jobb för trasiga länkar, saknade bilder och 404-loggar.
- [P1-083] Lägg till veckojobb för stale content: guider äldre än 6-12 månader eller källa ändrad.
- [P1-084] Lägg till månadsjobb för content pruning-kandidater: låg trafik, låg konvertering, hög bounce, tunn text.
- [P1-085] Lägg till notifiering till admin vid misslyckade cron-körningar.

### Fas 8: Schema och sökfeatures

- [P1-086] Implementera Organization/MedicalOrganization schema på startsidan med verifierade data.
- [P1-087] Implementera MedicalClinic/LocalBusiness per verklig mottagning.
- [P1-088] Implementera Article/MedicalWebPage på medicinska guider med author/reviewer/dateModified.
- [P1-089] Implementera BreadcrumbList på guider, servicesidor och mottagningar.
- [P1-090] Undvik review snippet markup för egna recensioner på egen LocalBusiness/Organization-sida.
- [P1-091] Testa schema i Google Rich Results Test innan lansering.

### Fas 9: Auktoritet och länkar

- [P2-092] Skapa expertprofiler för verkliga läkare/sköterskor med legitimation, specialitet och artiklar de granskat.
- [P2-093] Publicera originaldata som bara Hemläkare.se kan ha: anonymiserade trender, väntetider, vanligaste ärenden, patientfrågor.
- [P2-094] Skapa press-/kunskapsmaterial för relevanta journalistiska vinklar.
- [P2-095] Samarbeta med arbetsgivare, försäkringsbolag och lokala partners för naturliga länkar.
- [P2-096] Skapa föreläsningssidor med schema, talare, målgrupp, anmälan och eftermaterial.
- [P2-097] Bygg länkvärda verktyg: "kan detta tas digitalt?", prisguide, hembesöksområdeskarta, fotoguide för hudförändringar.
- [P2-098] Följ upp externa omnämnanden och säkerställ korrekt NAP och länk där det är naturligt.

### Fas 10: Målbild och drift

- [P2-099] Sätt kvartalsmål: organisk trafik, organisk konverteringsgrad, bokade besök, lead quality, indexerade money pages.
- [P2-100] Kör månadsvis SEO-review: nya vinnare/förlorare, kannibalisering, tekniska fel, content refresh.
- [P2-101] Kör kvartalsvis medicinsk kvalitetsrevision av högtrafiksidor.
- [P2-102] Kör A/B-test på CTA-copy, prisplacering, trust-block och formulärlängd.
- [P2-103] Skala först när de första 10-20 money/guide-sidorna visar ranking, engagemang och konvertering.

## Adminpanel: rekommenderad målbild

Adminpanelen bör bli navet för både patientnära support och organisk tillväxt.

### Navigation

- Dashboard
- Chatt/ärenden
- Bokningar/leads
- Innehåll
- Medicinsk granskning
- Mottagningar/tjänster
- SEO & Search Console
- Automations
- Recensioner/rykte
- Inställningar, användare, roller, audit log

### Innehållsmodul

Funktioner:

- skapa/redigera/schemalägga sidor och artiklar,
- förhandsgranskning i mobil/desktop,
- SEO-fält,
- canonical/robots,
- schema-typ,
- internlänkförslag,
- publiceringsstatus,
- revision och rollback,
- källor och källstatus,
- medicinsk granskare och godkännande,
- CTA-val per sidtyp,
- automatisk sitemap/cache uppdatering.

### SEO-dashboard

Visa per URL:

- target query,
- impressions,
- clicks,
- CTR,
- genomsnittlig position,
- konverteringar,
- konverteringsgrad,
- status i sitemap,
- indexeringsstatus,
- Core Web Vitals,
- schema-validering,
- inkommande interna länkar,
- senaste medicinska granskning.

### Mottagningar och tjänster

Admin ska kunna hantera:

- verklig adress,
- telefon,
- öppettider,
- särskilda öppettider,
- foton,
- hembesöksradie,
- tjänster som erbjuds,
- pris,
- bokningslänk,
- Google Business Profile-id,
- schema-data,
- personal kopplad till mottagningen.

### Medicinsk granskning

Krav:

- granskare måste vara riktig person med roll/legitimation,
- ändringar efter granskning kräver ny review om medicinska råd ändras,
- logga vem som godkänt vad och när,
- blockera publicering av riskämnen utan akut-varning.

## Automationer

### Timvis bloggautomation

Rekommendation: timvis jobb får skapa utkast, briefar och förbättringsförslag. Det ska inte publicera automatiskt inom vård utan mänsklig/medicinsk granskning.

Föreslagen pipeline:

1. Cron kör `/api/cron/content-ideation` varje timme på Vercel Pro.
2. Endpoint verifierar `Authorization: Bearer ${CRON_SECRET}`.
3. Jobbet tar Postgres-lås och skapar `cron_runs`.
4. Jobbet hämtar topic-kandidater från Search Console, site search, chattämnen och admin-backlog.
5. Jobbet filtrerar bort ämnen som redan täcks eller saknar tydlig koppling till erbjudandet.
6. AI skapar content brief: intent, målgrupp, disposition, källor att kontrollera, CTA och risknivå.
7. AI skapar eventuellt utkast i status `draft`.
8. Admin får uppgift i granskningskö.
9. Medicinsk granskare godkänner eller skickar tillbaka.
10. Editor publicerar eller schemalägger.

Vercel-detaljer:

- Hobby stödjer inte timvis cron; enligt aktuell Vercel-dokumentation är Hobby begränsad till en gång per dag.
- Pro stödjer ned till en gång per minut.
- Vercel Cron körs i UTC.
- Cron delivery är best effort, och samma schemalagda körning kan ske mer än en gång. Därför krävs lås och idempotens.

Exempel på cron:

```json
{
  "crons": [
    {
      "path": "/api/cron/content-ideation",
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/cron/seo-health-check",
      "schedule": "15 2 * * *"
    },
    {
      "path": "/api/cron/stale-content-review",
      "schedule": "30 3 * * 1"
    }
  ]
}
```

### Viktiga automationer utöver blogg

- Broken link/image check varje natt.
- 404-logg som föreslår redirect eller sida.
- Sitemap och RSS/Atom-feed vid publicering, inte varje request.
- Stale content review varje vecka.
- Search Console import varje dag.
- Conversion report varje morgon.
- Chattämnen -> content backlog.
- Recensionspåminnelser efter avslutat besök, utan incitament och utan att filtrera bort missnöjda patienter.
- GBP-kontroll: öppettider, bilder, rating, obesvarade recensioner.
- Säkerhetsjobb: rensa gamla chattsessioner enligt retentionpolicy.
- Adminvarning om content med saknad reviewer/source.

## Viktiga risker

### Healthcare/YMYL

Google lägger extra vikt vid förtroendesignaler för sidor som kan påverka hälsa. Därför räcker det inte med många artiklar. Ni behöver verklig expertis, källor, granskning, uppdatering och transparent ansvar.

### Scaled content abuse

Att generera "blogginlägg varje timme" i syfte att ranka är riskabelt om sidorna inte tillför tydligt användarvärde. Google pekar uttryckligen ut massgenererat innehåll utan mervärde som spamrisk. Automationen måste därför vara byggd för kvalitet, inte volym.

### Privacy

IMY anger att uppgifter om hälsa är känsliga personuppgifter. Chatten, formulär, analytics, cookies och lead tracking måste designas så att man inte råkar samla hälsodata på fel sätt. Integritetspolicy, informationskrav, retention, åtkomstloggning och biträdesavtal måste vara på plats före skarp vårdhantering.

### Lokal SEO

Mottagningssidor och Google Business Profiles ska bara skapas för verkliga platser där ni är behöriga att representera verksamheten. Fejkade adresser eller doorway-liknande lokalsidor är långsiktigt farligt.

## Målbild

Målet är nått när:

- alla kritiska boknings- och förtroendeflöden fungerar,
- inga indexerbara sidor är tunna placeholders,
- Search Console visar stabil indexering av prioriterade money pages,
- de viktigaste sidorna har verifierade author/reviewer/source-signaler,
- organisk trafik växer på rätt URL:er,
- organisk trafik leder till bokningar/leads,
- adminpanelen kan planera, skapa, granska, publicera och mäta innehåll,
- automation hjälper teamet att bli snabbare utan att offra kvalitet eller regelefterlevnad.

## Rekommenderad ordning

1. Gör sajten sann och bokningsbar.
2. Städa bort brutna länkar, placeholders och tunn indexering.
3. Bygg de första 10 kommersiella sidorna som om de vore försäljningssidor och vårdinformation samtidigt.
4. Bygg CMS/admin-workflow för kvalitetssäkrad publicering.
5. Automatisera research, briefs, QA och rapporter.
6. Skala innehåll först när mätningen visar att sidorna rankar och konverterar.

## Vidareutvecklingsprompt

Använd gärna denna prompt när du fortsätter med GPT-6 Astra eller motsvarande stark modell:

```text
Du är senior Next.js 16 App Router-utvecklare, teknisk SEO-arkitekt, CRO-strateg och healthcare/YMYL-redaktör för Hemläkare.se.

Mål:
Bygg Hemläkare.se från prototyp till en trovärdig, mätbar och konverterande vårdsajt med hög organisk trafik. Prioritera verkliga bokningar/leads, teknisk SEO, lokal SEO, E-E-A-T/förtroende, adminpanel/CMS och säkra automationer.

Arbetsregler:
- Läs AGENTS.md och relevanta Next.js 16-dokument i node_modules/next/dist/docs innan kodändringar.
- Läs befintlig kod innan du ändrar.
- Ändra inte orelaterade filer.
- Behandla allt vårdinnehåll som YMYL: inga medicinska påståenden utan källa, granskare och tydlig risktext.
- Publicera inte AI-genererat vårdinnehåll automatiskt. AI får skapa brief/utkast, men människa och medicinsk granskare måste godkänna.
- Fejka aldrig mottagningar, läkare, recensioner, patientantal, rating, priser eller öppettider.
- Alla CTA:er ska leda till ett fungerande konverteringsmål.
- Alla indexerbara sidor ska ha canonical, korrekt metadata, internlänkar, källor där relevant och en tydlig roll i keyword map.
- Admin, chatt och analytics ska respektera känsliga personuppgifter, retention, audit log och rollstyrning.

Starta med:
1. Kör lint/build och inventera brutna länkar/rutter.
2. Implementera /boka eller koppla extern bokning.
3. Skapa saknade juridiska och konverteringskritiska sidor.
4. Rätta sitemap/canonical/OG.
5. Bygg CMS-datamodell och adminflöde för content review.
6. Bygg cron-pipeline för content briefs med CRON_SECRET, locks, idempotens och draft-only-output.
7. Uppgradera de första 10 money pages innan bred bloggskalning.

Leverera alltid:
- kort riskbedömning,
- filer ändrade,
- verifiering,
- nästa mest värdefulla steg.
```

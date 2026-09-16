import type { Article } from "./types";

const article: Article = {
    slug: "overvikt-bmi",
    title: "BMI – vad det mäter, vad det inte mäter och vad som är viktigare",
    tag: "LIVSSTIL",
    date: "november 20, 2017",
    image: "/bilder/aktuellt-2.jpg",
    excerpt: "BMI är ett trubbigt mått. Midjemåttet och fettfördelningen säger mer om hälsorisk.",
    body: "BMI (Body Mass Index = vikt/längd²) används kliniskt men har begränsningar: den skiljer inte på fett- och muskelmassa, den tar inte hänsyn till fettfördelning. En muskulös person kan ha 'övervikts-BMI' med utmärkt hälsa. Mer informativt: midjemåttet (risk höjd vid >88 cm för kvinnor, >102 cm för män), midja-höftkvot och visceralt fett (mäts med DEXA). Central fetma (bukfett) ökar hjärt-kärlrisken mer än subkutant fett.",
  };

export default article;

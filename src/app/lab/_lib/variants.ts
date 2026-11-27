export const VARIANTS = [
  {
    id: "a",
    name: "Sessiz alet",
    line: "Açık gri zemin, şişe yeşili yazı, tek sarı vurgu. Dar bir sütun, büyük boşluk; projeler bir defter gibi sıralanır.",
    swatch: ["#f7f7f7", "#0d2a1c", "#f6e016"],
  },
  {
    id: "b",
    name: "Sahne",
    line: "Ekranın yarısı sabit: kaydırdıkça o bölümün gerçek API yanıtı yanda değişir. Serif yazı, pudra ve patlıcan rengi.",
    swatch: ["#edccbe", "#351a2b", "#e8c2b2"],
  },
  {
    id: "c",
    name: "Karanlık oda",
    line: "Baştan sona koyu zemin, projeler loş bir galeride ışıklandırılmış eserler gibi. İnce serif, turuncu vurgu.",
    swatch: ["#18191b", "#eff0f1", "#ff4a1f"],
  },
  {
    id: "d",
    name: "Afiş",
    line: "Sokak afişi gibi yüksek sesli: dev ağır harfler, her bölüm başka bir düz renk. Kendine güvenen, akılda kalan.",
    swatch: ["#ffd249", "#ffc4ef", "#a4f6f8"],
  },
] as const;

export type VariantId = (typeof VARIANTS)[number]["id"];

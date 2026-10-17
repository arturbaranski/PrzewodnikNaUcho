import { PLACES as MALTA } from "./places.js";
import { LODZ } from "./lodz.js";
import { SZCZECIN } from "./szczecin.js";

export const DESTINATIONS = [
  {
    id: "malta",
    title: "Malta na ucho",
    subtitle: "Malta · Gozo · Comino",
    blurb: "Valletta, świątynie, Gozo i Comino.",
    lede: "Trzymaj aplikację otwartą na spacerze. Przy zabytku, świątyni albo zatoce sama przeczyta historię po polsku. Z listy możesz posłuchać też ręcznie.",
    center: [35.94, 14.38],
    zoom: 10,
    areas: ["Valletta", "Floriana", "Trzy Miasta", "Mdina i Rabat", "Centrum", "Prehistoria", "Południe", "Północ", "Gozo", "Comino"],
    filters: [
      { id: "all", label: "Wszystkie" },
      { id: "malta", label: "Malta" },
      { id: "gozo", label: "Gozo" },
      { id: "comino", label: "Comino" },
    ],
    samples: ["st-johns", "mdina-bastion", "ggantija", "bluelagoon"],
    places: MALTA,
  },
  {
    id: "lodz",
    title: "Łódź na ucho",
    subtitle: "Piotrkowska · fabryki · Bałuty",
    blurb: "Piotrkowska, pałace fabrykantów i miejsca pamięci.",
    lede: "Trzymaj aplikację otwartą na spacerze. Przy ulicy, fabryce albo miejscu pamięci sama przeczyta historię po polsku.",
    center: [51.77, 19.46],
    zoom: 13,
    areas: ["Piotrkowska", "Fabryki", "Miasto", "Pamięć"],
    filters: [
      { id: "all", label: "Wszystkie" },
      { id: "deptak", label: "Piotrkowska" },
      { id: "fabryki", label: "Fabryki" },
      { id: "miasto", label: "Miasto" },
      { id: "pamiec", label: "Pamięć" },
    ],
    samples: ["piotrkowska", "manufaktura", "ksiezy", "radegast"],
    places: LODZ,
  },
  {
    id: "szczecin",
    title: "Szczecin na ucho",
    subtitle: "Zamek · Wały · Odra",
    blurb: "Zamek, Wały Chrobrego, parki i miejsca pamięci.",
    lede: "Trzymaj aplikację otwartą na spacerze. Przy zamku, wałach albo parku sama przeczyta historię po polsku.",
    center: [53.428, 14.555],
    zoom: 13,
    areas: ["Stare Miasto", "Wały i Odra", "Parki", "Miasto", "Pamięć"],
    filters: [
      { id: "all", label: "Wszystkie" },
      { id: "stare", label: "Stare Miasto" },
      { id: "waly", label: "Wały" },
      { id: "parki", label: "Parki" },
      { id: "miasto", label: "Miasto" },
      { id: "pamiec", label: "Pamięć" },
    ],
    samples: ["zamek", "waly", "pionier", "glebokie"],
    places: SZCZECIN,
  },
];

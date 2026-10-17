import { PLACES as MALTA } from "./places.js";
import { LODZ } from "./lodz.js";

export const DESTINATIONS = [
  {
    id: "malta",
    title: "Malta na ucho",
    subtitle: "Malta · Gozo · Comino",
    blurb: "Valletta, świątynie, Gozo i Comino.",
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
];

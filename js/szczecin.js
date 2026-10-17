import { SZCZECIN_MORE } from "./szczecin-more.js";
import { SZCZECIN_PARKS } from "./szczecin-parks.js";

const CORE = [
  {
    id: "zamek",
    name: "Zamek Książąt Pomorskich",
    area: "Stare Miasto",
    island: "stare",
    lat: 53.426194,
    lng: 14.561026,
    radius: 55,
    speech: `Stoisz przy Zamku Książąt Pomorskich. To była siedziba Gryfitów, książąt Pomorza. Bogusław Dziesiąty przeniósł tu stolicę zjednoczonego księstwa pod koniec piętnastego wieku. Ostatni z rodu, Bogusław Czternasty, zmarł w tysiąc sześćset trzydziestym siódmym roku i dynastia wygasła. Drugiego maja tysiąc siedemset dwudziestego dziewiątego roku urodziła się tu Zofia Augusta Fryderyka von Anhalt-Zerbst, później caryca Katarzyna Druga. Ojciec był wtedy pruskim gubernatorem miasta. Wyjechała jako dziecko. Zamek był miejscem urodzenia, nie dworem, w którym rządziła.

Pod koniec wojny zamek spłonął po bombardowaniach. Zostały głównie mury. Odbudowę prowadzono przez dziesięciolecia i zasadniczy kształt zamknięto w tysiąc dziewięćset osiemdziesiątym piątym roku, opierając się na starych widokach, między innymi na miedziorycie Meriana. Dlatego dziedziniec wygląda jak renesansowy, choć dachy i sale są powojenne. Na skrzydle południowym wrócił zegar.

Wejdź na dziedziniec, nawet gdy muzeum jest zamknięte. Wieża dzwonów bywa punktem widokowym na port, ale wejście i bilety sprawdzaj osobno. W zamku działa też opera. Ratusz staromiejski jest u stóp wzgórza, Brama Królewska kilka minut na północ.`,
  },
  {
    id: "krolewska",
    name: "Brama Królewska",
    area: "Stare Miasto",
    island: "stare",
    lat: 53.4284,
    lng: 14.556693,
    radius: 36,
    speech: `Jesteś przy Bramie Królewskiej. Zbudowano ją w latach tysiąc siedemset dwudziestym piątym–dwudziestym siódmym, według projektu holenderskiego inżyniera Gerharda Corneliusa von Walrave. Najpierw mówiono na nią Anklamska, od drogi na Anklam. Nazwę Królewska dostała po wizycie króla Prus Fryderyka Wilhelma Czwartego w tysiąc osiemset czterdziestym pierwszym roku.

Na attyce stoją Mars i Herkules, dzieło rzeźbiarza Bartholome Damarta, a nad przejazdem jest kartusz z Orderem Czarnego Orła. W tysiąc osiemset siedemdziesiątym trzecim roku zaczęto burzyć fortyfikacje. Bramę, razem z Portową, udało się ocalić i w tysiąc osiemset siedemdziesiątym piątym oddano ją miastu. W tysiąc dziewięćset czterdziestym drugim roku, w obawie przed nalotami, zdjęto szczyty i ukryto je w Lesie Arkońskim. Wróciły w tysiąc dziewięćset pięćdziesiątym siódmym.

Obejdź bramę z obu stron. Murów, do których należała, już nie ma, więc stoi sama na placu. Zamek jest tuż obok, w górę. Plac Solidarności i filharmonia są kilkadziesiąt metrów dalej.`,
  },
  {
    id: "piotr",
    name: "Kościół św. Piotra i Pawła",
    area: "Stare Miasto",
    island: "stare",
    lat: 53.42802,
    lng: 14.559012,
    radius: 32,
    speech: `Stoisz przy kościele świętego Piotra i Pawła, gotyckiej ceglanej świątyni z piętnastego wieku. To jeden z najstarszych kościołów w mieście. Gdy pod koniec wojny spłonęła prawie cała zabudowa wokół zamku, ta bryła została.

Dziś jest to kościół polskokatolicki, nie rzymskokatolicka fara. Wejście zależy od nabożeństwa. Z zewnątrz widać to, co w Szczecinie cenne: cegłę, która pamięta miasto sprzed pruskich bram i sprzed powojennej odbudowy. Domy wokół są nowe. Kościół został punktem stałym na skarpie schodzącej ku Odrze.

Plac Solidarności jest tuż obok. Pod jego falistą nawierzchnią leży muzeum Przełomy, a na placu stoi Anioł Wolności. Nie myl tego kościoła z katedrą świętego Jakuba. Katedra jest niżej, bliżej Bramy Portowej, i ma zupełnie inną skalę.`,
  },
  {
    id: "ratusz",
    name: "Ratusz Staromiejski",
    area: "Stare Miasto",
    island: "stare",
    lat: 53.4244,
    lng: 14.560173,
    radius: 40,
    speech: `Jesteś przy Ratuszu Staromiejskim, u stóp wzgórza zamkowego. To gotycki ratusz. Gdy po bombardowaniach zastanawiano się, czy resztki starego miasta w ogóle odbudowywać, ten budynek należał do nielicznych, które nadawały się do uratowania. Wokół przez lata było puste pogorzelisko, a ratusz stał.

Dziś mieści się tu Muzeum Historii Szczecina, oddział Muzeum Narodowego. W środku jest opowieść o mieście: Gryfici, pruskie fortyfikacje, port, wojna i polski Szczecin po tysiąc dziewięćset czterdziestym piątym roku. Piwnice są starsze niż sale na górze. Bilet i godziny sprawdzaj przy drzwiach. W poniedziałki muzea często milczą.

Zamek masz nad sobą, krótkie podejście pod górę. Katedra świętego Jakuba jest na zachód, już poza tym wzgórzem. Jak wejdziesz do środka, zacznij od piwnic: tam widać, że dom miasta jest starszy niż jego powojenna elewacja.`,
  },
  {
    id: "orzel",
    name: "Plac Orła Białego",
    area: "Stare Miasto",
    island: "stare",
    lat: 53.425833,
    lng: 14.554951,
    radius: 30,
    speech: `Stoisz na placu Orła Białego. To jeden z niewielu placów starego Szczecina, który zachował barokowy obrys, gdy wokół po wojnie stawiano nowe kwartały. Pośrodku jest fontanna z orłem. Orzeł na tym placu jest znakiem miasta, nie pomnikiem jednej bitwy.

Obok, przy Staromłyńskiej, stoi Pałac pod Globusem. Łatwo wziąć oba miejsca za jedno. Plac jest otwartą posadzką, pałac ma globus na dachu i własne wejście. Zostań przy fontannie, zanim podejdziesz pod pałac. Stąd widać, jak niskie jest to miasto między katedrą a zamkiem: kilka minut piechotą w każdą stronę.

Na placu stoi też zegar kulkowy. Kulka toczy się po torze i odmierza czas. Jeśli idziesz w stronę Bramy Portowej, miniesz jeszcze bazylikę świętego Jana. W drugą stronę, pod górę, jest zamek. Kamienice wokół placu są powojenne. Został układ placu i fontanna, nie oryginalne barokowe domy. Tak wygląda większa część tego śródmieścia: stary rysunek ulic, nowe ściany.`,
  },
  {
    id: "globus",
    name: "Pałac pod Globusem",
    area: "Stare Miasto",
    island: "stare",
    lat: 53.426122,
    lng: 14.554276,
    radius: 26,
    speech: `Jesteś przy Pałacu pod Globusem. Barokowa kamienica pałacowa powstała w latach dwudziestych osiemnastego wieku, w tym samym czasie co pruskie bramy miasta. Na dachu stoi globus. Stąd nazwa, którą Szczecin mówi do dziś.

Budynek przetrwał wojnę lepiej niż kwartały wokół. Dziś jest siedzibą Akademii Sztuki. To szkoła, nie muzeum z kasą. Oglądasz elewację i globus z ulicy. Do środka wchodzi się na koncert albo wernisaż, jeśli akurat jest ogłoszony.

Plac Orła Białego jest tuż obok, bliżej fontanny. Nie czekaj, aż opowieść o placu i o pałacu zleją się w jedną. To dwa adresy na jednym skrzyżowaniu. Globus najlepiej widać z cofnięcia, nie spod samej ściany. Jak na drzwiach wisi afisz Akademii, koncert bywa otwarty. W zwykły dzień zostajesz na ulicy.`,
  },
  {
    id: "filharmonia",
    name: "Filharmonia",
    area: "Stare Miasto",
    island: "stare",
    lat: 53.429393,
    lng: 14.55813,
    radius: 42,
    speech: `Stoisz przy Filharmonii imienia Mieczysława Karłowicza. Biały budynek z ostrymi dachami otwarto we wrześniu dwa tysiące czternastego roku. Zaprojektowała go barcelońska pracownia Barozzi Veiga, Alberto Veiga i Fabrizio Barozzi. W dwa tysiące piętnastym roku dostał nagrodę Unii Europejskiej imienia Miesa van der Rohe. Był pierwszym budynkiem z Polski, który ją wygrał.

Stoi w miejscu przedwojennego koncerthausu, zniszczonego w czasie wojny. Przez dekady parceli nie było. Nowa bryła nawiązuje do stromych dachów hanzeatyckiego miasta i do dźwigów portu, ale jest ze szkła i metalu, nie z cegły. W środku są dwie sale. Na koncert trzeba biletu. Z zewnątrz możesz obejść budynek o każdej porze. Wieczorem elewacja świeci od środka.

Plac Solidarności i muzeum Przełomy są po drugiej stronie. Anioł Wolności stoi na tym placu. Filharmonia jest głośna architekturą, muzeum schowane pod ziemią. Dobrze posłuchać obu, stojąc między nimi.`,
  },
  {
    id: "przelomy",
    name: "Centrum Dialogu Przełomy",
    area: "Pamięć",
    island: "pamiec",
    lat: 53.428563,
    lng: 14.55823,
    radius: 38,
    speech: `Jesteś na placu Solidarności, nad Centrum Dialogu Przełomy. Muzeum jest pod ziemią. Oddano je dwudziestego szóstego stycznia dwa tysiące szesnastego roku. Budynek zaprojektował Robert Konieczny z pracowni KWK Promes. W dwa tysiące szesnastym roku uznano go za budynek roku na World Architecture Festival. Dach to falisty plac, po którym chodzisz. Wejście do wystawy jest z boku, nie z pomnika.

Na placu stoi Anioł Wolności, pomnik Czesława Dźwigaja z dwa tysiące piątego roku. Upamiętnia ofiary grudnia tysiąc dziewięćset siedemdziesiątego roku, gdy wojsko i milicja strzelały do robotników stoczni i ulicy. W sierpniu tysiąc dziewięćset osiemdziesiątego roku szczecińska stocznia podpisała własne porozumienie, trzydziestego sierpnia, dzień przed gdańskim. Przewodniczącym komitetu strajkowego był Marian Jurczyk. Wystawa w dole opowiada te miesiące bez pocieszenia.

Mów ciszej przy aniele, zwłaszcza w rocznicę. Bilet do muzeum jest osobny. Filharmonia stoi obok i łatwo ją wziąć za część tego miejsca. To osobny budynek i osobna opowieść.`,
  },
  {
    id: "jakub",
    name: "Katedra św. Jakuba",
    area: "Stare Miasto",
    island: "stare",
    lat: 53.424672,
    lng: 14.556068,
    radius: 48,
    speech: `Stoisz przy bazylice archikatedralnej świętego Jakuba. To wielki gotycki kościół z cegły, fara miasta przez stulecia, a dziś archikatedra. Diecezję szczecińsko-kamieńską utworzono w tysiąc dziewięćset siedemdziesiątym drugim roku. W tysiąc dziewięćset dziewięćdziesiątym drugim roku świątynia stała się archikatedrą.

W czasie wojny kościół zamienił się w ruinę. Zabezpieczono ją tuż po wojnie, a odbudowę na dobre podjęto w tysiąc dziewięćset siedemdziesiątym trzecim. Wieżę, według projektu Stanisława Latoura, dokończono w dwa tysiące ósmym roku. Jest najwyższym punktem starego miasta. Czasem można na nią wejść. Godziny wejścia zmieniają się, więc sprawdź przy drzwiach, zanim obiecujesz sobie widok.

W środku jest wysoko i dość pusto, jeśli nie trafisz na mszę. Ramiona zakryj. Nie myl tej katedry z bazyliką świętego Jana, która stoi bliżej Bramy Portowej i jest neogotycka, dużo młodsza.`,
  },
  {
    id: "jan",
    name: "Bazylika św. Jana Chrzciciela",
    area: "Stare Miasto",
    island: "stare",
    lat: 53.426954,
    lng: 14.549267,
    radius: 42,
    speech: `Jesteś przy bazylice świętego Jana Chrzciciela. Neogotyckie wieże widać znad śródmieścia, gdy idziesz od Bramy Portowej w stronę alei. Świątynia jest dużo młodsza niż katedra świętego Jakuba. Powstała na przełomie dziewiętnastego i dwudziestego wieku, gdy Szczecin wyszedł już poza stare mury i potrzebował dużego kościoła w nowym śródmieściu.

Dziś jest katolicką bazyliką. Cegła i wysokie wieże udają średniowiecze, ale to architektura z czasu, gdy miasto rosło razem z portem i kolejami. Wejdź, jeśli drzwi są otwarte. W dzień powszedni bywa cicho. Nabożeństwo zmienia porządek zwiedzania.

Brama Portowa jest kilka minut na południe. Plac Orła Białego i Pałac pod Globusem są na wschód, już bliżej zamku. Ta bazylika stoi między nimi, na granicy starego obwodu i nowszego centrum.`,
  },
  {
    id: "portowa",
    name: "Brama Portowa",
    area: "Stare Miasto",
    island: "stare",
    lat: 53.424971,
    lng: 14.550416,
    radius: 40,
    speech: `Stoisz przy Bramie Portowej. Zbudowano ją w latach tysiąc siedemset dwudziestym piątym–dwudziestym siódmym, tak jak Bramę Królewską, według projektu Gerharda Corneliusa von Walrave. Najpierw była Bramą Brandenburską, potem Berlińską, bo tędy wychodziła droga na Berlin. Polska nazwa Portowa została, bo stoi od strony, z której miasto schodziło ku portowi.

Forty wokół rozebrano pod koniec dziewiętnastego wieku. Brama ocalała i od tysiąc osiemset siedemdziesiątego piątego roku należy do miasta. W czasie wojny zdjęto jej szczyt i schowano w lesie, tak jak szczyt Bramy Królewskiej. Po wojnie wrócił na miejsce. Dziś brama stoi sama na placu, wśród ruchu. Mur, w którym była furtą, zniknął.

Obejrzyj obie elewacje. Auta jadą blisko, więc nie wchodź w jezdnię dla zdjęcia. Stąd na północ jest bazylika świętego Jana, a dalej deptak w stronę zamku.`,
  },
  {
    id: "waly",
    name: "Wały Chrobrego",
    area: "Wały i Odra",
    island: "waly",
    lat: 53.428718,
    lng: 14.56423,
    radius: 80,
    speech: `Jesteś na Wałach Chrobrego, tarasie nad Odrą długim na około pół kilometra. Niemiecka nazwa brzmiała Hakenterrasse, od Hermanna Hakena, nadburmistrza Szczecina. Tarasy powstały w latach tysiąc dziewięćset drugi–dwudziesty pierwszy, po zburzeniu Fortu Leopolda. Projekt urbanistyczny jest Wilhelma Meyera-Schwartau. Stoisz kilkanaście metrów nad rzeką.

Pośrodku jest niższy taras, schody do wody, fontanna i dwie wieżyczki jak małe latarnie. Na balustradzie są herby miast pomorskich. Rzeźba walki człowieka z centaurem jest dziełem Ludwiga Manzla. Gmach muzeum, na planie litery E, zbudowano w latach tysiąc dziewięćset ósmym–trzynastym jako muzeum miejskie. Muzeum Narodowe otwarto w nim w tysiąc dziewięćset siedemdziesiątym roku. Po bokach stoją dziś urząd wojewódzki i uczelnia morska.

Zejdź schodami choć kawałek i wróć. Stąd widać Łasztownię i dźwigi. Morskie Centrum Nauki jest po drugiej stronie wody, osobna opowieść. W wietrzny dzień trzymaj czapkę. Haken, od którego taras wziął pierwszą nazwę, leży na Cmentarzu Centralnym.`,
  },
  {
    id: "nauka",
    name: "Morskie Centrum Nauki",
    area: "Wały i Odra",
    island: "waly",
    lat: 53.425803,
    lng: 14.568596,
    radius: 55,
    speech: `Stoisz przy Morskim Centrum Nauki na Łasztowni. Wyspę między Odrą a Duńczycą przez dekady zajmowały magazyny i port. Centrum otwarto dwudziestego siódmego maja dwa tysiące dwudziestego trzeciego roku. W środku jest wystawa o morzu, z interaktywnymi stanowiskami. Wstęp jest biletowany, w poniedziałki bywa zamknięte. Godziny sprawdzaj, bo zmieniają się z sezonem.

Po drodze stoją rzeźby dźwigów przypominające zwierzęta. Mówi się na nie dźwigozaury. Z zewnątrz budynek jest nowy i niski wobec dźwigów. Odwróć się w stronę miasta: Wały Chrobrego stoją na skarpie naprzeciwko, kilkaset metrów stąd, ale już za wodą. To najlepszy punkt, żeby zrozumieć, po co tamte tarasy zbudowano. Miały być bramą portowego miasta, oglądaną właśnie z tej strony.

Na wyspę dochodzi się kładkami i nabrzeżem. Nie jest to spacer spod zamku w pięć minut. Zostań na bulwarze nawet bez biletu. Woda, statki i widok na stare miasto są dostępne bez wejścia do środka.`,
  },
  {
    id: "blonia",
    name: "Jasne Błonia",
    area: "Parki",
    island: "parki",
    lat: 53.442767,
    lng: 14.537704,
    radius: 70,
    speech: `Jesteś na Jasnych Błoniach, przy Pomniku Czynu Polaków. Trzy orły zaprojektował Gustaw Zemła. Pomnik odsłonięto trzeciego września tysiąc dziewięćset siedemdziesiątego dziewiątego roku. Ma ponad dwadzieścia metrów. Orły przywieziono do Szczecina barką, Odrą. Stoi na skraju łąki i Parku Kasprowicza.

Sama łąka jest starsza. Niemiecka nazwa, Quistorpaue, pamięta rodzinę Quistorpów, która fundowała zieleń tej dzielnicy. Aleje platanów sadzono w tysiąc dziewięćset dwudziestym szóstym roku. Jedenastego czerwca tysiąc dziewięćset osiemdziesiątego siódmego roku na tych błoniach mszę odprawił Jan Paweł Drugi. Później łąka dostała jego imię. Wiosną pod platanami kwitną krokusy. Przyjdź wtedy, jeśli możesz. Tłum jest, ale kolor trwa kilka dni.

Pomnik obchodź dookoła, nie wchodź na cokoły. Różanka jest stąd około kwadransa na zachód, willa Lentza na południe, aleją Wojska Polskiego.`,
  },
  {
    id: "rozanka",
    name: "Różanka",
    area: "Parki",
    island: "parki",
    lat: 53.446835,
    lng: 14.525089,
    radius: 60,
    speech: `Stoisz w ogrodzie Różanka. Różanecznik to nie to samo co róża, a ten ogród jest właśnie od róż. Założono go w tysiąc dziewięćset dwudziestym ósmym roku. Dziś nosi imię Ireny Brodzińskiej. Należy do większych ogrodów różanych w Polsce. Najpełniej kwitnie zwykle w czerwcu. W innej porze zostają alejki, pergole i układ kwater, też warte wejścia.

Ogród jest osobno od Jasnych Błoni, w Łęknie. Do trzech orłów jest stąd około kwadransa piechotą, nie jeden skwer. Wejście bywa bezpłatne. Nie zrywaj kwiatów i nie skracaj drogi przez rabaty. Ścieżki są po to, żeby krzaki zostały na kolejny tydzień.

To dobry przystanek, gdy stare miasto masz już za sobą. Jest ciszej niż na Wałach. Jak pada, alejki robią się śliskie, a róże i tak pachną. Nie szukaj tu trzech orłów. Wielka łąka i Park Kasprowicza leżą bliżej alei Jana Pawła Drugiego. Różanka jest osobnym ogrodem, z własną bramą.`,
  },
  {
    id: "lentz",
    name: "Willa Lentza",
    area: "Miasto",
    island: "miasto",
    lat: 53.437061,
    lng: 14.536277,
    radius: 40,
    speech: `Jesteś przy willi Lentza, przy alei Wojska Polskiego osiemdziesiąt cztery. August Lentz, kupiec, zamówił ją w latach tysiąc osiemset osiemdziesiątym ósmym–osiemdziesiątym dziewiątym, w czasie gdy Szczecin szybko bogacił się na porcie. Projekt zrobił Max Drechsler. Aleja była wtedy ulicą ludzi zamożnych, nie deptakiem.

Po długim remoncie willę otwarto jako miejską instytucję kultury jedenastego czerwca dwa tysiące dwudziestego pierwszego roku. W środku są wystawy i koncerty, nie stała ekspozycja mebli z epoki, którą ogląda się bez programu. Sprawdź, co gra tego dnia. Z zewnątrz i tak widać skalę: to nie kamienica czynszowa, tylko dom jednego nazwiska, z ogrodem od ulicy.

Jasne Błonia są kilka minut na północ. Nie spiesz się na skróty przez jezdnię. Aleja jest szeroka i auta jadą szybko.`,
  },
  {
    id: "technika",
    name: "Muzeum Techniki i Komunikacji",
    area: "Miasto",
    island: "miasto",
    lat: 53.44806,
    lng: 14.540403,
    radius: 55,
    speech: `Stoisz przy Muzeum Techniki i Komunikacji, w dawnej zajezdni tramwajowej przy Niemierzyńskiej. Hala, w której kiedyś nocowały wagony, trzyma dziś tramwaje, samochody i motocykle. Szczecin był miastem portu i kolei, a tramwaj był jego codziennym pojazdem. Tu widać tę codzienność z bliska, nie z pomnika.

To nie jest spacer spod zamku. Zajezdnia leży na północy śródmieścia, bliżej Niebuszewa niż Wałów. Dzień deszczowy jest tu lepszy niż przy fontannie, bo większa część zbiorów stoi pod dachem. Bilet i godziny sprawdzaj przy wejściu. Część pojazdów stoi też na dziedzińcu.

Nie wchodź między eksponaty tam, gdzie nie ma przejścia. Lakier i pantografy są bliżej, niż wyglądają na zdjęciu. Jak wolisz róże od stali, Różanka jest na południowy zachód, około kilometra stąd.`,
  },
  {
    id: "cmentarz",
    name: "Cmentarz Centralny",
    area: "Miasto",
    island: "miasto",
    lat: 53.414941,
    lng: 14.514178,
    radius: 80,
    speech: `Jesteś przy Cmentarzu Centralnym. Otwarto go szóstego grudnia tysiąc dziewięćset pierwszego roku. Projekt wykonał Wilhelm Meyer-Schwartau, ten sam architekt, który układał Wały Chrobrego. Nekropolia jest największa w Polsce i należy do największych w Europie. Zakładano ją jak park: aleje, różnice terenu, kaplica, a nie sam rząd kwater.

Na cmentarzu zostali ludzie, którzy zbudowali tamten Szczecin. Jest tu grób Hermanna Hakena, nadburmistrza, od którego Wały wzięły pierwszą nazwę. Są też groby z wojen i powojenne polskie kwatery. Czytaj nazwiska. Miasto zmieniło język, a kamienie zostały.

Zachowaj się jak na cmentarzu. Nie chodź po mogiłach, nie jedz na ławce nad czyimś grobem, zdejmij głośną muzykę. Bramę główną i kaplicę zobacz najpierw. Główna aleja jest długa. Na całość potrzeba godziny, nie pięciu minut. Godziny otwarcia bram sprawdzaj, zimą zmrok zapada wcześnie.`,
  },
  {
    id: "szmaragd",
    name: "Jezioro Szmaragdowe",
    area: "Parki",
    island: "parki",
    lat: 53.371482,
    lng: 14.624989,
    radius: 70,
    speech: `Stoisz nad Jeziorem Szmaragdowym, w Puszczy Bukowej, na Prawobrzeżu. To nie jest naturalne jezioro polodowcowe. W tym miejscu kopalnia kredy cementowni Stern pracowała od dziewiętnastego wieku. Szesnastego lipca tysiąc dziewięćset dwudziestego piątego roku górnicy trafili na warstwę piasku z wodą. Wyrobisko zalało się i kopalnia przestała istnieć. Zieloną barwę daje węglan wapnia. W pochmurny dzień kolor gaśnie. W słońcu wraca.

Mostek nad brzegiem został po kolejce, którą wywożono urobek. Podanie o duchu Skarbku, który miał zalać kopalnię, żeby bronić skarbu, jest legendą. Mów ją jako legendę. Głębokość sięga kilkunastu metrów, brzegi są strome. Nie wchodź do wody.

To nie jest przystanek w drodze z zamku na Wały. Jedziesz do Zdrojów, a dalej idziesz leśną drogą. Obok jest punkt widokowy na miasto. Zostań na ścieżce. Ściany dawnego wyrobiska osuwają się do dziś.`,
  },
];

export const SZCZECIN = CORE.concat(SZCZECIN_MORE, SZCZECIN_PARKS);

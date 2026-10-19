import { MORE_TEXT } from "./more-text.js";
import { MORE_PLACES } from "./more-places.js";
import { MALTA_MORE } from "./malta-more.js";
import { MALTA_CULTURE } from "./malta-culture.js";
import { MALTA_NATURE } from "./malta-nature.js";

const CORE = [
  {
    id: "brama",
    name: "Brama Valletty",
    area: "Valletta",
    island: "malta",
    lat: 35.895914,
    lng: 14.509422,
    radius: 115,
    speech: `Stoisz przy bramie Valletty. Na placu przed tobą jest fontanna z trzema trytonami, z tysiąc dziewięćset pięćdziesiątego dziewiątego roku. Za plecami masz nowy parlament, jasny i dziurkowany. Zaprojektował go włoski architekt Renzo Piano, a miasto otworzyło tę bramę na nowo w dwa tysiące piętnastym roku.

Wejdź do środka. Po prawej zostawiono ruiny opery, zbombardowanej w kwietniu tysiąc dziewięćset czterdziestego drugiego. Dziś to teatr pod gołym niebem. Obok stoi mały kościół Matki Bożej Zwycięskiej, pierwsza świątynia miasta, wzniesiona zaraz po wielkim oblężeniu z tysiąc pięćset sześćdziesiątego piątego roku. Ósmego września Malta do dziś świętuje tamtą obronę.`,
  },
  {
    id: "st-johns",
    name: "Konkatedra św. Jana",
    area: "Valletta",
    island: "malta",
    lat: 35.897696,
    lng: 14.512629,
    radius: 48,
    speech: `Stoisz przy konkatedrze świętego Jana, głównym kościele kawalerów maltańskich. Z zewnątrz jest surowa, prawie jak magazyn. W środku czeka odwrotność: złoto, marmur i groby rycerzy wpuszczone w posadzkę. Patrz pod nogi, bo chodzisz po nagrobkach.

Najcenniejszy obraz jest w oratorium. To Ścięcie świętego Jana, namalowane przez Karawadżia w tysiąc sześćset ósmym roku. To jego jedyny podpisany obraz: nazwisko zostawił w kałuży krwi. Sklepienie i większość barokowego wnętrza pomalował później Mattia Preti. Wejście jest płatne, a ramiona i kolana mają być zakryte.`,
  },
  {
    id: "archaeology",
    name: "Muzeum Archeologiczne",
    area: "Valletta",
    island: "malta",
    lat: 35.897538,
    lng: 14.511195,
    radius: 42,
    speech: `Jesteś przy Narodowym Muzeum Archeologicznym, w dawnej oberży prowincji Prowansji. Kawalerowie maltańscy dzielili się na języki, czyli grupy według kraju pochodzenia, i każda miała tu swój pałac.

W gablotach jest Malta sprzed świątyń i piramid. Poszukaj Śpiącej Damy, małej glinianej figurki z hipogeum w Pauli. Leży na boku, jakby spała. To jeden z najpiękniejszych przedmiotów na wyspie i dobry wstęp, zanim zobaczysz same świątynie. Wstęp jest płatny.`,
  },
  {
    id: "suq",
    name: "Targ Is-Suq",
    area: "Valletta",
    island: "malta",
    lat: 35.897827,
    lng: 14.514534,
    radius: 36,
    speech: `Stoisz przy hali targowej Is-Suq, czytaj: is suk. To żelazna hala z dziewiętnastego wieku, dziś pełna stoisk z jedzeniem. Dobry moment, żeby usiąść, a nie tylko oglądać fasady.

Spróbuj miejscowego chleba ftira albo pasztecików pastizzi, czytaj: pasticci, z ricottą albo z groszkiem. Do picia jest Kinnie, gorzkawo-słodki napój z gorzkich pomarańczy. Jak zjesz, idź dalej Republic Street w stronę pałacu wielkiego mistrza.`,
  },
  {
    id: "palace",
    name: "Pałac Wielkiego Mistrza",
    area: "Valletta",
    island: "malta",
    lat: 35.898564,
    lng: 14.514502,
    radius: 48,
    speech: `Jesteś na placu przed pałacem wielkiego mistrza. Stąd rządzili kawalerowie maltańscy, potem brytyjski gubernator, a dziś urzęduje tu prezydent Malty. Parlament przeniósł się do nowego budynku przy bramie miasta.

W środku są sale paradne i zbrojownia: zbroje, broń i portrety mistrzów zakonu. Na placu czasem stoi warta. Jeśli wejdziesz, sprawdź godziny, bo część skrzydeł bywa zamknięta, gdy pałac pracuje jako urząd.`,
  },
  {
    id: "manoel",
    name: "Teatr Manoel",
    area: "Valletta",
    island: "malta",
    lat: 35.899765,
    lng: 14.512574,
    radius: 40,
    speech: `Stoisz przy Teatrze Manoel, otwartym w tysiąc siedemset trzydziestym pierwszym roku z rozkazu wielkiego mistrza Manoela de Vilhena. To jeden z najstarszych teatrów w Europie, który wciąż gra.

Wnętrze jest małe, złote i ciasno obstawione lożami. Widz prawie siedzi na scenie. Warto sprawdzić, czy danego dnia jest zwiedzanie, albo czy wieczorem jest spektakl. Wejście z ulicy Old Theatre Street łatwo minąć, bo fasada jest skromniejsza niż sala.`,
  },
  {
    id: "castille",
    name: "Auberge de Castille",
    area: "Valletta",
    island: "malta",
    lat: 35.895918,
    lng: 14.511181,
    radius: 48,
    speech: `Stoisz na placu Castille, przed barokowym pałacem kastylijskich kawalerów. Przebudował go w osiemnastym wieku Andrea Belli. Dziś to siedziba premiera Malty, więc do środka się nie wchodzi.

Popatrz na schody, herb i na to, jak pałac zamyka oś ulicy. Za rogiem, w dół ku morzu, są Górne Barakki i widok na Wielki Port. To najlepszy taras w mieście i warto zejść tam zaraz stąd.`,
  },
  {
    id: "upper-barrakka",
    name: "Górne Barakki",
    area: "Valletta",
    island: "malta",
    lat: 35.894955,
    lng: 14.512009,
    radius: 55,
    speech: `Jesteś w Górnych Barakkach, na dachu bastionu nad Wielkim Portem. Arkady zbudowali kawalerowie z języka włoskiego, żeby mieć cień. Przed tobą Birgu, Senglea i woda, która przez wieki była celem każdej floty.

Tuż pod tarasem jest bateria salutowa. Armata strzela w południe i o szesnastej. Z ogrodu zjeżdża też winda na nabrzeże. Zostań chwilę przy balustradzie: to pocztówkowy widok Malty, a w dole widać, czemu Valletta w ogóle powstała.`,
  },
  {
    id: "lascaris",
    name: "Sale wojenne Lascaris",
    area: "Valletta",
    island: "malta",
    lat: 35.894884,
    lng: 14.512782,
    radius: 32,
    speech: `Jesteś przy wejściu do podziemnych sal wojennych Lascaris, wykutych w skale pod bastionem. W drugiej wojnie światowej pracowali tu alianccy sztabowcy. Stąd koordynowano działania na Morzu Śródziemnym, w tym przygotowania do lądowania na Sycylii w tysiąc dziewięćset czterdziestym trzecim.

W środku zostały mapy, telefony i niskie korytarze. To nie jest szeroki muzealny pałac, tylko bunkier. Wejście jest płatne i bywa ograniczone liczbą osób. Jak wolisz tylko widok, wróć kilka kroków do ogrodów nad tobą.`,
  },
  {
    id: "lower-barrakka",
    name: "Dolne Barakki i dzwon oblężenia",
    area: "Valletta",
    island: "malta",
    lat: 35.897684,
    lng: 14.518014,
    radius: 70,
    speech: `Jesteś przy Dolnych Barakkach, mniejszym tarasie nad wejściem do portu. W ogrodzie stoi pomnik sir Alexandra Balla, brytyjskiego komisarza z czasów wojen napoleońskich. Za murem widać falochron i latarnię.

Obok jest ogromny dzwon z tysiąc dziewięćset dziewięćdziesiątego drugiego roku. Odsłoniła go królowa Elżbieta druga, w pięćdziesiątą rocznicę Krzyża Jerzego, którym odznaczono całą Maltę za obronę w drugiej wojnie. Dzwon bije codziennie w południe. Pod nim leży postać nieznanego żołnierza. Nie stawaj tuż przy kielichu w samo południe, bo głos jest bardzo głośny.`,
  },
  {
    id: "st-elmo",
    name: "Fort Świętego Elma",
    area: "Valletta",
    island: "malta",
    lat: 35.901984,
    lng: 14.518806,
    radius: 100,
    speech: `Stoisz przy Forcie Świętego Elma, na czubku półwyspu. W wielkim oblężeniu tysiąc pięćset sześćdziesiątego piątego roku ten fort padł pierwszy. Obrońcy, rycerze i żołnierze, zginęli prawie co do jednego. Dopiero po wojnie wielki mistrz de la Valette zbudował za tym miejscem nowe miasto.

Dziś w forcie jest Narodowe Muzeum Wojny. Szukaj Krzyża Jerzego, odznaczenia przyznanego całej wyspie w tysiąc dziewięćset czterdziestym drugim, oraz opowieści o nalotach, które przez miesiące waliły w port za twoimi plecami. Z wałów widać otwarte morze i wejście do obu portów.`,
  },
  {
    id: "hastings",
    name: "Ogrody Hastings",
    area: "Valletta",
    island: "malta",
    lat: 35.898051,
    lng: 14.508076,
    radius: 65,
    speech: `Jesteś w ogrodach Hastings, na zachodnim murze Valletty. Po drugiej stronie wody leży port Marsamxett, wyspa Manoela i Slima. To drugi port miasta, spokojniejszy od Wielkiego Portu po wschodniej stronie.

Ogród nazwano od brytyjskiego gubernatora, markiza Hastings. Usiądź przy drzewach: to jeden z niewielu cieni w kamiennym mieście. Jeśli zejdziesz w dół murami, dojdziesz do przystani promów i do widoku, z którego Valletta wygląda jak statek.`,
  },
  {
    id: "waterfront",
    name: "Nabrzeże Valletty",
    area: "Valletta",
    island: "malta",
    lat: 35.890064,
    lng: 14.507997,
    radius: 140,
    speech: `Jesteś na nabrzeżu Valletty, przy magazynach z osiemnastego wieku. Kawalerowie trzymali tu towary przyjeżdżające do portu. Długie, równe fasady to dawne sklepy Pinto. Dziś są w nich kawiarnie, a przy kei cumują statki wycieczkowe.

Popatrz w górę na bastiony. Miasto siedzi nad tobą jak twierdza, bo dokładnie tym było. Winda przy Górnych Barakkach łączy to nabrzeże z tarasem. Wieczorem światło na wapieniu jest najładniejsze.`,
  },
  {
    id: "birgu-square",
    name: "Plac Zwycięstwa w Birgu",
    area: "Trzy Miasta",
    island: "malta",
    lat: 35.888037,
    lng: 14.521939,
    radius: 55,
    speech: `Jesteś w Birgu, zwanym też Vittoriosa, Mieście Zwycięskim. Zanim powstała Valletta, to tutaj, od tysiąc pięćset trzydziestego roku, mieszkali kawalerowie maltańscy po utracie Rodos. W oblężeniu tysiąc pięćset sześćdziesiątego piątego bronili się właśnie w tym miasteczku i w forcie na cyplu.

Plac jest cichy, z kościołem świętego Wawrzyńca, w którym modlili się rycerze. Powyżej zaczyna się Collachio, dawna dzielnica zakonników, labirynt zaułków. Zejdź potem ku wodzie: stamtąd Valletta wygląda jak scena.`,
  },
  {
    id: "maritime",
    name: "Muzeum Morskie",
    area: "Trzy Miasta",
    island: "malta",
    lat: 35.88777,
    lng: 14.520784,
    radius: 42,
    speech: `Stoisz przy Muzeum Morskim w Birgu, w dawnej piekarni brytyjskiej marynarki. Malta przez stulecia żyła z portu: najpierw galery zakonu, potem statki Royal Navy, dziś promy i wycieczkowce.

W środku są modele okrętów, rzeczy z czasów kawalerów i opowieść o dokach, które w drugiej wojnie były jednym z najczęściej bombardowanych miejsc na wyspie. Jak wolisz tylko widok, wyjdź na nabrzeże Dockyard Creek. Po drugiej stronie wody jest Senglea.`,
  },
  {
    id: "inquisitor",
    name: "Pałac Inkwizytora",
    area: "Trzy Miasta",
    island: "malta",
    lat: 35.887192,
    lng: 14.522479,
    radius: 48,
    speech: `Jesteś przy Pałacu Inkwizytora w Birgu. Od tysiąc pięćset siedemdziesiątego czwartego roku urzędował tu inkwizytor przysyłany z Rzymu. To jeden z nielicznych takich pałaców, które w Europie zostały w całości.

Można przejść sale sądowe, prywatne pokoje i cele. Nie jest to krwawa komnata z legendy: inkwizycja na Malcie pilnowała głównie wiary marynarzy, kupców i samych rycerzy. Wstęp jest płatny. Po wizycie zejdź w stronę plaży i fortu na końcu półwyspu.`,
  },
  {
    id: "st-angelo",
    name: "Fort Świętego Anioła",
    area: "Trzy Miasta",
    island: "malta",
    lat: 35.891813,
    lng: 14.518423,
    radius: 95,
    speech: `Stoisz przy Forcie Świętego Anioła, na czubku Birgu. W wielkim oblężeniu był kwaterą zakonu. Stąd wielki mistrz patrzył, jak pada Fort Świętego Elma po drugiej stronie wody. Fortu Anioła Turcy nie zdobyli.

Później przejęła go brytyjska marynarka. Dziś po renowacji można wejść na wały. Widok wraca na Vallettę, na port i na miejsce, w którym ważyły się losy wyspy. Zostań do chwili, aż zrozumiesz układ trzech miast: Birgu, Senglea i Cospicua otaczają tę samą wodę.`,
  },
  {
    id: "gardjola",
    name: "Wieżyczka Gardjola",
    area: "Trzy Miasta",
    island: "malta",
    lat: 35.890474,
    lng: 14.514163,
    radius: 55,
    speech: `Jesteś w Senglei, przy wieżyczce Gardjola. To posterunek straży na dziobie miasta. W kamieniu wyryto oko i ucho: strażnik ma widzieć i słyszeć wroga, zanim tamten wejdzie do portu.

Widok jest z tych, dla których ludzie przeprawiają się łódką. Valletta na wprost, Fort Świętego Anioła po prawej, woda w dole. Senglea w drugiej wojnie została mocno zniszczona, więc domy są młodsze niż punkt widokowy. Usiądź na murze, nie spiesz się.`,
  },
  {
    id: "mdina-gate",
    name: "Brama Mdiny",
    area: "Mdina i Rabat",
    island: "malta",
    lat: 35.884811,
    lng: 14.403517,
    radius: 50,
    speech: `Stoisz przed bramą Mdiny. Nazwa pochodzi z arabskiego i znaczy miasto. Mówi się Imdina. To dawna stolica Malty, zanim kawalerowie przenieśli się w tysiąc pięćset trzydziestym roku nad port. Dziś nazywają ją cichym miastem, bo za bramą prawie nie ma samochodów.

Brama, którą widzisz, jest barokowa, z osiemnastego wieku, dzieło wielkiego mistrza de Vilhena. Po lewej, już poza murami, stoi rzymski dom z mozaikami. Wejdź do środka powoli: ulice są krótkie, a całe miasto da się przejść w kwadrans.`,
  },
  {
    id: "domus",
    name: "Dom Rzymski",
    area: "Mdina i Rabat",
    island: "malta",
    lat: 35.885243,
    lng: 14.400346,
    radius: 50,
    speech: `Jesteś przy Domus Romana, rzymskim domu tuż za murami Mdiny. W czasach rzymskich miasto nazywało się Melite. Ten dom stał przy nim w pierwszym wieku przed naszą erą i w pierwszym wieku naszej ery.

Najbardziej znana jest mozaika z motywem, który często trafia na okładki: geometryczny dywan i ptaki. To nie jest wielka willa z Pompei, tylko zwarty muzealny pawilon. Dobrze łączy się ze spacerem po Mdinie, bo pokazuje, że cisza za bramą stoi na dużo starszym mieście.`,
  },
  {
    id: "mdina-cathedral",
    name: "Katedra św. Pawła w Mdinie",
    area: "Mdina i Rabat",
    island: "malta",
    lat: 35.886393,
    lng: 14.404119,
    radius: 50,
    speech: `Stoisz przy katedrze świętego Pawła w Mdinie. Według tradycji powstała w miejscu, gdzie święty Paweł spotkał rzymskiego namiestnika Publiusza, po rozbiciu statku u brzegów wyspy. Trzęsienie ziemi w tysiąc sześćset dziewięćdziesiątym trzecim roku zniszczyło wcześniejszy kościół. Obecny zbudował maltański architekt Lorenzo Gafa.

Wnętrze jest jasne i barokowe, z posadzką z marmurowych grobów, podobnie jak w Valletcie. Kopuła widać już z daleka, zanim wejdziesz do miasta. Zakryj ramiona i kolana. Z placu przed katedrą idź na mury: widok na całą wyspę jest tuż obok.`,
  },
  {
    id: "mdina-bastion",
    name: "Mury Mdiny",
    area: "Mdina i Rabat",
    island: "malta",
    lat: 35.887161,
    lng: 14.403045,
    radius: 55,
    speech: `Jesteś na murach Mdiny. Przed tobą wyspa opada ku północy: pola, kopuła Mosty, a przy dobrej pogodzie morze. Przez stulecia stąd patrzono, czy od strony wybrzeża nie idzie flota.

Mdina została stolicą śródlądową właśnie dlatego, że z morza trudniej było ją wziąć z zaskoczenia. Arabowie, Normanowie i później szlachta maltańska dobudowywali te same skały. Zostań, aż minie grupa wycieczek. W ciszy słychać, czemu to miasto tak nazywają.`,
  },
  {
    id: "grotto",
    name: "Grota św. Pawła",
    area: "Mdina i Rabat",
    island: "malta",
    lat: 35.881646,
    lng: 14.398913,
    radius: 48,
    speech: `Jesteś w Rabacie, przy grocie świętego Pawła. Rabat znaczy przedmieście i leży pod murami Mdiny. Według tradycji Paweł, po katastrofie statku około sześćdziesiątego roku, spędził tu część trzech miesięcy na wyspie. Grota jest pod kościołem.

Obok działa muzeum Wignacourta, z obrazami i z pamiątkami kultu. Nie myl tego miejsca z zatoką świętego Pawła na północy: tam tradycja umieszcza sam wrak, tutaj pobyt. Wejście do groty bywa osobno biletem. W środku jest chłodno i nisko.`,
  },
  {
    id: "catacombs",
    name: "Katakumby św. Pawła",
    area: "Mdina i Rabat",
    island: "malta",
    lat: 35.88136,
    lng: 14.397419,
    radius: 58,
    speech: `Stoisz przy katakumbach świętego Pawła w Rabacie. To podziemny cmentarz z późnego antyku, używany przez chrześcijan i żydów, wykuty w miękkim wapieniu. Nie są wielkie jak rzymskie, ale widać w nich stoły do wspólnych styp, czyli agape.

Obok są też katakumby świętej Agaty. Weź latarkę w telefonie tylko jeśli przewodnik pozwoli, i patrz na zagłębienia na lampki oliwne. Na powierzchni Rabat żyje zwyczajnie: piekarnie, domy, autobus. Pod spodem jest starsze miasto umarłych.`,
  },
  {
    id: "mosta",
    name: "Rotunda w Moście",
    area: "Centrum",
    island: "malta",
    lat: 35.909263,
    lng: 14.426343,
    radius: 70,
    speech: `Jesteś przy rotundzie w Moście, kościele Wniebowzięcia. Budowano go od tysiąc osiemset trzydziestego trzeciego roku, wzorując się na rzymskim Panteonie. W środku kopuła ma prawie czterdzieści metrów średnicy. Często wymienia się ją wśród największych kopuł bez podpór.

Dziewiątego kwietnia tysiąc dziewięćset czterdziestego drugiego, w czasie mszy, przez kopułę wpadła bomba i nie wybuchła. Nikt nie zginął. Replika tej bomby jest w zakrystii. Poproś, żeby ci ją pokazano. Ramiona i kolana zakryj, zanim wejdziesz.`,
  },
  {
    id: "san-anton",
    name: "Ogrody San Anton",
    area: "Centrum",
    island: "malta",
    lat: 35.896107,
    lng: 14.448178,
    radius: 120,
    speech: `Jesteś w ogrodach San Anton w Attard, przy pałacu, który jest oficjalną rezydencją prezydenta. Same ogrody są publiczne i darmowe. Założył je w siedemnastym wieku wielki mistrz Antoine de Paule.

To geometryczne aleje, stawy i gęsty cień, rzadkość na wyspie, która poza tym jest skałą i słońcem. Dobry przystanek w upał, między Mdiną a Vallettą. Pałac ogląda się z zewnątrz, chyba że akurat jest dzień otwarty.`,
  },
  {
    id: "tarxien",
    name: "Świątynie Tarxien",
    area: "Prehistoria",
    island: "malta",
    lat: 35.869303,
    lng: 14.512211,
    radius: 75,
    speech: `Stoisz przy świątyniach w Tarszien, czytaj: Tarszien. Powstały mniej więcej między trzy tysiące sześćsetnym a dwa tysiące pięćsetnym rokiem przed naszą erą. Odkrył je w tysiąc dziewięćset czternastym roku Temi Zammit, maltański archeolog, którego nazwisko wraca przy każdym wykopalisku na wyspie.

Szukaj spiral wyrytych w kamieniu i reliefów zwierząt. To już schyłek epoki świątyń, bardziej ozdobny niż starsze budowle na Gozo. Nad częścią stoi dach, który chroni wapień. Wstęp płatny. Pięć minut stąd, w Pauli, jest hipogeum, ale tam bez wcześniejszej rezerwacji nie wejdziesz.`,
  },
  {
    id: "hypogeum",
    name: "Hipogeum Ħal Saflieni",
    area: "Prehistoria",
    island: "malta",
    lat: 35.869549,
    lng: 14.506892,
    radius: 45,
    speech: `Jesteś przy hipogeum Hal Saflieni w Pauli. To podziemna świątynia i grobowiec z około trzy tysiące trzysta lat przed naszą erą, wydrążony na trzech poziomach. Znaleziono tu szczątki tysięcy ludzi. Na powierzchni prawie nic nie widać: całe znaczenie jest pod ziemią.

Wejście tylko z rezerwacją, często na wiele tygodni wcześniej. Grupy są małe, bo oddech zwiedzających szkodzi malowidłom. Bilety na ostatnią chwilę bywają, dzień wcześniej, i są dużo droższe. Jeśli nie masz godziny wejścia, nie trać kolejki. Jedź do Tarszien albo do muzeum w Valletcie, gdzie leży Śpiąca Dama znaleziona właśnie tutaj.`,
  },
  {
    id: "hagar",
    name: "Świątynie Ħaġar Qim",
    area: "Prehistoria",
    island: "malta",
    lat: 35.827828,
    lng: 14.441789,
    radius: 150,
    speech: `Stoisz przy Hadżar Im, czytaj właśnie tak: Hadżar Im. Nazwa znaczy coś w rodzaju stojących kamieni. Świątynia ma około pięciu i pół tysiąca lat i stoi na klifie nad morzem. Jest starsza od piramid w Gizie.

Największe bloki ważą dziesiątki ton, a ludzie, którzy je ustawili, nie znali metalu. Nad ruinami jest namiot, który odcina słońce. Z tarasu widać wysepkę Filfla. Nie dopływa się do niej: to rezerwat. Ścieżka w dół, około dziesięciu minut, prowadzi do drugiej świątyni, Imnajdry. Zostań na obie.`,
  },
  {
    id: "mnajdra",
    name: "Świątynie Mnajdra",
    area: "Prehistoria",
    island: "malta",
    lat: 35.826739,
    lng: 14.436772,
    radius: 100,
    speech: `Jesteś przy Imnajdrze, niższej z dwóch świątyń na tym klifie. Stoi bliżej morza i jest cichsza niż Hadżar Im na górze. W dniu równonocy wschodzące słońce wchodzi w oś głównej świątyni i oświetla ołtarz.

Popatrz, jak wąskie są wejścia i jak grube ściany. Dachów już nie ma, ale łuk nad drzwiami, z wielkich płyt, został. W dole jest morze, a na horyzoncie Filfla. Wracając pod górę, odwróć się jeszcze raz: stąd najlepiej widać, że budowniczowie wybrali miejsce jak scenę.`,
  },
  {
    id: "tahagrat",
    name: "Świątynie Ta' Ħaġrat",
    area: "Prehistoria",
    island: "malta",
    lat: 35.918469,
    lng: 14.368587,
    radius: 65,
    speech: `Stoisz przy świątyni Ta Hadżrat, w miasteczku Imdżarr na północy Malty. Jest mniejsza i starsza w swojej najwcześniejszej fazie niż słynne budowle na południu. Leży między domami, więc łatwo ją wziąć za ogrodzony wykop.

Właśnie dlatego warto tu wejść. Nie ma tłumu z autokaru, a widać ten sam pomysł: półkoliste pomieszczenia, wielkie progi, korytarz w osi. Razem ze Skorbą, kilka minut dalej, pokazuje, jak tradycja świątyń zaczynała się na wsi, zanim powstały wielkie kompleksy.`,
  },
  {
    id: "skorba",
    name: "Świątynie Skorba",
    area: "Prehistoria",
    island: "malta",
    lat: 35.920959,
    lng: 14.377767,
    radius: 70,
    speech: `Jesteś przy Skorbie, obok Imdżarr. To jedno z najstarszych miejsc osadniczych na Malcie. Pod świątynią są ślady chat starszych o setki lat, z czasów, gdy ludzie dopiero osiedlali się na wyspie.

Ruiny są niskie i bez tłumu. Archeolodzy znaleźli tu fragmenty figurek i ceramiki, które pomogły ułożyć kalendarz całej prehistorii Malty. Jeśli byłeś już w Hadżar Im, potraktuj Skorbę jako przypis: tu widać początek, tam punkt szczytowy.`,
  },
  {
    id: "blue-grotto",
    name: "Błękitna Grota",
    area: "Południe",
    island: "malta",
    lat: 35.821273,
    lng: 14.456547,
    radius: 150,
    speech: `Jesteś przy Błękitnej Grocie, po maltańsku w miejscu zwanym Wied iż-Żurrieq. To nie jedna jaskinia, tylko rząd przepaścistych zatoczek. Łodzie wypływają z małego portu pod klifem.

Najładniej jest rano, kiedy słońce wpada do środka i woda robi się niebieska od światła odbitego od piasku. Po południu efekt gaśnie, a przy większej fali łodzie nie wychodzą. Z drogi na górze też widać łuk skalny. Bilet na łódź kupisz na miejscu, bez rezerwacji, chyba że jest sztorm.`,
  },
  {
    id: "marsaxlokk",
    name: "Marsaxlokk",
    area: "Południe",
    island: "malta",
    lat: 35.841589,
    lng: 14.544566,
    radius: 190,
    speech: `Jesteś w Marsa Szlokk, czytaj mniej więcej Marsa Szlok. To port rybacki na południu. Kolorowe łodzie luccu mają na dziobie namalowane oko. Miało chronić rybaków i łódź. Część łodzi wciąż rano wychodzi w morze.

Największy targ jest w niedzielę, ale ryby i stoły pod gołym niebem są też w inne dni. Kościół przy placu jest pod wezwaniem Matki Bożej z Pompejów. Zjedz rybę i nie oczekuj piaszczystej plaży: tu się patrzy na port, a pływa dalej, przy Delimarze.`,
  },
  {
    id: "ghar-dalam",
    name: "Jaskinia Għar Dalam",
    area: "Południe",
    island: "malta",
    lat: 35.836465,
    lng: 14.528073,
    radius: 70,
    speech: `Stoisz przy jaskini Ar Dalam, co znaczy jaskinia ciemności. W warstwach ziemi znaleziono kości karłowatych słoni i hipopotamów. Setki tysięcy lat temu Malta była połączona z Sycylią, a zwierzęta, odcięte na wyspie, z pokolenia na pokolenie malały.

Później jaskini używali też pierwsi ludzie. Muzeum przy wejściu tłumaczy warstwy, a sama jaskinia jest krótka i oświetlona. To najstarsza opowieść na tej wycieczce: zanim byli rycerze i zanim były świątynie, była tu menażeria z epoki lodowcowej.`,
  },
  {
    id: "stpeters",
    name: "St. Peter's Pool",
    area: "Południe",
    island: "malta",
    lat: 35.8334,
    lng: 14.5617,
    radius: 130,
    speech: `Jesteś przy Saint Peter's Pool, naturalnym basenie w skale na półwyspie Delimara. Nie ma piasku, parasoli ani ratownika. Wskakuje się z płaskich półek do głębokiej, przejrzystej wody.

Uważaj na śliskie kamienie i na to, że przy falowaniu od strony morza woda potrafi uderzyć. Nie ma cienia, więc weź buty do wody i coś na głowę. To jedno z najładniejszych miejsc do pływania na Malcie, właśnie dlatego, że nikt tu nic nie dobudował.`,
  },
  {
    id: "dingli",
    name: "Klify Dingli",
    area: "Południe",
    island: "malta",
    lat: 35.854832,
    lng: 14.377429,
    radius: 210,
    speech: `Stoisz na klifach Dingli, najwyższym brzegu Malty. Skała spada pionowo do morza, a na horyzoncie leży wysepka Filfla. Przez lata służyła jako cel ćwiczebny, dziś nie wolno na nią wchodzić ani przy niej cumować. Jest rezerwatem ptaków.

Zostań do zachodu, jeśli możesz. Wapień robi się różowy, a w dole widać tylko wodę. Wiatr bywa silny. Nie podchodź do samej krawędzi: skała jest krucha, a barierek jest mniej, niż podpowiada instynkt.`,
  },
  {
    id: "buskett",
    name: "Ogrody Buskett",
    area: "Południe",
    island: "malta",
    lat: 35.858824,
    lng: 14.397971,
    radius: 150,
    speech: `Jesteś w Buskett, najbliższym odpowiedniku lasu, jaki Malta ma. Wielcy mistrzowie posadzili tu drzewa jako teren łowiecki. W dolinie jest chłodniej niż na klifach obok.

Nad ogrodem stoi pałac Verdala, letnia rezydencja prezydenta, zwykle zamknięta dla zwiedzających. Sam park jest otwarty. Przyjedź tu po Dingli albo po koleinach w skale: to cień i ptaki między kamiennymi atrakcjami.`,
  },
  {
    id: "clapham",
    name: "Koleiny w skale",
    area: "Południe",
    island: "malta",
    lat: 35.85163,
    lng: 14.396846,
    radius: 80,
    speech: `Stoisz przy Misrah Ghar il-Kbir, miejscu, które Anglicy przezwali Clapham Junction, bo koleiny w skale wyglądają jak rozjazd kolejowy. Dwie równoległe bruzdy biegną przez wapień, krzyżują się i urywają na krawędzi.

Nikt nie ma pewności, do czego służyły. Mówi się o wozach, saniach albo o śladach po wyciąganiu kamienia. Część kolein przecinają późniejsze groby, więc wyżłobienia są od nich starsze. Nie ma muzeum ani biletu. Po prostu patrzysz na zagadkę i możesz iść dalej bez odpowiedzi.`,
  },
  {
    id: "sliema",
    name: "Promenada Sliemy",
    area: "Północ",
    island: "malta",
    lat: 35.908833,
    lng: 14.504282,
    radius: 130,
    speech: `Jesteś na promenadzie Slimy, czytaj: Slima, przy przystani promów. Po drugiej stronie wody stoi Valletta, najlepiej widziana właśnie stąd, z całego profilu murów.

Slima jest nowsza niż stolice rycerzy: kamienice, balkony i kąpieliska w skale. Ludzie opalają się na płaskich platformach i schodzą po drabinkach do morza. Prom do Valletty płynie kilka minut i ląduje pod murami. Wieczorem to spacer, nie muzeum.`,
  },
  {
    id: "spinola",
    name: "Zatoka Spinola",
    area: "Północ",
    island: "malta",
    lat: 35.918984,
    lng: 14.491998,
    radius: 110,
    speech: `Stoisz nad zatoką Spinola w Saint Julian's. To pocztówka północy: ciasna woda, łodzie, kościół na brzegu i wieżowce Portomaso z tyłu. Obok zaczyna się Paceville, dzielnica klubów, głośna dopiero po zmroku.

W dzień usiądź przy samej wodzie. W nocy, jeśli zostaniesz, trzymaj się zatoki, a nie tylko głównej ulicy z barami. Do Valletty jest stąd krótko autobusem albo promem ze Slimy.`,
  },
  {
    id: "st-pauls-bay",
    name: "Zatoka św. Pawła",
    area: "Północ",
    island: "malta",
    lat: 35.94794,
    lng: 14.397242,
    radius: 200,
    speech: `Jesteś w zatoce świętego Pawła. Dzieje Apostolskie opisują rozbicie statku, którym płynął Paweł, około sześćdziesiątego roku. Tradycja od wieków wskazuje właśnie tę zatokę, a nie grotę w Rabacie. Tam miał potem mieszkać. Tutaj miał wyjść na brzeg.

Na morzu widać wysepki, które też wiąże się z tą opowieścią. Samo miasto jest zwykłym kurortem: promenada, hotele, sól na skórze. Warto zestawić je w głowie z katedrą w Mdinie. To dwa końce tej samej legendy.`,
  },
  {
    id: "golden",
    name: "Golden Bay",
    area: "Północ",
    island: "malta",
    lat: 35.93374,
    lng: 14.344614,
    radius: 160,
    speech: `Jesteś na Golden Bay, jednej z niewielu szerokich piaszczystych plaż Malty. Piasek jest złoty, zatoka płytka przy brzegu i w sezonie pełna leżaków. To plaża rodzinna, z ratownikiem i barem, inna niż dzikie półki skalne na południu.

Jeśli tłum cię męczy, przejdź grzbietem do sąsiedniej zatoki Għajn Tuffieħa. Jest dziksza i piękniejsza, ale zejście po schodach bywa długie. Zostań tu, jeśli chcesz po prostu wejść do wody bez wyprawy.`,
  },
  {
    id: "tuffieha",
    name: "Għajn Tuffieħa",
    area: "Północ",
    island: "malta",
    lat: 35.929275,
    lng: 14.343752,
    radius: 150,
    speech: `Stoisz nad zatoką Ajn Tuffieha, sąsiadką Golden Bay. Nazwa znaczy jabłkowe źródło. Plaża jest węższa, otoczona gliniastym klifem, i zwykle cichsza, bo trzeba zejść po schodach.

Woda bywa czystsza, a piasek ciemniejszy. Po deszczu glina robi się śliska. Weź buty. To dobre miejsce na dłuższą kąpiel i na widok, którego nie zasłania rząd hoteli. Wracając, nie spiesz się pod górę: schody są strome.`,
  },
  {
    id: "mellieha-bay",
    name: "Zatoka Mellieħa",
    area: "Północ",
    island: "malta",
    lat: 35.97077,
    lng: 14.353641,
    radius: 200,
    speech: `Jesteś na plaży Ghadira, w zatoce Mellieha. To najdłuższa piaszczysta plaża na wyspie, łagodna i płytka. Za drogą leży rezerwat ptaków, słona laguna, którą widać z punktu widokowego przy szosie.

Latem jest tu głośno i drogo od leżaków. Poza sezonem zostaje sama zatoka, długa na kilometr. Miasteczko Mellieha siedzi na wzgórzu z sanktuarium, wysoko nad tobą. Na prom na Gozo jedzie się stąd jeszcze kilka minut, na północ, do Cirkewwy.`,
  },
  {
    id: "popeye",
    name: "Popeye Village",
    area: "Północ",
    island: "malta",
    lat: 35.960837,
    lng: 14.340684,
    radius: 110,
    speech: `Jesteś w zatoce Anchor, przy Popeye Village. W tysiąc dziewięćset osiemdziesiątym roku Robert Altman kręcił tu film o Popeye'u, z Robinem Williamsem. Drewnianą wioskę zbudowano jako dekorację i po prostu jej nie rozebrano.

To nie jest zabytek, tylko filmowy plac zabaw z ładną zatoką w dole. Wejdź, jeśli masz dzieci albo chcesz zobaczyć, jak hollywoodzki plan zestarzał się na maltańskim klifie. Jak wolisz prawdziwą historię, Czerwona Wieża i prom na Gozo są kilkanaście minut stąd.`,
  },
  {
    id: "red-tower",
    name: "Czerwona Wieża",
    area: "Północ",
    island: "malta",
    lat: 35.974675,
    lng: 14.342853,
    radius: 75,
    speech: `Stoisz przy Czerwonej Wieży, czyli wieży świętej Agaty. Zbudowano ją w tysiąc sześćset czterdziestym dziewiątym roku, w ciągu wież, którymi kawalerowie maltańscy ostrzegali się przed piratami. Ognisko na dachu było widoczne z następnej wieży.

Odnowiło ją stowarzyszenie Din l-Art Helwa, które na Malcie opiekuje się takimi budowlami. Z góry widać Comino, Gozo i kanał, którym za chwilę popłynie prom. W środku są proste sale i dach. To najlepszy punkt, żeby zrozumieć, jak mała jest odległość między wyspami.`,
  },
  {
    id: "cirkewwa",
    name: "Prom w Ċirkewwa",
    area: "Północ",
    island: "malta",
    lat: 35.988529,
    lng: 14.328854,
    radius: 150,
    speech: `Jesteś w Cirkewwie, na północnym końcu Malty. Stąd odpływa prom na Gozo. Przeprawa trwa około dwudziestu pięciu minut. Piesi wchodzą osobno, samochody stoją w kolejce, która w sezonie bywa długa. Bilet na osobę jest tani, na auto już nie.

W sezonie z tego samego portu wypływają też łodzie na Comino i do Błękitnej Laguny. Jeśli jedziesz na Gozo, stań na pokładzie: po lewej zostanie Comino, a przed tobą pojawi się kopuła Szewkii i port Imdżarr. Wracając, ostatni promy chodzą do późna, ale sprawdź godzinę, zanim zostaniesz na kolacji.`,
  },
  {
    id: "mgarr",
    name: "Port Mġarr",
    area: "Gozo",
    island: "gozo",
    lat: 36.024388,
    lng: 14.298158,
    radius: 160,
    speech: `Witasz się z Gozo, po maltańsku Gaudesz. Jesteś w porcie Imdżarr. Na wzgórzu nad tobą stoi kościół Matki Bożej z Lourdes, z długimi schodami, a wyżej fort Chambray, zaczęty przez kawalerów i nigdy nie dokończony jako wielka twierdza.

Prom, którym przypłynąłeś, to główna nić między wyspami. Autobusy do Victorii, do Szlendi i na plaże odjeżdżają sprzed terminalu. Jeśli masz siłę na jeden spacer zaraz po zejściu na ląd, wejdź pod kościół: stamtąd widać, jak blisko została Malta.`,
  },
  {
    id: "xewkija",
    name: "Rotunda w Xewkiji",
    area: "Gozo",
    island: "gozo",
    lat: 36.031569,
    lng: 14.260995,
    radius: 75,
    speech: `Stoisz przy rotundzie świętego Jana Chrzciciela w Szewkii, czytaj: Szewkija. Kopułę widać już z promu. Kościół zbudowano w dwudziestym wieku, w większości ze składek mieszkańców, na miejscu starszej, dużo mniejszej świątyni.

Wnętrze jest ogromne jak na wieś. Porównaj je w głowie z rotundą w Moście na Malcie: tamta jest starsza, ta jest dumą jednej parafii. Jeśli jedziesz dalej do Victorii, to jest po drodze. Zakryj ramiona, jeżeli wchodzisz.`,
  },
  {
    id: "citadel",
    name: "Cytadela w Victorii",
    area: "Gozo",
    island: "gozo",
    lat: 36.04632,
    lng: 14.239611,
    radius: 95,
    speech: `Jesteś w cytadeli Victorii, stolicy Gozo. Mury są starsze niż kawalerowie, ale po najeździe w tysiąc pięćset pięćdziesiątym pierwszym roku, kiedy w niewolę poszła prawie cała ludność wyspy, zakon przebudował twierdzę. Miała być ostatnim schronieniem.

W środku stoi katedra Wniebowzięcia. Kopuły nigdy nie dobudowano, więc na płaskim suficie wymalowano jej złudzenie. Stań na środku nawy i popatrz w górę: perspektywa oszukuje, dopóki nie podejdziesz z boku. Z wałów widać prawie całe Gozo, płaskie i usiane kopułami.`,
  },
  {
    id: "ggantija",
    name: "Świątynie Ġgantija",
    area: "Gozo",
    island: "gozo",
    lat: 36.047227,
    lng: 14.269063,
    radius: 85,
    speech: `Stoisz przy Dżgandii, czytaj: Dżgandija. Nazwa pochodzi od maltańskiego słowa na olbrzyma. Legenda mówi, że świątynię postawiła olbrzymka. Kamienie mają po kilka metrów, a budowla pochodzi z około trzy tysiące sześćsetnego roku przed naszą erą. Jest starsza od piramid i od Stonehenge.

Są tu dwie świątynie obok siebie, otoczone wspólnym murem. Wejścia są niskie, pomieszczenia półkoliste, a na progach widać wytarcia po tysiącach stóp. Dach ochronny psuje trochę sylwetkę, ale bez niego wapień by zniknął. Wstęp płatny. To najważniejsze prehistoryczne miejsce na Gozo.`,
  },
  {
    id: "ramla",
    name: "Ramla Bay",
    area: "Gozo",
    island: "gozo",
    lat: 36.062404,
    lng: 14.285119,
    radius: 180,
    speech: `Jesteś na Ramli, plaży o czerwonym piasku. Na Malcie i Gozo prawie nie ma drugiej takiej barwy: piasek jest rdzawy, a woda przy brzegu turkusowa. Latem bywa tłoczno, poza sezonem zostajesz sam z klifem.

Pod piaskiem leżą rzymskie pozostałości, czasem odsłaniane po sztormie. Nie kop ich. Nad plażą, na klifie, jest punkt widokowy groty Kalipso. Sama grota jest zamknięta. Jeśli masz siłę, wejdź tam dla widoku w dół, na ten czerwony łuk zatoki.`,
  },
  {
    id: "calypso",
    name: "Grota Kalipso",
    area: "Gozo",
    island: "gozo",
    lat: 36.060674,
    lng: 14.279494,
    radius: 85,
    speech: `Jesteś przy grocie Kalipso, nad czerwoną plażą Ramla. W Odysei nimfa Kalipso trzymała Odyseusza przez siedem lat. Tradycja, dość swobodna, wskazała tę dziurę w klifie.

Do samej groty się nie wchodzi. Wejście jest zamknięte, bo skała się rusza. Zostaje platforma i widok: rdzawa plaża, morze i, przy dobrej pogodzie, sylwetka Malty. To wystarczy. Zejdź potem na piasek, jeśli jeszcze tam nie byłeś. Widok z góry i z dołu to dwie różne plaże.`,
  },
  {
    id: "xlendi",
    name: "Xlendi",
    area: "Gozo",
    island: "gozo",
    lat: 36.031198,
    lng: 14.218266,
    radius: 140,
    speech: `Jesteś w Szlendi, czytaj: Szlendi. To zatoka jak fiord: wąska, głęboka, wciśnięta między klify. Na cyplu stoi wieża z tysiąc sześćset pięćdziesiątego roku, jeszcze jeden punkt alarmowy przeciwko piratom.

W wodzie da się pływać przy spokojnym morzu, przy skale i przy małej plaży w głębi. Wieczorem zapalają się restauracje wzdłuż kei. Nie jest to dzika plaża, tylko port, który został wsią. Jak chcesz ciszy, idź ścieżką na klif po lewej, w stronę otwartego morza.`,
  },
  {
    id: "inland",
    name: "Morze Wewnętrzne",
    area: "Gozo",
    island: "gozo",
    lat: 36.053735,
    lng: 14.191157,
    radius: 90,
    speech: `Stoisz nad Morzem Wewnętrznym w Dwejrze. To laguna po zawalonej jaskini, połączona z prawdziwym morzem krótkim tunelem w skale. Rybacy przepływają nim łódkami i za opłatą zabierają pasażerów na drugą stronę.

Warto popłynąć, jeśli jest miejsce i spokojna woda. Tunel jest niski, a po drugiej stronie zostaje klif i otwarte morze. Na brzegu laguny jest mała plaża. Kilka minut pieszo stąd jest miejsce, w którym do dwa tysiące siedemnastego roku stało Lazurowe Okno.`,
  },
  {
    id: "dwejra",
    name: "Dwejra i Lazurowe Okno",
    area: "Gozo",
    island: "gozo",
    lat: 36.053562,
    lng: 14.188258,
    radius: 110,
    speech: `Jesteś w Dwejrze, tam gdzie do ósmego marca dwa tysiące siedemnastego roku stało Lazurowe Okno, skalny łuk wychodzący w morze. Runął w sztormie. Został widok, słup soli i opowieść, której nie trzeba udawać, że łuk nadal stoi.

Na wodzie widać Fungus Rock, skałę, której kawalerowie pilnowali, bo rosła na niej rzadka roślina uważana za lekarstwo. Kradzież była karana. Dziś skała jest chroniona z innego powodu. Nie schodź na osypisko pod klifem. Morze Wewnętrzne jest tuż obok, za grzbietem.`,
  },
  {
    id: "mielah",
    name: "Okno Wied il-Mielaħ",
    area: "Gozo",
    island: "gozo",
    lat: 36.079673,
    lng: 14.212893,
    radius: 85,
    speech: `Stoisz przy oknie Wied il Miela, naturalnym łuku na północnym brzegu Gozo. Jest mniejsze i cichsze niż było Lazurowe Okno i właśnie dlatego ludzie tu przychodzą, odkąd tamto runęło.

Do łuku schodzi się ścieżką. Skała jest nierówna, a przy wietrze z północy fala wchodzi w otwór. Nie wchodź na sam łuk. Zostań na punkcie, z którego widać dziurę i morze w jednej ramie. Wracając, solanki w Szwejni są kilkanaście minut na wschód.`,
  },
  {
    id: "tapinu",
    name: "Bazylika Ta' Pinu",
    area: "Gozo",
    island: "gozo",
    lat: 36.061935,
    lng: 14.214882,
    radius: 80,
    speech: `Jesteś przy bazylice Ta Pinu, samotnej na polu między wsiami Għarb i Għasri. W tysiąc osiemset osiemdziesiątym trzecim roku kobieta imieniem Karmni Grima usłyszała tu, w małej kaplicy, głos. Na tym miejscu, między tysiąc dziewięćset dwudziestym a trzydziestym pierwszym rokiem, stanęła wielka świątynia.

W środku i na korytarzach wiszą wota: protezy, zdjęcia, podziękowania za ocalenie na morzu. Zostań cicho, nawet jeśli nie jesteś wierzący. To jest narodowe sanktuarium Gozo. Zakryj ramiona. Za kościołem pola dochodzą do klifu.`,
  },
  {
    id: "marsalforn",
    name: "Marsalforn",
    area: "Gozo",
    island: "gozo",
    lat: 36.071298,
    lng: 14.25957,
    radius: 150,
    speech: `Jesteś w Marsalforn, nadmorskim miasteczku północnego Gozo. Zatoka jest szeroka, z promenadą i z plażą w głębi. Latem to najbardziej ożywione miejsce na wyspie po Victorii. Poza sezonem zostają rybacy i puste stoliki.

Da się stąd iść brzegiem na zachód, ku solankom w Szwejni. To lepszy spacer niż kolejna plaża z leżakiem. Wieczorem światła łodzi odbijają się w zatoce. Jeśli mieszkasz na Gozo, Marsalforn jest naturalnym miejscem na kolację przy wodzie.`,
  },
  {
    id: "salt",
    name: "Solanki Xwejni",
    area: "Gozo",
    island: "gozo",
    lat: 36.079578,
    lng: 14.24663,
    radius: 140,
    speech: `Stoisz przy solankach Szwejni, między Marsalforn a północnym klifem. W skale wycięto szachownicę płytkich niecek. Morze wlewa się do nich zimą i przy sztormie, a latem słońce zostawia sól. Część niecek wciąż jest używana.

Nie wchodź na białą skorupę i nie bierz soli z cudzej niecki. Najładniej jest późnym popołudniem, gdy krawędzie rysują cień. To jeden z najbardziej graficznych widoków na Gozo: geometria na dzikim brzegu. Buty przydadzą się bardziej niż klapki.`,
  },
  {
    id: "tacenc",
    name: "Klify Ta' Ċenċ",
    area: "Gozo",
    island: "gozo",
    lat: 36.018052,
    lng: 14.252878,
    radius: 240,
    speech: `Jesteś przy klifach Ta Czencz, na południu Gozo, niedaleko Sannat. Ściana spada do morza prawie tak ostro jak Dingli na Malcie, tylko ludzi jest mniej. Na płaskowyżu są też prehistoryczne dolmeny, niskie kamienne stoły.

Ścieżka bywa nieoznakowana, a krawędź bez barierki. Trzymaj się utartych tropów i nie podchodź tam, gdzie trawa schodzi w przepaść. W ciszy słychać tylko wiatr i morze na dole. To dobre zakończenie dnia, jeśli rano byłeś w tłumie cytadeli.`,
  },
  {
    id: "qala",
    name: "Belweder w Qala",
    area: "Gozo",
    island: "gozo",
    lat: 36.030786,
    lng: 14.308746,
    radius: 90,
    speech: `Jesteś w miejscowości Ala, na wschodzie Gozo, przy belwederze. Stąd wyspa opada ku kanałowi. Przy dobrej pogodzie widać Comino i Maltę, czyli wszystkie trzy wyspy naraz, jeśli staniesz trochę wyżej, przy drodze na wschód od wsi.

Qala jest zwykłą miejscowością, nie skansenem, i właśnie dlatego dobrze tu widać, jak ludzie mieszkają na Gozo: kościół, pola, kamienne murki. Zostań na widok, a nie na długie zwiedzanie. Potem łatwo zjechać z powrotem do portu Imdżarr.`,
  },
  {
    id: "bluelagoon",
    name: "Błękitna Laguna",
    area: "Comino",
    island: "comino",
    lat: 36.014039,
    lng: 14.323376,
    radius: 160,
    speech: `Jesteś przy Błękitnej Lagunie, między Comino a wysepką Cominotto. Woda jest jasna, bo dno jest z piasku i białego wapienia. W południe latem przypływa tu naraz kilkadziesiąt łodzi i kolor znika pod kadłubami.

Przyjedź najwcześniej, jak da się wypłynąć, albo późnym popołudniem. Nie ma cienia. Weź buty do wody, bo jeżowce siedzą przy skałach poza plażą. Comino jest prawie bez mieszkańców. Jak łodzie odjadą, zostaje sama cieśnina. Wieża świętej Marii jest na drugim końcu wyspy, około dwudziestu minut piechotą.`,
  },
  {
    id: "comino-tower",
    name: "Wieża św. Marii",
    area: "Comino",
    island: "comino",
    lat: 36.006864,
    lng: 14.329764,
    radius: 80,
    speech: `Stoisz przy wieży świętej Marii na Comino, zbudowanej w tysiąc sześćset osiemnastym roku. Kawalerowie postawili ją, żeby piraci nie używali wyspy jako bazy między Maltą a Gozo. Z dachu widać obie strony kanału.

Comino ma dziś hotel, kaplicę i prawie nikogo na stałe. Ścieżki między laguną a wieżą są krótkie, ale w upale bez cienia. Weź wodę. Jeśli przypłynąłeś tylko na kąpiel, wieża i tak warto tych dwudziestu minut: pokazuje, po co ta wysepka w ogóle była komukolwiek potrzebna.`,
  },
];

export const PLACES = CORE.map((place) => {
  const extra = MORE_TEXT[place.id];
  return extra ? { ...place, speech: `${place.speech}\n\n${extra}` } : place;
}).concat(MORE_PLACES, MALTA_MORE, MALTA_CULTURE, MALTA_NATURE);

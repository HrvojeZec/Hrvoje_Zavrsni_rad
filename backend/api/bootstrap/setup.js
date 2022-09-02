const DocData = [
    {
        name: "doc.dr.sc. Suzana Ljubojević-Hadžavdić",
        job: "dermatovenerolog",
        city: "Zagreb",
        hospital: "Poliklinika GinoDerma",
        address: "Vlaška 91, Donji Grad",
        image: "https://najdoktor.com/storage/doctors/9585/48b9f-glava.jpg",
        text: "Doc. dr. sc. Suzana Ljubojević Hadžavdić rođena je 1971. godine u Zagrebu. Srednju je školu završila u SAD-u. Diplomirala je 1996. godine na Medicinskom fakultetu Sveučilišta u Zagrebu, a 2002. godine položila specijalistički ispit iz dermatologije i venerologije, te radi u Klinici za kožne i spolne bolesti. 2003. godine je magistrirala, a 2007. godine doktorirala. Od 2008. godine ima zvanje docenta, te predaje na Medicinskom fakultetu Sveučilišta u Zagrebu. U svom znanstvenom području, struci ili nastavi usavršavala se u međunarodno prepoznatim institucijama u Njemačkoj, Austriji, SAD-u i Australiji. Sudjelovala je u mnogim projektima, znanstvenim istraživanjima, te je autor brojnih znanstvenih članaka i poglavlja u medicinskim udžbenicima."
    },
    {
        name: "dr.med. Sanja Toljan",
        job: "anesteziolog",
        city: "Zagreb",
        hospital: "Poliklinika Orlando",
        address: "Ul. Vjekoslava Klaića 8, Donji Grad",
        image: "https://najdoktor.com/storage/doctors//8328/avatar_FwDP2-glava.jpg",
        text: "Rođena je 1964. u Vinkovcima, a 1988. diplomirala je na Medicinskom fakultetu Sveučilišta u Zagrebu. Za vrijeme specijalizacije iz anesteziologije, 6 mjeseci boravi na Yale New Haven Hospital, gdje stječe iskustvo rada u vrhunskoj zdravstvenoj ustanovi. Boravak u Americi ostavit će duboki trag na tada mladu specijalizanticu, koja će kasnije pokušati implementirati naučeno u svom svakodnevnom radu. "
    },
    {
        name: "dr.med.dent. Petra Gajski",
        job: "stomatolog",
        city: "Zagreb",
        hospital: "Stomatološka poliklinika Apolonija",
        address: "Varšavska ulica 10/I, Donji Grad",
        image: "https://www.apolonija.hr/wp-content/uploads/2020/12/Petra-Gajski1-dr-med-dent.jpg",
        text: "Doktorica Petra Gajski diplomirala je na Stomatološkom fakultetu u Zagrebu. Odmah nakon diplome pridružuje se timu Stomatološke poliklinike Apolonija. Tijekom studija se bavila brojnim fakultetskim i izvanfakultetskim aktivnostima, a sudjelovala je na Simpoziju studenata dentalne medicine u Zagrebu 2019. godine kao voditelj radionice „Estetski (polikromatski) kompozitni ispun na prednjim zubima uporabom tehnike silikonskog ključa“."
    },
    {
        name: "dr. Mateja Jelić",
        job: "stomatolog",
        city: "Zagreb",
        hospital: "Stomatološka Ordinacija Balenović",
        address: "Pavla Hatza 23, Donji Grad",
        image: "https://najdoktor.com/storage/doctors//16087/avatar_kIkQu-glava.jpg",
        text: "Dr Mateja Jelić, rođena je 1973. godine u Zagrebu. Nakon završene Jezične gimnazije upisuje Stomatološki fakultet. 2002. g stječe naziv magistra biomedicinskih znanosti. 2005.g polaže specijalistički ispit iz ortodoncije te stječe licencu specijalist ortodont. Od 2002. do danas je završila mnoštvo međunarodnih ortodontskih tečajeva u priznatim ortodontskim institucijama SAD-a i Europe. U svojoj praksi redovito postavlja sve tipove bravica koje uključuju samoligirajuće i estetske bravice (keramičke, safirne i druge estetske bravice)."
    },
    {
        name: "dr. med. spec. Ivana Hlevnjak",
        job: "dermatovenerolog",
        city: "Split",
        hospital: "Poliklinika Dermalis",
        address: "Poljička cesta 20b,  Splitsko-dalmatinska županija",
        image: "https://najdoktor.com/storage/doctors//18067/avatar_Y0N32-346674459-78498510-338375006.jpg",
        text: "Dr Mateja Jelić, rođena je 1973. godine u Zagrebu. Nakon završene Jezične gimnazije upisuje Stomatološki fakultet. 2002. g stječe naziv magistra biomedicinskih znanosti. 2005.g polaže specijalistički ispit iz ortodoncije te stječe licencu specijalist ortodont. Od 2002. do danas je završila mnoštvo međunarodnih ortodontskih tečajeva u priznatim ortodontskim institucijama SAD-a i Europe. U svojoj praksi redovito postavlja sve tipove bravica koje uključuju samoligirajuće i estetske bravice (keramičke, safirne i druge estetske bravice)."
    },
    {
        name: "dr.med. Snježana Belak",
        job: "ginekolog",
        city: "Zagreb",
        hospital: "Ginekološka ordinacija Snježana Belak",
        address: "Sokolgradska 5, Trešnjevka - jug",
        image: "https://najdoktor.com/storage/doctors//16900/avatar_LnaKS-glava.jpg",
        text: "Dr. Snježana Belak - specijalista ginekologije i porodiljstva, s 18 godina specijalističkog staža, završenim postdiplomskim studijem iz ginekološkog i trudničkog ultrazvuka te brojnim i stalnim tečajevima stručnog usavršavanja. Aktivno znanje engleskog i talijanskog jezika."
    },
    {
        name: "dr.sc. Johann Nemrava",
        job: "opći kirurg",
        city: "Zagreb",
        hospital: "Poliklinika-Bagatin",
        address: "Frana Folnegovića 1c/1, Donji Grad",
        image: "",
        text: 'Doktor Johann Nemrava završio je medicinski fakultet u Rijeci, a specijalizaciju iz opće kirurgije u Zagrebu u Kliničkim bolnicama "Merkur" i "Dubrava". Tijekom specijalističkog usavršavanja, završio je doktorski studiji na Prirodoslovno - matematičkom fakultetu i stekao naziv doktora znanosti u području bioloških znanosti. Nadalje, subspecijalizaciju iz plastične, rekonstruktivne i estetske kirurgije završio je u Kliničkim bolnicama "Sestre milosrdnice" i "Dubrava" '
    },
    {
        name: "dr.med. Ivan-Anđelko Lisec",
        job: "otorinolaringolog",
        city: "Split",
        hospital: "Otorinolaringološka ordinacija dr.Ivan Anđelko Lisec",
        address: "Ul. Jurja Dobrile 1, Splitsko-dalmatinska županija",
        image: "https://najdoktor.com/storage/doctors//14207/avatar_eBiOe-glava.jpg",
        text: "Nakon studija medicine na Medicinskom fakultetu u Zagrebu, dr. Lisec odlazi u Liechtenstein na jednogodišnji studij Internationale Akademie fuer Philosophie, nakon čega odlazi u Švicarsku kako bi specijalizirao otorinolaringologiju u bolnici Interlaken te kako bi učio od vrhunskih stručnjaka iz područja otorinolaringologije. "
    },
    {
        name: "dr. Jurica Krhen",
        job: "stomatolog ",
        city: "Zagreb",
        hospital: "Poliklinika-Krhen",
        address: "Masarykova 2, Donji Grad",
        image: "https://poliklinika-krhen.hr/wp-content/uploads/2013/05/jurica-krhen.jpg",
        text: "Jurica Krhen rođen je u Zagrebu. Osnovnu i srednju zubotehničku školu završava u Zagrebu. Godine 1983. diplomira na Stomatološkom fakultetu u Zagrebu, a 1987. godine brani magistarski rad iz područja dentalne protetike. Godine 1993. polaže specijalistički ispit iz oralne kirurgije, a 2008. godine brani doktorsku disertaciju iz područja oralne kirurgije"
    },
    {
        name: "doc.dr.sc. Damir Bosnar",
        job: "oftalmolog",
        city: "Zagreb",
        hospital: "Očna poliklinika Odraz",
        address: "Trg Dr. Franje Tuđmana 4 10290, Zaprešić, Zagrebačka županija",
        image: "https://najdoktor.com/storage/doctors//16225/avatar_JWZlv-glava.jpg",
        text: "Damir Bosnar je od 2003. godine zaposlen na Klinici za očne bolesti KB “Sveti Duh”, kao znanstveni novak, a od 2008. godine kao specijalist oftalmolog s užim područjem interesa iz područja liječenja bolesti stražnjeg segmenta oka i vitreoretinalne kirurgije koja mu je uz operaciju katarakte i kirurgiju prednjeg segmenta oka od primarnog interesa u svakodnevnom stručnom i znanstvenom radu."
    },
    {
        name: "dr.sc. Martina Šarec Ivelj",
        job: "opći kirurg",
        city: "Zagreb",
        hospital: "Poliklinkika-Bagatin",
        address: "Vukovarska 269a 10.kat, Trnje",
        image: "https://najdoktor.com/storage/doctors/20322/Ca80M-Web_1440x960px_Martina-%C5%A0arec-Ivelj.jpg",
        text: 'Doktorica Martina Šarec Ivelj završila je medicinski fakultet u Rijeci, dok je pripravnički staž odradila u Općoj bolnici "dr.Tomislav Bardek" u Koprivnici. Specijalističko i subspecijalističko usavršavanje iz opće i plastične kirurgije stekla je u Kliničkoj bolnici Dubrava.'
    },
    {
        name: "dr. Josip Prpić",
        job: "stomatolog",
        city: "Osijek",
        hospital: "PRIVATNA STOMATOLOŠKA ORDINACIJA JOSIP PRPIĆ",
        address: "Reisnerova 45, Osječko-baranjska županija",
        image: "https://najdoktor.com/storage/doctors//13852/avatar_KQDsT-img_josip-prpic-main.jpg",
        text: "Diplomirao je na Stomatološkom fakultetu u Zagrebu 2003. godine. Nakon odrađenog pripravničkog staža, pokreće privatnu praksu 2004. godine. Osim specijalizacije iz parodontologije redovito sudjeluje u domaćim i stranim stručnim seminarima i kongresima"
    },
    {
        name: "dr. Gorana Pavičić",
        job: "oftalmolog",
        city: "Zagreb",
        hospital: "Očna poliklinika “Okulistički centar”",
        address: "Drage Gervaisa 22, Stenjevec",
        image: "https://najdoktor.com/storage/doctors//10426/avatar_Af8Ry-glava.jpg",
        text: "dr. Gorana Pavičić, spec. oftalmolog s 30 godina specijalističkog iskustva i dr. Irena Škegro, spec. oftalmolog s 35 godina specijalističkog iskustva, od čega 15 godina u Kliničkoj bolnici “Sestre milosrdnice” u Zagrebu."
    },
    {
        name: "dr.med. Tihana Mazalin",
        job: "ginekolog",
        city: "Zagreb",
        hospital: "Poliklinika Mazalin",
        address: "Ivana Trnskog 17, Maksimir",
        image: "https://najdoktor.com/storage/doctors/16090/0phRw-Tihana%20Mazalin111.jpg",
        text: "Dr. Tihana Mazalin je privatan ginekolog s više od 30 godina iskustva i 7 Najdoktor certifikata za izvrsnost. Ravnateljica je Poliklinike Mazalin te je zadužena za ginekološke usluge poput papa testa, ginekološkog pregleda, cervikalnih briseva, 3D i 4D ultrazvuka i trudničkih usluga. Rođena je i odrasla u Zagrebu, a s očeve strane dalmatinskih je korijena. Vjerojatno zato godišnji odmor najradije provodi na predivnoj Hrvatskoj obali."
    },
    {
        name: "dr.med.dent. Neven Crepulja",
        job: "stomatolog",
        city: "Rijeka",
        hospital: "Dentico NC",
        address: "Trg maršala Tita 17, Općina Matulji, Primorsko-goranska županija",
        image: "https://najdoktor.com/storage/doctors//17512/avatar_iu6nA-download.jpg",
        text: "Nakon završene Medicinske škole u Rijeci- smjer zubni tehničar, upisuje Studij stomatologije pri Medicinskom fakultetu, koji završava u roku 2010. godine, te stječe zvanje doktora dentalne medicine."
    },
    {
        name: "dr.med.dent. Hrvoje Galić",
        job: "stomatolog",
        city: "Poreč",
        hospital: "Dentalna klinika IDENTA",
        address: "Ul. Kanižela 2 52446, Nova Vas, Istarska županija",
        image: "https://najdoktor.com/storage/doctors/20401/FBid6-93A9373A-437C-4A1C-BFF7-AD99D37AAB27.JPG",
        text: "Dr. Galić potječe iz obitelji liječnika gdje je uz majku stomatologinju i oca obiteljskog liječnika, od malih nogu upijao znanja iz područja zdravlja i medicine. Nastavio je tradiciju i upisao studij stomatologije kojeg završava 2007. godine u Rijeci"
    },
    {
        name: "dr. Ante Kovačić",
        job: "stomatolog",
        city: "Split",
        hospital: "Cirkonij Centar",
        address: "Poljička cesta 1a, Splitsko-dalmatinska županija",
        image: "https://najdoktor.com/storage/doctors//14614/avatar_nClJb-glava.jpg",
        text: "dr.Ante Kovačić je rođen 1978. godine u Splitu, diplomirao na Stomatološkom fakultetu Sveučilišta u Zagrebu 2002. god. sa najvišom ocjenom 4,6. Evidentiran je na listi uspješnosti u Ministarstvu znanosti i tehnologije te je uvršten među 10 najuspješnijih studenata koji su 2002. godine diplomirali na Stomatološkom fakultetu."
    },
    {
        name: "dr. Zlatko Kljajić",
        job: "otorinolaringolog",
        city: "Split",
        hospital: "Poliklinika - Bagatin",
        address: "Kranjčevićeva 45, 21000, Splitsko-dalmatinska županija",
        image: "https://najdoktor.com/storage/doctors/17260/p5jJU-Web_1440x960px_Zlatko-Kljaji%C4%87.jpg",
        text: "Dr.sc. Zlatko Kljajić, diplomirao je na Medicinskom fakultetu u Splitu 2007. godine. Nakon obavljenog jednogodišnjeg staža, radio je godinu dana u ordinaciji obiteljske medicine te na Floridi (SAD) kao brodski liječnik. Nakon polaganja specijalističkog ispita, nastavlja raditi u KBC Split na Klinici za bolesti uha, grla i nosa s kirurgijom glave na poziciji specijalista otorinolaringologije."
    },
    {
        name: "prof.dr.sc. Damir Eljuga",
        job: "ginekolog",
        city: "Zagreb",
        hospital: "Poliklinika Eljuga",
        address: "Bukovačka 121, Maksimir",
        image: "https://najdoktor.com/storage/doctors/9521/b6QMJ-19956748_1344886345546691_678852120567157832_o.jpg",
        text: "Završio je Medicinski fakultet Sveučilišta u Zagrebu 1976. godine. Akademsku titulu magistra biomedicinskih znanosti dobio je godine 1979. nakon obranjene magistarske teze, a 1985. obranio je doktorsku disertaciju i potom stječe akademsku titulu doktora medicinskih znanosti."
    },
    {
        name: "prim.dr. Lidija Pejković",
        job: "ginekolog",
        city: "Solin",
        hospital: "Ginekologija Lidija Pejković",
        address: "Kralja P. Krešimira IV. 34, , Splitsko-dalmatinska županija",
        image: "https://najdoktor.com/storage/doctors//14235/avatar_1ESQ5-glava.jpg",
        text: "Zovem se Lidija Pejković (rođ. Sesartić).Rođena sam 20.siječnja 1962.u Splitu. Srednju medicinsku školu u Splitu završila sam 1980. Medicinski fakultet Sveučilišta u Zagrebu završila sam 1985.sa prosječnom ocjenom 4.7 i stekla naziv doktora medicine."
    },
    {
        name: "dr. Darko Gusić",
        job: "ginekolog",
        city: "Rovinj",
        hospital: "Poliklinika Gusić",
        address: "Andrea Amoroso 2, 52210, Rovinj,  Istarska županija",
        image: "https://najdoktor.com/storage/doctors/12696/ErIcn-173272343_293506785719700_5068683780519384066_n.jpg",
        text: "RADIO JE U OB PULA, POLIKLINIKAMA SUNCE PULA I RIJEKA, DOM ZDRAVLJA PULA, KBC RIJEKA I OB GOSPIĆ.Redovito se stručno usavršava na svjetskim i europskim kongresima, te je član Europskog udruženja za prevenciju i liječenje karcinoma vrata maternice.Ujedno je i član Hrvatskog kolposkopskog društva.Ponosni je suprug, otac četvero djece te se u slobodno vrijeme bavi biciklizmom i slikarstvom."
    }
];

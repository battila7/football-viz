# Honnan lőjek?

## Megtekintés

A vizualizáció megtekintése a következő módokon lehetséges:

  * a http://honnanlojek.surge.sh/ oldalon, 
  * a http://battila7.github.io/honnan-lojek oldalon,
  * a `docs\index.html` állomány böngészőben történő megnyitásával.

## Adatfeldolgozás

A vizualizáció alapját a StatsBomb által a https://github.com/statsbomb/open-data repositoryban közzétett adatállományok képezik, azok közül is a meccseken történt eseményeket rögzítő, a `data\events` mappában található JSON dokumentumok.

Az állományok feldolgozását a `dataset\processor` mappában található `index.js` Node.js alkalmazás végzi. A feldolgozás a következő csővezetéket jelenti:

  1. Az összes, eseményeket tartalmazó állomány beolvasása.
  1. Az állományokban található események összeolvasztása egyetlen tömbbé.
  1. A `Shot` típusú elemek filterezése. Ez azt jelenti, hogy a lövéseken kívül minden mást eldobunk.
  1. A fennmaradó elemek transzformálása új rekordokká. Egy új rekord csak a lövés helyét (honnan lőttek?) fogja tartalmazni és azt, hogy a lövés gól lett-e vagy sem.
  1. A lövések alapján 2x2 yard méretű cellák előállítása. Minden cella tartalmazza, hogy hány lövést adtak le a területéről, valamint azt, hogy ezek közül hány lett gól.
  1. Azon cellák eldobása, ahonnan egy gól sem született.
  1. Minden cellához annak kiszámítása, hogy a lövések hány százaléka lett gól.
  1. A cellák adatainak mentése egy JSON dokumentumba: `dataset\final\dataset.json`.

Az így keletkező állomány már további számítási és feldolgozási lépések nélkül felhasználható a vizualizációhoz. 

## Megjelenítés

A tényleges vizualizációt a `web` mappában található állományok írják le.

### index.html

Az `index.html` egy héjat jelent, amiben elhelyezésre kerül majd a D3 által generált SVG kép. Az SVG-t a `visualization-container` osztályú elem fogja tartalmazni, míg az egyes cellákhoz kapcsolódó adatok a `goals`, `shots` és `percent` azonosítójú elemekben fognak megjelenni.

### main.js

A `main.js` a D3 SVG kirajzolásának belépési pontja. Ez egy `mainIIFE` nevű `immediately-invoked function expression`-t tartalmaz, mely előbb a Fetch API használatával letölti a feldolgozott adathalmazt tartalmazó JSON állományt, majd ezt követően meghívja a pálya és a cellák helyét jelző körök kirajzolásáért felelős `makePitch` függvényt.

### pitch.js

A `pitch.js` szkript tartalmazza a `makePitch` függvényt, mely a vizualizáció SVG részének kirajzolásáért felelős.

Az első lépés egy SVG elem létrehozása, mely a pályát fogja tartalmazni. Ezt követően ebben elhelyezésre kerül két filter: a körökre alapértelmezetten, valamint kijelöléskor alkalmazott elmosás. Ezt követi a pálya, majd a körök kirajzolása.

A pálya kirajzolását a `drawPitch` függvény végzi. Ez egyszerűen egy fél labdarúgó pályát fog kirajzolni.

Miután a pálya elkészült, a `drawData` kirajzolja az adathalmaz celláit reprezentáló köröket, valamint a jelmagyarázat köreit (melyek szintén SVG elemekben helyezkednek el). Az egyes körök eltérő kitöltéssel és sugárral rendelkeznek. 

Előbbi az eredményességtől függ, azaz az adott cellából leadott lövések minél nagyobb százaléka lett gól, annál pirosabb lesz a kör. Alacsony eredményesség esetén a kékhez fog közelíteni a kör kitöltőszíne. Itt tehát egy kék és egy megfelelő piros között interpolálunk az eredményesség szerint.

A kör sugarát a cellából lőtt gólok száma határozza meg. Minél több gólt lőttek egy cellából, annál nagyobb lesz az azt reprezentáló kör. Itt is egy interpoláció jelenik tehát meg, a minimális sugár `0,15`, a maximális pedig `0,75`. A büntetőből lőtt gólokat tartalmazó cella kivételt képez, hiszen ehhez képest az összes többi cellához tartozó kör nagyon kicsi lenne. Emiatt ehhez manuálisan az `1` sugarat rendeljük, és kivesszük az interpolációból, azaz a maximumértéket  a második legtöbb gólt tartalmazó cella fogja jelenteni.

Végül mindegyik körhöz beállítjuk a megfelelő eseménykezelőket:

  * ha az egeret a kör fölé visszük, akkor megjelennek az adott cella adatai,
  * ha az egérrel elhagyjuk a kört, akkor a kijelzett adatok eltűnnek.

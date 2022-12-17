# Treść zadania

Firma Potato, pod kierownictwem Jeve’a Stobsa wkrótce przedstawi super innowacyjny czat wykorzystujący GPT-3. Niemniej jednak, jak na każdej prezentacji, software nie jest jeszcze wystarczająco gotowy do działania. Trzeba zatem napisać demo, które idealnie odwzoruje funkcjonalność tego czatu na potrzeby prezentacji.

Twoim zadaniem jest uratowanie prezentacji Jeve’a poprzez napisanie frontendu aplikacji do czatu „symulującej” sztuczną inteligencję. Firma przygotowała listę kilku tysięcy wiadomości i odpowiedzi. Na każdą z wiadomości „sztuczna inteligencja” powinna odpowiedzieć zgodnie z przygotowaną listą. W przypadku otrzymania wiadomości spoza listy powinna odpowiedzieć „More information in Potato Chat Premium!”.

# Wymagania funkcjonalne
Twoja aplikacja powinna działać w następujący sposób:

1. Istnieje jeden pokój czatu, do którego można dołączyć bez żadnej autoryzacji. Jego URL jest znany osobie wchodzącej.
2. Osoby powinny widzieć wiadomości w całym pokoju oraz odpowiedzi od Potato Chatu
3. Osoby nie będą się identyfikować, każdy dołącza jako anonimowy użytkownik. Sztuczna inteligencja identyfikuje się jako Potato Chat.
4. Użytkownik anonimowy wyświetlany jest jako Anonymous, a Potato Chat jako Potato Chat.
5. Serwer przechowuje historię czatu, ale nie pomiędzy uruchomieniami (działa w pamięci).
6. Czat powinien działać w trybie Real Time, czyli odbierać od serwera informacje o przychodzących wiadomościach i prezentować je.
7. Czat powinien odpowiadać niezależnie od wielkości wpisanych liter i spacji w pytaniu.

##### Przykład
Jeśli pytanie istnieje w zbiorze, to czat powinien odpowiedzieć na poniższe pytania w taki sam sposób:
<pre>Pytanie         pierwsze    -   DaJ mI OdPoWiedŹ</pre>
<pre>Pytanie pierwsze - daj mi odpowiedź</pre>
    
8. Wysłanie wiadomości powinno odbyć się z pomocą klawisza Enter. Nie musisz martwić się o wielolinijkowość. Sztuczna inteligencja rozumie tylko jedną linijkę.
9. Wiadomość powinna zawierać:
   - Autora
   - Datę i godzinę wysłania (wyświetlane wg strefy czasowej użytkownika, czyli jeśli ktoś wysyła do mnie wiadomość w czasie amerykańskim, a ja ją otrzymuje w Polsce, to datę wysyłki chcę widzieć w czasie lokalnym w Polsce)
   - Treść
10. Dane z pytaniami, na które ma odpowiadać Potato Chat, znajdują się pod endpointem "GET /answers"

*****

# Kontrakt API
1. Opis REST API znajduje się pod linkiem `http://localhost:5112/api` w formie Swaggera
2. Real Time chat powinien być zrealizowany w następujący sposób:
- Połączenie z serwerem powinno odbyć się za pomocą WebSocketa pod adresem `ws://localhost:5112/`. Użyj do tego biblioteki socket.io-client lub innej, którą znasz.
- Po wykonaniu endpointu POST na `/messages` serwer powinien wysłać wiadomość do wszystkich klientów w formacie:
  - `type` - typ wiadomości `QUESTION` lub `ANSWER`
  - `id` - identyfikator wiadomości
- Po otrzymaniu takiej informacji powinieneś pobrać wiadomość z endpointu GET `/messages/{id}` i wyświetlić ją w czacie.
3. Czat przyjmuje pytania pisane małymi literami z pojedynczymi spacjami i znakiem zapytania na końcu. Upewnij się, że właściwie formatujesz pytanie.

# Wskazówki
1. **NIE MUSISZ** pisać testów do tego zadania.
2. Możesz korzystać z dowolnych bibliotek.
3. Reset repozytorium do stanu początkowego - `git clean -fdx && git reset --hard`
4. Aplikacja nie musi być przygotowana do uruchomienia w skompilowanej formie. Wystarczy, że będzie działać w środowisku developerskim.


# Oddawanie zadania
1. Stwórz gałąź (branch) o nazwie `imie-nazwisko`, która będzie wychodziła od brancha `master`.
2. Odeślij repozytorium na maila `rekrutacja@infrabyte.pl` z tytułem `Potato Chat - imie-nazwisko`.
3. Prosimy o niepublikowanie zadania na serwery Gita (Github, Bitbucket itp.) - nie chcemy, żeby kod rozwiązań stał się publiczny :)

# Uruchomienie aplikacji
## 0. Stack narzędziowy konieczny do uruchomienia
- node 16 (https://nodejs.org/en/download/) - sprawdzono działanie na 16.17.0
- npm 8.19 (https://www.npmjs.com/get-npm) - sprawdzono działanie na 8.19.2
- git (https://git-scm.com/downloads)

## 1. Potato Chat Client
1. `cd potato-chat-client`
2. `npm install`
3. `npm start`
4. Aplikacja powinna być dostępna pod adresem `http://localhost:3000`
5. Aplikacja spodziewa się serwera pod adresem znajdującym się w pliku `src/config.ts` (domyślnie `http://localhost:5112`)
## 2. Potato Chat Server
1. `cd potato-chat-server`
2. `npm install`
3. `npm start`
4. Aplikacja powinna być dostępna pod adresem `http://localhost:5112`. Swagger jest dostępny pod adresem `http://localhost:5112/api`

Po uruchomieniu aplikacji powinieneś ujrzeć stronę startową (obrazek znajduje się w readme-utils):

![Strona startowa](./readme-utils/img.png, "Strona startowa")
# FAQ:
#### Client uruchomił się na innym porcie.
 - To nic, możesz śmiało go obsługiwać na innym porcie. Konfiguracja CORS pozwala na dostęp z dowolnego adresu.
#### Serwer uruchomił się na innym porcie.
 - Wpływa to na widoczność tego portu dla klienta. W przypadku gdy serwer uruchomił się na innym porcie niż 5112, należy zmienić port w pliku `potato-chat-client/src/config.ts` w zmiennej `SERVER_URL`.
#### Nie mogę zainstalować pakietów.
 - Jeśli posiadasz zestaw narzędzi wylistowany w punkcie 0 i problem występuje, niezwłocznie się z nami skontaktuj, wysyłając zrzuty ekranów z wersjami zainstalowanych narzędzi.
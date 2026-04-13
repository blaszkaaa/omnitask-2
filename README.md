# OmniTask Website

## Jak podpiąć bazę danych PostgreSQL

Aby w pełni połączyć projekt z lokalnym (lub chmurowym) serwerem PostgreSQL i odblokować działanie formularzy, bloga oraz opinii:

1. W głównym katalogu projektu zlokalizuj (lub utwórz) plik o nazwie `.env`.
2. Otwórz plik tekstowy i wklej swój link do bazy danych, podstawiając odpowiednie dane w poniższym formacie:
   `DATABASE_URL="postgresql://uzytkownik:twoje_haslo@localhost:5432/nazwa_bazy?schema=public"`
3. Otwórz terminal w katalogu projektu i wykonaj komendę odświeżającą strukturę dla silnika Prisma:
   `npx prisma db push`
4. Na koniec, dla pewności, dopisz hasło i login podstawowy do tworzenia panelu administracyjnego:
   `ADMIN_USER=twoj_login`
   `ADMIN_PASS=TwojeTajneHaslo!`

Gotowe. Aplikacja natychmiast rozpozna aktywną bazę i wyłączy tryb "pustej strony".

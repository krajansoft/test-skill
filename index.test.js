const { przywitaj, pozegnaj, przeliczWiek } = require('./index');

// ─── przywitaj ────────────────────────────────────────────────────────────────

describe('przywitaj', () => {
  test('zwraca poprawne powitanie dla zwykłego imienia', () => {
    // Przypadek normalny: funkcja powinna złożyć string z imieniem w środku
    expect(przywitaj('Adam')).toBe('Cześć, Adam!');
  });

  test('działa z imieniem zawierającym polskie znaki', () => {
    // Ważne, bo projekt używa polskich stringów — kodowanie UTF-8 nie może ucinać znaków
    expect(przywitaj('Łukasz')).toBe('Cześć, Łukasz!');
  });

  test('zwraca powitanie z pustym członem gdy imię jest pustym stringiem', () => {
    // Przypadek graniczny: pusty string nie powinien wyrzucać błędu — template literal
    // po prostu nie wstawi niczego między przecinek a wykrzyknik
    expect(przywitaj('')).toBe('Cześć, !');
  });
});

// ─── pozegnaj ─────────────────────────────────────────────────────────────────

describe('pozegnaj', () => {
  test('zwraca poprawne pożegnanie dla zwykłego imienia', () => {
    // Przypadek normalny: analogiczny do przywitaj, inny prefiks stringa
    expect(pozegnaj('Adam')).toBe('Do widzenia, Adam!');
  });

  test('działa z imieniem zawierającym polskie znaki', () => {
    // Upewnia się, że kodowanie UTF-8 działa poprawnie również przy pożegnaniu
    expect(pozegnaj('Łukasz')).toBe('Do widzenia, Łukasz!');
  });

  test('zwraca pożegnanie z pustym członem gdy imię jest pustym stringiem', () => {
    // Przypadek graniczny: pusta wartość nie powinna powodować wyjątku
    expect(pozegnaj('')).toBe('Do widzenia, !');
  });
});

// ─── przeliczWiek ─────────────────────────────────────────────────────────────

describe('przeliczWiek', () => {
  // Wyznaczamy bieżący rok raz, żeby testy były odporne na zmianę daty w czasie wykonania
  const OBECNY_ROK = new Date().getFullYear();

  test('oblicza wiek dla typowego roku urodzenia', () => {
    // Przypadek normalny: prosta arytmetyka — rok bieżący minus rok urodzenia
    expect(przeliczWiek(1990)).toBe(OBECNY_ROK - 1990);
  });

  test('zwraca 0 gdy rok urodzenia jest bieżącym rokiem', () => {
    // Przypadek graniczny: osoba urodzona w tym samym roku co bieżący — wynik to 0
    expect(przeliczWiek(OBECNY_ROK)).toBe(0);
  });

  test('rzuca RangeError gdy rok urodzenia jest w przyszłości', () => {
    // Przypadek błędu: rok z przyszłości jest logicznie nieprawidłowy —
    // funkcja powinna rzucić dokładnie RangeError, a nie inny typ wyjątku
    expect(() => przeliczWiek(OBECNY_ROK + 1)).toThrow(RangeError);
  });

  test('komunikat RangeError zawiera podany rok urodzenia', () => {
    // Przypadek błędu (szczegółowy): wiadomość wyjątku powinna wspominać rok,
    // żeby programista od razu wiedział jaką wartość przekazał
    const rokPrzyszly = OBECNY_ROK + 10;
    expect(() => przeliczWiek(rokPrzyszly)).toThrow(
      String(rokPrzyszly)
    );
  });

  test('obsługuje bardzo stary rok urodzenia bez błędu arytmetycznego', () => {
    // Przypadek graniczny: duże różnice roku nie powinny powodować problemów —
    // JavaScript obsługuje takie operacje na typie number bez przepełnienia
    expect(przeliczWiek(1900)).toBe(OBECNY_ROK - 1900);
  });
});

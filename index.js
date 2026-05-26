// Prosta aplikacja testowa
function przywitaj(imie) {
  return `Cześć, ${imie}!`;
}

function pozegnaj(imie) {
  return `Do widzenia, ${imie}!`;
}

function przeliczWiek(rokUrodzenia) {
  const biezacyRok = new Date().getFullYear();
  if (rokUrodzenia > biezacyRok) {
    throw new RangeError(`Rok urodzenia (${rokUrodzenia}) nie może być w przyszłości.`);
  }
  return biezacyRok - rokUrodzenia;
}

module.exports = { przywitaj, pozegnaj, przeliczWiek };

if (require.main === module) {
  console.log(przywitaj("Adam"));
  console.log(pozegnaj("Adam"));
  console.log(przeliczWiek(1990));
}

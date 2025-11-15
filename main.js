/**
 * Převod nezáporného celého čísla z desítkové do binární soustavy.
 * @param {string} inputNumber - Číslo uvedené jako textový vstup (např. "15").
 * @param {number} inputNumberSystem - Vstupní soustava (u nás pouze 10).
 * @param {number} outputNumberSystem - Výstupní soustava (u nás pouze 2).
 * @returns {string} - Výsledek převodu jako binární řetězec.
 */
export function main(inputNumber, inputNumberSystem, outputNumberSystem) {
  
  const allowedInputSystems = permittedInputSystems();
  const allowedOutputSystems = permittedOutputSystems();

  if (!allowedInputSystems.includes(inputNumberSystem)) {
    throw new Error("Nepodporovaná vstupní soustava: " + inputNumberSystem);
  }
  if (!allowedOutputSystems.includes(outputNumberSystem)) {
    throw new Error("Nepodporovaná výstupní soustava: " + outputNumberSystem);
  }

  // V tomto řešení podporujeme pouze převod 10 -> 2.
  if (inputNumberSystem !== 10 || outputNumberSystem !== 2) {
    throw new Error("Tato kombinace soustav ještě není implementována.");
  }

  // Zpracování vstupu: řetězec, bez mezer, pouze číslice 0–9 
  if (typeof inputNumber !== "string") {
    inputNumber = String(inputNumber);
  }
  const s = inputNumber.trim();

  if (s.length === 0) {
    throw new Error("Chyba - zadej alespoň jednu číslici.");
  }

  // Nepovolujeme znaménka, tečky apod. jen číslice
  if (!/^[0-9]+$/.test(s)) {
    throw new Error("Chyba - povoleny jsou pouze číslice 0-9.");
  }

  // Speciální případ nuly
  if (/^0+$/.test(s)) {
    return "0";
  }

  // Převod z textu v desítkové soustavě na BigInt
  // value = 0; pro každou číslici: value = value * 10 + digit
  let value = 0n;
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i) - 48; // '0' == 48
    const digit = BigInt(code);
    value = value * 10n + digit;
  }

  // Převod z "desítkového" BigInt na binární zápis pomocí opakovaného dělení 2 ---
  let bits = "";
  while (value > 0n) {
    const remainder = value % 2n; // 0n nebo 1n
    // přidáme znak '0' nebo '1'
    bits += remainder === 0n ? "0" : "1";
    value = value / 2n; // celočíselné dělení
  }

  // Otočení výsledku
  const result = bits.split("").reverse().join("");

  
  return result;
}

/**
 * Vrátí pole povolených vstupních soustav.
 * @returns {number[]} Pole povolených vstupních soustav.
 */
export function permittedInputSystems() {
  return [10];
}

/**
 * Vrátí pole povolených výstupních soustav.
 * @returns {number[]} Pole povolených výstupních soustav.
 */
export function permittedOutputSystems() {
  return [2];
}

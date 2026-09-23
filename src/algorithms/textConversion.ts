import { TextConversionResult } from './types';

/**
 * Text to Number Conversion (การเปลี่ยนข้อความเป็นตัวเลข)
 * Lecture rules:
 * 1. ASCII: e.g. NOTE -> 78, 79, 84, 69
 * 2. A-Z -> 1-26: A=1 .. Z=26 -> N=14, O=15, T=20, E=5
 * 3. 5-bit Binary: each 1..26 is 5 bits (because 2^5 = 32 >= 26)
 *    N(14) = 01110, O(15) = 01111, T(20) = 10100, E(5) = 00101
 *    Concatenated: 01110 01111 10100 00101 -> Decimal 474,757
 * 4. Horner's Rule (Base 32 Polynomial Form):
 *    (14 * 32^3) + (15 * 32^2) + (20 * 32^1) + (5 * 32^0) = 474,757
 */
export function convertTextToNumber(text: string): TextConversionResult {
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
  const chars = cleanText.split('');

  const asciiValues = chars.map(c => ({
    char: c,
    ascii: c.charCodeAt(0)
  }));

  const azValues = chars.map(c => ({
    char: c,
    az: c.charCodeAt(0) - 64 // 'A' is 65 -> 1
  }));

  const binary5Bit = azValues.map(item => ({
    char: item.char,
    binary: item.az.toString(2).padStart(5, '0')
  }));

  const concatenatedBinary = binary5Bit.map(b => b.binary).join(' ');

  const n = chars.length;
  const powers = azValues.map((item, index) => {
    const power = n - 1 - index;
    const term = item.az * Math.pow(32, power);
    return {
      char: item.char,
      val: item.az,
      power,
      term
    };
  });

  const total = powers.reduce((acc, curr) => acc + curr.term, 0);

  return {
    text: cleanText,
    asciiValues,
    azValues,
    binary5Bit,
    concatenatedBinary,
    hornerCalculation: {
      powers,
      total
    }
  };
}

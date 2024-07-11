import randomatic from 'randomatic';

// Function to generate a 16-digit card number
export function generateCardNumber(): string {
  let cardNumber = randomatic('0', 15); // Generate first 15 digits
  let checksum = luhnChecksum(cardNumber);
  return cardNumber + checksum;
}

// Function to generate a 3-digit CVV
export function generateCVV(): string {
  return randomatic('0', 3);
}

// Luhn Algorithm to calculate the checksum digit
function luhnChecksum(number: string): string {
  let sum = 0;
  for (let i = 0; i < number.length; i++) {
    let digit = parseInt(number[i]);
    if (i % 2 === number.length % 2) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return ((10 - (sum % 10)) % 10) + '';
}

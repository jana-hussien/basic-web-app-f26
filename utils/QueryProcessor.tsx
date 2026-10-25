export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "JJ";
  }

  if (query.toLowerCase().includes("age")) {
    return "67";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "jhussien";
  }

  const plusMatch = query.match(/what is (-?\d+) plus (-?\d+)/i);
  if (plusMatch) {
    return String(Number(plusMatch[1]) + Number(plusMatch[2]));
  }

  const minusMatch = query.match(/what is (-?\d+) minus (-?\d+)/i);
  if (minusMatch) {
    return String(Number(minusMatch[1]) - Number(minusMatch[2]));
  }

  // BigInt keeps large powers exact instead of falling back to scientific notation
  const powerMatch = query.match(/what is (-?\d+) to the power of (\d+)/i);
  if (powerMatch) {
    const base = BigInt(powerMatch[1]);
    let result = BigInt(1);
    for (let i = 0; i < Number(powerMatch[2]); i++) {
      result *= base;
    }
    return result.toString();
  }

  const primesMatch = query.match(/which of the following numbers are primes:\s*([\d,\s-]+)/i);
  if (primesMatch) {
    const isPrime = (n: number) => {
      if (n < 2) return false;
      for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
      }
      return true;
    };
    const numbers = primesMatch[1].split(",").map((n) => Number(n.trim()));
    return numbers.filter(isPrime).join(", ");
  }

  const largestMatch = query.match(/which of the following numbers is the largest:\s*([\d,\s-]+)/i);
  if (largestMatch) {
    const numbers = largestMatch[1].split(",").map((n) => Number(n.trim()));
    return String(Math.max(...numbers));
  }

  return "";
}

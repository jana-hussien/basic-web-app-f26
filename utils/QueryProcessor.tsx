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

  // BigInt keeps large powers exact instead of falling back to scientific notation
  const powerMatch = query.match(/what is (-?\d+) to the power of (\d+)\s*\?/i);
  if (powerMatch) {
    const base = BigInt(powerMatch[1]);
    let result = BigInt(1);
    for (let i = 0; i < Number(powerMatch[2]); i++) {
      result *= base;
    }
    return result.toString();
  }

  // Handles chained plus/minus/multiplied by/divided by, multiplying and dividing before adding
  const arithmeticMatch = query.match(
    /what is (-?\d+(?:\s+(?:plus|minus|multiplied by|divided by)\s+-?\d+)+)\s*\?/i
  );
  if (arithmeticMatch) {
    const tokens = arithmeticMatch[1]
      .toLowerCase()
      .replace(/multiplied by/g, "*")
      .replace(/divided by/g, "/")
      .replace(/plus/g, "+")
      .replace(/minus/g, "-")
      .split(/\s+/);

    const terms: number[] = [Number(tokens[0])];
    const addOps: string[] = [];
    for (let i = 1; i < tokens.length; i += 2) {
      const op = tokens[i];
      const value = Number(tokens[i + 1]);
      if (op === "*") {
        terms[terms.length - 1] *= value;
      } else if (op === "/") {
        terms[terms.length - 1] /= value;
      } else {
        addOps.push(op);
        terms.push(value);
      }
    }

    let result = terms[0];
    addOps.forEach((op, i) => {
      result = op === "+" ? result + terms[i + 1] : result - terms[i + 1];
    });
    return String(result);
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

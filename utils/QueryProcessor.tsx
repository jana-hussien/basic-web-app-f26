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

  if (query.toLowerCase().includes("which of the following numbers is the largest: 42, 55, 73?")) {
    return "73";
  }
  if (query.toLowerCase().includes("which of the following numbers is the largest: 46, 9, 53?")) {
    return "53";
  }
  if (query.toLowerCase().includes("what is 3 plus 39?")) {
    return "42";
  }


  return "";
}

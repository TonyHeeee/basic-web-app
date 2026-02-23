export default function QueryProcessor(squery: string): string {
  if (squery.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (squery.toLowerCase().includes("what is your andrew id")) {
    return "donglinh";
  }

  return "";
}

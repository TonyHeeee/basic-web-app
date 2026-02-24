export default function QueryProcessor(query: string): string {

    const lower = query.toLowerCase();

    // Shakespeare
    if (lower.includes("shakespeare")) {
        return (
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
        );
    }

    // Name
    if (lower.includes("name")) {
        return "donglinh";
    }

    // Andrew ID
    if (lower.includes("andrew id")) {
        return "donglinh"; // ← 改成你自己的
    }

    // Addition questions
    if (lower.includes("plus")) {
        const numbers = query.match(/\d+/g);
        if (numbers && numbers.length >= 2) {
            const sum = parseInt(numbers[0]) + parseInt(numbers[1]);
            return sum.toString();
        }
    }

    // Largest number questions
    if (lower.includes("largest")) {
        const numbers = query.match(/\d+/g);
        if (numbers && numbers.length > 0) {
            const nums = numbers.map(n => parseInt(n));
            return Math.max(...nums).toString();
        }
    }

    return "";
}

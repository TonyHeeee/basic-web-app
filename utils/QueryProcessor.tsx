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
    // Subtraction
    if (lower.includes("minus")) {
        const numbers = query.match(/\d+/g);
        if (numbers && numbers.length >= 2) {
            const result = parseInt(numbers[0]) - parseInt(numbers[1]);
            return result.toString();
        }
    }

    // Multiplication questions
    if (lower.includes("multiplied by")) {
        const numbers = query.match(/\d+/g);
        if (numbers && numbers.length >= 2) {
            const product = parseInt(numbers[0]) * parseInt(numbers[1]);
            return product.toString();
        }
    }
    // Square and cube (6th power)
    if (lower.includes("square") && lower.includes("cube")) {
        const numbers = query.match(/\d+/g);
        if (numbers) {
            for (const n of numbers) {
                const num = parseInt(n);
                const root = Math.round(Math.pow(num, 1/6));
                if (Math.pow(root, 6) === num) {
                    return num.toString();
                }
            }
        }
    }
    // Prime numbers
    if (lower.includes("prime")) {
        const numbers = query.match(/\d+/g);
        if (numbers) {
            const isPrime = (n: number): boolean => {
                if (n < 2) return false;
                for (let i = 2; i <= Math.sqrt(n); i++) {
                    if (n % i === 0) return false;
                }
                return true;
            };

            const primes = numbers
                .map(n => parseInt(n))
                .filter(n => isPrime(n));

            return primes.join(", ");
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

export default function QueryProcessor(query: string): string {

    const lower = query.toLowerCase();
        // Complex arithmetic expression
    if (
        lower.includes("plus") ||
        lower.includes("minus") ||
        lower.includes("multiplied by") ||
        lower.includes("divided by")
    ) {
        let expression = lower
            .replace("what is", "")
            .replace(/\?/g, "")
            .replace(/multiplied by/g, "*")
            .replace(/divided by/g, "/")
            .replace(/plus/g, "+")
            .replace(/minus/g, "-");

        try {
            const result = Function(`"use strict"; return (${expression})`)();
            return result.toString();
        } catch {
            return "";
        }
    }

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
        return "donglinh";
    }

    // Addition (supports multiple numbers)
    if (lower.includes("plus")) {
        const numbers = query.match(/\d+/g);
        if (numbers) {
            const sum = numbers
                .map(n => parseInt(n))
                .reduce((acc, curr) => acc + curr, 0);
            return sum.toString();
        }
    }

   // Subtraction (supports multiple)
    if (lower.includes("minus")) {
        const numbers = query.match(/\d+/g);
        if (numbers && numbers.length > 0) {
            const result = numbers
                .map(n => parseInt(n))
                .reduce((acc, curr) => acc - curr);
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
    // Power support
    if (lower.includes("to the power of")) {
        const numbers = query.match(/\d+/g);
        if (numbers && numbers.length >= 2) {
            const base = BigInt(numbers[0]);
            const exponent = parseInt(numbers[1]);

            let result = BigInt(1);
            for (let i = 0; i < exponent; i++) {
                result *= base;
            }

            return result.toString();
        }
    }



    return "";
}

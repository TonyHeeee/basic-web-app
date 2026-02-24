export default function QueryProcessor(query: string): string {

    const lower = query.toLowerCase();
    // Anagram
    if (lower.includes("anagram of")) {
        const m = lower.match(/anagram of ([a-z]+): (.+)\??$/);
        if (m) {
            const target = m[1];
            const options = m[2].split(",").map(s => s.trim());

            const norm = (s: string) => s.split("").sort().join("");

            const targetNorm = norm(target);
            for (const opt of options) {
                if (norm(opt) === targetNorm) {
                    return opt;
                }
            }
        }
    }

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
    // Scrabble score
    if (lower.includes("scrabble score")) {
        const wordMatch = lower.match(/of ([a-z]+)/);
        if (wordMatch) {
            const word = wordMatch[1];

            const scores: { [key: string]: number } = {
                a:1,e:1,i:1,o:1,u:1,l:1,n:1,s:1,t:1,r:1,
                d:2,g:2,
                b:3,c:3,m:3,p:3,
                f:4,h:4,v:4,w:4,y:4,
                k:5,
                j:8,x:8,
                q:10,z:10
            };

            let total = 0;
            for (const char of word) {
                total += scores[char] || 0;
            }

            return total.toString();
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

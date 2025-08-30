// Validation.ts
/** Handle all Validation logic
 * types
 * reuls
 * [https://www.freecodecamp.org/news/react-how-to-validate-user-input/]
 * [https://www.geeksforgeeks.org/mobile-computing/how-to-implement-form-validation-in-react-native/]
 * [https://strapi.io/blog/form-validation-in-typescipt-projects-using-zod-and-react-hook-forma]
 * Regex ---
 *
 * [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet]
 * [https://www.rexegg.com/]
 * .trim() is a string method in JavaScript/TypeScript that removes whitespace (spaces, tabs, line breaks) from both the start and end of a string.
 */

//---- TYPES / props fro e/a Rule ----------

// Input filed requried----
export type RequiredRule = {
  type: "required";
  message?: string;
};

// email inptu---
export type EmailRule = {
  type: "email";
  message?: string;
};
//minLength @ input
export type MinLengthRule = {
  type: "minLength";
  value: number;
  message?: string;
};

// export all rules TYpes -----

export type Rule = RequiredRule | EmailRule | MinLengthRule;

// -----  HElpers to Run Rules -----
// props/valus from fucntoin
export function runValidation(value: string, rules?: Rule[]): string | null {
  if (!rules?.length) return null; //nothign to validate ---

  for (const r of rules) {
    // Required valiation ----- RUel cchekc---
    if (r.type === "required" && !value.trim()) {
      return r.message ?? "This field is required.";
    }
    if (r.type === "email") {
      // Regex for string values ---
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!ok) {
        // IF not valid-------
        return r.message ?? "Please enter a valid email.";
      }
    }
    // check minLegnth inpout values -----
    if (r.type === "minLength" && value.length < r.value) {
      return r.message ?? `Must be at least ${r.value} characters.`;
    }
  }
  return null; //if no erros ----
}

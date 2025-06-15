/**
 * 
 * function that formats a number into human-readable abbreviations like:

 * k for thousand

 * mn for million

 * bn for billion

 * tn for trillion
 */
export const formatCompactNumber = (num: number) =>
    Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
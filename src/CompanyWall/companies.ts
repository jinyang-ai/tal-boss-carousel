// ---------------------------------------------------------------------------
// companies.ts — companies whose bosses browsed the candidate deck (Tal Boss,
// Mixpanel 4040199, app_candidate_profiles_screen_viewed, last 30d, by
// userCurrentCompany). Internal/noise values removed. Split into rows for the
// horizontal marquee; `HL` marks the names rendered in purple.
// ---------------------------------------------------------------------------

export const ROWS: string[][] = [
  ["Zepto", "Razorpay", "Google", "Meesho", "Rippling", "Swiggy", "Databricks", "slice", "Intuit", "Cloudflare"],
  ["CRED", "Amazon", "PhonePe", "Flipkart", "Stripe", "Headout", "Uber", "Paytm", "Revolut", "Lenskart"],
  ["NVIDIA", "Oracle", "Zeta", "PayPal", "Atlan", "Navi", "Chargebee", "eBay", "Plum", "Twilio"],
  ["Okta", "Angel One", "Blinkit", "smallcase", "Duolingo", "Bureau", "Porter", "Red Hat", "Cashfree", "Ather Energy"],
  ["WeWork India", "Deliveroo", "ClearTax", "GoTo Group", "Pixxel", "Tekion", "DriveX", "Docusign", "LinkedIn", "Leap"],
];

// Scattered ~1/3 highlighted in purple for visual rhythm.
export const HL = new Set<string>([
  "Zepto", "Google", "Swiggy", "slice",
  "CRED", "Flipkart", "Uber", "Lenskart",
  "NVIDIA", "PayPal", "Navi",
  "Blinkit", "Duolingo", "Porter",
  "WeWork India", "Pixxel", "LinkedIn",
]);

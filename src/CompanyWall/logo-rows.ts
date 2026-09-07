// ---------------------------------------------------------------------------
// logo-rows.ts — brand logos for the scrolling logo walls. Assets fetched from
// Brandfetch (official logos) into public/boss-carousel/brand/{white,color}/.
//   white/  = light (monochrome) logos, read on the dark ink background
//   color/  = colored logos, read on light pill-chips
// Only logos that actually read on their background are included (auto-filtered
// by brightness), so the two sets differ slightly.
// ---------------------------------------------------------------------------

// white-on-dark (31)
export const WHITE_ROWS: string[][] = [
  ["zepto", "razorpay", "swiggy", "cred", "flipkart", "stripe", "uber", "google"],
  ["amazon", "paypal", "oracle", "nvidia", "intuit", "databricks", "cloudflare", "rippling"],
  ["slice", "paytm", "chargebee", "zeta", "plum", "twilio", "okta", "blinkit"],
  ["duolingo", "porter", "cashfree", "docusign", "linkedin", "headout", "revolut"],
];

// colored-on-chips (39)
export const COLOR_ROWS: string[][] = [
  ["zepto", "razorpay", "swiggy", "phonepe", "flipkart", "meesho", "stripe", "uber", "google", "amazon"],
  ["paypal", "oracle", "nvidia", "intuit", "databricks", "cloudflare", "rippling", "slice", "paytm", "lenskart"],
  ["navi", "chargebee", "zeta", "plum", "twilio", "okta", "blinkit", "smallcase", "duolingo", "redhat"],
  ["cashfree", "ather", "deliveroo", "cleartax", "docusign", "linkedin", "headout", "ebay", "revolut"],
];

import { assets } from "@/assets";
import { BlogPost } from "./types";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "choosing-between-7050-and-7075-for-aero-structures",
    title: "Choosing Between 7050 and 7075 for Aero-Structures ",
    excerpt:
      "The choice between 7050 and 7075 aluminum alloys for aerospace structures depends on the specific requirements of the application, including strength, corrosion resistance, and performance.",
    category: "Materials",
    content:
      "Both 7050 and 7075 are high-strength aluminium alloys from the 7000 series and both are staples in airframe design, but the choice between them comes down to section thickness and fracture behaviour. 7075 offers slightly higher strength and is widely available in sheet and thin plate, making it the default for skins and machined fittings. 7050 was developed for thick section plate and forgings where 7075 loses toughness and becomes prone to stress corrosion cracking. It retains better through-thickness properties and corrosion resistance in heavy sections used for wing spars and bulkheads. In short, use 7075 for lighter gauge parts and 7050 wherever thick plate or forged structure is involved. Always confirm temper and specification against the design drawing before ordering. ",
    tags: ["7070", "7075"],
    readingTime: 7,
    date: "2026-05-12",
    cover: assets.blogCover.b1,
  },
  {
    id: 2,
    slug: "mtc-chain-what-your-qa-team-should-verify-on-every-consignment",
    title: "MTC Chain: What Your QA Team Should Verify on Every Consignment",
    excerpt:
      "Ensuring the quality of materials and components in aerospace manufacturing requires a robust MTC (Material Test Certificate) chain. ",
    category: "Quality",
    content:
      "A Material Test Certificate is only useful if it can be traced back to the actual melt and can be linked to your part without a break in the chain. On every consignment your QA team should check that the MTC references the correct specification and revision and that the chemical composition and mechanical properties actually meet those limits. Confirm the heat or lot number on the certificate matches the physical marking on the material and that the certificate is signed by an authorised signatory rather than a reseller. Where material has changed hands look for a full chain of custody from mill to your dock rather than a single distributor statement. Any gap in traceability should be treated as a nonconformance until it is resolved.",
    tags: ["MTC chain", "Quality"],
    readingTime: 6,
    date: "2026-04-02",
    cover: assets.blogCover.b2,
  },
  {
    id: 3,
    slug: "as9120-what-it-really-means-for-aerospace-buyers-in-india",
    title: "AS9120: What It Really Means for Aerospace Buyers in India",
    excerpt:
      "AS9120 is a quality management standard specifically for aerospace distributors. It ensures that suppliers meet stringent requirements. which is crucial for aerospace buyers in India.",
    category: "Certifications",
    content:
      "AS9120 is the quality management standard written specifically for stockists and distributors in the aerospace supply chain rather than manufacturers. For buyers in India it means a supplier holding this certification has documented controls for traceability, counterfeit part prevention and correct handling of certificates through every stage of distribution. It does not mean the supplier makes the material, but it does mean incoming goods are verified, records are retained and any deviation is flagged before dispatch. For a procurement team this translates into fewer surprises during audits and a stronger position when material needs to be traced back for a quality escape. When evaluating an aerospace metals supplier in India, AS9120 certification is a meaningful signal that traceability and documentation discipline are built into their process rather than added as an afterthought.",
    tags: ["AS9120", "Aerospace"],
    readingTime: 5,
    date: "2026-02-18",
    cover: assets.blogCover.b3,
  },
];

import { BlogFilterCategory } from "@/components/blog/types";

export const BLOG_CATEGORIES: BlogFilterCategory[] = [
  "All",
  "Materials",
  "Quality",
  "Certifications",
];

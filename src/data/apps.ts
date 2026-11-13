import type { ImageMetadata } from "astro";
import { profile } from "./portfolio";
import fitfuelIcon from "../assets/icons/fitfuel.png";


export interface AppFeature {
  title: string;
  text: string;
}

export interface AppPlan {
  name: string;
  note?: string;
  featured?: boolean;
  prices: Record<string, number>;
  limits: { label: string; value: string }[];
}

export interface AppPeriod {
  id: string;
  label: string;
  per: string;
  months: number;
}

export interface AppSite {
  id: string;
  name: string;
  tagline: string;
  icon: ImageMetadata;
  status: string;
  summary: string;
  seoDescription: string;
  highlights: { label: string; value: string }[];
  about: { lead: string; paragraphs: string[] };
  features: { heading: string; intro: string; items: AppFeature[] };
  pricing: {
    intro: string;
    periods: AppPeriod[];
    plans: AppPlan[];
    notes: string[];
  };
  contact: {
    intro: string;
    email: string;
    formName: string;
    topics: string[];
  };
  legal: {
    operator: string;
    email: string;
    address: string;
    jurisdiction: string;
    effective: string;
    effectiveIso: string;
  };
}

export const apps: AppSite[] = [
  {
    id: "fit&fuel",
    name: "Fit&Fuel",
    tagline: "Run your gym from your phone",
    icon: fitfuelIcon,
    status: "Coming soon to Google Play",
    summary:
      "Version 2 turns Fit&Fuel from a personal workout app into a tool for running a gym: trainers, members, memberships, payments, and attendance in one Android app that keeps working without internet.",
    seoDescription:
      "Run your gym from your phone: trainers, members, memberships, payments and attendance in one Android app that works offline. Plans from ₹599/month.",
    highlights: [
      { label: "Platform", value: "Android" },
      { label: "Offline", value: "Works without internet" },
      { label: "Plans from", value: "₹599/month" },
    ],
    about: {
      lead: "Fit&Fuel is built by one developer, Sushant Tare, a Flutter developer from Palghar, Maharashtra.",
      paragraphs: [
        "It started as a personal fitness app: exercise videos, nutrition targets, recipes, and workout music in one app that never needed a connection. I presented that first version as a research paper at the ESSG-2047 International Conference in April 2026.",
        "Version 2 takes the same offline-first approach to the people who run gyms. Who has paid, whose membership ends this week, which trainer has too many clients, and who stopped coming a month ago: Fit&Fuel keeps those answers on the owner's phone, even when the gym's connection drops.",
        "I design, build, and support Fit&Fuel myself, from the database to the Play Store release. When you write in, you reach the person who wrote the code.",
      ],
    },
    features: {
      heading: "Everything a gym runs on",
      intro:
        "Owners, trainers, and members each get the part of the gym they need, and nothing they shouldn't see.",
      items: [
        {
          title: "Manage your trainers",
          text: "Add, edit, and remove trainers in a few taps. Each trainer belongs to your gym, and your plan sets how many trainers you can add.",
        },
        {
          title: "Manage your members",
          text: "Add members, update their details, and remove them when they leave. Search by name or phone number, filter by status, and assign each member to a trainer, change it later, or leave them unassigned.",
        },
        {
          title: "Track memberships",
          text: "Record each member's period, plan, amount paid, and whether they paid cash or online. A renewal creates a new membership, so the full history stays.",
        },
        {
          title: "Record payments",
          text: "Log every payment against the right membership. Look up all payments for a member, correct a mistake, or remove an invalid entry.",
        },
        {
          title: "Trainers see their own members",
          text: "Each trainer sees only the active members assigned to them, so they focus on their clients without seeing anyone else's.",
        },
        {
          title: "Private to your gym",
          text: "You see only your own trainers, members, memberships, and payments. Other gyms on the platform can't see your data.",
        },
        {
          title: "Attendance check-in",
          text: "Members and staff check in and out with location confirmation, so you know who came in and when.",
        },
        {
          title: "Reports that help you act",
          text: "See members who have stopped coming, how much work each trainer is carrying, and which memberships are about to expire, so you can follow up before they lapse.",
        },
        {
          title: "Works without internet",
          text: "The app keeps working when the connection drops. Data is saved on the phone and backed up to the server when you're back online.",
        },
      ],
    },
    pricing: {
      intro:
        "One plan per gym. Pick the size that fits, and pay for longer periods to save.",
      periods: [
        { id: "monthly", label: "Monthly", per: "month", months: 1 },
        { id: "quarterly", label: "Quarterly", per: "quarter", months: 3 },
        { id: "half-yearly", label: "Half-yearly", per: "6 months", months: 6 },
        { id: "annual", label: "Annual", per: "year", months: 12 },
      ],
      plans: [
        {
          name: "Starter",
          note: "For a new or small gym",
          prices: { monthly: 599, quarterly: 1699, "half-yearly": 3199, annual: 5999 },
          limits: [
            { label: "Members", value: "100" },
            { label: "Trainers", value: "2" },
          ],
        },
        {
          name: "Growth",
          note: "For an established gym",
          featured: true,
          prices: { monthly: 1299, quarterly: 3699, "half-yearly": 6999, annual: 12999 },
          limits: [
            { label: "Members", value: "300" },
            { label: "Trainers", value: "5" },
          ],
        },
        {
          name: "Scale",
          note: "For a large gym",
          prices: { monthly: 2499, quarterly: 7099, "half-yearly": 13499, annual: 24999 },
          limits: [
            { label: "Members", value: "1,000" },
            { label: "Trainers", value: "20" },
          ],
        },
      ],
      notes: [
        "Prices are in Indian rupees (₹) for one gym.",
        "Every plan includes every feature. Plans differ only in how many members and trainers you can add.",
        "Not happy? Ask for a full refund within 7 days of paying.",
      ],
    },
    contact: {
      intro:
        "Questions about a plan, help with the app, or feedback on a feature. Write in and I'll reply by email.",
      email: "fitandfuel26@gmail.com",
      formName: "fitfuel-contact",
      topics: ["Support", "Feedback", "Business", "Other"],
    },
    legal: {
      operator: profile.fullName,
      email: "fitandfuel26@gmail.com",
      address: profile.location,
      jurisdiction: "the courts at Palghar, Maharashtra, India",
      effective: "2 November 2026",
      effectiveIso: "2026-11-02",
    },
  },
];

export interface AppDoc {
  slug: string;
  title: string;
  short: string;
}

export const appDocs: AppDoc[] = [
  { slug: "privacy-policy", title: "Privacy Policy", short: "Privacy" },
  { slug: "terms-conditions", title: "Terms and Conditions", short: "Terms" },
  { slug: "refund-policy", title: "Refund Policy", short: "Refunds" },
  { slug: "delete-account", title: "Delete Your Account", short: "Delete account" },
];

export const appNav = [
  { label: "Home", hash: "#home" },
  { label: "About", hash: "#about" },
  { label: "Features", hash: "#features" },
  { label: "Pricing", hash: "#pricing" },
  { label: "Contact", hash: "#contact" },
];

// Social card for an app's pages, drawn by scripts/make-og.mjs (icon, name, tagline and labels).
export const appCard = (app: AppSite) => ({
  image: `/og/${app.id.replace(/\W/g, "")}.png`,
  imageAlt: `${app.name} app icon and the tagline "${app.tagline}", for Android.`,
});

#!/usr/bin/env node
/**
 * Probes the RLS boundary using the publishable (anon) key — the same
 * credentials any visitor's browser has.
 *
 * Applying a migration proves the SQL parsed, not that the policies do what
 * they claim. This asserts the actual behaviour: what the public can read,
 * what it can write, and what it must never see.
 *
 *   node scripts/verify-rls.mjs
 *
 * Reads NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

function loadEnv(path) {
  try {
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  } catch {
    /* optional */
  }
}

loadEnv(new URL("../apps/web/.env.local", import.meta.url).pathname);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  process.exit(1);
}

const anon = createClient(url, key);

let failures = 0;
const results = [];

async function check(description, expectation, run) {
  const outcome = await run();
  const passed = expectation(outcome);
  if (!passed) failures++;
  results.push({ passed, description, detail: outcome.detail });
}

const readable = (r) => !r.error;
const blocked = (r) => r.error !== null || r.rowCount === 0;

async function trySelect(table) {
  const { data, error } = await anon.from(table).select("*").limit(5);
  return {
    error: error ? error.message : null,
    rowCount: data?.length ?? 0,
    detail: error ? `blocked: ${error.message}` : `${data?.length ?? 0} row(s) readable`,
  };
}

async function tryInsert(table, payload) {
  const { error } = await anon.from(table).insert(payload);
  return { error: error ? error.message : null, detail: error ? `rejected: ${error.code ?? error.message}` : "accepted" };
}

console.log("\n  Probing RLS as the anon role\n");

// ── Public reads that must work ──────────────────────────────────────────────
for (const t of [
  "blog_categories",
  "blog_posts",
  "design_gallery_items",
  "careers_listings",
  "leadership_profiles",
  "departments",
]) {
  await check(`anon CAN read ${t}`, readable, () => trySelect(t));
}

// ── Reads that must be refused ───────────────────────────────────────────────
// No SELECT policy exists for anon on either table, so PostgREST returns an
// empty set rather than an error. Zero rows *is* the enforcement.
await check("anon CANNOT read inquiries", blocked, () => trySelect("inquiries"));
await check("anon CANNOT read profiles", blocked, () => trySelect("profiles"));

// ── Writes ───────────────────────────────────────────────────────────────────
await check("anon CAN submit an inquiry", (r) => !r.error, () =>
  tryInsert("inquiries", {
    type: "quick",
    name: "RLS probe",
    email: "rls-probe@example.com",
    message: "Automated policy check — safe to delete.",
  }),
);

await check("anon CANNOT pre-set inquiry status", (r) => r.error !== null, () =>
  tryInsert("inquiries", {
    type: "quick",
    name: "RLS probe",
    email: "rls-probe@example.com",
    status: "archived",
  }),
);

for (const [table, payload] of [
  ["blog_posts", { title: "probe", slug: "probe-should-fail" }],
  ["leadership_profiles", { name: "probe", role: "probe" }],
  ["careers_listings", { title: "probe", description: "probe" }],
]) {
  await check(`anon CANNOT write ${table}`, (r) => r.error !== null, () => tryInsert(table, payload));
}

// ── Report ───────────────────────────────────────────────────────────────────
for (const { passed, description, detail } of results) {
  console.log(`  ${passed ? "PASS" : "FAIL"}  ${description.padEnd(38)} ${detail}`);
}

console.log(
  `\n  ${results.length - failures}/${results.length} passed${failures ? ` — ${failures} FAILED` : ""}\n`,
);
process.exit(failures ? 1 : 0);

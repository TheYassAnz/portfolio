import { test } from "node:test";
import assert from "node:assert/strict";
import { absolutizeReadme, localize, sortFeaturedFirst, toEntry } from "./projects.ts";
import type { ProjectEntry, Repo } from "./projects.ts";
import { overrides } from "../content/projects.ts";

const entry: ProjectEntry = {
  slug: "demo", stack: ["Next.js"], featured: false,
  fr: { title: "Démo", description: "desc fr", role: "role fr" },
  en: { title: "Demo", role: "" },
};

const repo: Repo = {
  name: "boxing-timer",
  description: "From GitHub",
  html_url: "https://github.com/TheYassAnz/boxing-timer",
  homepage: "",
  topics: ["portfolio", "expo", "react-native"],
  created_at: "2024-03-01T00:00:00Z",
  pushed_at: "2025-01-01T00:00:00Z",
  default_branch: "main",
};

test("localize en overrides only provided non-empty fields", () => {
  const p = localize(entry, "en");
  assert.equal(p.title, "Demo");
  assert.equal(p.description, "desc fr");
  assert.equal(p.role, "role fr");
  assert.equal(p.image, "");
});

test("localize without en block falls back to fr", () => {
  assert.equal(localize({ ...entry, en: undefined }, "en").title, "Démo");
});

test("toEntry maps GitHub fields without override", () => {
  const e = toEntry(repo);
  assert.equal(e.slug, "boxing-timer");
  assert.equal(e.fr.title, "Boxing Timer");
  assert.equal(e.fr.description, "From GitHub");
  assert.deepEqual(e.stack, ["expo", "react-native"]);
  assert.equal(e.year, 2024);
  assert.equal(e.demo, undefined);
  assert.equal(e.featured, false);
});

test("toEntry: override wins field by field, undefined keeps GitHub value", () => {
  const e = toEntry(repo, { slug: "boxing-timer", stack: ["Expo"], demo: undefined, fr: { role: "r" }, en: { title: "Timer" } }, "/cover.png");
  assert.deepEqual(e.stack, ["Expo"]);
  assert.equal(e.fr.role, "r");
  assert.equal(e.fr.description, "From GitHub");
  assert.equal(e.image, "/cover.png");
  assert.equal(localize(e, "en").title, "Timer");
});

test("content: override slugs are unique", () => {
  const slugs = overrides.map((o) => o.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("absolutizeReadme rewrites relative src only", () => {
  const raw = "https://raw.githubusercontent.com/TheYassAnz/demo/HEAD/";
  const out = absolutizeReadme(
    '<img src="docs/a.png"><img src="./b.png"><img src="/c.png"><img src="https://x/y.png"><img src="data:image/png;base64,AA"><img src="//x/z.png">',
    "demo"
  );
  assert.equal(
    out,
    `<img src="${raw}docs/a.png"><img src="${raw}b.png"><img src="${raw}c.png"><img src="https://x/y.png"><img src="data:image/png;base64,AA"><img src="//x/z.png">`
  );
});

test("toEntry: featured topic flags the project and stays out of the stack", () => {
  const e = toEntry({ ...repo, topics: ["portfolio", "featured", "expo"] });
  assert.equal(e.featured, true);
  assert.deepEqual(e.stack, ["expo"]);
});

test("sortFeaturedFirst keeps push order within each group", () => {
  const items = [
    { slug: "a", featured: false },
    { slug: "b", featured: true },
    { slug: "c", featured: false },
    { slug: "d", featured: true },
  ];
  assert.deepEqual(sortFeaturedFirst(items).map((i) => i.slug), ["b", "d", "a", "c"]);
});

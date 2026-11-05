import { test } from "node:test";
import assert from "node:assert/strict";
import { localize, toEntry, toParagraphs } from "./projects.ts";
import type { ProjectEntry, Repo } from "./projects.ts";
import { overrides } from "../content/projects.ts";

const entry: ProjectEntry = {
  slug: "demo", status: "done", stack: ["Next.js"],
  fr: { title: "Démo", description: "desc fr", longDescription: "", problem: "p fr", solution: "", results: "" },
  en: { title: "Demo", problem: "" },
};

const repo: Repo = {
  name: "boxing-timer",
  description: "From GitHub",
  html_url: "https://github.com/TheYassAnz/boxing-timer",
  homepage: "",
  topics: ["portfolio", "expo", "react-native"],
  archived: false,
  created_at: "2024-03-01T00:00:00Z",
  pushed_at: "2025-01-01T00:00:00Z",
  default_branch: "main",
};

test("localize en overrides only provided non-empty fields", () => {
  const p = localize(entry, "en");
  assert.equal(p.title, "Demo");
  assert.equal(p.description, "desc fr");
  assert.equal(p.problem, "p fr");
  assert.equal(p.image, "");
  assert.deepEqual(p.gallery, []);
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
  assert.equal(e.status, "done");
  assert.equal(e.demo, undefined);
  assert.equal(toEntry({ ...repo, archived: true }).status, "archived");
});

test("toEntry: override wins field by field, undefined keeps GitHub value", () => {
  const e = toEntry(repo, { slug: "boxing-timer", status: "in_progress", demo: undefined, fr: { problem: "p" }, en: { title: "Timer" } }, "/cover.png");
  assert.equal(e.status, "in_progress");
  assert.equal(e.fr.problem, "p");
  assert.equal(e.fr.description, "From GitHub");
  assert.equal(e.image, "/cover.png");
  assert.equal(localize(e, "en").title, "Timer");
});

test("content: override slugs are unique", () => {
  const slugs = overrides.map((o) => o.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("toParagraphs splits on blank lines and drops empties", () => {
  assert.deepEqual(toParagraphs("a\n\n\nb\n"), ["a", "b"]);
});

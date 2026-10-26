import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { localize, getProject, getProjects, getProjectSlugs, toParagraphs } from "./projects.ts";
import type { ProjectEntry } from "./projects.ts";

const entry: ProjectEntry = {
  slug: "demo", status: "done", stack: ["Next.js"],
  fr: { title: "Démo", description: "desc fr", longDescription: "", problem: "p fr", solution: "", results: "" },
  en: { title: "Demo", problem: "" },
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

test("getProject returns null for unknown slug", () => {
  assert.equal(getProject("nope", "fr"), null);
});

test("content: slugs are unique and migrated projects exist", () => {
  const slugs = getProjectSlugs();
  assert.equal(new Set(slugs).size, slugs.length);
  for (const s of ["portfolio", "course-list", "boxing-timer"]) assert.ok(slugs.includes(s), s);
});

test("content: every image path exists in public/", () => {
  for (const p of getProjects("fr")) {
    for (const src of [p.image, ...p.gallery].filter(Boolean)) {
      assert.ok(src.startsWith(`/projects/${p.slug}/`), src);
      assert.ok(existsSync(new URL(`../../public${src}`, import.meta.url)), src);
    }
  }
});

test("toParagraphs splits on blank lines and drops empties", () => {
  assert.deepEqual(toParagraphs("a\n\n\nb\n"), ["a", "b"]);
});

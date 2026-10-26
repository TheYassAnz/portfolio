import { test, mock, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { getProject, getProjects, toParagraphs } from "./strapi.ts";

const rawFixture = {
  id: 1,
  documentId: "d1",
  slug: "demo",
  title: "Demo",
  description: "desc",
  longDescription: null,
  image: null,
  stack: null,
  github: null,
  demo: null,
  projectStatus: "done",
  role: null,
  year: null,
  problem: null,
  solution: null,
  results: null,
  gallery: null,
};

const json = (body: unknown, init: { ok?: boolean; status?: number } = {}) =>
  ({ ok: init.ok ?? true, status: init.status ?? 200, json: async () => body }) as Response;

beforeEach(() => {
  mock.method(console, "error", () => {});
});
afterEach(() => mock.restoreAll());

test("toParagraphs splits on blank lines and drops empties", () => {
  assert.deepEqual(toParagraphs("a\n\n\nb\n"), ["a", "b"]);
  assert.deepEqual(toParagraphs(""), []);
});

test("getProject falls back to fr when en is missing", async () => {
  mock.method(globalThis, "fetch", async (url: string) =>
    json({ data: url.includes("locale=en") ? [] : [rawFixture] }),
  );
  assert.equal((await getProject("demo", "en"))?.title, rawFixture.title);
});

test("getProjects returns [] when Strapi is unreachable", async () => {
  mock.method(globalThis, "fetch", async () => {
    throw new Error("down");
  });
  assert.deepEqual(await getProjects("fr"), []);
});

test("getProject returns null on 404", async () => {
  mock.method(globalThis, "fetch", async () => json({}, { ok: false, status: 404 }));
  assert.equal(await getProject("demo", "fr"), null);
});

test("getProjects falls back to fr per project, keeping fr order", async () => {
  const a = { ...rawFixture, slug: "a", title: "A fr" };
  const b = { ...rawFixture, slug: "b", title: "B fr" };
  const a2 = { ...a, title: "A en" };
  mock.method(globalThis, "fetch", async (url: string) =>
    json({ data: url.includes("locale=en") ? [a2] : [a, b] }),
  );
  assert.deepEqual((await getProjects("en")).map((p) => p.title), ["A en", "B fr"]);
});

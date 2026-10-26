import { test } from "node:test";
import assert from "node:assert/strict";
import { negotiateLocale, isLocale } from "./i18n.ts";

test("negotiateLocale", () => {
  assert.equal(negotiateLocale(null), "fr");
  assert.equal(negotiateLocale(""), "fr");
  assert.equal(negotiateLocale("en-US,en;q=0.9"), "en");
  assert.equal(negotiateLocale("fr-FR,fr;q=0.9,en;q=0.8"), "fr");
  assert.equal(negotiateLocale("de-DE,de;q=0.9"), "fr");
});

test("isLocale", () => {
  assert.equal(isLocale("en"), true);
  assert.equal(isLocale("de"), false);
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { escapeHtml } from "./escape-html.ts";

test("escapeHtml", () => {
  assert.equal(
    escapeHtml('<a href="x">&\'</a>'),
    "&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;",
  );
});

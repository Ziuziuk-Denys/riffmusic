import assert from "node:assert/strict";
import { test } from "node:test";

import { parseSubscribers } from "./subscribers.ts";

test("reads counts with spaces, commas and no-break spaces", () => {
  assert.equal(parseSubscribers('<div class="tgme_page_extra">5 973 subscribers</div>'), 5973);
  assert.equal(parseSubscribers("12,480 members"), 12480);
  assert.equal(parseSubscribers("1 204 subscribers"), 1204);
});

test("returns zero when the page has no count", () => {
  assert.equal(parseSubscribers("<title>Telegram: Contact @riffplayer</title>"), 0);
});

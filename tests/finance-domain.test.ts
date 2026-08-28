import assert from "node:assert/strict";
import test from "node:test";

import {
  addMonthsClamped,
  adjustObligationBalance,
  obligationAlertStatus,
  obligationMovementType,
  reminderKeyFor,
} from "../src/domain/finance-domain.js";

test("clamps monthly recurrence to a valid calendar date", () => {
  assert.equal(addMonthsClamped("2026-08-31", 1), "2026-09-30");
  assert.equal(addMonthsClamped("2028-01-31", 1), "2028-02-29");
});

test("maps reminder windows and overdue alerts", () => {
  assert.equal(reminderKeyFor(2, "2026-08-09"), "due-2");
  assert.equal(reminderKeyFor(0, "2026-08-09"), "due-0");
  assert.equal(reminderKeyFor(-1, "2026-08-09"), "overdue-2026-08-09");
  assert.equal(
    obligationAlertStatus("open", "2026-08-08", "2026-08-09"),
    "overdue",
  );
});

test("keeps obligation adjustments within valid bounds", () => {
  assert.equal(adjustObligationBalance(0, 60_000, 30_000, 100_000), 30_000);
  assert.equal(adjustObligationBalance(40_000, 20_000, 0, 100_000), 60_000);
  assert.equal(obligationMovementType("debt"), "expense");
  assert.equal(obligationMovementType("receivable"), "income");
});

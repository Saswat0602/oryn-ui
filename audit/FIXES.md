# ORYN UI — Audit Fixes Changelog

Tracking remediation of all issues identified in `audit/REPORT.md`.

## Shared & Foundational Fixes
- **`theme`**:
  - Light mode `muted-foreground` updated from `#71717a` to `#64646b` (contrast ratio increased from 4.40:1 to 5.34:1, passing WCAG AA Normal Text).
  - Light and dark mode `destructive` updated from `#ef4444` to `#dc2626` (contrast ratio with white increased from 3.76:1 to 4.83:1, passing WCAG AA Normal Text).
  - Normal-dark `primary` updated from `#3b82f6` to `#2563eb` (contrast ratio with white increased from 3.68:1 to 5.17:1, passing WCAG AA Normal Text).
  - Synchronized across `docs/src/app/globals.css`, `src/theme/colors.ts`, and `audit/scripts/contrast_check.py`.

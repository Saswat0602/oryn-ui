# FileUpload — Audit Report

## Score: 9.5 / 10 — Accessible dropzone with interactive role, semantic tokens, and live error alerts
**Status: Fixed**

## What's Good
- Accessible dropzone with explicit `role="button"` and `aria-label` ✅
- Sibling file input prevents invalid nested-interactive accessibility violations ✅
- Live error announcements with `role="alert"` and semantic `text-destructive` tokens ✅
- Keyboard trigger via `tabIndex={0}` + `onKeyDown` (Enter/Space) ✅
- Drag and drop with `isDragging` state visual feedback ✅
- File removal button with `aria-label={Remove file ${name}}` ✅
- File size validation + max files enforcement ✅
- `useControllableState` for files ✅
- `formatBytes` utility exported ✅
- forwardRef, displayName ✅
- Distinct dropzone/compact variants ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| FU-01 | Major | Tokens | file-upload.tsx:180 | Error message uses hardcoded `text-red-600 dark:text-red-400` instead of `text-destructive` | Fixed | Replaced with semantic token `text-destructive` |
| FU-02 | Major | A11y | file-upload.tsx:130-151 | Drop zone `div` with `role` missing — has `tabIndex` and `onKeyDown` but no `role="button"` | Fixed | Added `role="button" aria-label="Upload files. Click or drag and drop."` and un-nested hidden input to avoid nested interactive violation |
| FU-03 | Major | A11y | file-upload.tsx:179-184 | Error message `div` has no `role="alert"` | Fixed | Added `role="alert"` on error message container |
| FU-04 | Minor | A11y | file-upload.tsx:130-151 | `aria-disabled` not set on drop zone when `disabled=true` | Fixed | Added `aria-disabled={disabled}` to drop zone button |
| FU-05 | Minor | A11y | file-upload.tsx:152-161 | Hidden input does not have `aria-hidden="true"` | Fixed | Made input a sibling with `aria-hidden="true"` and `tabIndex={-1}` |
| FU-06 | Minor | States | file-upload.tsx:61-80 | `accept` prop is not validated against MIME types — only size/count checks | User could drop invalid file type with no feedback | Fixed | Validated file name extension and MIME type against `accept` patterns with user error feedback |
| FU-07 | Nit | A11y | file-upload.tsx:135 | Drop zone click handler uses `onClick` on a non-button div | Fixed | Consolidated `onClick` directly on the `role="button"` container |

## State/Variant Matrix

| State/Variant | Pass |
|---|---|
| Click to browse | ✅ |
| Keyboard Enter/Space trigger | ✅ |
| Drag and drop | ✅ |
| Drag over visual feedback | ✅ |
| File size validation | ✅ |
| Max files enforcement | ✅ |
| File removal | ✅ |
| Disabled state | ✅ |
| Multiple files | ✅ |
| Accept type filtering | ❌ Not implemented |
| Error message announced by AT | ✅ Fixed (`role="alert"`) |
| Drop zone announced as interactive | ✅ Fixed (`role="button"`) |
| Controlled value | ✅ |
| Compact variant | ✅ |

## Missing Tests/Docs
- No test for drag-and-drop file acceptance
- No test for size validation error display
- No test for keyboard activation (Enter/Space)
- Accept MIME type validation missing — no test possible since not implemented
- Docs should clarify that `accept` only filters file browser, not drag-drop

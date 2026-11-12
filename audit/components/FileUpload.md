# FileUpload — Audit Report

## Score: 7.5/10 — Solid with one color token issue

## What's Good
- Keyboard trigger via `tabIndex={0}` + `onKeyDown` (Enter/Space) ✅
- Drag and drop with `isDragging` state visual feedback ✅
- Hidden `<input type="file">` with `aria-label="Upload files"` ✅
- File removal button with `aria-label={Remove file ${name}}` ✅
- File size validation + max files enforcement ✅
- Error message display with icon ✅
- `useControllableState` for files ✅
- `formatBytes` utility exported ✅
- forwardRef, displayName ✅
- Distinct dropzone/compact variants ✅

## Issues

| ID | Severity | Category | File:line | Problem | Why it matters | Fix |
|----|----------|----------|-----------|---------|----------------|-----|
| FU-01 | Major | Tokens | file-upload.tsx:180 | Error message uses hardcoded `text-red-600 dark:text-red-400` instead of `text-destructive` | Breaks design token consistency; will not adapt if destructive color changes | Replace with `text-destructive` |
| FU-02 | Major | A11y | file-upload.tsx:130-151 | Drop zone `div` with `role` missing — has `tabIndex` and `onKeyDown` but no `role="button"` | AT announces it as a plain div, not interactive | Add `role="button" aria-label="Upload files. Click or drag and drop."` |
| FU-03 | Major | A11y | file-upload.tsx:179-184 | Error message `div` has no `role="alert"` | AT does not announce validation errors automatically | Add `role="alert"` or `aria-live="polite"` |
| FU-04 | Minor | A11y | file-upload.tsx:130-151 | `aria-disabled` not set on drop zone when `disabled=true` | Only `pointer-events-none` and `opacity-50` are applied; AT doesn't know it's disabled | Add `aria-disabled={disabled}` to the drop zone div |
| FU-05 | Minor | A11y | file-upload.tsx:152-161 | Hidden input does not have `aria-hidden="true"` | Some AT may still announce the hidden input | Add `aria-hidden="true"` to the hidden file input |
| FU-06 | Minor | States | file-upload.tsx:61-80 | `accept` prop is not validated against MIME types — only size/count checks | User could drop invalid file type with no feedback | Validate `file.type` against `accept` prop and display error |
| FU-07 | Nit | A11y | file-upload.tsx:135 | Drop zone click handler uses `onClick` on a non-button div | Should be on the visually triggered button role | Move to the same element that has `role="button"` (DZ-01 fix) |

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
| Error message announced by AT | ❌ No role="alert" |
| Drop zone announced as interactive | ❌ No role="button" |
| Controlled value | ✅ |
| Compact variant | ✅ |

## Missing Tests/Docs
- No test for drag-and-drop file acceptance
- No test for size validation error display
- No test for keyboard activation (Enter/Space)
- Accept MIME type validation missing — no test possible since not implemented
- Docs should clarify that `accept` only filters file browser, not drag-drop

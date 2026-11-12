"""
ORYN UI – WCAG Contrast Ratio Auditor
Computes relative luminance and contrast ratios for all design-token
foreground/background pairs (light, dark, normal-light, normal-dark)
plus hardcoded component colours.

WCAG 2.1 thresholds
  AA Normal text  : 4.5 : 1
  AA Large / UI   : 3.0 : 1
  AAA Normal text : 7.0 : 1
"""

from __future__ import annotations
import math
from dataclasses import dataclass
from typing import Optional


# ──────────────────────────────────────────────────────────────
# Core maths
# ──────────────────────────────────────────────────────────────

def _hex_to_rgb(hex_color: str) -> tuple[float, float, float]:
    h = hex_color.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return r / 255.0, g / 255.0, b / 255.0


def _linearize(c: float) -> float:
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def relative_luminance(hex_color: str) -> float:
    r, g, b = _hex_to_rgb(hex_color)
    R, G, B = _linearize(r), _linearize(g), _linearize(b)
    return 0.2126 * R + 0.7152 * G + 0.0722 * B


def contrast_ratio(fg: str, bg: str) -> float:
    l1 = relative_luminance(fg)
    l2 = relative_luminance(bg)
    lighter, darker = max(l1, l2), min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)


# ──────────────────────────────────────────────────────────────
# Token definitions
# ──────────────────────────────────────────────────────────────

LIGHT = {
    "background":          "#ffffff",
    "foreground":          "#09090b",
    "card":                "#ffffff",
    "card-foreground":     "#09090b",
    "popover":             "#ffffff",
    "popover-foreground":  "#09090b",
    "primary":             "#18181b",
    "primary-foreground":  "#fafafa",
    "secondary":           "#f4f4f5",
    "secondary-foreground":"#18181b",
    "muted":               "#f4f4f5",
    "muted-foreground":    "#64646b",
    "accent":              "#f4f4f5",
    "accent-foreground":   "#18181b",
    "destructive":         "#dc2626",
    "destructive-foreground": "#ffffff",
}

DARK = {
    "background":          "#09090b",
    "foreground":          "#fafafa",
    "card":                "#09090b",
    "card-foreground":     "#fafafa",
    "popover":             "#09090b",
    "popover-foreground":  "#fafafa",
    "primary":             "#fafafa",
    "primary-foreground":  "#18181b",
    "secondary":           "#18181b",
    "secondary-foreground":"#fafafa",
    "muted":               "#18181b",
    "muted-foreground":    "#a1a1aa",
    "accent":              "#18181b",
    "accent-foreground":   "#fafafa",
    "destructive":         "#dc2626",
    "destructive-foreground": "#ffffff",
}

NORMAL_LIGHT = {
    "primary":             "#2563eb",
    "primary-foreground":  "#ffffff",
    "accent":              "#eff6ff",
    "accent-foreground":   "#1d4ed8",
}

NORMAL_DARK = {
    "primary":             "#2563eb",
    "primary-foreground":  "#ffffff",
    "accent":              "#1e293b",
    "accent-foreground":   "#93c5fd",
}


# ──────────────────────────────────────────────────────────────
# Pair specifications
# Each entry: (label, fg_key, bg_key, theme_dict, theme_name, note)
# ──────────────────────────────────────────────────────────────

@dataclass
class PairSpec:
    label: str
    fg: str         # hex
    bg: str         # hex
    theme: str
    note: str = ""


def _make_pairs() -> list[PairSpec]:
    pairs: list[PairSpec] = []

    # ── Light token pairs ──────────────────────────────────────
    light_combos = [
        ("foreground on background",        "foreground",           "background"),
        ("card-foreground on card",         "card-foreground",      "card"),
        ("popover-foreground on popover",   "popover-foreground",   "popover"),
        ("primary-foreground on primary",   "primary-foreground",   "primary"),
        ("secondary-foreground on secondary","secondary-foreground","secondary"),
        ("muted-foreground on muted",       "muted-foreground",     "muted"),
        ("accent-foreground on accent",     "accent-foreground",    "accent"),
        ("destructive-foreground on destructive","destructive-foreground","destructive"),
    ]
    for label, fg_key, bg_key in light_combos:
        pairs.append(PairSpec(
            label=label,
            fg=LIGHT[fg_key], bg=LIGHT[bg_key],
            theme="Light",
            note="KEY – used in disabled/placeholder states" if "muted" in label else "",
        ))

    # ── Dark token pairs ───────────────────────────────────────
    dark_combos = [
        ("foreground on background",        "foreground",           "background"),
        ("card-foreground on card",         "card-foreground",      "card"),
        ("popover-foreground on popover",   "popover-foreground",   "popover"),
        ("primary-foreground on primary",   "primary-foreground",   "primary"),
        ("secondary-foreground on secondary","secondary-foreground","secondary"),
        ("muted-foreground on muted",       "muted-foreground",     "muted"),
        ("accent-foreground on accent",     "accent-foreground",    "accent"),
        ("destructive-foreground on destructive","destructive-foreground","destructive"),
    ]
    for label, fg_key, bg_key in dark_combos:
        pairs.append(PairSpec(
            label=label,
            fg=DARK[fg_key], bg=DARK[bg_key],
            theme="Dark",
            note="KEY – used in disabled/placeholder states" if "muted" in label else "",
        ))

    # ── Normal (blue) theme – light overrides ─────────────────
    pairs.append(PairSpec(
        label="primary-foreground on primary",
        fg=NORMAL_LIGHT["primary-foreground"], bg=NORMAL_LIGHT["primary"],
        theme="Normal-Light",
    ))
    pairs.append(PairSpec(
        label="accent-foreground on accent",
        fg=NORMAL_LIGHT["accent-foreground"], bg=NORMAL_LIGHT["accent"],
        theme="Normal-Light",
    ))

    # ── Normal (blue) theme – dark overrides ──────────────────
    pairs.append(PairSpec(
        label="primary-foreground on primary",
        fg=NORMAL_DARK["primary-foreground"], bg=NORMAL_DARK["primary"],
        theme="Normal-Dark",
    ))
    pairs.append(PairSpec(
        label="accent-foreground on accent",
        fg=NORMAL_DARK["accent-foreground"], bg=NORMAL_DARK["accent"],
        theme="Normal-Dark",
    ))

    return pairs


# Hardcoded component colours
HARDCODED_PAIRS = [
    PairSpec("Alert – success:  white on #047857 (emerald-700)",  "#ffffff", "#047857", "Component", "alert.tsx"),
    PairSpec("Alert – warning:  white on #b45309 (amber-700)",    "#ffffff", "#b45309", "Component", "alert.tsx"),
    PairSpec("Alert – error:    white on #e11d48",                "#ffffff", "#e11d48", "Component", "alert.tsx / rose-600"),
]


# ──────────────────────────────────────────────────────────────
# Evaluation
# ──────────────────────────────────────────────────────────────

THRESHOLD_AA_NORMAL = 4.5
THRESHOLD_AA_LARGE  = 3.0
THRESHOLD_AAA       = 7.0


def evaluate(pair: PairSpec) -> dict:
    ratio = contrast_ratio(pair.fg, pair.bg)
    aa_normal = ratio >= THRESHOLD_AA_NORMAL
    aa_large  = ratio >= THRESHOLD_AA_LARGE
    aaa       = ratio >= THRESHOLD_AAA
    if aa_normal:
        status = "✅ PASS AA"
        if aaa:
            status = "🏆 PASS AAA"
    elif aa_large:
        status = "⚠️  PASS AA-Large only"
    else:
        status = "❌ FAIL"
    return {
        "label":     pair.label,
        "fg":        pair.fg,
        "bg":        pair.bg,
        "theme":     pair.theme,
        "note":      pair.note,
        "ratio":     ratio,
        "aa_normal": aa_normal,
        "aa_large":  aa_large,
        "aaa":       aaa,
        "status":    status,
    }


# ──────────────────────────────────────────────────────────────
# Reporting
# ──────────────────────────────────────────────────────────────

def print_report(results: list[dict]) -> None:
    col_w = [45, 9, 9, 10, 8, 10, 24, 20]
    headers = ["Color Pair", "Theme", "FG", "BG", "Ratio", "AA≥4.5", "AA-Large≥3.0", "Status"]
    sep = "+" + "+".join("-" * w for w in col_w) + "+"

    def row(*cells):
        parts = []
        for cell, w in zip(cells, col_w):
            s = str(cell)
            parts.append(s[:w].ljust(w))
        return "|" + "|".join(parts) + "|"

    print(sep)
    print(row(*headers))
    print(sep)
    for r in results:
        print(row(
            r["label"],
            r["theme"],
            r["fg"],
            r["bg"],
            f"{r['ratio']:.2f}:1",
            "✅" if r["aa_normal"] else "❌",
            "✅" if r["aa_large"] else "❌",
            r["status"],
        ))
    print(sep)


def emit_markdown(token_results: list[dict], hc_results: list[dict]) -> str:
    lines: list[str] = []

    lines.append("# ORYN UI — WCAG Contrast Ratio Audit Report\n")
    lines.append("> Generated by `audit/scripts/contrast_check.py`  \n")
    lines.append("> WCAG 2.1 thresholds: AA Normal ≥ 4.5:1 | AA Large/UI ≥ 3:1 | AAA ≥ 7:1\n")
    lines.append("")

    # ── Summary ───────────────────────────────────────────────
    all_results = token_results + hc_results
    fails_aa   = [r for r in all_results if not r["aa_normal"]]
    fails_all  = [r for r in all_results if not r["aa_large"]]
    warns      = [r for r in all_results if r["aa_large"] and not r["aa_normal"]]

    lines.append("## Summary\n")
    lines.append(f"| Metric | Count |")
    lines.append(f"|--------|-------|")
    lines.append(f"| Total pairs audited | {len(all_results)} |")
    lines.append(f"| ✅ Pass AA (≥ 4.5:1) | {len(all_results) - len(fails_aa)} |")
    lines.append(f"| ⚠️  Pass AA-Large only (3–4.5:1) | {len(warns)} |")
    lines.append(f"| ❌ Fail all WCAG levels | {len(fails_all)} |")
    lines.append("")

    if fails_all:
        lines.append("> [!CAUTION]")
        lines.append(f"> **{len(fails_all)} pair(s) fail even the AA-Large (3:1) threshold and must be fixed.**\n")

    if fails_aa:
        lines.append("> [!WARNING]")
        lines.append(f"> **{len(fails_aa)} pair(s) fail WCAG AA Normal Text (4.5:1).**\n")

    # ── Design Token pairs ────────────────────────────────────
    lines.append("## Design Token Pairs\n")
    lines.append("| Color Pair | Theme | FG | BG | Ratio | AA Normal (4.5:1) | AA Large/UI (3:1) | Status | Note |")
    lines.append("|---|---|---|---|---|---|---|---|---|")
    for r in token_results:
        aa_n = "✅" if r["aa_normal"] else "❌"
        aa_l = "✅" if r["aa_large"] else "❌"
        note = r["note"] if r["note"] else ""
        lines.append(
            f"| {r['label']} | {r['theme']} | `{r['fg']}` | `{r['bg']}` "
            f"| **{r['ratio']:.2f}:1** | {aa_n} | {aa_l} | {r['status']} | {note} |"
        )
    lines.append("")

    # ── KEY CHECK callout ──────────────────────────────────────
    muted_results = [r for r in token_results if "muted" in r["label"]]
    lines.append("### 🔍 KEY CHECK — muted-foreground on muted\n")
    lines.append("This pair is used heavily for disabled inputs, placeholders, and secondary labels.\n")
    for r in muted_results:
        flag = "❌ **FAILS AA**" if not r["aa_normal"] else "✅ Passes AA"
        lines.append(f"- **{r['theme']}**: `{r['fg']}` on `{r['bg']}` → **{r['ratio']:.2f}:1** — {flag}")
    lines.append("")

    # ── Hardcoded component colours ───────────────────────────
    lines.append("## Hardcoded Component Colours\n")
    lines.append("These are literal hex values baked into component JSX (alert.tsx, timeline.tsx).\n")
    lines.append("| Color Pair | FG | BG | Ratio | AA Normal (4.5:1) | AA Large/UI (3:1) | Status | Source |")
    lines.append("|---|---|---|---|---|---|---|---|")
    for r in hc_results:
        aa_n = "✅" if r["aa_normal"] else "❌"
        aa_l = "✅" if r["aa_large"] else "❌"
        lines.append(
            f"| {r['label']} | `{r['fg']}` | `{r['bg']}` "
            f"| **{r['ratio']:.2f}:1** | {aa_n} | {aa_l} | {r['status']} | {r['note']} |"
        )
    lines.append("")

    # ── Failing pairs detail ───────────────────────────────────
    if fails_aa:
        lines.append("## ❌ All Failing Pairs (AA Normal Text < 4.5:1)\n")
        for r in fails_aa:
            level = "FAILS ALL" if not r["aa_large"] else "FAILS AA-Normal only"
            lines.append(f"### `{r['label']}` — {r['theme']}")
            lines.append(f"- **FG**: `{r['fg']}`  **BG**: `{r['bg']}`")
            lines.append(f"- **Ratio**: {r['ratio']:.2f}:1 — **{level}**")
            if r["note"]:
                lines.append(f"- **Note**: {r['note']}")
            lines.append(f"- **Recommended fix**: Darken the foreground colour or lighten the background until the ratio reaches ≥ 4.5:1.")
            lines.append("")

    # ── Methodology ───────────────────────────────────────────
    lines.append("## Methodology\n")
    lines.append("Contrast ratio computed per [WCAG 2.1 §1.4.3](https://www.w3.org/TR/WCAG21/#contrast-minimum):\n")
    lines.append("```")
    lines.append("relative_luminance(c) = 0.2126 R + 0.7152 G + 0.0722 B  (linearised sRGB)")
    lines.append("contrast_ratio(L1, L2) = (lighter + 0.05) / (darker + 0.05)")
    lines.append("```")
    lines.append("")

    return "\n".join(lines)


# ──────────────────────────────────────────────────────────────
# Entry point
# ──────────────────────────────────────────────────────────────

def main() -> None:
    token_pairs   = _make_pairs()
    token_results = [evaluate(p) for p in token_pairs]
    hc_results    = [evaluate(p) for p in HARDCODED_PAIRS]

    print("\n=== ORYN UI WCAG Contrast Audit ===\n")

    print("\n--- Design Token Pairs ---")
    print_report(token_results)

    print("\n--- Hardcoded Component Colours ---")
    print_report(hc_results)

    # Failing summary to stdout
    all_results = token_results + hc_results
    fails = [r for r in all_results if not r["aa_normal"]]
    print(f"\n{'='*60}")
    print(f"FAILING PAIRS (AA Normal < 4.5:1): {len(fails)}")
    print(f"{'='*60}")
    for r in fails:
        print(f"  ❌ [{r['theme']}] {r['label']}")
        print(f"      {r['fg']} on {r['bg']} → {r['ratio']:.2f}:1")
    print()

    # Write markdown report
    md = emit_markdown(token_results, hc_results)
    report_path = (
        "/home/saswatranjanmohanty/Desktop/personal projects/mad-ui"
        "/audit/contrast-report.md"
    )
    with open(report_path, "w", encoding="utf-8") as f:
        f.write(md)
    print(f"Report written → {report_path}")


if __name__ == "__main__":
    main()

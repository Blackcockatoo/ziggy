#!/usr/bin/env python3
"""Build the Ziggy Old Vic State stationery cupboard.

The output is deliberately split into useful objects rather than one specimen
book: fillable A4 forms, correctly sized small-format pieces, practical print
sheets, a combined suite, web metadata, and one complete ZIP.
"""

from __future__ import annotations

import argparse
import json
import math
import zipfile
from pathlib import Path

from PIL import Image
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import A4, A6, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


IVORY = HexColor("#F3E7C9")
IVORY_LIGHT = HexColor("#FBF3DF")
INK = HexColor("#16130E")
INK_SOFT = HexColor("#645A49")
GREEN = HexColor("#0B3428")
GREEN_LIGHT = HexColor("#16483A")
GOLD = HexColor("#B9862E")
GOLD_LIGHT = HexColor("#D7B86F")
GOLD_FAINT = HexColor("#CDBA8C")
BURGUNDY = HexColor("#5A2022")
SILVER = HexColor("#B9B7AE")
WHITE = HexColor("#FFF8E8")

MM = 72 / 25.4
TICKET = (80 * MM, 180 * MM)

FONT_ROOT = Path("/usr/share/fonts/truetype/dejavu")
pdfmetrics.registerFont(TTFont("ZigSerif", FONT_ROOT / "DejaVuSerif.ttf"))
pdfmetrics.registerFont(TTFont("ZigSerifBold", FONT_ROOT / "DejaVuSerif-Bold.ttf"))
pdfmetrics.registerFont(TTFont("ZigSerifItalic", FONT_ROOT / "DejaVuSerif.ttf"))
pdfmetrics.registerFont(TTFont("ZigSans", FONT_ROOT / "DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("ZigSansBold", FONT_ROOT / "DejaVuSans-Bold.ttf"))


def set_alpha(c: canvas.Canvas, *, fill: float | None = None, stroke: float | None = None) -> None:
    if fill is not None and hasattr(c, "setFillAlpha"):
        c.setFillAlpha(fill)
    if stroke is not None and hasattr(c, "setStrokeAlpha"):
        c.setStrokeAlpha(stroke)


def diamond(c: canvas.Canvas, x: float, y: float, size: float, fill=GOLD) -> None:
    p = c.beginPath()
    p.moveTo(x, y + size)
    p.lineTo(x + size, y)
    p.lineTo(x, y - size)
    p.lineTo(x - size, y)
    p.close()
    c.setFillColor(fill)
    c.drawPath(p, fill=1, stroke=0)


def seal(c: canvas.Canvas, x: float, y: float, r: float, *, dark: bool = False, tiny: bool = False) -> None:
    """Draw a clean vector seal so no moodboard crop survives into production."""
    c.saveState()
    ground = INK if dark else GREEN
    c.setFillColor(ground)
    c.setStrokeColor(GOLD)
    c.setLineWidth(max(0.7, r * 0.035))
    c.circle(x, y, r, fill=1, stroke=1)
    c.setStrokeColor(GOLD_LIGHT)
    c.circle(x, y, r * 0.79, fill=0, stroke=1)
    c.circle(x, y, r * 0.58, fill=0, stroke=1)

    for angle in range(0, 360, 45):
        a = math.radians(angle)
        diamond(c, x + math.cos(a) * r * 0.69, y + math.sin(a) * r * 0.69, max(1.2, r * 0.045), GOLD_LIGHT)

    c.setFillColor(GOLD_LIGHT)
    c.setFont("ZigSerifBold", max(9, r * 0.82))
    c.drawCentredString(x, y - r * 0.23, "Z")
    if not tiny:
        c.setFont("ZigSansBold", max(4, r * 0.12))
        c.drawCentredString(x, y + r * 0.40, "OLD VIC STATE")
        c.drawCentredString(x, y - r * 0.47, "FRANKSTON 3196")
    c.restoreState()


def corner_flourish(c: canvas.Canvas, x: float, y: float, sx: int, sy: int) -> None:
    c.saveState()
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.8)
    c.line(x, y, x + sx * 26, y)
    c.line(x, y, x, y + sy * 26)
    c.arc(x - (0 if sx > 0 else 20), y - (0 if sy > 0 else 20), x + sx * 20, y + sy * 20, 0, 90)
    diamond(c, x + sx * 9, y + sy * 9, 2.4)
    c.restoreState()


def draw_background(c: canvas.Canvas, width: float, height: float, *, dark: bool = False) -> None:
    c.setFillColor(INK if dark else IVORY)
    c.rect(0, 0, width, height, fill=1, stroke=0)
    if dark:
        return
    c.saveState()
    c.setStrokeColor(Color(0.45, 0.36, 0.20, alpha=0.055))
    c.setLineWidth(0.22)
    for y in range(18, int(height), 8):
        c.line(0, y, width, y + 1.5)
    c.restoreState()


def frame(c: canvas.Canvas, width: float, height: float, code: str, *, compact: bool = False) -> None:
    outer = 20 if compact else 27
    inner = outer + 8
    c.saveState()
    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    c.rect(outer, outer, width - outer * 2, height - outer * 2, fill=0, stroke=1)
    c.setStrokeColor(GREEN)
    c.setLineWidth(0.5)
    c.rect(inner, inner, width - inner * 2, height - inner * 2, fill=0, stroke=1)
    corner_flourish(c, inner + 5, inner + 5, 1, 1)
    corner_flourish(c, width - inner - 5, inner + 5, -1, 1)
    corner_flourish(c, inner + 5, height - inner - 5, 1, -1)
    corner_flourish(c, width - inner - 5, height - inner - 5, -1, -1)
    if not compact:
        c.setStrokeColor(GOLD)
        c.line(45, 47, width - 45, 47)
        c.setFillColor(GREEN)
        c.setFont("ZigSansBold", 6.7)
        c.drawString(45, 37, "OLD VIC STATE - FICTIONAL CEREMONIAL LAYER - CONTEMPORARY CREATIVE WORK")
        c.setFillColor(GOLD)
        c.setFont("ZigSerifBold", 9)
        c.drawRightString(width - 45, 37, code)
    c.restoreState()


def header(c: canvas.Canvas, width: float, height: float, code: str, title: str, subtitle: str) -> None:
    draw_background(c, width, height)
    frame(c, width, height, code)

    c.setFillColor(GREEN)
    c.roundRect(45, height - 111, width - 90, 62, 7, fill=1, stroke=0)
    seal(c, 76, height - 80, 23, dark=True, tiny=True)
    c.setFillColor(GOLD_LIGHT)
    c.setFont("ZigSerifBold", 22)
    c.drawString(108, height - 75, "ZIGGY")
    c.setFillColor(WHITE)
    c.setFont("ZigSansBold", 7.5)
    c.drawString(108, height - 93, "THE MONKEY SHOP  /  FRANKSTON 3196  /  EST. 1996")

    c.setFillColor(INK)
    display_title = title.upper()
    title_size = min(21, (width - 96) / pdfmetrics.stringWidth(display_title, "ZigSerifBold", 1))
    c.setFont("ZigSerifBold", title_size)
    c.drawString(48, height - 155, display_title)
    c.setFillColor(INK_SOFT)
    subtitle_size = min(9, (width - 96) / pdfmetrics.stringWidth(subtitle, "ZigSans", 1))
    c.setFont("ZigSans", subtitle_size)
    c.drawString(48, height - 171, subtitle)


def section_label(c: canvas.Canvas, label: str, x: float, y: float, *, dark: bool = False) -> None:
    c.setFillColor(GOLD_LIGHT if dark else GREEN)
    c.setFont("ZigSansBold", 7.2)
    c.drawString(x, y, label.upper())


def form_text(
    c: canvas.Canvas,
    name: str,
    x: float,
    y: float,
    width: float,
    height: float,
    *,
    multiline: bool = False,
    value: str = "",
    forms: bool = True,
    dark: bool = False,
    font_size: float = 9,
) -> None:
    fill = Color(1, 0.98, 0.91, alpha=0.55) if not dark else Color(0.03, 0.10, 0.08, alpha=0.82)
    border = GOLD_FAINT if not dark else GOLD
    c.saveState()
    c.setFillColor(fill)
    c.setStrokeColor(border)
    c.setLineWidth(0.55)
    c.roundRect(x, y, width, height, 3, fill=1, stroke=1)
    if not forms and value:
        c.setFillColor(WHITE if dark else INK)
        c.setFont("ZigSans", font_size)
        lines = value.split("\n")
        for index, line in enumerate(lines[: max(1, int(height // 12))]):
            c.drawString(x + 7, y + height - 12 - index * 11, line)
    c.restoreState()
    if forms:
        flags = "multiline" if multiline else ""
        c.acroForm.textfield(
            name=name,
            tooltip=name.replace("_", " ").title(),
            x=x + 1,
            y=y + 1,
            width=width - 2,
            height=height - 2,
            value="",
            borderWidth=0,
            fillColor=IVORY_LIGHT if not dark else GREEN,
            textColor=INK if not dark else WHITE,
            fontName="Helvetica",
            fontSize=font_size,
            fieldFlags=flags,
        )


def labelled_field(
    c: canvas.Canvas,
    label: str,
    name: str,
    x: float,
    y: float,
    width: float,
    height: float = 24,
    *,
    forms: bool = True,
    value: str = "",
    multiline: bool = False,
) -> None:
    section_label(c, label, x, y + height + 6)
    form_text(c, name, x, y, width, height, forms=forms, value=value, multiline=multiline)


def radio_option(c: canvas.Canvas, group: str, value: str, label: str, x: float, y: float, *, forms: bool) -> None:
    c.saveState()
    c.setStrokeColor(GOLD)
    c.setFillColor(IVORY_LIGHT)
    c.rect(x, y, 12, 12, fill=1, stroke=1)
    c.setFillColor(WHITE)
    c.setFont("ZigSansBold", 6.5)
    c.drawString(x + 17, y + 2.5, label.upper())
    c.restoreState()
    if forms:
        c.acroForm.radio(
            name=group,
            tooltip=group.replace("_", " ").title(),
            value=value,
            x=x,
            y=y,
            buttonStyle="check",
            shape="square",
            selected=False,
            borderWidth=1,
            borderColor=GOLD,
            fillColor=IVORY_LIGHT,
            textColor=GREEN,
            size=12,
            forceBorder=True,
        )


def draw_image_contain(c: canvas.Canvas, path: Path, x: float, y: float, width: float, height: float) -> None:
    if not path.exists():
        return
    image = Image.open(path)
    iw, ih = image.size
    scale = min(width / iw, height / ih)
    dw, dh = iw * scale, ih * scale
    c.drawImage(ImageReader(image), x + (width - dw) / 2, y + (height - dh) / 2, dw, dh, mask="auto")


def page_letterhead(c: canvas.Canvas, forms: bool, assets: dict[str, Path]) -> None:
    width, height = A4
    header(c, width, height, "01", "Letterhead", "Correspondence of the unnecessarily dignified local kind")
    labelled_field(c, "Date", "letter_date", 55, 620, 145, forms=forms)
    labelled_field(c, "To", "letter_to", 218, 620, 322, forms=forms)
    labelled_field(c, "Subject", "letter_subject", 55, 570, 485, forms=forms)
    section_label(c, "Correspondence", 55, 545)
    form_text(c, "letter_body", 55, 88, 485, 445, forms=forms, multiline=True)


def page_memo(c: canvas.Canvas, forms: bool, assets: dict[str, Path]) -> None:
    width, height = A4
    header(c, width, height, "02", "Memorandum / Briefing Note", "Cabinet-office seriousness for practical creative decisions")
    labelled_field(c, "From", "memo_from", 55, 620, 225, forms=forms)
    labelled_field(c, "To", "memo_to", 315, 620, 225, forms=forms)
    labelled_field(c, "Date", "memo_date", 55, 570, 145, forms=forms)
    labelled_field(c, "Reference", "memo_reference", 218, 570, 150, forms=forms)
    labelled_field(c, "Status", "memo_status", 386, 570, 154, forms=forms, value="DRAFT / REVIEW / APPROVED")
    labelled_field(c, "Subject", "memo_subject", 55, 520, 485, forms=forms)
    labelled_field(c, "Purpose", "memo_purpose", 55, 395, 485, 96, forms=forms, multiline=True)
    labelled_field(c, "Key points", "memo_key_points", 55, 225, 485, 142, forms=forms, multiline=True)
    labelled_field(c, "Decision / next move", "memo_decision", 55, 80, 485, 116, forms=forms, multiline=True)


def page_certificate(c: canvas.Canvas, forms: bool, assets: dict[str, Path]) -> None:
    width, height = A4
    header(c, width, height, "03", "Certificate of Appreciation", "Full ceremonial setting - because gratitude may wear a crown")
    seal(c, width / 2, 598, 53)
    c.setFillColor(GOLD)
    c.setFont("ZigSansBold", 8)
    c.drawCentredString(width / 2, 524, "THIS CERTIFIES THAT")
    form_text(c, "certificate_name", 88, 459, 419, 48, forms=forms, font_size=23)
    c.setFillColor(INK)
    c.setFont("ZigSerif", 12)
    c.drawCentredString(width / 2, 433, "is recognised with gratitude for")
    form_text(c, "certificate_reason", 95, 330, 405, 82, forms=forms, multiline=True, font_size=12)
    c.setFont("ZigSerifItalic", 10)
    c.drawCentredString(width / 2, 300, "and for remaining part of the living story around The Monkey Shop, Frankston.")

    c.setStrokeColor(GOLD)
    c.line(75, 144, 240, 144)
    c.line(355, 144, 520, 144)
    c.setFillColor(GREEN)
    c.setFont("ZigSansBold", 7)
    c.drawCentredString(157, 129, "SIGNATURE")
    c.drawCentredString(437, 129, "DATE")
    if forms:
        c.acroForm.textfield(name="certificate_signature", tooltip="Signature", x=76, y=146, width=162, height=20, borderWidth=0, fillColor=IVORY_LIGHT, textColor=INK, fontName="Helvetica", fontSize=10)
        c.acroForm.textfield(name="certificate_date", tooltip="Date", x=356, y=146, width=162, height=20, borderWidth=0, fillColor=IVORY_LIGHT, textColor=INK, fontName="Helvetica", fontSize=10)
    seal(c, width / 2, 126, 28, tiny=True)
    draw_image_contain(c, assets["ziggy"], 468, 182, 72, 126)


def page_archive(c: canvas.Canvas, forms: bool, assets: dict[str, Path]) -> None:
    width, height = A4
    header(c, width, height, "04", "Archive Intake Record", "No homework. One object, photo, paper or memory at a time.")
    labelled_field(c, "Item / file", "archive_item", 55, 620, 485, forms=forms)
    labelled_field(c, "Source", "archive_source", 55, 570, 315, forms=forms)
    labelled_field(c, "Approx. period", "archive_period", 388, 570, 152, forms=forms)
    labelled_field(c, "People shown", "archive_people", 55, 520, 315, forms=forms)
    labelled_field(c, "Restrictions", "archive_restrictions", 388, 520, 152, forms=forms)
    section_label(c, "Evidence status", 55, 487)
    c.setFillColor(GREEN)
    c.roundRect(55, 453, 485, 28, 4, fill=1, stroke=0)
    radio_option(c, "archive_evidence", "documented", "Documented", 74, 461, forms=forms)
    radio_option(c, "archive_evidence", "confirm", "Needs confirming", 181, 461, forms=forms)
    radio_option(c, "archive_evidence", "lore", "Local lore", 319, 461, forms=forms)
    radio_option(c, "archive_evidence", "creative", "Creative interpretation", 406, 461, forms=forms)
    labelled_field(c, "What is it?", "archive_description", 55, 325, 485, 94, forms=forms, multiline=True)
    labelled_field(c, "Why might it matter?", "archive_significance", 55, 196, 485, 96, forms=forms, multiline=True)
    labelled_field(c, "Curator note", "archive_curator_note", 55, 73, 485, 90, forms=forms, multiline=True)


STEERING = [
    "Full / Mild / Sugar-Free as the creative dial",
    "Frankston 3196 as provenance",
    "Old Vic State as fictional ceremonial theatre",
    "Air freshener - THE ZIG",
    "Playing-card deck",
    "Frankston calendar",
    "Stationery / ephemera system",
]


def page_steering(c: canvas.Canvas, forms: bool, assets: dict[str, Path]) -> None:
    width, height = A4
    header(c, width, height, "05", "Owner Steering Sheet", "One page. No homework. Mark what feels right.")
    row_y = 617
    for index, item in enumerate(STEERING, 1):
        c.setFillColor(GREEN if index % 2 else GREEN_LIGHT)
        c.roundRect(55, row_y, 485, 49, 6, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("ZigSerifBold", 10.2)
        c.drawString(70, row_y + 19, item)
        radio_option(c, f"steer_{index}", "keep", "Keep", 358, row_y + 18, forms=forms)
        radio_option(c, f"steer_{index}", "park", "Park", 422, row_y + 18, forms=forms)
        radio_option(c, f"steer_{index}", "confirm", "Confirm", 480, row_y + 18, forms=forms)
        row_y -= 63
    labelled_field(c, "One sentence only", "steering_note", 55, 75, 485, 74, forms=forms, multiline=True)


PRODUCT_SPECS = [
    ("Primary job", "Desirable object + learnable distance recognition"),
    ("Silhouette", "Paired ear curves / proprietary dark body"),
    ("Centre", "Small gold knot"),
    ("Reflection cue", "Shallow tray silver interruption"),
    ("Micro cue", "One cream diamond + 3196"),
    ("Front", "Restrained mystery / very little text"),
    ("Back", "Reward: Ziggy / 3196 / scent / quiet line"),
]


def page_product(c: canvas.Canvas, forms: bool, assets: dict[str, Path]) -> None:
    width, height = A4
    header(c, width, height, "06", "Product Development Record", "Air freshener / THE ZIG - design record and working decision sheet")
    c.setFillColor(INK)
    c.roundRect(93, 414, 409, 226, 5, fill=1, stroke=0)
    c.setStrokeColor(GOLD)
    c.rect(98, 419, 399, 216, fill=0, stroke=1)
    draw_image_contain(c, assets["product"], 102, 423, 391, 208)

    labelled_field(c, "Version", "product_version", 55, 364, 105, 21, forms=forms)
    labelled_field(c, "Status", "product_status", 178, 364, 150, 21, forms=forms)
    labelled_field(c, "Review date", "product_review_date", 346, 364, 100, 21, forms=forms)
    labelled_field(c, "Owner", "product_owner", 464, 364, 76, 21, forms=forms)

    y = 320
    for index, (label, value) in enumerate(PRODUCT_SPECS, 1):
        section_label(c, label, 55, y + 9)
        form_text(c, f"product_spec_{index}", 165, y - 2, 375, 23, forms=False, value=value, font_size=8.1)
        y -= 35


def card_face(c: canvas.Canvas, x: float, y: float, width: float, height: float, assets: dict[str, Path]) -> None:
    c.saveState()
    c.setFillColor(GREEN)
    c.roundRect(x, y, width, height, 8, fill=1, stroke=0)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    c.roundRect(x + 8, y + 8, width - 16, height - 16, 5, fill=0, stroke=1)
    c.setStrokeColor(GOLD_LIGHT)
    c.setLineWidth(0.45)
    c.roundRect(x + 13, y + 13, width - 26, height - 26, 4, fill=0, stroke=1)
    seal(c, x + width * 0.16, y + height * 0.51, height * 0.19, dark=True)
    c.setFillColor(GOLD_LIGHT)
    card_title = "WITH COMPLIMENTS"
    title_size = min(height * 0.075, (width * 0.54) / pdfmetrics.stringWidth(card_title, "ZigSerifBold", 1))
    c.setFont("ZigSerifBold", max(14, title_size))
    c.drawCentredString(x + width * 0.66, y + height * 0.58, card_title)
    c.setFillColor(WHITE)
    c.setFont("ZigSansBold", max(5.5, height * 0.032))
    c.drawCentredString(x + width * 0.66, y + height * 0.43, "GOOD FORTUNE FAVOURS THE LOCAL.")
    c.setFillColor(GOLD_LIGHT)
    c.setFont("ZigSansBold", max(4.5, height * 0.023))
    c.drawCentredString(x + width * 0.66, y + height * 0.27, "ZIGGY  /  FRANKSTON 3196  /  EST. 1996")
    c.restoreState()


def page_compliments(c: canvas.Canvas, forms: bool, assets: dict[str, Path]) -> None:
    width, height = landscape(A6)
    draw_background(c, width, height, dark=True)
    card_face(c, 0, 0, width, height, assets)


def crop_mark(c: canvas.Canvas, x: float, y: float, width: float, height: float, length: float = 8) -> None:
    c.saveState()
    c.setStrokeColor(INK_SOFT)
    c.setLineWidth(0.35)
    for px, py, sx, sy in [
        (x, y, -1, -1), (x + width, y, 1, -1),
        (x, y + height, -1, 1), (x + width, y + height, 1, 1),
    ]:
        c.line(px, py, px + sx * length, py)
        c.line(px, py, px, py + sy * length)
    c.restoreState()


def page_compliments_sheet(c: canvas.Canvas, assets: dict[str, Path]) -> None:
    width, height = landscape(A4)
    draw_background(c, width, height)
    c.setFillColor(INK)
    c.setFont("ZigSerifBold", 13)
    c.drawString(22, height - 20, "WITH COMPLIMENTS - A6 PRINT SHEET / FOUR UP")
    c.setFont("ZigSans", 6.5)
    c.drawRightString(width - 22, height - 20, "Print at 100% / cut on marks")
    cell_w, cell_h = width / 2, height / 2
    margin = 8
    for row in range(2):
        for col in range(2):
            x = col * cell_w + margin
            y = row * cell_h + margin
            w = cell_w - margin * 2
            h = cell_h - margin * 2
            card_face(c, x, y, w, h, assets)
            crop_mark(c, x, y, w, h, 6)


def ticket_face(c: canvas.Canvas, x: float, y: float, width: float, height: float, forms: bool, prefix: str) -> None:
    c.saveState()
    c.setFillColor(IVORY_LIGHT)
    c.roundRect(x, y, width, height, 7, fill=1, stroke=0)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    c.roundRect(x + 6, y + 6, width - 12, height - 12, 5, fill=0, stroke=1)
    c.setDash(2, 2)
    c.setStrokeColor(GREEN)
    c.roundRect(x + 12, y + 12, width - 24, height - 24, 3, fill=0, stroke=1)
    c.setDash()
    seal(c, x + width / 2, y + height - 58, min(31, width * 0.18))
    c.setFillColor(INK)
    c.setFont("ZigSerifBold", min(15, width * 0.08))
    c.drawCentredString(x + width / 2, y + height - 101, "THE MONKEY SHOP")
    c.setFillColor(GOLD)
    c.setFont("ZigSansBold", min(6.5, width * 0.035))
    c.drawCentredString(x + width / 2, y + height - 116, "FRANKSTON 3196  /  EST. 1996")
    c.setStrokeColor(GOLD_FAINT)
    c.line(x + 24, y + height - 132, x + width - 24, y + height - 132)

    rows = [
        ("ITEM", "THIRTY YEARS OF LOCAL LIFE"),
        ("QTY", "1"),
        ("PRICE", "ALREADY PAID IN TIME"),
        ("CHANGE", "STILL HERE"),
        ("STATUS", "KEEP THE MONKEY"),
    ]
    row_y = y + height - 158
    for label, value in rows:
        c.setFillColor(INK)
        c.setFont("ZigSansBold", 6.2)
        c.drawString(x + 25, row_y, label)
        c.setFont("ZigSans", 6.1)
        c.drawRightString(x + width - 25, row_y, value)
        row_y -= 29

    c.setStrokeColor(GOLD_FAINT)
    c.line(x + 24, row_y + 9, x + width - 24, row_y + 9)
    c.setFillColor(GREEN)
    c.setFont("ZigSerifBold", 10)
    c.drawCentredString(x + width / 2, row_y - 18, "YOU CAME IN FOR ONE THING.")
    c.setFillColor(GOLD)
    c.setFont("ZigSansBold", 6)
    c.drawCentredString(x + width / 2, row_y - 38, "GOOD FORTUNE FAVOURS THE LOCAL.")

    if forms:
        base_y = y + 44
        section_label(c, "Issued to", x + 23, base_y + 54)
        form_text(c, f"{prefix}_issued_to", x + 23, base_y + 30, width - 46, 20, forms=True, font_size=7)
        form_text(c, f"{prefix}_serial", x + 23, base_y, (width - 52) * 0.55, 20, forms=True, font_size=7)
        form_text(c, f"{prefix}_date", x + 29 + (width - 52) * 0.55, base_y, (width - 52) * 0.45, 20, forms=True, font_size=7)
        c.setFillColor(INK_SOFT)
        c.setFont("ZigSansBold", 5)
        c.drawString(x + 26, base_y + 22, "SERIAL")
        c.drawString(x + 34 + (width - 52) * 0.55, base_y + 22, "DATE")
    else:
        c.setFillColor(INK_SOFT)
        c.setFont("ZigSansBold", 5.4)
        c.drawString(x + 24, y + 63, "ISSUED TO __________________________")
        c.drawString(x + 24, y + 43, "SERIAL ____________   DATE ____________")
    c.restoreState()


def page_ticket(c: canvas.Canvas, forms: bool, assets: dict[str, Path]) -> None:
    width, height = TICKET
    draw_background(c, width, height)
    ticket_face(c, 0, 0, width, height, forms, "ticket")


def page_ticket_sheet(c: canvas.Canvas, assets: dict[str, Path]) -> None:
    width, height = landscape(A4)
    draw_background(c, width, height)
    c.setFillColor(INK)
    c.setFont("ZigSerifBold", 13)
    c.drawString(22, height - 20, "COMMEMORATIVE RECEIPT / ARCHIVE TICKET - THREE UP")
    c.setFont("ZigSans", 6.5)
    c.drawRightString(width - 22, height - 20, "Print at 100% / cut on marks")
    tw, th = TICKET
    gap = 18
    total = tw * 3 + gap * 2
    start_x = (width - total) / 2
    y = (height - th) / 2 - 3
    for index in range(3):
        x = start_x + index * (tw + gap)
        ticket_face(c, x, y, tw, th, False, f"sheet_{index}")
        crop_mark(c, x, y, tw, th, 7)


PAGES = [
    ("01-letterhead-fillable.pdf", page_letterhead, A4, True),
    ("02-memorandum-brief-fillable.pdf", page_memo, A4, True),
    ("03-certificate-of-appreciation-fillable.pdf", page_certificate, A4, True),
    ("04-archive-intake-record-fillable.pdf", page_archive, A4, True),
    ("05-owner-steering-sheet-fillable.pdf", page_steering, A4, True),
    ("06-product-development-record-fillable.pdf", page_product, A4, True),
    ("07-with-compliments-a6.pdf", page_compliments, landscape(A6), False),
    ("08-commemorative-archive-ticket-fillable.pdf", page_ticket, TICKET, True),
]


def configure_pdf(c: canvas.Canvas, title: str) -> None:
    c.setTitle(title)
    c.setAuthor("Blue $nake Studio")
    c.setSubject("Ziggy / The Monkey Shop / Frankston 3196 - Old Vic State fictional ceremonial stationery")
    c.setCreator("Blue $nake Studio - Ziggy Stationery Cupboard")
    c.setKeywords("Ziggy, The Monkey Shop, Frankston 3196, stationery, fictional ceremonial layer")


def build_single(path: Path, drawer, pagesize, forms: bool, assets: dict[str, Path]) -> None:
    c = canvas.Canvas(str(path), pagesize=pagesize, pageCompression=1)
    configure_pdf(c, path.stem.replace("-", " ").title())
    drawer(c, forms, assets)
    c.showPage()
    c.save()


def build_static_suite(path: Path, assets: dict[str, Path]) -> None:
    c = canvas.Canvas(str(path), pagesize=A4, pageCompression=1)
    configure_pdf(c, "Ziggy Old Vic State - Regal Stationery Suite 2026")
    for drawer in [page_letterhead, page_memo, page_certificate, page_archive, page_steering, page_product]:
        c.setPageSize(A4)
        drawer(c, False, assets)
        c.showPage()

    c.setPageSize(A4)
    header(c, A4[0], A4[1], "07", "With Compliments", "A6 calling card - actual-size PDF and four-up print sheet included")
    cw, ch = landscape(A6)
    card_face(c, (A4[0] - cw) / 2, 235, cw, ch, assets)
    c.showPage()

    c.setPageSize(A4)
    header(c, A4[0], A4[1], "08", "Commemorative Receipt / Archive Ticket", "Penny-arcade treasury docket - actual-size fillable PDF and print sheet included")
    tw, th = TICKET
    ticket_face(c, (A4[0] - tw) / 2, 118, tw, th, False, "suite_ticket")
    c.showPage()
    c.save()


def make_product_asset(source: Path | None, destination: Path) -> Path:
    if source and source.exists():
        image = Image.open(source).convert("RGB")
        destination.parent.mkdir(parents=True, exist_ok=True)
        image.save(destination, "WEBP", quality=92, method=6)
    if not destination.exists():
        raise FileNotFoundError("A product-development source image is required on the first build.")
    return destination


def write_manifest(download_dir: Path, files: list[Path]) -> None:
    data = {
        "title": "Ziggy Stationery Cupboard 2026",
        "fictional_layer": True,
        "notice": "Old Vic State is a fictional ceremonial layer, not a historical government identity or endorsement.",
        "files": [
            {"name": item.name, "bytes": item.stat().st_size, "format": item.suffix.lstrip(".").upper()}
            for item in files
        ],
    }
    (download_dir / "manifest.json").write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def write_readme(download_dir: Path) -> None:
    text = """ZIGGY STATIONERY CUPBOARD 2026
The Monkey Shop / Frankston 3196 / Est. 1996

WHAT IS INCLUDED
- Six A4 fillable working documents.
- One actual-size A6 With Compliments card.
- One four-up A4 card print sheet.
- One actual-size fillable archive ticket.
- One three-up A4 ticket print sheet.
- One combined eight-page stationery suite.

PRINTING
- Print working documents on A4 at 100%.
- Print card and ticket sheets at 100%, then cut on the marks.
- Fillable PDFs can be completed digitally or printed blank.

IMPORTANT
Old Vic State is an explicitly fictional ceremonial layer. It is not a historic
Victorian government identity, public authority, endorsement, or evidence.

Blue $nake Studio / contemporary creative work / 2026
"""
    (download_dir / "README.txt").write_text(text, encoding="utf-8")


def build_zip(download_dir: Path, files: list[Path]) -> Path:
    zip_path = download_dir / "ZIGGY_STATIONERY_CUPBOARD_2026.zip"
    temporary_path = download_dir / "ZIGGY_STATIONERY_CUPBOARD_2026.zip.tmp"
    members = [*files, download_dir / "README.txt", download_dir / "manifest.json"]
    with zipfile.ZipFile(temporary_path, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for item in members:
            archive.write(item, arcname=item.name)

    with zipfile.ZipFile(temporary_path, "r") as archive:
        if archive.testzip() is not None:
            raise RuntimeError("Stationery cupboard ZIP failed its integrity check.")
        if archive.namelist() != [item.name for item in members]:
            raise RuntimeError("Stationery cupboard ZIP is missing one or more expected files.")

    temporary_path.replace(zip_path)
    return zip_path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--product-source", type=Path)
    args = parser.parse_args()

    repo = args.repo.resolve()
    download_dir = repo / "public" / "downloads" / "ziggy-stationery"
    image_dir = repo / "public" / "images" / "ziggy" / "stationery"
    download_dir.mkdir(parents=True, exist_ok=True)
    image_dir.mkdir(parents=True, exist_ok=True)

    product_asset = make_product_asset(args.product_source, image_dir / "product-development-plate.webp")
    assets = {
        "ziggy": repo / "public" / "images" / "ziggy" / "character" / "ziggy-with-tray.webp",
        "product": product_asset,
    }

    built: list[Path] = []
    for filename, drawer, pagesize, forms in PAGES:
        path = download_dir / filename
        build_single(path, drawer, pagesize, forms, assets)
        built.append(path)

    card_sheet = download_dir / "07-with-compliments-a4-four-up-print-sheet.pdf"
    c = canvas.Canvas(str(card_sheet), pagesize=landscape(A4), pageCompression=1)
    configure_pdf(c, "Ziggy With Compliments - Four Up Print Sheet")
    page_compliments_sheet(c, assets)
    c.showPage()
    c.save()
    built.append(card_sheet)

    ticket_sheet = download_dir / "08-archive-ticket-a4-three-up-print-sheet.pdf"
    c = canvas.Canvas(str(ticket_sheet), pagesize=landscape(A4), pageCompression=1)
    configure_pdf(c, "Ziggy Archive Ticket - Three Up Print Sheet")
    page_ticket_sheet(c, assets)
    c.showPage()
    c.save()
    built.append(ticket_sheet)

    suite = download_dir / "ZIGGY_OLD_VIC_STATE_STATIONERY_SUITE_REGAL_2026.pdf"
    build_static_suite(suite, assets)
    built.append(suite)

    write_readme(download_dir)
    write_manifest(download_dir, built)
    build_zip(download_dir, built)

    for item in built:
        print(f"built {item.relative_to(repo)}")
    print(f"built {(download_dir / 'ZIGGY_STATIONERY_CUPBOARD_2026.zip').relative_to(repo)}")


if __name__ == "__main__":
    main()

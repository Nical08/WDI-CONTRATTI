import sys, re
sys.path.insert(0, r'C:\Users\jzl561\AppData\Local\Temp\pydeps')
from pathlib import Path
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'firma' / '01-CONTRATTO-SOCIALE-SNC.md'
OUT = ROOT / 'firma' / '01-CONTRATTO-SOCIALE-SNC.docx'
md = SRC.read_text(encoding='utf-8')
lines = md.replace('\r\n', '\n').split('\n')

doc = Document()

# Page setup A4
section = doc.sections[0]
section.page_width = Cm(21.0)
section.page_height = Cm(29.7)
section.top_margin = Cm(2.2)
section.bottom_margin = Cm(2.0)
section.left_margin = Cm(2.1)
section.right_margin = Cm(2.1)

# Base styles
styles = doc.styles
normal = styles['Normal']
normal.font.name = 'Georgia'
normal.font.size = Pt(10.5)
normal.paragraph_format.space_after = Pt(6)
normal.paragraph_format.line_spacing = 1.2
normal._element.rPr.rFonts.set(qn('w:eastAsia'), 'Georgia')

for name, size in [('Heading 1', 16), ('Heading 2', 12.5), ('Heading 3', 11)]:
    st = styles[name]
    st.font.name = 'Georgia'
    st.font.size = Pt(size)
    st.font.color.rgb = RGBColor(0x11, 0x11, 0x11)
    st.font.bold = True
    st.paragraph_format.keep_with_next = True
    st.paragraph_format.space_before = Pt(12 if name == 'Heading 2' else 16)
    st.paragraph_format.space_after = Pt(4)

# Core properties
doc.core_properties.title = 'Contratto sociale — WebDev Innovations SNC'
doc.core_properties.author = 'WebDev Innovations SNC'
doc.core_properties.subject = 'Società in nome collettivo — progetto di contratto'

def set_cell_shading(cell, hex_fill):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), hex_fill)
    tcPr.append(shd)

def set_repeat_header(row):
    trPr = row._tr.get_or_add_trPr()
    tblHeader = OxmlElement('w:tblHeader')
    tblHeader.set(qn('w:val'), 'true')
    trPr.append(tblHeader)

def add_runs(paragraph, text, base_bold=False, base_italic=False, size=None, color=None):
    parts = re.split(r'(\*\*.+?\*\*|(?<!\*)\*[^*\n]+?\*(?!\*))', text)
    for part in parts:
        if not part:
            continue
        bold = base_bold
        italic = base_italic
        txt = part
        if part.startswith('**') and part.endswith('**') and len(part) > 4:
            txt = part[2:-2]
            bold = True
        elif part.startswith('*') and part.endswith('*') and len(part) > 2:
            txt = part[1:-1]
            italic = True
        run = paragraph.add_run(txt)
        run.bold = bold
        run.italic = italic
        if size:
            run.font.size = Pt(size)
        if color:
            run.font.color.rgb = color

def add_bottom_border(paragraph, color='999999', size='4'):
    pPr = paragraph._p.get_or_add_pPr()
    pBdr = OxmlElement('w:pBdr')
    bottom = OxmlElement('w:bottom')
    bottom.set(qn('w:val'), 'single')
    bottom.set(qn('w:sz'), size)
    bottom.set(qn('w:space'), '4')
    bottom.set(qn('w:color'), color)
    pBdr.append(bottom)
    pPr.append(pBdr)

def add_paragraph(text, style=None, align=None, space_after=None, indent=None, first_line=None, italic=False, size=None, color=None):
    p = doc.add_paragraph(style=style)
    if align is not None:
        p.alignment = align
    if space_after is not None:
        p.paragraph_format.space_after = Pt(space_after)
    if indent is not None:
        p.paragraph_format.left_indent = Cm(indent)
    if first_line is not None:
        p.paragraph_format.first_line_indent = Cm(first_line)
    add_runs(p, text, base_italic=italic, size=size, color=color)
    return p

# Header / footer
header = section.header
hp = header.paragraphs[0]
hp.text = 'WebDev Innovations SNC · Progetto di contratto · riservato'
hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
for r in hp.runs:
    r.font.name = 'Georgia'
    r.font.size = Pt(7.5)
    r.font.color.rgb = RGBColor(0x77, 0x77, 0x77)

footer = section.footer
fp = footer.paragraphs[0]
fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = fp.add_run('WebDev Innovations SNC · Contratto sociale · pagina ')
run.font.name = 'Georgia'; run.font.size = Pt(7.5); run.font.color.rgb = RGBColor(0x77, 0x77, 0x77)
# PAGE field
fld_begin = OxmlElement('w:fldChar'); fld_begin.set(qn('w:fldCharType'), 'begin')
instr = OxmlElement('w:instrText'); instr.set(qn('xml:space'), 'preserve'); instr.text = 'PAGE'
fld_end = OxmlElement('w:fldChar'); fld_end.set(qn('w:fldCharType'), 'end')
run2 = fp.add_run(); run2.font.name = 'Georgia'; run2.font.size = Pt(7.5); run2.font.color.rgb = RGBColor(0x77, 0x77, 0x77)
run2._r.append(fld_begin); run2._r.append(instr); run2._r.append(fld_end)
run3 = fp.add_run(' di '); run3.font.name = 'Georgia'; run3.font.size = Pt(7.5); run3.font.color.rgb = RGBColor(0x77, 0x77, 0x77)
fld_begin2 = OxmlElement('w:fldChar'); fld_begin2.set(qn('w:fldCharType'), 'begin')
instr2 = OxmlElement('w:instrText'); instr2.set(qn('xml:space'), 'preserve'); instr2.text = 'NUMPAGES'
fld_end2 = OxmlElement('w:fldChar'); fld_end2.set(qn('w:fldCharType'), 'end')
run4 = fp.add_run(); run4.font.name = 'Georgia'; run4.font.size = Pt(7.5); run4.font.color.rgb = RGBColor(0x77, 0x77, 0x77)
run4._r.append(fld_begin2); run4._r.append(instr2); run4._r.append(fld_end2)

# Parser
i = 0
first_h1 = True
first_h2 = True
last_pagebreak = False
while i < len(lines):
    line = lines[i]
    stripped = line.strip()

    if not stripped:
        i += 1
        continue

    if stripped == '<!-- pagebreak -->':
        doc.add_page_break()
        last_pagebreak = True
        i += 1
        continue

    if stripped == '---':
        i += 1
        continue

    # Headings
    m = re.match(r'^(#{1,3})\s+(.*)$', line)
    if m:
        level = len(m.group(1))
        text = m.group(2).strip()
        if level == 1:
            if not first_h1 and not last_pagebreak:
                doc.add_page_break()
            p = doc.add_paragraph(style='Heading 1')
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            add_runs(p, text, base_bold=True, size=20 if first_h1 else 16)
            p.paragraph_format.space_before = Pt(0 if first_h1 else 14)
            p.paragraph_format.space_after = Pt(6)
            if first_h1:
                add_bottom_border(p, color='7A6A4F', size='8')
            first_h1 = False
            last_pagebreak = False
        elif level == 2:
            if first_h2 and 'WEBDEV' in text.upper():
                p = doc.add_paragraph(style='Heading 2')
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                add_runs(p, text, base_bold=True, size=14)
                p.paragraph_format.space_before = Pt(2)
                p.paragraph_format.space_after = Pt(4)
                first_h2 = False
            else:
                p = doc.add_paragraph(style='Heading 2')
                add_runs(p, text, base_bold=True)
                add_bottom_border(p, color='BBBBBB', size='4')
                first_h2 = False
            last_pagebreak = False
        else:
            p = doc.add_paragraph(style='Heading 3')
            add_runs(p, text, base_bold=True)
            last_pagebreak = False
        i += 1
        continue

    # Tables
    if '|' in line and i + 1 < len(lines) and re.match(r'^\s*\|?[\s:|-]+\|[\s:|-]*$', lines[i+1]):
        rows = []
        header = [c.strip() for c in line.strip().strip('|').split('|')]
        i += 2
        while i < len(lines) and '|' in lines[i] and lines[i].strip():
            rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')])
            i += 1
        table = doc.add_table(rows=1, cols=len(header))
        table.style = 'Table Grid'
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        table.autofit = True
        hdr = table.rows[0]
        set_repeat_header(hdr)
        for j, cell_text in enumerate(header):
            cell = hdr.cells[j]
            cell.text = ''
            p = cell.paragraphs[0]
            add_runs(p, cell_text, base_bold=True, size=8.4)
            set_cell_shading(cell, 'EEE9DF')
        for row in rows:
            cells = table.add_row().cells
            for j in range(len(header)):
                txt = row[j] if j < len(row) else ''
                cell = cells[j]
                cell.text = ''
                p = cell.paragraphs[0]
                add_runs(p, txt, size=8.3)
        # spacing after table
        sp = doc.add_paragraph()
        sp.paragraph_format.space_after = Pt(2)
        last_pagebreak = False
        continue

    # Blockquote
    if stripped.startswith('>'):
        q = []
        while i < len(lines) and lines[i].strip().startswith('>'):
            q.append(lines[i].strip().lstrip('>').strip())
            i += 1
        text = ' '.join([x for x in q if x])
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Cm(0.6)
        p.paragraph_format.right_indent = Cm(0.3)
        p.paragraph_format.space_before = Pt(4)
        p.paragraph_format.space_after = Pt(6)
        add_runs(p, text, base_italic=True, size=9.4, color=RGBColor(0x44, 0x44, 0x44))
        last_pagebreak = False
        continue

    # Bullet lists
    if re.match(r'^\s*[-+]\s+', line):
        text = re.sub(r'^\s*[-+]\s+', '', line)
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_after = Pt(2)
        add_runs(p, text)
        last_pagebreak = False
        i += 1
        continue

    # Numbered lists: keep the number as text, with hanging indent
    m = re.match(r'^\s*(\d+[.)])\s+(.*)$', line)
    if m:
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Cm(0.8)
        p.paragraph_format.first_line_indent = Cm(-0.5)
        p.paragraph_format.space_after = Pt(3)
        add_runs(p, m.group(1) + ' ' + m.group(2))
        last_pagebreak = False
        i += 1
        continue

    # Paragraph: gather until blank or block
    p_lines = [stripped]
    i += 1
    while i < len(lines):
        nxt = lines[i]
        if not nxt.strip():
            break
        if re.match(r'^(#{1,3})\s+', nxt) or nxt.strip() == '---' or nxt.strip() == '<!-- pagebreak -->':
            break
        if nxt.strip().startswith('>'):
            break
        if re.match(r'^\s*[-+]\s+', nxt) or re.match(r'^\s*\d+[.)]\s+', nxt):
            break
        if '|' in nxt and i + 1 < len(lines) and re.match(r'^\s*\|?[\s:|-]+\|[\s:|-]*$', lines[i+1]):
            break
        p_lines.append(nxt.strip())
        i += 1
    text = ' '.join(p_lines)
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    add_runs(p, text)
    last_pagebreak = False

doc.save(OUT)
print('DOCX scritto:', OUT)

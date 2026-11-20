@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0.."

echo.
echo  WebDev Innovations - rigenerazione contratto
echo.

node tools\make_contract_html.js || goto :errore
node tools\make_firma_docs.js || goto :errore

set "EDGE=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=C:\Program Files\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" (
  echo  Edge non trovato. Apri manualmente i file HTML e stampa in PDF.
) else (
  echo  Genero i PDF con Edge...
  "%EDGE%" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="firma\01-CONTRATTO-SOCIALE-SNC.pdf" "file:///%CD:\=/%/firma/01-CONTRATTO-SOCIALE-SNC.html" >nul 2>&1
  "%EDGE%" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="firma\00-LEGGIMI-PRIMA-DI-FIRMARE.pdf" "file:///%CD:\=/%/firma/00-LEGGIMI-PRIMA-DI-FIRMARE.html" >nul 2>&1
  "%EDGE%" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="firma\00-SCHEDA-DATI-E-SCELTE.pdf" "file:///%CD:\=/%/firma/00-SCHEDA-DATI-E-SCELTE.html" >nul 2>&1
)

if exist "%TEMP%\pydeps\docx" (
  set "PYTHONPATH=%TEMP%\pydeps"
)
python -c "import docx" >nul 2>&1
if errorlevel 1 (
  echo.
  echo  python-docx non disponibile: il DOCX non viene rigenerato.
  echo  Per installarlo: python -m pip install --target "%%TEMP%%\pydeps" python-docx
) else (
  python tools\make_contract_docx.py
)

echo.
echo  Fatto. File aggiornati nella cartella firma.
echo.
pause
exit /b 0

:errore
echo.
echo  Errore durante la generazione. Controlla i messaggi sopra.
echo.
pause
exit /b 1

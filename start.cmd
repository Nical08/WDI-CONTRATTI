@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

node --version >nul 2>&1
if errorlevel 1 goto :senza_node

echo.
echo  WebDev Innovations - Laboratorio societario
echo  Avvio del server locale...
echo.

node server.mjs
set "CODICE=%ERRORLEVEL%"

if not "%CODICE%"=="0" (
  echo.
  echo  Il server si è fermato con il codice %CODICE%.
  echo  Controlla il messaggio sopra: la porta potrebbe essere già occupata.
  echo.
  pause
)

endlocal & exit /b %CODICE%

:senza_node
echo.
echo  Node.js non è stato trovato.
echo  Installa Node.js 22 o una versione successiva da https://nodejs.org/
echo  Poi riavvia questo file con un doppio click.
echo.
pause
endlocal & exit /b 1

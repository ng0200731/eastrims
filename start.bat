@echo off
setlocal
REM Run from the folder this file lives in, regardless of where it is called from.
cd /d "%~dp0"

echo ============================================================
echo   Eastrims  -  starting the web app
echo ============================================================
echo.

REM --- 1. Dependencies -------------------------------------------------
if not exist "node_modules" (
  echo [setup] node_modules not found - installing dependencies - first run
  call npm install
  if errorlevel 1 goto installfailed
  echo.
)

REM --- 2. Environment file --------------------------------------------
if not exist ".env.local" (
  echo [setup] .env.local not found - copying from .env.example
  copy ".env.example" ".env.local" >nul
  echo [note]  Open .env.local and set NEXT_PUBLIC_SANITY_PROJECT_ID,
  echo        plus any optional keys: AI, email, write token. The site
  echo        runs with graceful fallbacks until you do.
  echo.
)

REM --- 3. Start --------------------------------------------------------
echo Starting the development server ...
echo.
echo    App:                http://localhost:3000
echo    Sanity Studio:      http://localhost:3000/studio
echo    Marketing preview:  http://localhost:3000/marketing
echo.
echo Press Ctrl+C to stop.
echo ------------------------------------------------------------

call npm run dev
goto end

:installfailed
echo.
echo [error] npm install failed. Make sure Node.js 20+ is installed.
pause
exit /b 1

:end
endlocal

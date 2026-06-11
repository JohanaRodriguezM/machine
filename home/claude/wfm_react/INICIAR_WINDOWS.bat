@echo off
echo.
echo  =============================================
echo   WFM Falabella React - Iniciando...
echo  =============================================
echo.
cd /d "%~dp0"

echo [1/2] Iniciando backend (FastAPI)...
start "WFM Backend" cmd /k "cd backend && python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

timeout /t 3 /nobreak > nul

echo [2/2] Iniciando frontend (React)...
start "WFM Frontend" cmd /k "cd frontend && npm run dev"

timeout /t 4 /nobreak > nul

echo.
echo  Abre en tu navegador: http://localhost:3000
echo.
start http://localhost:3000

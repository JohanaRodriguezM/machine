╔══════════════════════════════════════════════════════════════╗
║     WFM FALABELLA — REACT + FASTAPI                         ║
╚══════════════════════════════════════════════════════════════╝

REQUISITOS (instalar una sola vez):
  1. Python 3.8+  → python.org
  2. Node.js 18+  → nodejs.org
  3. En terminal:
     pip install fastapi uvicorn python-multipart pandas openpyxl
     cd frontend && npm install

INICIAR:
  Windows: Doble clic en INICIAR_WINDOWS.bat
  → Se abren 2 ventanas (backend + frontend)
  → El navegador se abre solo en http://localhost:3000

ESTRUCTURA:
  frontend/   → React + Vite (interfaz)
  backend/    → FastAPI Python (motor de cálculo)

ARQUITECTURA:
  Navegador → React (port 3000) → FastAPI (port 8000) → Excel


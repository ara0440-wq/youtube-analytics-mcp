@echo off
echo ========================================
echo  YouTube Analytics MCP Setup
echo ========================================
cd /d "%~dp0.."
call npm ci || exit /b 1
call npm run build || exit /b 1
echo.
echo Build complete. Entry point is build/index.js.
pause

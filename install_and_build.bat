@echo off
echo ========================================
echo  YouTube Analytics MCP - O'rnatish
echo ========================================
cd /d "%~dp0.."
call npm ci || exit /b 1
call npm run build || exit /b 1
echo.
echo TAYYOR! build/index.js yaratildi.
pause

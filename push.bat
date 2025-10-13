@echo off
REM Mensaje de commit por defecto
set /p COMMIT_MSG=Escribe el mensaje del commit (o deja vacio para "Actualizacion automatica"):

if "%COMMIT_MSG%"=="" set COMMIT_MSG=Actualizacion automatica

REM Agregar todos los cambios
git add .

REM Hacer commit
git commit -m "%COMMIT_MSG%"

REM Subir a GitHub
git push origin main

pause

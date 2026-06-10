@echo off

copy backend\database\database.sqlite backups\database_%date:~-4%%date:~3,2%%date:~0,2%.sqlite

pause
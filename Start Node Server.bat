:: This is an automated node server starter for local debugging.
:: This saves some space in your VS terminal so you can run
:: the server in the background while saving room in your
:: code workspace. This tool supports the regular
:: built-in node server starter command
:: and the nodemon extension.

::Clear Terminal Window & Execute Node Server
@echo off
echo Loading....

:: Visual Select Menu.
:selectMenu
cls
echo.
echo How would you like to start your server?
echo.
echo 1.) Using the built-in Node function.
echo.
echo 2.) Using Nodemon.
echo.
echo Select '1' or '2' to pick your preferred method.
echo.

:: If the user selects 1 or 2, they will be sent to the corresponding option.
set /p option=:
if %option% == 1 goto serverRegular
if %option% == 2 goto serverMon

:: This option uses the 'nodemon' server extension
:: for users who want their server to reset with
:: any changes that they make to the project
:: source code.
:serverMon
echo Starting NodeMon Server Session....
start http://localhost:3000/
cls
nodemon server.js
pause
goto selectMenu

:: This option starts the server using the built-in Node function.
:serverRegular
echo Starting Regular Node Server Session....
start http://localhost:3000/
cls
node server.js
pause
goto selectMenu
@echo off
echo ========================================
echo Railway Otomatik Deploy Kurulum
echo ========================================
echo.

echo [1/3] Railway CLI Kurulumu...
echo.
call npm install -g @railway/cli
if errorlevel 1 (
    echo HATA: Railway CLI kurulamadi!
    pause
    exit /b 1
)
echo ✅ Railway CLI kuruldu
echo.

echo [2/3] Railway Login...
echo.
echo Tarayicinizda Railway login sayfasi acilacak...
echo Login olduktan sonra buraya donun.
echo.
call railway login
if errorlevel 1 (
    echo HATA: Railway login basarisiz!
    pause
    exit /b 1
)
echo ✅ Railway login basarili
echo.

echo [3/3] Backend Klasorune Gidiliyor...
echo.
cd neuralcipher-ai\backend
if errorlevel 1 (
    echo HATA: Backend klasoru bulunamadi!
    cd ..\..
    pause
    exit /b 1
)
echo ✅ Backend klasorunde
echo.

echo ========================================
echo SIMDI NE YAPACAKSINIZ?
echo ========================================
echo.
echo SECENEK 1: Railway Projesine Baglan (Otomatik Deploy icin)
echo   railway link
echo   (Listeden "NeuralCipher Backend" projesini secin)
echo.
echo SECENEK 2: Hemen Deploy Et (Tek seferlik)
echo   railway up
echo.
echo SECENEK 3: Logs Kontrol Et
echo   railway logs --tail
echo.
echo ========================================
echo OTOMATIK DEPLOY ICIN:
echo ========================================
echo.
echo 1. Railway Dashboard'a git: https://railway.app/dashboard
echo 2. Projenizi secin
echo 3. Settings -^> Source -^> Connect GitHub
echo 4. Repository: furkanyaldz214772-arch/neuralcipher-ai
echo 5. Branch: master
echo 6. Root Directory: backend  ^<-- ONEMLI!
echo 7. Auto Deploy: Enable
echo.
echo ========================================
echo.

pause

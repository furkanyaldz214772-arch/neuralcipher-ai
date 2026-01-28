@echo off
echo ======================================================================
echo RAILWAY'DE TEST HASTALARI OLUSTURMA
echo ======================================================================
echo.
echo Bu script Railway CLI kullanarak test hastalari olusturacak.
echo.
echo Gereksinimler:
echo - Railway CLI yuklu olmali (railway.app/cli)
echo - Railway projesine giris yapmis olmalisin
echo.
pause

echo.
echo Railway CLI ile backend servisine baglaniyor...
echo.

railway run python add_test_patients_to_doctor.py

echo.
echo ======================================================================
echo TAMAMLANDI!
echo ======================================================================
echo.
echo Doktor paneline git: https://neuralcipher-ai.vercel.app/doctor/patients
echo.
echo Giris bilgileri:
echo   Email: doctor@neuralcipher.ai
echo   Password: Doctor2026!@#
echo.
pause

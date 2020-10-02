!include "x64.nsh"
!macro customInstall
    nsExec::Exec 'netsh advfirewall firewall add rule name="Keystore Enterprise" dir=in action=allow program="$INSTDIR\${PRODUCT_NAME}.exe" enable=yes profile=any'
    nsExec::Exec 'netsh advfirewall firewall add rule name="Keystore Enterprise" dir=out action=allow program="$INSTDIR\${PRODUCT_NAME}.exe" enable=yes profile=any'
    ${If} ${RunningX64}
        ${DisableX64FSRedirection}
        SetRegView 64
         CopyFiles "$INSTDIR\resources\GemPcCCIDx64" "C:\Windows\Temp"
        #nsExec::Exec '"$SYSDIR\cmd.exe" /c InfDefaultInstall "C:\Windows\Temp\GemPcCCIDx64\gemccid.inf'
        nsExec::Exec '"$SYSDIR\cmd.exe" /c "%SystemRoot%\System32\pnputil.exe" /add-driver C:\Windows\Temp\GemPcCCIDx64\gemccid.inf /install'
    ${Else}
        CopyFiles "$INSTDIR\resources\GemPcCCIDx86" "C:\Windows\Temp"
        #nsExec::Exec '"$SYSDIR\cmd.exe" /c InfDefaultInstall "C:\Windows\Temp\GemPcCCIDx86\gemccid.inf'
        nsExec::Exec '"$SYSDIR\cmd.exe" /c "%SystemRoot%\System32\pnputil.exe" /add-driver C:\Windows\Temp\GemPcCCIDx86\gemccid.inf /install'
    ${EndIf}
!macroend

Section

SectionEnd

@echo off
REM ==============================================================================
REM Arquivo Batch para executar o script de automação do PowerShell.
REM Ele define a política de execução apenas para esta sessão,
REM garantindo que o script possa rodar sem alterar as configurações do sistema.
REM ==============================================================================

REM Define o título da janela do console para fácil identificação.
TITLE Ambiente de Desenvolvimento

REM Encontra o diretório onde o arquivo .bat está localizado.
SET "SCRIPT_DIR=%~dp0"

REM Define o caminho completo para o script PowerShell.
REM Garanta que o nome do seu script seja "Start-Dev.ps1" ou altere aqui.
SET "SCRIPT_PATH=%SCRIPT_DIR%Start.ps1"

echo.
echo ============================================
echo  Iniciando script de automacao...
echo ============================================
echo.

REM Executa o script PowerShell.
REM -NoProfile: Ignora o perfil do PowerShell, para um início mais rápido e limpo.
REM -ExecutionPolicy Bypass: Permite que este script seja executado sem precisar de assinatura digital.
REM -File: Especifica o caminho para o arquivo de script .ps1 a ser executado.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_PATH%"

echo.
echo ============================================
echo  Sessao do script finalizada.
echo ============================================

REM Pausa no final para que a janela não feche imediatamente após o script do PowerShell terminar.
pause

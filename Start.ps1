# ==============================================================================
# Script Otimizado para iniciar e parar ambiente de desenvolvimento
# Foco: Clareza, modularidade, verificação de status e logs de erro.
# ==============================================================================

# --- CONFIGURAÇÃO INICIAL ---
# Define o diretório de trabalho como o local do script e limpa o console.
$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $baseDir
Clear-Host

# --- DEFINIÇÃO DAS FUNÇÕES ---

# Função para iniciar o Back-end
function Start-Backend {
    param($path)
    Write-Host "⏳ Iniciando Back-End (Spring Boot)..." -ForegroundColor Yellow
    # Nomeia o Job para identificação e suprime a saída da tabela de status.
    Start-Job -Name "Backend" -ScriptBlock {
        param($path)
        Set-Location $path
        # O '&' invoca o comando e '*>&1 | Out-Null' suprime toda a sua saída no console.
        & mvn spring-boot:run *>&1 | Out-Null
    } -ArgumentList $path | Out-Null
    Write-Host "✅ Back-End iniciado em segundo plano." -ForegroundColor Green
}

# Função para iniciar o Front-end
function Start-Frontend {
    param($path)
    Write-Host "⏳ Iniciando Front-End (Angular)..." -ForegroundColor Yellow
    # Nomeia o Job para identificação e suprime a saída da tabela de status.
    Start-Job -Name "Frontend" -ScriptBlock {
        param($path)
        Set-Location $path
        # Instala as dependências e serve a aplicação, suprimindo a saída.
        npm install *>&1 | Out-Null
        ng serve *>&1 | Out-Null
    } -ArgumentList $path | Out-Null
    Write-Host "✅ Front-End iniciado em segundo plano." -ForegroundColor Green
}

# Função para parar todos os processos em segundo plano
function Stop-AllServices {
    Write-Host "`n🛑 Encerrando todos os serviços..." -ForegroundColor Red
    try {
        $jobs = Get-Job
        if ($jobs) {
            $jobs | Stop-Job -PassThru | Remove-Job -Force
            Write-Host "✅ Serviços finalizados com sucesso." -ForegroundColor Green
        } else {
            Write-Host "❕ Nenhum serviço em execução para finalizar." -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "`n❌ ERRO AO FINALIZAR SERVIÇOS:" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

# --- FLUXO DE EXECUÇÃO PRINCIPAL ---

try {
    # Alterado de "automações" para "aplicações"
    Write-Host "🔧 Iniciando aplicações..." -ForegroundColor Cyan
    '='*50 | Write-Host -ForegroundColor DarkGray

    # Inicia os serviços
    Start-Backend -path $baseDir
    Start-Frontend -path $baseDir

    '='*50 | Write-Host -ForegroundColor DarkGray
    Write-Host "🔄 Aguardando inicialização dos serviços (15 segundos)..." -ForegroundColor Cyan
    Start-Sleep -Seconds 15

    # --- VERIFICAÇÃO DE ERROS DE INICIALIZAÇÃO ---
    $hasFailedJobs = $false
    foreach ($job in (Get-Job)) {
        if ($job.State -eq 'Failed') {
            $hasFailedJobs = $true
            $logFileName = "$($job.Name)-error.log"
            Write-Host "`n❌ ERRO CRÍTICO: O serviço '$($job.Name)' falhou ao iniciar." -ForegroundColor Red
            Write-Host "🗒️  Gerando log de erro completo em: $logFileName" -ForegroundColor Yellow

            # Recebe toda a saída (incluindo erros) do job que falhou e salva em um arquivo.
            Receive-Job -Job $job | Out-File -FilePath $logFileName -Encoding utf8
        }
    }

    # Se algum job falhou, lança um erro para interromper o fluxo de sucesso.
    if ($hasFailedJobs) {
        throw "Um ou mais serviços falharam ao iniciar. Verifique os arquivos de log gerados."
    }

    Write-Host "✅ Serviços iniciados com sucesso e em execução." -ForegroundColor Green

    # Abre o navegador
    Start-Process "http://localhost:4200"

    # Resumo e loop de espera
    Write-Host "`n"
    Write-Host "========================================================" -ForegroundColor Magenta
    Write-Host "🚀 Aplicação pronta!" -ForegroundColor Green
    Write-Host "✅ Back-End (Spring) e Front-End (Angular) estão em execução."
    Write-Host "➡️  URL: http://localhost:4200/"
    Write-Host "========================================================" -ForegroundColor Magenta
    Write-Host "`n💡 Digite 'exit' a qualquer momento para encerrar TUDO."

    do {
        $input = Read-Host "`nAguardando comando"
    } while ($input.ToLower() -ne "exit")
}
catch {
    # Captura erros, incluindo a falha de inicialização lançada acima.
    Write-Host "`n❌ Ocorreu um erro que impediu a continuação:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}
finally {
    # Garante que os serviços sejam parados e o script pause no final.
    Stop-AllServices
    Write-Host "`n"
    Read-Host "Pressione Enter para fechar o terminal."
}

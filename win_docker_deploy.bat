@echo off
setlocal EnableDelayedExpansion

REM Get Package Name
echo Getting package name from package.json...
for /f "tokens=* usebackq" %%a in (`node -p "require('./package.json').name"`) do (
    set PACKAGE_NAME=%%a
)

REM Define paths
set LOCAL_DIR=%~dp0dist
set VOLUME_NAME=self-hosted-ai-starter-kit_n8n_storage
set CONTAINER_PATH=/custom/!PACKAGE_NAME!

echo Detected package name: '!PACKAGE_NAME!'

REM Build the Node
echo Building the node...
call npm run build

REM Clean up any existing containers
echo Cleaning up containers...
docker rm -f deploy-temp1 2>nul
docker rm -f cleanup-temp 2>nul

REM NOVA PARTE: Limpar arquivos antigos do volume
echo Cleaning old files from volume...
docker run -dit --name cleanup-temp -v %VOLUME_NAME%:/data busybox
docker exec cleanup-temp rm -rf "/data%CONTAINER_PATH%"
docker rm -f cleanup-temp

REM Deploy the Build Output
echo Creating temporary container...
docker run -dit --name deploy-temp1 -v %VOLUME_NAME%:/data busybox

echo Copying files into volume...
docker cp "%LOCAL_DIR%\." "deploy-temp1:/data%CONTAINER_PATH%"

echo Cleaning up container...
docker rm -f deploy-temp1

REM Restart n8n (força reload completo)
echo Restarting n8n...
docker container stop n8n
docker container start n8n

echo Deployment complete.

REM Show logs
echo Showing n8n logs (Press Ctrl+C to exit)...
docker logs -f n8n

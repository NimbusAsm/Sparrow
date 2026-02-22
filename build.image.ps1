$dttag = $(Get-Date -Format "yyyy-MMdd-HHmm").ToString()
docker build -t sparrow:$($dttag) .
docker tag sparrow:$($dttag) sparrow:latest
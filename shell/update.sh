if  [ $$ = $(ps -o pgid -hp $$) ]; then
   echo already a process group leader;
else
   set -m
   #$0 "$@" #optionally with &
  # set +m
fi

echo 'Rebooting'
timeout 10s ping localhost
git pull
npm install
npm start

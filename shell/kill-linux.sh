
pgid=$(($(ps -o pgid= -p "$$")))

if  [ $$ = $(ps -o pgid -hp $$) ]; then
   echo already a process group leader;
else
   set -m
   #$0 "$@" #optionally with &
  # set +m
fi
set -m
#pid2=`cat parent.txt`
echo $pgid
pkill -TERM -g $pgid
pkill $$

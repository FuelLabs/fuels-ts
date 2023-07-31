
FORC_PROJECTS=()

for dir in ../fixtures/forc-projects/* 
do
    dir=${dir%*/}      # remove the trailing "/"
    FORC_PROJECTS+="${dir##*/} "
    echo "${dir}"
done

for dir in "${FORC_PROJECTS[@]}";
do
echo "${dir}\n"
done
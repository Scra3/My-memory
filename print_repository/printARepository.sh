#!/bin/sh
for file in $2/*
        do lp -d $1 "$file";

        echo "Impression de : " $file
done

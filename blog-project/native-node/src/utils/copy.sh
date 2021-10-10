#!/bin/sh
cd /Users/liyongwei/disk/L-yw/study/node-server-learn/blog-project/native-node/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log
#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /api/tmp/pids/server.pid

# exec → 現在使っているPIDでコマンドを実行(つけないと新しいPIDで実行される)
# $@ → 全部の引数を個別として処理
exec "$@"

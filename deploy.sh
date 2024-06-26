#!/usr/bin/env sh
# 运行 ./deploy.sh 前仅需要切换nvm node v14：

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd dist
#创建.nojekyll 防止Github Pages build错误
touch .nojekyll

git init
git add -A
git commit -m 'deploy'
# git push -f "https://${GITHUB_TOKEN}@github.com/AlexZhong22c/element-checklist.git" main:gh-pages
git push -f https://github.com/AlexZhong22c/element-checklist.git main:gh-pages

cd -
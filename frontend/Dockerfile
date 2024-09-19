# Node.jsの公式イメージを使用
FROM node:20.17.0

# 作業ディレクトリを設定
WORKDIR /frontend

# 依存パッケージをインストール
COPY package.json package-lock.json ./
RUN npm install
RUN npm install vite@latest
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# Reactアプリを起動
# CMD ["npm", "start"]

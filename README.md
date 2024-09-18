# 58hackathon-yoshimoto

# 環境構築
> [!WARNING]
> 開発メンバーがMacOSを使用しているため、MacOSで環境構築を行うことを前提としています。
> Windowsで環境構築する場合は個人で調べてやっていただくか、@satsuki2200 までご連絡ください。
## フロントエンド
> [!NOTE]
> 今回の開発では、Node.jsのバージョン管理ツールとしてnodebrewを使用しています。
> 他のNode.jsバージョン管理ツールを使用している方は適宜読み替えてください。

**### 1. nodebrewでnodeのインストール**
今回使用するNode.jsのバージョンはv20.17.0です。以下のコマンドをターミナルで実行して、
```Bash
nodebrew ls
```

以下のような記述が出るかと思います。(数字が違っても問題ありません！)この際、`v20.17.0`という記述がある人は

```Bash
v16.20.2
v20.12.2
v20.17.0

current: v20.12.2
```


```Bash
nodebrew install v20.17.0
```

2. 
> [!NOTE]
> フロントエンドはまた後でかくか、削除する


## バックエンド
dockerコンテナの起動をするために以下のコマンドを実行
```
docker compose build
docker compose up --build
```

上記のコマンドを実行した後に、DockerDesktopを見ると、`58hackathon-yoshimoto`というものと、その下に`web`と`db`があればコンテナの起動に成功しています。
ちなみに[http://localhost:8000](http://localhost:8000/)にアクセスすると、djangoのインストール完了画面が出てきます。
(もしこれが出てこないのであれば、どこかで失敗しているので、また連絡してください。)

その後、以下のコマンドを実行し、`djangorestframework 3.15.2`という記述があれば、これで環境構築終了。
```
docker compose exec web pip list
```

もし記述がなければ、以下のコマンドを実行。`djangorestframework 3.15.2`が出てきたら環境構築終了。
```
docker compose exec web pip install djangorestframework
docker compose exec web pip list
```

これで無理だったらまた連絡ください。


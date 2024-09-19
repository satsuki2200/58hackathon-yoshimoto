# 58hackathon-yoshimoto

## バージョン

| OS | MacOS |
----|---- 
| Node.js | v20.17.0 |
| Python | 3.10.14 |
| Django | 5.1.1 |

# 環境構築
> [!WARNING]
> 開発メンバーがMacOSを使用しているため、MacOSで環境構築を行うことを前提としています。
> Windowsで環境構築する場合は個人で調べてやっていただくか、@satsuki2200 までご連絡ください。
## フロントエンド
> [!NOTE]
> 今回の開発では、Node.jsのバージョン管理ツールとしてnodebrewを使用しています。
> 他のNode.jsバージョン管理ツールを使用している方は適宜読み替えてください。

### 1. Node.jsのインストールと使用にあたっての準備
今回使用するNode.jsのバージョンはv20.17.0です。以下のコマンドをターミナルで実行して、
```Bash
nodebrew ls
```

以下のような記述が出るかと思います。(数字が違っても問題ありません！)

```Bash
v16.20.2
v20.12.2
v20.17.0

current: v20.12.2
```
この際、`v20.17.0`という記述がない人は以下のコマンドを実行してください。

```Bash
nodebrew install v20.17.0
```

次に、Node.jsのバージョン指定を行います。以下のコマンドを実行してください。 コメントアウトの内容が出力されたらバージョン指定完了です。
```
nodebrew use v20.17.0
# use v20.17.0
```

### 2. 必要なライブラリ等をインストール
React.jsのファイルは`frontend`配下にあります。そのため、`cd frontend`を実行してください。

移動が完了したら、以下のコマンドを実行してください。必要なライブラリのインストールを行います。
```
npm i
```

インストールが完了したら、`npm list`を実行してみてください。以下の内容と異なる点があれば、@satsuki2200 まで連絡してください。
```
frontend@0.0.0 /58hackathon-yoshimoto/frontend
├── @eslint/js@9.10.0
├── @types/react-dom@18.3.0
├── @types/react@18.3.7
├── @vitejs/plugin-react@4.3.1
├── eslint-plugin-react-hooks@5.1.0-rc-fb9a90fa48-20240614
├── eslint-plugin-react-refresh@0.4.12
├── eslint-plugin-react@7.36.1
├── eslint@9.10.0
├── globals@15.9.0
├── react-dom@18.3.1
├── react@18.3.1
└── vite@5.4.6

```

### 3. React.jsを起動する
ターミナルで以下のコマンドを実行してください。コマンドを実行すると、ターミナルは動いたままになりますが、起動している間はそのままにしておいてください。
```
npm run dev
```

コマンドを実行したら、[http://localhost:5173/](http://localhost:5173/)にアクセスしてみてください。
Reactのロゴが出てきたら、起動成功です！


## バックエンド

### Djangoの環境構築

1. まず以下のコマンドでvenvを作成してください。
`python -m venv .venv`

2. 次にvenvをアクティベートしてください。使用しているシェルによってファイルパスが異なるため、ご自身のシェルにあったファイルパスで実行してください。
   
```
# zsh たぶんこれ
source .venv/bin/activate

# fish
source .venv/bin/activate.fish
```

3. 必要なライブラリをインストール
`pip install django djangorestframework python_dotenv Markdown django-filter`

4. djangoをローカルで立ててみる
`python manage.py runserver`

5. http://localhost:8000 にアクセス

これで無理だったらまた連絡ください。


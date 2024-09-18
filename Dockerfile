# Pythonイメージをベースに構築する
FROM python:3.10.14 as python_base
ENV PYTHONUNBUFFERED 1
RUN mkdir -p /code
WORKDIR /code
# Djangoの環境構築
COPY requirements.txt /code/
RUN pip install --upgrade pip\
    && pip install --upgrade setuptools\
    && pip install -r requirements.txt\
    && pip install djangorestframework

# # 全てのファイルをコンテナにコピー
# COPY . /code/

# Node.jsの環境構築
# RUN apt-get update && apt-get install -y nodejs npm
# WORKDIR /code/frontend
# COPY frontend/package.json frontend/package-lock.json ./
# RUN npm install
# COPY frontend .
# RUN npm run build

# Djangoをコピー
# WORKDIR /code
COPY . /code/

# # React.jsの環境構築
# # COPY frontend /code/frontend
# RUN cd frontend && npm run build




# FROM node:20.17.0 as node_base
# RUN mkdir -p /code
# WORKDIR /code
# COPY --from=python_base /code /code
# COPY package.json package-lock.json /code/

# # COPY . /code
# RUN npm install



# FROM python:3
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1
# WORKDIR /code
# COPY requirements.txt /code/
# RUN pip install -r requirements.txt
# COPY . /code/
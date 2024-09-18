FROM python:3.10.14
ENV PYTHONUNBUFFERED 1
RUN mkdir -p /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install --upgrade pip\
    && pip install --upgrade setuptools\
    && pip install -r requirements.txt\
    && pip install djangorestframework
COPY . /code


# FROM python:3
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1
# WORKDIR /code
# COPY requirements.txt /code/
# RUN pip install -r requirements.txt
# COPY . /code/
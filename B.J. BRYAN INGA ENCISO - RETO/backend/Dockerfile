FROM python:3.6.15-buster

WORKDIR /app

ENV FASTAPI_APP = app.py

ENV FASTAPI_ENV = development

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python" , "app.py"]
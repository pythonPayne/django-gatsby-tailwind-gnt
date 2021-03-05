#!/bin/sh
./manage.py makemigrations users
./manage.py migrate
./manage.py makemigrations gnt
./manage.py migrate
./manage.py makemigrations testapp
./manage.py migrate
./manage.py makemigrations sermons
./manage.py migrate
python ./gnt/seedDb.py
DJANGO_SUPERUSER_PASSWORD=stephen ./manage.py createsuperuser --username stephen --email test@test.com --noinput
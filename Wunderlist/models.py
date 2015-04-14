from django.db import models
import requests
import urllib

# Create your models here.


class API:
    CLIENT_ID = ''
    CLIENT_SECRET = ''
    CALLBACK_URL = 'http://wunderpebble.oscarbazaldua.com/'

    API_URL = 'https://a.wunderlist.com/api/v1/'
    LOGIN_URL = 'https://www.wunderlist.com/oauth/authorize'
    TOKEN_URL = 'https://www.wunderlist.com/oauth/access_token'

    @staticmethod
    def login(token):
        data = {
            'state': token,
            'redirect_uri': API.CALLBACK_URL,
            'client_id': API.CLIENT_ID
        }
        return API.LOGIN_URL + '?' + urllib.urlencode(data)

    @staticmethod
    def token(code):
        data = {
            'client_id': API.CLIENT_ID,
            'client_secret': API.CLIENT_SECRET,
            'code': code
        }
        r = requests.post(API.TOKEN_URL, data)
        print(r.text)
        return r.json()
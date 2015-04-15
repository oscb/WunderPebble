# Python Imports
import requests

# Django Imports
import django.template.context_processors
import django.shortcuts
import django.views.generic

# App Imports
import Wunderlist.models

# coding:utf-8
__author__ = 'oscb'


class UserView(django.views.generic.TemplateView):
    template_name = 'user/login.html'

    def get(self, request, *args, **kwargs):
        context = dict()
        csrf = django.template.context_processors.csrf(request)['csrf_token']

        if not (request.GET and 'code' in request.GET):
            context['link'] = Wunderlist.models.API.login(csrf)
            return self.render_to_response(context)
        else:
            if (request.GET['state'] == csrf):
                token = Wunderlist.models.API.token(request.GET['code'])
                context['token'] = token['access_token']
            else:
                context['token'] = "ERROR"
            return self.render_to_response(context)

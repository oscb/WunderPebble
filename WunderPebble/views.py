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

        if not request.GET or not request.GET['token']:
            csrf = django.template.context_processors.csrf(request)['csrf_token']
            context['link'] = Wunderlist.models.API.login(csrf)
            return self.render_to_response(context)
        else:
            # TODO: Check if Token State is the same XSS
            token = Wunderlist.models.API.token(request.GET['code'])
            context['token'] = token
            return self.render_to_response(context)

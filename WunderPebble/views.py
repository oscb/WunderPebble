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

    def get_context_data(self, **kwargs):
        context = dict()
        context['link'] = u"#yoloswag"
        return context

    def get(self, request, *args, **kwargs):
        if not request.GET:
            context = dict()
            csrf = django.template.context_processors.csrf(request)['csrf_token']
            context['link'] = Wunderlist.models.API.login(csrf)
            return self.render_to_response(context)
        else:
            context = self.get_context_data()
            return self.render_to_response(context)

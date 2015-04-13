from django.conf.urls import include, url
from django.contrib import admin
import WunderPebble.views

urlpatterns = [
    # Examples:
    url(r'^$', WunderPebble.views.UserView.as_view(), name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
]

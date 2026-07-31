from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "message": "Backend connected successfully"
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/test/', home),
    path('api/accounts/', include('accounts.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/collaborations/', include('collaborations.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
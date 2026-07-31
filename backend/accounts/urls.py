from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import (RegisterView, LoginView, LogoutView, ProfileView, BecomeFreelancerView, UserProfileView, DashboardView)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('become-freelancer/', BecomeFreelancerView.as_view(), name='become_freelancer'),
    path('profile/<int:pk>/', UserProfileView.as_view(), name='user_profile'),
    path("dashboard/", DashboardView.as_view()),
]


if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )


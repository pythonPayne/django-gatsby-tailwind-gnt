from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.conf import settings


class Sermon(models.Model):
    title = models.CharField(_("title"), max_length=100)
    bcvStart = models.CharField(max_length=6)
    bcvStop = models.CharField(max_length=6)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    def __str__(self):
        return self.title

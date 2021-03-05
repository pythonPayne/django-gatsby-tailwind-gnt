from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.conf import settings


class Todo(models.Model):
    todo = models.CharField(_("todo"), max_length=100)
    done = models.BooleanField(_("done"))
    date = models.DateField(_("date"), auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    def __str__(self):
        return self.todo

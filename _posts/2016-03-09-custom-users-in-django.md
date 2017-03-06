---
layout: post
title: "Custom users in Django"
date: 2016-08-01 10:03:35 -0300
tags: php codeigniter laravel refactor
published: false
---
As part of my project to really understand the pros and cons of the major web frameworks, I've been tinkering with Django and the Django Rest Framework, and their builtin mechanisms for authentication and permissions. My app needed some new fields on the User model, and I really didn't want to use foreign keys for this, so I wrote my own User model.

## Requirements

Django and DRF have a bunch of requirements if you want your model to be compatible. They are described in the [documentation][custom-user-docs], and I'll run you guys through what I did. Here's my final model (also to help you guys if you're just skimming the post):

```python
class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    # My custom fields
    name = models.CharField(max_length=250, blank=False, verbose_name='Name')
    username = models.CharField(max_length=30, unique=True, verbose_name='Username')
    email = models.CharField(max_length=128, unique=True, verbose_name='Email')
    description = models.TextField(verbose_name='Description')
    website = models.CharField(max_length=128, verbose_name='Website')
    country = CountryField(blank=True)

    # Fields needed by AbstractBaseUser
    date_joined = models.DateTimeField('Date joined', default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'name']

    def save(self, *args, **kwargs):
        if not is_password_usable(self.password):
            self.set_password(self.password)

        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name
```

Now going through the code section by section. The next hunk is basically the fields I wanted, the way I wanted. Yeah, they're not original and I could've used some other fields and yatta yatta yatta. By the way, `CountryField` comes with the package `django_countries` and is a really easy way to add support to all the countries ([link][django-countries]).

```python
    name = models.CharField(max_length=250, blank=False, verbose_name='Name')
    username = models.CharField(max_length=30, unique=True, verbose_name='Username')
    email = models.CharField(max_length=128, unique=True, verbose_name='Email')
    description = models.TextField(verbose_name='Description')
    website = models.CharField(max_length=128, verbose_name='Website')
    country = CountryField(blank=True)
```


[django-countries]: https://github.com/SmileyChris/django-countries
[custom-user-docs]: https://docs.djangoproject.com/en/1.9/topics/auth/customizing/#extending-the-existing-user-model
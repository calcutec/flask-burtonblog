#!flask/bin/python
# -*- coding: utf8 -*-
import os
import requests
from app.models import Post, User

IMGIX_KEY = os.getenv("IMGIX_KEY")
API_KEY = IMGIX_KEY


def purge_imgix_image(url):
    purge_endpoint = "https://api.imgix.com/v2/image/purger"
    requests.post(purge_endpoint, auth=(API_KEY, ''), data={"url": url})

posts = Post.query.all()
users = User.query.all()

for post in posts:
    photo = "https://aperturus.imgix.net/" + post.photo
    purge_imgix_image(photo)

for user in users:
    profile_photo = "https://aperturus.imgix.net/" + user.photo
    purge_imgix_image(profile_photo)


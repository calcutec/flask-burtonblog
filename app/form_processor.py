from flask import request, render_template, g
from flask.ext.login import current_user
from forms import SignupForm, EditForm, PostForm, LoginForm, UploadForm
from app import db
from models import Post
from datetime import datetime
from uuid import uuid4

import json


class FormProcessor(object):
    def __init__(self, page, template=None):
        self.form = None
        self.form_template = None
        self.rendered_form = None
        self.page = page
        self.template = template

    def get_form_template(self):
        form_template = None
        if request.is_xhr:
            pass
        else:
            if self.template:
                form_template = "/assets/forms/" + self.template
            else:
                form_template = "/assets/forms/" + self.page.category + "_form.html"

        return form_template

    def render_form(self):
        if self.form:
            if self.form_template == '/assets/forms/post_form.html' \
                    or self.form_template == '/assets/forms/update_photo.html':
                post = dict()
                post['photo'] = self.page.assets['new_photo']
                context = {'form': self.form, 'post': post}
                rendered_form = render_template(self.form_template, **context)
            else:
                rendered_form = render_template(self.form_template, form=self.form)
        else:
            rendered_form = render_template(self.form_template)
        return rendered_form


class PhotosFormProcessor(FormProcessor):
    def __init__(self, *args, **kwargs):
        super(PhotosFormProcessor, self).__init__(*args, **kwargs)
        self.select_form()

    def select_form(self):
        if self.page.form:
            self.form = self.page.form
            self.process_form()
        else:
            self.get_form()
            self.form_template = self.get_form_template()
            self.rendered_form = self.render_form()

    def get_form(self):
        self.form = PostForm

    def process_form(self):
        pass


class UpdateFormProcessor(FormProcessor):
    def __init__(self, *args, **kwargs):
        super(UpdateFormProcessor, self).__init__(*args, **kwargs)
        self.select_form()

    def select_form(self):
        if self.page.form:
            self.form = self.page.form
            self.process_form()
        else:
            self.get_form()
            self.form_template = self.get_form_template()
            self.rendered_form = self.render_form()

    def get_form(self):
        self.form = EditForm()
        self.form.nickname.data = g.user.nickname
        self.form.about_me.data = g.user.about_me

    def process_form(self):
        if self.form.validate(current_user=current_user):
            g.user.nickname = self.form.nickname.data
            g.user.about_me = self.form.about_me.data
            g.user.photo = self.form.photo.data
            db.session.add(g.user)
            db.session.commit()
            if request.is_xhr:
                pass
            else:
                self.form = None
                self.rendered_form = None
        else:  # Return errors
            self.template = "members_form.html"
            self.form_template = self.get_form_template()
            self.rendered_form = self.render_form()


class SignupFormProcessor(FormProcessor):
    def __init__(self, *args, **kwargs):
        super(SignupFormProcessor, self).__init__(*args, **kwargs)
        self.select_form()

    def select_form(self):
        if self.page.form:
            self.form = self.page.form
            self.form = self.process_form()
        else:
            self.get_form()
            self.form_template = self.get_form_template()
            self.rendered_form = self.render_form()

    def get_form(self):
        pass

    def process_form(self):
        if self.form.validate_on_submit():
            newuser = self.page.save_user(self.form)
            if request.is_xhr:
                result = {'iserror': False,
                          'savedsuccess': True,
                          'newuser_nickname': newuser.nickname}
                return json.dumps(result)
            else:
                self.form = None
                self.rendered_form = None
        else:
            if request.is_xhr:
                self.form.errors['iserror'] = True
                return json.dumps(self.form.errors)
            else:
                self.template = "signup_form.html"
                self.form_template = self.get_form_template()
                self.rendered_form = self.render_form()


class LoginFormProcessor(FormProcessor):
    def __init__(self, *args, **kwargs):
        super(LoginFormProcessor, self).__init__(*args, **kwargs)
        self.select_form()

    def select_form(self):
        if self.page.form:
            self.form = self.page.form
            self.form = self.process_form()
        else:
            self.get_form()
            self.form_template = self.get_form_template()
            self.rendered_form = self.render_form()

    def get_form(self):
        self.form = {"loginform": LoginForm(), "signupform": SignupForm()}

    def render_form(self):
        rendered_form = None
        if self.form:
            if self.form_template == '/assets/forms/login_form.html':
                context = {'loginform': self.form['loginform'], 'signupform': self.form['signupform']}
                rendered_form = render_template(self.form_template, **context)
            elif self.form_template == '/assets/forms/email_login_form.html':
                context = {'loginform': self.form}
                rendered_form = render_template(self.form_template, **context)
        return rendered_form

    def process_form(self):
        if self.form.validate_on_submit():
            returninguser = self.page.login_returning_user(self.form)
            if request.is_xhr:
                result = {'iserror': False,
                          'savedsuccess': True,
                          'returninguser_nickname': returninguser.nickname}
                return json.dumps(result)
            else:
                self.form = None
                self.rendered_form = None
        else:
            if request.is_xhr:
                self.form.errors['iserror'] = True
                return json.dumps(self.form.errors)
            else:
                self.template = "email_login_form.html"
                self.form_template = self.get_form_template()
                self.rendered_form = self.render_form()


class UploadFormProcessor(FormProcessor):
    def __init__(self, *args, **kwargs):
        super(UploadFormProcessor, self).__init__(*args, **kwargs)
        self.select_form()

    def select_form(self):
        if self.page.form:
            self.form = self.page.form
            self.form = self.process_form()
        else:
            self.get_form()
            self.form_template = self.get_form_template()
            self.rendered_form = self.render_form()

    def get_form(self):
        if 'key' in request.args:
            if request.endpoint == "photos":
                self.page.assets['new_photo'] = request.args['key']
                self.form = PostForm()
                self.form.photo.data = self.page.assets['new_photo']
                self.template = "post_form.html"
            else:
                self.page.assets['new_photo'] = request.args['key']
                self.form = EditForm()
                self.form.photo.data = self.page.assets['new_photo']
                self.form.about_me.data = g.user.about_me
                self.form.nickname.data = g.user.nickname
                self.template = "update_photo.html"
        else:
            if request.endpoint == "photos":
                key = "user-images/" + str(g.user.id) + "/" + str(uuid4()) + ".jpeg"
                message = "Select New Photo"
            else:
                key = "user-images/" + str(g.user.id) + "/profile_image/" + str(uuid4()) + ".jpeg"
                message = "Change Profile Picture"
            self.form = UploadForm(key, message).s3_upload_form()

    def process_form(self):
        if self.form.validate_on_submit():
            photo_name = self.form.photo.data
            post = Post(body=self.form.body.data, timestamp=datetime.utcnow(),
                        author=g.user, photo=photo_name, writing_type="entry")
            db.session.add(post)
            db.session.commit()
            if request.is_xhr:
                response = post.json_view()
                response['savedsuccess'] = True
                return json.dumps(response)
            else:
                self.form = None
                self.rendered_form = None
        else:
            if request.is_xhr:
                self.form.errors['iserror'] = True
                return json.dumps(self.form.errors)
            else:
                self.template = "post_form.html"
                self.form_template = self.get_form_template()
                self.rendered_form = self.render_form()

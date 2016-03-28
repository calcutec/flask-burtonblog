from werkzeug.routing import BaseConverter
from app import app


class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]

app.url_map.converters['regex'] = RegexConverter


# this URL should return with 200: http://localhost:8000/abc0/foo/
# this URL should will return with 404: http://localhost:8000/abcd/foo/
@app.route('/<regex("[abcABC0-9]{4,6}"):uid>/<slug>/')
def example(uid, slug):
    return "uid: %s, slug: %s" % (uid, slug)

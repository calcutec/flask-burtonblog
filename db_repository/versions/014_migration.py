from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
post = Table('post', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('header', VARCHAR(length=140)),
    Column('body', TEXT),
    Column('timestamp', TIMESTAMP),
    Column('user_id', INTEGER),
    Column('photo', VARCHAR(length=240)),
    Column('thumbnail', VARCHAR(length=240)),
    Column('slug', VARCHAR(length=255)),
    Column('writing_type', VARCHAR(length=32)),
    Column('votes', INTEGER),
)

user = Table('user', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('firstname', VARCHAR(length=100)),
    Column('lastname', VARCHAR(length=100)),
    Column('nickname', VARCHAR(length=64)),
    Column('email', VARCHAR(length=120)),
    Column('pwdhash', VARCHAR(length=100)),
    Column('about_me', VARCHAR(length=140)),
    Column('profile_photo', VARCHAR(length=240)),
    Column('last_seen', TIMESTAMP),
    Column('type', INTEGER),
    Column('thumbnail', VARCHAR(length=240)),
    Column('photo', VARCHAR(length=240)),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['post'].columns['thumbnail'].drop()
    pre_meta.tables['user'].columns['profile_photo'].drop()
    pre_meta.tables['user'].columns['thumbnail'].drop()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['post'].columns['thumbnail'].create()
    pre_meta.tables['user'].columns['profile_photo'].create()
    pre_meta.tables['user'].columns['thumbnail'].create()

from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
exifstats = Table('exifstats', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('post_id', Integer),
    Column('Make', String(length=80)),
    Column('Model', String(length=80)),
    Column('DateTime', DateTime),
    Column('DateTimeOriginal', DateTime),
    Column('ShutterSpeedValue', String(length=80)),
    Column('FNumber', String(length=16)),
    Column('ExposureProgram', String(length=80)),
    Column('PhotographicSensitivity', String(length=80)),
    Column('FocalLength', String(length=80)),
    Column('FocalLengthIn35mmFilm', String(length=80)),
    Column('LensModel', String(length=80)),
    Column('Sharpness', String(length=80)),
    Column('PixelXDimension', String(length=80)),
    Column('PixelYDimension', String(length=80)),
    Column('Orientation', String(length=80)),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['exifstats'].columns['DateTimeOriginal'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['exifstats'].columns['DateTimeOriginal'].drop()

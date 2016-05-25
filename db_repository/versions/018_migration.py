from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
exifstats = Table('exifstats', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('post_id', Integer),
    Column('name', String(length=80)),
    Column('model', String(length=80)),
    Column('orientation', String(length=80)),
    Column('date_time', DateTime),
    Column('fNumber', String(length=16)),
    Column('exposure_program', String(length=80)),
    Column('photographic_sensitivity', String(length=80)),
    Column('shutterspeed_value', String(length=80)),
    Column('focal_length', String(length=80)),
    Column('pixel_x_dimension', String(length=80)),
    Column('pixel_y_dimension', String(length=80)),
    Column('focal_length_in_35mm', String(length=80)),
    Column('sharpness', String(length=80)),
    Column('lens_model', String(length=80)),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['exifstats'].columns['date_time'].create()
    post_meta.tables['exifstats'].columns['exposure_program'].create()
    post_meta.tables['exifstats'].columns['fNumber'].create()
    post_meta.tables['exifstats'].columns['focal_length'].create()
    post_meta.tables['exifstats'].columns['focal_length_in_35mm'].create()
    post_meta.tables['exifstats'].columns['lens_model'].create()
    post_meta.tables['exifstats'].columns['model'].create()
    post_meta.tables['exifstats'].columns['name'].create()
    post_meta.tables['exifstats'].columns['orientation'].create()
    post_meta.tables['exifstats'].columns['photographic_sensitivity'].create()
    post_meta.tables['exifstats'].columns['pixel_x_dimension'].create()
    post_meta.tables['exifstats'].columns['pixel_y_dimension'].create()
    post_meta.tables['exifstats'].columns['sharpness'].create()
    post_meta.tables['exifstats'].columns['shutterspeed_value'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['exifstats'].columns['date_time'].drop()
    post_meta.tables['exifstats'].columns['exposure_program'].drop()
    post_meta.tables['exifstats'].columns['fNumber'].drop()
    post_meta.tables['exifstats'].columns['focal_length'].drop()
    post_meta.tables['exifstats'].columns['focal_length_in_35mm'].drop()
    post_meta.tables['exifstats'].columns['lens_model'].drop()
    post_meta.tables['exifstats'].columns['model'].drop()
    post_meta.tables['exifstats'].columns['name'].drop()
    post_meta.tables['exifstats'].columns['orientation'].drop()
    post_meta.tables['exifstats'].columns['photographic_sensitivity'].drop()
    post_meta.tables['exifstats'].columns['pixel_x_dimension'].drop()
    post_meta.tables['exifstats'].columns['pixel_y_dimension'].drop()
    post_meta.tables['exifstats'].columns['sharpness'].drop()
    post_meta.tables['exifstats'].columns['shutterspeed_value'].drop()

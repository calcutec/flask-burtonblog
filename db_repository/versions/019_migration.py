from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
exifstats = Table('exifstats', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('post_id', INTEGER),
    Column('date_time', TIMESTAMP),
    Column('exposure_program', VARCHAR(length=80)),
    Column('fNumber', VARCHAR(length=16)),
    Column('focal_length', VARCHAR(length=80)),
    Column('focal_length_in_35mm', VARCHAR(length=80)),
    Column('lens_model', VARCHAR(length=80)),
    Column('model', VARCHAR(length=80)),
    Column('name', VARCHAR(length=80)),
    Column('orientation', VARCHAR(length=80)),
    Column('photographic_sensitivity', VARCHAR(length=80)),
    Column('pixel_x_dimension', VARCHAR(length=80)),
    Column('pixel_y_dimension', VARCHAR(length=80)),
    Column('sharpness', VARCHAR(length=80)),
    Column('shutterspeed_value', VARCHAR(length=80)),
)

exifstats = Table('exifstats', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('post_id', Integer),
    Column('Make', String(length=80)),
    Column('Model', String(length=80)),
    Column('DateTime', DateTime),
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
    pre_meta.tables['exifstats'].columns['date_time'].drop()
    pre_meta.tables['exifstats'].columns['exposure_program'].drop()
    pre_meta.tables['exifstats'].columns['fNumber'].drop()
    pre_meta.tables['exifstats'].columns['focal_length'].drop()
    pre_meta.tables['exifstats'].columns['focal_length_in_35mm'].drop()
    pre_meta.tables['exifstats'].columns['lens_model'].drop()
    pre_meta.tables['exifstats'].columns['model'].drop()
    pre_meta.tables['exifstats'].columns['name'].drop()
    pre_meta.tables['exifstats'].columns['orientation'].drop()
    pre_meta.tables['exifstats'].columns['photographic_sensitivity'].drop()
    pre_meta.tables['exifstats'].columns['pixel_x_dimension'].drop()
    pre_meta.tables['exifstats'].columns['pixel_y_dimension'].drop()
    pre_meta.tables['exifstats'].columns['sharpness'].drop()
    pre_meta.tables['exifstats'].columns['shutterspeed_value'].drop()
    post_meta.tables['exifstats'].columns['DateTime'].create()
    post_meta.tables['exifstats'].columns['ExposureProgram'].create()
    post_meta.tables['exifstats'].columns['FNumber'].create()
    post_meta.tables['exifstats'].columns['FocalLength'].create()
    post_meta.tables['exifstats'].columns['FocalLengthIn35mmFilm'].create()
    post_meta.tables['exifstats'].columns['LensModel'].create()
    post_meta.tables['exifstats'].columns['Make'].create()
    post_meta.tables['exifstats'].columns['Model'].create()
    post_meta.tables['exifstats'].columns['Orientation'].create()
    post_meta.tables['exifstats'].columns['PhotographicSensitivity'].create()
    post_meta.tables['exifstats'].columns['PixelXDimension'].create()
    post_meta.tables['exifstats'].columns['PixelYDimension'].create()
    post_meta.tables['exifstats'].columns['Sharpness'].create()
    post_meta.tables['exifstats'].columns['ShutterSpeedValue'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['exifstats'].columns['date_time'].create()
    pre_meta.tables['exifstats'].columns['exposure_program'].create()
    pre_meta.tables['exifstats'].columns['fNumber'].create()
    pre_meta.tables['exifstats'].columns['focal_length'].create()
    pre_meta.tables['exifstats'].columns['focal_length_in_35mm'].create()
    pre_meta.tables['exifstats'].columns['lens_model'].create()
    pre_meta.tables['exifstats'].columns['model'].create()
    pre_meta.tables['exifstats'].columns['name'].create()
    pre_meta.tables['exifstats'].columns['orientation'].create()
    pre_meta.tables['exifstats'].columns['photographic_sensitivity'].create()
    pre_meta.tables['exifstats'].columns['pixel_x_dimension'].create()
    pre_meta.tables['exifstats'].columns['pixel_y_dimension'].create()
    pre_meta.tables['exifstats'].columns['sharpness'].create()
    pre_meta.tables['exifstats'].columns['shutterspeed_value'].create()
    post_meta.tables['exifstats'].columns['DateTime'].drop()
    post_meta.tables['exifstats'].columns['ExposureProgram'].drop()
    post_meta.tables['exifstats'].columns['FNumber'].drop()
    post_meta.tables['exifstats'].columns['FocalLength'].drop()
    post_meta.tables['exifstats'].columns['FocalLengthIn35mmFilm'].drop()
    post_meta.tables['exifstats'].columns['LensModel'].drop()
    post_meta.tables['exifstats'].columns['Make'].drop()
    post_meta.tables['exifstats'].columns['Model'].drop()
    post_meta.tables['exifstats'].columns['Orientation'].drop()
    post_meta.tables['exifstats'].columns['PhotographicSensitivity'].drop()
    post_meta.tables['exifstats'].columns['PixelXDimension'].drop()
    post_meta.tables['exifstats'].columns['PixelYDimension'].drop()
    post_meta.tables['exifstats'].columns['Sharpness'].drop()
    post_meta.tables['exifstats'].columns['ShutterSpeedValue'].drop()

define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            el: "#image-preview",
            result: $('#result'),
            exifNode: $('#exif'),
            thumbNode: $('#thumbnail'),
            currentFile: null,
            coordinates: null,

            initialize: function () {
                if (window.createObjectURL || window.URL || window.webkitURL || window.FileReader) {
                    this.result.children().hide();
                }
            },

            events: {
                'change #file-input': 'dropChangeHandler',
            },
            
            dropChangeHandler: function(e) {
                e.preventDefault();
                e = e.originalEvent;
                var target = e.dataTransfer || e.target;
                var file = target && target.files && target.files[0];
                var options = {
                  maxWidth: this.result.width(),
                  canvas: true,
                  pixelRatio: window.devicePixelRatio,
                  downsamplingRatio: 0.5
                };
                if (!file) {
                  return
                }
                this.exifNode.hide();
                this.thumbNode.hide();
                var self = this;
                window.loadImage.parseMetaData(file, function (data) {
                  if (data.exif) {
                    // options.orientation = data.exif.get('Orientation');
                    options.orientation = data.exif[0x0112];
                    self.displayExifData(data.exif)
                  }
                  self.displayImage(file, options)
                })
          },
          displayExifData: function(exif) {
            var thumbnail = exif.get('Thumbnail');
            var tags = exif.getAll();
            var table = this.exifNode.find('table').empty();
            var row = $('<tr></tr>');
            var cell = $('<td></td>');
            var prop;
            for (prop in tags) {
              if (tags.hasOwnProperty(prop)) {
                if(prop in {'Make':'', 'Model':'', 'DateTime':'', 'ShutterSpeedValue':'', 'FNumber':'',
                        'ExposureProgram':'', 'PhotographicSensitivity':'', 'FocalLength':'',
                        'FocalLengthIn35mmFilm':'', 'LensModel':'', 'Sharpness':'', 'PixelXDimension':'',
                        'PixelYDimension':'', 'Orientation':''}) {
                        table.append(
                            row.clone()
                                .append(cell.clone().text(prop))
                                .append(cell.clone().text(tags[prop]))
                        );
                }
              }
            }
            this.exifNode.show()
          },
          displayImage: function(file, options) {
            window.currentFile = file;
            if (!loadImage(
                file,
                this.replaceResults,
                options
              )) {
              this.result.children().replaceWith(
                $('<span>Your browser does not support the URL or FileReader API.</span>')
              )
            }
          },
          replaceResults: function(img) {
            var content;
            var self = this;
            if (!(img.src || img instanceof HTMLCanvasElement)) {
              content = $('<span>Loading image file failed</span>')
            } else {
              content = $('<a target="_blank">').append(img)
                .attr('download', currentFile.name)
                .attr('href', img.src || img.toDataURL())
            }
            $('#result').children().replaceWith(content);
            $('#photo-submit').removeClass("hide");
          }
        });
    }
);
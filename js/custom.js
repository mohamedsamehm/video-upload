$(document).ready(function () {
  $(function() {
    $(document).on('change', ':file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });

		$(document).ready( function() {
			$(':file').on('fileselect', function(event, numFiles, label) {
					var input = $(this).parents('.input-group').find(':text'),
							log = numFiles > 1 ? numFiles + ' files selected' : label;
					if( input.length ) {
							input.val(log);
					} else {
							if( log ) alert(log);
					}
			});
		});
    var _CANVAS = document.querySelector("#video-canvas"),
        _CTX = _CANVAS.getContext("2d"),
        _VIDEO = document.querySelector("#main-video"),
        _IMG = $('#image'),
        _IMGCONT = $('.img');
    const image = document.getElementById('image');
    const cropper = new Cropper(image);
    document.querySelector("#file-to-upload").addEventListener('change', function() {
      document.querySelector("#main-video source").removeAttribute('src');
      _VIDEO.style.display = 'none';
      _IMGCONT.hide();
      $('#width').val(0);
      $('#height').val(0);
      $('#top').val(0);
      $('#left').val(0);
      _IMG.removeAttr('src');
      $('.cropper-container').remove();
      cropper.destroy();
      _VIDEO.load();
      document.querySelector("#main-video source").setAttribute('src', URL.createObjectURL(document.querySelector("#file-to-upload").files[0]) + '#t=3');
      _VIDEO.addEventListener('loadedmetadata', function() {
        _CANVAS.width = _VIDEO.videoWidth;
        _CANVAS.height = _VIDEO.videoHeight;
      });
      _VIDEO.onseeked = function () {
        _CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight);
        document.querySelector('img').setAttribute('src', _CANVAS.toDataURL());
        _IMGCONT.show();
        _VIDEO.style.display = 'inline';
        const image = document.getElementById('image');
        const cropper = new Cropper(image, {
          aspectRatio: 16 / 9,
          crop(event) {
            $('#width').val(Math.floor(event.detail.width));
            $('#height').val(Math.floor(event.detail.height));
            $('#top').val(Math.floor(event.detail.y));
            $('#left').val(Math.floor(event.detail.x));
          },
        });
        if (!document.getElementById('image').hasAttribute('src') || _IMG.attr('src') == 'data:,' || _IMG.attr('src') == undefined) {
          _VIDEO.style.display = 'none';
          _IMGCONT.hide();
          $('.cropper-container').remove();
          cropper.destroy();
        }
      };
    });
	});
});

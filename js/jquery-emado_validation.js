( function($) {
        $.fn.nvalidate = function(_options) {
            var options = $.extend({
                dataType : 'string',
                required : false,
                limit : [null, null],
            }, _options);

            function nozzha_validate() {
                var val = $(this).val().trim();

                $(this).parent().removeClass('has-error');

                if ((val == null || val.length < 1 ) && options.required) {
                    $(this).parent().addClass('has-error');
                }

                switch ( options.dataType ) {
                    case 'integer':
                        var regex = /^[\-]?[\d]+$/;

                        if (! regex.test(val)) {
                            $(this).parent().addClass('has-error');
                        } else {
                            val = parseInt(val);

                            if (options.limit[0] !== null && val < options.limit[0]) {
                                $(this).parent().addClass('has-error');
                            } else if (options.limit[1] !== null && val > options.limit[1]) {
                                $(this).parent().addClass('has-error');
                            }
                        }
                        break;
                    case 'float':
                        var regex = /^\d*(\.\d*)?$/;

                        if (! regex.test(val)) {
                            $(this).parent().addClass('has-error');
                        } else {
                            val = parseFloat(val);

                            if (options.limit[0] !== null && val < options.limit[0]) {
                                $(this).parent().addClass('has-error');
                            } else if (options.limit[1] !== null && val > options.limit[1]) {
                                $(this).parent().addClass('has-error');
                            }
                        }
                        break;
                }
            }

            return this.each(function() {
                $(this).keyup(nozzha_validate);
                $(this).change(nozzha_validate);
                $(this).blur(nozzha_validate);
                // nozzha_validate(); -- best
            });
        };
    }(jQuery)); 
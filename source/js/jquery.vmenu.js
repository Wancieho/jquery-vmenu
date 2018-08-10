; (function ($, window, document, undefined) {
    "use strict";

    var pluginName = "vMenu",
        defaults = {
            allowMultiple: false
        };

    function Plugin(element, options) {
        this.element = element;

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {
            select(this);
            events(this);
        }
    });

    function select(scope) {
        var text = $(scope.element).find('.selected').find('a').text();

        $(scope.element).children('a').text(text !== '' ? text : 'Select');
    }

    function events(scope) {
        $(document).on('click', function () {
            $(scope.element).children('ul').stop(true, true).slideUp();
        });

        $(scope.element).children('a').on('click', function () {
            if (!$(this).hasClass('open')) {
                $(this).addClass('open');
            } else {
                $(this).removeClass('open');
            }

            $(this).siblings('ul').stop(true).slideToggle();
        });

        // all anchors with hash deny default click
        $(scope.element).find('*').on('click', function (event) {
            event.stopPropagation();
        });

        // all anchors with hash deny default click
        $(scope.element).find('a[href="#"]').on('click', function (event) {
            event.preventDefault();
        });

        $(scope.element).find('li > a').on('click', function () {
            var self = $(this);

            if ($(this).attr('href') !== '#') {
                if (!$(this).hasClass('open')) {
                    $(this).addClass('open');
                } else {
                    $(this).removeClass('open');
                }
            }

            $(this).siblings('ul').stop(true).slideToggle();

            if (!scope.allowMultiple) {
                // #TODO: finish
            }
        });
    }

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);

/**
 * Created by oscb on 4/14/15.
 */
(function() {
    'use strict';

    var options = { token: token };
    location.href = 'pebblejs://close#' + encodeURIComponent(JSON.stringify(options));

}());
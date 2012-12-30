// data_envelope = {id:"123", checks:{}, contents:{}}

(function($) {
  storageunit = {};
  storageunit.store = function (data_envelope, degree) {
    var previousitem;
    // if local storage is up, first merge with that.
    if (degree >= 1 && typeof(Storage) !== "undefined") {
      if (data_envelope.id) {
        data_envelope.checks.local_sync = Date.parse(Date());
        localStorage.setItem(data_envelope.id, JSON.stringify({"checks":data_envelope.checks, "contents":data_envelope.contents}));
      }
      else {
        
      }
    }
    if (degree >= 2 && navigator.onLine) {
      if (data_envelope.id) {
        data_envelope.checks.remote_start = Date.parse(Date());
        $.ajax({
          "url": "http://service.recorder.com:9080",
          "dataType": "jsonp",
          "data": data_envelope,
          "type": "GET",
          "error": function(XMLHttpRequest, textStatus, errorThrown) {
            var e = errorThrown||''; 
            console.log("an error was reported after a request to "+url+" :: "+XMLHttpRequest.statusText+" :: "+textStatus+" :: "+JSON.stringify(e, null, " "));
            //alert("an error was reported after a request to "+url+" :: "+XMLHttpRequest.statusText+" :: "+textStatus+" :: "+JSON.stringify(e, null, " "));
          },
          "success": function(resp) {
            console.log("resp "+ JSON.stringify(resp));
            data_envelope.checks.remote_sync = Date.parse(Date());
          }
        });
      }
      else {
        
      }      
    }

  };
  storageunit.retrieve = function () {};
})(jQuery);

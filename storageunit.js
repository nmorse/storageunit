// data_envelope = {id:"123", checks:{}, contents:{}}

(function($) {
  var opt = {};
  var status = [];
  storageunit = {"remote_storage_service":{"dataType": "jsonp"}, "default_degree":2, "instance_id":0};
  storageunit.setup = function (options) {
    opt = $.extend(opt, options);
    if (typeof(Storage) !== "undefined")) {
      status[1] = {};
      status[1].has_su_data = (localStorage.getItem("storageunit_"+opt.instance_id));
  };
  storageunit.store = function (data_envelope, degree) {
    
    var requested_degree = degree;
    if (typeof degree === "undefined") {requested_degree = opt.default_degree;}
    
    // if local storage is up, first merge with that.
    if (degree >= 1 && typeof(Storage) !== "undefined") {
      if (data_envelope.id) {
        localStorage.setItem(data_envelope.id, JSON.stringify({"checks":data_envelope.checks, "contents":data_envelope.contents}));
        data_envelope.sync.degree = Date.parse(Date());
      }
      else {
        
      }
    }
    if (degree >= 2 && navigator.onLine && opt.remote_storage_service.url) {
      if (data_envelope.id) {
        data_envelope.checks.remote_start = Date.parse(Date());
        $.ajax({
          "url": opt.remote_storage_service.url,
          "dataType": opt.remote_storage_service.dataType,
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

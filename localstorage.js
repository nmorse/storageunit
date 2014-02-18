(funciton ($) {
  var outcome = {"no_storage":"storage not availible", "overwritten":"saved to existing", "not_overwritten":"did not overwrite existing", "new":"created new", "pending":"storage operation submitted"};
  var opt = {proposed_name:"new", overwrite:false};
  if (!storageunit) {storageunit = {};}
  storageunit.localstorage = {};
  torageunit.localstorage.save = function(options) {
    opt = $.extend(opt, options);
    
    var local_storehb_graphs;
    if (typeof Storage !== "undefined") {
        //use local storage
        if (!localStorage.hb_graphs) {
            localStorage.hb_graphs = "{}";
        }
        local_hb_graphs = JSON.parse(localStorage.hb_graphs);
        if(local_hb_graphs[opt.proposed_name]) {
            if (opt.overwrite) {
                local_hb_graphs[opt.proposed_name] = JSON.parse(export_graph_json(g));
                localStorage.hb_graphs = JSON.stringify(local_hb_graphs);
                $(document).trigger("hbg_save_status", [{"outcome": outcome.overwritten, "target": "local", "final":true}]);
                $('#graph_storage').html("local");
                $('#graph_title').html(opt.proposed_name);
                g_aux.name = opt.proposed_name;
                ///$('#graph_input_name_n1').val(opt.proposed_name);
                ///$('#graph_input_name_n2').val(opt.proposed_name);
            }
            else {
                $(document).trigger("hbg_save_status", [{"outcome": outcome.not_overwritten, "target": "local", "final":true}]);
            }
        }
        else {
            local_hb_graphs[opt.proposed_name] = JSON.parse(export_graph_json(g));
            localStorage.hb_graphs = JSON.stringify(local_hb_graphs);
            $(document).trigger("hbg_save_status", [{"outcome": outcome.new, "target": "local", "final":true}]);
            $('#graph_storage').html("local");
            $('#graph_title').html(opt.proposed_name);
            g_aux.name = opt.proposed_name;
            ///$('#graph_input_name_n1').val(opt.proposed_name);
            ///$('#graph_input_name_n2').val(opt.proposed_name);
        }
    }
    else {
        $(document).trigger("hbg_save_status", [{"outcome": outcome.no_storage, "target": "local", "final":true}]);
    }
    
    if (navigator.online) {
        if (online_service) {
            //post to service
            $(document).trigger("hbg_save_status", [{"outcome": outcome.pending, "target": "online", "final":false}]);
        }
        else {
            $(document).trigger("hbg_save_status", [{"outcome": outcome.no_storage, "target": "online", "final":true}]);
        }
    }
  };
})(JQuery);

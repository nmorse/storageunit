(funciton () {
  var outcome = ["storage not availible", "saved to existing", "did not overwrite existing", "created new", "storage operation submitted"];
  if (!storageunit) {storageunit = {};}
  storageunit.localstorage = {};
  torageunit.localstorage.save = function(proposed_name, overwrite) {
    
    var local_storehb_graphs;
    if (typeof Storage !== "undefined") {
        //use local storage
        if (!localStorage.hb_graphs) {
            localStorage.hb_graphs = "{}";
        }
        local_hb_graphs = JSON.parse(localStorage.hb_graphs);
        if(local_hb_graphs[proposed_name]) {
            if (overwrite) {
                local_hb_graphs[proposed_name] = JSON.parse(export_graph_json(g));
                localStorage.hb_graphs = JSON.stringify(local_hb_graphs);
                $(document).trigger("hbg_save_status", [{"outcome": outcome[1], "target": "local", "final":true}]);
                $('#graph_storage').html("local");
                $('#graph_title').html(proposed_name);
                g_aux.name = proposed_name;
                ///$('#graph_input_name_n1').val(proposed_name);
                ///$('#graph_input_name_n2').val(proposed_name);
            }
            else {
                $(document).trigger("hbg_save_status", [{"outcome": outcome[2], "target": "local", "final":true}]);
            }
        }
        else {
            local_hb_graphs[proposed_name] = JSON.parse(export_graph_json(g));
            localStorage.hb_graphs = JSON.stringify(local_hb_graphs);
            $(document).trigger("hbg_save_status", [{"outcome": outcome[3], "target": "local", "final":true}]);
            $('#graph_storage').html("local");
            $('#graph_title').html(proposed_name);
            g_aux.name = proposed_name;
            ///$('#graph_input_name_n1').val(proposed_name);
            ///$('#graph_input_name_n2').val(proposed_name);
        }
    }
    else {
        $(document).trigger("hbg_save_status", [{"outcome": outcome[0], "target": "local", "final":true}]);
    }
    
    if (navigator.online) {
        if (online_service) {
            //post to service
            $(document).trigger("hbg_save_status", [{"outcome": outcome[4], "target": "online", "final":false}]);
        }
        else {
            $(document).trigger("hbg_save_status", [{"outcome": outcome[0], "target": "online", "final":true}]);
        }
    }
  };
})();

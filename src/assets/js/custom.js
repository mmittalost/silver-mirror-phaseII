 $(document).ready(function() {

	$(".first_tab").champ();

	$(".accordion_example").champ({
		plugin_type: "accordion",
		side: "left",
		active_tab: "3",
		controllers: "true"
	});

	$(".second_tab").champ({
		plugin_type: "tab",
		side: "right",
		active_tab: "1",
		controllers: "false"
	});

	$(".third_tab").champ({
		plugin_type: "tab",
		side: "",
		active_tab: "4",
		controllers: "true",
		ajax: "true",
		show_ajax_content_in_tab: "4",
		content_path: "html.txt"
	});
	$(".multipleTab").champ({
		//plugin_type :  "accordion",
		multiple_tabs: "true"
	});

});
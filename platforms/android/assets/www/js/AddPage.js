currentPage = {};
currentPage.init = function() {
	console.log("AddPage :: init");
};
currentPage.back = function() {
	console.log("AddPage :: back");
	$("body").load(path + "pages/ListPage.html", function() {
		$.getScript(path + "js/ListPage.js", function() {
			if (currentPage.init) {
				currentPage.init();
			}
		});
	});
};
currentPage.add = function() {
	console.log("AddPage :: add");
	var name = $("#name").val();
	var description = $("#description").val();
	formData = {
		name: $("#name").val(),
		description: $("#description").val()
	}
	if (name == "") {
		alert("Please enter name");
	} else if (description == "") {
		alert("Please enter description");
	} else {
		$.ajax({
			type: "post",
			url: "http://demo.revivalx.com/todolist-api/create_task.php",
			data: formData,
			dataType: "json",
			success: function(data) {
				alert("Add task success");
				$("body").load(path + "pages/ListPage.html", function() {
					$.getScript(path + "js/ListPage.js", function() {
						if (currentPage.init) {
							currentPage.init();
						}
					});
				});
			},
			error: function() {
				alert("Add task failure");
			}
		});
	}
};
currentPage = {};
currentPage.init = function() {
	console.log("DetailPage :: init");
	detailTask();
};
currentPage.back = function() {
	console.log("DetailPage :: back");
	$("body").load(path + "pages/ListPage.html", function() {
		$.getScript(path + "js/ListPage.js", function() {
			if (currentPage.init) {
				currentPage.init();
			}
		});
	});
};
currentPage.edit = function() {
	console.log("DetailPage :: edit");
	var taskId = sessionStorage.taskId;
	var name = $("#name").val();
	var description = $("#description").val();
	formData = {
		taskId: sessionStorage.taskId,
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
			url: "http://demo.revivalx.com/todolist-api/update_task.php",
			data: formData,
			dataType: "json",
			success: function(data) {
				alert("Edit task success");
				$("body").load(path + "pages/ListPage.html", function() {
					$.getScript(path + "js/ListPage.js", function() {
						if (currentPage.init) {
							currentPage.init();
						}
					});
				});
			},
			error: function() {
				alert("Edit task failure");
			}
		});
	}
};

function detailTask() {
	formData = {
		taskId: sessionStorage.taskId
	}
	$.ajax({
		type: "get",
		url: "http://demo.revivalx.com/todolist-api/get_task_details.php",
		data: formData,
		dataType: "json",
		success: function(data) {
			$('#name').val(data.task[0].name);
			$('#description').val(data.task[0].description);
		},
		error: function() {
			alert("Detail task failure");
		}
	});
}
currentPage.remove = function() {
	console.log("DetailPage :: delete");
	deleteTask();
};

function deleteTask() {
	formData = {
		taskId: sessionStorage.taskId
	}
	$.ajax({
		type: "post",
		url: "http://demo.revivalx.com/todolist-api/delete_task.php",
		data: formData,
		dataType: "json",
		success: function(data) {
			alert("Delete task success");
			$("body").load(path + "pages/ListPage.html", function() {
				$.getScript(path + "js/ListPage.js", function() {
					if (currentPage.init) {
						currentPage.init();
					}
				});
			});
		},
		error: function() {
			alert("Delete task failure");
		}
	});
}
currentPage = {};
currentPage.init = function() {
	console.log("ListPage :: init");
	listTasks();
};
currentPage.loadPage = function(pageIndex) {
	console.log("ListPage :: loadPage :: pageIndex: " + pageIndex);
	$("body").load(path + "pages/" + pageIndex + ".html");
	$.getScript(path + "js/" + pageIndex + ".js", function() {
		if (currentPage.init) {
			currentPage.init();
		}
	});
};
currentPage.detailPage = function(taskId) {
	sessionStorage.setItem("taskId", taskId);
	$("body").load(path + "pages/DetailPage.html");
	$.getScript(path + "js/DetailPage.js", function() {
		if (currentPage.init) {
			currentPage.init();
		}
	});
};

function listTasks() {
	$.ajax({
		type: "get",
		url: "http://demo.revivalx.com/todolist-api/get_all_tasks.php",
		dataType: "json",
		success: function(data) {
			var ul = $('#taskList');
			var html = '';
			$.each(data.tasks, function(index, item) {
				html += '<li class="table-view-cell">';
				html += '<a class="navigate-right" onclick="currentPage.detailPage(' +
					item.taskId + ');" >';
				html += item.name;
				html += '</a></li>';
			});
			ul.append(html);
		},
		error: function() {
			alert("List task failure");
		}
	});
}
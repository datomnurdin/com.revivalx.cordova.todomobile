<?php
 
/*
 * Following code will update a task information
 * A task is identified by task id (taskId)
 */
 
// array for JSON response
$response = array();
 
// check for required fields
if (isset($_POST['taskId']) && isset($_POST['name']) && isset($_POST['description'])) {
 
    $taskId = $_POST['taskId'];
    $name = $_POST['name'];
    $description = $_POST['description'];
 
    // include db connect class
    require_once __DIR__ . '/db_connect.php';
 
    // connecting to db
    $db = new DB_CONNECT();
 
    // mysql update row with matched pid
    $result = mysql_query("UPDATE tasks SET name = '$name', description = '$description', dateUpdated = NOW() WHERE taskId = $taskId");
 
    // check if row inserted or not
    if ($result) {
        // successfully updated
        $response["success"] = 1;
        $response["message"] = "Task successfully updated.";
 
        // echoing JSON response
        echo json_encode($response);
    } else {
 
    }
} else {
    // required field is missing
    $response["success"] = 0;
    $response["message"] = "Required field(s) is missing";
 
    // echoing JSON response
    echo json_encode($response);
}
?>
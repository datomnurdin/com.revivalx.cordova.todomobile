<?php
 
/*
 * Following code will get single task details
 * A task is identified by task id (taskId)
 */
 
// array for JSON response
$response = array();
 
// include db connect class
require_once __DIR__ . '/db_connect.php';
 
// connecting to db
$db = new DB_CONNECT();
 
// check for post data
if (isset($_GET["taskId"])) {
    $taskId = $_GET['taskId'];
 
    // get a task from task table
    $result = mysql_query("SELECT *FROM tasks WHERE taskId = $taskId");
 
    if (!empty($result)) {
        // check for empty result
        if (mysql_num_rows($result) > 0) {
 
            $result = mysql_fetch_array($result);
 
            $task = array();
            $task["taskId"] = $result["taskId"];
            $task["name"] = $result["name"];
            $task["description"] = $result["description"];
            $task["dateCreated"] = $result["dateCreated"];
            $task["dateUpdated"] = $result["dateUpdated"];
            // success
            $response["success"] = 1;
 
            // user node
            $response["task"] = array();
 
            array_push($response["task"], $task);
 
            // echoing JSON response
            echo json_encode($response);
        } else {
            // no task found
            $response["success"] = 0;
            $response["message"] = "No task found";
 
            // echo no users JSON
            echo json_encode($response);
        }
    } else {
        // no task found
        $response["success"] = 0;
        $response["message"] = "No task found";
 
        // echo no users JSON
        echo json_encode($response);
    }
} else {
    // required field is missing
    $response["success"] = 0;
    $response["message"] = "Required field(s) is missing";
 
    // echoing JSON response
    echo json_encode($response);
}
?>
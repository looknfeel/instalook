<?

$user = $_GET['user'];
$info = search_user($user);
$id = $info['id'];
$user_counts = user_counts($id);

function build_query($query) {
	$base_url = 'https://api.instagram.com/v1';
	$client_id = '143663387';
	$acces_token = '&access_token=143663387.a29d0b1.4625426751a842d08a9dae214fc0d42c';	
	return $base_url.$query.$acces_token;
}

function search_user($query) {
	$response = json_decode(file_get_contents(build_query('/users/search?q='.$query)), true);
	return $response['data'][0];
}

function user_counts($query) {
	$response = json_decode(file_get_contents(build_query('/users/'.$query.'?')), true);
	return $response['data']['counts'];
}

function user_media($id, $pagination_url = NULL) {
	if ($pagination_url !== NULL) {
		$response = json_decode(file_get_contents($pagination_url), true);		
	} else {
		$response = json_decode(file_get_contents(build_query('/users/'.$id.'/media/recent?')), true);		
	}

	// var_dump(count($response['pagination']));
	if (count($response['pagination']) > 0) {
		$next = true;
	} else {
		$next = false;
	}

	if (isset($response['pagination']['next_url'])) {
		$next_url = $response['pagination']['next_url'];
	} else {
		$next_url = NULL;
	}
	return array($response['data'], $next, $next_url);
}

function media_score($likes = 0, $comments = 0) {
	$c_score = $comments * 3;
	$score = $likes + $c_score;
	$l_percentage = (($likes/$score)*100).'%';
	return array($likes, $comments, $score, $l_percentage);
}

function strtime_to_data($time) {
	$date = explode(", ", date("m.d.y, H:i:s", $time));
	return $date;
}

?>
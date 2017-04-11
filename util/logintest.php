<?php
	$curl = curl_init();
	$url = "http://127.0.0.1/isstest/user/login";
	curl_setopt($curl, CURLOPT_URL, $url);
	//curl_setopt($curl, CURLOPT_COOKIEFILE, "/tmp/cookie.txt");
	//curl_setopt($curl, CURLOPT_COOKIEJAR, "/tmp/cookie.txt");
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_POST, 1);

    $postdata = array(
    	'name' => 'admin',
    	'pass' => '0re0maple',
    	'form_id' => 'user_login',
    	'op' => 'Log in'
    );
    curl_setopt($curl, CURLOPT_POSTFIELDS, $postdata);

    $result = curl_exec($curl);
    $headers = curl_getinfo($curl);
    curl_close($curl);

    if($headers['url'] == $url) {
    	die('Cannot login.');
    } else {
    	echo('Login success.');
    }
?>
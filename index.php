<!DOCTYPE html>
<!--[if lt IE 7]> <html lang="en" class="no-js ie6 oldie"> <![endif]-->
<!--[if IE 7]>    <html lang="en" class="no-js ie7 oldie"> <![endif]-->
<!--[if IE 8]>    <html lang="en" class="no-js ie8 oldie"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class='no-js' lang='en'>
  <!--<![endif]-->
  <head>
    <meta charset='utf-8' />
    <meta content='IE=edge,chrome=1' http-equiv='X-UA-Compatible' />
    <title></title>
    <meta content='' name='description' />
    <meta content='' name='author' />
    <meta content='width=device-width, initial-scale=1.0' name='viewport' />
    <link href='css/style.css' rel='stylesheet' />
    <script src='js/modernizr-2.0.6.min.js'></script>
  </head>
  <body>
    <div id='container'>
      <header></header>
      <div id='main' role='main'>
      	<?
      	$client_id = "143663387";
      	if (!empty($_GET['user'])) {
      		$user = $_GET['user'];
      		$username_search_url = "https://api.instagram.com/v1/users/search?q=".$user."&access_token=143663387.a29d0b1.4625426751a842d08a9dae214fc0d42c";
      		$username_search = json_decode(file_get_contents($username_search_url), true);
      		// var_dump($username_search);
      		$id = $username_search['data'][0]['id'];
      		?>
      		<img src="<?= $username_search['data'][0]['profile_picture'] ?>" alt="">
      		<div>Username: <?= $username_search['data'][0]['username'] ?></div>
      		<div>ID: <?= $id ?></div>
      		<div>Full Name: <?= $username_search['data'][0]['full_name'] ?></div>
      		<?
      	} else {
      	?>
      	<form action="">
      		<input type="text" name="user">
      		<input type="submit">
      	</form>
      	<? } ?>
      </div>
      <footer></footer>
    </div>
    <script src='//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js'></script>
    <script>
      window.jQuery || document.write("<script src='js/jquery-1.6.2.min.js'>\x3C/script>")
    </script>
    <script src='js/plugins.js'></script>
    <script src='js/script.js'></script>
    <script>
      var _gaq=[["_setAccount","UA-XXXXX-X"],["_trackPageview"],["_trackPageLoadTime"]];
      (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
      g.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";
      s.parentNode.insertBefore(g,s)}(document,"script"));
    </script>
    <!--[if lt IE 7]>
    <script src='//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js'></script>
    <script>
      window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})});
    </script>
    <![endif]-->
  </body>
</html>

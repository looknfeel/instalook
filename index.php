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
    <link href='stylesheets/style.css' rel='stylesheet' />
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
    <script src='js/modernizr-2.0.6.min.js'></script>
  </head>
  <body>
    <div id='container'>
      <header></header>
      <div id='main' role='main'>
      	<?
      	if (!empty($_GET['user'])) {
	      	include('inc/functions.php');
      		?>
      		<section class="profile">
      			<div class="container">
      				<img class="profile" src="<?= $info['profile_picture'] ?>" alt="">
      				<div class="info">
      					<div class="full_name"><?= $info['full_name'] ?></div>
      					<div class="username">@<?= $info['username'] ?></div>
      					<div class="id"><?= $info['id'] ?></div>
      				</div>
      				<div class="count">
      					<div class="item"><?= $user_counts["media"] ?><br><span>posts</span></div>
      					<div class="item"><?= $user_counts["followed_by"] ?><br><span>followers</span></div>
      					<div class="item"><?= $user_counts["follows"] ?><br><span>following</span></div>
      				</div>
      			</div>
      		</section>
      		<?
      		$medias = user_media($id);
      		// var_dump($media);

      		?>
      		<section class="media">
      			<div class="container">
      				<? foreach ($medias as $key => $media) : ?>
      					<div class="item">
      						<div class="photo">
      							<img class="photo" src="<?= $media['images']['low_resolution']['url'] ?>" alt="">
      							<div class="info">
      								<div class="inner_content">
		      							<div class="date">
			      							<? $date = strtime_to_data($media['created_time']) ?>
		      								<div class="day"><?= $date[0] ?></div>
		      								<div class="time"><?= $date[1] ?></div>
	      								</div>
      								</div>
      							</div>
      						</div>
      						<section class="data">
      							<? $count = media_score($media['likes']['count'], $media['comments']['count']) ?>
      							<div class="left">
	      							<div class="metrics like"><?= $count[0] ?></div>
	      							<div class="metrics comment"><?= $count[1] ?></div>
      							</div>
      							<div class="metrics score"><?= $count[2] ?></div>
      							<div class="metrics score"></div>
      							<div class="percentage" style="width: <?= $count[3] ?>;"></div>
      						</section>
      					</div>
      				<? endforeach; ?>
      			</div>
      		</section>
      		<?
      	} else {
      	?>
      		<section class="search">
      			<div class="container">
      				<form action="">
      					<input type="text" name="user">
      					<input type="submit" value="Procurar">
      				</form>		
      			</div>
      		</section>
		    	
      	<? } ?>
      </div>
      <footer></footer>
    </div>
    <script src='//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js'></script>
    <script>
      window.jQuery || document.write("<script src='javascripts/jquery-1.6.2.min.js'>\x3C/script>")
    </script>
    <script src='javascripts/plugins.js'></script>
    <script src='javascripts/script.js'></script>
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

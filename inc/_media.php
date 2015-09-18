<?
$medias = user_media($id)[0];
foreach ($medias as $key => $media) : ?>
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
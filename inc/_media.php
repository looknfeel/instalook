<script>document.title = "@<?= $info['username'] ?> | Instalook";</script>
<?
$media_result = user_media($id);
$next = true;
$first = true;
	while ($next == true) {
		if ($first !== true) {
			$media_result = user_media($id, $next_url);
			$next_url = $media_result[2];
		}
		$next_url = $media_result[2];
		$medias = $media_result[0];
		foreach ($medias as $key => $media) : ?>
			<? $count = media_score($media['likes']['count'], $media['comments']['count']) ?>
			<? $date = unixtimestamp_to_data($media['created_time']) ?>
			<div class="item mix <?= $date[3] ?> <?= $date[4] ?>" data-likes="<?= $count[0] ?>" data-comments="<?= $count[1] ?>" data-score="<?= $count[2] ?>" data-date="<?= $date[2] ?>" data-month="<?= $date[3] ?>">
				<div class="photo">
					<img class="photo" src="<?= $media['images']['low_resolution']['url'] ?>" alt="">
					<div class="info">
						<div class="inner_content">
							<div class="date">
								<div class="day"><?= $date[0] ?></div>
								<div class="time"><?= $date[1] ?></div>
								<div class="caption"><?= $media["caption"]["text"] ?></div>
							</div>
						</div>
					</div>
					<div class="status"></div>
					<a href="<?= $media['link'] ?>" target="_new" class="link"></a>
				</div>
				<section class="data">
					<div class="left">
						<div class="metrics like"><?= $count[0] ?></div>
						<div class="metrics comment"><?= $count[1] ?></div>
					</div>
					<div class="metrics score"><?= $count[2] ?></div>
					<div class="percentage" style="width: <?= $count[3] ?>;"></div>
				</section>
			</div>
		<?
		endforeach;
		$first = false;
		if ($media_result[1] !== true) {
			$next = false;
		}
	}
?>

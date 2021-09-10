<?php
define('IS_AJAX', isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');
if(!IS_AJAX) {die("<div style='width: 100%; height: 100%; position: fixed; background: #212833; left: 0; top: 0;'><div style='width: 70%; margin: 150px auto 0 auto; background: #fff; text-align:center; padding: 80px 100px; border-radius: 20px; font-family: Verdana; box-shadow: 0 0 0 3px rgba(255,255,255,0.2);'><h3 style='color: #000; text-transform: uppercase; margin: 0;'>Huh.. wait a second!</h3><h1 style='margin: 5px 0 0 0; color: #fc4349; text-transform: uppercase; letter-spacing: 1px;'>Nosey little mouse, aren't you?</h1><p style='font-size: 1em; color: #555;'>There is nothing interesting here, no point waisting your time.</p></div></div>");}
?>
<div id="master-modal" class="master-modal animated bounceIn">
	<div class="console-wrapper">	
		<div class="loader-wrapper">
			<div class="loader">Loading...</div>
		</div>
		<div class="console-generation-item console-generation-item-r-1">
			<img src="img/r-item-1.png" class="resource-select-icon" />
			<div class="console-generation-item-value console-generation-item-value-r-1">0</div>
			<div class="resource-item-label">CoD Points</div>
		</div>
		<div class="console-msg-wrapper animated pulse infinite">
			<div class="console-msg"></div>
		</div>
		<div class="console-loadbar-wrapper">
			<div id="progressBarConsole" class="console-loadbar animated bounceIn"><div></div></div>
		</div>
	</div>
</div>
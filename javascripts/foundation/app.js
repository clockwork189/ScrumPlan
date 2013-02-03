;(function ($, window, undefined) {
	'use strict';

	var $doc = $(document),
			Modernizr = window.Modernizr,
			currentCompany = "",
			scrumData = {},
			scrumForm = {},
			currentApp = {},
			userID = null;

	$(document).ready(function() {
		$.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
		$.fn.foundationButtons          ? $doc.foundationButtons() : null;
		$.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
		$.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
		$.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
		$.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
		$.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
		$.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null;
		$.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
		$.fn.foundationMagellan         ? $doc.foundationMagellan() : null;
		$.fn.foundationClearing         ? $doc.foundationClearing() : null;

		$.fn.placeholder                ? $('input, textarea').placeholder() : null;
	
	});
	
	
	var rootRef = new Firebase('https://scrumplan.firebaseIO.com/');
	var authClient = new FirebaseAuthClient(rootRef, function(error, user) {
		if (error) {
		  // an error occurred while attempting login
		  console.log(error);
		} else if (user) {
		  // user authenticated with Firebase
			userID = user.id;
			initializePage($("#content").data('app'));
		} else {
		  // user is logged out
			// PROMPT AGAIN
			$("#login-form")
				.reveal()
				.find('.accept')
				.click(function(){
					authClient.login('password', {
					  email: $("#login-form .email").val(),
					  password: $("#login-form .password").val(),
					  rememberMe: true
					});
					$(this).parents().trigger('reveal:close');
				});
		}
	});
	
	// authClient.createUser('mitchellbutler@gmail.com', 'password', function(error, user) {
	// 	  if (!error) {
	// 	    console.log('User Id: ' + user.id + ', Email: ' + user.email);
	//  	  }
	// 	});
	
	var init = true,
			state = state = window.history.pushState !== undefined;
	
	var initializePage = function (app) {
		$('#content').fadeIn();
		$('#loading').fadeOut();
		
		// Sets up ChosenJS
		$(".chzn-select").chosen();
		
		if (currentCompany) {
			
			scrumData = new ScrumData(currentCompany);
			scrumForm = new ScrumForm(scrumData);
			
			if (app == 'home') {
				currentApp = new ScrumHomeApp(scrumData, scrumForm, userID);
			} else if (app == 'manage') {
				currentApp = new ScrumManageApp(scrumData, scrumForm, userID);
			} else if (app == 'board') {
				currentApp = new ScrumBoardApp(scrumData, scrumForm, userID);
			} else if (app == 'list') {
				currentApp = new ScrumListApp(scrumData, scrumForm, userID);
			} else if (app == 'stats') {
				currentApp = new ScrumStatsApp(scrumData, scrumForm, userID);
			} else {
				alert('404');
			}
			
			if (currentApp.init) {
					currentApp.init();
			}
			
			currentApp.onDataUpdate = currentApp.onDataUpdate || function(){};
			
			scrumData.peopleRef.on('value', function(snapshot) {
				scrumData.people = snapshot.val();
				currentApp.onDataUpdate('people', {people: scrumData.people, tasks: scrumData.tasks});
			});
			
			scrumData.tasksRef.on('value', function(snapshot) {
				scrumData.tasks = snapshot.val();
				currentApp.onDataUpdate('tasks', {people: scrumData.people, tasks: scrumData.tasks});
			});
			
			scrumData.projectsRef.on('value', function(snapshot) {
				scrumData.projects = snapshot.val();
				currentApp.onDataUpdate('projects', {projects: scrumData.projects});
			});
			
		} else {
			// Sets up the Company
			$("#company-selection")
				.reveal()
				.find('.company-accept')
				.click(function(){
					currentCompany = $(this).siblings('.company-input').val();
					$(this).parents().trigger('reveal:close');
					initializePage($("#content").data('app'));
				})
				.siblings('.company-input')
				.focus()
				.bind('keypress', function(e) {
				  var code = (e.keyCode ? e.keyCode : e.which);
				  if(code == 13) { 
						$(this)
							.siblings('.company-accept')
							.trigger('click');
				  }
				});
		}
		
	}
	
	// Handles response
	var handler = function(data) {
		$('title').html($(data).filter("title").html());
		$('#content').html($(data).filter("#content").html());
		initializePage($(data).filter("#content").data('app'));
		$.address.title(/>([^<]*)<\/title/.exec(data)[1]);
	};
	
	$.address.state('/ScrumPlan/').init(function() {

		// Initializes the plugin
		$('nav a').address();
				
	}).change(function(event) {

		if (state && init) {
			init = false;
		} else {
			$('#content').hide();
			$('#loading').show();
			// Loads the page content and inserts it into the content area
			$.ajax({
				url: $.address.state() + event.path,
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					handler(XMLHttpRequest.responseText);
				},
				success: function(data, textStatus, XMLHttpRequest) {
					handler(data);
				}
			});
		}

	});
	
	if (!state) {
			// Hides the page during initialization
			document.write('<style type="text/css"> #content { display: none; } </style>');
		}

	// UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
	// $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
	// $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
	// $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
	// $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

	// Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
	if (Modernizr.touch && !window.location.hash) {
		$(window).load(function () {
			setTimeout(function () {
				// At load, if user hasn't scrolled more than 20px or so...
				if( $(window).scrollTop() < 20 ) {
					window.scrollTo(0, 1);
				}
			}, 0);
		});
	}

})(jQuery, this);
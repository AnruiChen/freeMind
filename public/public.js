window.onload = function(){
	function statusChangeCallback(response) {
	    if (response.status === 'connected') {
	      // Logged into your app and Facebook.
	      getPostsAndInfo();
	      
	    } else {
	      // The person is not logged into your app or we are unable to tell.
	      /*document.getElementById('status').innerHTML = 'Please log ' +
	        'into this app.';*/
	    }
	  }
	function checkLoginState() {
	    FB.getLoginStatus(function(response) {
	      statusChangeCallback(response);
	    });
	}
	window.fbAsyncInit = function() {
	FB.init({
	  appId      : '983311555137643',
	  cookie     : true,  // enable cookies to allow the server to access 
	                      // the session
	  xfbml      : true,  // parse social plugins on this page
	  version    : 'v2.8' // use graph api version 2.8
	});


	FB.getLoginStatus(function(response) {
	  statusChangeCallback(response);
	});

	};

	(function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=983311555137643";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

	function getPostsAndInfo() {
		FB.api('/me/posts', function(response) {
		   	passToIndico(response);   
		});
	}

	function passToIndico(passing) {
		var http = new XMLHttpRequest();
		var url = "skrt";

		var params = "data=" + encodeURIComponent(passing["data"])
			+ "&paging=" + encodeURIComponent(passing["paging"]);
			console.log(passing);
		http.open("POST", url, true);

		//Send the proper header information along with the request
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

		http.onreadystatechange = function() {//Call a function when the state changes.
		    if(http.readyState == 4 && http.status == 200) {
		        console.log("sent");
		    }
		}
		http.send(params);
	}

}
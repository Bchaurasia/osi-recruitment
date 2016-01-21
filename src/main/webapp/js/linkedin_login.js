function onLinkedInLoad(){
	IN.UI.Authorize().place();
	IN.Event.on(IN, "auth", onLinkedInAuth);
	IN.Event.on(IN, "logout", IN.User.logout());
}
	
function onLinkedInAuth(){
	IN.API.Profile("me").fields("email-address").result(function(result){
        var primaryEmail=result.values[0].emailAddress;
        $('#j_username').val(primaryEmail);
        $('#j_password').val('referral');
        sessionStorage.userId = primaryEmail;
        document.getElementById('login-form').submit();
	});
}
	
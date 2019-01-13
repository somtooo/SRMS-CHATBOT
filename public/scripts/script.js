
        var conversation = [];
		var accessToken = "5e867e70a3344534983e14e178b05a32";
		var baseUrl = "https://api.api.ai/v1/";
		
		$(document).ready(function() {
			$("#input").keypress(function(event) {
				if (event.which == 13) {
                    event.preventDefault();
                    sendtodf();
                    $(this).val("");
				}
		});
        });
        ///////2nd point .
        
        
        function sendtodf() {

            var text = $("#input").val();
            ///1st break
            conversation.push("<b>ME: </b>" + text);///break
            $.ajax({//break 2
                type: "POST",
				url: baseUrl + "query?v=20150910",
                contentType: "application/json; charset=utf-8",
                //break 3
                dataType: "json",//break 4
                ///error
                headers: {
                    "Authorization": "Bearer " + accessToken
                },
                //end of error
                data: JSON.stringify({
                    query:text,
                    lang:"en",
                    sessionId:"mysessionid"
                }),
                success: function(data) {
                    processResponse(data);
                },
                error: function() {
                    processResponse("Internal Server Error");
                }
            });
        }
    ///////// end of div with error
        function processResponse(data) {
            var responsetext = data.result.fulfillment.speech;
            var jsonres= JSON.stringify(data, undefined, 2);
            conversation.push("<b>BOT: </b>"+ responsetext +"\r\n\n");
           
            $("#chatview").html('');
            conversation.forEach(function(item, index){
                var s = item.indexOf('ME:') == -1 ? 'text-align: left; background-color:#eee' : 'text-align: right; background-color:#ddd';
                var c = '<p style="padding: 15px; border-bottom: 1px solid #ccc; border-radius: 15px; ' + s + '">' + item + '</p>';
                $("#chatview").append(c);
            });

            //$("#chatview").html(conversation.join(""));
            $("#jsonresponse").text(jsonres);
        }  
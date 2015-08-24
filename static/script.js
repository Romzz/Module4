$(function() {
	function onFormSubmit(event){

		var data = $(event.target).serializeArray();
		var thesis = {};


		for(var i = 0; i<data.length ; i++){
			thesis[data[i].name] = data[i].value;
		}
		
		// send data to server
			var thesis_create_api = '/api/thesis';
			$.post(thesis_create_api, thesis, function(response){

			// read response from server
			if (response.status = 'OK') {
				var thesis_list = response.data.year + '   ' + response.data.title  +  '<a id="edit">Edit</a>' + ' | ' +  '<a id="delete">Delete</a>' ;
				$('#thesis-list').prepend('<li>' + thesis_list + '</li>')
				$('input[type=text], [type=number], select, textarea').val('');
			} else {

			}

			});

		return false;
	}

	function loadThesis(){
		var thesis_list_api = '/api/thesis';
		$.get(thesis_list_api, {} , function(response) {
			console.log('#thesis-list', response)
			response.data.forEach(function(thesis){
				var thesis_list = thesis.year + '   ' + thesis.title   + '   ' + '<a id="edit" href=\'edit_thesis/'+thesis.id+'\'>Edit</a>' + ' | ' + '<a id="delete" href=\'delete_thesis/'+thesis.id+'\'>Delete</a>';
				$('#thesis-list').append('<li>' + thesis_list + '</li>')
			});
		});
	}

	loadThesis();

	$('form#create-form').submit(onFormSubmit);

	$(document).on('click', '#button', function(){
		$(this).closest('li').remove();
	});

});

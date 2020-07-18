const dishDetails = document.querySelector('.dish-details');
const editBtn = document.querySelectorAll('.edit-btn');

for(let i=0; i< editBtn.length; i++) {
    editBtn[i].onclick = function(response){
		$.ajax({
			type: "GET",
			url: "../order/add-item/" + editBtn[i].value,
			dataType: 'json',
			complete: function(data) {
                $("#dish-list").load(" #dish-list > *");
			}
		});
    }
}
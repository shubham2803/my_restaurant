const dishDetails = document.querySelector('.dish-details');
const editBtn = document.querySelectorAll('.edit-btn');

for (let i = 0; i < editBtn.length; i++) {
	editBtn[i].onclick = function (response) {
		$.ajax({
			type: "GET",
			url: "../order/add-item/" + editBtn[i].value,
			dataType: 'json',
			complete: function (data) {
				location.reload();
			}
		});
	}
}

$(document).ready(function() {
    function disableBack() { window.history.forward() }

    window.onload = disableBack();
    window.onpageshow = function(evt) { if (evt.persisted) disableBack() }
});

/* const btn = document.querySelector('#address-btn');
// handle click button
btn.onclick = function () {
	const rbs = document.querySelectorAll('input[name="label"]');
	let selectedValue;
	for (const rb of rbs) {
		if (rb.checked) {
			selectedValue = rb.value;
			break;
		}
	}
	alert(selectedValue);
}; */
function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

var csrftoken = getCookie('csrftoken');



if (document.querySelector('.address-text') != null) {

	// $('#address-text').on('click', '#edit-address', function(e) {
	// 	let url = '/address/edit/';

	// 	editAddressForm.style.display = 'none';
	// 	document.querySelector('#address-text').style.display = 'block';
	// 	fetch(url,{
	//         method:'POST',
	// 		headers:{
	//             'Content-Type':'application/json',
	// 			'X-CSRFToken':csrftoken,
	// 		},
	// 		body:JSON.stringify({'address': address})
	// 	})
	// 	.then((response) => response.json())
	// 	.then((data) => {
	//         console.log('Success;', data.message);
	// 		$("#address-text").load(" #address-text > *");
	// 		$("#address-heading").load(" #address-heading > *");
	// 	})
	// 	})
	// })

	// })
}


function onEdit(id) {
	console.log(id + 'edit test');
	document.querySelector('#address-display-content').style.display = 'none';
	document.querySelector('.footer-slab').style.display = 'none';
	document.querySelector('#address-edit-form').style.display = 'block';

	$.ajax({
		type: "GET",
		url: "/address/edit/" + id,
		dataType: 'json',
		complete: function (data) {
			console.log(data.responseJSON[0]);
			address = data.responseJSON[0]
			document.querySelector("#address-edit-form > p > input[name='id']").value=address.id;
			document.querySelector("#address-edit-form > p > input[name='label']").value=address.label;
			document.querySelector("#address-edit-form > p > input[name='line1']").value=address.line1;
			document.querySelector("#address-edit-form > p > input[name='area']").value=address.area;
			document.querySelector("#address-edit-form > p > input[name='city']").value=address.city;
			document.querySelector("#address-edit-form > p > input[name='state']").value=address.state;
			document.querySelector("#address-edit-form > p > input[name='country']").value=address.country;
			document.querySelector("#address-edit-form > p > input[name='pincode']").value=address.pinCode;
		}
	});

}
	
function editAddress(){
	const addressEditForm = document.querySelector('#address-edit-form');
	console.log(addressEditForm)
	let address = {
		'id': addressEditForm.id.value,
		'label': addressEditForm.label.value,
		'line1': addressEditForm.line1.value,
		'area': addressEditForm.area.value,
		'city': addressEditForm.city.value,
		'state': addressEditForm.state.value,
		'country': addressEditForm.country.value,
		'pinCode': addressEditForm.pincode.value,
	};
	console.log(address);
	let url = '/address/edit/' + addressEditForm.id.value;
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken,
		},
		body: JSON.stringify({ 'address': address })
	})
	.then((response) => response.json())
	.then((data) => {
		console.log('Success: ', data.message);
		location.reload();
	})
}

function onSave(e) {
	console.log(e + 'edit test');
	document.querySelector('#address-display-content').style.display = 'block';
	document.querySelector('#address-edit-form').style.display = 'none';
	document.querySelector('.footer-slab').style.display = 'block';
	$("#address-display-content").load("*");
}

function onDeliver(e) {
	console.log(e + 'deliver test');
	document.querySelector('.footer-slab').style.display = 'block';
}

function showAddForm() {
	document.querySelector('#address-display-content').style.display = 'none';
	document.querySelector('.footer-slab').style.display = 'none';
	document.querySelector('#add-address-form').style.display = 'block';
}

function onAdd() {
	// e.preventDefault();
	console.log('Address Added!');
	const newAddressForm = document.querySelector('#add-address-form');
	let address = {
		'label': newAddressForm.label.value,
		'line1': newAddressForm.line1.value,
		'area': newAddressForm.area.value,
		'city': newAddressForm.city.value,
		'state': newAddressForm.state.value,
		'country': newAddressForm.country.value,
		'pincode': newAddressForm.pincode.value,
	}
	let url = '/address/new/';

	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken,
		},
		body: JSON.stringify({ 'address': address })
	})
	.then((response) => response.json())
	.then((data) => {
		console.log('Success: ', data.message);
		location.reload();
	})
}

function onDelete(id) {
	confirm("Delete the address?");
	$.ajax({
		type: "GET",
		url: "/address/delete/" + id,
		dataType: 'json',
		complete: function (data) {
			console.log('Success: ',data.responseJSON.message);
			location.reload();
		}
	});

	/* url = "/address/delete/" + id;
	fetch(url, {
		method: 'GET',
	})
	.then((response) => response.json())
	.then((data) => {
		console.log('Success: ', data.message);
		alert('Address Deleted!');
	}) */
}

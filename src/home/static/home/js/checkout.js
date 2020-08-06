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

$(document).ready(function () {
	function disableBack() { window.history.forward() }

	window.onload = disableBack();
	window.onpageshow = function (evt) { if (evt.persisted) disableBack() }
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
			document.querySelector("#address-edit-form > p > input[name='id']").value = address.id;
			document.querySelector("#address-edit-form > p > input[name='label']").value = address.label;
			document.querySelector("#address-edit-form > p > input[name='line1']").value = address.line1;
			document.querySelector("#address-edit-form > p > input[name='area']").value = address.area;
			document.querySelector("#address-edit-form > p > input[name='city']").value = address.city;
			document.querySelector("#address-edit-form > p > input[name='state']").value = address.state;
			document.querySelector("#address-edit-form > p > input[name='country']").value = address.country;
			document.querySelector("#address-edit-form > p > input[name='pincode']").value = address.pinCode;
		}
	});

}

function editAddress() {
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

function onDeliver(id) {
	console.log(id + 'deliver test');
	document.querySelector('.footer-slab').style.display = 'block';

	$.ajax({
		type: "GET",
		url: "/address/set/" + id,
		dataType: 'json',
		complete: function (data) {
			console.log('Success: ', data.responseJSON.message);
			location.reload();
		}
	});

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
	let deleteConfirmation = confirm("Delete the address?");
	if (deleteConfirmation) {
		$.ajax({
			type: "GET",
			url: "/address/delete/" + id,
			dataType: 'json',
			complete: function (data) {
				console.log('Success: ', data.responseJSON.message);
				location.reload();
			}
		});
	}

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

const prepSec = document.querySelector('#preparing-section');
const deliSec = document.querySelector('#delivery-section');
const ordSec = document.querySelector('#order-display');

function paymentOn() {

	$.ajax({
		type: "GET",
		url: "/order/initiate/",
		dataType: 'json',
		complete: function (data) {
			console.log('Success: ', data.responseJSON.message);
			location.reload();
		}
	});
}


function selectPayment(event, type) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("pay-content");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("payment-type");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(type).style.display = "block";
	event.currentTarget.className += " active";
}


/* function cc_format(value) {
	var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
	var matches = v.match(/\d{4,16}/g);
	var match = matches && matches[0] || ''
	var parts = []
	for (i = 0, len = match.length; i < len; i += 4) {
		parts.push(match.substring(i, i + 4))
	}
	if (parts.length) {
		return parts.join(' ')
	} else {
		return value
	}
}

document.getElementById('cc').oninput = function () {
	this.value = cc_format(this.value)
}

function checkDigit(event) {
	var code = (event.which) ? event.which : event.keyCode;

	if ((code < 48 || code > 57) && (code > 31)) {
		return false;
	}

	return true;
} */

var getEl = document.getElementById.bind(document);
var formatter = Razorpay.setFormatter(getEl('pay-form'));
var cvvField = getEl('card_cvv');

formatter.add('card', getEl('card_num'))
  .on('network', function(o) {

    var type = this.type; // e.g. 'visa'

    // set length of cvv element based on amex card
    var cvvlen = type === 'amex' ? 4 : 3;
    cvvField.maxLength = cvvlen;
    cvvField.pattern = '^[0-9]{' + cvvlen + '}$';

    getEl('card_type').innerHTML = type;
  })
  .on('change', function() {
    var isValid = this.isValid();
    getEl('card_valid').innerHTML = isValid ? 'valid' : 'invalid';

    // automatically focus next field if card number is valid and filled
    if (isValid && this.el.value.length === this.caretPosition) {
      getEl('card_expiry').focus();
    }
  })

formatter.add('expiry', getEl('card_expiry'))
  .on('change', function() {
    var isValid = this.isValid();
    getEl('expiry_valid').innerHTML = isValid ? 'valid' : 'invalid';

    // automatically focus next field if card number is valid and filled
    if (isValid && this.el.value.length === this.caretPosition) {
      getEl('card_cvv').focus();
    }
  })

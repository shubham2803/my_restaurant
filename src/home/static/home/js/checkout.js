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

// const newAddressForm = document.querySelector("#add-address-form");
// newAddressForm.addEventListener('submit', function(e) {
// 	e.preventDefault();
// 	console.log('Address Added!');

// 	let address = {
// 		'label' : document.querySelector('input[name="label"]:checked').value,
// 		'line1' : newAddressForm.line1.value,
// 		'area' : newAddressForm.area.value,
// 		'city' : newAddressForm.city.value,
// 		'state' : newAddressForm.state.value,
// 		'country' : newAddressForm.country.value,
// 		'pincode' : newAddressForm.pincode.value,
// 	}
// 	let url = '/address/new/';

// 	fetch(url,{
// 		method:'POST',
// 		headers:{
// 			'Content-Type':'application/json',
// 			'X-CSRFToken':csrftoken,
// 		},
// 		body:JSON.stringify({'address': address})
// 	})
// 	.then((response) => response.json())
// 	.then((data) => {
// 		console.log('Success;', data.message);
// 		alert('Transaction Completed');

// 	})
// })


document.querySelector('#edit-address-form').style.display = 'none';
$('#address-text').on('click', '#edit-address', function(e) {
	document.querySelector('#address-text').style.display = 'none';
	const editAddressForm = document.querySelector('#edit-address-form');
	editAddressForm.style.display = 'block';
	document.querySelector('#edit-address-form').addEventListener('submit', function(e) {
		e.preventDefault();
		console.log('Address Edited!');
	
		let address = {
			'id' : editAddressForm.id.value,
			'label' : editAddressForm.label.value,
			'line1' : editAddressForm.line1.value,
			'area' : editAddressForm.area.value,
			'city' : editAddressForm.city.value,
			'state' : editAddressForm.state.value,
			'country' : editAddressForm.country.value,
			'pincode' : editAddressForm.pincode.value,
		}
		console.log(address)
		let url = '/address/edit/';
	
		editAddressForm.style.display = 'none';
		document.querySelector('#address-text').style.display = 'block';
		fetch(url,{
			method:'POST',
			headers:{
				'Content-Type':'application/json',
				'X-CSRFToken':csrftoken,
			},
			body:JSON.stringify({'address': address})
		})
		.then((response) => response.json())
		.then((data) => {
			console.log('Success;', data.message);
			$("#address-text").load(" #address-text > *");
			$("#address-heading").load(" #address-heading > *");
		})
	})
})
$(function() {
	

	//CHANGES # OF SEATS WHILE CHANGING
	$('#seatsWanted').on('change', e=>{
		$('#seatsWantedView').text('Seats: ' + e.target.value)
	})
	
	//CHANGES REQUIRED PLEDGE WHILE CHANGING NUMBER OF SEATS
	$('#seatsWanted').on('change', e=>{
		debugger
		$('#pledge').text('Your Pledge: ' + (+e.target.value * parseInt($('#pledgePerSeat').text(), 10)
	))})
});
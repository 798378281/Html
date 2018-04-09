var x = [209, 190, 140, 78, 28, 9, 28, 78, 140, 190];
var y = [109, 168, 204, 204, 168, 109, 50, 14, 14, 50];
var index = 0;

document.oncontextmenu = function(event) {
	index = 0;
	$("#main").css({
		display: "block",
		left: event.clientX - 24 + "px",
		top: event.clientY - 103 + "px",
	})
	$("#main ul").addClass("active");

	$(".item").stop(false, false).css({
		position: 'absolute',
		opacity: 0,
		left: "110px",
		top: "109px",
	});
	movemenu(0);
	return false;
}

function movemenu() {
	if (index == $(".item").length) return;
	$(".item").eq(index).animate({
		left: x[index] + 'px',
		top: y[index] + 'px',
		opacity: 1,
	}, 100, movemenu);
	++index;
}
$(document).click(function() {
	$("#main").css("display", "none");
})
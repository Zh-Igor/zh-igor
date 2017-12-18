function calculate()
{
	document.getElementById("loading").style.visibility = "visible";
	var data = {
		l: $('#len').val(),
		T: $('#time').val(),
		N: $('#N').val(),
		N0: $('#N0').val(),
		n: $('#n').val()
	}
	
	var layout = {
		title: 'Температурная плоскость',
		autosize: false,
		width: 500,
		height: 500,
		margin: {
		l: 65,
		r: 50,
		b: 65,
		t: 90,
	  }
	};
	
	worker = new Worker("app/worker.js");
	worker.onmessage = function(e) {
		document.getElementById("loading").style.visibility = "hidden";
		var surf = [{
			   z: e.data,
			   type: 'surface'
		}];		
		Plotly.newPlot('Plot', surf, layout);
		console.log(e.data);
	}
	worker.postMessage(data);
}
onmessage =  function(e) {
	var l = e.data.l;
	var T = e.data.T;
	var N = e.data.N;
	var N0 = e.data.N0;
	var n = e.data.n;
	var tau = T / N0;
	var h = l / N;
	var gamma = tau / (h * h);
	 
	var states = new Array();
	
	states[0] = new Array();
	
	states[0][0] = 0;	
	for (var x = 1; x <= N - 1; x++)
	{
		states[0][x] = 0;
	}
	states[0][N] = 0;
	
	
	for (var t = 1; t <= N0; t++)
	{
		states[t] = new Array();
		states[t][0] = n * Math.pow(t * tau, 2) - 2 * n * T * t;
		for (var x = 1; x <= N - 1; x++)
		{
			var left = states[t - 1][x - 1];
			var middle = (1 - 2 * gamma) * states[t - 1][x];
			var right = states[t - 1][x + 1];
			var phi = (n * Math.pow(t * tau, 2) / 3 - 2 * n * T * tau * t / 3) * Math.exp(Math.pow((-x * h - l / 2), 2) / Math.pow(n, 2));
			states[t][x] = gamma * (left + middle + right) + tau * phi;
			
		}
		states[t][N] = n * Math.pow(t * tau, 2) / 2 - n * T * t;
	}		 
	postMessage(states);
}
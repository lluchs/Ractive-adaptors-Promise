/*

	Ractive-adaptors-Promise
	========================

	Version 0.1.0.

	Allows setting promises as data objects.

	==========================

	Troubleshooting: If you're using a module system in your app (AMD or
	something more nodey) then you may need to change the paths below,
	where it says `require( 'ractive' )` or `define([ 'Ractive' ]...)`.

	==========================

	Usage: Include this file on your page below Ractive, e.g:

	    <script src='lib/Ractive.js'></script>
	    <script src='lib/Ractive-adaptors-Promise.js'></script>

	Or, if you're using a module loader, require this module:

	    // requiring the plugin will 'activate' it - no need to use
	    // the return value
	    require( 'Ractive-adaptors-Promise' );

*/

(function ( global, factory ) {

	'use strict';

	// Common JS (i.e. browserify) environment
	if ( typeof module !== 'undefined' && module.exports && typeof require === 'function' ) {
		factory( require( 'ractive' ) );
	}

	// AMD?
	else if ( typeof define === 'function' && define.amd ) {
		define([ 'Ractive' ], factory );
	}

	// browser global
	else if ( global.Ractive ) {
		factory( global.Ractive );
	}

	else {
		throw new Error( 'Could not find Ractive! It must be loaded before the Ractive-adaptors-Promise plugin' );
	}

}( typeof window !== 'undefined' ? window : this, function ( Ractive ) {

	'use strict';

	Ractive.adaptors.Promise = {
		filter: function ( object ) {
			// Detect "thenables" according to Promises/A+ §1.2.
			return object != null && typeof object.then === 'function';
		},
		wrap: function ( ractive, object, keypath, prefix ) {
			return new PromiseWrapper( ractive, object, keypath, prefix );
		}
	};

	function PromiseWrapper( ractive, object, keypath, prefix ) {
		var wrapper, setter;

		wrapper = this;
		setter = function ( result ) {
			// This wrapper might have been removed since.
			if ( !wrapper.removed )
				// Replace the wrapper with the actual result.
				ractive.set( keypath, result );
		};

		object.then( setter, setter );
	}

	PromiseWrapper.prototype = {
		get: function () {
			return null;
		},
		set: function ( keypath, value ) {
			// No support for setting anything.
		},
		reset: function () {
			// Always replace the promise.
			return false;
		},
		teardown: function () {
			// The Promises/A+ specification doesn't define a way to stop
			// "listening" to a Promise, so we just note the removal.
			this.removed = true;
		}
	};

}));

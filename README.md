Ractive.js Promise adaptor plugin
=================================

*Find more Ractive.js plugins at [docs.ractivejs.org/latest/plugins](http://docs.ractivejs.org/latest/plugins)*

[See the demo here.](http://lluchs.github.io/Ractive-adaptors-Promise/)

Usage
-----

Include this file on your page below Ractive, e.g:

```html
<script src='lib/Ractive.js'></script>
<script src='lib/Ractive-adaptors-Promise.js'></script>
```

Or, if you're using a module loader, require this module:

```js
// requiring the plugin will 'activate' it - no need to use the return value
require( 'Ractive-adaptors-Promise' );
```

Add the plugin to the Ractive options:

```js
ractive = new Ractive({
	// ...
	adapt: [ 'Promise' ]
});
```

[See the demo for an example.](http://lluchs.github.io/Ractive-adaptors-Promise/)


License
-------

Copyright (c) 2013 Lukas Werling. Licensed MIT

Created with the [Ractive.js plugin template](https://github.com/RactiveJS/Plugin-template) for Grunt.

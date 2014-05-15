
(function( ns, $){
	
	// Check Dependencies
	if ( !$ ){
		throw("Jquery not Found!");
	}

	if ( !ns ){
		throw("Components not Found!");
	}
	
	var i, comps = $("[data-name]"), className;
	
	for ( i = 0; i < comps.length; i++ ){
		className = comps[i].getAttribute("data-name");
		className = className.charAt(0).toUpperCase() + className.slice(1);
		new ns[ className ]( comps[i] );
	}
	
}( window.components , jQuery ));
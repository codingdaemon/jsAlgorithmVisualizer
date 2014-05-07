/**
 * This code is taken from Dojo library and is for personal use. The name has been changed to avoid confusion
 * @type {{}}
 */
var ConnectJs = {};
ConnectJs.global = window;

var d = ConnectJs, opts = Object.prototype.toString;
ConnectJs.isString = function(/*anything*/ it){
    //	summary:
    //		Return true if it is a String
    return (typeof it == "string" || it instanceof String); // Boolean
};
ConnectJs.isFunction = function(/*anything*/ it){
    // summary:
    //		Return true if it is a Function
    return opts.call(it) === "[object Function]";
};


var efficient = function(obj, offset, startWith){
    return (startWith||[]).concat(Array.prototype.slice.call(obj, offset||0));
};

////>>excludeStart("webkitMobile", kwArgs.webkitMobile);
//var slow = function(obj, offset, startWith){
//    var arr = startWith||[];
//    for(var x = offset || 0; x < obj.length; x++){
//        arr.push(obj[x]);
//    }
//    return arr;
//};
//>>excludeEnd("webkitMobile");

ConnectJs._toArray = efficient;

ConnectJs._hitchArgs = function(scope, method /*,...*/){
    var pre = d._toArray(arguments, 2);
    var named = d.isString(method);
    return function(){
        // arrayify arguments
        var args = d._toArray(arguments);
        // locate our method
        var f = named ? (scope||d.global)[method] : method;
        // invoke with collected args
        return f && f.apply(scope || this, pre.concat(args)); // mixed
    }; // Function
};

ConnectJs.hitch = function(/*Object*/scope, /*Function|String*/method /*,...*/){
    //	summary:
    //		Returns a function that will only ever execute in the a given scope.
    //		This allows for easy use of object member functions
    //		in callbacks and other places in which the "this" keyword may
    //		otherwise not reference the expected scope.
    //		Any number of default positional arguments may be passed as parameters
    //		beyond "method".
    //		Each of these values will be used to "placehold" (similar to curry)
    //		for the hitched function.
    //	scope:
    //		The scope to use when method executes. If method is a string,
    //		scope is also the object containing method.
    //	method:
    //		A function to be hitched to scope, or the name of the method in
    //		scope to be hitched.
    //	example:
    //	|	ConnectJs.hitch(foo, "bar")();
    //		runs foo.bar() in the scope of foo
    //	example:
    //	|	ConnectJs.hitch(foo, myFunction);
    //		returns a function that runs myFunction in the scope of foo
    //	example:
    //		Expansion on the default positional arguments passed along from
    //		hitch. Passed args are mixed first, additional args after.
    //	|	var foo = { bar: function(a, b, c){ console.log(a, b, c); } };
    //	|	var fn = ConnectJs.hitch(foo, "bar", 1, 2);
    //	|	fn(3); // logs "1, 2, 3"
    //	example:
    //	|	var foo = { bar: 2 };
    //	|	ConnectJs.hitch(foo, function(){ this.bar = 10; })();
    //		execute an anonymous function in scope of foo

    if(arguments.length > 2){
        return d._hitchArgs.apply(d, arguments); // Function
    }
    if(!method){
        method = scope;
        scope = null;
    }
    if(d.isString(method)){
        scope = scope || d.global;
        if(!scope[method]){ throw(['ConnectJs.hitch: scope["', method, '"] is null (scope="', scope, '")'].join('')); }
        return function(){ return scope[method].apply(scope, arguments || []); }; // Function
    }
    return !scope ? method : function(){ return method.apply(scope, arguments || []); }; // Function
};

// low-level delegation machinery
ConnectJs._listener = {
	// create a dispatcher function
	getDispatcher: function(){
		// following comments pulled out-of-line to prevent cloning them
		// in the returned function.
		// - indices (i) that are really in the array of listeners (ls) will
		//   not be in Array.prototype. This is the 'sparse array' trick
		//   that keeps us safe from libs that take liberties with built-in
		//   objects
		// - listener is invoked with current scope (this)
		return function(){
			var ap = Array.prototype, c = arguments.callee, ls = c._listeners, t = c.target,
			// return value comes from original target function
				r = t && t.apply(this, arguments),
			// make local copy of listener array so it is immutable during processing
				i, lls = [].concat(ls)
			;

			// invoke listeners after target function
			for(i in lls){
				if(!(i in ap)){
					lls[i].apply(this, arguments);
				}
			}
			// return value comes from original target function
			return r;
		};
	},
	// add a listener to an object
	add: function(/*Object*/ source, /*String*/ method, /*Function*/ listener){
		// Whenever 'method' is invoked, 'listener' will have the same scope.
		// Trying to supporting a context object for the listener led to
		// complexity.
		// Non trivial to provide 'once' functionality here
		// because listener could be the result of a ConnectJs.hitch call,
		// in which case two references to the same hitch target would not
		// be equivalent.
		source = source || ConnectJs.global;
		// The source method is either null, a dispatcher, or some other function
		var f = source[method];
		// Ensure a dispatcher
		if(!f || !f._listeners){
			var d = ConnectJs._listener.getDispatcher();
			// original target function is special
			d.target = f;
			// dispatcher holds a list of listeners
			d._listeners = [];
			// redirect source to dispatcher
			f = source[method] = d;
		}
		// The contract is that a handle is returned that can
		// identify this listener for disconnect.
		//
		// The type of the handle is private. Here is it implemented as Integer.
		// DOM event code has this same contract but handle is Function
		// in non-IE browsers.
		//
		// We could have separate lists of before and after listeners.
		return f._listeners.push(listener); /*Handle*/
	},
	// remove a listener from an object
	remove: function(/*Object*/ source, /*String*/ method, /*Handle*/ handle){
		var f = (source || ConnectJs.global)[method];
		// remember that handle is the index+1 (0 is not a valid handle)
		if(f && f._listeners && handle--){
			delete f._listeners[handle];
		}
	}
};

// Multiple delegation for arbitrary methods.

// This unit knows nothing about DOM, but we include DOM aware documentation
// and dontFix argument here to help the autodocs. Actual DOM aware code is in
// event.js.

ConnectJs.connect = function(/*Object|null*/ obj,
						/*String*/ event,
						/*Object|null*/ context,
						/*String|Function*/ method,
						/*Boolean?*/ dontFix){
	// summary:
	//		`ConnectJs.connect` is the core event handling and delegation method in
	//		ConnectJs. It allows one function to "listen in" on the execution of
	//		any other, triggering the second whenever the first is called. Many
	//		listeners may be attached to a function, and source functions may
	//		be either regular function calls or DOM events.
	//
	// description:
	//		Connects listeners to actions, so that after event fires, a
	//		listener is called with the same arguments passed to the original
	//		function.
	//
	//		Since `ConnectJs.connect` allows the source of events to be either a
	//		"regular" JavaScript function or a DOM event, it provides a uniform
	//		interface for listening to all the types of events that an
	//		application is likely to deal with though a single, unified
	//		interface. DOM programmers may want to think of it as
	//		"addEventListener for everything and anything".
	//
	//		When setting up a connection, the `event` parameter must be a
	//		string that is the name of the method/event to be listened for. If
	//		`obj` is null, `ConnectJs.global` is assumed, meaning that connections
	//		to global methods are supported but also that you may inadvertently
	//		connect to a global by passing an incorrect object name or invalid
	//		reference.
	//
	//		`ConnectJs.connect` generally is forgiving. If you pass the name of a
	//		function or method that does not yet exist on `obj`, connect will
	//		not fail, but will instead set up a stub method. Similarly, null
	//		arguments may simply be omitted such that fewer than 4 arguments
	//		may be required to set up a connection See the examples for details.
	//
	//		The return value is a handle that is needed to
	//		remove this connection with `ConnectJs.disconnect`.
	//
	// obj:
	//		The source object for the event function.
	//		Defaults to `ConnectJs.global` if null.
	//		If obj is a DOM node, the connection is delegated
	//		to the DOM event manager (unless dontFix is true).
	//
	// event:
	//		String name of the event function in obj.
	//		I.e. identifies a property `obj[event]`.
	//
	// context:
	//		The object that method will receive as "this".
	//
	//		If context is null and method is a function, then method
	//		inherits the context of event.
	//
	//		If method is a string then context must be the source
	//		object object for method (context[method]). If context is null,
	//		ConnectJs.global is used.
	//
	// method:
	//		A function reference, or name of a function in context.
	//		The function identified by method fires after event does.
	//		method receives the same arguments as the event.
	//		See context argument comments for information on method's scope.
	//
	// dontFix:
	//		If obj is a DOM node, set dontFix to true to prevent delegation
	//		of this connection to the DOM event manager.
	//
	// example:
	//		When obj.onchange(), do ui.update():
	//	|	ConnectJs.connect(obj, "onchange", ui, "update");
	//	|	ConnectJs.connect(obj, "onchange", ui, ui.update); // same
	//
	// example:
	//		Using return value for disconnect:
	//	|	var link = ConnectJs.connect(obj, "onchange", ui, "update");
	//	|	...
	//	|	ConnectJs.disconnect(link);
	//
	// example:
	//		When onglobalevent executes, watcher.handler is invoked:
	//	|	ConnectJs.connect(null, "onglobalevent", watcher, "handler");
	//
	// example:
	//		When ob.onCustomEvent executes, customEventHandler is invoked:
	//	|	ConnectJs.connect(ob, "onCustomEvent", null, "customEventHandler");
	//	|	ConnectJs.connect(ob, "onCustomEvent", "customEventHandler"); // same
	//
	// example:
	//		When ob.onCustomEvent executes, customEventHandler is invoked
	//		with the same scope (this):
	//	|	ConnectJs.connect(ob, "onCustomEvent", null, customEventHandler);
	//	|	ConnectJs.connect(ob, "onCustomEvent", customEventHandler); // same
	//
	// example:
	//		When globalEvent executes, globalHandler is invoked
	//		with the same scope (this):
	//	|	ConnectJs.connect(null, "globalEvent", null, globalHandler);
	//	|	ConnectJs.connect("globalEvent", globalHandler); // same

	// normalize arguments
	var a=arguments, args=[], i=0;
	// if a[0] is a String, obj was omitted
	args.push(ConnectJs.isString(a[0]) ? null : a[i++], a[i++]);
	// if the arg-after-next is a String or Function, context was NOT omitted
	var a1 = a[i+1];
	args.push(ConnectJs.isString(a1)||ConnectJs.isFunction(a1) ? a[i++] : null, a[i++]);
	// absorb any additional arguments
	for(var l=a.length; i<l; i++){	args.push(a[i]); }
	// do the actual work
	return ConnectJs._connect.apply(this, args); /*Handle*/
}

// used by non-browser hostenvs. always overriden by event.js
ConnectJs._connect = function(obj, event, context, method){
	var l=ConnectJs._listener, h=l.add(obj, event, ConnectJs.hitch(context, method));
	return [obj, event, h, l]; // Handle
};

ConnectJs.disconnect = function(/*Handle*/ handle){
	// summary:
	//		Remove a link created by ConnectJs.connect.
	// description:
	//		Removes the connection between event and the method referenced by handle.
	// handle:
	//		the return value of the ConnectJs.connect call that created the connection.
	if(handle && handle[0] !== undefined){
		ConnectJs._disconnect.apply(this, handle);
		// let's not keep this reference
		delete handle[0];
	}
};

ConnectJs._disconnect = function(obj, event, handle, listener){
	listener.remove(obj, event, handle);
};
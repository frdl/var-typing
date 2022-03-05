
'use strict';

var lib = ('undefined'!==typeof global && 'undefined'!==typeof global.require && 'undefined'!==typeof global.require.main && 'undefined'!==typeof global.require.main.frdl)
  ? global.require.main.frdl 
  : require('@frdl/functions');

exports = module.exports =  extendOwnFormats(extendTyping(
	('undefined'===typeof lib.is)
           ? require('@betafcc/is')
           : lib.is
));




function extendOwnFormats(is){
  is.oid = {};
	
  is.oid.format = (v) => {
	return is.truthy(/^[0-9][0-9\.]+$/.test(v));
  };
	
  is.oid.withinFrdlweb = (v) => {
	return is.truthy(/^1\.3\.6\.1\.4\.1\.37553(\.[0-9\.]+)?$/.test(v));
  };
	
  is.oid.withinWEID = (v) => {
	return is.truthy(/^1\.3\.6\.1\.4\.1\.37553\.8(\.[0-9\.]+)?$/.test(v));
  };
	
	
   return is;
}


function isRegExp(test){
 var t = Object.prototype.toString.call( test );
 return t instanceof RegExp;
}

function extendTyping(is){

is.scalar = (v) => {
	return is.oneOf(is.string, is.boolean, is.number, is.integer, is.float)(v);
};

is.scalarOrNull = (v) => {
	return is.oneOf(is.scalar, is.null)(v);
};

is.data = (v) => {
	return is.oneOf(is.scalarOrNull, is.dict)(v);
};

is.sortable = (v) => {
	return is.oneOf(is.iterable, is.string, is.dict)(v);
};

is.regexp = (v) => {
  return isRegExp(v);
};

 return is;
}


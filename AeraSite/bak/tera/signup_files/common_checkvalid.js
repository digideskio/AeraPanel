﻿function $defined(obj){
	return (obj != undefined);
};

function $type(obj){
	if (!$defined(obj)) return false;
	if (obj.htmlElement) return 'element';
	var type = typeof obj;
	if (type == 'object' && obj.nodeName){
		switch(obj.nodeType){
			case 1: return 'element';
			case 3: return /\S/.test(obj.nodeValue) ? 'textnode' : 'whitespace';
		}
	}
	if (type == 'object' || type == 'function'){
		switch(obj.constructor){
			case Array: return 'array';
			case RegExp: return 'regexp';
			case Class: return 'class';
		}
		if (typeof obj.length == 'number'){
			if (obj.item) return 'collection';
			if (obj.callee) return 'arguments';
		}
	}
	return type;
};

var Class = function(properties){
	var klass = function(){
		return (arguments[0] !== null && this.initialize && $type(this.initialize) == 'function') ? this.initialize.apply(this, arguments) : this;
	};
	$extend(klass, this);
	klass.prototype = properties;
	klass.constructor = Class;
	return klass;
};

Class.empty = function(){};
Class.prototype = {
	extend: function(properties){
		var proto = new this(null);
		for (var property in properties){
			var pp = proto[property];
			proto[property] = Class.Merge(pp, properties[property]);
		}
		return new Class(proto);
	},

	implement: function(){
		for (var i = 0, l = arguments.length; i < l; i++) $extend(this.prototype, arguments[i]);
	}

};
Class.Merge = function(previous, current){
	if (previous && previous != current){
		var type = $type(current);
		if (type != $type(previous)) return current;
		switch(type){
			case 'function':
				var merged = function(){
					this.parent = arguments.callee.parent;
					return current.apply(this, arguments);
				};
				merged.parent = previous;
				return merged;
			case 'object': return $merge(previous, current);
		}
	}
	return current;
};

function $(obj){
	return $i(obj);
}

String.prototype.test= function(regex, params){
	return (($type(regex) == 'string') ? new RegExp(regex, params) : regex).test(this);
};

String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g, '');
};

Array.prototype.forEach = function(fn, bind){
	for (var i = 0, j = this.length; i < j; i++) fn.call(bind, this[i], i, this);
};

Array.prototype.extend = function(array){
	for (var i = 0, j = array.length; i < j; i++) this.push(array[i]);
	return this;
};

Array.prototype.indexOf = function(item, from){
	var len = this.length;
	for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++){
		if (this[i] === item) return i;
	}
	return -1;
};

Array.prototype.contains = function(item, from){
	return this.indexOf(item, from) != -1;
};

Array.prototype.each = Array.prototype.forEach;
Array.prototype.test = Array.prototype.contains;
document.getElementsBySelector = document.getElementsByTagName;

var $extend = Object.extend = function(){
	var args = arguments;
	if (!args[1]) args = [this, args[0]];
	for (var property in args[1]) args[0][property] = args[1][property];
	return args[0];
};

function $$(par, tag){
	var elements = [];
	var container = $(par);
	elements = container.getElementsByTagName(tag, true);
	return elements;
}

var Validator = new Class({
	
	//提示信息
	msgs: {},
	
	//需要验证的input类型
	types: [],
	
	//不需要验证必填的elements
	blank_check_excepts: [],
	
	valid_r: true,
	
	input_elements: [],
	
	depends: {},
	
	// 初始化
	initialize: function(f, c, m, t, be, d){
		this.c = c;
		this.msgs = m;
		this.types = t;
		this.blank_check_excepts = be;
		this.form = $(f);
		this.container = $(c);
		this.depends = d;
		var _this = this;

		//var inputs = this.container.getElementsByTagName('input');
		var inputs = document.getElementsByTagName("input");

		var elements = [];
		for (i=0; i < inputs.length; i++){
			elements.push(inputs[i]);
		}
		
		this.input_elements = elements;
		
		elements.each(function(input) {
			if (_this.types.test(input.type)) {
				
				_jsc.util.addEvent(input, 'focus', function() {
					if(!_this.blank_check_excepts.test(input.id) && input.id != 'txtIdCard')
					{
						return;
					}
					_this.setActiveStyle(input);
				});
				
				_jsc.util.addEvent(input, 'blur', function() {
					
						if(!_this.blank_check_excepts.test(input.id) && input.id != 'txtIdCard')
						{
							return;
						}
						if (input.value == '' && input.id != 'txtIdCard') 
						{
							_this.setBlankFailedStyle(input);
						} 
						else
						{
							_this.clearStyle(input);
							try 
							{
								eval('_this.valid_' + input.id + '(input)');
							} 
							catch(e) 
							{
								// to-do
							}
						};
				})
			};
		});
	},
	
	valid_input: function(o){
		if (o.value.trim() == '') {
			this.setFailedStyle(o, false);
		};
	},
	
	setActiveStyle: function(o){
		var _msg = $(o.id + '_info');
		_msg.className = 'WarningMsg';
		_msg.innerHTML = (this.msgs[o.id + '_default']) ? this.msgs[o.id + '_default'] : '';
	},
	
	setBlankFailedStyle: function(o){
		var _msg = $(o.id + '_info');
		_msg.className = 'FailedMsg';
		_msg.innerHTML = this.msgs[o.id + '_noblank'] ? this.msgs[o.id + '_noblank'] : this.msgs[o.id + '_default'];
	},
	
	clearStyle: function(o){
		var _msg = $(o.id + '_info');
		_msg.className = 'WarningMsg';
	},

	setDefinedStyle: function(o,msgname,stylename){
		var _msg = $(o.id + '_info');
		_msg.innerHTML = (this.msgs[o.id + '_' + msgname]) ? this.msgs[o.id + '_' + msgname] : '';
		_msg.className = stylename;
	}
});
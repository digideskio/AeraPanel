function CheckIEVersion()
{
	var appVar=new String(navigator.appVersion);
	var st=appVar.substr(appVar.indexOf("MSIE")+5,3);
	st=parseInt(st);
	if(st*10<55)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function CheckAll(form)
{
  for (var i=0;i<form.elements.length;i++)
    {
    var e = form.elements[i];
    if (e.name != 'chkall')
       e.checked = form.chkall.checked;
    }
}

function checkDate(inString,fieldName)
{
	if( inString!="" )
	{
		var tempDate;
		var a=new Date(inString);
		var y=a.getFullYear();
		var m=a.getMonth()+1;
		var d=a.getDate();
		var myday=y + "/" + m + "/" + d
		if (myday!=inString)
		{
			alert("Invalid"+ fieldName + "date(MM/DD/YYYY!"); 
			return false; 
		}
	}
	return true; 
}

function checkvalue(obj, low, up, mode, lable){
    var temp,type;
    var length, i, base, str;
    str=getformvalue(obj);
    if(str==null){
		lenght=0;
		str="";
	}	
	else{	
		length = GetStringLength(str);
	}	
    temp=""
    if( mode % 2 >= 1 ){
        if( str == "" ){
           temp = temp  + " Please enter" + " " + lable + "!" + "\n";
        }
    }
    
    if( mode % 4 >= 2 ){
        base = "0123456789."
        for(i = 0;i<=length-1;i++)
            if( base.indexOf(str.substring(i, i+1)) == -1  ){
				temp = temp + "" + lable + "" + " It should consist of 0-9!" + "\n";
				break;
            }    
    }
    
    if( mode % 8 >= 4 ){
        base = "0123456789"
        for(i = 0;i<=length-1;i++)
            if( base.indexOf(str.substring(i, i+1)) == -1  ){
                temp = temp + "" + lable + "" + " It should consist of 0-9!" + "\n";
                break;
            }    
    }
    
    if( mode % 16 >= 8 ){
        base = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789_-.@"
        for(i = 0;i<=length-1;i++)
            if( base.indexOf(str.substring(i, i+1)) == -1  ){
                temp = temp + "" + lable + "" + " contains invalid character! Only a-z, A-Z, 0-9 and .-_@" + "\n";
                break;
            }
    }
    
    if( mode % 32 >= 16 ){
        base = low.replace("[a-z]", "abcdefghijklmnopqrstuvwxyz")
        base = base.replace("[a-z]", "abcdefghijklmnopqrstuvwxyz")
        base = base.replace( "[0-9]", "0123456789")
        for(i = 0;i<=length-1;i++)
            if( base.indexOf(str.substring(i, i+1)) == -1 ){
                temp = temp + "" + lable + "" + " contains invalid characters! It can only be" + up + "." + "\n";
                break;
            }
    }
    
     if( mode % 64 >= 32 ){
        if( ! (length >= low && length <= up) ){
               temp = temp + "" + lable + "" + " should be " + low + "-" + up + " characters!" + "\n";
        }
    }
    
     if( mode % 128 >= 64 ){
        if( ! (parseInt(str) >= parseInt(low) && parseInt(str) <= parseInt(up)) ){
               temp = temp + "" + lable + "" + " should be " + low + "-" + up + " characters!" + "\n";
        }

    }
    if(temp!=""){
    	alert(temp);
    	type=(getformtype(obj));
    	if(type!="radio" && type!="checkbox"){
    		obj.focus();
    	}
	return false; 
   }
   return true;
    
}


function getformvalue(input){
	var type,temp;
	temp="";
	
	type=getformtype(input);	

	switch(type){
		case "radio":

			n=input.length-1;

			if(isNaN(n)==true){
				if(input.checked == true){
					temp = input.value;
				}else{
					temp = "";
				}	
			}else{
				for(i=0;i<=n;i++){
					if(input[i].checked == true){
						return(input[i].value);
					}
				}
				break;
			}
			case "checkbox":
			n=input.length-1;
			if(isNaN(n)==true){
				if(input.checked == true){
					temp = input.value;
				}else{
					temp = "";
				}	
			}else{
				for(i=0;i<=n;i++){
					if(input[i].checked == true){
						if(temp!=""){
							temp += ",";
						}
						temp += input[i].value;

					}	
				}
			}
			return(temp);
			break;
			
		case "select-one" :

			n=input.length-1;	
			for(i=0;i<=n;i++){
				if(input.options[i].selected == true){
					temp = input.options[i].value;
					break;
				}			
			}
			return(temp);
			break;				
		case "select-multiple":

			n=input.length-1;	
			for(i=0;i<=n;i++){
				if(input.options[i].selected == true){
					if(temp!=""){
						temp+=",";
					}					
					temp+=input.options[i].value;
				}			
			}
			return(temp);
			break;			
		default:
			return(input.value);
			break;
	
	}
	
	return(input.value);

}


function getformtype(obj){
	var type;
	type=obj.type;
	if(typeof(type)=="undefined"){

		type=obj[0].type;
	}
	return type;		
}


function getformvalue(input){
	var type,temp;
	temp="";
	
	type=getformtype(input);	

	switch(type){
		case "radio":

			n=input.length-1;

			if(isNaN(n)==true){
				if(input.checked == true){
					temp = input.value;
				}else{
					temp = "";
				}	
			}else{
				for(i=0;i<=n;i++){
					if(input[i].checked == true){
						return(input[i].value);
					}
				}
				break;
			}
			case "checkbox":
			n=input.length-1;
			if(isNaN(n)==true){
				if(input.checked == true){
					temp = input.value;
				}else{
					temp = "";
				}	
			}else{
				for(i=0;i<=n;i++){
					if(input[i].checked == true){
						if(temp!=""){
							temp += ",";
						}
						temp += input[i].value;

					}	
				}
			}
			return(temp);
			break;
			
		case "select-one" :

			n=input.length-1;	
			for(i=0;i<=n;i++){
				if(input.options[i].selected == true){
					temp = input.options[i].value;
					break;
				}			
			}
			return(temp);
			break;				
		case "select-multiple":

			n=input.length-1;	
			for(i=0;i<=n;i++){
				if(input.options[i].selected == true){
					if(temp!=""){
						temp+=",";
					}					
					temp+=input.options[i].value;
				}			
			}
			return(temp);
			break;			
		default:
			return(input.value);
			break;
	
	}
	
	return(input.value);

}

function ischecked(group,value){
	var i,n;
	n=group.length-1;
	for(i=0;i<=n;i++){
		if(value==group[i]){
			return true;			
		}
	}
	return false;
}


function SetSelectedAndChecked(input,value){
	var type,temp,i,n;
	var split_value = new Array();
	temp="";
	
	type=input.type;
	
	if(typeof(type)=="undefined"){
		type=input[0].type;
	}
	

	switch(type){
		case "radio":

			n=input.length-1;

			if(isNaN(n)==true){
				if(input.value = value){
					input.checked = true;
				}else{
					input.checked = false;
				}	
			}else{
				for(i=0;i<=n;i++){
					if(input[i].value == value){
						input[i].checked = true;
					}else{
						input[i].checked = false;					
					}
				}
			}
			break;

		case "checkbox":
			n=input.length-1;
			split_value=value.split(",");
			if(isNaN(n)==true){
				if(ischecked(split_value,input.value)){
					input.checked = true;
				}else{
					input.checked = false;
				}	
			}else{
				for(i=0;i<=n;i++){
					if(ischecked(split_value,input[i].value)){
						input[i].checked = true;
					}else{
						input[i].checked = false;					
					}					
				}
				
			}
			break;
			
		case "select-one" :

			n=input.options.length-1;	
			for(i=0;i<=n;i++){
				if(input.options[i].value == value){
					input.options[i].selected = true;
				}else{
					input.options[i].selected = false;				
				}
						
			}
			break;				
		case "select-multiple":

			n=input.options.length-1;	
			split_value=value.split(",");
			for(i=0;i<=n;i++){
				if(ischecked(split_value,input.options[i].value)){
						input.options[i].selected = true;
				}else{
						input.options[i].selected = false;				
				}			
			}
			break;			
		default:
			return false;
			break;
	
	}
	
	return true;

}


function checkemail(stremail)
{
	var str=stremail
	//var filter=/^.+@.+\..{2,3}$/
	var filter=/^\w+([-.]{0,}\w+)*[-]{0,10}@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
	if (filter.test(str))
		testresults=true
	else
	{
		testresults=false
	}
	return (testresults)
}

function CheckIfEnglish(String)
{ 
   var Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
   var i;
   var c;
   for( i = 0; i < String.length; i ++ )
   {
     c = String.charAt( i );
	   if (Letters.indexOf( c ) < 0)
	     return false;
   }
     return true;
}

function CheckIfEnglish4Reg(String)
{ 
   var Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890.@_-";
   var i;
   var c;
   for( i = 0; i < String.length; i ++ )
   {
     c = String.charAt( i );
	   if (Letters.indexOf( c ) < 0)
	     return false;
   }
     return true;
}

function CheckIfSmallEnglish(String)
{
   var Letters = "abcdefghijklmnopqrstuvwxyz1234567890";
   var i;
   var c;
   for( i = 0; i < String.length; i ++ )
   {
     c = String.charAt( i );
	   if (Letters.indexOf( c ) < 0)
	     return false;
   }
   return true;
}

function CheckIfBothEnglishInt(String) {
    var Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    var Letteraz = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var Letter09 = "1234567890";
    var i;
    var c;
    var baz = false;
    var b09 = false;
    for (i = 0; i < String.length; i++) {
        c = String.charAt(i);
        if (Letters.indexOf(c) < 0) {
            return false;
        }
        if (Letteraz.indexOf(c) >= 0) {
            baz = true;
        }
        if (Letter09.indexOf(c) >= 0) {
            b09 = true;
        }
    }
    return (baz && b09);
}

function CheckTel(String)
{ 
   var Letters = "0123456789-";
   var i;
   var c;
   for( i = 0; i < String.length; i ++ )
   {
     c = String.charAt( i );
	   if (Letters.indexOf( c ) < 0)
	     return false;
   }
     return true;
}


function checkIsNull(str)
{
	var newstr;
	var re = /\s/gi;
	newstr=str.replace(re, "");
	if(str.length!=newstr.length)
	return(1);
	else
	return(0);
}

function Trim(str)
{
	var newstr;
	var re = /\s/gi;
	newstr=str.replace(re, "");
	return newstr;
}

function checkIsNull_All(str)
{
	var newstr = "";
	for(i=0;i<str.length;i++)
	{
		if( str.substr(i,1)!=" " )
		{
			newstr += str.substr(i,1);
		}
	}
	if(  str.length!=newstr.length )
		return 1;
	else
		return 0;
}

function checkIsNull(str)
{
	var newstr;
	var re = /\s/gi;
	newstr=str.replace(re, "");
	if(str.length!=newstr.length)
	return(1);
	else
	return(0);
}

function getCookieVal (offset) 
{
   var endstr = document.cookie.indexOf (";", offset);
   if (endstr == -1)
      endstr = document.cookie.length;
   return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie (name) 
{
   var arg = name + "=";
   var alen = arg.length;
   var clen = document.cookie.length;
   var i = 0;
   while (i < clen) 
      {
      var j = i + alen;
      if (document.cookie.substring(i, j) == arg)
         return getCookieVal (j);
      i = document.cookie.indexOf(" ", i) + 1;
      if (i == 0) 
         break; 
      }
   return null;
}

function SetCookie (name, value) 
{
   var argv = SetCookie.arguments;
   var argc = SetCookie.arguments.length; 
   var expires = (2 < argc) ? argv[2] : null;
   var path = (3 < argc) ? argv[3] : null;
   var domain = (4 < argc) ? argv[4] : null;	
   var secure = (5 < argc) ? argv[5] : false;  
   document.cookie = name + "=" + escape (value) +
     ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
     ((path == null) ? "" : ("; path=" + path)) +
     ((domain == null) ? "" : ("; domain=" + domain)) +
	((secure == true) ? "; secure" : "");
}
String.prototype.trueLength   =   function()   
  {   
  return   this.replace(/[^\x00-\xff]/g,   "**").length;   
  }
function GetStringLength(str)
{ 
	var Length = 0;
	for(i=0;i<str.length;i++)
	{
		char=str.charCodeAt(i); 
		if(char>255)
		{ 
			Length = Length + 2;
		}
		else
		{
			Length = Length + 1;
		}
	} 
	return Length;
}

function checkChinese(str)
{
	for(i=0;i<str.length;i++)
	{
		char=str.charCodeAt(i); 
		if(char>255)
		{ 
			return false;
		}
	}
	return true;
}

/// <reference path="jquery-1.4.1.min.js" />

var random = 0;
//var checkurl = "https://account.91.com/common/usernamecheck.aspx?info=";
var checkurl = "/?/Accounts/CheckUsername/";

function getJsonData(para) {
    var ajax = _jsc.ajax.getAjax();
    ajax.open("GET", para, false);
    ajax.send(null);
    try {
        //eval("var s = "+ajax.responseText);
        var s = ajax.responseText;
        return s;
    } catch (e) {
        alert(e.message);
        return null;
    }
}
//regsvr32 scrrun.dll 

var msgs = {

    //帐号相关校验提示信息

    txtAccount_default: '<font color=#006600>The "Username" must be at least 5 and 10 characters, using only letters, numbers, or both (case sensitive). You cannot use email address as your account ID.</font>',
    txtAccount_leninvalid: '<font color=#006600>The "Username" must be at least 5 and 10 characters, using only letters, numbers, or both (case sensitive). You cannot use email address as your account ID.</font>',
    txtAccount_contentinvalid: '<font color=#006600>Account ID should consist of a-z, 0-9 and 5-10 length!</font>',
    txtAccount_contentinvalidxa: '<font color=#006600>Account ID should consist of a-z, 0-9 and 5-10 length!</font>',
    txtAccount_noblank: '<font color=#006600>The "Username" must be at least 5 and 10 characters, using only letters, numbers, or both (case sensitive). You cannot use email address as your account ID.</font>',
    txtAccount_used: '<font color=#006600>This account ID has been taken. Please try again!</font>',
    txtAccount_valid: '<font color=#00FFCC>Success!</font>',
    //密码校验相关提示信息
    txtPassword_default: '<font color=#006600>*The password length must be between 6 and 14 characters, using only letters, numbers or both (case sensitive).</font>',
    txtPassword_noblank: '<font color=#006600>Password length must be between 6 and 14 characters.</font>',
    txtPassword_leninvalid: '<font color=#006600>Password length must be between 6 and 14 characters.</font>',
    txtPassword_contentinvalid: '<font color=#006600>Password should consist of a-z, A-Z or 0-9!</font>',
    txtPassword_valid: '<font color=#00FFCC>Success!</font>',
    //确认密码校验相关提示信息
    txtConfirmPassword_default: '<font color=#006600>*The password length must be between 6 and 14 characters, using only letters, numbers or both (case sensitive).</font>',
    txtConfirmPassword_noblank: '<font color=#006600>Confirm password length must be between 6 and 14 characters.</font>',
    txtConfirmPassword_nocompare: '<font color=#006600>Your passwords don\'t match!</font>',
    txtConfirmPassword_valid: '<font color=#00FFCC>Success!</font>',
    //真实姓名相关校验提示信息
    txtRealName_default: '<font color=#006600>The name should no more than 12 characters long!</font>',
    txtRealName_leninvalid: '<font color=#006600>The name should no more than 12 characters long!</font>',
    txtRealName_noblank: '<font color=#006600>Please enter your name!</font>',
    txtRealName_valid: '<font color=#006600>Success!</font>',
    //邮箱校验相关提示信息
    txtEmail_default: '<font color=#006600>* Must be valid!</font>',
    txtEmail_noblank: '<font color=#006600>Please enter your e-mail address!</font>',
    txtEmail_leninvalid: '<font color=#006600>E-mail Address should be no more than 40 characters!</font>',
    txtEmail_formatinvalid: '<font color=#006600>The email address is invalid!</font>',
    txtEmail_valid: '<font color=#00FFCC>Success!</font>',
    //身份证校验相关提示信息
    txtPaperCard_default: '<font color=#006600>* Minimum 8 digits</font>',
    txtPaperCard_noblank: '<font color=#006600>Please enter your Identification No.!</font>',
    txtPaperCard_leninvalid: '<font color=#006600>Identification No. should be 8-15 characters!</font>',
    txtPaperCard_valid: '<font color=#00FFCC>Success!</font>',
    //确认身份证验证相关提示信息
    txtConfirmPaperCard_default: '<font color=#006600>* Minimum 8 digits</font>',
    txtConfirmPaperCard_noblank: '<font color=#006600>Please enter your Confirm Identification No.!</font>',
    txtConfirmPaperCard_nocompare: '<font color=#006600>Your Identification No. don\'t match.</font>',
    txtConfirmPaperCard_valid: '<font color=#00FFCC>Success!</font>',
    //密保问题相关提示信息
    txtQuestion_default: '<font color=#006600>* Minimum 2 letters</font>',
    txtQuestion_noblank: '<font color=#006600>Please enter your Security Question!</font>',
    txtQuestion_leninvalid: '<font color=#006600>Security Question should be 2-30 characters!</font>',
    txtQuestion_valid: '<font color=#00FFCC>Success!</font>',
    //密保答案相关提示信息
    txtAnswer_default: '<font color=#006600>* Minimum 4 letters</font>',
    txtAnswer_noblank: '<font color=#006600>Please enter your security answer!</font>',
    txtAnswer_leninvalid: '<font color=#006600>Security Answer should be 4-30 characters!</font>',
    txtAnswer_valid: '<font color=#00FFCC>Success!</font>',
    //确认密保答案相关提示信息
    txtConfirmAnswer_default: '<font color=#006600>* Minimum 4 letters</font>',
    txtConfirmAnswer_noblank: '<font color=#006600>Please enter your security answer!</font>',
    txtConfirmAnswer_nocompare: '<font color=#006600>Your answers don\'t match!</font>',
    txtConfirmAnswer_valid: '<font color=#00FFCC>Success!</font>',
    //电话号码相关提示信息
    txt_teltphone_default: '<font color=#006600>*Only numbers may be used, with a minimum of 8 digits.</font>',
    txt_teltphone_noblank: '<font color=#006600>Please enter your Security Code!</font>',
    txt_teltphone_nocompare: '<font color=#006600>At least 8 digits are required!</font>',
    txt_teltphone_valid: '<font color=#00FFCC>Success!</font>'


};

var types = ['text', 'password'];
//var blank_check_excepts = ['txtPaperCard','txtConfirmPaperCard','txtQuestion','txtAnswer','txtConfirmAnswer','txtAccount','txtConfirmPassword','txtPassword','txtRealName','txtEmail','txtConfirmEmail'];
var blank_check_excepts = ['txtAccount', 'txtPassword', 'txtConfirmPassword', 'txtEmail'];

var depends = {
    txtConfirmPassword: 'txtPassword'
};

var valid_reg = Validator.extend({

    valid_txtAccount: function (o) {
        if (o.value.trim().length >= 5 && o.value.trim().length <= 10) {
            $(o.id + '_info').innerHTML = 'Checking...';
            var url = checkurl + o.value + "/0";
            var result = getJsonData(url);

            if (result.trim().length != 0) {
                //alert(result);
                if (result == '0') {
                    this.setDefinedStyle(o, 'leninvalid', 'FailedMsg');
                    this.valid_r &= false;
                    return;
                }
                if (result == '1' || result == '2') {
                    this.setDefinedStyle(o, 'contentinvalid', 'FailedMsg');
                    this.valid_r &= false;
                    return;
                }
                if (result == '4') {
                    this.setDefinedStyle(o, 'used', 'FailedMsg');
                    this.valid_r &= false;
                    return;
                }
                if (result == '141') {
                    this.setDefinedStyle(o, 'contentinvalidxa', 'FailedMsg');
                    this.valid_r &= false;
                    return;
                }
                this.setDefinedStyle(o, 'valid', 'SucceedMsg');
                if (jQuery("#txtEmail").val() == "" && checkemail(o.value)) {
                    jQuery("#txtEmail").val(o.value.trim());
                    this.setDefinedStyle(jQuery("#txtEmail")[0], 'valid', 'SucceedMsg');
                }
                this.valid_r &= true;
            }
            else {
                this.setDefinedStyle(o, 'sysbusy', 'FailedMsg');
                this.valid_r &= false;
            }
        }
        else {
            if (o.value.trim().length == 0) {
                this.setDefinedStyle(o, 'noblank', 'FailedMsg');
                this.valid_r &= false;
            }
            else {
                this.setDefinedStyle(o, 'leninvalid', 'FailedMsg');
                this.valid_r &= false;
            }
        }
    },

    valid_txtPassword: function (o) {
        if (o.value.length < 6 || o.value.length > 14) {
            this.setDefinedStyle(o, 'leninvalid', 'FailedMsg');
            this.valid_r &= false;
            return;
        }
        if (!CheckIfEnglish(o.value)) {
            this.setDefinedStyle(o, 'contentinvalid', 'FailedMsg');
            this.valid_r &= false;
            return;
        }
        this.setDefinedStyle(o, 'valid', 'SucceedMsg');
        this.valid_r &= true;
    },
    valid_txtConfirmPassword: function (o) {
        if (o.value == $('txtPassword').value && o.value != '') {
            this.setDefinedStyle(o, 'valid', 'SucceedMsg');
            this.valid_r &= true;
        } else {
            this.setDefinedStyle(o, 'nocompare', 'FailedMsg');
            this.valid_r &= false;
        }
    },

    valid_txtRealName: function (o) {
        if (o.value.trim().length == 0) {
            this.setDefinedStyle(o, 'noblank', 'FailedMsg');
            this.valid_r &= false;
            return;
        }
        else if (o.value.length < 1 || o.value.length > 12) {
            this.setDefinedStyle(o, 'leninvalid', 'FailedMsg');
            this.valid_r &= false;
            return;
        }
        this.setDefinedStyle(o, 'valid', 'SucceedMsg');
        this.valid_r &= true;
    },

    valid_txtEmail: function (o) {
        if ((o.value.length < 1) || (o.value.length > 40)) {
            this.setDefinedStyle(o, 'leninvalid', 'FailedMsg');
            this.valid_r &= false;
            return;
        }
        if (!checkemail(o.value)) {
            this.setDefinedStyle(o, 'formatinvalid', 'FailedMsg');
            this.valid_r &= false;
            return;
        }
        this.setDefinedStyle(o, 'valid', 'SucceedMsg');
        this.valid_r &= true;
    },

    valid_txtAnswer: function (o) {
        if (o.value.length < 4 || o.value.length > 30) {
            this.setDefinedStyle(o, 'leninvalid', 'FailedMsg');
            this.valid_r &= false;
            return;
        }
        this.setDefinedStyle(o, 'valid', 'SucceedMsg');
        this.valid_r &= true;
    },
    valid_txtConfirmAnswer: function (o) {
        if (o.value == $('txtAnswer').value && o.value != '') {
            this.setDefinedStyle(o, 'valid', 'SucceedMsg');
            this.valid_r &= true;
        } else {
            this.setDefinedStyle(o, 'nocompare', 'FailedMsg');
            this.valid_r &= false;
        }
    },
    valid_txt_teltphone: function (o) {
        if (o.value != '' && isValidLength(o.value, 7, 16) && isNumber(o.value)) {
            this.setDefinedStyle(o, 'valid', 'SucceedMsg');
            this.valid_r &= true;
        } else {
            this.setDefinedStyle(o, 'nocompare', 'FailedMsg');
            this.valid_r &= false;
        }
    }

});

var valid = new valid_reg('form1', 'form1', msgs, types, blank_check_excepts, depends);
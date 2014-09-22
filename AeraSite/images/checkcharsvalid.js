function checkinvalidchars(inp){
  var re =/^[\u0000-\u00FF]*$/;
  if(inp.value == "")
	return false;
  if (re.test(inp.value))
  { 
	return true;
  }
  else
  {
	alert("Invalid Chars");
	inp.value = "";
	return false;
  }
}

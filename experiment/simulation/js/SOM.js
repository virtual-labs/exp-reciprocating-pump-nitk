//on click of next button
var mpointer=0;
var repeat =0;
var lnt =0;
var flag=0;
var idInput = null, checkUnit = null, textDisplay = null;
var compareVal = 0, qCount = 0, resultCount = 0 ;
var ansDisplay = 0;


//Questions object
var questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	// setOptions:function(d1,d2,d3,d4){
		// questions.options = new Array(d1,d2,d3,d4);
	// },
	setOptions:function(d1,d2,d3,d4,d5){
		if(d5 == 0 && d4!=0)
			questions.options = new Array(d1,d2,d3,d4);
		else if(d4 == 0 && d5 == 0)
		{
			questions.options = new Array(d1,d2,d3);
		}
		else 
		{
			questions.options = new Array(d1,d2,d3,d4,d5);
		}
	},
	setAns:function(ans){
		questions.ans1 = ans;
	},
	frameQuestions:function(qun){
		var myDiv  = document.getElementById("question-div");
		var myDiv1 = document.getElementById("divq");
		myDiv.style.visibility = "visible";
		document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");
		
		var button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");
		
		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (var i = 0; i < questions.options.length; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.innerHTML = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		var x = document.getElementById("mySelect");
		var i = x.selectedIndex;
		var myDiv1  = document.getElementById("question-div");
		if(i == 0)
		{
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);		
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right<span class='boldClass'>&#128077;</span> ";
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong<span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			// document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},800);
	}
}



function checkInputValid(e) {
	e.value = e.value.match(/\d*(\.\d*)?/)[0];
}


//To insert input and check button
function userCalculation(elem)
{
	ansDisplay++;
	var inputVal = document.createElement("input");
	var checkVal = document.createElement("input");
	var rightVal = document.createElement("span");
	inputVal.setAttribute("type","text");
	inputVal.setAttribute("id","res"+ansDisplay);
	inputVal.setAttribute("oninput","checkInputValid(this)");
	rightVal.setAttribute("id","rightAns"+ansDisplay);
	inputVal.classList.add("inputStyle");
	checkVal.setAttribute("type","button");
	checkVal.setAttribute("id","chk"+ansDisplay);
	checkVal.setAttribute("style","cursor:pointer");
	checkVal.setAttribute("onclick","checkResult();");
	// checkVal.setAttribute("onmouseover","formulaDisplayClose();");
	checkVal.setAttribute("value","CHECK");
	elem.appendChild(inputVal);
	elem.appendChild(rightVal);
	elem.appendChild(checkVal);
	// elem.setAttribute("onmouseover","formulaDisplay(event,this);");
	// elem.setAttribute("onmouseleave","formulaDisplayClose();");
	// elem.setAttribute("onmouseout","formulaDisplayClose();");
}
function checkResult()
{
	var idd = document.getElementById("res"+ansDisplay);
	var idd1 = document.getElementById("chk"+ansDisplay);
	var ansId = document.getElementById("rightAns"+ansDisplay);
	if(simsubscreennum == 4)
	{
		compareVal = values[lnt][4];
		checkUnit = "m";
	}
	else if(simsubscreennum == 5)
	{
		compareVal = values[lnt][7];
		checkUnit = "N-m";
	}
	else if(simsubscreennum == 6)
	{
		compareVal = values[lnt][10];
		checkUnit = "x 10<sup>-4</sup>m<sup>3</sup>/sec";
	}
	else if(simsubscreennum == 8 && resultCount == 0)
	{
		compareVal = values[lnt][12];
		checkUnit = "W";
	}
	else if(simsubscreennum == 8 && resultCount == 1)
	{
		compareVal = values[lnt][13];
		checkUnit = "W";
	}
	else if(simsubscreennum == 8 && resultCount == 2)
	{
		compareVal = values[lnt][14];
		checkUnit = "m<sup>3</sup>/sec";
	}
	else if(simsubscreennum == 8 && resultCount == 3)
	{
		compareVal = values[lnt][15];
		checkUnit = "%";
	}
	else if(simsubscreennum == 8 && resultCount == 4)
	{
		compareVal = values[lnt][6];
		checkUnit = "W";
	}
	else if(simsubscreennum == 8 && resultCount == 5)
	{
		compareVal = values[lnt][16];
		checkUnit = "%";
	}
	else if(simsubscreennum == 8 && resultCount == 6)
	{
		compareVal = values[lnt][17];
		checkUnit = "%";
		
	}
	else if(simsubscreennum == 8 && resultCount == 7)
	{
		compareVal = values[lnt][18];
		checkUnit = "%";
	}

	if(!idd.value  || !idd.value!=" ")
	{
		// idd.setAttribute("placeholder","Please enter value");
	}
	else if(Math.round(idd.value) != Math.round(compareVal))
	{
		// console.log(2);
		qCount++;
		// blinkStop();
		ansId.classList.remove("resultStyle");
		idd.style.borderColor = "red";
		ansId.style.color = "red";
		ansId.innerHTML= "&#10008;";
		if(qCount == 2)
		{
			idd1.value = "RESULT";
		}
		if(qCount == 3)
		{
			idd1.style.visibility = "hidden";
			idd.parentNode.removeChild(idd);
			idd1.parentNode.removeChild(idd1);
			ansId.classList.add("resultStyle");
			ansId.style.color = "black";
			ansId.innerHTML= compareVal+checkUnit;
			goToNextFunction();
		}
	}
	else
	{
		idd1.style.visibility = "hidden";
		idd.parentNode.removeChild(idd);
		idd1.parentNode.removeChild(idd1);
		ansId.classList.add("resultStyle");
		ansId.style.color = "black";
		ansId.innerHTML= compareVal+checkUnit+"<span style='color:green;font-size:20px;'>&#10004;</span>";
		goToNextFunction();
	}
}

function goToNextFunction()
{
	if(simsubscreennum == 4)
	{
		qCount = 0;
		if(lnt == 0)
		{
			document.getElementById('can4-1').style.visibility="hidden";
			document.getElementById('needle2').style.visibility="hidden";
			var q0 = Object.create(questions);
			generateQuestion(q0,"Delivery Head(H<sub>d</sub>) and Suction Head(H<sub>s</sub>) values are used in calculation of: ","","Torque","Total Head","All of the above","None of the above",2,screen3Proceed,500,200,250,200);
		}
		else
			document.getElementById('nextButton').style.visibility="visible";
	}
	else if(simsubscreennum == 5)
	{
		qCount = 0;
		if(lnt == 1)
		{
			var q1 = Object.create(questions);
			generateQuestion(q1,"Value of 'g' used in calculation of torque is: ","","9.4m/s<sup>2</sup>","9.8m/s<sup>2</sup>","9.2m/s<sup>2</sup>","9.1m/s<sup>2</sup>",2,screen5Proceed,460,160,295,200);
		}
		else
			document.getElementById("nextButton").style.visibility = "visible";
	}
	else if(simsubscreennum == 6)
	{
		qCount = 0;
		// if(lnt == 1)
		// {
			// var q2 = Object.create(questions);
			// generateQuestion(q2,"Head of water (h) is calculated by: ","","h = Final Reading - Initial Reading","h = Final Reading + Initial Reading","h = Initial Reading - Final Reading","h =  Final Reading * Initial Reading",1,scree6Proceed,410,140,310,160);
		// }
		// else
			document.getElementById("nextButton").style.visibility = "visible";
	}
	else if(simsubscreennum == 8 && resultCount == 0)
	{
		resultCount = 1;
		qCount = 0;
		document.getElementById('step8text2').innerHTML = " Pump Output = ";
		idInput = document.getElementById('step8text2');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 8 && resultCount == 1)
	{
		resultCount = 2;
		qCount = 0;
		document.getElementById('step8text3').innerHTML = "Theoretical discharge, Q<sub>th</sub> =  ";
		idInput = document.getElementById('step8text3');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 8 && resultCount == 2)
	{
		resultCount = 3;
		qCount = 0;
		document.getElementById('step8text4').innerHTML = "Percentage slip =  ";
		idInput = document.getElementById('step8text4');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 8 && resultCount == 3)
	{
		resultCount = 4;
		qCount = 0;
		document.getElementById('step8text5').innerHTML = "Motor output =  ";
		idInput = document.getElementById('step8text5');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 8 && resultCount == 4)
	{
		resultCount = 5;
		qCount = 0;
		document.getElementById('step8text6').innerHTML = "Efficiency of motor =  ";
		idInput = document.getElementById('step8text6');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 8 && resultCount == 5)
	{
		resultCount = 6;
		qCount = 0;
		document.getElementById('step8text7').innerHTML = "Efficiency of pump =  ";
		idInput = document.getElementById('step8text7');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 8 && resultCount == 6)
	{
		resultCount = 7;
		qCount = 0;
		document.getElementById('step8text8').innerHTML = "Overall efficiency =  ";
		idInput = document.getElementById('step8text8');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 8 && resultCount == 7)
	{
		resultCount = 0;
		qCount = 0;
		
		if(lnt == 0)
		{
			var q3 = Object.create(questions);
			generateQuestion(q3,"What does N<sub>p</sub> indicate in calculation of Q<sub>th</sub>: ","","Number of revolutions","Speed of Motor","Speed of Pump","None of the above",3,screen8Proceed,10,320,200,160);
		}
		else
		{
			lnt = 3;
		// repeat+=1;
			step8a();
			document.getElementById('nextButton').style.visibility="visible";
		}
		
	}
	
	
}
function screen8Proceed()
{
	lnt = 3;
	step8a();
	document.getElementById('nextButton').style.visibility="visible";
}
// function formulaDisplay(event,ele)
// {
// 	var xx = event.pageX;
// 	var yy = event.pageY;
// 	xx = xx -  100;
// 	yy = yy - 50;
// 	if(ele.id == "step4text4")
// 		textDisplay = "H (m) = H<sub>s</sub>+H<sub>d</sub>+z";
// 	if(ele.id == "step5text1")
// 		textDisplay = "&tau;(N-m) = S*r*g";
// 	if(ele.id == "step6text2")
// 		textDisplay = "Q<sub>act</sub> (x 10<sup>-4</sup>m<sup>3</sup>/sec) = (A * h)/t<sub>1</sub> ";
// 	if(ele.id == "step8text1")
// 		textDisplay = "Motor Input (W) = (2400 * n)/t<sub>2</sub>";
// 	if(ele.id == "step8text2")
// 		textDisplay = "Pump Output (W) = &gamma; * Q<sub>act</sub> * H";
// 	if(ele.id == "step8text3")
// 		textDisplay = "Theoretical discharge, Q<sub>th</sub> (m<sup>3</sup>/sec) = (2*A*L*N<sub>p</sub>)/60";
// 	if(ele.id == "step8text4")
// 		textDisplay = "Percentage slip (%) = ((Q<sub>th</sub> - Q<sub>act</sub>)/Q<sub>th</sub>) * 100";
// 	if(ele.id == "step8text5")
// 		textDisplay = "Motor output (%) = (2 * &pi; * N<sub>m</sub> *&tau;)/60";
// 	if(ele.id == "step8text6")
// 		textDisplay = "Efficiency of motor (W) = (Motor Output/Motor Input)*100";
// 	if(ele.id == "step8text7")
// 		textDisplay = "Efficiency of pump (%) = (Pump Output/Motor Output)*100";
// 	if(ele.id == "step8text8")
// 		textDisplay = "Overall efficiency (%) = (Efficiency of motor * Efficiency of pump)*100";
	
	
// 	document.getElementById("formula").style = "position:absolute;visibility:visible;font-family:verdana;font-size:14px;background-color:black;color:white;border-radius:5px;padding:5px;left:"+xx+"px;top:"+yy+"px;";
// 	document.getElementById("formula").innerHTML = textDisplay;
// }
// function formulaDisplayClose()
// {
// 	document.getElementById("formula").innerHTML = "";
// 	document.getElementById("formula").style.visibility = "hidden";
// }

function navNext()
{

	for (temp = 0; temp <=9 ; temp++) 
	{ 
		document.getElementById('canvas'+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;
	document.getElementById('canvas'+(simsubscreennum)).style.visibility="visible";
	document.getElementById('nextButton').style.visibility="hidden";
	
	magic();
}

//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
	if (document.getElementById('arrow1').style.visibility=="hidden")
		
	document.getElementById('arrow1').style.visibility="visible";
	
	else
		document.getElementById('arrow1').style.visibility="hidden";
}



//stop blinking arrow
function myStopFunction() 
{
	clearInterval(myInt);
	document.getElementById('arrow1').style.visibility="hidden";
}




//Move pointing finger with mouse
$(document).mousemove(function(e)
{

if(simsubscreennum==1 && mpointer==0) 
{
if(e.pageX<800 && e.pageY<600)  
{
document.getElementById('pumponarm').style.visibility="visible";

 $("#pumponarm").css({left:e.pageX, top:e.pageY});
}
else
{
document.getElementById('pumponarm').style.visibility="hidden";
}

}

else if(simsubscreennum==2)
{
	document.getElementById('pumponarm').style.visibility="hidden";
}


});

function magic()
{
	
	
	
	if (simsubscreennum==1)
	{
		document.getElementById('trial').style="visibility:hidden ;left: 70px; top: 100px;position: absolute;font-weight: bold;";
		document.getElementById('trial').innerHTML="";
		document.getElementById("formula").style.visibility = "hidden";
		if(flag==1)
		{
			document.getElementById('onimg').onclick="";
			document.getElementById('pumptext').innerHTML="Stop the pump by pressing the stop button.";		
		}
		else
		{
			document.getElementById("pumponarm").style="margin-left:-50px; margin-top: -50px; position:absolute;";
			document.getElementById('onimg').onclick=function() { step1(); };
			document.getElementById('can1off').onclick=function() { stepstop(); };
		}
		
	
	
	}
	else if(simsubscreennum==2)
	{
		refresh1();
		repeat+=1;
		
		if(repeat!=1)
		{
			
			myStopFunction();
			
		}
		
		else
		{
			myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 580px; top: 380px; height: 50px; z-index: 10;";
			
			document.getElementById("arrow1").style.WebkitTransform = "rotate(-135deg)"; 
			// Code for IE9
			document.getElementById("arrow1").style.msTransform = "rotate(-135deg)"; 
			// Standard syntax
			document.getElementById("arrow1").style.transform = "rotate(-135deg)";
			
			document.getElementById("step2handle").style="position:absolute;left: 565px; top: 263px";
			document.getElementById("step2handle").onclick=function(){step3nhalf();};
		
		}
			

		
		
	}
	else if(simsubscreennum==3)
	{
		refresh1();
		document.getElementById('formula').style.visibility="hidden";
		document.getElementById('can3-1').style.visibility="hidden";
		document.getElementById('needle1').style.visibility="hidden";
		
		document.getElementById('trial').style="visibility:visible ;left: 700px; top: 100px;position: absolute;font-weight: bold;text-transform: uppercase;";
		document.getElementById('trial').innerHTML="Trial : " + 1;
		
		myInt = setInterval(function(){ animatearrow(); }, 500);
		
		document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 120px; top: 260px; height: 50px; z-index: 10;";
		
		document.getElementById("arrow1").style.WebkitTransform = "rotate(-90deg)"; 
		// Code for IE9
		document.getElementById("arrow1").style.msTransform = "rotate(-90deg)"; 
		// Standard syntax
		document.getElementById("arrow1").style.transform = "rotate(-90deg)";

		document.getElementById("can3-3").onclick=function(){rotateright();};
		
	}
	
	else if(simsubscreennum==4)
	{
		document.getElementById('can3-1').style.visibility="hidden";
		document.getElementById('needle1').style.visibility="hidden";
		
		document.getElementById('can4-1').style.visibility="hidden";
		document.getElementById('needle2').style.visibility="hidden";
		
		myInt = setInterval(function(){ animatearrow(); }, 500);
		document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 122px; top: 300px; height: 50px; z-index: 10;";
		
		document.getElementById("arrow1").style.WebkitTransform = "rotate(-90deg)"; 
		// Code for IE9
		document.getElementById("arrow1").style.msTransform = "rotate(-90deg)"; 
		// Standard syntax
		document.getElementById("arrow1").style.transform = "rotate(-90deg)";
			
		document.getElementById("can4-3").onclick=function(){rotateleft();;};
		
	}
	else if(simsubscreennum==5)
	{
		document.getElementById('formula').style.visibility="hidden";
		document.getElementById('can4-1').style.visibility="hidden";
		document.getElementById('needle2').style.visibility="hidden";
		
		myInt = setInterval(function(){ animatearrow(); }, 500);
		document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 480px; top: 110px; height: 50px; z-index: 10;";
		
		document.getElementById('can-3').style.visibility="hidden";
		document.getElementById('can-4').style.visibility="hidden";
		document.getElementById('turningarm').style="visibility:hidden;"
		
		document.getElementById("bhead").onclick=function(){head_1();};
		
		
	}
	else if(simsubscreennum==6)
	{
		document.getElementById("formula").style.visibility = "hidden";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 610px; top: 320px; height: 50px; z-index: 10;";
		
		document.getElementById("arrow1").style.WebkitTransform = "rotate(-90deg)"; 
		// Code for IE9
		document.getElementById("arrow1").style.msTransform = "rotate(-90deg)"; 
		// Standard syntax
		document.getElementById("arrow1").style.transform = "rotate(-90deg)";
		
		document.getElementById('can-3').style.visibility="hidden";
		document.getElementById('can-4').style.visibility="hidden";
		document.getElementById('turningarm').style="visibility:hidden;"
		
		document.getElementById("rothead2").onclick=function() { rotatehandle2(); };
		
		
	}
	else if(simsubscreennum==7)
	{
		document.getElementById('formula').style.visibility="hidden";
		document.getElementById('ndl7').style.visibility="hidden";
		document.getElementById('meter').style.visibility="hidden";
		
		myInt = setInterval(function(){ animatearrow(); }, 500);
		document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 202px; top: 128px; height: 50px; z-index: 10;";
		
		document.getElementById('can-3').style.visibility="hidden";
		document.getElementById('can-4').style.visibility="hidden";
		document.getElementById('turningarm').style="visibility:hidden;"
		
		document.getElementById("ndl7_a").onclick=function() { step7(); };
		
	}
	else if(simsubscreennum==8)
	{
		document.getElementById('ndl7').style.visibility="hidden";
		document.getElementById('meter').style.visibility="hidden";
			
		// refresh1();
		step8();
		
		
		
	}
	else if(simsubscreennum==9)
	{
		document.getElementById('can1-1').style.visibility = "hidden";
		document.getElementById('onimg').style.visibility = "hidden";
		document.getElementById('can1off').style.visibility = "hidden";
		document.getElementById('formula').style.visibility = "hidden";
		document.getElementById('trial').style.visibility = "hidden";
		var stepSkip = document.getElementById("skip");
		stepSkip.classList.toggle('fade');
		setTimeout(function()
		{
			document.getElementById("nextButton").style.visibility = "visible";
		},500);
	}
	else if(simsubscreennum==10)
	{
		document.getElementById('step9text1').onclick=function() { step_9a();}
		document.getElementById('step9text2').onclick=function() { step_9b();}
		document.getElementById('step9text3').onclick=function() { step_9c();}
	}
	
}


function step1()
{
	mpointer=1;
	document.getElementById('pumponarm').style.visibility="hidden";

	setTimeout(function(){ document.getElementById('nextButton').style.visibility="visible"; }, 250);
}


function step3nhalf()
{
	myStopFunction();
	document.getElementById("step2handle").style.transformOrigin = "10% 15%";
	document.getElementById("step2handle").style.animation = "valveturn 0.9s "+1+" ";
	
	
	
	setTimeout(function(){ 
	document.getElementById('step3text1').innerHTML="Speed of the motor (N<sub>m</sub>) = "+spdmtr +" rpm";
	document.getElementById('step3text2').innerHTML="Speed of the pump (N<sub>p</sub>) = "+spdpump +" rpm";
	
	//document.getElementById('step3text0').innerHTML=lnt +" & " +values[lnt][2];
	
	document.getElementById('nextButton').style.visibility="visible"; }, 2000);
}


function rotateright()
{
	myStopFunction();
	
	document.getElementById('can3-1').style.visibility="visible";
	document.getElementById('needle1').style.visibility="visible";
		
	setTimeout(function(){ 
	document.getElementById("needle1").style.transformOrigin = "53.3% 50%";
	document.getElementById("needle1").style.WebkitTransform = "rotate(30deg)"; 
	document.getElementById("needle1").style.animation = "needleturn 2.5s forwards";
	}, 1000);
	
	
	setTimeout(function(){ 
	document.getElementById('step3text3').innerHTML="Delivery head (H<sub>d</sub>)=" +values[lnt][2] +" kg/cm<sup>2</sup>";
	document.getElementById('step3text4').innerHTML="Delivery head (H<sub>d</sub>)=" +values[lnt][3]+" m";
	// if(lnt == 2)
	// {
		// document.getElementById('can3-1').style.visibility="hidden";
		// document.getElementById('needle1').style.visibility="hidden";
		// var q4 = Object.create(questions);
		// generateQuestion(q4,"Value of H<sub>d</sub> is incremented by ________kg/cm<sup>2</sup> in each trial: ","","0.2","0.4","0.6","0.8",2,screen3Proceed,500,200,250,200);
	// }
	// else
	document.getElementById('nextButton').style.visibility="visible"; 
	}, 3600);
	
}

function rotateleft()
{
	myStopFunction();
	
	document.getElementById('can4-1').style.visibility="visible";
	document.getElementById('needle2').style.visibility="visible";
		
	setTimeout(function(){ 
	document.getElementById("needle2").style.transformOrigin = "48.3% 46.7%";
	document.getElementById("needle2").style.WebkitTransform = "rotate(30deg)";  
	document.getElementById("needle2").style.animation = "needleturnlft 2.5s forwards"; }, 1000);
		
	setTimeout(function(){
	document.getElementById('step4text1').innerHTML="Suction head (H<sub>s</sub>)= "+values[lnt][0]+" mm of Hg";
	document.getElementById('step4text2').innerHTML="Suction head (H<sub>s</sub>)= "+values[lnt][1]+" m of water";
	document.getElementById('step4text4').innerHTML="Total head (H) = ";
	idInput = document.getElementById('step4text4');
	userCalculation(idInput);
	}, 3600);
	
}

function screen3Proceed()
{
	document.getElementById('nextButton').style.visibility="visible";
}

function head_1()
{
	myStopFunction();
	
	myInt = setInterval(function(){ animatearrow(); }, 500);
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 640px; top: 240px; height: 50px; z-index: 10;";
	
	document.getElementById("arrow1").style.WebkitTransform = "rotate(-135deg)"; 
	// Code for IE9
	document.getElementById("arrow1").style.msTransform = "rotate(-135deg)"; 
	// Standard syntax
	document.getElementById("arrow1").style.transform = "rotate(-135deg)";
	
	document.getElementById('can-3').style.visibility="visible";
	document.getElementById('can-4').style.visibility="visible";
	
	document.getElementById("can-4").onclick=function() { rotatehead(); };
	
}

function rotatehead()
{
	myStopFunction();
	
	document.getElementById('can-4').style.transformOrigin = "14% 15%";
	document.getElementById('can-4').style.animation = "valveturn_2 2s forwards";
	
	document.getElementById("needle3").style.transformOrigin = "50% 56%";
	document.getElementById("needle3").style.animation = "ndlstpwtch 2s forwards";
	
	setTimeout(function(){ 
	document.getElementById("bparm").style.animation = "bpointer "+1.5+"s 1 forwards"; 
	}, 2000);
	
	setTimeout(function(){ 
	document.getElementById('step5text2').innerHTML="Spring balance reading (S)= "+values[lnt][5]+" kg";
	// document.getElementById('step5text1').innerHTML="Torque reading = "+values[lnt][7]+" N-m";
	document.getElementById('step5text1').innerHTML="Torque reading (&tau;)= ";
	idInput = document.getElementById('step5text1');
	userCalculation(idInput);
	// document.getElementById('nextButton').style.visibility="visible"; 
	}, 4000);
	
}

function  screen5Proceed()
{
	document.getElementById('nextButton').style.visibility="visible"; 
}



function rotatehandle2()
{
	myStopFunction();
	
	document.getElementById("rothead2").style.transformOrigin = "15% 45%";
	document.getElementById("rothead2").style.animation = "tankhandle 0.9s "+1+" forwards ";
	
	setTimeout(function(){ 
	document.getElementById("stopwatchndl").style.transformOrigin = "50% 90%";
	document.getElementById("stopwatchndl").style.animation = "rtstpwtch 3.5s "+1+" ";
	document.getElementById("mtubeblue").style.animation = "water0 "+3.5+"s 1 forwards";  
	}, 2000);
	
	setTimeout(function(){
	document.getElementById('step6text3').innerHTML="Time required by water to fill 10 cm height (t<sub>1</sub>)= "+values[lnt][9]+" sec";
	// document.getElementById('step6text2').innerHTML="Actual discharge, Q<sub>act</sub> = "+values[lnt][10]+" m<sup>3</sup>/second";
	document.getElementById('step6text2').innerHTML="Actual discharge, Q<sub>act</sub> = ";
	idInput = document.getElementById('step6text2');
	userCalculation(idInput);
	// document.getElementById('nextButton').style.visibility="visible";
	}, 5600);
	
}

function step7()
{
	myStopFunction();
	document.getElementById('ndl7').style.visibility="visible";
	document.getElementById('meter').style.visibility="visible";
	
	document.getElementById("ndl7").style.transformOrigin = "100% 100%";
	document.getElementById("ndl7").style.animation = "ndllst 2.5s "+5+" ";	
	
	setTimeout(function(){ 
	document.getElementById('step7text1').innerHTML="Time taken by energy meter for 5 revolution (t<sub>2</sub>)= " +values[lnt][11] +" sec";
	document.getElementById('nextButton').style.visibility="visible";
	}, 12500);
}


function step8()
{
	setTimeout(function(){ 
	document.getElementById('can8-1a').innerHTML="Time taken by energy meter for 5 revolution (t<sub>2</sub>)= " +values[lnt][11] +" sec";
	document.getElementById('can8-2').innerHTML="Actual discharge (Q<sub>act</sub>) = "+values[lnt][10]+" x 10<sup>-4</sup>m<sup>3</sup>/sec";
	document.getElementById('can8-3').innerHTML="Total head (H) = "+values[lnt][4]+"m";
	document.getElementById('can8-4').innerHTML="Speed of motor (N<sub>m</sub>) = "+spdmtr+"rpm";
	document.getElementById('can8-5').innerHTML="Speed of pump (N<sub>p</sub>) = "+spdpump+"rpm";
	document.getElementById('can8-6').innerHTML="Torque (&tau;) = "+values[lnt][7]+" N-m";
	idInput = document.getElementById('step8text1');
	userCalculation(idInput);
	// document.getElementById('step8text2').innerHTML="Pump output = "+values[lnt][13] +" watt";
	// document.getElementById('step8text3').innerHTML="Theoretical discharge, Q<sub>th</sub> = "+values[lnt][14] +" m<sup>3</sup>/sec";
	// document.getElementById('step8text4').innerHTML="Percentage slip = "+values[lnt][15] +" %";
	// document.getElementById('step8text5').innerHTML="Efficiency of motor = "+values[lnt][16] +" %";
	// document.getElementById('step8text6').innerHTML="Efficiency of pump = "+values[lnt][17] +" %";
	// document.getElementById('step8text7').innerHTML="Overall efficiency = "+values[lnt][18] +" %";
	
	// document.getElementById('nextButton').style.visibility="visible";
	
	// lnt+=1;
	
	}, 500);
}

function step8a()
{
	if(lnt==3)
		{
			flag=1;
			mpointer=0;
			simsubscreennum=0;
		}
		
		else if (lnt < 3)
		{
			simsubscreennum=2;
		}
}
function stepstop()
{
	document.getElementById('pumponarm').style.visibility="hidden";
	if(flag!=1){
		document.getElementById('nextButton').style.visibility="hidden";	
	}
	else{
		simsubscreennum=8;
		document.getElementById('nextButton').style.visibility="visible";
	}
	
}
function generateQuestion(qObject,qn,op1,op2,op3,op4,op5,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";											
	document.getElementById('question-div').style.top=dright+"px";												
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions(op1,op2,op3,op4,op5);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);	
	qObject.setCallBack(fn);	
}

function step_9a()
{
	$("#chartContainer").ejChart(
        {
		    //Initializing Primary X Axis	
		    primaryXAxis:
            {
			   labelFormat: "{value}",
                title: { text: 'Head(m)' },
                range: { min: 0, max: 30, interval: 5 } 
            },	
			
			//Initializing Primary Y Axis	
            primaryYAxis:
            {
                labelFormat: "{value}",
                title: { text: 'Actual Discharge(Cumecs)' },
                range: { min: 5.0, max: 6.00, interval: 0.100 }
            },	
			
			//Initializing Common Properties for all the series
           
            //Initializing Series				
            series: 
			[
			    {
                points: [
				{ x: values[0][4], y: values[0][10]},
				{ x: values[1][4], y: values[1][10]},
				{ x: values[2][4], y: values[2][10]},
				{ x: values[3][4], y: values[3][10]},
				{ x: values[4][4], y: values[4][10]},
				{ x: values[5][4], y: values[5][10]},
				{ x: values[6][4], y: values[6][10]},
				{ x: values[7][4], y: values[7][10]}
				
				],
				type: 'line',
					fill: "#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
					enableAnimation :true
                }
			],
             load:"loadTheme",
			isResponsive: true,
			
			legend:{visible:false}
        });
}

function step_9b()
{
	$("#chartContainer").ejChart(
        {
		    //Initializing Primary X Axis	
		    primaryXAxis:
            {
			   labelFormat: "{value}",
                title: { text: 'Head(m)' },
                range: { min: 0, max: 30, interval: 5 } 
            },	
			
			//Initializing Primary Y Axis	
            primaryYAxis:
            {
                labelFormat: "{value}",
                title: { text: 'Over All Efficiency(%)' },
                range: { min: 0, max: 25, interval: 5 }
            },	
			
			//Initializing Common Properties for all the series
           
            //Initializing Series				
            series: 
			[
			    {
                points: [
				{ x: values[0][4], y: values[0][18]},
				{ x: values[1][4], y: values[1][18]},
				{ x: values[2][4], y: values[2][18]},
				{ x: values[3][4], y: values[3][18]},
				{ x: values[4][4], y: values[4][18]},
				{ x: values[5][4], y: values[5][18]},
				{ x: values[6][4], y: values[6][18]},
				{ x: values[7][4], y: values[7][18]}
				
				],
				type: 'line',
					fill: "#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
					enableAnimation :true
                }
			],
             load:"loadTheme",
			isResponsive: true,
			
			legend:{visible:false}
        });
}

function step_9c()
{
	$("#chartContainer").ejChart(
        {
		    //Initializing Primary X Axis	
		    primaryXAxis:
            {
			   labelFormat: "{value}",
                title: { text: 'Head(m)' },
                range: { min: 0, max: 30, interval: 5 } 
            },	
			
			//Initializing Primary Y Axis	
            primaryYAxis:
            {
                labelFormat: "{value}",
                title: { text: 'Input Power(W)' },
                range: { min: 200, max: 600, interval: 100 }
            },	
			
			//Initializing Common Properties for all the series
           
            //Initializing Series				
            series: 
			[
			    {
                points: [
				{ x: values[0][4], y: values[0][12]},
				{ x: values[1][4], y: values[1][12]},
				{ x: values[2][4], y: values[2][12]},
				{ x: values[3][4], y: values[3][12]},
				{ x: values[4][4], y: values[4][12]},
				{ x: values[5][4], y: values[5][12]},
				{ x: values[6][4], y: values[6][12]},
				{ x: values[7][4], y: values[7][12]}
				
				],
				type: 'line',
					fill: "#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
					enableAnimation :true
                }
			],
             load:"loadTheme",
			isResponsive: true,
			
			legend:{visible:false}
        });
}


function refresh1()
{
	
	document.getElementById("step2handle").style.transformOrigin = "";
	document.getElementById("step2handle").style.animation = "";
	document.getElementById('step3text1').innerHTML="Speed of the motor (N<sub>m</sub>) = ";
	document.getElementById('step3text2').innerHTML="Speed of the pump (N<sub>p</sub>) = ";
		
	document.getElementById("needle1").style.transformOrigin = "";
	document.getElementById("needle1").style.WebkitTransform = ""; 
	document.getElementById("needle1").style.animation = "";
	document.getElementById('step3text3').innerHTML="Delivery head (H<sub>d</sub>)=";
	document.getElementById('step3text4').innerHTML="Delivery head (H<sub>d</sub>)=";
		
	document.getElementById("needle2").style.transformOrigin = "";
	document.getElementById("needle2").style.WebkitTransform = "";  
	document.getElementById("needle2").style.animation = "";
		
	document.getElementById('step4text1').innerHTML="Suction head (H<sub>s</sub>)= ";
	document.getElementById('step4text2').innerHTML="Suction head (H<sub>s</sub>)=";
		
	document.getElementById('can-4').style.transformOrigin = "";
	document.getElementById('can-4').style.animation = "";
		
	document.getElementById("needle3").style.transformOrigin = "50% 56%";
	
	document.getElementById("needle3").style.animation = "";
		
	document.getElementById("bparm").style.animation = ""; 
		
	document.getElementById('step5text1').innerHTML="Torque reading(&tau;) = ";
	document.getElementById('step5text2').innerHTML="Spring balance reading (S) = ";
	document.getElementById("rothead2").style.transformOrigin = "";
	
	document.getElementById("rothead2").style.animation = "";
	document.getElementById("stopwatchndl").style.transformOrigin = "50% 90%";
	
	document.getElementById("stopwatchndl").style.animation = "";
		
	document.getElementById("mtubeblue").style.animation = "";  
	
	
	document.getElementById('step6text2').innerHTML="Actual discharge, Q<sub>act</sub> = ";
	document.getElementById('step6text3').innerHTML="Time required by water to fill 10 cm height (t<sub>1</sub>) =";	
		
	document.getElementById("ndl7").style.animation = "";	
	document.getElementById('step7text1').innerHTML="Time taken by energy meter for 5 revolution (t<sub>2</sub>) = ";
		
	document.getElementById('step8text1').innerHTML="Motor input = ";
	document.getElementById('step8text2').innerHTML="Pump output = ";
	document.getElementById('step8text3').innerHTML="Theoretical discharge, Q<sub>th</sub> = ";
	document.getElementById('step8text4').innerHTML="Percentage slip = ";
	document.getElementById('step8text5').innerHTML="Motor output = ";
	document.getElementById('step8text6').innerHTML="Efficiency of motor = ";
	document.getElementById('step8text7').innerHTML="Efficiency of pump = ";
	document.getElementById('step8text8').innerHTML="Overall efficiency = ";
	document.getElementById('nextButton').style.visibility="hidden";
}


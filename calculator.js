var shipTypes = [
	 [5,1,2,2,0],
	 [10,2,4,2,0],
	 [30,3,10,4,0],
	 [60,5,12,4,1],
	 [20,1,4,4,0],
	 [30,1,2,2,0],
	 [40,3,8,8,0],
	 [80,2,12,12,0],
	 [120,5,14,12,1],
	 [40,1,1,2,0],
	 [100,1,2,4,0],
	 [200,3,24,24,2],
	 [400,2,12,24,2],
	 [500,3,48,48,4],
	 [2000,5,168,128,10],
	 [2500,5,64,96,8],
	 [10000,6,756,512,20],
	 [50000,7,3402,2048,30],
	 [200000,6,10000,6600,40],
	 [500000,7,25500,13500,60],
	 [0,1,4,4,0],
	 [0,1,8,8,0],
	 [0,2,16,16,0],
	 [0,3,24,24,0],
	 [0,5,32,32,2],
	 [0,6,64,64,6],
	 [0,7,256,256,8],
	 [0,5,2,512,16],
	 [0,5,4,2048,20],
	 [0,6,2048,1024,12]
];
var shipNames = new Array();
shipNames['Fighters'] = 0;
shipNames['Bombers'] = 1;
shipNames['Heavy Bombers'] = 2;
shipNames['Ion Bombers'] = 3;
shipNames['Corvette'] = 4;
shipNames['Recycler'] = 5;
shipNames['Destroyer'] = 6;
shipNames['Frigate'] = 7;
shipNames['Ion Frigate'] = 8;
shipNames['Scout Ship'] = 9;
shipNames['Outpost Ship'] = 10;
shipNames['Cruiser'] = 11;
shipNames['Carrier'] = 12;
shipNames['Heavy Cruiser'] = 13;
shipNames['Battleship'] = 14;
shipNames['Fleet Carrier'] = 15;
shipNames['Dreadnought'] = 16;
shipNames['Titan'] = 17;
shipNames['Leviathan'] = 18;
shipNames['Death Star'] = 19;
shipNames['Barracks'] = 20;
shipNames['Laser Turrets'] = 21;
shipNames['Missile Turrets'] = 22;
shipNames['Plasma Turrets'] = 23;
shipNames['Ion Turrets'] = 24;
shipNames['Photon Turrets'] = 25;
shipNames['Disruptor Turrets'] = 26;
shipNames['Deflection Shields'] = 27;
shipNames['Planetary Shield'] = 28;
shipNames['Planetary Ring'] = 29;

var numShipTypes = shipTypes.length;
var totalArmor = 0;
var shipArmor = new Array(numShipTypes);
var reg_float = /^[0-9]*.?[0-9]+$/;
var reg_int = /^\d*$/;

function initAtkArmor() {
  totalArmor = 0;
  for (j=0; j<numShipTypes; j++) {
    shipArmor[j] = $("#qt_1"+j).val() * $("#ar_1"+j).text();
    totalArmor += shipArmor[j];
  }
}
function initDefArmor() {
  totalArmor = 0;
  for (j=0; j<numShipTypes; j++) {
    shipArmor[j] = $("#qt_2"+j).val() * $("#ar_2"+j).val();
    totalArmor += shipArmor[j];
  }
}
function battleResult(i) {
  var losses = 0;
  var repair = 0;
  for (var j = 0; j < numShipTypes; j++) {
    if ($("#qt_"+i+j).val() && shipTypes[j][0]) {
      losses += Math.round($("#qt_"+i+j).val() - Math.ceil($("#rs_"+i+j).text())) * shipTypes[j][0];
    }
    if ($("#qt_"+i+j).val()) {
      repair += Math.round($("#rs_"+i+j).text() - Math.floor($("#rs_"+i+j).text())) * shipTypes[j][0]
    }
  }
  var debris = Math.round(losses * $("#l_"+i+"0").val() *0.02);
  return [losses, debris, repair];
}
function rslAtk() {
  for (var j = 0; j < numShipTypes; j++) {
		var accu;
		if (j > 13)
			accu = 100;
		else if (j > 10)
			accu = 10;
		else
			accu = 1;
		
    $("#rs_1"+j).text(Math.round(shipArmor[j] / $("#ar_1"+j).text() * accu) / accu);
    if ($("#qt_1"+j).val() != 0) {
      if ($("#rs_1"+j).text() == 0) {
        $("#rs_1"+j).css("color","red");
      } else {
        $("#rs_1"+j).css("color","white");
      }
    } else {
      $("#rs_1"+j).css("color","#212121");
    }
  }
}
function rslDef() {
  for (var j = 0; j < numShipTypes; j++) {
		var accu;
		if (j > 13)
			accu = 100;
		else if (j > 10)
			accu = 10;
		else
			accu = 1;
		
    $("#rs_2"+j).text(Math.round(shipArmor[j] / $("#ar_2"+j).val() * accu) / accu);
    if ($("#qt_2"+j).val() != 0) {
      if ($("#rs_2"+j).text() == 0) {
        $("#rs_2"+j).css("color","red");
      } else {
        $("#rs_2"+j).css("color","white");
      }
    } else {
      $("#rs_2"+j).css("color","#212121");
    }
  }
}
function dgtAtk(j,ion) {
  var attack_qty = parseFloat($("#qt_1"+j).val());
  var attack_pwr = parseFloat($("#pw_1"+j).text());
  var ship_damage = new Array(numShipTypes);
  if (attack_qty != 0) {
    for (var i=0; i<numShipTypes; i++) {
      if ($("#qt_2"+i).val() != 0) {
        if ($("#sh_2"+i).val()) {
          if ($("#sh_2"+i).val() > attack_pwr) {
             ship_damage[i] = attack_pwr * ion;
          } else {
             ship_damage[i] = attack_pwr - $('#sh_2'+i).val() * (1-ion);
          }
        } else {
          ship_damage[i] = attack_pwr;
        }
      } else {
        ship_damage[i] = 0;
      }
    }
    var catt = attack_qty
    for (var repeat = 0; repeat < 4; repeat++) {
      if (totalArmor > 0) {
        totalArmor = 0;
        var ship_damage_u = new Array(numShipTypes);
        var total_damage = 0;
        for (var i=0; i<numShipTypes; i++) {
          total_damage += ship_damage[i];
        }
        for (var i=0; i<numShipTypes; i++) {
          ship_damage_u[i] = 0;
          if (ship_damage[i] != 0 || $("#qt_2"+j).val() != 0) {
            if (j < 20 || repeat == 0)
              ship_damage_u[i] = (ship_damage[i] * catt) / total_damage;
            else
              ship_damage_u[i] = catt/cn;
          }
          shipArmor[i] -= ship_damage_u[i] * ship_damage[i];
          totalArmor += shipArmor[i];
        }
        var ship_carry = new Array(numShipTypes);
        for (var i=0; i<numShipTypes; i++) {
          if (shipArmor[i] < 0) {
            ship_carry[i] = ((ship_damage[i] * ship_damage_u[i]) + shipArmor[i]) / ship_damage[i];
          } else {
            ship_carry[i] = ship_damage_u[i];
          }
        }
        var cn = 0;
        totalArmor = 0;
        for (var i = 0; i < numShipTypes; i++) {
          catt -= ship_carry[i]
          if (shipArmor[i] > 0) {
            cn++;
          }
          if (shipArmor[i] < 0) {
            ship_damage[i] = 0;
            ship_carry[i] = 0;
            shipArmor[i] = 0;
          }
          totalArmor += shipArmor[i];
        }
      }
    }
  } else {
    for (var i = 0; i <= numShipTypes; i++) {
      ship_damage[i] = 0;
    }
  }
}
function dgtDef(j,ion) {
  var attack_qty = parseFloat($("#qt_2"+j).val());
  var attack_pwr = parseFloat($("#pw_2"+j).val());
  var ship_damage = new Array(numShipTypes);
  if (attack_qty != 0) {
    for (var i=0; i<numShipTypes; i++) {
      if ($("#qt_1"+i).val() != 0) {
        if ($("#sh_1"+i).text()) {
          if ($("#sh_1"+i).text() > attack_pwr) {
             ship_damage[i] = attack_pwr * ion;
          } else {
             ship_damage[i] = attack_pwr - $('#sh_1'+i).text() * (1-ion);
          }
        } else {
          ship_damage[i] = attack_pwr;
        }
      } else {
        ship_damage[i] = 0;
      }
    }
    var catt = attack_qty
    for (var repeat = 0; repeat < 4; repeat++) {
      if (totalArmor > 0) {
        totalArmor = 0;
        var ship_damage_u = new Array(numShipTypes);
        var total_damage = 0;
        for (var i=0; i<numShipTypes; i++) {
          total_damage += ship_damage[i];
        }
        for (var i=0; i<numShipTypes; i++) {
          ship_damage_u[i] = 0;
          if (ship_damage[i] != 0 || $("#qt_1"+j).val() != 0) {
            if (j < 20 || repeat == 0)
              ship_damage_u[i] = (ship_damage[i] * catt) / total_damage;
            else
              ship_damage_u[i] = catt/cn;
          }
          shipArmor[i] -= ship_damage_u[i] * ship_damage[i];
          totalArmor += shipArmor[i];
        }
        var ship_carry = new Array(numShipTypes);
        for (var i=0; i<numShipTypes; i++) {
          if (shipArmor[i] < 0) {
            ship_carry[i] = ((ship_damage[i] * ship_damage_u[i]) + shipArmor[i]) / ship_damage[i];
          } else {
            ship_carry[i] = ship_damage_u[i];
          }
        }
        var cn = 0;
        totalArmor = 0;
        for (var i = 0; i < numShipTypes; i++) {
          catt -= ship_carry[i]
          if (shipArmor[i] > 0) {
            cn++;
          }
          if (shipArmor[i] < 0) {
            ship_damage[i] = 0;
            ship_carry[i] = 0;
            shipArmor[i] = 0;
          }
          totalArmor += shipArmor[i];
        }
      }
    }
  } else {
    for (var i = 0; i <= numShipTypes; i++) {
      ship_damage[i] = 0;
    }
  }
}
function simulateCombat() {
    initAtkArmor();
    for (var i = 0; i < numShipTypes; i++) {
      if (i==3 || i==8)
        dgtDef(i,0.5);
      else
        dgtDef(i,0.01);
    }
    rslAtk();
    initDefArmor();
    for (var i = 0; i < numShipTypes; i++) {
      if (i==3 || i==8)
        dgtAtk(i,0.5);
      else
        dgtAtk(i,0.01);
    }
    rslDef();
}
function simulate() {
  simulateCombat();
  var rslt1 = battleResult(1);
  $("#loss_1").text(rslt1[0]);
  var rslt2 = battleResult(2);
  $("#loss_2").text(rslt2[0]);
  $("#debris").text(rslt1[1]+rslt2[1]);
  $("#repair").text(rslt1[2]);
  $("#totald").text(rslt1[0]+rslt2[0]);
  var oldprofit = document.getElementById('profit').textContent;
  $('#profit').text( (rslt1[1]+rslt2[1]) - (rslt1[0] + rslt1[2]));
  $('#profit_delta').text( document.getElementById('profit').textContent - oldprofit);
}
function calcAtkStat() {
  var bonus = ($("#qt_119").val() != 0) ? 1.1 : ($("#qt_118").val() != 0) ? 1.05 : 1;
  var center,defense,tactical;
  for (var j=0; j<numShipTypes; j++) {
    if (j < 20) {
      center = 1+parseInt($("#b_18").text())*0.01;
      defense = 0;
      tactical = parseInt($("#b_110").text());
    } else {
      center = 1
      defense = parseInt($("#b_19").text());
      tactical = 0;
    }
    $("#pw_1"+j).text(Math.round(shipTypes[j][2]*bonus*(1+(defense+tactical+parseInt($("#b_1"+shipTypes[j][1]).text()))*0.01) * center *10)/10);
    $("#ar_1"+j).text(Math.round(shipTypes[j][3]*bonus*(1+(defense+parseInt($("#b_10").text()))*0.01)*10)/10);
    var sh = shipTypes[j][4];
		$("#sh_1"+j).text(Math.round(sh*(1+0.01*$("#b_14").text())*10)/10);
    if (sh == 0) {
      $("#sh_1"+j).css("color","#212121");
    }
  }
}
function calcDefStat() {
  var bonus = ($("#qt_219").val() != 0) ? 1.1 : ($("#qt_218").val() != 0) ? 1.05 : 1;
  var center,defense,tactical;
  for (var j=0; j<numShipTypes; j++) {
    if (j < 20) {
      center = 1+parseInt($("#b_28").text())*0.01;
      defense = 0;
      tactical = parseInt($("#b_210").text());
    } else {
      center = 1
      defense = parseInt($("#b_29").text());
      tactical = 0;
    }
    $("#pw_2"+j).val(Math.round(shipTypes[j][2]*bonus*(1+(defense+tactical+parseInt($("#b_2"+shipTypes[j][1]).text()))*0.01) * center *10)/10);
    $("#ar_2"+j).val(Math.round(shipTypes[j][3]*bonus*(1+(defense+parseInt($("#b_20").text()))*0.01)*10)/10);
    var sh = shipTypes[j][4];
    if ($("#sh_2"+j))
			$("#sh_2"+j).val(Math.round(sh*(1+0.01*$("#b_24").text())*10)/10);
  }
}
function calcTech(j) {
  for (var i=0; i<9; i++) {
    $("#b_"+j+i).text(5*$("#l_"+j+i).val());
  }
  $("#b_"+j+"9").text($("#l_"+j+"9").val());
  $("#b_"+j+"10").text($("#l_"+j+"10").val());
}
function pasteData() {
  $('input').each(function (i) {
    $(this).val(0);
    if ($(this).hasClass('qt_1') || $(this).hasClass('qt_2')) {
      $(this).css("color","#3B3B3B");
    }
  });
  var data = $('#input_past_data').val();
  data = data.split('\n');
  var atkforce = 0;
  var defforce = 0;
  for (var i=0; i<data.length; i++) {
    if (data[i] == "Attack Force")
      atkforce++;
    if (data[i] == "Defensive Force")
      defforce++;
    if ((atkforce == 1) && (defforce == 0) && (data[i].indexOf('Commander', 0) != -1)) {
      if (data[i].indexOf('Defense', 0) != -1)
        $('#l_19').val(data[i].substring(data[i].indexOf('(Defense ', 0)+9, data[i].length-1));
      else if (data[i].indexOf('Tactical', 0) != -1)
        $('#l_110').val(data[i].substring(data[i].indexOf('(Tactical ', 0)+10, data[i].length-1));
      continue;
    }

    if ((atkforce == 1) && (defforce == 1) && (data[i].indexOf('Command Centers', 0) != -1)) {
      $('#l_28').val(data[i].substring(16, data[i].length));
      continue;
    }
    if ((atkforce == 1) && (defforce == 1) && (data[i].indexOf('Commander', 0) != -1)) {
      if (data[i].indexOf('Defense', 0) != -1)
        $('#l_29').val(data[i].substring(data[i].indexOf('(Defense ', 0)+9, data[i].length-1));
      else if (data[i].indexOf('Tactical', 0) != -1)
        $('#l_210').val(data[i].substring(data[i].indexOf('(Tactical ', 0)+10, data[i].length-1));
      continue;
    }

    if ((atkforce == 2) && (defforce == 1)) {
      var ship = data[i].substring(0, data[i].indexOf('\t', 0));
      var shipName = shipNames[ship];
      if (shipName != null) {
        shipDetails = data[i].split('\t');
        $('#qt_1'+shipName).val(shipDetails[1]);
        $('#qt_1'+shipName).css("color","white");
        $('#pw_1'+shipName).text(shipDetails[3]);
        $('#ar_1'+shipName).text(shipDetails[4]);
        $('#sh_1'+shipName).text(shipDetails[5]);
        
        var center,defense,tactical;
        if (shipName < 20) {
          center = 1+parseInt($("#b_18").text())*0.01;
          defense = 0;
          tactical = parseInt($("#b_110").text());
        } else {
          center = 1
          defense = parseInt($("#b_19").text());
          tactical = 0;
        }

        if ($('#l_1'+shipTypes[shipName][1]).val() == 0)
          $('#l_1'+shipTypes[shipName][1]).val(Math.round((shipDetails[3]*center-shipTypes[shipName][2]*(1-tactical-defense)) * 20 / shipTypes[shipName][2]));
        if ($('#l_10').val() == 0)
          $('#l_10').val(Math.round((shipDetails[4]-shipTypes[shipName][3]*(1-defense)) * 20 / shipTypes[shipName][3]));
        if (($('#l_14').val() == 0) && (shipDetails[5] != 0))
          $('#l_14').val(Math.round((shipDetails[5]-shipTypes[shipName][4]) * 20 / shipTypes[shipName][4]));
      }
      continue;
    }
    if ((atkforce == 2) && (defforce == 2)) {
      var ship = data[i].substring(0, data[i].indexOf('\t', 0));
      var shipName = shipNames[ship];
      if (shipName != null) {
        shipDetails = data[i].split('\t');
        $('#qt_2'+shipName).val(shipDetails[1]);
        $('#qt_2'+shipName).css("color","white");
        $('#pw_2'+shipName).val(shipDetails[3]);
        $('#ar_2'+shipName).val(shipDetails[4]);
        $('#sh_2'+shipName).val(shipDetails[5]);

        var center,defense,tactical;
        if (shipName < 20) {
          center = 1+parseInt($("#l_28").val())*0.05;
          defense = 0;
          tactical = parseInt($("#l_210").val())/5;
        } else {
          center = 1
          defense = parseInt($("#l_29").val())/5;
          tactical = 0;
        }
        var bonus = ($("#qt_219").val() != 0) ? 1.1 : ($("#qt_218").val() != 0) ? 1.05 : 1;

        if ($('#l_2'+shipTypes[shipName][1]).val() == 0)
          $('#l_2'+shipTypes[shipName][1]).val(Math.round((((shipDetails[3] / bonus / center) /  shipTypes[shipName][3]) - 1) * 20 - defense - tactical));
        if ($('#l_20').val() == 0)
          $('#l_20').val(Math.round((shipDetails[4]-shipTypes[shipName][3]) * 20 / shipTypes[shipName][3]));
        if (($('#l_24').val() == 0) && (shipDetails[5] != 0))
          $('#l_24').val(Math.round((shipDetails[5]-shipTypes[shipName][4]) * 20 / shipTypes[shipName][4]));
      }
      continue;
    }
  }
  calcTech(1);
  calcAtkStat();
  calcTech(2);
  calcDefStat();
  simulate();
  $.facebox.close();
  $(".container").fadeIn(500);
}
function initCalc() {
  $("input").each(function (i) {
    if (!reg_float.test($(this).val())) {
      $(this).val(0);
    }
    if ($(this).val() != 0) {
      $(this).css("color","white");
    }
  });
  calcTech(1);
  calcAtkStat();
  calcTech(2);
  calcDefStat();
}
function initLinks() {
  $("#your_tech").bind("click", function(e) {
    $("#yourtech").fadeOut(300, function () {
      $('.tech_1').each(function (i) {
        $(this).val(0);
      });
      calcTech(1);
      calcAtkStat();
      simulate();
      $("#yourtech").fadeIn(300);
    });
  });
  $("#enem_tech").bind("click", function(e) {
    $("#enemtech").fadeOut(300, function () {
      $('.tech_2').each(function (i) {
        $(this).val(0);
      });
      calcTech(2);
      calcDefStat();
      simulate();
      $("#enemtech").fadeIn(300);
    });
  });
  $("#atk_fleet").bind("click", function(e) {
    $("#atkfleet").fadeOut(300, function () {
      $('.qt_1').each(function (i) {
        $(this).val(0);
        $(this).css("color","#3B3B3B");
      });
      simulate();
      $("#atkfleet").fadeIn(300);
    });
  });
  $("#def_fleet").bind("click", function(e) {
    $("#deffleet").fadeOut(300, function () {
      $('.qt_2').each(function (i) {
        $(this).val(0);
        $(this).css("color","#3B3B3B");
      });
      simulate();
      $("#deffleet").fadeIn(300);
    });
  });
  $("#reset_all").bind("click", function(e) {
    $(".container").fadeOut(500, function () {
      $('input').each(function (i) {
        $(this).val(0);
        if ($(this).hasClass('qt_1') || $(this).hasClass('qt_2')) {
          $(this).css("color","#3B3B3B");
        }
      });
      calcTech(1);
      calcAtkStat();
      calcTech(2);
      calcDefStat();
      simulate();
      $(".container").fadeIn(500);
    });
  });
  $("#save_tech").bind("click", function(e) {
    var techarray = '';
    $('.tech_1').each(function (i) {
      if (i != 8)
        techarray += $(this).attr('name')+'='+$(this).val()+'&';
      else
        techarray += 'type=save';
    });
    $.facebox({ajax:'ajax/calculator.php?'+techarray});
  });
  $("#load_tech").bind("click", function(e) {
    $.getScript("ajax/calculator.php?type=load", function(){
      $('.tech_1').each(function (i) {
        if (i != 8)
          $(this).val(techarray[i]);
      });
      calcTech(1);
      calcAtkStat();
      $.facebox('Tech. Loaded');
    });
  });
  $("#seek_tech").bind("click", function(e) {
    $.facebox('Not Yet Implemented.');
  });
  $("#past_data").bind("click", function(e) {
    $(".container").fadeOut(500, function () {
      $.facebox({ajax:'ajax/calculator.php?type=past'});
    });
  });
  $("#s_to_e").bind("click", function(e) {
		$('.qt_1').each(function (i) {
			$(this).val($('#rs_1'+i).text());
			if ($(this).val() == 0) {
				$(this).css("color","#3B3B3B");
			}
		});
		$('.qt_2').each(function (i) {
			$(this).val($('#rs_2'+i).text());
			if ($(this).val() == 0) {
				$(this).css("color","#3B3B3B");
			}
		});
		simulate();
  });
}

$(document).ready(function() {
  initLinks();
  initCalc();
  simulate();
  
  $(".qt_1").bind("change", function(e) {
    if(!reg_float.test($(this).val())){
      $(this).val(0);
    }
    if ($(this).val() != 0) {
      $(this).css("color","white");
    } else {
      $(this).css("color","#3B3B3B");
    }
    if (($(this).attr('name') == 18) || ($(this).attr('name') == 19)) {
      calcAtkStat();
    }
    simulate();
  });
  $(".qt_2").bind("change", function(e) {
    if(!reg_float.test($(this).val())){
      $(this).val(0);
    }
    if ($(this).val() != 0) {
      $(this).css("color","white");
    } else {
      $(this).css("color","#3B3B3B");
    }
    if (($(this).attr('name') == 18) || ($(this).attr('name') == 19)) {
      calcDefStat();
    }
    simulate();
  });
  $(".tech_1").bind("change", function(e) {
    if(!reg_int.test($(this).val())){
      $(this).val(0);
    }
    $("#b_1"+$(this).attr('name')).text(5*$(this).val());
    calcAtkStat();
    simulate();
  });
  $(".tech_2").bind("change", function(e) {
    if(!reg_int.test($(this).val())){
      $(this).val(0);
    }
    $("#b_2"+$(this).attr('name')).text(5*$(this).val());
    calcDefStat();
    simulate();
  });
  $(".cmd_1").bind("change", function(e) {
    if(!reg_int.test($(this).val())){
      $(this).val(0);
    }
    $("#b_1"+$(this).attr('name')).text($(this).val());
    calcAtkStat();
    simulate();
  });
  $(".cmd_2").bind("change", function(e) {
    if(!reg_int.test($(this).val())){
      $(this).val(0);
    }
    $("#b_2"+$(this).attr('name')).text($(this).val());
    calcDefStat();
    simulate();
  });
  $(".pw_2").bind("change", function(e) {
		var center,defense,tactical;
    var ship = $(this).attr('name');
		if (ship < 20) {
			center = 1+parseInt($("#b_28").text())*0.01;
			defense = 0;
			tactical = parseInt($("#l_210").val())/5;
		} else {
			center = 1
			defense = parseInt($("#l_29").val())/5;
			tactical = 0;
		}
		var bonus = ($("#qt_219").val() != 0) ? 1.1 : ($("#qt_218").val() != 0) ? 1.05 : 1;
    if($(this).val() < shipTypes[ship][2] * bonus * center * Math.round(10*(1+tactical/20))/10 * Math.round(10*(1+defense/20))/10){
      $(this).val(shipTypes[ship][2] * bonus * center * Math.round(10*(1+tactical/20))/10 * Math.round(10*(1+defense/20))/10);
    }
    $('#l_2'+shipTypes[ship][1]).val(Math.round(((($(this).val() / bonus / center) /  shipTypes[ship][2]) - 1) * 20 - defense - tactical));
    calcTech(2);
    calcDefStat();
    simulate();
  });
  $(".ar_2").bind("change", function(e) {
    var ship = $(this).attr('name');
		var bonus = ($("#qt_219").val() != 0) ? 1.1 : ($("#qt_218").val() != 0) ? 1.05 : 1;
    if($(this).val() < shipTypes[ship][3] * bonus){
      $(this).val(shipTypes[ship][3] * bonus);
    }
    $('#l_20').val(Math.round(((($(this).val() / bonus) /  shipTypes[ship][3]) - 1) * 20));
    calcTech(2);
    calcDefStat();
    simulate();
  });
  $(".sh_2").bind("change", function(e) {
    var ship = $(this).attr('name');
    if($(this).val() < shipTypes[ship][4]){
      $(this).val(shipTypes[ship][4]);
    }
    $('#l_24').val(Math.round(($(this).val() /  shipTypes[ship][4] - 1) * 20));
    calcTech(2);
    calcDefStat();
    simulate();
  });
});

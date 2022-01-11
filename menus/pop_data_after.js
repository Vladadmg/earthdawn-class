

// ******************** MENU EFFECTS ********************
//
// Now you've created a basic menu object, you can add optional effects like borders and
// shadows to specific menus. You can remove this section entirely if you want, the
// functions called are found at the bottom of this file.



// BORDER: Added to all menus in a named object using a specified ItemStyle. The syntax is:
//  addMenuBorder(menuObject, ItemStyle,
//   opacity of border, 'border colour', border width, 'padding colour', padding width);
// Opacity is a number from 0 to 100, or null for solid colour (just like the ItemStyles).

addMenuBorder(pMenu, window.subBlank,
 null, '#666666', 1, '#CCCCDD', 2);



// DROPSHADOW: added to specific ItemStyles again. The syntax is similar, but later on you
// pass arrays [...] for each layer of the shadow you want. I've used two grey layers
// here, but you can use as many or as few as you want. The syntax for the layers is:
//  [opacity, 'layer colour', X offset, Y offset, Width Difference, Height difference]
// Opacity is from 0 to 100 (or null to make it solid), and the X/Y offsets are the
// distance in pixels from the menu's top left corner to that shadow layer's corner.
// The width/height differences are added or subtracted to the current menu size, for
// instance the first layer of this shadow is 4px narrower and shorter than the menu
// it is shadowing.

addDropShadow(pMenu, window.subM,
 [40,"#333333",6,6,-4,-4], [40,"#666666",4,4,0,0]);
addDropShadow(pMenu, window.subBlank,
 [40,"#333333",6,6,-4,-4], [40,"#666666",4,4,0,0]);



// ANIMATION SETTING: We add this to the 'pMenu' menu object for supported browsers.
// IE4/Mac and Opera 5/6 don't support clipping, and Mozilla versions prior to 1.x (such as
// Netscape 6) are too slow to support it, so I'm doing some browser sniffing.
// If you don't want animation, delete this entirely, and the menus will act normally.
// Change the speed if you want... it's the last number, between -100 and 100, and is
// defined as the percentage the animation moves each frame (defaults are 10 and 15).

if ((navigator.userAgent.indexOf('rv:0.')==-1) &&
    !(isOp&&!document.documentElement) && !(isIE4&&!window.external))
{
 pMenu.showMenu = new Function('mN','menuAnim(this, mN, 10)');
 pMenu.hideMenu = new Function('mN','menuAnim(this, mN, -15)');

 // Add animation to other menu objects like this...
 //anotherMenu.showMenu = new Function('mN','menuAnim(this, mN, 10)');
 //anotherMenu.hideMenu = new Function('mN','menuAnim(this, mN, -15)');
}







// ******************** FUNCTIONS CALLED BY THE EFFECTS SECTION ********************

// These can be deleted if you're not using them. Alternatively, if you're using several menu
// data files, you may want to move them to the "core" script file instead.



// This is the "positioning from page anchors" code used by the advanced positioning expressions.
page.elmPos=function(e,p)
{
 var x=0,y=0,w=p?p:this.win;
 e=e?(e.substr?(isNS4?w.document.anchors[e]:getRef(e,w)):e):p;
 if(isNS4){if(e&&(e!=p)){x=e.x;y=e.y};if(p){x+=p.pageX;y+=p.pageY}}
 if (e && this.MS && navigator.platform.indexOf('Mac')>-1 && e.tagName=='A')
 {
  e.onfocus = new Function('with(event){self.tmpX=clientX-offsetX;' +
   'self.tmpY=clientY-offsetY}');
  e.focus();x=tmpX;y=tmpY;e.blur()
 }
 else while(e){x+=e.offsetLeft;y+=e.offsetTop;e=e.offsetParent}
 return{x:x,y:y};
};




// Animation:
//
// Each menu object you create by default shows and hides its menus instantaneously.
// However you can override this behaviour with custom show/hide animation routines,
// as we have done in the "Menu Effects" section. Feel free to edit this, or delete
// this entire function if you're not using it. Basically, make functions to handle
// menuObj.showAnim() and .hideAnim(), both of which are passed menu names.
//
// Customisers: My lyr.clip() command gets passed the parameters (x1, y1, x2, y2)
// so you might want to adjust the direction etc. Oh, and I'm adding 2 to the dimensions
// to be safe due to different box models in some browsers.
// Another idea: add some if/thens to test for specific menu names...?

function menuAnim(menuObj, menuName, dir)
{
 // The array index of the named menu (e.g. 'mFile') in the menu object (e.g. 'pMenu').
 var mD = menuObj.menu[menuName][0];
 // Add timer and counter variables to the menu data structure, we'll need them.
 if (!mD.timer) mD.timer = 0;
 if (!mD.counter) mD.counter = 0;

 with (mD)
 {
  // Stop any existing animation.
  clearTimeout(timer);

  // If the litNow() array doesn't show this menu as lit, and we're still showing it,
  // force a quick hide (this stops miscellaneous timer errors).
  //if (dir>0 && !menuObj.litNow[menuObj.menu[menuName][0].parentMenu]) dir = -100;

  // If the layer doesn't exist (cross-frame navigation) quit.
  if (!lyr || !lyr.ref) return;
  // This next line is not strictly necessary, but it stops the one-in-a-hundred menu that
  // shows and doesn't hide on very quick mouseovers.
  if (!visNow && dir>0) dir = 0-dir;
  // Show the menu if that's what we're doing.
  if (dir>0) lyr.vis('visible');
  // Also raise showing layers above hiding ones.
  lyr.sty.zIndex = dir>0 ? mD.zIndex + 1 : 1001;

  // Alpha fade in IE5.5+. Mozilla's opacity (pre-v1.7) isn't well suited as it's an inheritable
  // property rather than a block-level filter, and it's slow, but uncomment and try it perhaps.
  // WARNING: This looks funny if you're mixing opaque and translucent items e.g. solid menus
  // with dropshadows. If you're going to use it, either disable dropshadows or set the opacity
  // values for your items to numbers instead of null.
  //if (isIE && window.createPopup) lyr.alpha(counter&&(counter<100) ? counter : null);

  // Clip the visible area. The syntax is:   lyr.clip(left, top, right, bottom);
  // As you can see in these examples, three are static at either zero or the edge of a menu item,
  // and either the top or bottom is a complicated formula based on the 'counter' variable which
  // counts from 0 to 100 and back again; this give a nice accelerating-sliding animation.
  // Feel free to experiment with your own animations, here are some samples (use one only):

  // Straightforward downwards clipping animation (default setting):
  lyr.clip(0, 0, menuW+2, (menuH+2)*Math.pow(Math.sin(Math.PI*counter/200),0.75) );
  // If you want, comment out the above line and enable this one to animate bottom-upwards:
  //lyr.clip(0, (menuH+2)-(menuH+2)*Math.pow(Math.sin(Math.PI*counter/200),0.75), menuW+2, menuH+2);
  // Another alternative: Move+clip sliding animation. Looks really cool :).
  //if (!counter) mD.origY = lyr.y();
  //var newY = (menuH+2)-(menuH+2)*Math.pow(Math.sin(Math.PI*counter/200),0.75);
  //lyr.clip(0, newY, menuW+2, menuH+2);
  //lyr.y(mD.origY - newY);

  // Increment the counter and if it hasn't reached the end (counter is 0% or 100%),
  // set the timer to call the animation function again in 40ms to contine the animation.
  // Note that we hide the menu div on animation end in that direction.
  counter += dir;
  if (counter>100) { counter = 100; lyr.sty.zIndex = mD.zIndex }
  else if (counter<0) { counter = 0; lyr.vis('hidden') }
  else timer = setTimeout('menuAnim('+menuObj.myName+',"'+menuName+'",'+dir+')', 40);
 }
};




// Borders and Dropshadows:
//
// Here's the menu border and dropshadow functions we call above. Edit ot delete if you're
// not using them. Basically, they assign a string to pMenu.menu.menuName[0].extraHTML, which
// is written to the document with the menus as they are created -- the string can contain
// anything you want, really. They also adjust the menu dimensions and item positions
// to suit. Dig out the Object Browser script and open up "pMenu" for more info.

function addMenuBorder(mObj, iS, alpha, bordCol, bordW, backCol, backW)
{
 // Loop through the menu array of that object, finding matching ItemStyles.
 for (var mN in mObj.menu)
 {
  var mR=mObj.menu[mN], dS='<div style="position:absolute; background:';
  if (mR[0].itemSty != iS) continue;
  // Loop through the items in that menu, move them down and to the right a bit.
  for (var mI=1; mI<mR.length; mI++)
  {
   mR[mI].iX += bordW+backW;
   mR[mI].iY += bordW+backW;
  }
  // Extend the total dimensions of menu accordingly.
  mW = mR[0].menuW += 2*(bordW+backW);
  mH = mR[0].menuH += 2*(bordW+backW);

  // Set the menu's extra content string with divs/layers underneath the items.
  if (isNS4) mR[0].extraHTML += '<layer bgcolor="'+bordCol+'" left="0" top="0" width="'+mW+
   '" height="'+mH+'" z-index="980"><layer bgcolor="'+backCol+'" left="'+bordW+'" top="'+
   bordW+'" width="'+(mW-2*bordW)+'" height="'+(mH-2*bordW)+'" z-index="990"></layer></layer>';
  else mR[0].extraHTML += dS+bordCol+'; left:0px; top:0px; width:'+mW+'px; height:'+mH+
   'px; z-index:980; '+
   (alpha!=null?'filter:alpha(opacity='+alpha+'); -moz-opacity:'+alpha+'%; opacity:'+(alpha/100):'')+
   '">'+dS+backCol+'; left:'+bordW+'px; top:'+bordW+'px; width:'+(mW-2*bordW)+'px; height:'+
   (mH-2*bordW)+'px; z-index:990"></div></div>';
 }
};

function addDropShadow(mObj, iS)
{
 // Pretty similar to the one above, just loops through list of extra parameters making
 // dropshadow layers (from arrays) and extending the menu dimensions to suit.
 for (var mN in mObj.menu)
 {
  var a=arguments, mD=mObj.menu[mN][0], addW=addH=0;
  if (mD.itemSty != iS) continue;
  for (var shad=2; shad<a.length; shad++)
  {
   var s = a[shad];
   // Safari 1.2 bug: it inherits alpha values SIDEWAYS!?!? What were they thinking?
   var alpha = (s[0]!=null && navigator.userAgent.indexOf('AppleWebKit') == -1);
   if (isNS4) mD.extraHTML += '<layer bgcolor="'+s[1]+'" left="'+s[2]+'" top="'+s[3]+'" width="'+
    (mD.menuW+s[4])+'" height="'+(mD.menuH+s[5])+'" z-index="'+(arguments.length-shad)+'"></layer>';
   else mD.extraHTML += '<div style="position:absolute; background:'+s[1]+'; left:'+s[2]+
    'px; top:'+s[3]+'px; width:'+(mD.menuW+s[4])+'px; height:'+(mD.menuH+s[5])+'px; -z-index:'+
    (a.length-shad)+'; '+
    (alpha?'filter:alpha(opacity='+s[0]+'); -moz-opacity:'+s[0]+'%; opacity:'+(s[0]/100):'')+
    '"></div>';
   addW=Math.max(addW, s[2]+s[4]);
   addH=Math.max(addH, s[3]+s[5]);
  }
  mD.menuW+=addW; mD.menuH+=addH;
 }
};

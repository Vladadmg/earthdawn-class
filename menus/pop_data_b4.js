// Cascading Popup Menus v5.2 - Single Frame Menu example script.


// If you're upgrading from v5.1, you can paste your existing menu data in, and if you're
// upgrading from v5.0 you need to add 'cursor' settings to your ItemStyles.
//
// And before going ANY further, you must have READ and AGREE TO the script license!
// It can be found on my site, in the syntax helpfile, or in the demo script document.


// 'horizontal Bar' style: menu items that use this ItemStyle are 40px wide, have 10px gaps
// between them, no popout indicator (the ">" in some menus) or popout indicator position,
// 0px padding of the text within items, #336699 background colour, a hover colour of #6699CC,
// 'highText' is the stylesheet class used for the menu text both normally and when highlighted,
// no border styles, 'null' means fully opaque items (set them to numbers between 0 and 100 to
// enable semitranslucency), and the 'hand'/'default' cursors are used for linked/submenu items.
var hBar = new ItemStyle(60, 1, '', 0, 0, '15#646464', '10#6699CC', 'highText', 'highText', '', '',
 null, null, 'hand', 'default');

// The 'sub Menu' items: these have popout indicators of "Greater Than" signs ">" 15px from their
// right edge, and CSS borders. Text class also changes on mouseover.
var subM = new ItemStyle(22, 0, '&gt;', -15, 3, '#CCCCDD', '#6699CC', 'lowText', 'highText',
 'itemBorder', 'itemBorder', null, null, 'hand', 'default');

// 'subBlank' is similar, but has an 'off' border the same colour as its background so it
// appears borderless when dim, and 1px spacing between items to show the hover border.
var subBlank = new ItemStyle(22, 1, '&gt;', -15, 3, '#CCCCDD', '#6699CC', 'lowText', 'highText',
 'itemBorderBlank', 'itemBorder', null, null, 'hand', 'default');

// The purplish 'button' style also has 1px spacing to show up the fancy border, and it has
// different colours/text and less padding. They also have translucency set -- these items
// are 80% opaque when dim and 95% when highlighted. It uses the 'crosshair' cursor for items.
var button = new ItemStyle(22, 1, '&gt;', -15, 2, '10#006633', '10#CC6600', 'buttonText', 'buttonHover',
 'buttonBorder', 'buttonBorderOver', 80, 95, 'crosshair', 'default');

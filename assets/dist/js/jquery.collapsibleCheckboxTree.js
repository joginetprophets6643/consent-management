/**
	Project: Collapsible Checkbox Tree jQuery Plugin
	Version: 1.0.1
	Author: Lewis Jenkins
	Modified: Sean Wallace
	Website: http://www.redcarrot.co.uk/2009/11/11/collapsible-checkbox-tree-jquery-plugin/
    
    License:
        The CheckTree jQuery plugin is currently available for use in all personal or 
        commercial projects under both MIT and GPL licenses. This means that you can choose 
        the license that best suits your project and use it accordingly.
*/
(function($) {
 
	$.fn.collapsibleCheckboxTree = function(options) {
		
		var defaults = {
			checkParents : true, // When checking a box, all parents are checked
			checkChildren : false, // When checking a box, all children are checked
			shiftClickEffectChildren : true, // When shift-clicking a box, all children are checked or unchecked.
			uncheckChildren : true, // When unchecking a box, all children are unchecked
			includeButtons : true, // Include buttons to expand or collapse all above list
			initialState : 'default' // Options - 'expand' (fully expanded), 'collapse' (fully collapsed) or default
		};
			
		var options = $.extend(defaults, options); 
 
		this.each(function() {
						   
			var $root = this;
						   
			// Add button
//			if (defaults.includeButtons) {
//				$(this).before('<button id="expand" class="btn btn-primary mr-1">Expand All</button> <button id="collapse" class="btn btn-primary mr-1">Collapse All</button><button id="default" class="btn btn-primary ">Default</button>');
//			}

			// Hide all except top level
			$("ul", $(this)).addClass('hide');
			// Check parents if necessary
			if (defaults.checkParents) {
				$("input:checked").parents("li").find("input[type='checkbox']:first").attr('checked', true);
			}
			// Check children if necessary
			if (defaults.checkChildren) {
				$("input:checked").parent("li").find("input[type='checkbox']").attr('checked', true);
			}
			// Show checked and immediate children of checked
			$("li:has(input:checked) > ul", $(this)).removeClass('hide');
			// Add tree links
			$("li", $(this)).prepend('<span>&nbsp;</span>');
			$("li:has(> ul:not(.hide)) > span", $(this)).addClass('expanded').html('<i class="fa fa-minus" aria-hidden="true"></i>');
			$("li:has(> ul.hide) > span", $(this)).addClass('collapsed').html('<i class="fa fa-plus" aria-hidden="true"></i>');
			
			// Checkbox function
			$("input[type='checkbox']", $(this)).click(function(ev){
				
				// If checking ...
				if ($(this).is(":checked")) {
					
					// Show immediate children  of checked
					$("> ul", $(this).parent("li")).removeClass('hide');
					// Update the tree
					$("> span.collapsed", $(this).parent("li")).removeClass("collapsed").addClass("expanded").html('<i class="fa fa-minus" aria-hidden="true"></i>');
					
					// Check parents if necessary
					if (defaults.checkParents) {
						$(this).parents("li").find("input[type='checkbox']:first").attr('checked', true);
					}
					
					// Check children if necessary
					if (defaults.checkChildren || (defaults.shiftClickEffectChildren && ev.shiftKey)) {
						$(this).parent("li").find("input[type='checkbox']").attr('checked', true);
						// Show all children of checked
						$("ul", $(this).parent("li")).removeClass('hide');
						// Update the tree
						$("span.collapsed", $(this).parent("li")).removeClass("collapsed").addClass("expanded").html('<i class="fa fa-minus" aria-hidden="true"></i>');
					}
					
					
				// If unchecking...
				} else {
					
					// Uncheck children if necessary
					if (defaults.uncheckChildren || (defaults.shiftClickEffectChildren && ev.shiftKey)) {
						$(this).parent("li").find("input[type='checkbox']").attr('checked', false);
						// Hide all children
						$("ul", $(this).parent("li")).addClass('hide');
						// Update the tree
						$("span.expanded", $(this).parent("li")).removeClass("expanded").addClass("collapsed").html('<i class="fa fa-plus" aria-hidden="true"></i>');
					}
				}
				
			});
			
			// Tree function
			$("li:has(> ul) span", $(this)).click(function(){
					
				// If was previously collapsed...
				if ($(this).is(".collapsed")) {
					
					// ... then expand
					$("> ul", $(this).parent("li")).removeClass('hide');
					// ... and update the html
					$(this).removeClass("collapsed").addClass("expanded").html('<i class="fa fa-minus" aria-hidden="true"></i>');
				
				// If was previously expanded...
				} else if ($(this).is(".expanded")) {
					
					// ... then collapse
					$("> ul", $(this).parent("li")).addClass('hide');
					// and update the html
					$(this).removeClass("expanded").addClass("collapsed").html('<i class="fa fa-plus" aria-hidden="true"></i>');
				}
				
			});
			
			// Button functions
			
			// Expand all
			$("#expand").click(function () {
				// Show all children			 
				$("ul", $root).removeClass('hide');
				// and update the html
				$("li:has(> ul) > span", $root).removeClass("collapsed").addClass("expanded").html('<i class="fa fa-minus" aria-hidden="true"></i>');
				return false;
			});
			// Collapse all
			$("#collapse").click(function () {
				// Hide all children				   
				$("ul", $root).addClass('hide');
				// and update the html
				$("li:has(> ul) > span", $root).removeClass("expanded").addClass("collapsed").html('<i class="fa fa-plus" aria-hidden="true"></i>');
				return false;
			});
			// Wrap around checked boxes
			$("#default").click(function () {
				// Hide all except top level  
				$("ul", $root).addClass('hide');
				// Show checked and immediate children of checked
				$("li:has(input:checked) > ul", $root).removeClass('hide');
				// and update the html
				$("li:has(> ul:not(.hide)) > span", $root).removeClass('collapsed').addClass('expanded').html('<i class="fa fa-minus" aria-hidden="true"></i>');
				$("li:has(> ul.hide) > span", $root).removeClass('expanded').addClass('collapsed').html('<i class="fa fa-plus" aria-hidden="true"></i>');
				return false;
			});
			
			switch(defaults.initialState) {
				case 'expand':
					$("#expand").trigger('click');
					break;
				case 'collapse':
					$("#collapse").trigger('click');
					break;
			}
			
		});
		
		return this;
		
	};
	
})(jQuery);

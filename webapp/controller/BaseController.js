sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller,UIComponent) {

	return Controller.extend("com.bhuvana.LearningOne.controller.BaseController", {
	
          
		openBusyDialog: function () {
			var oBusyDialog = new sap.m.BusyDialog({
				text: "In progress",
				showCancelButton: true,
				cancelButtonText: " Cancel"
			});
			return oBusyDialog;
		},
		
		getModel:function(sName){
		    return this.getOwnerComponent().getModel(sName);
		},
		
		getRouter:function(that){
			return UIComponent.getRouterFor(that);
		}
		

	});

});
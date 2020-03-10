sap.ui.define([
	"com/bhuvana/LearningOne/controller/BaseController",
	"sap/ui/core/routing/History"
], function (BaseController, History) {
	"use strict";

	return BaseController.extend("com.bhuvana.LearningOne.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.bhuvana.LearningOne.view.Detail
		 */
		onInit: function () {

			var oRouter = this.getRouter(this);
			oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
				model: "common"
			});

		},
		navBack: function () {

			var oHistory = History.getInstance();
			var oPreviousHistory = oHistory.getPreviousHash();
			if (oPreviousHistory !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter(this).navTo("App", {}, true);
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.bhuvana.LearningOne.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.bhuvana.LearningOne.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.bhuvana.LearningOne.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});
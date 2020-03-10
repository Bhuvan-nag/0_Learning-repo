sap.ui.define([
	"com/bhuvana/LearningOne/controller/BaseController",
	"sap/m/ColumnListItem",
	"sap/m/Label",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",

], function (BaseController, ColumnListItem, Label, Fragment, MessageToast) {
	"use strict";

	return BaseController.extend("com.bhuvana.LearningOne.controller.App", {
		onInit: function () {
			//this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// var oCommonModel = this.getModel("common");
			// oCommonModel.loadData("model/Invoice.json");

			var valueHelpModel = new sap.ui.model.json.JSONModel();
			valueHelpModel.loadData("model/valueHelp.json");
			this.getView().setModel(valueHelpModel, "valueHelp");

		},
		onClick: function () {
			this.openBusyDialog().open();

		},
		onDownload: function (oevent) {

			// 	var oExport = new sap.ui.core.util.Export({
			// 		exportType: new sap.ui.core.util.ExportTypeCSV({

			// 			separatorChar: ";"

			// 		}),
			// 		models: this.getView().getModel("common"),
			// 		rows: {
			// 			path: "/Suppliers"
			// 		},
			// 		columns: [{
			// 			name: "Name",
			// 			template: {
			// 				content: "{CompanyName}"
			// 			}
			// 		}, {
			// 			name: "Age",
			// 			template: {
			// 				content: "{SupplierID}"
			// 			}

			// 		}]

			// 	});

			// 	oExport.saveFile().always(function () {
			// 		this.destroy();
			// 	});

			// },
			// onPress: function (oEvent) {
			// 	//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// 	var oItem = oEvent.getSource();
			// 	this.getRouter(this).navTo("Detail", {
			// 		invoicePath: window.encodeURIComponent(oItem.getBindingContext("common").getPath().substr(1))

			// 	});
			// 	//window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
			// },
			// onShowValueHelp: function (oEvent) {
			// 	// var valueHelpModel = this.getModel("valueHelp");
			// 	// 	var aCols = valueHelpModel.getData().cols;
			// 	// var oCommon = this.getModel("common");
			// 	// var oValueHelpDialog = sap.ui.xmlfragment("com.bhuvana.LearningOne.view.valueHelpDialog", this);
			// 	// this.getView().addDependent(oValueHelpDialog);
			// 	// oValueHelpDialog.getTableAsync().then(function (oTable) {
			// 	// 	oTable.setModel(oCommon);
			// 	// 	oTable.setModel(valueHelpModel, "columns");

			// 	// 	if (oTable.bindRows) {
			// 	// 		oTable.bindAggregation("rows", "/basicInformation");
			// 	// 	}

			// 	// 	if (oTable.bindItems) {
			// 	// 		oTable.bindAggregation("items", "/basicInformation", function () {
			// 	// 			return new ColumnListItem({
			// 	// 				cells: aCols.map(function (column) {
			// 	// 					return new Label({
			// 	// 						text: "{" + column.template + "}"
			// 	// 					});
			// 	// 				})
			// 	// 			});
			// 	// 		});
			// 	// 	}

			// 	// 	this._oValueHelpDialog.update();

			// 	// }.bind(this));

		},
		onExport: function () {

			if (!this._busyDialog) {
				Fragment.load({
					name: "com.bhuvana.LearningOne.view.busyDialog",
					controller: this
				}).then(function (oFragment) {
					this._busyDialog = oFragment;
					this.getView().addDependent(oFragment);
					this._busyDialog.open();
					this.serviceCall();
				}.bind(this));

			} else {
				this._busyDialog.open();
				this.serviceCall();

			}
		},

		serviceCall: function () {

			setTimeout(function () {
				this._busyDialog.close();
			}.bind(this), 3000);

		},
		onCreate: function () {

			var oTable = this.getView().byId("idTable");
			var oPath = oTable.getBinding("items").getPath();
			var oModel = this.getView().getModel("common").getProperty(oPath);
			oModel.unshift({});
			this.getView().getModel("common").setProperty("/Invoices",oModel);
			

		},
		onCloseDialog: function (oEvent) {
			var oString = oEvent.getParameter("cancelPressed");
			if (oString === true) {
				MessageToast.show("Cancel Operation is done !!");
			} else {
				MessageToast.show("Completed Successfully");
			}
		}
	});
});
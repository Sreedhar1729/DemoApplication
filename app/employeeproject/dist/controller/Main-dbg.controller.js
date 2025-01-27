 


sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageBox, MessageToast) => {
    "use strict";

    return Controller.extend("com.sap.employeeproject.controller.Main", {
        onInit() {
            /**Creating one Json Model And setting it to the view */
            const oData = new JSONModel({
                ID:"",
                fname: "",
                lname: "",
                mobile: "",
                email: "",
                address: "",
                salary: ""
            })

            this.getView().setModel(oData, "EmployeeModel")

        },
        /**Fragment open for create */
        async onCreate() {
           let oSelected= this.byId("table").getSelectedItems();
           if(oSelected.length > 0 ){
            return MessageBox.warning("please unselect")
           }
            this.oDialog ??= await this.loadFragment({
                name: "com.sap.employeeproject.fragments.create"
            })
            this.oDialog.open();
        },
        /**Closing Create Dialog */
        onCancel() {
            this.getView().getModel("EmployeeModel").setProperty("/", {})
            this.oDialog.close();
        },
        /**Edit Fragment */
       async onEditFragment() {
            this.oDialogUpdate ??= await this.loadFragment({
                name: "com.sap.employeeproject.fragments.edit"
            })
            // this.oDialogUpdate.bindElement({path:sPath,model:"EmployeeModel"})
            this.oDialogUpdate.open();
        },
        onUpdateCancel() {
            this.getView().getModel("EmployeeModel").setProperty("/", {})
            this.oDialogUpdate.close();
        },

        /**Creating new Record */
        onSave() {
            const oPayload = this.getView().getModel("EmployeeModel").getProperty("/"),
                oModel = this.getView().getModel(),
                sPath = "/Employees";

            /**Validations */
            if (!oPayload.fname || !oPayload.salary || !oPayload.address || !oPayload.mobile) {
                return MessageBox.warning("Please Enter mandatory Fields");
            }

            let oSalary = Number(oPayload.salary);
            if (isNaN(oSalary)) {
                return MessageBox.warning("Please enter a valid salary.");
            }
            oPayload.salary = Number.isInteger(oSalary) ? oSalary.toFixed(2) : oSalary.toFixed(2);

            oModel.create(sPath, oPayload, {
                success: function (oData) {
                    MessageToast.show("Create SuccessFully");
                    this.byId("table").getBinding("items").refresh();
                    this.onCancel();
                }.bind(this),
                error: function (oError) {
                    MessageBox.error("Error Occurs!!");
                    this.byId("table").getBinding("items").refresh();
                    this.onCancel();
                }.bind(this)
            })
        },
        onDelete() {
            const oSelected = this.byId("table").getSelectedItems(),
                oModel = this.getView().getModel();
            if (oSelected.length < 1) {
                return MessageBox.warning("Please Select at least one item for deletion");
            }

            oSelected.forEach(Item => {
                let sPath = Item.getBindingContext().getPath();
                oModel.remove(sPath, {
                    success: function (odata) {
                        MessageToast.show("Successfully deleted");
                        this.byId("table").getBinding("items").refresh();
                    }.bind(this), error: function (oError) {
                        MessageBox.warning("Error Occurs");
                        this.byId("table").getBinding("items").refresh();
                    }
                }

                )
            });

        },
        onEdit(){
            let oSelectedItems=this.byId("table").getSelectedItems();
            if(oSelectedItems.length > 1)
            {
                return MessageBox.warning("please select only one Item");
            }
            if(oSelectedItems.length < 1)
                {
                    return MessageBox.warning("please select atlesast one Item");
                }
                let oSelectedItem = oSelectedItems[0];
                let oObject = oSelectedItem.getBindingContext().getObject();
                let sPath = oSelectedItem.getBindingContext().getPath();
                this.getView().getModel("EmployeeModel").setData(oObject);
               
            this.onEditFragment();
            // this.byId("EditDialog").bindElement({path:sPath})
        
        },
        onUpdate(){
            let sPath=this.byId("table").getSelectedItem().getBindingContext().getPath();
            let oPayload = this.getView().getModel("EmployeeModel").getProperty("/");
            let oModel = this.getView().getModel();
            oModel.update(sPath,oPayload,{
                success: function (odata) {
                    MessageToast.show("Successfully updated");
                    this.byId("table").getBinding("items").refresh();
                    this.onUpdateCancel();
                }.bind(this), error: function (oError) {
                    MessageBox.warning("Error Occurs");
                    this.byId("table").getBinding("items").refresh();
                    this. onUpdateCancel();
                }
            })

        }

    });
});
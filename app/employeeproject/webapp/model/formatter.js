sap.ui.define([],function(){
    "use Strict";
    return{
        SalaryBase: function(salary) {
            // Return "greenText" if salary is greater than 50, otherwise return "redText"
            return salary > 80 ? "Success" : "Error";
        }
    }

})
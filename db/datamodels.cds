namespace Employees.db;

using {cuid} from '@sap/cds/common';

type name : String(20);

define entity Employees : cuid {
    fname   : name @(title:'First Name');
    lname   : name @(title:'Last Name');
    mobile  : String(10) @(title:'Mobile NO');
    email   : name @(title:'E-Mail');
    address : name @(title:'Address');
    salary  :Decimal(5, 2) @(title:'Salary');
}


 
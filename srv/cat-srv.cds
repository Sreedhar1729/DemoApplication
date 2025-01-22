using Employees.db as db from '../db/datamodels';

define service MyService {
    define entity Employees as projection on db.Employees;
}

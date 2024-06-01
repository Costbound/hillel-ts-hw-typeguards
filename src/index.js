var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var EmployeStatus;
(function (EmployeStatus) {
    EmployeStatus["Active"] = "Active";
    EmployeStatus["Inactive"] = "Inactive";
    EmployeStatus["Vacation"] = "Vacation";
})(EmployeStatus || (EmployeStatus = {}));
var Company = /** @class */ (function () {
    function Company(name) {
        this.departaments = [];
        this.preHiredEmployes = [];
        this.staff = [];
        this.name = name;
    }
    Object.defineProperty(Company.prototype, "allEmployes", {
        get: function () {
            return __spreadArray(__spreadArray([], this.departaments.flatMap(function (_a) {
                var employes = _a.employes;
                return employes;
            }), true), this.preHiredEmployes, true);
        },
        enumerable: false,
        configurable: true
    });
    return Company;
}());
var Departament = /** @class */ (function () {
    function Departament(name, area, budget) {
        if (budget === void 0) { budget = { debit: 0, credit: 0 }; }
        this.employes = [];
        this.name = name;
        this.area = area;
        this.budget = budget;
        this.id = Departament.idGenerator;
        Departament.idGenerator += 1;
    }
    Object.defineProperty(Departament.prototype, "balance", {
        get: function () {
            return this.budget.debit - this.budget.credit;
        },
        enumerable: false,
        configurable: true
    });
    Departament.prototype.addEmployee = function (employe, paymentDetails) {
        if (Utils.isEmploye(employe)) {
            employe.changeDepartament(this);
            this.budget.credit += employe.salary;
            this.employes.push(employe);
        }
        else if (paymentDetails) {
            var firstName = employe.firstName, lastName = employe.lastName, salary = employe.salary;
            var newEmploye = new Employe(firstName, lastName, salary, paymentDetails, this, EmployeStatus.Active);
            this.employes.push(newEmploye);
        }
        else {
            throw new Error("You must enter payment details to proceed!");
        }
    };
    Departament.prototype.removeEployee = function (employeToRemove) {
        this.employes = this.employes.filter(function (employe) { return employe.id !== employeToRemove.id; });
    };
    Departament.idGenerator = 0;
    return Departament;
}());
var PreHiredEmploye = /** @class */ (function () {
    function PreHiredEmploye(firstName, lastName, salary, bankAccountNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.bankAccountNumber = bankAccountNumber;
    }
    return PreHiredEmploye;
}());
var Employe = /** @class */ (function () {
    function Employe(firstName, lastName, salary, paymentDetails, departament, status) {
        if (status === void 0) { status = EmployeStatus.Inactive; }
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.paymentDetails = paymentDetails;
        this.departament = departament;
        this.status = status;
        this.id = Employe.idGenerator;
        Employe.idGenerator += 1;
    }
    Employe.prototype.changeDepartament = function (newDept) {
        this.departament.removeEployee(this);
        this.departament = newDept;
    };
    Employe.idGenerator = 0;
    return Employe;
}());
var Accounting = /** @class */ (function (_super) {
    __extends(Accounting, _super);
    function Accounting(name, area) {
        var _this = _super.call(this, name, area) || this;
        _this.salaryBalance = [];
        return _this;
    }
    Accounting.prototype.addToBalance = function (entity) {
        this.salaryBalance.push(entity);
    };
    Accounting.prototype.removeFromBalance = function (entity) {
        this.salaryBalance = this.salaryBalance.filter(function (_a) {
            var id = _a.id;
            return id !== entity.id;
        });
    };
    Accounting.prototype.internalPayment = function (employe) {
        makeInternalPayment(employe.paymentDetails);
    };
    Accounting.prototype.externalPayment = function (employe) {
        makeExternalPayment(employe.bankAccountNumber);
    };
    Accounting.prototype.payAllSalary = function () {
        var _this = this;
        this.salaryBalance.forEach(function (essence) {
            if (Utils.isEmploye(essence)) {
                if (essence.status !== EmployeStatus.Active) {
                    _this.internalPayment(essence);
                }
            }
        });
    };
    return Accounting;
}(Departament));
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.isEmploye = function (entity) {
        return entity instanceof Employe;
    };
    Utils.isPreHiredEmploye = function (entity) {
        return entity instanceof PreHiredEmploye;
    };
    Utils.isDepartament = function (entity) {
        return entity instanceof Departament;
    };
    Utils.isPaymentDetails = function (entity) {
        return typeof entity === 'object' && 'swift' in entity && 'iBan' in entity && 'number' in entity && 'correspondentBank' in entity
            ? true : false;
    };
    return Utils;
}());
function makeInternalPayment(paymentDetails) {
    // Some bank transaction logic
}
function makeExternalPayment(bankAccNumber) {
    // Some bank transaction logic
}
var fake = {
    asf: 123,
    gs: 1245,
    assf: 512,
};
var real = {
    swift: '',
    iBan: '',
    number: 123,
    correspondentBank: ''
};
console.log(Utils.isPaymentDetails(125125));
console.log(Utils.isPaymentDetails('asfasfasfasfasf'));
console.log(Utils.isPaymentDetails([124, 125, 51, 12512, 51, 25, 125]));
console.log(Utils.isPaymentDetails(true));
console.log(Utils.isPaymentDetails(fake));
console.log(Utils.isPaymentDetails(real));

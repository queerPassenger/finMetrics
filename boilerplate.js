
let boilerPlate={
    paySlipData:{
        company:{
            name:{
                val:'',
                label:'Company Name',
                type:'index_curr',
                access:[0]

            },
            address:{
                val:'',
                label:'Company Address',
                type:'index_curr',
                access:[1,2]
            },
            phone:{
                val:'',
                label:'Company Phone Number',
                type:'split',
                access:['Phone',':'],
            },
            fax:{
                val:'',
                label:'Company Fax',
                type:'split',
                access:['Fax',':'],
            },
        },
        employee:{
            name:{
                val:'',
                label:'Employee Name',
                type:'split',
                access:['Name',':'],
            },
            employeeId:{
                val:'',
                label:'Employee Id',
                type:'split',
                access:['Employee No',':'],
            },
            designation:{
                val:'',
                label:'Employee Designation',
                type:'split',
                access:['Designation',':'],
            },
            pfNo:{
                val:'',
                label:'PF Number',
                type:'split',
                access:['PF No.',':'],
            },
            esiNo:{
                val:'',
                label:'ESI Number',
                type:'split',
                access:['ESI No.',':'],
            },
            panNo:{
                val:'',
                label:'PAN Number',
                type:'split',
                access:['PAN No.',':'],
            },
            uanNo:{
                val:'',
                label:'UAN Number',
                type:'split',
                access:['UAN No.',':'],
            },
            bank:{
                val:'',
                label:'Bank Name',
                type:'split',
                access:['Bank Name',':'],
            },
            bankAccountNo:{
                val:'',
                label:'Bank Account Number',
                type:'split',
                access:['Bank Acc. No.',':'],
            },
            transferDate:{
                val:'',
                label:'Transfer Date',
                type:'split',
                access:['Transfer Date',':'],
            },   
            location:{
                val:'',
                label:'Working Location',
                type:'split',
                access:['Location',':'],
            },
            capabilityCenter:{
                val:'',
                label:'Capability Center',
                type:'split',
                access:['Capability Center',':'],
            },
            totalDays:{
                val:'',
                label:'Total Days',
                type:'split',
                access:['Total Days',':'],
            },
            lop:{
                val:'',
                label:'Loss of Pay',
                type:'split',
                access:['LOP',':'],
            },
            workDays:{
                val:'',
                label:'Work days',
                type:'split',
                access:['Work days',':'],
            },
            payPeriod:{
                val:'',
                label:'Pay Period',
                type:'split',
                access:['Pay Period',':'],
            },   
        },
        earnings:{
            basic:{
                val:'',
                label:'Basic Salary',
                type:'index_next',
                access:['Basic Salary'],
            },
            hra:{
                val:'',
                label:'House Rent Allowance',
                type:'index_next',
                access:['House Rent Allowance'],
            },
            fbp:{
                val:'',
                label:'Flexible Benefit Plan',
                type:'index_next',
                access:['Flexible Benefit Plan'],
            },
            lta:{
                val:'',
                label:'LTA Amount',
                type:'index_next',
                access:['LTA Amount'],
            },
        },
        deductions:{
            pf:{
                val:'',
                label:'Provident Fund',
                type:'index_next',
                access:['Providentfund'],
            },
            pt:{
                val:'',
                label:'Professional Tax',
                type:'index_next',
                access:['Professional Tax'],
            },
            it:{
                val:'',
                label:'Income Tax',
                type:'index_next',
                access:['Income Tax'],
            },
            medInsPrem:{
                val:'',
                label:'Medical Insurance Premium',
                type:'index_next',
                access:['Medical InsurancePremium'],
            },
        },
        exemption:{
            s10:{
                val:'',
                label:'Exemption U/S 10',
                type:'index_next',
                access:['Exemption U/S 10'],
            },
            chapter6:{
                val:'',
                label:'Chapter VI',
                type:'index_next',
                access:['Chapter VI'],
            },
        },
        others:{        
            fc:{
                val:'',
                label:'Food Coupons',
                type:'index_next',
                access:['Food Coupons worth Rs:'],
            },
            /* fcArrears:{
                val:'',
                label:'Company Fax',
                type:'split',
                access:[':'],
            },
            fuelAllowance:{
                val:'',
                label:'Company Fax',
                type:'split',
                access:[':'],
            },
            fuelArrears:{
                val:'',
                label:'Company Fax',
                type:'split',
                access:[':'],
            },
            carLeaseRental:{
                val:'',
                label:'Company Fax',
                type:'split',
                access:[':'],
            },
            medicalReimbursement:{
                val:'',
                label:'Company Fax',
                type:'split',
                access:[':'],
            }, */
            
        }

    }
}


const getObj=(obj)=>{
    return JSON.parse((JSON.stringify(boilerPlate[obj])));
}
module.exports={
    getObj
};
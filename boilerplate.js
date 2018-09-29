
let boilerPlate={
    paySlipData:{
        company:{
            name:{
                val:'',
                label:'Company Name',
                type:'index_curr',
                access:[0],
                numConvert:false,

            },
            address:{
                val:'',
                label:'Company Address',
                type:'index_curr',
                access:[1,2],
                numConvert:false,
            },
            phone:{
                val:'',
                label:'Company Phone Number',
                type:'split',
                access:['Phone',':'],
                numConvert:false,
            },
            fax:{
                val:'',
                label:'Company Fax',
                type:'split',
                access:['Fax',':'],
                numConvert:false,
            },
        },
        employee:{
            name:{
                val:'',
                label:'Employee Name',
                type:'split',
                access:['Name',':'],
                numConvert:false,
            },
            employeeId:{
                val:'',
                label:'Employee Id',
                type:'split',
                access:['Employee No',':'],
                numConvert:false,
            },
            designation:{
                val:'',
                label:'Employee Designation',
                type:'split',
                access:['Designation',':'],
                numConvert:false,
            },
            pfNo:{
                val:'',
                label:'PF Number',
                type:'split',
                access:['PF No.',':'],
                numConvert:false,
            },
            esiNo:{
                val:'',
                label:'ESI Number',
                type:'split',
                access:['ESI No.',':'],
                numConvert:false,
            },
            panNo:{
                val:'',
                label:'PAN Number',
                type:'split',
                access:['PAN No.',':'],
                numConvert:false,
            },
            uanNo:{
                val:'',
                label:'UAN Number',
                type:'split',
                access:['UAN No.',':'],
                numConvert:false,
            },
            bank:{
                val:'',
                label:'Bank Name',
                type:'split',
                access:['Bank Name',':'],
                numConvert:false,
            },
            bankAccountNo:{
                val:'',
                label:'Bank Account Number',
                type:'split',
                access:['Bank Acc. No.',':'],
                numConvert:false,
            },
            transferDate:{
                val:'',
                label:'Transfer Date',
                type:'split',
                access:['Transfer Date',':'],
                numConvert:false,
            },   
            location:{
                val:'',
                label:'Working Location',
                type:'split',
                access:['Location',':'],
                numConvert:false,
            },
            capabilityCenter:{
                val:'',
                label:'Capability Center',
                type:'split',
                access:['Capability Center',':'],
                numConvert:false,
            },
            totalDays:{
                val:'',
                label:'Total Days',
                type:'split',
                access:['Total Days',':'],
                numConvert:false,
            },
            lop:{
                val:'',
                label:'Loss of Pay',
                type:'split',
                access:['LOP',':'],
                numConvert:false,
            },
            workDays:{
                val:'',
                label:'Work days',
                type:'split',
                access:['Work days',':'],
                numConvert:false,
            },
            payPeriod:{
                val:'',
                label:'Pay Period',
                type:'split',
                access:['Pay Period',':'],
                numConvert:false,
            },   
        },
        earnings:{
            basic:{
                val:'',
                label:'Basic Salary',
                type:'index_next',
                access:['Basic Salary'],
                numConvert:true,
            },
            hra:{
                val:'',
                label:'House Rent Allowance',
                type:'index_next',
                access:['House Rent Allowance'],
                numConvert:true,
            },
            fbp:{
                val:'',
                label:'Flexible Benefit Plan',
                type:'index_next',
                access:['Flexible Benefit Plan'],
                numConvert:true,
            },
            lta:{
                val:'',
                label:'LTA Amount',
                type:'index_next',
                access:['LTA Amount'],
                numConvert:true,
            },
        },
        deductions:{
            pf:{
                val:'',
                label:'Provident Fund',
                type:'index_next',
                access:['Providentfund'],
                numConvert:true,
            },
            pt:{
                val:'',
                label:'Professional Tax',
                type:'index_next',
                access:['Professional Tax'],
                numConvert:true,
            },
            it:{
                val:'',
                label:'Income Tax',
                type:'index_next',
                access:['Income Tax'],
                numConvert:true,
            },
            medInsPrem:{
                val:'',
                label:'Medical Insurance Premium',
                type:'index_next',
                access:['Medical InsurancePremium'],
                numConvert:true,
            },
        },
        exemption:{
            s10:{
                val:'',
                label:'Exemption U/S 10',
                type:'index_next',
                access:['Exemption U/S 10'],
                numConvert:true,
            },
            chapter6:{
                val:'',
                label:'Chapter VI',
                type:'index_next',
                access:['Chapter VI'],
                numConvert:true,
            },
        },
        others:{        
            fc:{
                val:'',
                label:'Food Coupons',
                type:'index_next',
                access:['Food Coupons worth Rs:'],
                numConvert:true,
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
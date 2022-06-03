const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email Address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"password",
        isRequired:true,
        placeholder:"Password"   
    }
]

const signupFields=[
    {
        labelText:"Name",
        labelFor:"Name",
        id:"name",
        name:"name",
        type:"text",
        autoComplete:"name",
        isRequired:true,
        placeholder:"Full Name"   
    },
    {
        labelText:"Phone Number",
        labelFor:"Phone Number",
        id:"phone_number",
        name:"phone_number",
        type:"number",
        autoComplete:"phone_number",
        isRequired:true,
        placeholder:"Phone Number"   
    },

    {
        labelText:"Email address",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        isRequired:true,
        placeholder:"Password"   
    },
    {
        labelText:"Confirm Password",
        labelFor:"conf_password",
        id:"conf_password",
        name:"conf_password",
        type:"password",
        isRequired:true,
        placeholder:"Confirm Password"   
    }
]

const orderticketFields=[
    {
        labelText:"Voucher Code",
        labelFor:"voucher_id",
        id:"voucher_id",
        name:"voucher_id",
        type:"text",
        autoComplete:"voucher_id",
        isRequired:true,
        placeholder:"Insert Voucher if available"   
    }
]

    const detailticketFields=[
        {
            labelText:"Link proof of payment",
            labelFor:"proof_payment",
            id:"proof_payment",
            name:"proof_payment",
            type:"text",
            autoComplete:"proof_payment",
            isRequired:true,
            placeholder:"Fill link proof of payment"   
        }
    ]


export {loginFields,signupFields, orderticketFields, detailticketFields}
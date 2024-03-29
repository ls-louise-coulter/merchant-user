import { BUSINESS_ID, URL } from '@env';

export const SET_LOAN_STATUS = 'SET_LOAN_STATUS';

export const fetchLoan = () => {
    console.log('FETCHING LOAN');
    return (dispatch) => {
        fetch(`${URL}/business/${BUSINESS_ID}`)
        .then(res => 
            res.json())
        .then(business => {
            //console.log(business);
            if(business.loan==undefined) {
                dispatch({ 
                    type: SET_LOAN_STATUS, 
                    loan: {
                        status: 'No Loan Application Submitted',
                        statusId: '',
                        loanId: '' 
                    }
                });
            } else {
                dispatch({ 
                    type: SET_LOAN_STATUS, 
                    loan: {
                        status : business.loan.status[business.loan.status.length-1].currentStatus,
                        statusId : business.loan.status[business.loan.status.length-1]._id,
                    //Set loan ID to get date application was submitted
                        loanId : business.loan._id  
                    }
                });
            }
        }).catch(error => {
            console.log(error)
        })
    };
};


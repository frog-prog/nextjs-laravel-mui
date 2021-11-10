

export default async function startPreparing(shadowState) {
    console.log('startPreparing')
    console.log(shadowState)
    await fetch('http://apiback/api/cameras/count')
        .then((result) => {
            return result.json()
        })
        .then((result) => {
            console.log(result);
            shadowState.cameras.count = result;
        })
    await fetch('http://apiback/api/conditioners/count')
        .then((result) => {
            return result.json()
        })
        .then((result) => {
            shadowState.conditioners.count = result;
            console.log(result)
        });
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '' || localStorage.getItem('token')==='undefined') {
        console.log('токена нет');
        shadowState.tokenChecking = false;
        shadowState.section = 'auth';
        return shadowState;
    }
    else {
            console.log('проверяем токен');
            return await fetch('http://apiback/api/authentication/checktoken', {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //make sure to serialize your JSON body
                body: JSON.stringify({"token": localStorage.getItem('token')})
            })
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    console.log(result)
                    console.log('mistake ',result['error'])
                    if (result['error'] === undefined) {
                        console.log(shadowState)
                        localStorage.setItem('role', result['role']);
                        shadowState.role = result['role'];
                        shadowState.tokenChecking = false;
                        shadowState.section = 'auth';
                        return shadowState;
                    } else {
                        console.log(shadowState)
                        shadowState.tokenChecking = false;
                        shadowState.section = 'auth';
                        return shadowState;
                    }
                })
        }
}
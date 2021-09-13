function createStore(reducer){
    let state = reducer(undefined, {})
    let cbs   = []
    function dispatch(action){
        if (typeof action === 'function'){
            return action(dispatch)
        }
        const newState = reducer(state, action)
        if (newState !== state){
            state = newState
            for (let cb of cbs) 
                cb()
        }
    }
    return {
        dispatch,
        getState(){
            return state
        },
        subscribe(cb){
            cbs.push(cb)
            return () => cbs = cbs.filter(c => c !== cb)
        }
    }
}

const getGQL = url => 
    (query, variables) =>
        fetch(url, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                ...(localStorage.authToken ? {Authorization: "Bearer " + localStorage.authToken} : {})
            },
            body: JSON.stringify({query, variables})
        }).then(res => res.json())

    let gql = getGQL("http://shop-roles.asmer.fs.a-level.com.ua/graphql")

function promiseReducer(state , {type, name ,status , payload, error}) {
    if (!state){
        return {} //{status , payload , error}
    }
    if (type === 'PROMISE') {
        return {
            ...state,
            [name]: [status,payload , error]
        }
    }
    return state
}

const actionPending = name =>            ({type: "PROMISE" ,status:"PENDING", name})
const actionResolved = (name,payload) => ({type: "PROMISE" ,status:"RESOLVED", name,payload})
const actionRejected = (name,error) =>   ({type: "PROMISE" ,status:"REJECTED", name,error})

const actionPromise = (name, promise) => 
    async dispatch => {
        dispatch(actionPending(name))
        try {
            let payload = await promise
            dispatch(actionResolved(name , payload))
            return payload
        }
        catch(error){
            dispatch(actionRejected(name , error))
        }
    }

//     const store = createStore(promiseReducer)
//     const unsubscribe1 = store.subscribe(() => console.log('подписчик 1', store.getState()))

// const delay = ms => new Promise(ok=>setTimeout(()=>ok(ms),ms))
// store.dispatch(actionPromise('delay1000', delay(1000)))
// store.dispatch(actionPromise('delay2000', delay(2000)))

function cartReducer(state={},{type , count = 1, _id}) {
    if(type === 'CART_ADD'){
        return {
            ...state , 
            [_id]:(state[_id] || 0) + count
        }
    }

    if (type === 'CART_CHANGE' ) {
        return {
            ...state,
            [_id]:state[count] = count
        }
    }

    if(type === 'CART_REMOVE'){
        let {[_id]:id , ...res} = state
        return res
    }

    if (type === "CART_CLEAR"){
        return {}
    }
    return state
}


// const store = createStore(cartReducer)
// store.subscribe(()=>console.log(store.getState()))

// store.dispatch({type: 'CART_ADD', _id:'beer'})
// store.dispatch({type: 'CART_ADD', _id:'beer', count:2})
// store.dispatch({type: 'CART_ADD', _id:'chips', count:2})
// store.dispatch({type: 'CART_CHANGE', _id:'beer', count:20})
// store.dispatch({type: 'CART_REMOVE', _id:'beer'})
// store.dispatch({type: 'CART_CLEAR'})


function authReducer(state, action){ //....
    if (state === undefined){
        if (!localStorage.authToken){
            return {}
        }
        action.token = localStorage.authToken
        action.type = 'LOGIN'
        // добавить в action token из localStorage, и проимитировать LOGIN 
    }
    if (action.type === 'LOGIN'){
        console.log('ЛОГИН')
        localStorage.authToken = action.token
        // console.log(action.token)
        function jwt_decode (token) {
            
            var start64Url = token.split('.')[1]
            return JSON.parse(atob(start64Url))
        }
        return {token: action.token, payload: jwt_decode(action.token)}
    }
    if (action.type === 'LOGOUT'){
        console.log('ЛОГАУТ')
        localStorage.removeItem("authToken")
        //вернуть пустой объект
        return {}
    }
    return state
}

const actionAuthLogin = token => ({type:'LOGIN', token})
const actionAuthLogout = () => ({type:'LOGOUT'})

let reducers = {
    promise:promiseReducer,
    cart:cartReducer,
    auth:authReducer
}



let reg = async(login,password) => {
    let query = `mutation reg($l:String , $p:String) {
        UserUpsert(user:{
          login:$l ,
          password:$p
        }){
          _id
        }
      }`

      let qVariables = {
        "l":  login,
        "p": password
      }
      let result = await gql(query,qVariables)
      return result
    }

let log = async(login , password) => {
    let query = ` query log($l:String , $p:String){
        login(login:$l, password:$p)
      }`
let qVariables = {
    "l":  login,
    "p": password 
}
let result = await gql(query,qVariables)
return result
}

actionRegister = (login,password) => async dispatch => {
   return await dispatch (actionPromise('register' , reg(login,password)))
}

const actionFullLogin = (login , password) => async dispatch => {
    let result = await dispatch(actionPromise("login",log(login,password)))
    if (result.data.login !== null){
    dispatch(actionAuthLogin(result.data.login))
    }
    else {
        alert ('такого пользователя не существует')
    }
}


actionFullRegister = (login,password) => async dispatch => {
    let result =  await dispatch (actionRegister(login,password))
    console.log(result)
    if (result.errors === undefined) {
        await dispatch (actionFullLogin(login,password))
    }
    else { 
        alert("uzhe est'")
    }
}




function combineReducers(reducers){
    function commonReducer(state = {} , action){
        let commonState = {}
        for(let reducerName in reducers){
            const reducerState = reducers[reducerName](state[reducerName],action)
            if (reducerState !== state[reducerName]){
                commonState[reducerName] = reducerState
            }
        }
        if (Object.keys(commonState).length == 0){
          return state
        } 
        return {...state,...commonState}
    }
    return commonReducer
}

const store = createStore(combineReducers(reducers))
console.log(store.getState())



const unsubscribe = store.subscribe(() => console.log('result here',store.getState()))


store.dispatch(actionFullRegister('iuhfiuhfdsfdsiuhfsdoufdsio' , 'senior'))
// console.log(localStorage)

// store.dispatch(actionAuthLogout())
// console.log(localStorage)




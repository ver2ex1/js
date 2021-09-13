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

    reg ('vaaaan' , 'senior').then(res => console.log(res))

    let log = async(login , password) => {
        let query = ` query log($l:String , $p:String){
            login(login:$l, password:$p)
          }`
    let qVariables = {
        "l":  login,
        "p": password 
    }
    let token = await gql(query,qVariables)
    console.log(token)
    localStorage.authToken = token.data.login
    }

    log('v3rtex' , 'senior')

    let newOrder = async(obj) => {
        let option = Object.entries(obj)
        let orderGoods = []
        for (let key of option) {
            let iteration = {
                "count": key[1],
                "good":{"_id":key[0]}
            }
            orderGoods.push(iteration)
        }
        let query = `mutation newOrder($order:OrderInput) {
            OrderUpsert(order:$order){
              _id
            }
          }`

          let qVariables = {
            "order": {
                "orderGoods": orderGoods}
          }
          let result = await gql(query,qVariables)
          return result
    }

    newOrder({ "5dc45d0b5df9d670df48cc4b":10, "5dcabcf46d09c45440d14cf3":100})

    let allOrders = async() => {
        let res = await gql (`query orders {
            OrderFind(query:"[{}]"){
              _id total 
          orderGoods{
            good{
              name
            }
            price
            count
            total
          }
            }
          }`)
          console.log(res)
          return res
    }

    allOrders()

    let goodByID = async (id) => {
      let query = ``
    }

    let orderById = async(id) => {
        let query = `query orderID {
            OrderGoodFindOne(query:"[{}]"){
              _id
              good{
                _id
                name
              }
            }
          }`

          let qVariables = {id}

          let res = await gql(query,qVariables)
          console.log(res)
          return res
    }

   orderById("612942cfc456ed5e4d9d6a6e")
    
    async function goodFind() {
        await gql(`query {
            GoodFind(query: "[{}]"){
                _id
                name
                price
                images{
                    url
                }
            }
        }`
        )}
        
        goodFind()
        
        async function categoryFind() {
            await gql(`query {
                CategoryFind(query: "[{}]"){
                    _id
                    name
                    goods {
                        _id name 
                    }
                }
            }`).then(result => console.log(result))
    }

    categoryFind()
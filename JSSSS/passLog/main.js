
// // password

function Password (parent , open) {
  let passwordInput = document.createElement ('input')
  let passwordCheckbox = document.createElement('input')
  let passwordSpan = document.createElement('span')
  let passwordContent = document.createElement('div')
  
  parent.append(passwordContent)
  passwordContent.append(passwordInput)
  passwordContent.append(passwordCheckbox)
  passwordContent.append(passwordSpan)
  passwordContent.style.marginTop = "15px"
  passwordContent.style.marginBottom = '20px'
  passwordInput.placeholder = "Enter a password"
  
  
  passwordCheckbox.type = 'checkbox'
  passwordCheckbox.style.marginLeft = '10px'
  passwordSpan.innerHTML = "Hide password"
  passwordSpan.style.marginLeft = "10px"
  
  passwordInput.onchange = () => {
    if(typeof this.onChange === 'function'){
      this.onChange(passwordInput.value)
    }
  }
  
  function showOrHide() {
    if (passwordCheckbox.checked) {
      passwordInput.setAttribute('type' , 'password')
    } else {
      passwordInput.setAttribute('type','text')
    }
  }
  
  passwordCheckbox.addEventListener('change' , showOrHide)
  
  this.setValue = function (text) {
    passwordInput.value = text
  }
  
  this.getValue = function () {
    return passwordInput.value
  }
  
  this.setOpen = function (checker) {
    showOrHide.call(this)
    passwordCheckbox.checked = checker
  }
  
  passwordCheckbox.onclick = () => {
    showOrHide()
    this.onOpenChange("нажали чекбокс")
  }
  
  this.getOpen = function () {
    return passwordCheckbox.checked 
  }
}



// let p = new Password(document.body, true)

// p.onChange = data => console.log(data)
// p.onOpenChange = open => console.log(open)

// p.setValue('qwerty')
// console.log(p.getValue())

// p.setOpen(false)
// console.log(p.getOpen())


//loginform


//   let loginContent = document.createElement('div')
//   let loginH1 = document.createElement('h1')
//   loginH1.innerHTML = "LoginForm"
//   loginContent.append(loginH1)

//   let password = new Password(loginContent,true)
//   loginContent.querySelector('span').remove()
//   loginContent.querySelector(`input[type="checkbox"]`).remove();
//   loginContent.querySelector(`input`).setAttribute("placeholder", "Enter a login")
  
//   document.body.append(loginContent)
  
//   let pass = new Password(loginContent , false)
//   loginContent.querySelector('input:nth-child(2)').setAttribute('placeholder' , 'Enter a password')
  
 

//   let btn = document.createElement('button')
//   loginContent.append(btn)
//   btn.innerHTML = "Log in"
//   btn.style.marginLeft = '20px';
//   btn.setAttribute('disabled' , 'disabled')


// pass.onChange = password.onChange = () => {
//   if (pass.getValue() && password.getValue()){
//     btn.removeAttribute('disabled');
//   }else btn.setAttribute('disabled' , 'disabled');
// }

function LoginFormConstructor (parent , open) {
let passwordForm = document.createElement('div')
let loginForm = document.createElement('div')
let btnForm = document.createElement('div')
let loginInput = document.createElement('input')
loginInput.type = 'text'
loginInput.style.marginBottom = '10px'
loginInput.placeholder = "Enter a login"
let passwordInput = document.createElement('input')
passwordInput.type = 'text'
passwordInput.placeholder = "Enter a password"
let checkbox = document.createElement('input')
checkbox.type = 'checkbox'
checkbox.style.marginLeft = '7px'
let btn = document.createElement('button')
btn.style.marginLeft = '130px'
btn.style.marginTop = '10px'
btn.innerHTML = 'Log in'
// btn.setAttribute('disabled' , 'disabled')

parent.append(loginForm)
parent.append(passwordForm)
parent.append(btnForm)
loginForm.append(loginInput)
passwordForm.append(passwordInput)
passwordForm.append(checkbox)
btnForm.append(btn)

function showOrHide() {
  if (checkbox.checked) {
    passwordInput.setAttribute('type' , 'password')
  } else {
    passwordInput.setAttribute('type','text')
  }
}
checkbox.addEventListener('change' , showOrHide)

  passwordInput.onchange = () => {
    if(typeof this.onChange === 'function'){
      this.onChange(passwordInput.value)
    }
  }
  
  checkbox.onclick = () => {
    showOrHide()
    this.onOpenChange("нажали чекбокс")
  }
  
  
  this.passwordSetValue = function (text) {
    passwordInput.value = text
  }
  
  this.passwordGetValue = function () {
    return passwordInput.value
  }
  
  this.passwordSetOpen = function (checker) {
    checkbox.checked = checker
    showOrHide.call(this)
  }
  
  
  this.passwordGetOpen = function () {
    return checkbox.checked 
  }

  this.loginSetValue = function (text) {
    loginInput.value = text
  }

  this.loginGetValue = function () {
    return loginInput.value
  }

  // тут не разобрался, как сделать тут прикол с кнопкой
  // loginInput.onChange = passwordInput.onChange = () => {
  //   if (passwordInput.passwordGetValue() && loginInput.loginGetValue()){
  //     btn.removeAttribute('disabled')
  //   } else btn.setAttribute('disabled' , 'disabled')
  // }

  loginInput.onchange = () => {
    if(typeof this.onChange === 'function'){
      this.onLoginChange(loginInput.value)
    }
  }
}

let lfc = new LoginFormConstructor(document.body, true)

lfc.onChange = data => console.log(data)
lfc.onOpenChange = open => console.log(open)

lfc.passwordSetValue('qwerty')
console.log(lfc.passwordGetValue())

lfc.passwordSetOpen(false)
console.log(lfc.passwordGetOpen())

lfc.loginSetValue('admin')
console.log(lfc.loginGetValue())

lfc.onLoginChange = something => console.log(something)

// password verify 

// function Password (parent , open) {
//   let passwordContent = document.createElement('div')
//   let passwordContent2 = document.createElement('div')
//   let btnContent = document.createElement('div')
//   let h = document.createElement('h1')
//   h.innerHTML = "Password Verify"
//   let passwordInput = document.createElement ('input')
//   let passwordInput2 = document.createElement ('input')
//   passwordInput2.value = 'qwerty'
//   passwordInput2.type = 'password'
//   let passwordCheckbox = document.createElement('input')
//   let passwordSpan = document.createElement('span')
//   let btn = document.createElement('button')
//   btn.innerHTML = 'Log in'
//   btn.style.marginTop = '10px'
//   btn.style.marginLeft = '120px'
  
  
//   parent.style.zIndex = 1
//   parent.append(passwordContent)
//   h.style.marginTop = '100px'
//   parent.append(passwordContent2)
//   parent.append(btnContent)
//   passwordContent.append(h)
//   passwordContent.append(passwordInput)
//   passwordContent.append(passwordCheckbox)
//   passwordContent.append(passwordSpan)
//   passwordContent2.append(passwordInput2)
//   passwordContent.style.marginTop = "15px"
//   passwordContent.style.marginBottom = '20px'
//   passwordInput.placeholder = "Enter a password"
//   btnContent.append(btn)
  
  
//   passwordCheckbox.type = 'checkbox'
//   passwordCheckbox.style.marginLeft = '10px'
//   passwordSpan.innerHTML = "Hide password"
//   passwordSpan.style.marginLeft = "10px"
  
//   function showOrHide() {
//     if (passwordCheckbox.checked) {
//       passwordInput.setAttribute('type' , 'password')
//     } else {
//       passwordInput.setAttribute('type','text')
//     }
//   }
//   passwordCheckbox.addEventListener('change' , showOrHide)

//   this.passwordSetOpen = function(bool){
//     if(bool === false) {
//         passwordInput.type = 'password'
//         passwordCheckbox.checked = false
//         passwordCheckbox.onchange = function() {
//             if (passwordInput.type === "password") {
//                 passwordInput.type = "text";
//             }
//             else {
//                 passwordInput.type = 'password'
//             }
//             if(passwordInput.type === 'text'){
//                 passwordInput2.hidden = true
//             }
//             else if (passwordInput.type === 'password') {
//                 passwordInput2.hidden = false
//             }
//         }
//     }
//     else if (bool === true){
//         passwordInput.type = 'text'
//         passwordCheckbox.checked = true
//         passwordCheckbox.onchange = function() {
//             if (passwordInput.type === "password") {
//                 passwordInput.type = "text";
//             }
//             else {
//                 passwordInput.type = 'password'
//             }
//         }
//     }  
// }

// this.Verify = function () {
//   btn.disabled = true
//   passwordInput.oninput = passwordInput2.oninput = () => {
//   if (passwordInput.value === passwordInput2.value && passwordInput.value != '') {
//     btn.disabled = false
//   }
//   else {
//     btn.disabled = true
//   }
// }
// }
// }

// let p = new Password(document.body, true)

// p.passwordSetOpen(false)
// p.Verify()
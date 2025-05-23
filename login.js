/*

*/
// ==================================================
// SELEÇÃO DOS ELEMENTOS DO DOM

// Títulos e Labels
const titleSignOrCreate = document.getElementById("title-sign-or-create");
const labelUserRegister = document.querySelectorAll(".label-user-register");
const labelUser = document.querySelectorAll(".label-user");
const userEmail = document.getElementById("userEmail");
const cpfUserLabel = document.getElementById('cpf-user-label') 
const labelCcodeUser = document.getElementById('label-code-user')  
const alertCreateAccount = document.getElementById('alert-createAccount');

// Inputs
const emailUser = document.getElementById("email-user")
const nomeUser = document.getElementById("nome");
const cpfUser = document.getElementById("cpf-user");
let userPhone = document.getElementById("phone-user")
let passwordFirstConfirmedEquals = document.getElementById("password-first");
let passwordSecondConfirmedEquals = document.getElementById("password-second");
let codeUser = document.getElementById("code-user")

// Campos de senha
const passwordUserConfirmed = document.getElementById("password-user-confirmed")
const passwordConfirmedEquals = document.querySelector(".password-confirmed-equals");
const passwordConfirmedInput = document.querySelectorAll(".password-confirmed-input");
const passwordConfirmedDivDisplay = document.getElementById("password-confirmed-div-display");
const warningPasswordDoesntMatch = document.getElementById("warning_passwordDoenst_match");

// Botões
const bntRegisterAndLogin = document.getElementById("bnt-login-user");
const idRegisterNowUser = document.getElementById("id-register-now-user");
const idLoginNowUser = document.getElementById("id-login-now-user");
const goToMainPage = document.getElementById("go_to_mainPage");
const changePasswordUser = document.getElementById("change_password_user");
const bntCodeUser = document.getElementById('bnt-code-user');
const bntCancelCodeUser = document.getElementById('bnt-cancel-code');
const bntSendCodeUser = document.getElementById('bnt-send-codeUser');
const bntChangePassword = document.getElementById("bnt-chande-passwordUser");

// Formulário
const formUser = document.getElementById("form-user-teste");

// Divs and Class
const informationLoginIncorrect = document.getElementById('information-login-incorrect')
const divCode = document.getElementById('div-code')
const registerUserClass = document.querySelectorAll('.register-user')
const confirmeCodeDiv = document.getElementById('confirme-code-div')
const informationEmailIncorrect = document.getElementById('information-email-incorrect')
const informationCodeIncorrect = document.getElementById('information-code-incorrect')


// ==================================================

let bntRegAndLog = false;

// Quando tiver na tela de registro
idRegisterNowUser.addEventListener("click", function() {

    titleSignOrCreate.style.marginBottom = '50px';
    cpfUser.value = ''
    passwordFirstConfirmedEquals.value = ''
    informationLoginIncorrect.style.display = 'none'

    bntRegAndLog = true; // -> Quando o usuário clicar no botão de registro, ele será True e isso fará com que o botão tenha o comportamento para registrar.
    changePasswordUser.style.display = "none"

    for (var labelUserAll of labelUserRegister) {
        labelUserAll.style.display = 'block';
    }
    for (var passwordConfirmedInputAll of passwordConfirmedInput) {
        passwordConfirmedInputAll.style.width = "90%";
    }
    passwordUserConfirmed.style.justifyContent = 'space-evenly';
    passwordConfirmedEquals.style.width = "none";
    titleSignOrCreate.innerHTML = "CREATE AN ACCOUNT";
    passwordConfirmedDivDisplay.style.display = "block";
    bntRegisterAndLogin.innerHTML = "CREATE";
    idRegisterNowUser.style.display = "none";
    idLoginNowUser.style.display = "block";
});

// Quando tiver na tela de Login
idLoginNowUser.addEventListener("click", function() {
    alertCreateAccount.style.display = 'none'
    cpfUser.value = ''
    passwordFirstConfirmedEquals.value = ''

    bntRegAndLog = false
    changePasswordUser.style.display = "block"
    idRegisterNowUser.style.display = "block";
    idLoginNowUser.style.display = "none";
    warningPasswordDoesntMatch.style.display = 'none'

    passwordConfirmedDivDisplay.style.display = "none";

    for (var labelUserAll of labelUserRegister) {
        labelUserAll.style.display = 'none';
    }
    for (var passwordConfirmedInputAll of passwordConfirmedInput) {
        passwordConfirmedInputAll.style.width = "95%";
    }
    bntRegisterAndLogin.innerHTML = "SIGN IN";
    titleSignOrCreate.innerHTML = "Sign in to Amor de Pata";
});

// Evento do botão para alternar entre o cadastro e o login
bntRegisterAndLogin.addEventListener('click', async function(event) {
    // Botão para ter o comportamento de logar o usuário
    if(bntRegAndLog) {
        console.log("Tentativa de cadastro...")
        nomeUser.setAttribute('required', 'true')
        emailUser.setAttribute('required', 'true')
        cpfUser.setAttribute('required', 'true')
        passwordFirstConfirmedEquals.setAttribute('required', 'true')
        passwordSecondConfirmedEquals.setAttribute('required', 'true')

        // Faz a validação padrão do HTML
        if (!formUser.checkValidity()) { // Verifica se todos os campos do formulário é válido sem mostrar a mensagem
            formUser.reportValidity(); // Faz a mesma verificação, diferente de cima, ele mostra a mensagem
           return;
        }
        event.preventDefault(); 

        let userPasswordGlobal = ""
        if (passwordFirstConfirmedEquals.value == passwordSecondConfirmedEquals.value) {
            userPasswordGlobal = passwordFirstConfirmedEquals.value
        } else{
            warningPasswordDoesntMatch.style.display = "block";
            passwordFirstConfirmedEquals.addEventListener("input", function() {
                warningPasswordDoesntMatch.style.display = "none";
            });

            passwordSecondConfirmedEquals.addEventListener("input", function () {
                warningPasswordDoesntMatch.style.display = "none";
            });
            return;
        }
        const user = {
            userName: nomeUser.value,
            userEmail: emailUser.value.toLowerCase(),
            userCPF: cpfUser.value,
            userNumber: userPhone.value,
            userPassword: userPasswordGlobal
        };
       
        console.log(userPhone.value)
        // Agora tentaremos fazer uma conexão com o serviço (API no Java).
        try {
            const response = await fetch("http://localhost:8080/api/userPet/createUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Aqui avisamos que os dados (user) serão enviados em formato JSON
                },
                body: JSON.stringify(user)
            });

                // Não cairá aqui se o e-mail já for cadastrado no banco de dados, não só ele como o CPF também. Certifique-se de o usuário cadastrar valores diferentes.
                if (response.ok) { // Fazer a verificação da senhora.
                    titleSignOrCreate.innerHTML = "CONTA CRIADA";
                    for (var labelUserAll of labelUserRegister) {
                        labelUserAll.style.display = 'none';
                    }

                    for (var passwordConfirmedInputAll of passwordConfirmedInput) {
                        passwordConfirmedInputAll.style.display = 'none';
                    }

                    // Tirando os labels após a criação da conta.
                    for (var labelUserAll of labelUser) {
                        labelUserAll.style.display = 'none';
                    }

                    // Tirando o input do CPF
                    cpfUser.style.display = 'none';

                    // Tirando o botão de login/registro
                    bntRegisterAndLogin.style.display = 'none';
                    idLoginNowUser.style.display = 'none';
                    goToMainPage.style.display = 'block';

                } else if (response.status === 401) {
                    console.log("Ocorreu um erro.");
                } else {
                    formUser.reportValidity();
                    console.log("ERRO:" + response.status);
                    console.log("Erro no código. Cadastro não realizado!")
                    alertCreateAccount.style.display = 'flex'
                    emailUser.addEventListener('click', function(){
                        alertCreateAccount.style.display = 'none'
                    })
                    cpfUser.addEventListener('click', function(){
                        alertCreateAccount.style.display = 'none'
                    })
                    
                }
               
        } catch (error) {
            console.log("Erro na solicitação:" + error);
        }

    // Botão para ter o comportamento de logar o usuário
    } else{
        console.log("Tentativa de login....")
        cpfUser.setAttribute('required', 'true')
        passwordFirstConfirmedEquals.setAttribute('required', 'true')
            
        // Verificação do formulário
        if (!formUser.checkValidity()) {
            formUser.reportValidity(); // Mostra os erros para o usuário
            return; // Impede o login se o formulário não for válido
        }
        event.preventDefault(); 
        // Se passou na validação, segue para o login
        const userLogin = {
            userCPF: cpfUser.value,
            userPassword: passwordFirstConfirmedEquals.value,
        };
        console.log(cpfUser.value);

        try {
            const response = await fetch("http://localhost:8080/api/userPet/loginUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userLogin),
            });

            if (response.ok) {
                console.log("Feito o login com sucesso.");
                titleSignOrCreate.innerHTML = "SEJA BEM VINDO(A) DE VOLTA!";
                formUser.style.display = 'none';
            } else {
                titleSignOrCreate.style.marginBottom = '0';
                informationLoginIncorrect.style.display = 'flex';
                console.log("Erro no código. Login não realizado!");

                // Escondendo mensagem de erro ao clicar nos campos
                cpfUser.addEventListener('click', function () {
                    informationLoginIncorrect.style.display = 'none';
                    titleSignOrCreate.style.marginBottom = '50px';
                });

                passwordFirstConfirmedEquals.addEventListener('click', function () {
                    informationLoginIncorrect.style.display = 'none';
                    titleSignOrCreate.style.marginBottom = '50px';
                });
            }
        }catch (erro) {
            console.log("Houve um problema no backEnd:" + erro);
        }
    }
        
});


// Link para o usuário colocar o seu e-mail e receber o código.
changePasswordUser.addEventListener('click', function (event) {
    event.preventDefault(); 
    // Impede que o navegador envie dados do formulário de forma padrão. Assim você tem mais controle de envio dos formulários!
    cpfUser.style.display = 'none'
    cpfUserLabel.style.display = 'none'
    passwordConfirmedEquals.style.display = 'none'

    userEmail.style.display = 'block'
    titleSignOrCreate.innerHTML = "ESQUECEU SUA SENHA DE ACESSO?"
    emailUser.style.display = 'block'
    idRegisterNowUser.style.display = 'none'
    bntRegisterAndLogin.style.display = 'none'
    changePasswordUser.style.display = 'none'
    bntCodeUser.style.display = 'block'
    bntCancelCodeUser.style.display = 'block'
})

// Quando clicar no botão "Cancelar" (Quer cancelar a mudança de senha)
bntCancelCodeUser.addEventListener('click', function(){
    cpfUser.style.display = 'block'
    passwordConfirmedEquals.style.display = 'block'

    cpfUserLabel.style.display = 'block'
    userEmail.style.display = 'none'
    titleSignOrCreate.innerHTML = "Sign in to Amor de Pata"
    emailUser.style.display = 'none'
    idRegisterNowUser.style.display = 'block'
    bntRegisterAndLogin.style.display = 'block'
    changePasswordUser.style.display = 'block'
    bntCodeUser.style.display = 'none'
    bntCancelCodeUser.style.display = 'none'
    informationEmailIncorrect.style.display = 'none'
})


// Botão para enviar o código para o e-mail do usuário.
let emailUserGlobal = ""; // será usado para trocar a senha no último evento do código.
bntCodeUser.addEventListener('click', async function (event) {
    const form = document.getElementById('form-user-teste');
    emailUser.setAttribute('required', 'true') // adicionar o atributo de obrigação

    // O required no HTML + display: none no JavaScript não combinam. Por que? O navegador, por mais que o campo esteja escondido,
    // Ele entende que o input precisa ser validado (checkValidity). Para contornar isso, é necessário tirar o required do HTML e colocar no JS. 

    if(form.checkValidity()){
        event.preventDefault();
        const userEmailSend = {
            userEmail: document.getElementById("email-user").value.toLowerCase()
        };
        emailUserGlobal = userEmailSend.userEmail;

        console.log(userEmailSend.userEmail)

        try {
            const envioEmail = await fetch("http://localhost:8080/api/userPet/enviarEmail", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(userEmailSend)
            });

            // Há um pequeno tempo no backEnd até o envio do E-mail. Foi criado uma thread no back-end separada para que o código não pare.
            if(envioEmail.ok){
                console.log('E-mail enviado!')
                titleSignOrCreate.innerHTML = 'CÓDIGO ENVIADO'
                confirmeCodeDiv.style.display = 'flex'
                divCode.style.display = 'none'
                registerUserClass.forEach(element => {
                    element.style.display = 'none'; 
                });
            } else{
                informationEmailIncorrect.style.display = 'flex'
                console.log("Erro ao enviado e-mail.")

                emailUser.addEventListener('click', function(){
                    informationEmailIncorrect.style.display = 'none'
                })
            }
        } catch(erro){
            console.log("Houve um problema." + erro)
        }
    } else{
        console.log("Ocorreu algum problema ao enviar o e-mail.")
    }

})

// Botão para enviar código.
bntSendCodeUser.addEventListener('click', async function (event) { 
    const form = document.getElementById('form-user-teste');
    codeUser.setAttribute('required', 'true') 

    if(form.reportValidity()){
        event.preventDefault()

        const passwordEqualUser = {
            code: Number.parseInt(codeUser.value) // Transforma em número pq o input está em texto. O backEnd não aceita texto!
        };
        console.log(passwordEqualUser);

        try{
            const changePassword = await fetch("http://localhost:8080/api/userPet/verifyCode", { // Espera uma promise 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(passwordEqualUser)
            });
            if(changePassword.ok) { // Se o retorno da promise for Ok, continua.
                console.log(emailUserGlobal)
                titleSignOrCreate.innerHTML = 'REDEFINIÇÃO DE SENHA'
                bntSendCodeUser.style.display = "none"
                bntChangePassword.style.display = "block"
                codeUser.style.display = "none"
                passwordConfirmedInput.forEach(inputsSenha => {
                    inputsSenha.style.display = "block"
                    });

                    passwordConfirmedDivDisplay.style.display = "block"
                    passwordFirstConfirmedEquals.style.display = "block"
                    passwordUserConfirmed.style.flexDirection = "column"
                    passwordConfirmedEquals.style.display = "block"
                    passwordConfirmedDivDisplay.style.marginTop = "25px"
                    labelCcodeUser.style.display = "none"

            } else{
                informationCodeIncorrect.style.display = "flex"
                codeUser.addEventListener("click", function(){
                    informationCodeIncorrect.style.display = "none"
                })

                console.log("Código incorreto")
            }
        } catch(erro){ // Caso ao contrário, pare aqui.
            console.log("Problemas no código.")
        }
    }
        // Se houver outras funções paralelas antes do retorno do valor acima, o código continuará até que termine de resolver a promise.

})

// Botão para mudar a senha
bntChangePassword.addEventListener('click', async function(event){
    const form = document.getElementById('form-user-teste');
    codeUser.setAttribute('required', 'true')
    passwordFirstConfirmedEquals.setAttribute('required', 'true')
    passwordSecondConfirmedEquals.setAttribute('required', 'true') 

    if(form.reportValidity()){
        event.preventDefault()

        let userPasswordGlobal = ""
        if (passwordFirstConfirmedEquals.value == passwordSecondConfirmedEquals.value) {
            userPasswordGlobal = passwordFirstConfirmedEquals.value
        } else{
            warningPasswordDoesntMatch.style.display = "block";
            passwordFirstConfirmedEquals.addEventListener("input", function() {
                warningPasswordDoesntMatch.style.display = "none";
            });

            passwordSecondConfirmedEquals.addEventListener("input", function () {
                warningPasswordDoesntMatch.style.display = "none";
            });
            return;
        }

        console.log(userPasswordGlobal)
        const passwordFromUser = {
            userEmail: emailUserGlobal,
            userPassword: userPasswordGlobal
        }

        try{
            const response = await fetch("http://localhost:8080/api/userPet/changePassword",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(passwordFromUser)
            });

            if(response.ok){
                    console.log(emailUserGlobal)
                    titleSignOrCreate.innerHTML = 'SENHA ALTERADA COM SUCESSO'
                    bntChangePassword.style.display = "none"
                    bntSendCodeUser.style.display = "none"
                    passwordConfirmedInput.forEach(inputsSenha => {
                    inputsSenha.style.display = "none"
                    });

                    passwordConfirmedDivDisplay.style.display = "none"
                    passwordFirstConfirmedEquals.style.display = "none"
                    passwordConfirmedEquals.style.display = "none"
                    labelCcodeUser.style.display = "none"
                    bntChangePassword.style.display = "none"
                }
        }catch(erro){
            console.log("Problemas no backEnd. Contate o seu desenvolvedor!")
        }
    }
})
// Função para impedir o usuário de colocar texto
function validateNumber(input) {
    const value = input.value;
    input.value = value.replace(/\D/g, '');
}
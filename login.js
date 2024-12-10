// ==================================================
// SELEÇÃO DOS ELEMENTOS DO DOM

// Títulos e Labels
const titleSignOrCreate = document.getElementById("title-sign-or-create");
const labelUserRegister = document.querySelectorAll(".label-user-register");
const labelUser = document.querySelectorAll(".label-user");
const userEmail = document.getElementById("userEmail");     

// Inputs
const emailUser = document.getElementById("email-user")

// Campos de senha
const passwordUserConfirmed = document.getElementById("password-user-confirmed");
const passwordConfirmedEquals = document.querySelector(".password-confirmed-equals");
const passwordConfirmedInput = document.querySelectorAll(".password-confirmed-input");
const passwordConfirmedDivDisplay = document.getElementById("password-confirmed-div-display");
const passwordFirstConfirmedEquals = document.getElementById("passwordFirst-confirmed-equals");
const passwordSecondConfirmedEquals = document.getElementById("passwordSecond-confirmed-equals");
const warningPasswordDoesntMatch = document.getElementById("warning_passwordDoenst_matches");

// Botões
const btnRegisterUser = document.getElementById("bnt-login-user");
const idRegisterNowUser = document.getElementById("id-register-now-user");
const idLoginNowUser = document.getElementById("id-login-now-user");
const goToMainPage = document.getElementById("go_to_mainPage");
const changePasswordUser = document.getElementById("change_password_user");
const bntCodeUser = document.getElementById('bnt-code-user');

// Formulário e campos de entrada
const formUserTeste = document.getElementById("form-user-teste");
const cpfUser = document.getElementById("cpf-user");


// ==================================================

idRegisterNowUser.addEventListener("click", function() {

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
    btnRegisterUser.innerHTML = "CREATE";
    idRegisterNowUser.style.display = "none";
    idLoginNowUser.style.display = "block";
});

idLoginNowUser.addEventListener("click", function() {
    changePasswordUser.style.display = "block"
    idRegisterNowUser.style.display = "block";
    idLoginNowUser.style.display = "none";

    passwordConfirmedDivDisplay.style.display = "none";

    for (var labelUserAll of labelUserRegister) {
        labelUserAll.style.display = 'none';
    }
    for (var passwordConfirmedInputAll of passwordConfirmedInput) {
        passwordConfirmedInputAll.style.width = "95%";
    }
    btnRegisterUser.innerHTML = "SIGN IN";
    titleSignOrCreate.innerHTML = "Sign in to Amor de Pata";
});

// Ação para quando o uruário apertar o botão de se registrar. 
btnRegisterUser.addEventListener('click', async function(event) {
    

    const form = document.getElementById('form-user-teste');
    // Faz a validação padrão do HTML

    if (form.checkValidity()) {
        event.preventDefault();

        const user = {
            userName: document.getElementById('nome').value,
            userEmail: document.getElementById('email-user').value,
            userCPF: document.getElementById('cpf-user').value,
            userPhone: document.getElementById('phone-user')?.value || '',
            userPassword: document.getElementById('passwordFirst-confirmed-equals')?.value || ''
        };

        // Agora tentaremos fazer uma conexão com o serviço (API no Java).
        try {
            const response = await fetch("http://localhost:8080/api/userPet/createUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Aqui avisamos que os dados (user) serão enviados em formato JSON
                },
                body: JSON.stringify(user)
            });

            if (passwordFirstConfirmedEquals.value === passwordSecondConfirmedEquals.value) {

                // Não cairá aqui se o e-mail já for cadastrado no banco de dados, não só ele como o CPF. Certifique-se de o usuário cadastrar valores diferentes.
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
                    btnRegisterUser.style.display = 'none';
                    idLoginNowUser.style.display = 'none';
                    goToMainPage.style.display = 'block';

                } else if (response.status === 401) {
                    console.log("Ocorreu um erro.");
                } else {
                    formUserTeste.reportValidity();
                    console.log("ERRO:" + response.status);
                }
            } else {
                warningPasswordDoesntMatch.style.display = "block";
                passwordFirstConfirmedEquals.addEventListener("click", function() {
                    warningPasswordDoesntMatch.style.display = "none";
                });
            }

        } catch (error) {
            console.log("Erro na solicitação:" + error);
        }
    }
});

// Link para o usuário colocar o seu e-mail e receber o código.
changePasswordUser.addEventListener('click', function (event) {
    event.preventDefault();

    cpfUser.style.display = 'none'
    passwordConfirmedEquals.style.display = 'none'

    for (var labelUserAll of labelUser) {
        labelUserAll.style.display = 'none';
    }

    userEmail.style.display = 'block'
    titleSignOrCreate.innerHTML = "ESQUECEU SUA SENHA DE ACESSO?"
    emailUser.style.display = 'block'
    idRegisterNowUser.style.display = 'none'
    btnRegisterUser.style.display = 'none'
    changePasswordUser.style.display = 'none'
    bntCodeUser.style.display = 'block'
})

// Botão para enviar o código para o e-mail do usuário.
// Quando o usuário clicar, abrirá um formulário para confirmar o código.
// Após isso, você precisará usar esse mesmo e-mail para confirmar que é o usuário e redefinir a senha.
bntCodeUser.addEventListener('click', async function (event) {
    event.preventDefault();

    const userEmail = {
        userEmail: getElementById("email-user")
    }
    
    // Vamos colocar a URL para envio de e-mail para o usuário.
    try {
        const envioEmail = await fetch("http://localhost:8080/api/userPet/enviarEmail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Aqui avisamos que os dados (user) serão enviados em formato JSON
            },
            body: JSON.stringify(user)
        });
    } catch(erro){
        console.log("Houve um problema." + erro)
    }
})
async function templateEmail(nome, link){
    return `
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo!</title>
    <style>
        /* Reset de estilos para compatibilidade */
        body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
        
        /* Estilos Responsivos */
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content-padding { padding: 20px !important; }
            .mobile-font { font-size: 16px !important; }
        }
    </style>
</head>
<body style="background-color: #f4f4f7; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.6; color: #333333; margin: 0; padding: 0;">

    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f7;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" style="padding-bottom: 20px;">
                            <img src="https://cdn.freebiesupply.com/logos/large/2x/jaguar-1-logo-png-transparent.png" alt="Logo" width="150" style="display: block; border-radius: 5px;">
                        </td>
                    </tr>
                </table>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="container" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
                    
                    <tr>
                        <td style="background-color: #4F46E5; height: 8px; width: 100%;"></td>
                    </tr>

                    <tr>
                        <td class="content-padding" style="padding: 40px;">
                            <h1 style="color: #1f2937; font-size: 24px; font-weight: 700; margin: 0 0 20px 0; text-align: center;">
                                Bem-vindo, ${nome}!
                            </h1>

                            <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; text-align: center;">
                                Estamos muito felizes em ter você conosco. Seu cadastro foi realizado com sucesso. Para começar a aproveitar todos os recursos, por favor, confirme seu e-mail clicando no botão abaixo.
                            </p>

                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="${link}" target="_blank" style="background-color: #4F46E5; color: #ffffff; display: inline-block; font-size: 16px; font-weight: 600; line-height: 50px; text-align: center; text-decoration: none; width: 200px; border-radius: 50px; box-shadow: 0 2px 4px rgba(79, 70, 229, 0.4);">
                                            Confirmar E-mail
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 20px 0 0 0; color: #6b7280; font-size: 14px; text-align: center;">
                                Se o botão acima não funcionar, copie e cole o link abaixo no seu navegador:<br>
                                <span style="color: #4F46E5; word-break: break-all;">${link}</span>
                            </p>
                        </td>
                    </tr>
                </table>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" style="padding: 20px; color: #9ca3af; font-size: 12px;">
                            <p style="margin: 0;">&copy; 2025 Sua Empresa. Todos os direitos reservados.</p>
                            <p style="margin: 10px 0 0 0;">
                                <a href="#" style="color: #9ca3af; text-decoration: underline;">Privacidade</a> | 
                                <a href="#" style="color: #9ca3af; text-decoration: underline;">Descadastrar</a>
                            </p>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>

</body>
</html>`
}

module.exports = {
    templateEmail
}
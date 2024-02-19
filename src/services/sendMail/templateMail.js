const STYLE_DEFAULT = `<style type="text/css">
* {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: none;
  -webkit-text-resize: 100%;
  text-resize: 100%;
}

h4 {
  padding: 0px;
  margin: 10px 0px 0px;
}

a {
  outline: none;
}

.btn-01:hover,
.btn-02:hover,
.btn-03:hover {
  opacity: 0.8;
}

.btn-01,
.btn-02,
.btn-03 {
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  transition: all 0.3s ease;
}


a.button {
  color: white;
  text-decoration: none;
  background-color: #ff010b;
  padding: 10px 50px;
  border-radius: 6px
}

a[class="icon"]:link {
  background-color: transparent;
  text-decoration: none;
}

a[class="icon"]:visited {
  background-color: transparent;
  text-decoration: none;
}

a[class="icon"]:hover {
  background-color: transparent;
  text-decoration: none;
}

a[class="icon"]:active {
  background-color: transparent;
  text-decoration: none;
}

table td {
  border-collapse: collapse !important;
}

.ExternalClass,
.ExternalClass a,
.ExternalClass span,
.ExternalClass b,
.ExternalClass br,
.ExternalClass p,
.ExternalClass div {
  line-height: inherit;
}

.row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.col-lg-4 {
  flex: 0 0 auto;
  width: 33.3333333%
}

.text-center {
  text-align: center !important;
}

.footer {
  width: 100%;
  margin-bottom: 15px;
}

@media only screen and (max-width:500px) {
  table[class="wrapper"] {
    min-width: 320px !important;
  }

  table[class="flexible"] {
    width: 100% !important;
  }

  td[class="hide"],
  td[class="hide"] img,
  span[class="hide"],
  img[class="hide"],
  br[class="hide"],
  td[class="fix-gmail"] {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    padding: 0 !important;
    font-size: 0 !important;
    line-height: 0 !important;
  }

  td[class="img-flex"] img {
    width: 100% !important;
    height: auto !important;
  }

  td[class="aligncenter"] {
    text-align: center !important;
  }

  td[class="holder"] {
    padding: 30px 15px !important;
  }

  td[class="holder-01"] {
    padding: 0 15px !important;
  }

  td[class="holder-02"] {
    padding: 30px 0 !important;
  }

  td[class="text-01"] {
    padding: 0 15px !important;
  }

  td[class="p-0"] {
    padding: 0 !important;
  }
}
</style>`;

const FOOTER_HTML = `<table class="footer">
<tr>
<td valign="top"
style="font:14px/20px Helvetica, Arial, sans-serif; color:#2b3e49; text-align: center">
<table width="50%" cellpadding="0" cellspacing="0" style="margin: 20px 25% 10px">
<tr>
</tr>
</table>
<p style="color: #2b3e49;">Marca Registrada &reg; 2021-2031 CoreDev. Todos los derechos
reservados.</p>
</td>
</tr>
<tr>
<td valign="top"
style="font:14px/20px Helvetica, Arial, sans-serif; color:#2b3e49; text-align: center">
  <div class="row">
    <div class="col-lg-4">
      <div class="text-center">
          <a href="terms-conditions.html">Términos y condiciones</a>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="text-center">
          <a href="privacy-policies.html">Políticas de privacidad</a>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="text-center">
          <a href="purchase-cancellation-policies.html">Políticas de anulación de compras</a>
      </div>
    </div>
  </div>
</td>
</tr>
</table>`;

export const templateEmailValidateMail = ({
  name,
  tokenActivation,
  tokenLink,
}) => {
  return `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Validation email</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  ${STYLE_DEFAULT}
</head>

<body style="margin:0; padding:0;" bgcolor="#f3f3f3" link="#666666">
  <!--[if gte mso 12]>
	<style>
		.btn-01{padding:8px 17px !important;}
		.btn-02{padding:6px 14px !important;}
		.btn-03{padding:10px 32px !important;}
		.btn-01 a, .btn-02 a, .btn-03 a{padding:0 !important;}
	</style>
<![endif]-->
  <table class="wrapper" width="100%" cellspacing="0" cellpadding="0" bgcolor="#f3f3f3">
    <tr>
      <td>
        <table class="flexible" width="602" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding:8px 10px;">
              <a target="_blank" href=""><img
                  src=""
                  style="vertical-align:top; object-fit:contain" border="0" width="240" height="150" alt="" /></a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <table class="flexible" width="900" style="margin:0 auto;" cellpadding="0" cellspacing="0">
          <tr>
            <td class="p-0" bgcolor="#b7b7b7">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td bgcolor="#ffffff">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td class="holder" style="padding:13px 15px 0px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td
                                style="font:16px/22px Avenir, Helvetica, Arial, sans-serif; color:#00aeef; text-align: center">
                                <h2 style="color: #000000">Activación de cuenta</h2>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td class="holder" style="padding:0px 25px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="100%"
                                style="font:15px/17px Avenir, Helvetica, Arial, sans-serif; color:#000000; text-align: center">
                                <h4 style="padding: 0px; margin: 0px">Hola ${name}</h4>
                                <p style="padding: 0px; margin: 0px; color: #696969;">Gracias por registrarte en
                                .
                                  Para completar la activación de tu cuenta necesitamos validar tu correo; para ello te
                                  hemos enviado este pin de seguridad.</p>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%"
                                style="font:16px/22px Avenir, Helvetica, Arial, sans-serif; color:#000000; text-align: center; padding-top: 15px">
                                <table width="50%" cellpadding="0" cellspacing="0"
                                  style="border-collapse: collapse; margin: 0 25%">
                                  <tr bor
                                    style="background-color: #f1f1f1; border-style: dashed; border-width: medium; border-color: #acacac; padding: 5px 25px; text-align: center">
                                    <td>
                                      <p
                                        style="padding: 0px; margin: 0px; font:16px/22px Avenir, Helvetica, Arial, sans-serif; color: #424242">
                                        <strong>PIN DE SEGURIDAD</strong></p>
                                      <p style="padding: 0px; margin: 0px; letter-spacing: 8px">
                                        <strong>${tokenActivation}</strong></p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <p
                                        style="padding: 2px; margin: 0px; color: #696969; font:10px/12px Avenir, Helvetica, Arial, sans-serif; text-align: center">
                                        Este PIN caduca en 24 horas</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!--tr>
                        <td class="holder" style="padding:15px 50px;" align="center">
                          <table width="75%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center" style="font:16px/22px Avenir, Helvetica, Arial, sans-serif; color:#000000;">
                                <h2>También puedes activar tu cuenta desde el siguiente enlace</h2>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" valign="top"
                                style="font:14px/20px Avenir, Helvetica, Arial, sans-serif; color:#2b3e49; padding-top: 15px">
                                <a class="button" target="_blank" href=""><span
                                    style="font:16px/18px Avenir, Helvetica, Arial, sans-serif;"><strong>INGRESAR</strong></span></a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr-->
                      <tr>
                        <td class="holder" style="padding:15px 25px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="left" valign="top" colspan="2"
                                style="font:14px/20px Avenir, Helvetica, Arial, sans-serif; color:#2b3e49; padding-right: 40px">
                                <p style="color: #2b3e49;">Este mensaje se envió de forma automática no responda este
                                  mensaje. Si no has sido tú, te agradecemos reportarlo en el siguiente enlace <a
                                    target="_blank"
                                    href=''>atencionalcliente</a>
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" valign="top" colspan="2"
                                style="font:14px/20px Avenir, Helvetica, Arial, sans-serif; color:#2b3e49;">
                                <h4 style="padding: 0px; margin: 0px; font:16px/22px color: #424242">Atentamente,</h4>
                                <p style="padding: 0px; margin: 0px; color: #696969;">El equipo de</p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" valign="top" width="50%"
                                style="font:14px/20px Avenir, Helvetica, Arial, sans-serif; color:#2b3e49; padding-top:15px">
                                <h4 style="padding: 0px; margin: 0px; font:16px/22px color: #424242">¿Tienes una
                                  pregunta?</h4>
                                <p style="padding: 0px; margin: 0px; color: #2b3e49;">Consulta nuestro Centro de ayuda o
                                  contáctanos a través de la aplicación Menú > Centro de ayuda > Reportar un problema.
                                </p>
                              </td>
                              <td align="left" valign="top"></td>
                            </tr>
                            <tr>
                              <td valign="top" colspan="2"
                                style="font:14px/20px Avenir, Helvetica, Arial, sans-serif; color:#2b3e49; text-align: center">
                                ${FOOTER_HTML}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td height="15" bgcolor="#f3f3f3" style="font-size:0; line-height:0;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="hide" height="25"></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>

</html>`;
};

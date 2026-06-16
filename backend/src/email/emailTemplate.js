export function createWelcomeEmailTemplate(name, clientURL) {
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Welcome to ChatWar</title>
            <style>
                @media only screen and (max-width: 600px) {
                    .email-outer-padding {
                        padding: 0px !important;
                    }

                    .email-container {
                        width: 100% !important;
                        max-width: 100% !important;
                        border-radius: 16px !important;
                    }

                    .email-hero,
                    .email-body,
                    .email-footer {
                        padding-left: 16px !important;
                        padding-right: 16px !important;
                    }

                    .email-hero {
                        padding-top: 24px !important;
                        padding-bottom: 20px !important;
                    }

                    .email-body {
                        padding-top: 20px !important;
                        padding-bottom: 20px !important;
                    }

                    .email-footer-text {
                        max-width: 100% !important;
                    }

                    .email-title {
                        font-size: 26px !important;
                    }
                }
            </style>
            <!--[if mso]>
            <style>
                .email-container {
                    width: 600px !important;
                }
            </style>
            <![endif]-->
        </head>

        <body
            style="margin:0;padding:0;background-color:transparent;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                style="background-color:transparent;">
                <tr>
                    <td align="center" class="email-outer-padding" style="padding:24px 16px;">
                        <!--[if mso]>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center">
                        <tr>
                        <td>
                        <![endif]-->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                            class="email-container"
                            style="max-width:600px;width:100%;background-color:#fdf8f0;border:2px solid #f5c518;border-radius:20px;overflow:hidden;">

                            <!-- Gold top bar -->
                            <tr>
                                <td height="3" style="background-color:#f5c518;font-size:0;line-height:0;">&nbsp;</td>
                            </tr>

                            <!-- Hero -->
                            <tr>
                                <td align="center" bgcolor="#1a1a2e" class="email-hero"
                                    style="background-color:#1a1a2e;background-image:linear-gradient(160deg,#1a1a2e 0%,#1b2640 50%,#142d4a 100%);padding:33px 32px 29px;">
                                    <h1 class="email-title"
                                        style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:700;line-height:1.2;color:#ffffff;">
                                        Welcome from Chat<span style="color:#e94560;">War</span>
                                    </h1>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td class="email-body" style="padding:29px 32px;background-color:#fdf8f0;">
                                    <p style="margin:0 0 5px;font-size:14px;line-height:1.5;color:#5a5a6a;">
                                        Hi <strong style="color:#1a1a2e;">${name}</strong>,
                                    </p>
                                    <p style="margin:0 0 21px;font-size:15px;line-height:1.65;color:#3d3d4e;">
                                        Thanks for joining <strong style="color:#1a1a2e;">ChatWar</strong>. Your account has
                                        been created successfully.
                                        Use the button below to open the app and get started.
                                    </p>

                                    <!-- Steps box -->
                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                        style="margin-bottom:21px;background-color:#f5f0e8;border:1px solid #f5c518;border-left:4px solid #f5c518;border-radius:12px;">
                                        <tr>
                                            <td style="padding:17px;">
                                                <p
                                                    style="margin:0 0 13px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6b6b7b;">
                                                    Quick start guide
                                                </p>

                                                <!-- Step 1 -->
                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                                                    width="100%"
                                                    style="margin-bottom:13px;padding-bottom:13px;border-bottom:1px solid #e8e0d0;">
                                                    <tr>
                                                        <td width="36" valign="top" style="padding-right:13px;">
                                                            <table role="presentation" cellpadding="0" cellspacing="0"
                                                                border="0">
                                                                <tr>
                                                                    <td width="36" height="36" align="center" valign="middle"
                                                                        bgcolor="#1a1a2e"
                                                                        style="background-color:#1a1a2e;border-radius:8px;font-size:14px;font-weight:700;color:#f5c518;">
                                                                        1
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td valign="top">
                                                            <p
                                                                style="margin:0 0 5px;font-size:14px;font-weight:600;color:#1a1a2e;">
                                                                Log in to your account</p>
                                                            <p style="margin:0;font-size:13px;line-height:1.55;color:#5a5a6a;">
                                                                Open ChatWar and sign in with your signup email and password.
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </table>

                                                <!-- Step 2 -->
                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                                                    width="100%"
                                                    style="margin-bottom:13px;padding-bottom:13px;border-bottom:1px solid #e8e0d0;">
                                                    <tr>
                                                        <td width="36" valign="top" style="padding-right:13px;">
                                                            <table role="presentation" cellpadding="0" cellspacing="0"
                                                                border="0">
                                                                <tr>
                                                                    <td width="36" height="36" align="center" valign="middle"
                                                                        bgcolor="#1a1a2e"
                                                                        style="background-color:#1a1a2e;border-radius:8px;font-size:14px;font-weight:700;color:#f5c518;">
                                                                        2
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td valign="top">
                                                            <p
                                                                style="margin:0 0 5px;font-size:14px;font-weight:600;color:#1a1a2e;">
                                                                Complete your profile</p>
                                                            <p style="margin:0;font-size:13px;line-height:1.55;color:#5a5a6a;">
                                                                Add your profile picture and display name so others can find you
                                                                easily.</p>
                                                        </td>
                                                    </tr>
                                                </table>

                                                <!-- Step 3 -->
                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                                                    width="100%">
                                                    <tr>
                                                        <td width="36" valign="top" style="padding-right:13px;">
                                                            <table role="presentation" cellpadding="0" cellspacing="0"
                                                                border="0">
                                                                <tr>
                                                                    <td width="36" height="36" align="center" valign="middle"
                                                                        bgcolor="#1a1a2e"
                                                                        style="background-color:#1a1a2e;border-radius:8px;font-size:14px;font-weight:700;color:#f5c518;">
                                                                        3
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td valign="top">
                                                            <p
                                                                style="margin:0 0 5px;font-size:14px;font-weight:600;color:#1a1a2e;">
                                                                Send your first message</p>
                                                            <p style="margin:0;font-size:13px;line-height:1.55;color:#5a5a6a;">
                                                                Start a conversation and experience fast, real-time chat on
                                                                ChatWar.</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- CTA button -->
                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                                        style="margin-bottom:21px;">
                                        <tr>
                                            <td align="center">
                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                                    <tr>
                                                        <td align="center" bgcolor="#fdf8f0"
                                                            style="border-radius:100px;border:2px solid #1a1a2e;">
                                                            <a href="${clientURL}/login" target="_blank"
                                                                style="display:inline-block;padding:15px 48px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#1a1a2e;text-decoration:none;line-height:1.2;min-width:220px;text-align:center;">
                                                                Go to Login
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <p style="margin:11px 0 0;font-size:13px;line-height:1.5;color:#5a5a6a;">
                                                    Button not working? Copy and paste this link into your browser:<br>
                                                    <a href="${clientURL}" target="_blank"
                                                        style="color:#1a1a2e;font-weight:600;text-decoration:underline;">${clientURL}</a>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>

                                    <hr style="border:none;border-top:2px solid #c9c4b8;margin:0 0 17px;">
                                    <p style="margin:0;font-size:13px;line-height:1.6;color:#5a5a6a;">
                                        Need help getting started? Reply to this email and our team will get back to you.
                                    </p>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td align="center" bgcolor="#1a1a2e" class="email-footer"
                                    style="padding:21px 32px 25px;background-color:#1a1a2e;background-image:linear-gradient(160deg,#1a1a2e 0%,#1b2640 50%,#142d4a 100%);">
                                    <p
                                        style="margin:0 0 13px;font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.04em;">
                                        Chat<span style="color:#e94560;">War</span>
                                    </p>
                                    <p class="email-footer-text"
                                        style="margin:0;font-size:12px;line-height:1.5;color:#d5d9e2;max-width:440px;">
                                        You received this email because you signed up for a ChatWar account.<br>
                                        &copy; ChatWar. All rights reserved.
                                    </p>
                                </td>
                            </tr>

                        </table>
                        <!--[if mso]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `
}

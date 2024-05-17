const { Resend } = require('resend')

const resend = new Resend(process.env.EMAIL_PASS);

const sendEmail = async (userEmail, serviceName) => {
    if (serviceName === "forgetPassword") {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: userEmail,
            subject: 'Budget Tracker | Forget Password',
            html: `<!DOCTYPE html>
<html>

<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Bakbak+One&family=Dancing+Script:wght@400..700&family=Platypi:ital,wght@0,300..800;1,300..800&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            padding: 20px;
        }

        .container {
            background-color: white;
            padding: 20px;
            border: 1px solid #ddd;
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
        }

        #heading {
            font-family: "Bakbak One", sans-serif;
            font-weight: bold;
            font-optical-sizing: auto;
            font-size: 40px;
            font-style: normal;
            margin: 1px;
        }

        h1 {
            font-family: "Platypi", serif;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
        }

        .forgot-password {
            width: 223px;
            height: 47px;
            font-family: "Bakbak One", sans-serif;
            font-weight: bold;
            font-style: normal;
            background-color: black;
            color: white;
            margin-top: 20px;
        }

        .forgot-password:hover {
            cursor: pointer;
            background-color: white;
            color: black;
        }

        p {
            font-family: "Work Sans", sans-serif;
            font-optical-sizing: auto;
            font-style: normal;
        }

        .footer {
            margin-top: 30px;
            font-size: 0.8em;
            color: #666;
        }
    </style>
    <title>Budget Tracker </title>
</head>

<body>
    <div class="container">
        <h1 id="heading">Budget Tracker</h1>
        <h1>Forgot your password?</h1>
        <p>That's okay, it happens! Click on the button below to reset your password.</p>
        <button class="forgot-password">RESET YOUR PASSWORD</button>
        <p class="footer">Problems or questions? Call us at <strong>+91 9999999999</strong></a> or email
            <strong>nameste380@gmail.com</strong></a>
        </p>
    </div>
</body>

</html>`
        });
    } else if (serviceName === "lowBalance") {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: userEmail,
            subject: 'Budget Tracker | Forget Password',
            html: `<!DOCTYPE html>
<html>

<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Bakbak+One&family=Dancing+Script:wght@400..700&family=Platypi:ital,wght@0,300..800;1,300..800&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            padding: 20px;
        }

        .container {
            background-color: white;
            padding: 20px;
            border: 1px solid #ddd;
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
        }

        #heading {
            font-family: "Bakbak One", sans-serif;
            font-weight: bold;
            font-optical-sizing: auto;
            font-size: 40px;
            font-style: normal;
            margin: 1px;
        }

        h1 {
            font-family: "Platypi", serif;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
        }

        .forgot-password {
            width: 223px;
            height: 47px;
            font-family: "Bakbak One", sans-serif;
            font-weight: bold;
            font-style: normal;
            background-color: black;
            color: white;
            margin-top: 20px;
        }

        .forgot-password:hover {
            cursor: pointer;
            background-color: white;
            color: black;
        }

        p {
            font-family: "Work Sans", sans-serif;
            font-optical-sizing: auto;
            font-style: normal;
        }

        .footer {
            margin-top: 30px;
            font-size: 0.8em;
            color: #666;
        }
    </style>
    <title>Budget Tracker </title>
</head>

<body>
    <div class="container">
        <h1 id="heading">Budget Tracker</h1>
        <h1>Low Balance in Category 😥</h1>
        <p>Expense are almost equal to category limit.</p>
        <button class="forgot-password">View Dashboard</button>
        <p class="footer">Expend according to <strong>Category Limit</strong> </p>
    </div>
</body>

</html>`
        });
    }
}

module.exports = { sendEmail };

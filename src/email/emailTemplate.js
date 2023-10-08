 export function emailTEmplate(OTP){
    return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Forget Password otp</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing US . Use the following OTP to complete your ForgetPassword procedures. OTP is valid for 5 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
      <p style="font-size:0.9em;">Regards,<br />Forget Password otp</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Forget Password otp Inc</p>
        <p>1600 Amphitheatre Parkway</p>
        <p>California</p>
      </div>
    </div>
  </div>`
 }
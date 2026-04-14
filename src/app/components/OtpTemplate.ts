export const getOtpTemplate = (otp: string, name?: string) => {
  return `
  <div style="font-family: Arial, sans-serif; background:#f6f9fc; padding:40px;">
    <div style="max-width:500px; margin:auto; background:#ffffff; border-radius:12px; padding:30px; text-align:center; box-shadow:0 5px 15px rgba(0,0,0,0.05)">
      
      <h2 style="color:#333;">Verify Your Account</h2>
      
      <p style="color:#666; font-size:14px;">
        ${name ? `Hi ${name},` : "Hello,"} <br/>
        Use the OTP below to verify your email and complete your registration.
      </p>

      <div style="margin:30px 0;">
        <span style="
          display:inline-block;
          font-size:28px;
          letter-spacing:8px;
          font-weight:bold;
          color:#fff;
          background:#007bff;
          padding:15px 25px;
          border-radius:10px;
        ">
          ${otp}
        </span>
      </div>

      <p style="color:#999; font-size:13px;">
        This OTP is valid for <b>5 minutes</b>.
      </p>

      <hr style="margin:25px 0; border:none; border-top:1px solid #eee;" />

      <p style="font-size:12px; color:#aaa;">
        If you didn’t request this, you can safely ignore this email.
      </p>

      <p style="font-size:12px; color:#aaa;">
        © ${new Date().getFullYear()} YourShop
      </p>
    </div>
  </div>
  `;
};

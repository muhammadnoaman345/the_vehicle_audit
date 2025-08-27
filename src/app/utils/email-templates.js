// app/utils/email-templates.js
export const customerEmailTemplate = (orderDetails, userData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; }
        .order-details { background-color: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your Order!</h1>
        </div>
        <div class="content">
          <p>Hello ${userData.firstName},</p>
          <p>Your order has been confirmed and is being processed. Below are your order details:</p>
          
          <div class="order-details">
            <h3>Order Information</h3>
            <p><strong>Order ID:</strong> ${orderDetails.id}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Payment Method:</strong> PayPal</p>
            <p><strong>Status:</strong> Payment Completed</p>
          </div>
          
          <div class="order-details">
            <h3>Vehicle Report Details</h3>
            <p><strong>VIN:</strong> ${userData.vin}</p>
            <p><strong>License Plate:</strong> ${userData.lisenceNumber}</p>
            <p><strong>Report Type:</strong> ${userData.packageName}</p>
          </div>
          
          <p>Your vehicle report will be generated and sent to you shortly. If you have any questions, please contact our support team.</p>
          
          <p>Thank you for choosing our service!</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} The Vehicle Audit. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const adminEmailTemplate = (orderDetails, userData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Order Notification</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0046be; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; border: 1px solid #ddd; border-top: none; }
        .section { margin-bottom: 20px; }
        .section-title { background-color: #f8f9fa; padding: 10px; border-left: 4px solid #0046be; }
        .info-table { width: 100%; border-collapse: collapse; }
        .info-table th, .info-table td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
        .info-table th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Vehicle Report Order Received</h1>
        </div>
        <div class="content">
          <div class="section">
            <div class="section-title">
              <h2>Order & Payment Details</h2>
            </div>
            <table class="info-table">
              <tr><th>Order ID:</th><td>${orderDetails.id}</td></tr>
              <tr><th>Date:</th><td>${new Date().toLocaleString()}</td></tr>
              <tr><th>Payment Method:</th><td>PayPal</td></tr>
              <tr><th>Report Package:</th><td>${userData.packageName}</td></tr>
            </table>
          </div>
          
          <div class="section">
            <div class="section-title">
              <h2>Customer Information</h2>
            </div>
            <table class="info-table">
              <tr><th>Name:</th><td>${userData.firstName} ${userData.lastName}</td></tr>
              <tr><th>Email:</th><td>${userData.email}</td></tr>
              <tr><th>Phone:</th><td>${userData.phoneNumber}</td></tr>
              <tr><th>Company:</th><td>${userData.company || 'Not provided'}</td></tr>
            </table>
          </div>
          
          <div class="section">
            <div class="section-title">
              <h2>Billing Address</h2>
            </div>
            <table class="info-table">
              <tr><th>Address:</th><td>${userData.billingAddress}</td></tr>
              <tr><th>City:</th><td>${userData.city}</td></tr>
              <tr><th>State:</th><td>${userData.state}</td></tr>
              <tr><th>Postal Code:</th><td>${userData.postalCode}</td></tr>
              <tr><th>Country:</th><td>${userData.country}</td></tr>
            </table>
          </div>
          
          <div class="section">
            <div class="section-title">
              <h2>Vehicle Information</h2>
            </div>
            <table class="info-table">
              <tr><th>VIN:</th><td>${userData.vin}</td></tr>
              <tr><th>License Plate:</th><td>${userData.lisenceNumber}</td></tr>
              <tr><th>Registration State:</th><td>${userData.registrationState || 'Not provided'}</td></tr>
            </table>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};
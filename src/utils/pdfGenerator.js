import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (invoiceData) => {
  // 创建一个临时的预览元素
  const previewElement = document.createElement('div');
  previewElement.style.position = 'absolute';
  previewElement.style.left = '-9999px';
  previewElement.style.width = '210mm'; // A4宽度
  previewElement.style.backgroundColor = 'white';
  previewElement.style.padding = '20px';
  document.body.appendChild(previewElement);

  // 创建发票内容
  previewElement.innerHTML = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <!-- 头部 -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div>
          <div style="width: 80px; height: 80px; background-color: #f8f8f8; display: flex; align-items: center; justify-content: center; color: #2196f3; font-weight: bold;">Logo</div>
          <h2 style="margin-top: 10px; margin-bottom: 5px;">${invoiceData.companyName}</h2>
          <p style="margin: 2px 0;">${invoiceData.companyContact}</p>
          <p style="margin: 2px 0;">${invoiceData.companyAddress}</p>
          <p style="margin: 2px 0;">${invoiceData.companyPhone} | ${invoiceData.companyEmail}</p>
          <p style="margin: 2px 0;">SIRET: ${invoiceData.companySiret}</p>
          <p style="margin: 2px 0;">VAT: ${invoiceData.companyVat}</p>
        </div>
        <div style="text-align: right;">
          <h3 style="color: #2196f3; margin-bottom: 5px;">${invoiceData.invoiceNumber}</h3>
          <h2 style="margin-top: 40px; margin-bottom: 5px;">Total Amount</h2>
          <h2 style="font-weight: bold; margin-top: 5px;">${invoiceData.currency}${invoiceData.totalPrice.toFixed(2)}</h2>
        </div>
      </div>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

      <!-- 账单信息 -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
        <div style="width: 35%;">
          <div style="background-color: #f8f8f8; padding: 15px; margin-bottom: 10px;">
            <p style="font-size: 12px; margin: 0 0 5px 0; color: #666;">Bill Date</p>
            <p style="font-size: 14px; margin: 0;">${invoiceData.billDate}</p>
          </div>
          <div style="background-color: #f8f8f8; padding: 15px; margin-bottom: 10px;">
            <p style="font-size: 12px; margin: 0 0 5px 0; color: #666;">Delivery Date</p>
            <p style="font-size: 14px; margin: 0;">${invoiceData.deliveryDate}</p>
          </div>
          <div style="background-color: #f8f8f8; padding: 15px; margin-bottom: 10px;">
            <p style="font-size: 12px; margin: 0 0 5px 0; color: #666;">Terms of Payment</p>
            <p style="font-size: 14px; margin: 0;">${invoiceData.paymentTerms}</p>
          </div>
          <div style="background-color: #f8f8f8; padding: 15px;">
            <p style="font-size: 12px; margin: 0 0 5px 0; color: #666;">Payment Deadline</p>
            <p style="font-size: 14px; margin: 0;">${invoiceData.paymentDeadline}</p>
          </div>
        </div>

        <div style="width: 60%;">
          <p style="font-size: 14px; margin: 0 0 10px 0; color: #666;">Billing Address</p>
          <h3 style="margin: 0 0 5px 0;">${invoiceData.customerName}</h3>
          <p style="margin: 2px 0;">${invoiceData.customerAddress}</p>
          <p style="margin: 2px 0;">${invoiceData.customerPhone} | ${invoiceData.customerEmail}</p>
          <p style="margin: 2px 0;">SIRET: ${invoiceData.customerSiret}</p>
          <p style="margin: 2px 0;">VAT: ${invoiceData.customerVat}</p>
          
          <div style="margin-top: 20px;">
            <p style="font-size: 14px; margin: 0 0 10px 0; color: #666;">Note</p>
            <p style="margin: 0;">${invoiceData.note}</p>
          </div>
        </div>
      </div>

      <!-- 产品表格 -->
      <table style="width: 100%; border-collapse: collapse; margin: 30px 0;">
        <thead>
          <tr style="background-color: #f8f8f8;">
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">NO.</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">ARTICLE</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">QUANTITY</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">UNIT PRICE</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">VAT</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">AMOUNT</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">FINAL AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceData.products.map((product, index) => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">${index + 1}</td>
              <td style="border: 1px solid #ddd; padding: 10px;">
                <p style="margin: 0 0 5px 0;">${product.name}</p>
                <p style="margin: 0; font-size: 12px; color: #666;">${product.description}</p>
              </td>
              <td style="border: 1px solid #ddd; padding: 10px;">${product.quantity} ${product.unit}</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${invoiceData.currency}${product.price}</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${product.vat}%</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${invoiceData.currency}${product.amount}</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${invoiceData.currency}${product.finalAmount}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- 总计 -->
      <div style="display: flex; justify-content: flex-end;">
        <div style="width: 300px;">
          <div style="display: flex; justify-content: space-between; padding: 5px 0;">
            <p style="margin: 0;">Total HT</p>
            <p style="margin: 0;">${invoiceData.currency}${invoiceData.totalHT}</p>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 5px 0;">
            <p style="margin: 0;">Total Disbursements</p>
            <p style="margin: 0;">${invoiceData.currency}${invoiceData.totalDisbursements}</p>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 5px 0;">
            <p style="margin: 0;">Total VAT</p>
            <p style="margin: 0;">${invoiceData.currency}${invoiceData.totalVAT}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;" />
          <div style="display: flex; justify-content: space-between; padding: 5px 0; font-weight: bold;">
            <p style="margin: 0;">Total Price</p>
            <p style="margin: 0;">${invoiceData.currency}${invoiceData.totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  try {
    // 使用html2canvas将HTML转换为canvas
    const canvas = await html2canvas(previewElement, {
      scale: 2, // 提高清晰度
      useCORS: true,
      logging: false
    });

    // 创建PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4宽度，单位mm
    const pageHeight = 297; // A4高度，单位mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // 添加第一页
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // 如果内容超过一页，添加更多页面
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // 保存PDF
    pdf.save(`invoice_${invoiceData.invoiceNumber.replace(/[^\w]/g, '_')}.pdf`);
  } catch (error) {
    console.error('PDF生成失败:', error);
    alert('PDF生成失败，请重试');
  } finally {
    // 清理临时元素
    document.body.removeChild(previewElement);
  }
};
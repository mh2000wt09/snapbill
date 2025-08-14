import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, Grid, Button } from '@mui/material';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';
import { generatePDF } from '../utils/pdfGenerator';

function MainApp() {
  const [language, setLanguage] = useState('zh-CN');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'zh-CN';
    setLanguage(savedLanguage);
  }, []);

  const getText = (key) => {
    const texts = {
      'zh-CN': {
        title: '订单生成系统',
        editOrder: '编辑订单',
        viewPreview: '查看预览',
        fillOrderInfo: '填写订单信息',
        orderPreview: '订单预览',
        downloadPDF: '下载PDF'
      },
      'zh-TW': {
        title: '訂單生成系統',
        editOrder: '編輯訂單',
        viewPreview: '查看預覽',
        fillOrderInfo: '填寫訂單信息',
        orderPreview: '訂單預覽',
        downloadPDF: '下載PDF'
      },
      'en': {
        title: 'Order Generation System',
        editOrder: 'Edit Order',
        viewPreview: 'View Preview',
        fillOrderInfo: 'Fill Order Information',
        orderPreview: 'Order Preview',
        downloadPDF: 'Download PDF'
      }
    };
    return texts[language][key];
  };
  const [invoiceData, setInvoiceData] = useState({
    // 公司信息
    companyName: 'Sisyphus',
    companyContact: 'John Brandon',
    companyAddress: '789/1 Sector-2c, 38200 Gandhinagar, France',
    companyPhone: '8481721234',
    companyEmail: 'contact@betao.se',
    companySiret: '362 521 879 00034',
    companyVat: '842-484021',
    invoiceNumber: '#2020-05-0001',
    
    // 客户信息
    customerName: 'Willy Wonka',
    customerAddress: '1445 West Norwood Avenue, Itasca, Illinois, USA',
    customerPhone: '9722304154',
    customerEmail: 'om@om.com',
    customerSiret: '362 521 879 00034',
    customerVat: '842-484021',
    
    // 订单信息
    billDate: '03/05/2020',
    deliveryDate: '03/05/2020',
    paymentTerms: 'Within 15 days',
    paymentDeadline: '05/18/2020',
    note: 'This is a custom message that might be relevant to the customer. It can span up to three or four rows.',
    
    // 产品信息
    products: [
      { id: 1, name: 'Product Name', description: 'Product Description', quantity: 150, unit: 'Unit(s)', price: 20, vat: 0, amount: 3000, finalAmount: 3000 },
      { id: 2, name: 'Product Name', description: 'Product Description', quantity: 150, unit: 'Unit(s)', price: 20, vat: 0, amount: 3000, finalAmount: 3000 },
      { id: 3, name: 'Product Name', description: 'Product Description', quantity: 150, unit: 'Unit(s)', price: 20, vat: 0, amount: 3000, finalAmount: 3000 }
    ],
    
    // 总计
    totalHT: 3000,
    totalDisbursements: 30,
    totalVAT: 0,
    totalPrice: 3030.00,
    currency: '€'
  });

  const handleFormChange = (newData) => {
    setInvoiceData({...invoiceData, ...newData});
  };

  const handleProductChange = (products) => {
    // 计算总金额
    const totalHT = products.reduce((sum, product) => sum + product.amount, 0);
    const totalPrice = totalHT + invoiceData.totalDisbursements;
    
    setInvoiceData({
      ...invoiceData, 
      products, 
      totalHT,
      totalPrice
    });
  };

  const handleDownloadPDF = () => {
    generatePDF(invoiceData);
  };

  return (
    <Container maxWidth="lg" className="app-container">
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mt: 4, mb: 4 }}>
        {getText('title')}
      </Typography>
      
      {/* 移动设备导航 */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button 
                fullWidth 
                variant="contained" 
                color="primary"
                onClick={() => document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' })}
              >
                {getText('editOrder')}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                fullWidth 
                variant="contained" 
                color="secondary"
                onClick={() => document.getElementById('preview-section').scrollIntoView({ behavior: 'smooth' })}
              >
                {getText('viewPreview')}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={5} id="form-section">
          <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {getText('fillOrderInfo')}
            </Typography>
            <InvoiceForm 
              invoiceData={invoiceData} 
              onFormChange={handleFormChange}
              onProductChange={handleProductChange}
              language={language}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={7} id="preview-section">
          <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap">
              <Typography variant="h5" component="h2" sx={{ mb: { xs: 1, md: 0 } }}>
                {getText('orderPreview')}
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleDownloadPDF}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                {getText('downloadPDF')}
              </Button>
            </Box>
            <InvoicePreview invoiceData={invoiceData} language={language} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MainApp;
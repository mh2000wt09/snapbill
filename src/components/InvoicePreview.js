import React from 'react';
import { Paper, Typography, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const InvoicePreview = ({ invoiceData, language = 'zh-CN' }) => {

  const getText = (key) => {
    const texts = {
      'zh-CN': {
        invoice: '订单',
        companyInfo: '公司信息',
        customerInfo: '客户信息',
        invoiceNumber: '订单编号',
        billDate: '账单日期',
        deliveryDate: '交付日期',
        paymentTerms: '付款条款',
        paymentDeadline: '付款截止日期',
        note: '备注',
        productList: '产品列表',
        productName: '产品名称',
        productDescription: '产品描述',
        quantity: '数量',
        price: '单价',
        amount: '金额',
        vat: '增值税',
        finalAmount: '最终金额',
        totalHT: '总计不含税',
        disbursements: '杂费',
        totalVAT: '增值税',
        totalPrice: '总计金额',
        thankYou: '感谢您的合作！'
      },
      'zh-TW': {
        invoice: '訂單',
        companyInfo: '公司信息',
        customerInfo: '客戶信息',
        invoiceNumber: '訂單編號',
        billDate: '賬單日期',
        deliveryDate: '交付日期',
        paymentTerms: '付款條款',
        paymentDeadline: '付款截止日期',
        note: '備註',
        productList: '產品列表',
        productName: '產品名稱',
        productDescription: '產品描述',
        quantity: '數量',
        price: '單價',
        amount: '金額',
        vat: '增值稅',
        finalAmount: '最終金額',
        totalHT: '總計不含稅',
        disbursements: '雜費',
        totalVAT: '增值稅',
        totalPrice: '總計金額',
        thankYou: '感謝您的合作！'
      },
      'en': {
        invoice: 'Invoice',
        companyInfo: 'Company Information',
        customerInfo: 'Customer Information',
        invoiceNumber: 'Invoice Number',
        billDate: 'Bill Date',
        deliveryDate: 'Delivery Date',
        paymentTerms: 'Payment Terms',
        paymentDeadline: 'Payment Deadline',
        note: 'Note',
        productList: 'Product List',
        productName: 'Product Name',
        productDescription: 'Product Description',
        quantity: 'Quantity',
        price: 'Unit Price',
        amount: 'Amount',
        vat: 'VAT',
        finalAmount: 'Final Amount',
        totalHT: 'Total (Excl. Tax)',
        disbursements: 'Disbursements',
        totalVAT: 'VAT',
        totalPrice: 'Total Amount',
        thankYou: 'Thank you for your business!'
      }
    };
    return texts[language][key];
  };

  return (
    <Paper elevation={0} className="invoice-preview-container">
      {/* 头部 */}
      <Box className="invoice-header">
        <Box>
          <Box className="company-logo" sx={{ bgcolor: '#f8f8f8', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="primary">Logo</Typography>
          </Box>
          <Typography variant="h5" sx={{ mt: 1 }}>{invoiceData.companyName}</Typography>
          <Typography variant="body2">{invoiceData.companyContact}</Typography>
          <Typography variant="body2">{invoiceData.companyAddress}</Typography>
          <Typography variant="body2">{invoiceData.companyPhone} | {invoiceData.companyEmail}</Typography>
          <Typography variant="body2">SIRET: {invoiceData.companySiret}</Typography>
          <Typography variant="body2">VAT: {invoiceData.companyVat}</Typography>
        </Box>
        <Box textAlign="right">
          <Typography variant="h6" color="primary">{invoiceData.invoiceNumber}</Typography>
          <Typography variant="h4" sx={{ mt: 4 }}>
            {getText('totalPrice')}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {invoiceData.currency}{invoiceData.totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 账单信息 */}
      <Box className="invoice-info-section">
        <Box>
          <Box sx={{ bgcolor: '#f8f8f8', p: 2, mb: 2 }}>
            <Typography variant="subtitle2">{getText('billDate')}</Typography>
            <Typography variant="body1">{invoiceData.billDate}</Typography>
          </Box>
          <Box sx={{ bgcolor: '#f8f8f8', p: 2, mb: 2 }}>
            <Typography variant="subtitle2">{getText('deliveryDate')}</Typography>
            <Typography variant="body1">{invoiceData.deliveryDate}</Typography>
          </Box>
          <Box sx={{ bgcolor: '#f8f8f8', p: 2 }}>
            <Typography variant="subtitle2">{getText('paymentTerms')}</Typography>
            <Typography variant="body1">{invoiceData.paymentTerms}</Typography>
          </Box>
          <Box sx={{ bgcolor: '#f8f8f8', p: 2, mt: 2 }}>
            <Typography variant="subtitle2">{getText('paymentDeadline')}</Typography>
            <Typography variant="body1">{invoiceData.paymentDeadline}</Typography>
          </Box>
        </Box>

        <Box sx={{ width: '60%' }}>
          <Typography variant="subtitle1">{getText('customerInfo')}</Typography>
          <Typography variant="h6">{invoiceData.customerName}</Typography>
          <Typography variant="body2">{invoiceData.customerAddress}</Typography>
          <Typography variant="body2">{invoiceData.customerPhone} | {invoiceData.customerEmail}</Typography>
          <Typography variant="body2">SIRET: {invoiceData.customerSiret}</Typography>
          <Typography variant="body2">VAT: {invoiceData.customerVat}</Typography>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">{getText('note')}</Typography>
            <Typography variant="body2">{invoiceData.note}</Typography>
          </Box>
        </Box>
      </Box>

      {/* 产品表格 - 桌面版 */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <TableContainer sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="5%">NO.</TableCell>
                <TableCell width="40%">{getText('productName')}</TableCell>
                <TableCell width="10%">{getText('quantity')}</TableCell>
                <TableCell width="10%">{getText('price')}</TableCell>
                <TableCell width="5%">{getText('vat')}</TableCell>
                <TableCell width="15%">{getText('amount')}</TableCell>
                <TableCell width="15%">{getText('finalAmount')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceData.products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Typography variant="body1">{product.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                  </TableCell>
                  <TableCell>
                    {product.quantity} {product.unit}
                  </TableCell>
                  <TableCell>{invoiceData.currency}{product.price}</TableCell>
                  <TableCell>{product.vat}%</TableCell>
                  <TableCell>{invoiceData.currency}{product.amount}</TableCell>
                  <TableCell>{invoiceData.currency}{product.finalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
      {/* 产品表格 - 移动版 */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 4 }}>
        {invoiceData.products.map((product, index) => (
          <Paper key={product.id} elevation={1} sx={{ mb: 2, p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {index + 1}. {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              {product.description}
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">{getText('quantity')}:</Typography>
              <Typography variant="body2">{product.quantity} {product.unit}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">{getText('price')}:</Typography>
              <Typography variant="body2">{invoiceData.currency}{product.price}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">{getText('vat')}:</Typography>
              <Typography variant="body2">{product.vat}%</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">{getText('amount')}:</Typography>
              <Typography variant="body2">{invoiceData.currency}{product.amount}</Typography>
            </Box>
            
            <Divider sx={{ my: 1 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">{getText('finalAmount')}:</Typography>
              <Typography variant="subtitle2" fontWeight="bold">{invoiceData.currency}{product.finalAmount}</Typography>
            </Box>
          </Paper>
         ))}
      </Box>

      {/* 总计 - 响应式设计 */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Box sx={{ width: { xs: '100%', sm: 300 }, maxWidth: '100%' }}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography>{getText('totalHT')}</Typography>
              <Typography>{invoiceData.currency}{invoiceData.totalHT}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography>{getText('disbursements')}</Typography>
              <Typography>{invoiceData.currency}{invoiceData.totalDisbursements}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography>{getText('totalVAT')}</Typography>
              <Typography>{invoiceData.currency}{invoiceData.totalVAT}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="h6" fontWeight="bold">{getText('totalPrice')}</Typography>
              <Typography variant="h6" fontWeight="bold">{invoiceData.currency}{invoiceData.totalPrice.toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
      {/* 致谢 - 响应式设计 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Typography variant="h6" align="center" sx={{ mt: 3, mb: 2 }}>
          {getText('thankYou')}
        </Typography>
      </Box>
    </Paper>
  );
};

export default InvoicePreview;
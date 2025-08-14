import React from 'react';
import { 
  TextField, 
  Grid, 
  Typography, 
  Divider, 
  Button,
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const InvoiceForm = ({ invoiceData, onFormChange, onProductChange, language = 'zh-CN' }) => {
  
  const getText = (key) => {
    const texts = {
      'zh-CN': {
        companyInfo: '公司信息',
        companyName: '公司名称',
        companyContact: '联系人',
        companyAddress: '地址',
        companyPhone: '电话',
        companyEmail: '邮箱',
        companySiret: 'SIRET',
        companyVat: 'VAT',
        invoiceNumber: '订单编号',
        customerInfo: '客户信息',
        customerName: '客户名称',
        customerAddress: '地址',
        customerPhone: '电话',
        customerEmail: '邮箱',
        customerSiret: 'SIRET',
        customerVat: 'VAT',
        orderInfo: '订单信息',
        billDate: '账单日期',
        deliveryDate: '交付日期',
        paymentTerms: '付款条款',
        paymentDeadline: '付款截止日期',
        note: '备注',
        productInfo: '产品信息',
        addProduct: '添加产品',
        productName: '产品名称',
        productDescription: '产品描述',
        quantity: '数量',
        price: '单价',
        amount: '金额',
        action: '操作',
        totalInfo: '总计信息',
        disbursements: '杂费',
        totalHT: '总计不含税',
        totalVAT: '增值税',
        totalPrice: '总计金额',
        currency: '货币符号'
      },
      'zh-TW': {
        companyInfo: '公司信息',
        companyName: '公司名稱',
        companyContact: '聯繫人',
        companyAddress: '地址',
        companyPhone: '電話',
        companyEmail: '郵箱',
        companySiret: 'SIRET',
        companyVat: 'VAT',
        invoiceNumber: '訂單編號',
        customerInfo: '客戶信息',
        customerName: '客戶名稱',
        customerAddress: '地址',
        customerPhone: '電話',
        customerEmail: '郵箱',
        customerSiret: 'SIRET',
        customerVat: 'VAT',
        orderInfo: '訂單信息',
        billDate: '賬單日期',
        deliveryDate: '交付日期',
        paymentTerms: '付款條款',
        paymentDeadline: '付款截止日期',
        note: '備註',
        productInfo: '產品信息',
        addProduct: '添加產品',
        productName: '產品名稱',
        productDescription: '產品描述',
        quantity: '數量',
        price: '單價',
        amount: '金額',
        action: '操作',
        totalInfo: '總計信息',
        disbursements: '雜費',
        totalHT: '總計不含稅',
        totalVAT: '增值稅',
        totalPrice: '總計金額',
        currency: '貨幣符號'
      },
      'en': {
        companyInfo: 'Company Information',
        companyName: 'Company Name',
        companyContact: 'Contact Person',
        companyAddress: 'Address',
        companyPhone: 'Phone',
        companyEmail: 'Email',
        companySiret: 'SIRET',
        companyVat: 'VAT',
        invoiceNumber: 'Invoice Number',
        customerInfo: 'Customer Information',
        customerName: 'Customer Name',
        customerAddress: 'Address',
        customerPhone: 'Phone',
        customerEmail: 'Email',
        customerSiret: 'SIRET',
        customerVat: 'VAT',
        orderInfo: 'Order Information',
        billDate: 'Bill Date',
        deliveryDate: 'Delivery Date',
        paymentTerms: 'Payment Terms',
        paymentDeadline: 'Payment Deadline',
        note: 'Note',
        productInfo: 'Product Information',
        addProduct: 'Add Product',
        productName: 'Product Name',
        productDescription: 'Product Description',
        quantity: 'Quantity',
        price: 'Unit Price',
        amount: 'Amount',
        action: 'Action',
        totalInfo: 'Total Information',
        disbursements: 'Disbursements',
        totalHT: 'Total (Excl. Tax)',
        totalVAT: 'VAT',
        totalPrice: 'Total Amount',
        currency: 'Currency Symbol'
      }
    };
    return texts[language][key];
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };
  
  const calculateTotal = () => {
    const totalHT = invoiceData.products.reduce((sum, product) => sum + product.amount, 0);
    const totalVAT = 0; // 如果需要计算增值税，可以在这里添加逻辑
    const totalPrice = totalHT + invoiceData.totalDisbursements + totalVAT;
    
    return {
      totalHT,
      totalVAT,
      totalPrice
    };
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...invoiceData.products];
    updatedProducts[index][field] = value;
    
    // 如果更改了数量或价格，重新计算金额
    if (field === 'quantity' || field === 'price') {
      const quantity = field === 'quantity' ? value : updatedProducts[index].quantity;
      const price = field === 'price' ? value : updatedProducts[index].price;
      updatedProducts[index].amount = quantity * price;
      updatedProducts[index].finalAmount = updatedProducts[index].amount;
    }
    
    onProductChange(updatedProducts);
  };

  const addProduct = () => {
    const newProduct = {
      id: invoiceData.products.length + 1,
      name: '',
      description: '',
      quantity: 0,
      unit: 'Unit(s)',
      price: 0,
      vat: 0,
      amount: 0,
      finalAmount: 0
    };
    onProductChange([...invoiceData.products, newProduct]);
  };

  const removeProduct = (index) => {
    const updatedProducts = invoiceData.products.filter((_, i) => i !== index);
    onProductChange(updatedProducts);
  };

  return (
    <div>
      <Grid container spacing={3}>
        {/* 公司信息 */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>{getText('companyInfo')}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={getText('companyName')}
                name="companyName"
                value={invoiceData.companyName}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={getText('companyContact')}
                name="companyContact"
                value={invoiceData.companyContact}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={getText('companyAddress')}
                name="companyAddress"
                value={invoiceData.companyAddress}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={getText('companyPhone')}
                name="companyPhone"
                value={invoiceData.companyPhone}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={getText('companyEmail')}
                name="companyEmail"
                value={invoiceData.companyEmail}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={getText('companySiret')}
                name="companySiret"
                value={invoiceData.companySiret}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={getText('companyVat')}
                name="companyVat"
                value={invoiceData.companyVat}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={getText('invoiceNumber')}
                name="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* 客户信息 */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>{getText('customerInfo')}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={getText('customerName')}
                name="customerName"
                value={invoiceData.customerName}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={getText('customerAddress')}
                name="customerAddress"
                value={invoiceData.customerAddress}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={getText('customerPhone')}
                name="customerPhone"
                value={invoiceData.customerPhone}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={getText('customerEmail')}
                name="customerEmail"
                value={invoiceData.customerEmail}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={getText('customerSiret')}
                name="customerSiret"
                value={invoiceData.customerSiret}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={getText('customerVat')}
                name="customerVat"
                value={invoiceData.customerVat}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* 订单信息 */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>{getText('orderInfo')}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={getText('billDate')}
                name="billDate"
                value={invoiceData.billDate}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={getText('deliveryDate')}
                name="deliveryDate"
                value={invoiceData.deliveryDate}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={getText('paymentTerms')}
                name="paymentTerms"
                value={invoiceData.paymentTerms}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={getText('paymentDeadline')}
                name="paymentDeadline"
                value={invoiceData.paymentDeadline}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={getText('note')}
                name="note"
                value={invoiceData.note}
                onChange={handleChange}
                variant="outlined"
                size="small"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* 产品信息 */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" gutterBottom>{getText('productInfo')}</Typography>
            <Button 
              startIcon={<AddIcon />} 
              onClick={addProduct}
              variant="outlined"
              size="small"
            >
              {getText('addProduct')}
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          
          {/* 桌面版产品表格 */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell width="40%">{getText('productName')}</TableCell>
                    <TableCell width="15%">{getText('quantity')}</TableCell>
                    <TableCell width="15%">{getText('price')} ({invoiceData.currency})</TableCell>
                    <TableCell width="15%">{getText('amount')} ({invoiceData.currency})</TableCell>
                    <TableCell width="15%">{getText('action')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceData.products.map((product, index) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={product.name}
                          onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                          variant="outlined"
                          size="small"
                          sx={{ minWidth: '250px' }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={product.quantity}
                          onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value) || 0)}
                          variant="outlined"
                          size="small"
                          inputProps={{ min: 0 }}
                          sx={{ width: '80px' }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={product.price}
                          onChange={(e) => handleProductChange(index, 'price', parseInt(e.target.value) || 0)}
                          variant="outlined"
                          size="small"
                          inputProps={{ min: 0 }}
                          sx={{ width: '80px' }}
                        />
                      </TableCell>
                      <TableCell>
                        {product.amount}
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={() => removeProduct(index)}
                          disabled={invoiceData.products.length <= 1}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          
          {/* 移动版产品卡片 */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            {invoiceData.products.map((product, index) => (
              <Paper key={product.id} elevation={1} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1">产品 #{index + 1}</Typography>
                  <IconButton 
                    size="small" 
                    color="error" 
                    onClick={() => removeProduct(index)}
                    disabled={invoiceData.products.length <= 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={getText('productName')}
                      value={product.name}
                      onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={getText('productDescription')}
                      value={product.description}
                      onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                      variant="outlined"
                      size="small"
                      multiline
                      rows={2}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label={getText('quantity')}
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      variant="outlined"
                      size="small"
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label={getText('price')}
                      type="number"
                      value={product.price}
                      onChange={(e) => handleProductChange(index, 'price', parseInt(e.target.value) || 0)}
                      variant="outlined"
                      size="small"
                      inputProps={{ min: 0 }}
                      InputProps={{
                        startAdornment: <span>{invoiceData.currency}</span>,
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 2, p: 1, bgcolor: '#f5f5f5', borderRadius: 1, textAlign: 'right' }}>
                  <Typography variant="subtitle2">
                    {getText('amount')}: {invoiceData.currency}{product.amount}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Grid>

        {/* 总计信息 */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>{getText('totalInfo')}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={getText('disbursements')}
                  name="totalDisbursements"
                  type="number"
                  value={invoiceData.totalDisbursements}
                  onChange={(e) => onFormChange({ totalDisbursements: parseInt(e.target.value) || 0 })}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: <span>{invoiceData.currency}</span>,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2">{getText('totalHT')}:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" align="right">{invoiceData.currency}{calculateTotal().totalHT}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{getText('disbursements')}:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" align="right">{invoiceData.currency}{invoiceData.totalDisbursements}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{getText('totalVAT')}:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" align="right">{invoiceData.currency}{calculateTotal().totalVAT}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" fontWeight="bold">{getText('totalPrice')}:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" fontWeight="bold" align="right">{invoiceData.currency}{calculateTotal().totalPrice}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={getText('currency')}
                name="currency"
                value={invoiceData.currency}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default InvoiceForm;
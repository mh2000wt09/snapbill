import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Divider,
  Avatar,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import { Visibility, VisibilityOff, Description, Receipt, PictureAsPdf, ArrowForward, Language } from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'zh-CN'); // 从本地存储加载语言设置

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // 简单的验证，实际应用中应该连接到后端验证
    if (formData.username && formData.password) {
      // 登录成功，跳转到主应用页面
      navigate('/app');
    } else {
      setError(getText('errorMessage'));
      setOpenSnackbar(true);
    };
  };

  const handleGoToApp = () => {
    // 直接跳转到主应用页面，不需要登录
    navigate('/app');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // 根据当前语言获取文本
  const getText = (key) => {
    const texts = {
      'zh-CN': {
        appName: 'SnapBill',
        title: '随时随地，生成你的交易订单',
        subtitle: '没有电脑？没关系。SnapBill 让你用手机轻松创建订单，生成专业PDF，让交易确认更高效、更轻量化。',
        feature1Title: '手机操作',
        feature1Desc: '无需电脑，手机即可创建专业订单，随时随地处理业务',
        feature2Title: '一键生成PDF',
        feature2Desc: '自动排版，生成专业PDF订单文件，提升企业形象',
        feature3Title: '高效确认',
        feature3Desc: '生成专业PDF文件，让交易确认更高效、更轻量化',
        loginTitle: '账号登录',
        loginSubtitle: '登录后体验更多功能',
        username: '用户名',
        password: '密码',
        login: '登录',
        or: '或者',
        useWithoutLogin: '立即创建订单',
        copyright: `© ${new Date().getFullYear()} SnapBill. 保留所有权利。`,
        errorMessage: '请输入用户名和密码'
      },
      'zh-TW': {
        appName: 'SnapBill',
        title: '隨時隨地，生成你的交易訂單',
        subtitle: '沒有電腦？沒關係。SnapBill 讓你用手機輕鬆創建訂單，生成專業PDF，讓交易確認更高效、更輕量化。',
        feature1Title: '手機操作',
        feature1Desc: '無需電腦，手機即可創建專業訂單，隨時隨地處理業務',
        feature2Title: '一鍵生成PDF',
        feature2Desc: '自動排版，生成專業PDF訂單文件，提升企業形象',
        feature3Title: '高效確認',
        feature3Desc: '生成專業PDF文件，讓交易確認更高效、更輕量化',
        loginTitle: '賬號登錄',
        loginSubtitle: '登錄後體驗更多功能',
        username: '用戶名',
        password: '密碼',
        login: '登錄',
        or: '或者',
        useWithoutLogin: '立即創建訂單',
        copyright: `© ${new Date().getFullYear()} SnapBill. 保留所有權利。`,
        errorMessage: '請輸入用戶名和密碼'
      },
      'en': {
        appName: 'SnapBill',
        title: 'Create Orders Anytime, Anywhere',
        subtitle: 'No computer? No problem. SnapBill lets you create orders on your phone and generate professional PDFs - making business transactions faster and more lightweight.',
        feature1Title: 'Mobile First',
        feature1Desc: 'Create professional orders directly from your phone, anytime and anywhere',
        feature2Title: 'One-Click PDF',
        feature2Desc: 'Automatically format and generate professional PDF order documents',
        feature3Title: 'Efficient Confirmation',
        feature3Desc: 'Generate professional PDF documents for faster and more lightweight transaction confirmation',
        loginTitle: 'Account Login',
        loginSubtitle: 'Experience more features after login',
        username: 'Username',
        password: 'Password',
        login: 'Login',
        or: 'OR',
        useWithoutLogin: 'Create Order Now',
        copyright: `© ${new Date().getFullYear()} SnapBill. All rights reserved.`,
        errorMessage: 'Please enter username and password'
      }
    };
    return texts[language][key];
  };

  // 特性列表
  const features = [
    { 
      icon: <Description sx={{ fontSize: 40, color: '#1976d2' }} />, 
      title: getText('feature1Title'), 
      description: getText('feature1Desc') 
    },
    { 
      icon: <Receipt sx={{ fontSize: 40, color: '#1976d2' }} />, 
      title: getText('feature2Title'), 
      description: getText('feature2Desc') 
    },
    { 
      icon: <PictureAsPdf sx={{ fontSize: 40, color: '#1976d2' }} />, 
      title: getText('feature3Title'), 
      description: getText('feature3Desc') 
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: '#f8f9fa'
    }}>
      {/* 顶部导航栏 */}
      <Box sx={{ 
        py: 2, 
        px: 4, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #eaeaea',
        bgcolor: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#1976d2',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Receipt sx={{ mr: 1, fontSize: 32 }} /> {getText('appName')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={language}
              onChange={handleLanguageChange}
              displayEmpty
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <Language fontSize="small" />
                </InputAdornment>
              }
            >
              <MenuItem value="zh-CN">中文（简体）</MenuItem>
              <MenuItem value="zh-TW">中文（繁體）</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* 主要内容区 */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 6 }}>
        <Grid container spacing={4}>
          {/* 左侧内容 */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                {getText('title')}
              </Typography>
              <Typography variant="h5" sx={{ color: '#666', mb: 2, lineHeight: 1.5 }}>
                {getText('subtitle')}
              </Typography>
            </Box>

            {/* 特性卡片 */}
            <Grid container spacing={2} sx={{ mt: 0 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} key={index}>
                  <Card elevation={1} sx={{ borderRadius: 2, height: '100%' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 2 }}>
                        {feature.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* 右侧登录卡片 */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 4,
                background: 'white',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56 }}>
                  <Receipt sx={{ fontSize: 30 }} />
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    {getText('loginTitle')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getText('loginSubtitle')}
                  </Typography>
                </Box>
              </Box>
              
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label={getText('username')}
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label={getText('password')}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  sx={{ mb: 3 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ py: 1.5 }}
                >
                  {getText('login')}
                </Button>
              </form>
              
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  {getText('or')}
                </Typography>
              </Divider>
              
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                size="large"
                onClick={handleGoToApp}
                sx={{ py: 1.5 }}
              >
                {getText('useWithoutLogin')}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* 页脚 */}
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          textAlign: 'center', 
          borderTop: '1px solid #eaeaea',
          mt: 'auto',
          bgcolor: 'white'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {getText('copyright')}
        </Typography>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
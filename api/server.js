const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

// 中间件：解析 JSON 请求体
app.use(express.json());

// 示例根路由
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
  });

// 创建存储目录（如果不存在）
const storageDir = path.join(__dirname, 'storage', 'papers');
if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true });
}

// 文件下载接口
app.get('/download/papers/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(storageDir, filename);
  console.log(filePath)
  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  // 设置响应头：强制下载而非预览
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.sendFile(filePath);
});


// 启动服务器
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
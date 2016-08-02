const http=require('http');
const url=require('url');
const path=require('path');
const fs=require('fs');
const mime=require('./mime');
// 配置
const basePath='';  // 文件存放目录
const port=8080;  // 端口

var server=http.createServer(function(req,res){
	var fullpath=req.url;
	var realpath=path.join('./',basePath,fullpath);
	var ext=path.extname(realpath);
	if(!ext) realpath=path.join(realpath,'index.html');
	fs.stat(realpath,function(err,stats){
		if(err){
			res.writeHead('404',{'content-type':'text/plain'});
			res.write("This request URL " + fullpath + " was not found on this server.");
			res.end();
		}else{
			fs.readFile(realpath,'binary',function(err,file){
				if(err){
					res.writeHead('500',{'content-type':'text/plain'});
					res.end(err);
				}else{
					var contentType=mime[path.extname(realpath).slice(1)] || 'text/plain';
					res.writeHead('200',{'content-type':contentType});
					res.write(file,'binary');
					res.end();
				}
			})
		}
	})
})

server.listen(port)
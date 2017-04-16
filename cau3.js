/**
 * duymnnps02940-lab8-MOB304
 */
var express = require('./express');
var http = require('http');
var fs = require("fs");
var app = express();
var server = http.createServer(app);
server.listen(3000);

app.get('/', sever);

function sever(req,res){
	var body = "";
	var tag;
	fs.readFile("data.txt","utf8",function(error,data){
		if(error){
			throw error;
		} else {
			body +="<h1>Quản Lí Học Sinh</h1>"
					 +'<table width="100%" border="1">'
					 +'<tr>'
					 +'<td >ID</td>'
					 +'<td>Tên</td>'
					 +'<td >Giới Tính</td>'
					 +'<td >Năm Sinh</td>'
					 +'<td >Lớp</td>'
					 +'<td >Xóa</td>'
					 +'<td >Sửa</td>'
					 +'</tr>';
			if(data != null){
				var dataList = data.split("\n");
				for(var i = 0 ; i < dataList.length - 1 ; i++){
					info = dataList[i].split(",");
					body +="<tr>"
							 + "<th>"+info[0]+"</th>"
							 + "<td>"+info[1]+"</td>"
							 + "<td>"+info[2]+"</td>"
							 + "<td >"+info[3]+"</td>"
							 + "<td >"+info[4]+"</td>"
							 + "<td ><a href='/xoatruong/"+info[0]+"'>Xóa</td>"
							 + "<td ><a href='/updateST/"+info[0]+"'>Sửa</td>"
							 + "</tr>";
				}
			body +="</table>";
			}
			var Body =+'<!DOCTYPE html>'
				+'<html>'
				+'<head>'
				+'<title>Index</title>'
				+'<meta charset="UTF-8"/>'
				+'</head>'
				+'<body>'
				+'<center>'
				+ body
				+'<a href="/them">Thêm</a>'
				+'</center>'
				+'</body>'
				+'</html>';
			res.writeHead(200, {
				'Content-Type' : 'text/html',
				'Expires' : new Date().toUTCString()
			});
			res.end(Body);
		}
	});
}

app.get('/xoatruong/:id',function(req,res){
	var id = req.params.id;
	var mang = [];
	var str = "";
	fs.readFile("data.txt","utf8",function(error, data){
		if(error){
			console.error(error);
		} else {
			if(data != null){
				mang = data.split("\n");
				for(var i = 0 ; i < mang.length ; i++){
					var rCut2 = mang[i].split(",");
					if(id == rCut2[0]){
						mang[i] = "";
							for(var j = 0; j < mang.length; j++){
								if(mang[j].toString() !== ""){
									str += mang[j] + "\n";
								}
							}
							fs.writeFile("data.txt",str.replace(/^\s+|\s+$/g, '\n'));	
					}
				}
			}
		}
	});
	res.sendStatus(200);
});

app.get('/updateST/:id',function(req,res){
	var id = req.params.id;
	var readD = [];
	var strCut = "";
	var viewBody = "";
	fs.readFile("data.txt","utf8",function(error,data){
		if(error){
			console.error(error);
		}if(data != null){
			readD = data.split("\n");
			for(var i = 0 ; i < readD.length ; i++){
				var rCut = readD[i].split(",");
				if(id == rCut[0]){
					viewBody +="<table>"
						+"<form method='post' action='/updateST/"+rCut[0]+"'>"
						+"<tr>"
						+"<td>Tên</td>"
						+"<td><input type='text' value='"+rCut[1]+"' name='f1'/></td>"
						+"</tr>"
						+"<tr>"
						+"<td>Giới Tính</td>"
						+"<td><input type='text' value='"+rCut[2]+"' name='f2'/></td>"
						+"</tr>"
						+"<tr>"
						+"<td>Năm Sinh</td>"
						+"<td><input type='text' value='"+rCut[3]+"' name='f3'/></td>"
						+"</tr>"
						+"<tr>"
						+"<td>Lớp</td>"
						+"<td><input type='text' value='"+rCut[4]+"' name='f4'/></td>"
						+"</tr>"
						+"<tr>"
						+"<td><input type='submit' value='sửa'></td>"
						+"</tr>"
						+"</form>"
						+"</table>";
					var htmlBody = '<!DOCTYPE html>'
						+'<html><head>'
						+'<title>Index</title>'
						+ '<meta charset="UTF-8"/>'
						+'<meta name="viewport" content="width=device-width, initial-scale=1">'
						+'<head>'
						+'<body>'
						+'<center>'
						+'<h1>Sửa Sinh Viên</h1>'
						+ viewBody
						+'</center>'
						+'</body>'
						+'</html>';
					res .writeHead( 200, {
						'Content-Type' : 'text/html',
						'Expires' : new Date() .toUTCString()
					});
					res.end(htmlBody);
				}
			}
		}
	});
});


app.post('/updateST/:id',function(req,res){
	var id = req.params.id;
	var str2="";
	if(req.method === 'POST'){
		var data ="";
		
		req.on('data',function(chunk){
			data += chunk;
		});
		req.on('end',function(){
			var str = data.split("&");
			var ten = str[0].split("=")[1];
			var diachi = str[1].split("=")[1];
			var sodienthoai = str[2].split("=")[1];
			var web = str[3].split("=")[1];
			fs.readFile("data.txt","utf8",function(error,data){
				if(error){
					throw error;
				} else{
					if(data != null){
						var readC = data.split("\n");
						for(var i = 0 ; i < readC.length ; i++){
							var rCut = readC[i].split(",");
							if(rCut[0] == id){
								rCut[1] = ten.replace(/\+/g, " ");
								rCut[2] = diachi.replace(/\+/g, "");
								rCut[3] = sodienthoai.replace(/\%2F/g, "/");
								rCut[4] = web.replace(/\+/g, " ");
								readC[i] = rCut.join(",");
								for(var j = 0 ; j < readC.length ; j++){
									if(readC[j].toString() !== ""){
										str2 += readC[j] + "\n";
									}
								}
								fs.writeFile("data.txt",str2);
								break;
							}
							
						}
					}
				}
			
			});
			
		});
	}
	res.sendStatus(200);
});

app.get('/them',function(req,res){
	res.sendfile('them.html');
	
});


app.post('/them', function(req, res){
	var data2 ="";
	if(req.method === 'POST'){
		var data = '' ;
		
		req.on('data', function(chunk){
			data += chunk;
		});
		
		req.on('end', function(){
		var str = data.split("&");
		var id = str[0].split("=")[1];
		var ten = str[1].split("=")[1].replace(/\+/g," ");
		var diachi = str[2].split("=")[1].replace(/\+/g," ");
		var sodienthoai = str[3].split("=")[1].replace(/\%2F/g,"/");
		var web = str[4].split("=")[1].replace(/\+/g," ");
		var student =id+","+ten+","+diachi+","+sodienthoai+","+web;
		fs.readFile("data.txt","utf8",function(error,data){
			if(error){
				throw error;
			}else{
				var arr = [];
				
				var readC = []
				arr = data.split("\r\n");
				for(var i = 0 ; i < arr.length ; i++){
					readC  = arr[i].split(",");
					data2 += readC.toString();
				}
				data2 +=student;
				fs.writeFile("data.txt",data2.replace(/^\s+|\s+$/g, '\n'),function(err){
					if(err){
						console.error(err.message);
					}
				});
			}
		});
		
		console.log("Thanh Cong!");
		});
	}
	res.sendStatus(200);
	
});


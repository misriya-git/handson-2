<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <!--Write your code here-->
  <head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	    <title>Servlet File Upload/Download</title>
	    
	    <link rel="stylesheet" href="main.css" />
	    <script type="text/javascript" src="jquery-3.2.1.min.js"></script>
	    <script type="text/javascript" src="fileupload.js"></script></head>
<body>
File: <br />
<form action="/fileUploadServlet"  id="fileUploadForm" method="post"
                        enctype="multipart/form-data">
  <div class="form_group">
    <label>Upload File</label><span id="colon">: </span>
       <input id="fileAttachment" type="file" name="fileUpload" multiple="multiple" />
	     <span id="fileUploadErr">Please Upload A File!</span>
	 </div>
	 <button id="uploadBtn" type="submit" class="btn btn_primary">Upload</button>
</form>
</body>
</html>	
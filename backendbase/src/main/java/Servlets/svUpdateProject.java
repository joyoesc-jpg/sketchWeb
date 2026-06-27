package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.sql.ResultSet;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class svUpdateProject extends HttpServlet {

    private db DB;
    private ResultSet tableRs;
    private boolean isMultipart;
    private String filePath;
    private int maxFileSize = 5 * 1024  * 1024;
    private int maxMemSize = 4 * 1024;
    private File file ;
    
    private static String UPLOAD_DIR = "";
    
    public svUpdateProject(){
        super();
    }
    
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        
        String projectPath = getServletContext().getRealPath("/");
        File mainPath = new File(projectPath);
        for(int i = 0; i < 2; i++){
            projectPath = mainPath.getParent();
            mainPath = new File(projectPath);
        }
        this.UPLOAD_DIR = projectPath;
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        
        isMultipart = ServletFileUpload.isMultipartContent(request);
        response.setContentType("application/json");
        PrintWriter wrt = response.getWriter();
        
        if(!isMultipart){
            wrt.println("{\"error\": \"NotMultiPart\" }");
        }
        
        File previewDIR;
        File strokesDIR;
        
        ///Variables a utilizar
        DB = new db();
        ResultSet tableRs;
        int id = 0;
        String filename = "";
        FileItem strokes = null;
        FileItem preview = null;
        
        DiskFileItemFactory factory = new DiskFileItemFactory();
        factory.setSizeThreshold(maxMemSize);
        ServletContext servletContext = this.getServletConfig().getServletContext();
        File repository = (File) servletContext.getAttribute("javax.servlet.context.tempdir");
        factory.setRepository(repository);
        ServletFileUpload uploader = new ServletFileUpload(factory);
        uploader.setFileSizeMax(maxFileSize);
        
        try{
            List<FileItem> items = uploader.parseRequest(request);
            
            Iterator iter = items.iterator();
            
            while(iter.hasNext()){
                FileItem item = (FileItem) iter.next();
                if(!item.isFormField()){
                    if(item.getFieldName().equals("strokes")){
                        strokes = item;
                    }else if(item.getFieldName().equals("preview")){
                        preview = item;
                    }else{
                        wrt.print("{\"error\":\"WrongFormat\"");
                        return;
                    }
                }else{
                    if(item.getFieldName().equals("idProject")){
                        id = Integer.parseInt(item.getString());
                    }else{
                        wrt.print("{\"error\":\"WrongFormat\"");
                    }
                }
            }
            
        }catch(Exception e){
            wrt.print("{\"error\":\"database\"");
            e.printStackTrace();
            return;
        }
        
        try{
            DB.setConnection("com.mysql.cj.jdbc.Driver", "jdbc:mysql://localhost/sketchweb_db?serverTimezone=UTC");
            tableRs = DB.executeQuery("SELECT filename from PROJECT WHERE id = '"+ id +"'");
            if(tableRs.next()){
                filename = tableRs.getString("filename");
            }else{
                wrt.print("{\"error\":\"NotProjectEncountered\"");
                DB.closeConnection();
                return;
            }
            DB.closeConnection();
        }catch(Exception e){
            e.printStackTrace();
        }
        
        strokesDIR = new File(UPLOAD_DIR + "/strokes/");
        previewDIR = new File(UPLOAD_DIR + "/preview/");
        
        if(!strokesDIR.exists()){
            strokesDIR.mkdirs();
        }
        if(!previewDIR.exists()){
            previewDIR.mkdirs();
        }
        
        File strokesFile = new File(UPLOAD_DIR + "/strokes/" + filename + ".json");
        File previewFile = new File(UPLOAD_DIR + "/preview/" + filename + ".png");
        
        try{
            strokes.write(strokesFile);
            preview.write(previewFile);
        }catch(Exception e){
            wrt.print("{\"error\":\"database\"}");
            e.printStackTrace();
            return;
        }
        
        try (InputStream inputStream = strokes.getInputStream();
            FileOutputStream outputStream = new FileOutputStream(strokesFile)) {
         
            byte[] buffer = new byte[4096];
            int bytesRead;
        
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
        }catch(Exception e){
            wrt.print("{\"error\":\"database\"}");
            e.printStackTrace();
            return;
        }
        
        try (InputStream inputStream = preview.getInputStream();
            FileOutputStream outputStream = new FileOutputStream(previewFile)) {
         
            byte[] buffer = new byte[4096];
            int bytesRead;
        
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
        }catch(Exception e){
            wrt.print("{\"error\":\"database\"}");
            e.printStackTrace();
            return;
        }
        
        wrt.print("{\"error\":null}");
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

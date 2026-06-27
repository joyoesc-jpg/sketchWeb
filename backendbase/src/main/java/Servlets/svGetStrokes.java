package Servlets;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.ResultSet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class svGetStrokes extends HttpServlet {
    
    private db DB;
    private ResultSet tableRs;
    private String UPLOAD_DIR;

    public svGetStrokes(){
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
    ///Función parseadora de json
    private int parseJsonID(String json){
        String[] jsonElements = json.split(",");
        String rawID = jsonElements[0].split(":")[1];
        return Integer.parseInt(rawID.substring(0, rawID.length() - 1));
    }
    
    ///Función para obtener los trazos en formato json.
    private String getStrokes(String fileName) throws IOException{
        File json = new File(UPLOAD_DIR + "/strokes" + fileName + ".json");
        String strokes = ""; 
        InputStream is = new FileInputStream(json);
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        String line;
        while ((line = reader.readLine()) != null) {
            strokes = strokes.concat(line);
        }
        return strokes;
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        
        ///Variables a utilizar
        String line;
        String json = "";
        int id = 0;
        DB = new db();
        PrintWriter wrt = response.getWriter();
        
        ///Obtener Json
        try{
            BufferedReader reader = request.getReader();
            while((line = reader.readLine()) != null){
                json = json.concat(line);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        int projectID = parseJsonID(json);
        
        ///Conexión y petición a la base de datos.
        try{
            DB.setConnection("com.mysql.cj.jdbc.Driver", "jdbc:mysql://localhost/sketchweb_db?serverTimezone=UTC");
            tableRs = DB.executeQuery("SELECT fileName FROM project where ID = " + projectID + ";"); 
            if(tableRs.next()){
                String strokes = getStrokes(tableRs.getString("filename"));
                wrt.write(strokes);
            }else{
                DB.closeConnection();
                wrt.print("{\"error\" :\"NotFound\"}");
            }
            DB.closeConnection();
        }catch(Exception e){
            e.printStackTrace();
            wrt = response.getWriter();
            wrt.print("{\"error\" :\"databaseError\"}");
        }
    }
    
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

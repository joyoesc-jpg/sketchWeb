package Servlets;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.util.Base64;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class svGetProjects extends HttpServlet {
    
    private db DB;
    private ResultSet tableRs;
    private String UPLOAD_DIR;

    public svGetProjects (){
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
    
    private String getPngURI(String fileName) throws IOException {
        File file = new File(UPLOAD_DIR + "/preview" + fileName + ".png");
        
        // 2. Read file into a byte array
        byte[] fileContent = new byte[(int) file.length()];
        try (FileInputStream fis = new FileInputStream(file)) {
            fis.read(fileContent);
        }

        // 3. Encode byte array to Base64
        return "data:image/png;base64," + Base64.getEncoder().encodeToString(fileContent);
    }
    
    private String getDrawingJson(int id, String projectName, String fileName) throws IOException{
        String encodedPNG = getPngURI(fileName);
        return "{\"id\": " + id +
                ", \"title\" : \"" + projectName +
                "\", \"preview\": \"" + encodedPNG +
                "\"}";
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
        int userID = parseJsonID(json);
        
        ///Conexión y petición a la base de datos.
        try{
            DB.setConnection("com.mysql.cj.jdbc.Driver", "jdbc:mysql://localhost/sketchweb_db?serverTimezone=UTC");
            tableRs = DB.executeQuery("SELECT * FROM project where user_id = " + userID + ";"); 
            wrt.print("{\"drawings\":[");
            boolean flag = false;
            while(tableRs.next()){
                if(flag){
                    wrt.print(",");
                }else{
                    flag = true;
                }
                id = tableRs.getInt("ID");
                String projectName = tableRs.getString("projectName");
                String fileName = tableRs.getString("filename");
                String drawingObject = getDrawingJson(id, projectName, fileName);
                wrt.print(drawingObject);
            }
            wrt.print("]}");
            DB.closeConnection();
        }catch(Exception e){
            e.printStackTrace();
            wrt = response.getWriter();
            wrt.print("{\"error\" :\"parseError\"}");
        }
        
    }
    
    
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

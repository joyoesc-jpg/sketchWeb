package Servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class svCreateProject extends HttpServlet {
    
    private db DB;
    private ResultSet tableRs;

    public svCreateProject (){
        super();
    }
    
    ///Función parseadora de json
    private Project parseJsonProject(String json){
        
        String[] jsonElements = json.split(",");
        
        String rawIDUser = jsonElements[0].split(":")[1];
        
        int idUser = Integer.parseInt(rawIDUser);
        
        String rawProjectName = jsonElements[1].split(":")[1];
        
        String projectName = rawProjectName.substring(
                                rawProjectName.indexOf('"')+ 1,
                                rawProjectName.lastIndexOf('"')
                            );
        return new Project(idUser, projectName);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        ///Declara devolución de json,
        response.setContentType("application/json");
        
        ///Variables a utilizar
        String line;
        String json = "";
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
        Project project = parseJsonProject(json);
        
        ///Conexión y petición a la base de datos.
        try{
            DB.setConnection("com.mysql.cj.jdbc.Driver", "jdbc:mysql://localhost/sketchweb_db?serverTimezone=UTC");
            
            tableRs = DB.executeQuery("SELECT * FROM Project where user_id = '"
                    + project.getUserID() + "' AND projectname = '" + project.getProjectName()+"';");
            if(tableRs.next()){
                wrt.print("{\"error\":\"ExistingName\"}");
                return;
            }
            
            DB.executeUpdate("INSERT INTO Project (projectName, user_ID) VALUES ('"+ project.getProjectName() + "',"+ project.getUserID() + ");"); 
            tableRs = DB.executeQuery("SELECT LAST_INSERT_ID() AS ID;");
            if(tableRs.next()){
                project.setID(tableRs.getInt("ID"));
                wrt = response.getWriter();
                wrt.print("{\"id\" :\"" + project.getID() + "\"}");
                DB.executeUpdate("UPDATE Project SET fileName = '"+ project.getFileName() + "' where ID = "+ project.getID() + ";"); 
            }else{
                wrt = response.getWriter();
                wrt.print("{\"id\" :\"null\"}");
            }
            DB.closeConnection();
        }catch(Exception e){
            wrt.print("{\"error\":\"database\"}");
            e.printStackTrace();
        }
        
    }
    
    
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

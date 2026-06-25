package Servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class svLogIn extends HttpServlet {
    
    private db DB;
    private ResultSet tableRs;

    public svLogIn (){
        super();
    }
    
    ///Función parseadora de json
    private User parseJsonUser(String json){
        
        System.out.println("json:" + json);
        
        String[] jsonElements = json.split(",");
        
        String rawName = jsonElements[0].split(":")[1];
        
        String username = rawName.substring(
                                rawName.indexOf('"') + 1,
                                rawName.lastIndexOf('"')
                            );
        
        String rawPass = jsonElements[1].split(":")[1];
        
        String password = rawPass.substring(
                                rawPass.indexOf('"')+ 1,
                                rawPass.lastIndexOf('"')
                            );
        
        return new User(username, password);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
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
        User user = parseJsonUser(json);
        
        ///Conexión y petición a la base de datos.
        try{
            DB.setConnection("com.mysql.cj.jdbc.Driver", "jdbc:mysql://localhost/sketchweb_db?serverTimezone=UTC");
            tableRs = DB.executeQuery("SELECT ID FROM user where username = '" + user.getUsername() + "' and password = '" + user.getPassword() + "';"); 
            if(tableRs.next()){
                id = tableRs.getInt("ID");
                response.setContentType("application/json");
                wrt = response.getWriter();
                wrt.print("{\"id\" :" + id + "}");
            }else{
                wrt = response.getWriter();
                wrt.print("{\"id\" :null}");
            }
            DB.closeConnection();
        }catch(Exception e){
            e.printStackTrace();
        }
        
    }
    
    
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

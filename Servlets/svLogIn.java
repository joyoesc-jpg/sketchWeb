package Servlets;

import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author carlo
 */
@WebServlet(name = "svLogIn", urlPatterns = {"/svLogIn"})
public class svLogIn extends HttpServlet {
    
    db DB;

    public svLogIn (){
        super();
        DB = new db();
        try{
            DB.setConnection("com.mysql.cj.jdbc.Driver", "jdbc:mysql://localhost/sketchweb_db?serverTimezone=UTC");
        }catch(Exception e){
            System.out.println(e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String line = new String();
        try{
            BufferedReader reader = request.getReader();
            while((line = reader.readLine()) != null){
                System.out.println(line);
            }
        }catch(Exception e){
            System.out.println(e);
        }
        
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

package Servlets;

import java.util.Calendar;
import java.lang.Math;


public class Project {
    private int ID;
    private String projectName;
    private String fileName;
    private int IDUser;
    
    public Project(int IDUser, String projectName){
        this.IDUser = IDUser;
        this.projectName = projectName;
    }
    
    public Project(int ID){
        this.ID = ID;
    }
    
    private void setFileName(int ID){
        int i = 10000;
        String initialZeros = "";
        while(Math.log10(i) >= Math.log10(ID)){
            initialZeros = initialZeros.concat("0");
            i /= 10;
        }
        
        fileName = "/" + initialZeros + String.valueOf(ID) + "-" + 
                String.valueOf(Calendar.getInstance().get(Calendar.YEAR)) + "-" + 
                String.valueOf(Calendar.getInstance().get(Calendar.MONTH)) + "-" +
                String.valueOf(Calendar.getInstance().get(Calendar.DAY_OF_MONTH));
    }
    
    public int getID(){
        return this.ID;
    }
    
    public String getProjectName(){
        return this.projectName;
    }
    
    public String getFileName(){
        return this.fileName;
    }
    
    public int getUserID(){
        return this.IDUser;
    }
    
    public void setID(int ID){
        this.ID = ID;
        setFileName(this.ID);
    }
}
